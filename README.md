# Group Security Hub

Secure demonstration shell for a multinational ODM/OEM group security portal. Milestone 01 provides the complete 12-module navigation, bilingual responsive layout, synthetic Action Center, and reusable data-state components.

> **DEMO_STATIC only:** This repository currently contains synthetic/public demonstration data. It is not an incident-response channel, authentication system, RBAC enforcement point, system of record, compliance attestation, or production security control.

## Current milestone

- 12 navigable L1 routes: the role-shaped Action Center plus 11 security-domain routes from the approved specification.
- `zh-TW` and English UI, with Traditional Chinese as the default.
- Shared ready, loading, empty, stale, source-error, and no-access states.
- Eight synthetic persona views, clearly labelled **View simulation**.
- Hash routing and relative assets for a future GitHub Pages project-site demo.
- Production Reference contracts for server-verified authorization and system adapters.
- Direct `/admin/*` access is denied; persona selection never grants access.
- No backend, login, upload, attachment, persistence, or external connector.

See [Milestone 01](docs/milestone-01.md) and the [requirements traceability matrix](docs/requirements-traceability.md) for acceptance evidence.

## Local development

Requirements: Node.js 24 LTS and npm 11.

```bash
npm ci
npm run dev
```

The development server is for synthetic demo data only. Do not paste real incident data, credentials, tokens, personal information, customer IP, hostnames, vulnerability attachments, or internal URLs.

## Validation

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

`npm run check` runs the complete local gate. The production build intentionally disables source maps.
It also audits the exact `dist` tree using a file-type allowlist and content checks for credential patterns, internal locations, non-reserved email domains, test attachments, and the persistent `DEMO_STATIC` disclosure.

## Deployment profiles

| Profile | Current status | Security statement |
| --- | --- | --- |
| `DEMO_STATIC` | Runnable | Synthetic data, browser-memory interactions, no secrets, no authentication claims. Suitable for an approved static demo only. |
| `PRODUCTION_REFERENCE` | Architecture/contracts only | Requires separately deployable origins, enterprise hosting, OIDC/BFF, server enforcement, region-aware data planes, audit, and real adapters before production use. |

The approved GitHub Pages workflow publishes only after a push to `main`. Its build job has read-only repository access, audits the exact `dist` tree before upload, and passes the reviewed artifact to a separate deploy job that alone receives `pages: write` and `id-token: write`. Repository Pages settings, merge approval, and the first deployment remain owner-controlled gates.

## Trust boundaries

The target product is one brand with three independent deployables/origins:

1. Internal Security Portal — enterprise identity and server-side RBAC + ABAC.
2. Public PSIRT / Trust Center — approved public content only; no internal index or database access.
3. Supplier Security Portal — external identity, organization/case scope, retention, and audit independent of employee visibility.

This repository implements the internal **demo shell** only and preserves the other two as explicit architecture boundaries. See [trust-boundaries.md](docs/trust-boundaries.md).

## Production gaps

Before production, the enterprise must decide and implement the IdP, BFF/runtime, systems of record, regional hosting/data boundaries, public PSIRT origin, supplier portal origin, content governance workflow, audit sink, retention, observability, and operational ownership. See [architecture.md](docs/architecture.md) and [runbook.md](docs/runbook.md).

## Rollback

No remote release exists for Milestone 01. For a future release, retain the last approved immutable artifact and revert the deployment pointer; do not rebuild old source with new dependencies. Emergency rollback must not bypass content approval or reintroduce restricted data into a public artifact.
