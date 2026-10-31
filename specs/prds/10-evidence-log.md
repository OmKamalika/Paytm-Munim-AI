# PRD-10 · Evidence log (hash-chained)

**Product:** PayTMunim · **Phase:** 0 · **AI:** No
**Depends on:** 07, 08, 09 · **Feeds:** 23 CA pack, lenders (proof of end use), 11 Safety tests
**Status:** v1 · 30 Oct 2026

---

## 1. Summary

Every guard decision, approval, rule change and mapping change is written to an append-only log. Each entry includes the hash of the one before it, so changing or deleting any past entry breaks the chain and verification fails. The owner can read it, verify it, and share selected entries with a lender or their CA.

## 2. Problem

Lenders need proof of where money went. Owners need to know who did what when they weren't there. Disputes need a record nobody can quietly edit, including us.

## 3. Users

Owner (reads, verifies, shares); lender (receives an evidence pack for its drawdown); CA (receives a month's pack); Paytm support (investigates with the owner's permission).

## 4. Scope

**In:** append-only entries; SHA-256 chain; verification; owner's timeline view; share selected entries as a signed JSON and a PDF summary.
**Later:** anchoring the daily head hash with an external timestamp; lender API delivery.
**Out:** storing raw documents in the log (only their hashes).

## 5. Entry

```json
{
  "seq": 2611,
  "id": "EP-2611",
  "time": "2026-11-04T10:02:11+05:30",
  "event": "action_decided",
  "action": {"type": "drawdown", "amount": 200000, "payee_id": "SUP-GUPTA", "account_last4": "7781", "lender_id": "LND-A", "invoice_id": "GD-1182"},
  "actor": {"role": "owner", "user_id": "U-01", "device_id": "D-OWN-1"},
  "rules": {"version": "r1", "results": [{"id": "R07", "result": "PASS"}, ...]},
  "ai_check": {"verdict": "no_concern", "model": "…", "prompt_version": "ic-1", "input_hash": "…"},
  "decision": "ALLOWED",
  "approval": {"by": "U-01", "method": "pin", "action_hash": "…"},
  "mandate_version": 1,
  "attachments": [{"name": "GD-1182.pdf", "sha256": "…"}],
  "prev_hash": "5b0e…",
  "hash": "9f3a…c41"
}
```
`hash = SHA-256(prev_hash ‖ canonical_json(entry without hash))`. Canonical JSON: sorted keys, no spaces, UTF-8. The first entry's `prev_hash` is the genesis hash of the data set (PRD 01).

## 6. What gets logged

| Event | Logged |
|---|---|
| Guard decision (ALLOWED, BLOCKED, ESCALATED → approved, declined, expired) | yes |
| Owner approval or decline | yes |
| Rule change (with diff) | yes |
| Mapping change | yes |
| Injection attempt detected (agent, outflow labeller, AI check) | yes |
| Consent given or revoked (Phase 1) | yes |
| Agent answers | no (agent logs are separate operational logs) |

## 7. User journey

1. Owner opens Munim > Evidence log.
2. Sees a timeline: newest first, each with a status chip, one line of what happened, who, and the evidence ID.
3. Taps an entry: full detail, rule results, AI check, approval, hash.
4. Taps **Verify chain**: "Chain verified · 2,611 entries · head 9f3a…c41".
5. Selects the drawdown entry and taps **Share with lender** → chooses Lender A → a pack is generated (JSON plus PDF, entries plus the chain proof) and sent through the lender channel (simulated in Phase 0).

## 8. Functional requirements

| ID | Requirement |
|---|---|
| FR-01 | Append-only: no update or delete API exists. Database role for the app has INSERT and SELECT only on the log table. |
| FR-02 | Writes are serialised so each entry's `prev_hash` is the latest head; concurrent writers retry. |
| FR-03 | `verify(from_seq?, to_seq?)` recomputes hashes and reports the first broken entry, if any. |
| FR-04 | Entries store amounts, IDs, last-4 digits and hashes; never full account numbers, PINs, raw documents or customers' VPAs. |
| FR-05 | A share pack contains the selected entries, the hashes of the entries between them, and the head hash, so a receiver can verify inclusion. |
| FR-06 | Sharing requires the owner's PIN and names the recipient; the share itself is logged. |
| FR-07 | Staff can't open the log. |
| FR-08 | The log writes before the action executes; if the write fails, the action doesn't execute. |
| FR-09 | Reset (demo only, PRD 01) starts a new chain with a new genesis and records the old head hash in `dataset_meta`. |

## 9. Edge cases

