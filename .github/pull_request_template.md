## Profile and scope

- [ ] `DEMO_STATIC`
- [ ] `PRODUCTION_REFERENCE`
- [ ] No security claim crosses profile boundaries

## Verification

- [ ] `npm run check` passes
- [ ] New data is synthetic and contains no secrets, personal data, customer IP, or internal infrastructure details
- [ ] Traditional Chinese and English are updated together
- [ ] Keyboard, focus, mobile, stale, error, and no-access behavior were reviewed
- [ ] Authorization/data-boundary changes include negative tests and architecture review
- [ ] Built artifact has no source maps, `.env`, internal URLs, real records, or test attachments

## Residual risk / production gap

Describe what is still mock, disconnected, unverified, or dependent on an enterprise decision.
