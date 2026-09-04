# ADR-0002: Hash routing with relative static assets

Status: Accepted for Milestone 01.

Use `HashRouter` and Vite `base: './'` for the static demo. This supports a future GitHub Pages project site without server rewrite rules and avoids direct-route refresh 404s. Production may replace this with origin-aware server routing behind a managed reverse proxy, but must preserve route authorization at the BFF.

Owner approval permits a Pages workflow that builds on `main`, scans the exact artifact before upload, and grants deployment permissions only to a separate deploy job. Merge, Pages repository configuration, and first deployment remain explicit owner-controlled gates.
