# Threat model — initial baseline

## Assets

Identity/session, customer and company IP, incident/weakness records, supplier cases, audit/evidence, content approvals, source-system links, search snippets, exports, and regional policy metadata.

## Threat actors

External attacker; malicious/compromised supplier; ordinary employee; privileged administrator; compromised connector; malicious content/source dependency; and insider threat.

## Priority abuse cases

| Threat | Boundary/control objective | Milestone 01 status |
| --- | --- | --- |
| Demo mistaken for operational intake | Persistent disclosure; disabled/deferred writes | Implemented |
| Client persona used as authorization | Explicit simulation; production decision accepts verified server session only | Implemented/tested |
| Direct admin route access | Default-deny route response and production policy skeleton | Implemented/tested |
| Real/internal data enters static artifact | Synthetic schema/data rules; build artifact scan foundation | Partly automated; human review required |
| Stale/failed connector shown as current | First-class stale/error/down state and last-success context | Implemented |
| Cross-region or cross-supplier disclosure | Server-side resource-context policy | Designed; backend deferred |
| XSS/content injection | React text rendering; no raw HTML | Implemented baseline |
| IDOR/BOLA, CSRF, SSRF, upload malware | BFF enforcement and isolated file pipeline | Designed; backend deferred |
| Workflow supply-chain compromise | Minimal permissions, pinned official actions, lockfile | Implemented baseline |

This model must be expanded with concrete data flows before adding BFF, uploads, integrations, public intake, or supplier access.
