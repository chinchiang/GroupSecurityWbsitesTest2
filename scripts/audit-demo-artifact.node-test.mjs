import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { auditDemoArtifact } from './audit-demo-artifact.mjs';

async function withArtifact(files, callback) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'demo-artifact-'));
  try {
    for (const [relativePath, content] of Object.entries(files)) {
      const destination = path.join(root, relativePath);
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, content);
    }
    await callback(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test('accepts a synthetic static artifact with reserved URLs', async () => {
  await withArtifact(
    {
      'index.html': '<main>DEMO_STATIC synthetic data</main>',
      'assets/app.js': 'const source = "https://example.invalid/DEMO-001"; const libraryDefault="http://localhost";',
      '.well-known/security.txt.example': 'Contact: security@example.com',
    },
    async (root) => {
      const result = await auditDemoArtifact(root);
      assert.equal(result.filesChecked, 3);
    },
  );
});

test('rejects source maps and test attachments', async () => {
  await withArtifact(
    {
      'index.html': 'DEMO_STATIC',
      'assets/app.js.map': '{}',
      'test-results/evidence.zip': 'not a real archive',
    },
    async (root) => {
      await assert.rejects(auditDemoArtifact(root), /forbidden attachment|test or attachment/u);
    },
  );
});

test('rejects private network locations and non-reserved email domains', async () => {
  await withArtifact(
    {
      'index.html': 'DEMO_STATIC',
      'assets/app.js': 'const endpoint="https://10.20.30.40/api"; const owner="person@company.tld";',
    },
    async (root) => {
      await assert.rejects(auditDemoArtifact(root), /internal URL|non-reserved email/u);
    },
  );
});

test('rejects an actionable localhost endpoint', async () => {
  await withArtifact(
    {
      'index.html': 'DEMO_STATIC',
      'assets/app.js': 'const endpoint="http://localhost:3000/api";',
    },
    async (root) => {
      await assert.rejects(auditDemoArtifact(root), /internal URL/u);
    },
  );
});

test('rejects credential-shaped content', async () => {
  await withArtifact(
    {
      'index.html': 'DEMO_STATIC',
      'assets/app.js': 'const api_key="abcdefghijklmnopqrstuvwx";',
    },
    async (root) => {
      await assert.rejects(auditDemoArtifact(root), /assigned secret/u);
    },
  );
});

test('requires the persistent demo disclosure marker', async () => {
  await withArtifact({ 'index.html': '<main>synthetic data</main>' }, async (root) => {
    await assert.rejects(auditDemoArtifact(root), /DEMO_STATIC disclosure/u);
  });
});
