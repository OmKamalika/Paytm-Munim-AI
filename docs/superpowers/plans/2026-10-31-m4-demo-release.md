# M4 demo release implementation plan

**Goal:** Deliver a reproducible, coherent merchant demonstration with installable PWA assets and safe reconnect behavior.

**Architecture:** Keep CSV/Excel/JSON/XML source archives and process-local simulation state. One tracked execution path enforces owner delegation and final financial consent. The cash adapter consumes successful effects and agreed dated obligations without double counting; merchant evidence and RiskOps read the same trace. Portable launch does not depend on ignored scaffolding or bundle credentials. The PWA caches an offline explanation and icons, never financial APIs or action responses.

**Starting state:** PR #6 contains tested merchant chat, owner setup, persistent outlet selection and actual sales through 31 October 2026 at 15:55 IST. Work occurs in the isolated `paytmunim-m4` checkout; the existing `paytmunim-demo` remains the working presentation. The latest M3/main cash and hosting work is integrated here before release.

## Tasks

- [x] Reconcile upstream merge corruption and preserve current merchant flows and source archives.
- [x] Integrate tracked successful financial effects into the shared cash plan, preserve the remaining supplier payable, and test timing/idempotency.
- [x] Close the legacy execution bypass and unify evidence/merchant cash refresh with RiskOps.
- [x] Verify clean-source build/start and local owner-PIN binding; add CI gates.
- [x] Add icons, manifest metadata, install affordance and safe offline/reconnect behavior.
- [x] Run full tests, source integrity, lint, TypeScript, build and isolated clean-launch checks.
- [x] Review the combined diff and rehearse merchant/operator/RiskOps. The PR checkpoint is updated after final checks.

## Release boundaries

No PostgreSQL, live financial rails, hidden automatic money movement or invented retail stock. Physical-phone installation and reachable HTTPS hosting require a separate device/deployment rehearsal; local success does not prove those gates. Owner verification is configured privately, and PIN/hash values must never be committed or logged.
