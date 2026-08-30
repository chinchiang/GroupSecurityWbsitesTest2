# Authorization model

## Production decision inputs

The production policy combines verified role, business group, site, region, product, supplier/case relationship, classification, jurisdiction, device/session risk, and requested action. The BFF is the enforcement point; the browser receives only policy-filtered data.

Default deny applies when a session, claim, attribute, relationship, resource classification, or policy decision is missing/stale. Search snippets, exports, cached data, AI answers, and deep links use the same decision context as record detail.

## Demo restriction

The persona selector changes presentation only. It is not persisted, sent as a claim, accepted as identity, or passed into `authorize()`. Direct `/admin/*` navigation always returns no access.

## Negative-test baseline

Milestone 01 covers missing verified sessions, wrong business group, wrong region, disallowed classification, and missing admin role. Later milestones must add supplier organization/case relationship, product scope, stale session, direct-object access, export, search snippet, bulk action, and cross-region aggregate tests.
