# PayTMunim demo design

## Intent

Build a private, runnable hackathon demo for an existing Paytm merchant with three offline outlets. The merchant should see a forecast cash gap, compare actions, and delegate a supplier negotiation within a signed mandate. The demo's technical center is an intent and drift check that compares the merchant's original goal, the mandate, and each proposed runtime action. A separate RiskOps view shows the same case evidence and interventions.

## Core journey

1. Merchant home shows the synthetic 5 November cash-gap alert and the source status.
2. Cash plan shows the dated inflows, obligations, assumptions, and options. The owner opens the supplier option.
3. Munim prepares terms for Gupta Distributors. Supplier replies are simulated and explicitly labelled. The merchant can inspect the negotiated terms and the original mandate.
4. The backend checks a normal proposal, a semantic drift case, and a hard-rule violation. It returns a decision and a trace of the checks, tool events, and source fields.
5. The merchant sees what happened in plain language. RiskOps sees the exception, original intent versus runtime action, trace, and a pause control.
6. A partner-loan branch may prepare an application and show its purpose, but bureau consent and final application consent remain with the authorized signatory; no real bureau or lender call occurs.

## Data and claims

- All merchants, amounts, transactions, supplier replies, AA data, credit offers, and actions are synthetic. The demo clock is 30 October 2026.
- The AA consent is represented as already active. A simulated data request supplies bank balances and obligations; no real AA connection exists.
- Payment transactions support outlet-level sales-value and cash timing forecasts. They do not reveal item-level sales. Any gift-box allocation is a merchant-provided order distributed using a labelled outlet-velocity proxy, never presented as observed SKU demand.
- Supplier deferred terms are shown separately from bank/NBFC credit. No real order, payment, or loan is sent.
- The demo evidence is a local/session trace with a hash, not an independently anchored audit log.

## Product boundaries

- Merchant owner is the commercial decision-maker and can set a mandate. The delegated agent may act within the mandate in the scenario; unknown payees, changed accounts, changed purpose, or terms outside limits stop or escalate.
- RiskOps sees exceptions and can pause a delegate. It does not silently rewrite merchant terms.
- The server implements hard-rule checks and a transparent semantic drift evaluator over structured scenario data. This is a demonstrable engine, not a claim of production-grade LLM accuracy.
- The first demo preserves the Stitch mobile visual language: Paytm navy and blue, white cards, clear amounts, 48px tap targets, and straightforward Hindi/English merchant copy. A desktop RiskOps layout complements the mobile merchant flow.

## Success for this build

- A user can complete the merchant journey without dead ends.
- The normal case passes, the drift case escalates with the reason, and a changed payee account blocks.
- RiskOps can inspect the same trace and pause a delegate within the demo session.
- Backend tests and a production build pass. Private deployment opens successfully.

## Later decisions

Real Paytm POS or transaction access, real AA FIU status/integration, authenticated supplier acceptance, live payment rails, persistent externally verifiable audit storage, and measured merchant/acquirer outcomes require separate work.
