# PRD-14 · Outlet mapping and staff roster

**Product:** PayTMunim · **Phase:** 1 (seeded in Phase 0) · **AI:** No
**Depends on:** none · **Feeds:** 01, 16, 18, 19, 20
**Status:** v1 · 30 Oct 2026

---

## 1. Summary

The owner tells the Munim which Paytm QR, Soundbox and card machine sits at which outlet, and who works where. Everything per-outlet (forecast, profit, shift check, staff limits) depends on this. Paytm already knows the devices; this adds the outlet tag and the roster. Only the owner can change it.

## 2. Problem

One business, one bank account, several counters. Without device-to-outlet tags, Paytm's collections can't be split by outlet, and the second-outlet blindness stays.

## 3. Users

Owner (maps once, changes rarely); cashiers and managers (assigned to an outlet); Intent Guard (R17 blocks staff changes).

## 4. Scope

**In:** create outlets (name, address, hours, shifts); assign each device; add other QRs (non-Paytm) by name only; staff roster with role, outlet, shift; invite staff to their restricted login.
**Out:** buying devices; payroll; attendance.

## 5. User journey (about 5 minutes)

1. Owner opens Munim for the first time → "Set up your outlets".
2. The app lists the business's Paytm devices: 3 QRs, 3 Soundboxes, 3 card machines, with serial ends and where they've been used (last-seen location, if Paytm has it).
3. Owner creates 3 outlets: Dadar, Matunga, Sion (names, opening hours 8 am-10 pm, shifts 8-3 and 3-10).
4. Drags or taps to assign each device. Suggested assignment shown where location data exists: "These 3 devices were last used near Dadar · Assign all?"
5. Adds other QRs at each counter by label only ("QR 2 · PhonePe", "QR 3 · Google Pay"); no data is fetched from them.
6. Adds 7 staff: name, phone, role, outlet, shift. Each gets an SMS invite to the restricted cashier or manager view.
7. Taps **Done** → PIN → "3 outlets, 9 devices, 7 staff saved".

## 6. Functional requirements

| ID | Requirement |
|---|---|
| FR-01 | Every Paytm device belongs to exactly one outlet or to "Unassigned". |
| FR-02 | Collections are tagged to outlets from the moment of mapping; history is back-tagged using the device's history (devices don't move often; moves are versioned with dates). |
| FR-03 | Device moves are effective-dated: collections before the move stay with the old outlet. |
| FR-04 | Mapping changes require the owner's PIN and are logged (PRD 10). Staff sessions get R17 BLOCK. |
| FR-05 | Other QRs are labels for handover totals only; PayTMunim never connects to another provider's account. |
| FR-06 | Staff invite links expire in 48 hours; staff log in with their own phone number and OTP. |
| FR-07 | A staff member can belong to one outlet at a time (Phase 1). |
| FR-08 | Unassigned devices show a banner on home until assigned. |

## 7. Edge cases

| ID | Case | Expected |
|---|---|---|
| EC-01 | Device moved between outlets mid-month | Effective-dated; profit splits by date. |
| EC-02 | Shared QR used at two outlets | Not allowed; owner must pick one; suggest a second QR. |
| EC-03 | New device arrives | Appears as Unassigned with a home banner. |
| EC-04 | Staff member leaves | Owner deactivates; sessions end immediately; history kept. |
| EC-05 | Single-outlet merchant | One outlet created automatically; mapping screen skipped. |
| EC-06 | Cashier tries to move a QR | R17 BLOCK; owner notified (red-team RT11). |
| EC-07 | Staff phone is the owner's number | Rejected; owner and staff logins must differ. |

## 8. Acceptance criteria

```gherkin
AC-01 Map devices
  Given 9 unassigned Paytm devices
  When the owner assigns 3 to each of Dadar, Matunga and Sion and confirms with PIN
  Then each device has one outlet and the mapping is in the evidence log

AC-02 Collections split
  Given devices are mapped
  When I read today's collections
  Then they show per outlet: Dadar ₹4,980, Matunga ₹3,120, Sion ₹2,040 (seeded)

AC-03 Effective-dated move
  Given QR-2 moved from Matunga to Sion on 15 Oct
  When October collections are split
  Then QR-2's payments before 15 Oct count for Matunga and after for Sion

AC-04 Staff can't change mapping
  Given a cashier session
  When it tries to move a device
  Then the change is blocked by R17 and the owner is notified

AC-05 Staff invite
  Given the owner adds a cashier for Sion
  When the cashier opens the invite within 48 hours and verifies OTP
  Then they see only the Sion cashier view
```

## 9. Textual wireframes

**Set up your outlets**
```
┌──────────────────────────────────────────┐
│ (<)  Your outlets · step 1 of 3          │
├──────────────────────────────────────────┤
│ DADAR  8 am-10 pm · 2 shifts     [edit]  │
│  ▣ QR ··0412  ◉ Soundbox ··88  ▭ EDC ··31│
├──────────────────────────────────────────┤
│ MATUNGA 8 am-10 pm · 2 shifts    [edit]  │
│  ▣ QR ··0419  ◉ Soundbox ··91  ▭ EDC ··35│
├──────────────────────────────────────────┤
│ SION   8 am-10 pm · 2 shifts     [edit]  │
│  ▣ QR ··0423  ◉ Soundbox ··97  ▭ EDC ··40│
├──────────────────────────────────────────┤
│ UNASSIGNED · 0                           │
│ [ + Add outlet ]                         │
├──────────────────────────────────────────┤
│ Other QRs at your counters (labels only) │
│ Dadar: QR 2, QR 3 [edit]                 │
├──────────────────────────────────────────┤
│ [ Next: your staff ]                     │
└──────────────────────────────────────────┘
```

**Staff**
```
┌──────────────────────────────────────────┐
│ (<)  Your staff · step 2 of 3            │
├──────────────────────────────────────────┤
│ Suresh   Manager · Dadar · both shifts   │
│ Ravi     Cashier · Dadar · morning       │
│ Anil     Cashier · Dadar · evening       │
│ Pooja    Cashier · Matunga · morning     │
│ …                                        │
├──────────────────────────────────────────┤
│ [ + Add staff ]                          │
│ Each gets an SMS invite to a limited     │
│ view of their outlet only.               │
│ [ Next: your rules ]                     │
└──────────────────────────────────────────┘
```

## 10. Metrics (pilot)

Time to map; share of devices unassigned after 7 days; mapping changes per month.

## 11. Open questions

1. Can Paytm's device location data be used to suggest assignments, under existing consent? If not, the owner assigns manually.
