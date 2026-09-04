import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ALLOWED_EXTENSIONS = new Set([
  '.css',
  '.gif',
  '.html',
  '.ico',
  '.jpeg',
  '.jpg',
  '.js',
  '.json',
  '.png',
  '.svg',
  '.txt',
  '.webmanifest',
  '.webp',
  '.woff',
  '.woff2',
  '.xml',
]);

const TEXT_EXTENSIONS = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.svg',
  '.txt',
  '.webmanifest',
  '.xml',
]);

const FORBIDDEN_EXTENSIONS = new Set([
  '.7z',
  '.cer',
  '.crt',
  '.csv',
  '.db',
  '.der',
  '.docx',
  '.gz',
  '.har',
  '.key',
  '.log',
  '.map',
  '.p12',
  '.pcap',
  '.pcapng',
  '.pdf',
  '.pem',
  '.pfx',
  '.rar',
  '.sqlite',
  '.tar',
  '.xlsx',
  '.zip',
]);

const FORBIDDEN_PATH_SEGMENTS = new Set([
  '__snapshots__',
  'attachments',
  'coverage',
  'fixtures',
  'playwright-report',
  'test-results',
]);

const SECRET_PATTERNS = [
  ['private key', /-----BEGIN (?:EC |OPENSSH |RSA )?PRIVATE KEY-----/u],
  ['GitHub token', /\bgh[opusr]_[A-Za-z0-9]{20,}\b/u],
  ['AWS access key', /\bAKIA[0-9A-Z]{16}\b/u],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{30,}\b/u],
  ['JSON Web Token', /\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/u],
  [
    'assigned secret',
    /\b(?:access[_-]?token|api[_-]?key|client[_-]?secret|password)\b\s*[:=]\s*["']?[A-Za-z0-9_./+=-]{12,}/iu,
  ],
];

const EMAIL_PATTERN = /[A-Z0-9._%+-]+@([A-Z0-9.-]+\.[A-Z]{2,})/giu;
const URL_PATTERN = /https?:\/\/[^\s"'<>`]+/giu;
const IPV4_PATTERN = /\b(?:\d{1,3}\.){3}\d{1,3}\b/gu;
const MAX_FILE_BYTES = 5 * 1024 * 1024;

function isPrivateIpv4(value) {
  const octets = value.split('.').map(Number);
  if (octets.length !== 4 || octets.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) {
    return false;
  }

  return (
    octets[0] === 10 ||
    octets[0] === 127 ||
    (octets[0] === 169 && octets[1] === 254) ||
    (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
    (octets[0] === 192 && octets[1] === 168)
  );
}

function isInternalHostname(hostname) {
  const normalized = hostname.toLowerCase().replace(/^\[|\]$/gu, '');
  return (
    normalized === 'localhost' ||
    normalized === '::1' ||
    isPrivateIpv4(normalized) ||
    ['.corp', '.internal', '.intranet', '.lan', '.local'].some((suffix) => normalized.endsWith(suffix))
  );
}

async function listFiles(root, current = root) {
  const entries = await readdir(current, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(current, entry.name);
    if (entry.isSymbolicLink()) {
      throw new Error(`Symbolic links are not allowed in DEMO_STATIC artifacts: ${path.relative(root, absolutePath)}`);
    }
    if (entry.isDirectory()) {
      files.push(...(await listFiles(root, absolutePath)));
    } else if (entry.isFile()) {
      files.push(absolutePath);
    } else {
      throw new Error(`Unsupported artifact entry: ${path.relative(root, absolutePath)}`);
    }
  }

  return files;
}

function inspectText(relativePath, content, findings) {
  for (const [label, pattern] of SECRET_PATTERNS) {
    if (pattern.test(content)) {
      findings.push(`${relativePath}: detected ${label}`);
    }
  }

  for (const match of content.matchAll(EMAIL_PATTERN)) {
    const domain = match[1].toLowerCase();
    if (!['example.com', 'example.net', 'example.org'].includes(domain) && !domain.endsWith('.invalid')) {
      findings.push(`${relativePath}: non-reserved email domain detected (${domain})`);
    }
  }

  for (const match of content.matchAll(URL_PATTERN)) {
    if (match[0].includes('${')) {
      continue;
    }
    try {
      const parsed = new URL(match[0]);
      const knownLibraryLiteral = match[0] === 'http://localhost';
      if (!knownLibraryLiteral && isInternalHostname(parsed.hostname)) {
        findings.push(`${relativePath}: internal URL detected (${parsed.hostname})`);
      }
    } catch {
      findings.push(`${relativePath}: malformed absolute URL detected`);
    }
  }

  for (const match of content.matchAll(IPV4_PATTERN)) {
    if (isPrivateIpv4(match[0])) {
      findings.push(`${relativePath}: private or loopback IPv4 address detected (${match[0]})`);
    }
  }
}

export async function auditDemoArtifact(rootDirectory) {
  const root = path.resolve(rootDirectory);
  const rootStats = await stat(root).catch(() => null);
  if (!rootStats?.isDirectory()) {
    throw new Error(`Artifact directory does not exist: ${root}`);
  }

  const files = await listFiles(root);
  if (files.length === 0) {
    throw new Error('DEMO_STATIC artifact is empty');
  }

  const findings = [];
  let disclosureFound = false;

  for (const absolutePath of files) {
    const relativePath = path.relative(root, absolutePath).split(path.sep).join('/');
    const segments = relativePath.toLowerCase().split('/');
    const basename = path.basename(relativePath);
    const extension = path.extname(basename).toLowerCase();
    const isApprovedPlaceholder = relativePath === '.well-known/security.txt.example';
    const fileStats = await stat(absolutePath);

    if (/^\.env(?:\.|$)/iu.test(basename)) {
      findings.push(`${relativePath}: environment file is not publishable`);
    }
    if (segments.some((segment) => FORBIDDEN_PATH_SEGMENTS.has(segment))) {
      findings.push(`${relativePath}: test or attachment directory is not publishable`);
    }
    if (FORBIDDEN_EXTENSIONS.has(extension)) {
      findings.push(`${relativePath}: forbidden attachment or sensitive file type (${extension})`);
    } else if (!isApprovedPlaceholder && !ALLOWED_EXTENSIONS.has(extension)) {
      findings.push(`${relativePath}: file type is not on the DEMO_STATIC allowlist (${extension || 'none'})`);
    }
    if (fileStats.size > MAX_FILE_BYTES) {
      findings.push(`${relativePath}: file exceeds the 5 MiB DEMO_STATIC limit`);
    }

    if (isApprovedPlaceholder || TEXT_EXTENSIONS.has(extension)) {
      const content = await readFile(absolutePath, 'utf8');
      disclosureFound ||= content.includes('DEMO_STATIC');
      inspectText(relativePath, content, findings);
    }
  }

  if (!disclosureFound) {
    findings.push('artifact: required DEMO_STATIC disclosure marker is missing');
  }

  if (findings.length > 0) {
    throw new Error(`Unsafe DEMO_STATIC artifact:\n- ${[...new Set(findings)].join('\n- ')}`);
  }

  return { filesChecked: files.length };
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (invokedPath === fileURLToPath(import.meta.url)) {
  const target = process.argv[2] ?? 'dist';
  auditDemoArtifact(target)
    .then(({ filesChecked }) => {
      console.log(`DEMO_STATIC artifact audit passed (${filesChecked} files checked)`);
    })
    .catch((error) => {
      console.error(error instanceof Error ? error.message : error);
      process.exitCode = 1;
    });
}
