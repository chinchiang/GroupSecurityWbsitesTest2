# Trust boundaries

One brand does not mean one security boundary.

| Origin | Users | Identity and authorization | Permitted data | Forbidden coupling |
| --- | --- | --- | --- | --- |
| Internal Security Portal | Employees and approved contractors | Enterprise SSO; server-side RBAC + ABAC | Authorized internal summaries and controlled deep links | Public access, supplier-inherited visibility, client-only role enforcement |
| Public PSIRT / Trust Center | Researchers, customers, public | Public; intake protected against abuse | Approved advisories, CVD policy, receipt, public contact data | Direct internal database/index access; internal assessment or customer disclosure |
| Supplier Security Portal | Supplier/partner contacts | Separate external identity; tenant, organization, case relationship | Records explicitly shared with that organization | Employee visibility inheritance; cross-supplier search; orphaned access |

Milestone 01 implements only a synthetic internal portal shell. Documentation preserves the public and supplier origins as separate deployables; the demo does not embed or emulate those sites.

## Boundary invariants

- Hiding a menu, changing a client role, or restricting a search scope is not an authorization boundary.
- Public build artifacts contain no internal data, URL, index, source map, secret, attachment, or test fixture copied from a real system.
- Supplier authorization includes verified organization and case relationship on every request.
- Cross-region exchange is a deliberately approved minimum aggregate/metadata flow, never an unrestricted global index.
- A compromised connector is treated as an attacker; its records remain untrusted until validated and policy-filtered.
