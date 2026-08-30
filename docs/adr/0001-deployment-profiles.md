# ADR-0001: Separate demonstration and production profiles

Status: Accepted for Milestone 01.

`DEMO_STATIC` is the only runnable profile. It contains synthetic data, memory-only interaction, persistent disclosure, and no authentication/security-control claims. `PRODUCTION_REFERENCE` consists of contracts and architecture until enterprise identity, hosting, policy enforcement, regional data planes, audit, and adapters are implemented and verified.

Reason: mixing the profiles creates a high risk that visual controls are mistaken for effective controls or public hosting exposes restricted data.
