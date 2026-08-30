# Milestone 01 — Secure full-site navigation shell

Status: committed to the private repository `main` branch; not deployed or connected to enterprise systems.

## Goal

Deliver a reviewable `DEMO_STATIC` portal shell that proves the information architecture, bilingual navigation, responsive layout, shared data states, and demo/production boundary before deeper workflows are built.

## Acceptance criteria

- [x] All 12 approved L1 routes (Home plus 11 domains) are reachable through hash routes.
- [x] Home is an Action Center with Need attention, My actions, and Decision required zones.
- [x] UI defaults to `zh-TW` and switches to English.
- [x] At least eight personas are available as an explicitly labelled view simulation.
- [x] Every module can demonstrate ready, loading, empty, stale, source-error, and no-access states.
- [x] Layout adapts across desktop, tablet, and mobile breakpoints.
- [x] A persistent banner states that data is synthetic and the demo is not for live incidents.
- [x] Demo data validates against a typed Zod contract and uses reserved/example identifiers.
- [x] Direct `/admin/*` access is denied; client persona selection cannot grant access.
- [x] Production adapter and authorization interfaces exist without external calls.
- [x] Hash routing and relative assets preserve future GitHub Pages project-site compatibility.
- [x] CI uses read-only default permissions and verified full-SHA official actions.
- [x] Automated accessibility smoke test reports no serious/critical violations on Home (color contrast remains manual).
- [ ] Manual WCAG 2.2 AA keyboard/screen-reader/zoom review (requires human QA).
- [ ] GitHub Pages artifact and deployment review (requires owner approval before enabling).

## Explicitly deferred

Deep workflows, real SSO/BFF, file uploads, form submission, persistence, system adapters, audit delivery, notification, permission-aware server search, public PSIRT site, supplier extranet, regional data planes, and compliance evidence.

## Review script

1. Open Home; confirm demo label, three action zones, persona simulation notice, and twelve module tiles.
2. Switch to English; confirm navigation, titles, states, and disclosures change language.
3. Open any module; select every data state and confirm stale/error/no-access are explicit.
4. Navigate directly to `#/admin/configuration`; confirm access is denied.
5. Resize from wide desktop to 600 px; confirm menu, cards, tables/panels, and focus remain usable.
6. Run `npm run check`; review the exact output.
