# Contributing

## Change workflow

1. Read `AGENTS.md` and the relevant architecture decision records.
2. Keep changes within the selected deployment profile and state the profile in the PR description.
3. Use only synthetic test data. Prefix demo record IDs with `SYN-` and use reserved/example domains.
4. Add tests for new routes, translations, state handling, validation, and authorization failures.
5. Run `npm run check` locally.
6. Complete the pull-request checklist; obtain CODEOWNER review for security-boundary or workflow changes.

## Commit and review expectations

- Keep dependency changes isolated and explain why each dependency is necessary.
- Never commit generated secrets, `.env` files, production URLs, source maps, screenshots containing internal information, or copied system-of-record records.
- Treat changes to identity, authorization, data residency, adapters, workflows, CSP/headers, and public/supplier boundaries as security-architecture changes.
- Automated accessibility checks supplement, but do not replace, keyboard and screen-reader review.
