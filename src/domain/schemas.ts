import { z } from 'zod';

export const classificationSchema = z.enum(['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'RESTRICTED']);
export const freshnessSchema = z.enum(['CURRENT', 'STALE', 'EXPIRED', 'CONNECTOR_DOWN']);
export const evidenceStatusSchema = z.enum(['VERIFIED', 'VENDOR_CLAIM', 'THIRD_PARTY', 'ANALYSIS', 'UNVERIFIED']);

export const sourceReferenceSchema = z.object({
  system: z.string().min(1).max(80),
  recordId: z.string().min(1).max(80),
  url: z.url().refine((url) => url.startsWith('https://'), 'Only HTTPS source URLs are accepted'),
  lastSynced: z.iso.datetime(),
  etag: z.string().min(1),
});

export const actionCardSchema = z.object({
  id: z.string().regex(/^SYN-[A-Z]+-\d{3}$/),
  zone: z.enum(['NEED_ATTENTION', 'MY_ACTIONS', 'DECISION_REQUIRED']),
  title: z.record(z.enum(['zh-TW', 'en']), z.string().min(1).max(160)),
  scope: z.string().min(1).max(120),
  severity: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']),
  owner: z.string().min(1).max(80),
  dueAt: z.iso.datetime(),
  classification: classificationSchema,
  jurisdiction: z.enum(['GLOBAL', 'EU', 'TAIWAN', 'CHINA']),
  evidenceStatus: evidenceStatusSchema,
  freshness: freshnessSchema,
  nextAction: z.record(z.enum(['zh-TW', 'en']), z.string().min(1).max(160)),
  source: sourceReferenceSchema,
});

export type ActionCard = z.infer<typeof actionCardSchema>;

export type CanonicalEntityName =
  | 'Person' | 'Organization' | 'BusinessGroup' | 'Site' | 'Region'
  | 'BusinessService' | 'Asset' | 'OTAsset' | 'Application' | 'Repository'
  | 'Product' | 'ProductVersion' | 'Component' | 'SBOM' | 'VEX'
  | 'Exposure' | 'Vulnerability' | 'ThreatIntel' | 'Incident' | 'PSIRTCase'
  | 'Risk' | 'Control' | 'ControlImplementation' | 'Evidence' | 'Assessment'
  | 'Finding' | 'Action' | 'Exception' | 'Supplier' | 'Contract' | 'AccessGrant'
  | 'Policy' | 'Standard' | 'Procedure' | 'Runbook' | 'Advisory' | 'LearningItem'
  | 'AIUseCase' | 'Model' | 'Dataset' | 'Evaluation' | 'SourceReference'
  | 'AuditEvent' | 'Approval' | 'NotificationClock';
