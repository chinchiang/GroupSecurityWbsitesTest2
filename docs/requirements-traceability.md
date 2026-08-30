# Requirements traceability — Milestone 01

| Requirement | Implementation | Verification |
| --- | --- | --- |
| 12 L1 routes (Home + 11 domains) | `src/app/routes.ts`, `src/app/App.tsx` | `src/app/routes.test.ts` |
| Bilingual `zh-TW` / English | `src/i18n/*`, route manifest | App and route tests |
| Secure demo disclosure | `Demo banner`, README, ADR-0001 | App test + review script |
| Persona view simulation, not RBAC | Shell selector, `authorization.ts` separation | App + authorization tests |
| Action Center three zones | Home route + synthetic cards | Schema and App tests |
| loading/empty/stale/error/no-access | `StatePanel` shared UI | Review script; stale test |
| Responsive navigation/layout | `src/styles.css` breakpoints | Manual review pending |
| Accessibility baseline | Semantic shell, focus/skip link, reduced motion | axe smoke test; manual color/AT review pending |
| GitHub Pages compatibility | Relative Vite base + HashRouter | Production build; ADR-0002 |
| No source maps | `vite.config.ts` | CI artifact check/build inspection |
| Production authorization boundary | `src/security/authorization.ts` | Default-deny negative tests |
| Typed adapter contracts, no calls | `src/adapters/contracts.ts` | Typecheck; ADR-0003 |
| Three independent origins | Trust-boundary docs + module 12 copy | Architecture review |
| Minimal CI permissions/pinned actions | `.github/workflows/ci.yml` | Workflow review |
