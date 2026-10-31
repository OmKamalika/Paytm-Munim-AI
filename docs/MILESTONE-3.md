# Milestone 3 — simulated delegated operations

The merchant starts a business intent. A shared backend creates each external request and holds the run while the simulator operator selects a response. RiskOps watches the same server runs, disclosures, guards, and traces. All external systems and money movement are synthetic; supplied CSV, Excel, ReBIT, and invoice JSON files are the source fixtures. No PostgreSQL database is created.

## Selected demo journeys

- Gupta negotiation: accepted terms, commercial drift requiring owner sign-off, changed beneficiary blocked, and supplier refusal.
- Invoice evidence: header-only GD-1182 fails closed; full INV-07 can pass evidence checks; duplicate, changed-account, and instruction-bearing source documents are flagged.
- AA and lender requests: complete, partial, malformed, unavailable, expired consent, and lender decline responses.
- Know Your Agent: simulated identity, scope, amount authority, expiry, and revocation checks for the larger delegated capital request.
- Informed owner consent: immutable disclosure of original purpose, proposed terms, changes, evidence, risks, alternatives, and data shared. A sign-off binds to that disclosure version and action.
- Simulated Paytm supplier payment and drawdown: success, failure, and unresolved pending responses; one successful response can create one ledger effect.

## State and observability

Every run has a run ID, trace ID, correlated requests, actor roles, tool spans, structured intent changes, guard actions, judge outcomes, and a hash-chained journal. RiskOps refreshes shared state across browser tabs. The judge responses are explicitly simulated and can only add a hold or escalation to deterministic guard results.

The roles are demo actor labels, not authenticated production users. State and journal are process-local and reset on server restart. The journal has no external audit anchor. No real payment, supplier communication, AA consent, bureau pull, lender application, or agent credential is sent.

## Active V4 source boundary

Invoice line items show billed purchase quantities. They do not measure current inventory or retail sell-through. Unpaid bills come from invoice/upload evidence; bank transactions show historical payments. The active narration parser excludes synthetic `label_*` answer keys. V4 includes the complete financial year: 53 matched Gupta debits total ₹62,86,960, giving a ₹69,15,656 ceiling. V2 and V3 remain preserved with hashes; V3's missing-April calculation is retained as a partial-history test case.

All 120 supplied source files are in the manifest, including the CSV/Excel versions, invoice bodies, ReBIT Deposit and GST mirrors, markdown, and generator code. V4 GST has 18 filed periods through September; October is an estimate. Mirror consistency is checked, while the source's GST XSD caveat remains explicit.

## Demonstration and selected evaluations

Open `/`, `/simulator`, and `/riskops` in separate tabs. Start an intent in Ask Munim. The simulator responds only to a currently open correlated request. RiskOps displays the same run and the exact disclosure visible to the merchant. Configure the owner PIN privately before demonstrating an approved action.

`npm run eval:flows` exercises the selected flows: full/header invoice, instruction attack, changed account, duplicate, supplier drift, judge concern/unavailability, AA failure/partial data, bureau and lender failure, structured KYA success/failure, stale disclosure/response, pending reconciliation, global pause, evidence tampering, source completeness, and cross-runtime duplicate prevention. A pending payment retains its shared invoice reservation and checks the original instruction's status; a failure releases it; success commits once.
