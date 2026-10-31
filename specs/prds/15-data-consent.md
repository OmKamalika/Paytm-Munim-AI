# PRD-15 · Data consent (Account Aggregator)

**Product:** PayTMunim · **Phase:** 1 (simulated in Phase 0) · **AI:** No
**Depends on:** none · **Feeds:** 01 (real bank and GST data), 06 (lender data)
**Status:** v1 · 30 Oct 2026

---

## 1. Summary

Two kinds of consent, never merged. **Consent 1** lets Paytm Payments Services, as the Financial Information User (FIU), fetch the business's bank statements and GST returns through the owner's Account Aggregator, for reporting to the owner: profit, cash plan, checks. **Consent 2** is separate for each lender, so each lender fetches the data it needs for its own underwriting. The owner can see and revoke any consent in one tap.

## 2. Problem

The cash plan needs bank and GST data that Paytm doesn't have. Taking it the wrong way (one broad consent, or sharing Paytm data with lenders without asking) breaks trust and RBI's AA framework. A consent artefact names one data receiver and one purpose; reporting and underwriting are different purposes.

## 3. Users

Owner (gives and revokes); Paytm Payments Services (FIU for Consent 1); each lender (FIU for its own Consent 2); the Account Aggregator (consent manager).

## 4. Scope

**In:** Consent 1 request and status; Consent 2 per lender; consent list; revoke; data deletion on revoke; composition-scheme path without GST.
**Phase 0:** both consents are seeded as "given"; screens are shown with a "Simulated" label.
**Out:** consent for customers' data; any data sharing without an AA consent.

## 5. Consent details

| | Consent 1 · For your Munim | Consent 2 · For a lender |
|---|---|---|
| Data receiver (FIU) | Paytm Payments Services | Each lender separately |
| Data | Bank statements (one or more accounts); GST returns (GSTR-1, GSTR-3B) | What the lender asks for (bank, GST) |
| Purpose | Reporting for you (AA purpose code 102) | Underwriting (code 105, one time) or monitoring (code 104) |
| Fetch | Bank daily, GST monthly | Per the lender's request |
| Validity | 12 months | Per the lender |
| Paytm collections | Already Paytm's own data | Shared with a lender only if the owner ticks "Also share my Paytm collections" |
| Revocation | One tap; fetching stops; fetched data deleted within 30 days except what the law requires us to keep | One tap via the AA; the lender's own retention applies to data already fetched |

## 6. User journeys

