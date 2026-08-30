import type { Language } from '../i18n/messages';

export type ModuleDefinition = {
  path: string;
  code: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  highlights: Record<Language, string[]>;
};

export const modules: ModuleDefinition[] = [
  {
    path: '/report-request', code: '01',
    title: { 'zh-TW': '通報與服務申請', en: 'Report & Request' },
    description: { 'zh-TW': '事件、釣魚、資料外洩與資安服務的單一入口。', en: 'A single entry point for incidents, phishing, data loss, and security services.' },
    highlights: { 'zh-TW': ['漸進式通報', '緊急升級指引', '資料分級摘要'], en: ['Progressive intake', 'Urgent escalation guidance', 'Classification summary'] },
  },
  {
    path: '/threat-vulnerability', code: '02',
    title: { 'zh-TW': '威脅、Exposure 與弱點', en: 'Threat, Exposure & Vulnerability' },
    description: { 'zh-TW': '以利用狀態、曝險、業務與安全影響綜合排序。', en: 'Prioritization across exploitation, exposure, business, and safety impact.' },
    highlights: { 'zh-TW': ['KEV／EPSS', 'Internet exposure', '補償控制'], en: ['KEV / EPSS', 'Internet exposure', 'Compensating controls'] },
  },
  {
    path: '/incident-soc', code: '03',
    title: { 'zh-TW': '事件與 SOC', en: 'Incident & SOC' },
    description: { 'zh-TW': '事件態勢、調查、升級與跨區協作導覽。', en: 'Incident posture, investigation, escalation, and regional coordination.' },
    highlights: { 'zh-TW': ['事件佇列', '調查時間軸', '升級與交接'], en: ['Incident queue', 'Investigation timeline', 'Escalation and handoff'] },
  },
  {
    path: '/app-product-security', code: '04',
    title: { 'zh-TW': 'AppSec 與產品安全', en: 'AppSec & Product Security' },
    description: { 'zh-TW': 'Secure SDLC、release gate、SBOM／VEX 與 PSIRT 關聯。', en: 'Secure SDLC, release gates, SBOM / VEX, and PSIRT linkage.' },
    highlights: { 'zh-TW': ['Threat model', 'Pipeline 摘要', 'Release gate'], en: ['Threat model', 'Pipeline summary', 'Release gate'] },
  },
  {
    path: '/ot-site-security', code: '05',
    title: { 'zh-TW': 'OT／ICS 與廠區安全', en: 'OT / ICS & Site Security' },
    description: { 'zh-TW': '維護窗口、安全審查、廠區曝險與補償控制。', en: 'Maintenance windows, safety review, site exposure, and compensating controls.' },
    highlights: { 'zh-TW': ['廠區態勢', '安全影響', '維護窗口'], en: ['Site posture', 'Safety impact', 'Maintenance window'] },
  },
  {
    path: '/data-privacy-ip', code: '06',
    title: { 'zh-TW': '資料、Privacy 與客戶 IP', en: 'Data, Privacy & Customer IP' },
    description: { 'zh-TW': '分類、資料流、跨境限制與客戶智慧財產權保護。', en: 'Classification, data flows, cross-border restrictions, and customer IP protection.' },
    highlights: { 'zh-TW': ['Data lineage', '跨境審查', '客戶 IP'], en: ['Data lineage', 'Cross-border review', 'Customer IP'] },
  },
  {
    path: '/identity-cloud-zero-trust', code: '07',
    title: { 'zh-TW': 'IAM、Cloud 與 Zero Trust', en: 'IAM, Cloud & Zero Trust' },
    description: { 'zh-TW': '身分、裝置、工作階段風險與雲端防護態勢。', en: 'Identity, device, session risk, and cloud security posture.' },
    highlights: { 'zh-TW': ['身分風險', 'Cloud posture', '存取審查'], en: ['Identity risk', 'Cloud posture', 'Access review'] },
  },
  {
    path: '/third-party-supply-chain', code: '08',
    title: { 'zh-TW': '第三方與供應鏈', en: 'Third Party & Supply Chain' },
    description: { 'zh-TW': '供應商分級、盡職調查、存取與持續監控。', en: 'Supplier tiering, due diligence, access, and continuous monitoring.' },
    highlights: { 'zh-TW': ['供應商分級', '合約條款', 'Offboarding'], en: ['Supplier tiering', 'Contract clauses', 'Offboarding'] },
  },
  {
    path: '/grc-audit-regulations', code: '09',
    title: { 'zh-TW': 'GRC、稽核與法規', en: 'GRC, Audit & Regulations' },
    description: { 'zh-TW': '風險、控制、證據、缺失與法規時鐘的追溯視圖。', en: 'Traceable views of risk, controls, evidence, findings, and regulatory clocks.' },
    highlights: { 'zh-TW': ['Control lifecycle', 'Evidence expiry', '法規時鐘'], en: ['Control lifecycle', 'Evidence expiry', 'Regulatory clocks'] },
  },
  {
    path: '/ai-security', code: '10',
    title: { 'zh-TW': 'AI Security', en: 'AI Security' },
    description: { 'zh-TW': 'AI use case、模型、資料集、評估與監控入口。', en: 'Entry point for AI use cases, models, datasets, evaluations, and monitoring.' },
    highlights: { 'zh-TW': ['AI inventory', 'Security review', 'Monitoring'], en: ['AI inventory', 'Security review', 'Monitoring'] },
  },
  {
    path: '/knowledge-learning', code: '11',
    title: { 'zh-TW': '知識與學習', en: 'Knowledge & Learning' },
    description: { 'zh-TW': '政策、Runbook、FAQ、教材與受控搜尋。', en: 'Policies, runbooks, FAQs, learning, and controlled search.' },
    highlights: { 'zh-TW': ['政策與標準', 'Runbook', '角色化學習'], en: ['Policies and standards', 'Runbooks', 'Role-based learning'] },
  },
];
