export type AdapterHealth = {
  status: 'healthy' | 'degraded' | 'down' | 'not-configured';
  lastSuccessAt?: string;
  schemaVersion: string;
};

export type AdapterContext = {
  correlationId: string;
  idempotencyKey?: string;
  timeoutMs: number;
  pageToken?: string;
};

export type AdapterResult<T> =
  | { ok: true; data: T; health: AdapterHealth; nextPageToken?: string }
  | { ok: false; errorCode: string; retryable: boolean; health: AdapterHealth };

export interface ReadAdapter<TQuery, TRecord> {
  health(): Promise<AdapterHealth>;
  list(query: TQuery, context: AdapterContext): Promise<AdapterResult<TRecord[]>>;
}

export interface WriteAdapter<TInput, TReceipt> {
  create(input: TInput, context: AdapterContext & { idempotencyKey: string }): Promise<AdapterResult<TReceipt>>;
}

export interface IdentityProviderAdapter extends ReadAdapter<Record<string, never>, { subject: string }> {}
export interface ITSMCaseAdapter extends ReadAdapter<Record<string, unknown>, unknown>, WriteAdapter<unknown, { caseId: string }> {}
export interface GRCAdapter extends ReadAdapter<Record<string, unknown>, unknown> {}
export interface ContentRepositoryAdapter extends ReadAdapter<Record<string, unknown>, unknown> {}
export interface SIEMExposureAdapter extends ReadAdapter<Record<string, unknown>, unknown> {}
export interface AssetGraphAdapter extends ReadAdapter<Record<string, unknown>, unknown> {}
export interface CodeSecurityAdapter extends ReadAdapter<Record<string, unknown>, unknown> {}
export interface PSIRTAdapter extends ReadAdapter<Record<string, unknown>, unknown>, WriteAdapter<unknown, { receiptId: string }> {}
export interface SupplierRiskAdapter extends ReadAdapter<Record<string, unknown>, unknown> {}
export interface SearchAdapter extends ReadAdapter<{ query: string; resourceContext: unknown }, unknown> {}
export interface AuditSinkAdapter extends WriteAdapter<unknown, { accepted: true }> {}
export interface NotificationAdapter extends WriteAdapter<unknown, { notificationId: string }> {}

// Milestone 01 intentionally exports contracts only. No adapter calls an external system.