**6a. Give Consent 1 (about 2 minutes)**
1. Owner sees "Connect your bank and GST so your Munim can plan cash" on home or after outlet mapping.
2. Opens W2: receiver, data, purpose, fetch frequency, validity, in plain words.
3. Picks bank account(s). Toggles GST (off for composition-scheme dealers).
4. Taps **Approve on your AA app** → redirected to the AA (or the AA's in-app flow) → OTP → approves.
5. Returns to PayTMunim: "Connected · first fetch in progress". Cash plan fills in within a few minutes.

**6b. Give Consent 2 to a lender**
1. From the Capital tab: "See offers from Lender A? Lender A asks to check your bank data for its decision."
2. Screen shows: Lender A as the receiver, data, purpose (underwriting), one-time, and a tick box "Also share my Paytm collections with Lender A" (unticked by default).
3. AA approval with OTP. Lender A's pre-approved line appears when its decision is back.

**6c. Revoke**
1. More > Consents: list of active consents with receiver, purpose, valid till.
2. Taps **Stop sharing** on Consent 1 → confirm → revoked at the AA.
3. Munim shows "Bank data off. Your cash plan uses Paytm collections only." Labels change to "Paytm only".

## 7. Functional requirements

| ID | Requirement |
|---|---|
| FR-01 | Consent requests follow the AA consent artefact fields: FIU, purpose code, FI types, date range, frequency, data life, expiry. |
| FR-02 | Consent 1 and Consent 2 are separate artefacts with separate receivers; no screen requests both at once. |
| FR-03 | Paytm collections are shared with a lender only on an explicit, separate tick, recorded per lender. |
| FR-04 | Revocation status from the AA is checked before every fetch; a revoked consent stops fetching immediately. |
| FR-05 | On Consent 1 revocation, fetched bank and GST data is deleted within 30 days (except where law requires retention); derived figures are marked "from revoked data" until recalculated. |
| FR-06 | Every consent event (requested, approved, rejected, revoked, expired) is in the evidence log. |
| FR-07 | Without GST data, all modules work and label GST-dependent figures (e.g. GST outflow dates) as "estimated from bank data". |
| FR-08 | Consent expiry reminder 15 days before; renewal is the same flow. |
| FR-09 | Data is used only for the stated purpose; no marketing use; no sharing with third parties beyond the consented receiver. |
| FR-10 | Phase 0: a consent simulator returns "active" and serves seeded ReBIT JSON through the same interface. |

## 8. Edge cases

| ID | Case | Expected |
|---|---|---|
| EC-01 | Owner's bank not on the AA network | "Your bank isn't on the Account Aggregator yet." Munim works on Paytm data only. |
| EC-02 | AA approval abandoned | Status "Not approved"; retry button; no partial data. |
| EC-03 | Multiple bank accounts | Owner picks which; cash plan combines them; per-account labels. |
| EC-04 | Composition scheme (CMP-08, no GSTR-1/3B) | GST toggle off by default when the GSTIN is a composition dealer. |
| EC-05 | Fetch fails (bank down) | Plan shows "Bank data last updated <date>"; retry with backoff. |
| EC-06 | Consent expires | Fetching stops; banner to renew; plan labels switch to Paytm-only after the last fetch ages 3 days. |
| EC-07 | Lender asks for more than it needs | Shown plainly; owner can decline that lender only. |
| EC-08 | Owner revokes Consent 2 after a drawdown | Future fetches stop; the loan continues under the lender's terms. |

## 9. Acceptance criteria

```gherkin
AC-01 Separate consents
  Given an owner with no consents
  When they connect their data for the Munim
  Then only Consent 1 is requested, with Paytm Payments Services as receiver and purpose 102

AC-02 Paytm data to lenders only on a tick
  Given the owner gives Consent 2 to Lender A without ticking "Also share my Paytm collections"
  When Lender A requests data
  Then Lender A receives only AA bank data, no Paytm collections

AC-03 Revoke stops fetching
  Given Consent 1 is active
  When the owner taps Stop sharing and confirms
  Then the AA shows it revoked
  And no further fetch happens
  And the cash plan labels change to "Paytm only"

AC-04 Composition dealer
  Given a composition-scheme GSTIN
  When the consent screen opens
  Then GST is off by default with the note "The Munim works without GST data"

AC-05 Logged
  Given any consent event
  When I open the evidence log
  Then it shows the event, receiver, purpose and time

AC-06 Simulated in Phase 0
  Given demo mode
  When any consent screen shows
  Then it carries a "Simulated" label and no real AA call is made
```

## 10. Textual wireframes

**W2 · Connect your data**
```
┌──────────────────────────────────────────┐
│ (<)  Munim · Connect your data           │
├──────────────────────────────────────────┤
│ CONSENT 1 · FOR YOUR MUNIM               │
│ Receiver  Paytm Payments Services (FIU)  │
│ Through   your Account Aggregator        │
│ Data      ☑ Bank a/c ··4521 statements   │
│           ☑ GST returns GSTR-1, GSTR-3B  │
│ Purpose   Reporting for you (code 102):  │
│           profit, cash plan, checks      │
│ Fetch     bank daily, GST monthly        │
│ Valid     12 months                      │
│ [ Approve on your AA app ]               │
├──────────────────────────────────────────┤
│ CONSENT 2 · ONLY IF YOU USE CAPITAL      │
│ Each lender asks you separately, for its │
│ own decision. Lenders see your Paytm     │
│ collections only if you say yes.         │
├──────────────────────────────────────────┤
│ Composition scheme? The Munim works      │
│ without GST data.                        │
│ Stop sharing any time: More > Consents   │
└──────────────────────────────────────────┘
```

**Consent 2 (Lender A)**
```
┌──────────────────────────────────────────┐
│ Lender A wants to check your data        │
├──────────────────────────────────────────┤
│ Receiver  Lender A (bank)                │
│ Data      Bank statements, 12 months     │
│ Purpose   Its loan decision (one time)   │
│ ☐ Also share my Paytm collections        │
├──────────────────────────────────────────┤
│ Paytm doesn't decide your loan. Lender A │
│ does, on data you share with it.         │
│ [ Not now ]   [ Approve on your AA app ] │
└──────────────────────────────────────────┘
```

**Consents list**
```
┌──────────────────────────────────────────┐
│ (<)  Consents                            │
├──────────────────────────────────────────┤
│ Your Munim · Paytm Payments Services     │
│ Bank, GST · reporting · till Oct 2027    │
│ [ Stop sharing ]                         │
├──────────────────────────────────────────┤
│ Lender A · underwriting · one time       │
│ Bank only · given 30 Oct                 │
│ [ Stop sharing ]                         │
└──────────────────────────────────────────┘
```

## 11. Metrics (pilot)

Consent 1 completion rate; drop-off at the AA step; revocations per month; share of owners with GST off.

## 12. Open questions

1. Paytm Payments Services' status as an FIU and its AA integrations need confirming with Paytm.
2. DPDP consent-manager rules from 13 Nov 2026 and duties from 13 May 2027: confirm notice wording with Paytm legal.
