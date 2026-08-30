import { describe, expect, it } from 'vitest';
import { authorize, type VerifiedSession } from './authorization';

const session: VerifiedSession = {
  verified: true,
  roles: ['analyst'],
  attributes: { businessGroups: ['BG-A'], regions: ['TAIWAN'], classifications: ['INTERNAL'] },
};

describe('production authorization policy skeleton', () => {
  it('defaults to deny without a verified server session', () => {
    expect(authorize(null, { action: 'read', resource: { classification: 'PUBLIC' } }).allowed).toBe(false);
  });

  it.each([
    ['wrong business group', { businessGroup: 'BG-B', region: 'TAIWAN', classification: 'INTERNAL' }],
    ['wrong region', { businessGroup: 'BG-A', region: 'EU', classification: 'INTERNAL' }],
    ['wrong classification', { businessGroup: 'BG-A', region: 'TAIWAN', classification: 'RESTRICTED' }],
  ])('denies %s scope', (_name, resource) => {
    expect(authorize(session, { action: 'read', resource }).allowed).toBe(false);
  });

  it('does not treat an analyst as a portal administrator', () => {
    expect(authorize(session, { action: 'admin', resource: { classification: 'INTERNAL' } }).allowed).toBe(false);
  });
});
