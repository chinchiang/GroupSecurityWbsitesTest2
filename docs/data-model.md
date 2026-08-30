# Canonical data model

Milestone 01 validates the home action-card contract and establishes the full entity vocabulary in `src/domain/schemas.ts`. Later schemas must reuse a common envelope containing stable ID, display name, owner, scope, classification, jurisdiction, source system/record, HTTPS source link, last sync, freshness, timestamps, version/ETag, and evidence status.

## Relationship objective

A finding must be traceable to affected asset/application/product, owner, risk, control implementation, evidence, action/POA&M, source reference, approval, and audit event. The portal stores references and authorized summaries, not shadow copies of system-of-record data.

## Data-quality rules

- `STALE`, `EXPIRED`, and `CONNECTOR_DOWN` are first-class states, never styling hints.
- Dates include a source timezone and display in the selected locale.
- `Verified`, `Vendor Claim`, `Third-Party`, `Analysis`, and `Unverified` remain distinguishable.
- Demo identifiers begin `SYN-`; demo URLs use reserved/example domains.
- Untrusted text is rendered as React text content; no `dangerouslySetInnerHTML`.
