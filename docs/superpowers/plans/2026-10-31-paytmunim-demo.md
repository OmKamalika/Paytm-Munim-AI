# PayTMunim Demo Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a private interactive PayTMunim merchant and RiskOps demo with a real intent/drift check API.

**Architecture:** Vinext app with a responsive React merchant flow and RiskOps view. A server route calls a pure intent engine over seeded, synthetic scenario data and returns structured decisions and trace entries. Browser-local state connects the two views for the demo.

**Tech Stack:** Vinext/React/TypeScript, JavaScript intent module tested by Node's test runner, Sites private hosting.

**Spec:** `docs/superpowers/specs/2026-10-31-paytmunim-demo-design.md`

## Global Constraints

- Every simulated datum and action must be visibly labelled.
- No precise SKU claim from payment transactions; allocation is a merchant-input proxy.
- No live money movement, lender application, bureau pull, or supplier message.
- Hard policy decisions must be deterministic and non-permissive after semantic escalation.
- UI follows the Stitch mobile Paytm color language when available.

## Review Focus

- Missing or stale source data must not appear as an exact all-channel forecast.
- A changed supplier account must block even when all commercial terms are acceptable.
- Removing buyback or shortening credit must be visible as drift from original intent.
- Loan preparation must not imply bureau consent or submission.
- A paused delegate must not be shown as able to proceed.

---

### Task 1: Intent engine and demo API

**Files:** `lib/demo-fixture.js`, `lib/intent-engine.js`, `app/api/demo/route.ts`, `app/api/analyze/route.ts`, `tests/intent-engine.test.js`

**Interfaces:** `analyzeIntent({mandate, originalIntent, candidate, context})` returns `{decision, reasons, checks, trace}`. GET `/api/demo` returns the fixture; POST `/api/analyze` returns the decision.

- [ ] Write tests for normal terms, lost buyback, shortened credit, changed account, and paused delegate; run them to observe failures.
- [ ] Implement the minimum pure engine and fixture to pass the tests.
- [ ] Expose the API routes and verify representative responses.

### Task 2: Merchant experience

**Files:** `app/page.tsx`, `components/MerchantApp.tsx`, `app/globals.css`, `app/layout.tsx`

**Interfaces:** Reads `/api/demo`; posts selected candidate to `/api/analyze`; saves returned cases in browser-local demo state.

- [ ] Build the home, cash plan, supplier terms, guard result, and consent branch as a coherent mobile journey.
- [ ] Ensure every action has a visible state change, return path, and source/ simulation label.
- [ ] Verify keyboard focus, mobile width, and no dead-end clicks.

### Task 3: RiskOps experience

**Files:** `components/RiskOps.tsx`, shared UI code as needed without editing engine files.

**Interfaces:** Reads browser-local demo cases and shows original intent, proposed action, checks, tool trace, and decision; local pause control.

- [ ] Build a desktop case queue and case detail with a compact mobile layout.
- [ ] Verify clean, escalated, and blocked cases are distinguishable and traceable.

### Task 4: Verify and publish

**Files:** `README.md`, `.openai/hosting.json`, all completed source.

- [ ] Run full intent tests, TypeScript/build checks, and browser journey checks.
- [ ] Package the exact source state through the Sites helper and push it.
- [ ] Save and deploy the matching version privately; confirm the live URL.
