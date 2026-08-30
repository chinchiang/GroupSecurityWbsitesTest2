export type VerifiedSession = {
  verified: true;
  roles: string[];
  attributes: {
    businessGroups: string[];
    regions: string[];
    classifications: string[];
  };
};

export type AuthorizationRequest = {
  action: 'read' | 'write' | 'admin' | 'export';
  resource: {
    businessGroup?: string;
    region?: string;
    classification: string;
  };
};

export type AuthorizationDecision = { allowed: boolean; reason: string };

export function authorize(
  session: VerifiedSession | null,
  request: AuthorizationRequest,
): AuthorizationDecision {
  if (!session?.verified) return { allowed: false, reason: 'No verified server session' };
  if (request.action === 'admin' && !session.roles.includes('portal-admin')) {
    return { allowed: false, reason: 'Required role is missing' };
  }
  if (request.resource.businessGroup && !session.attributes.businessGroups.includes(request.resource.businessGroup)) {
    return { allowed: false, reason: 'Business-group scope mismatch' };
  }
  if (request.resource.region && !session.attributes.regions.includes(request.resource.region)) {
    return { allowed: false, reason: 'Regional scope mismatch' };
  }
  if (!session.attributes.classifications.includes(request.resource.classification)) {
    return { allowed: false, reason: 'Classification is not permitted' };
  }
  return { allowed: true, reason: 'Verified claims satisfy the policy skeleton' };
}
