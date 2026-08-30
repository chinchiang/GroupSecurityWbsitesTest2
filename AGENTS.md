# Repository agent instructions

These instructions apply to the entire repository.

1. Preserve the separation between `DEMO_STATIC` and `PRODUCTION_REFERENCE`. Never upgrade a demo UI statement into a production security claim.
2. Never add real enterprise, customer, supplier, product, incident, vulnerability, identity, network, credential, or token data.
3. Persona selection is a labelled view simulation. It must never influence the production authorization decision function.
4. Production authorization is default-deny and server-enforced. Client routes and hidden navigation are UX only.
5. Preserve the three independently deployable origins described in `docs/trust-boundaries.md`.
6. Do not introduce `localStorage` for tokens, session claims, role selection, incident data, or sensitive content.
7. Do not enable upload or attachment handling in the static demo.
8. Keep GitHub Pages assets relative and use hash routing unless ADR-0002 is superseded.
9. Keep source maps disabled in demonstration builds.
10. Before changing a contract, update its ADR or architecture document and relevant negative tests.
11. Run `npm run check` before proposing a commit. Do not push, deploy, open a PR, or change repository settings without explicit approval.
