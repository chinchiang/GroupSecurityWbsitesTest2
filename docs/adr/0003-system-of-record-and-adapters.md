# ADR-0003: Portal as experience layer with typed adapters

Status: Accepted for Milestone 01.

The portal does not copy SIEM, ITSM, GRC, DMS, CMDB/CAASM, code security, supplier-risk, or PSIRT databases. Production integration uses typed adapters with health/last-success, timeout, pagination, schema version, correlation ID, rate-limit/error mapping, retry/backoff/circuit-breaker policy, and idempotent write contracts.

Milestone 01 ships interfaces only. Default state is `not-configured`; there are no credentials or external requests.
