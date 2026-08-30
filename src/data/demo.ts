import { actionCardSchema, type ActionCard } from '../domain/schemas';

export const personas = [
  'Board / Executive',
  'CISO / Global Security Management',
  'SOC / CSIRT analyst',
  'PSIRT / Product Security',
  'IT / Cloud / IAM owner',
  'OT / Site Security',
  'AppSec / R&D engineer',
  'GRC / Internal Audit',
] as const;

const syntheticCards = [
  {
    id: 'SYN-EXP-001', zone: 'NEED_ATTENTION',
    title: { 'zh-TW': '合成 Internet exposure 等待資產負責人確認', en: 'Synthetic internet exposure awaiting owner confirmation' },
    scope: 'EU · Product family ALPHA', severity: 'CRITICAL', owner: 'Demo Asset Owner',
    dueAt: '2026-08-31T04:00:00.000Z', classification: 'INTERNAL', jurisdiction: 'EU',
    evidenceStatus: 'ANALYSIS', freshness: 'CURRENT',
    nextAction: { 'zh-TW': '檢視合成證據並指派處置', en: 'Review synthetic evidence and assign remediation' },
    source: { system: 'Synthetic Exposure Adapter', recordId: 'DEMO-EXP-001', url: 'https://example.invalid/synthetic/DEMO-EXP-001', lastSynced: '2026-08-30T01:18:00.000Z', etag: 'demo-v1' },
  },
  {
    id: 'SYN-CTL-002', zone: 'MY_ACTIONS',
    title: { 'zh-TW': '證據將於 48 小時內到期', en: 'Control evidence expires within 48 hours' },
    scope: 'Taiwan · Site TW-DEMO-01', severity: 'MEDIUM', owner: 'Demo Control Owner',
    dueAt: '2026-09-01T01:00:00.000Z', classification: 'INTERNAL', jurisdiction: 'TAIWAN',
    evidenceStatus: 'VERIFIED', freshness: 'STALE',
    nextAction: { 'zh-TW': '向控制負責人要求新版本', en: 'Request a current version from the control owner' },
    source: { system: 'Synthetic GRC Adapter', recordId: 'DEMO-EVD-014', url: 'https://example.invalid/synthetic/DEMO-EVD-014', lastSynced: '2026-08-28T01:18:00.000Z', etag: 'demo-v3' },
  },
  {
    id: 'SYN-DEC-003', zone: 'DECISION_REQUIRED',
    title: { 'zh-TW': '合成高風險例外等待決策', en: 'Synthetic high-risk exception needs a decision' },
    scope: 'Global · Service BRAVO', severity: 'HIGH', owner: 'Demo Risk Owner',
    dueAt: '2026-09-02T08:00:00.000Z', classification: 'CONFIDENTIAL', jurisdiction: 'GLOBAL',
    evidenceStatus: 'UNVERIFIED', freshness: 'CONNECTOR_DOWN',
    nextAction: { 'zh-TW': '等待來源恢復後再做風險決策', en: 'Wait for source recovery before the risk decision' },
    source: { system: 'Synthetic ITSM Adapter', recordId: 'DEMO-RSK-021', url: 'https://example.invalid/synthetic/DEMO-RSK-021', lastSynced: '2026-08-29T07:10:00.000Z', etag: 'demo-v2' },
  },
] satisfies ActionCard[];

export const actionCards = zodParseCards(syntheticCards);

function zodParseCards(cards: ActionCard[]): ActionCard[] {
  return cards.map((card) => actionCardSchema.parse(card));
}
