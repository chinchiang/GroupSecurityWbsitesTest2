# Operations runbook — milestone baseline

## Static demo release gate

1. Run `npm ci --ignore-scripts` in a clean environment and `npm run check`.
2. Confirm `npm run audit:artifact` passes against the exact `dist` tree. The automated gate rejects unexpected file types, source maps, `.env`, credential-shaped content, private/internal locations, non-reserved email domains, test attachments, and files larger than 5 MiB.
3. Manually inspect synthetic ticket/product names and visual content; automated pattern checks cannot prove that all business data is synthetic.
4. Confirm the demo banner, persona simulation label, no-access state, and `security.txt.example` placeholders.
5. Obtain content owner and security owner approval.
6. Publish only the immutable reviewed artifact. Record commit and artifact digest.

## Connector/source failure (future production)

Mark affected data `STALE` or `CONNECTOR_DOWN`, retain last-success time, stop unsafe writes, avoid duplicate case creation, and escalate using the adapter health owner. Do not present stale data using current-state colors or recalculate valid coverage from expired evidence.

## Incident data submitted to demo

The current UI has no operational submit path. If real data is nevertheless placed in source, issue, log, or artifact: stop publication, restrict access, preserve minimal audit evidence, notify repository/security owners through approved channels, remove through reviewed history-rewrite procedure if required, rotate exposed secrets, and assess customer/privacy obligations.

## Rollback

Move the deployment pointer to the last approved immutable artifact and verify the demo disclosure and boundaries. Do not bypass review or rebuild an old revision against new dependencies.
