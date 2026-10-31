# M4: reproducible demo and PWA release foundation

The integrated branch preserves the merchant chat, reviewed delegation setup, outlet selector and recorded-sales cutoff from PR #6, and reconciles the newer cash/hosting work on M3/main.

## Implemented

- Fresh-checkout hosting configuration is optional. Local build needs no ignored scaffold or database.
- Built startup supports explicit host/port and loads private verification at runtime. Missing verification fails closed.
- Ubuntu and Windows CI cover source hashes, tests, lint, types, build and built-server startup.
- Netlify uses a separate native Next.js build and the .next publish contract; a CI job checks those artifacts. Native Next compilation covers all three pages and 24 API routes.
- Public legacy execution is retired with HTTP 410. Supplier/capital actions enter tracked evidence, consent and rail flows.
- Merchant Guard/More, evidence endpoints and standalone RiskOps share the tracked journal and exact disclosure snapshots.
- Successful tracked effects update Home, Plan and options. Quotes, pending responses and failures do not improve the cash model.
- Supplier advances preserve the remaining dated payable; cash dates are included in owner disclosures.
- The cash model uses active v4 outlet forecasts and retains inferred electricity/broadband costs. Opening cash remains an explicitly declared historical workbook scenario.
- PWA manifest/icons, Apple metadata, safe areas, browser-supported install prompt, offline action blocking, reconnect handling and public read-only fallback are implemented.
- The worker excludes APIs, mutations and React data payloads from its cache; no offline action queue exists.

## Verification

The integrated suite passes 192 tests plus six isolated acceptance checks. Source verification preserves all 120 supplied files. Lint, TypeScript and build pass. Built-server smoke passed with missing configuration and isolated random verification, on port 5194, without modifying owner configuration.

Independent reviews found no remaining financial or release/PWA blockers after correcting stale forecast copy. The built app was rehearsed through AA data → bureau consent → simulated verification → lender offer → final loan consent → pending rail → status reconciliation → success. Home stayed at −₹2,68,279 while pending and refreshed to −₹68,279 after one ₹2 lakh effect. Merchant evidence showed the same 16-event trace and one ledger effect. A temporary private test verification value was used; no real bureau, loan or payment occurred.

The automated combined supplier/capital rehearsal produced ₹1,91,721 on 5 November with ₹2,60,000 still payable on 19 December. The changed baseline is calculated from the integrated v4 forecast, replacing the old fixed-workbook scenario, and is not presented as recorded sales.

## Remaining release rehearsal gates

- Physical-device installation, standalone launch, keyboard/safe-area behavior and resume need target-device verification.
- A reachable HTTPS deployment and presenter-restricted operator access are not yet configured.
- End-to-end offline navigation was attempted in the in-app browser, which showed its network-error page instead of the fallback. Worker behavior passes executable tests, but real-browser offline control must still be verified; no browser-offline success is claimed.
- CI must report on the pushed PR; locally passing commands are not a claim that hosted Actions have passed.
- Configure the owner's private PIN and repeat the presenter rehearsal on the final demo host. Restarting the server resets all process-local demo state; Restart view does not.

No PostgreSQL, live financial integration, production identity system, durable audit storage or full PRD expansion is introduced.