| ID | Case | Expected |
|---|---|---|
| EC-01 | Someone edits an entry in the database directly | Verify fails at that entry: "Entry EP-2604 doesn't match its hash." |
| EC-02 | An entry is deleted | Verify fails at the next entry (prev_hash mismatch). |
| EC-03 | Two decisions at the same millisecond | Serialised; sequence numbers strictly increase. |
| EC-04 | Log write fails | Action doesn't execute; owner sees "Couldn't record this, so it wasn't done. Try again." |
| EC-05 | Very large log | Verification of a range runs in under 2 s for 10,000 entries. |
| EC-06 | Share with a lender not on the approved list | Not offered. |

## 10. Acceptance criteria

```gherkin
AC-01 Every decision logged
  Given the demo runs the Diwali drawdown, the injected invoice and the split refund
  When I open the evidence log
  Then I see ALLOWED, ESCALATED and BLOCKED entries with rule results and evidence IDs

AC-02 Chain verifies
  Given an untouched log
  When I tap Verify chain
  Then I see "Chain verified" with the entry count and head hash

AC-03 Tamper detected
  Given I change the amount in entry EP-2604 directly in the database
  When I tap Verify chain
  Then I see "Entry EP-2604 doesn't match its hash"

AC-04 Log before execute
  Given the log table is unavailable
  When the owner approves a drawdown
  Then the drawdown doesn't execute and the owner sees "Couldn't record this, so it wasn't done"

AC-05 No sensitive data
  Given any log entry
  When I read it
  Then it has no PIN, no full account number and no customer VPA

AC-06 Share pack verifies
  Given the owner shares EP-2611 with Lender A
  When the lender's verifier recomputes the hashes in the pack
  Then EP-2611's inclusion under the head hash checks out
```

## 11. Textual wireframes

**W10 · Evidence log**
```
┌──────────────────────────────────────────┐
│ (<)  Evidence log · Intent Guard         │
├──────────────────────────────────────────┤
│ 4 Nov 10:02 · ✅ ALLOWED                  │
│ Drawdown ₹2,00,000 · Lender A → Gupta    │
│ Rules 5/5 · AI: no concern · you (PIN)   │
│ EP-2611 · 9f3a…c41                       │
├──────────────────────────────────────────┤
│ 29 Oct 21:47 · ⛔ BLOCKED                 │
│ 3rd refund of ₹450 to one UPI ID in      │
│ 20 min · Sion counter · EP-2609          │
├──────────────────────────────────────────┤
│ 29 Oct 16:05 · ⛔ BLOCKED                 │
│ Invoice account ··9910 isn't Gupta's     │
│ verified ··7781 · EP-2604                │
├──────────────────────────────────────────┤
│ 28 Oct 11:30 · ⚠ ESCALATED → declined    │
│ Invoice text said "ignore the rules…"    │
│ AI check · you declined · EP-2598        │
├──────────────────────────────────────────┤
│ [ Verify chain ]  ✓ verified · 2,611     │
│ [ Share with lender ] [ Share with CA ]  │
└──────────────────────────────────────────┘
```

**Entry detail**
```
┌──────────────────────────────────────────┐
│ (<)  EP-2611 · ALLOWED                   │
├──────────────────────────────────────────┤
│ 4 Nov 2026, 10:02 am · by you (PIN)      │
│ Drawdown ₹2,00,000 from Lender A         │
│ Paid to Gupta Distributors ··7781        │
│ Invoice GD-1182 · file hash 1d9c…        │
├──────────────────────────────────────────┤
│ RULES (v r1)                             │
│ ✓ R07 approved supplier                  │
│ ✓ R08 verified account                   │
│ ✓ R09 account unchanged 30 days          │
│ ✓ R10 approved lender, offer valid       │
│ ✓ R11 EMIs ₹90,730 ≤ cap ₹1.52L          │
│ ✓ R12 not a duplicate                    │
│ ✓ R13 ≤ invoice balance                  │
│ ● R14 above ₹50,000 → needed you         │
│ ✓ R15 inside plan                        │
├──────────────────────────────────────────┤
│ AI CHECK  no concern · ic-1              │
│ HASH  9f3a…c41  PREV  5b0e…77a           │
└──────────────────────────────────────────┘
```

## 12. Metrics (pilot)

Packs shared with lenders and CAs; verification failures (should be zero); lender feedback on usefulness for end-use proof.

## 13. Open questions

1. Retention: how long, given DPDP and lender audit needs? Proposed: 8 years for money actions (aligned with accounting record rules), with the owner able to export.
2. Should the daily head hash be published somewhere external (e.g. emailed to the owner) to make our own tampering detectable?
