// Generated from data/synthetic/*.csv by scripts/derive-synthetic-data.mjs.
// Do not edit this snapshot by hand; synthetic labels are not live AA attestations.
export const syntheticSource = {
  "synthetic": true,
  "asOf": "2026-10-30",
  "provenance": {
    "description": "User supplied synthetic CSV fixture. Bank label_* fields are generator ground truth, not bank-attested beneficiary identity.",
    "aaConsent": "simulated; bank rows unlock only after aa_available simulator dispatch",
    "rowCounts": {
      "bankStatement": 7793,
      "paytmTransactions": 114790,
      "shiftHandovers": 3282,
      "outlets": 3,
      "suppliers": 7,
      "invoices": 6
    },
    "sha256": {
      "bankStatement": "2dcc82d24b3193cc54ec23de5d3b6493b4c78f7c57918500517fcc2e05611377",
      "paytmTransactions": "e39cbafc179573d9d096b62facf9bb4b6f92f3d90a3662f72ccfeeeb223d7045",
      "shiftHandovers": "3f996065e6edc9cdbf92c780d69cc6f453278dd23100638995165d2c618d0da2",
      "outlets": "48483f89c8fcead1c40c2343f5174349fbcb9da804cc9b7f3cf24c2817230fab",
      "suppliers": "3099f9ad0fe3e61c3898319958c275d7f074e0274f667724bae7f65eefec1723",
      "invoices": "ccce378d1f1f3ac26838e460418eec4cd124574e33efbe06bad8d59658172a28"
    }
  },
  "outletMetrics": [
    {
      "id": "DAD",
      "name": "Dadar",
      "monthlyTarget": 900000,
      "averageMonthlyAllChannelCollections": 900000,
      "averageMonthlyPaytmCollections": 224945,
      "paytmToday": 4980,
      "diwaliWeek2025Multiplier": 1.8
    },
    {
      "id": "MAT",
      "name": "Matunga",
      "monthlyTarget": 600000,
      "averageMonthlyAllChannelCollections": 600000,
      "averageMonthlyPaytmCollections": 149968,
      "paytmToday": 3120,
      "diwaliWeek2025Multiplier": 1.5
    },
    {
      "id": "SIO",
      "name": "Sion",
      "monthlyTarget": 400000,
      "averageMonthlyAllChannelCollections": 400000,
      "averageMonthlyPaytmCollections": 100164,
      "paytmToday": 2040,
      "diwaliWeek2025Multiplier": 1.5
    }
  ],
  "handoverShifts": [
    {
      "date": "2025-05-01",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12305
    },
    {
      "date": "2025-05-01",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16157
    },
    {
      "date": "2025-05-01",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7956
    },
    {
      "date": "2025-05-01",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17361
    },
    {
      "date": "2025-05-01",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5919
    },
    {
      "date": "2025-05-01",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7278
    },
    {
      "date": "2025-05-02",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12327
    },
    {
      "date": "2025-05-02",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15462
    },
    {
      "date": "2025-05-02",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7940
    },
    {
      "date": "2025-05-02",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9224
    },
    {
      "date": "2025-05-02",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5089
    },
    {
      "date": "2025-05-02",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6418
    },
    {
      "date": "2025-05-03",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14413
    },
    {
      "date": "2025-05-03",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17828
    },
    {
      "date": "2025-05-03",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8610
    },
    {
      "date": "2025-05-03",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11895
    },
    {
      "date": "2025-05-03",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6293
    },
    {
      "date": "2025-05-03",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8116
    },
    {
      "date": "2025-05-04",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14255
    },
    {
      "date": "2025-05-04",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17352
    },
    {
      "date": "2025-05-04",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8431
    },
    {
      "date": "2025-05-04",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10233
    },
    {
      "date": "2025-05-04",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6766
    },
    {
      "date": "2025-05-04",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7953
    },
    {
      "date": "2025-05-05",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13229
    },
    {
      "date": "2025-05-05",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15748
    },
    {
      "date": "2025-05-05",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8521
    },
    {
      "date": "2025-05-05",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10202
    },
    {
      "date": "2025-05-05",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5727
    },
    {
      "date": "2025-05-05",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6449
    },
    {
      "date": "2025-05-06",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12141
    },
    {
      "date": "2025-05-06",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14071
    },
    {
      "date": "2025-05-06",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8167
    },
    {
      "date": "2025-05-06",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9692
    },
    {
      "date": "2025-05-06",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5655
    },
    {
      "date": "2025-05-06",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7618
    },
    {
      "date": "2025-05-07",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13251
    },
    {
      "date": "2025-05-07",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16108
    },
    {
      "date": "2025-05-07",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7744
    },
    {
      "date": "2025-05-07",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8974
    },
    {
      "date": "2025-05-07",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5264
    },
    {
      "date": "2025-05-07",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6646
    },
    {
      "date": "2025-05-08",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12698
    },
    {
      "date": "2025-05-08",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14687
    },
    {
      "date": "2025-05-08",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7633
    },
    {
      "date": "2025-05-08",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16504
    },
    {
      "date": "2025-05-08",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5602
    },
    {
      "date": "2025-05-08",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7141
    },
    {
      "date": "2025-05-09",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12104
    },
    {
      "date": "2025-05-09",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15327
    },
    {
      "date": "2025-05-09",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8870
    },
    {
      "date": "2025-05-09",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9430
    },
    {
      "date": "2025-05-09",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5563
    },
    {
      "date": "2025-05-09",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6751
    },
    {
      "date": "2025-05-10",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15053
    },
    {
      "date": "2025-05-10",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18411
    },
    {
      "date": "2025-05-10",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9826
    },
    {
      "date": "2025-05-10",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11722
    },
    {
      "date": "2025-05-10",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6327
    },
    {
      "date": "2025-05-10",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7918
    },
    {
      "date": "2025-05-11",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 16206
    },
    {
      "date": "2025-05-11",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 19723
    },
    {
      "date": "2025-05-11",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8904
    },
    {
      "date": "2025-05-11",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10786
    },
    {
      "date": "2025-05-11",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7254
    },
    {
      "date": "2025-05-11",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8477
    },
    {
      "date": "2025-05-12",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12295
    },
    {
      "date": "2025-05-12",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15338
    },
    {
      "date": "2025-05-12",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7913
    },
    {
      "date": "2025-05-12",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9910
    },
    {
      "date": "2025-05-12",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6743
    },
    {
      "date": "2025-05-12",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7435
    },
    {
      "date": "2025-05-13",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12097
    },
    {
      "date": "2025-05-13",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14794
    },
    {
      "date": "2025-05-13",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7309
    },
    {
      "date": "2025-05-13",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9046
    },
    {
      "date": "2025-05-13",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5951
    },
    {
      "date": "2025-05-13",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6792
    },
    {
      "date": "2025-05-14",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13492
    },
    {
      "date": "2025-05-14",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16359
    },
    {
      "date": "2025-05-14",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7399
    },
    {
      "date": "2025-05-14",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10035
    },
    {
      "date": "2025-05-14",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5363
    },
    {
      "date": "2025-05-14",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6864
    },
    {
      "date": "2025-05-15",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12216
    },
    {
      "date": "2025-05-15",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14861
    },
    {
      "date": "2025-05-15",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7944
    },
    {
      "date": "2025-05-15",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15813
    },
    {
      "date": "2025-05-15",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5593
    },
    {
      "date": "2025-05-15",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7100
    },
    {
      "date": "2025-05-16",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13215
    },
    {
      "date": "2025-05-16",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15738
    },
    {
      "date": "2025-05-16",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7018
    },
    {
      "date": "2025-05-16",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8746
    },
    {
      "date": "2025-05-16",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5881
    },
    {
      "date": "2025-05-16",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7043
    },
    {
      "date": "2025-05-17",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15128
    },
    {
      "date": "2025-05-17",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18655
    },
    {
      "date": "2025-05-17",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9654
    },
    {
      "date": "2025-05-17",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12420
    },
    {
      "date": "2025-05-17",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7136
    },
    {
      "date": "2025-05-17",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7930
    },
    {
      "date": "2025-05-18",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14193
    },
    {
      "date": "2025-05-18",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18154
    },
    {
      "date": "2025-05-18",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8997
    },
    {
      "date": "2025-05-18",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10827
    },
    {
      "date": "2025-05-18",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6385
    },
    {
      "date": "2025-05-18",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7998
    },
    {
      "date": "2025-05-19",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11936
    },
    {
      "date": "2025-05-19",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14803
    },
    {
      "date": "2025-05-19",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8253
    },
    {
      "date": "2025-05-19",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9676
    },
    {
      "date": "2025-05-19",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6003
    },
    {
      "date": "2025-05-19",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7426
    },
    {
      "date": "2025-05-20",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13309
    },
    {
      "date": "2025-05-20",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17505
    },
    {
      "date": "2025-05-20",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7209
    },
    {
      "date": "2025-05-20",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8562
    },
    {
      "date": "2025-05-20",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5492
    },
    {
      "date": "2025-05-20",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6824
    },
    {
      "date": "2025-05-21",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11235
    },
    {
      "date": "2025-05-21",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14007
    },
    {
      "date": "2025-05-21",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8049
    },
    {
      "date": "2025-05-21",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11021
    },
    {
      "date": "2025-05-21",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5619
    },
    {
      "date": "2025-05-21",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6377
    },
    {
      "date": "2025-05-22",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13423
    },
    {
      "date": "2025-05-22",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16460
    },
    {
      "date": "2025-05-22",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7267
    },
    {
      "date": "2025-05-22",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13475
    },
    {
      "date": "2025-05-22",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5500
    },
    {
      "date": "2025-05-22",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6632
    },
    {
      "date": "2025-05-23",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12109
    },
    {
      "date": "2025-05-23",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15602
    },
    {
      "date": "2025-05-23",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7811
    },
    {
      "date": "2025-05-23",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8650
    },
    {
      "date": "2025-05-23",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5647
    },
    {
      "date": "2025-05-23",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6482
    },
    {
      "date": "2025-05-24",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13607
    },
    {
      "date": "2025-05-24",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16726
    },
    {
      "date": "2025-05-24",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10071
    },
    {
      "date": "2025-05-24",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11201
    },
    {
      "date": "2025-05-24",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5781
    },
    {
      "date": "2025-05-24",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7387
    },
    {
      "date": "2025-05-25",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13983
    },
    {
      "date": "2025-05-25",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16850
    },
    {
      "date": "2025-05-25",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9736
    },
    {
      "date": "2025-05-25",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11347
    },
    {
      "date": "2025-05-25",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7379
    },
    {
      "date": "2025-05-25",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8243
    },
    {
      "date": "2025-05-26",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12906
    },
    {
      "date": "2025-05-26",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16148
    },
    {
      "date": "2025-05-26",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7054
    },
    {
      "date": "2025-05-26",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9689
    },
    {
      "date": "2025-05-26",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5600
    },
    {
      "date": "2025-05-26",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6822
    },
    {
      "date": "2025-05-27",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12917
    },
    {
      "date": "2025-05-27",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16278
    },
    {
      "date": "2025-05-27",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7631
    },
    {
      "date": "2025-05-27",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9762
    },
    {
      "date": "2025-05-27",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5596
    },
    {
      "date": "2025-05-27",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7113
    },
    {
      "date": "2025-05-28",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11931
    },
    {
      "date": "2025-05-28",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14571
    },
    {
      "date": "2025-05-28",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7564
    },
    {
      "date": "2025-05-28",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9674
    },
    {
      "date": "2025-05-28",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5957
    },
    {
      "date": "2025-05-28",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6821
    },
    {
      "date": "2025-05-29",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11954
    },
    {
      "date": "2025-05-29",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14062
    },
    {
      "date": "2025-05-29",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7699
    },
    {
      "date": "2025-05-29",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13653
    },
    {
      "date": "2025-05-29",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4941
    },
    {
      "date": "2025-05-29",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6563
    },
    {
      "date": "2025-05-30",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12850
    },
    {
      "date": "2025-05-30",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15684
    },
    {
      "date": "2025-05-30",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8304
    },
    {
      "date": "2025-05-30",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9831
    },
    {
      "date": "2025-05-30",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5228
    },
    {
      "date": "2025-05-30",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6701
    },
    {
      "date": "2025-05-31",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15016
    },
    {
      "date": "2025-05-31",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18116
    },
    {
      "date": "2025-05-31",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8913
    },
    {
      "date": "2025-05-31",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11074
    },
    {
      "date": "2025-05-31",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5885
    },
    {
      "date": "2025-05-31",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7941
    },
    {
      "date": "2025-06-01",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13475
    },
    {
      "date": "2025-06-01",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16629
    },
    {
      "date": "2025-06-01",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9255
    },
    {
      "date": "2025-06-01",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11254
    },
    {
      "date": "2025-06-01",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6233
    },
    {
      "date": "2025-06-01",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7098
    },
    {
      "date": "2025-06-02",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11180
    },
    {
      "date": "2025-06-02",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14450
    },
    {
      "date": "2025-06-02",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7918
    },
    {
      "date": "2025-06-02",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9213
    },
    {
      "date": "2025-06-02",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5567
    },
    {
      "date": "2025-06-02",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6965
    },
    {
      "date": "2025-06-03",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11751
    },
    {
      "date": "2025-06-03",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15359
    },
    {
      "date": "2025-06-03",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8046
    },
    {
      "date": "2025-06-03",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8975
    },
    {
      "date": "2025-06-03",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5605
    },
    {
      "date": "2025-06-03",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6508
    },
    {
      "date": "2025-06-04",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12699
    },
    {
      "date": "2025-06-04",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14517
    },
    {
      "date": "2025-06-04",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7655
    },
    {
      "date": "2025-06-04",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9711
    },
    {
      "date": "2025-06-04",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5025
    },
    {
      "date": "2025-06-04",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6284
    },
    {
      "date": "2025-06-05",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11978
    },
    {
      "date": "2025-06-05",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15001
    },
    {
      "date": "2025-06-05",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8292
    },
    {
      "date": "2025-06-05",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15598
    },
    {
      "date": "2025-06-05",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5556
    },
    {
      "date": "2025-06-05",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6549
    },
    {
      "date": "2025-06-06",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12363
    },
    {
      "date": "2025-06-06",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16475
    },
    {
      "date": "2025-06-06",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7596
    },
    {
      "date": "2025-06-06",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8763
    },
    {
      "date": "2025-06-06",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5245
    },
    {
      "date": "2025-06-06",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6541
    },
    {
      "date": "2025-06-07",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14348
    },
    {
      "date": "2025-06-07",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16949
    },
    {
      "date": "2025-06-07",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9000
    },
    {
      "date": "2025-06-07",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10651
    },
    {
      "date": "2025-06-07",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7105
    },
    {
      "date": "2025-06-07",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7842
    },
    {
      "date": "2025-06-08",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14243
    },
    {
      "date": "2025-06-08",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17947
    },
    {
      "date": "2025-06-08",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9411
    },
    {
      "date": "2025-06-08",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11574
    },
    {
      "date": "2025-06-08",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6545
    },
    {
      "date": "2025-06-08",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7857
    },
    {
      "date": "2025-06-09",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13447
    },
    {
      "date": "2025-06-09",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15268
    },
    {
      "date": "2025-06-09",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7520
    },
    {
      "date": "2025-06-09",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9824
    },
    {
      "date": "2025-06-09",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5126
    },
    {
      "date": "2025-06-09",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6531
    },
    {
      "date": "2025-06-10",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11931
    },
    {
      "date": "2025-06-10",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14606
    },
    {
      "date": "2025-06-10",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8896
    },
    {
      "date": "2025-06-10",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11119
    },
    {
      "date": "2025-06-10",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4918
    },
    {
      "date": "2025-06-10",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6239
    },
    {
      "date": "2025-06-11",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14130
    },
    {
      "date": "2025-06-11",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16943
    },
    {
      "date": "2025-06-11",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7542
    },
    {
      "date": "2025-06-11",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8770
    },
    {
      "date": "2025-06-11",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5403
    },
    {
      "date": "2025-06-11",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6608
    },
    {
      "date": "2025-06-12",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13113
    },
    {
      "date": "2025-06-12",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16383
    },
    {
      "date": "2025-06-12",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7446
    },
    {
      "date": "2025-06-12",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14314
    },
    {
      "date": "2025-06-12",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5268
    },
    {
      "date": "2025-06-12",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6040
    },
    {
      "date": "2025-06-13",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11730
    },
    {
      "date": "2025-06-13",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13782
    },
    {
      "date": "2025-06-13",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7468
    },
    {
      "date": "2025-06-13",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8744
    },
    {
      "date": "2025-06-13",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5544
    },
    {
      "date": "2025-06-13",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6892
    },
    {
      "date": "2025-06-14",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14915
    },
    {
      "date": "2025-06-14",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17341
    },
    {
      "date": "2025-06-14",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9329
    },
    {
      "date": "2025-06-14",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13235
    },
    {
      "date": "2025-06-14",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6459
    },
    {
      "date": "2025-06-14",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7123
    },
    {
      "date": "2025-06-15",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13801
    },
    {
      "date": "2025-06-15",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17225
    },
    {
      "date": "2025-06-15",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8981
    },
    {
      "date": "2025-06-15",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10392
    },
    {
      "date": "2025-06-15",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6170
    },
    {
      "date": "2025-06-15",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7836
    },
    {
      "date": "2025-06-16",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15954
    },
    {
      "date": "2025-06-16",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17644
    },
    {
      "date": "2025-06-16",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9269
    },
    {
      "date": "2025-06-16",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10962
    },
    {
      "date": "2025-06-16",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5780
    },
    {
      "date": "2025-06-16",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6481
    },
    {
      "date": "2025-06-17",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10899
    },
    {
      "date": "2025-06-17",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14664
    },
    {
      "date": "2025-06-17",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7442
    },
    {
      "date": "2025-06-17",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8624
    },
    {
      "date": "2025-06-17",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5004
    },
    {
      "date": "2025-06-17",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 5998
    },
    {
      "date": "2025-06-18",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11798
    },
    {
      "date": "2025-06-18",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14307
    },
    {
      "date": "2025-06-18",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9022
    },
    {
      "date": "2025-06-18",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10716
    },
    {
      "date": "2025-06-18",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5273
    },
    {
      "date": "2025-06-18",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6458
    },
    {
      "date": "2025-06-19",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13034
    },
    {
      "date": "2025-06-19",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15362
    },
    {
      "date": "2025-06-19",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6646
    },
    {
      "date": "2025-06-19",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13895
    },
    {
      "date": "2025-06-19",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5980
    },
    {
      "date": "2025-06-19",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7636
    },
    {
      "date": "2025-06-20",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11970
    },
    {
      "date": "2025-06-20",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14261
    },
    {
      "date": "2025-06-20",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8995
    },
    {
      "date": "2025-06-20",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9868
    },
    {
      "date": "2025-06-20",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5597
    },
    {
      "date": "2025-06-20",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7171
    },
    {
      "date": "2025-06-21",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14038
    },
    {
      "date": "2025-06-21",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18455
    },
    {
      "date": "2025-06-21",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9757
    },
    {
      "date": "2025-06-21",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10716
    },
    {
      "date": "2025-06-21",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6821
    },
    {
      "date": "2025-06-21",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7562
    },
    {
      "date": "2025-06-22",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15184
    },
    {
      "date": "2025-06-22",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17490
    },
    {
      "date": "2025-06-22",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9298
    },
    {
      "date": "2025-06-22",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11106
    },
    {
      "date": "2025-06-22",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6753
    },
    {
      "date": "2025-06-22",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8712
    },
    {
      "date": "2025-06-23",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11287
    },
    {
      "date": "2025-06-23",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13928
    },
    {
      "date": "2025-06-23",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7067
    },
    {
      "date": "2025-06-23",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8636
    },
    {
      "date": "2025-06-23",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5527
    },
    {
      "date": "2025-06-23",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7620
    },
    {
      "date": "2025-06-24",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13849
    },
    {
      "date": "2025-06-24",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18089
    },
    {
      "date": "2025-06-24",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7753
    },
    {
      "date": "2025-06-24",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9522
    },
    {
      "date": "2025-06-24",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5530
    },
    {
      "date": "2025-06-24",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6394
    },
    {
      "date": "2025-06-25",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12385
    },
    {
      "date": "2025-06-25",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14809
    },
    {
      "date": "2025-06-25",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8124
    },
    {
      "date": "2025-06-25",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9637
    },
    {
      "date": "2025-06-25",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5651
    },
    {
      "date": "2025-06-25",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7118
    },
    {
      "date": "2025-06-26",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12458
    },
    {
      "date": "2025-06-26",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14857
    },
    {
      "date": "2025-06-26",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7835
    },
    {
      "date": "2025-06-26",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14137
    },
    {
      "date": "2025-06-26",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5967
    },
    {
      "date": "2025-06-26",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7310
    },
    {
      "date": "2025-06-27",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12704
    },
    {
      "date": "2025-06-27",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15056
    },
    {
      "date": "2025-06-27",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8233
    },
    {
      "date": "2025-06-27",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10079
    },
    {
      "date": "2025-06-27",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5650
    },
    {
      "date": "2025-06-27",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6786
    },
    {
      "date": "2025-06-28",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13509
    },
    {
      "date": "2025-06-28",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17466
    },
    {
      "date": "2025-06-28",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9014
    },
    {
      "date": "2025-06-28",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11008
    },
    {
      "date": "2025-06-28",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6816
    },
    {
      "date": "2025-06-28",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8300
    },
    {
      "date": "2025-06-29",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14556
    },
    {
      "date": "2025-06-29",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18080
    },
    {
      "date": "2025-06-29",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9351
    },
    {
      "date": "2025-06-29",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11510
    },
    {
      "date": "2025-06-29",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6708
    },
    {
      "date": "2025-06-29",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8364
    },
    {
      "date": "2025-06-30",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13743
    },
    {
      "date": "2025-06-30",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16378
    },
    {
      "date": "2025-06-30",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7991
    },
    {
      "date": "2025-06-30",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9873
    },
    {
      "date": "2025-06-30",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5257
    },
    {
      "date": "2025-06-30",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6752
    },
    {
      "date": "2025-07-01",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13008
    },
    {
      "date": "2025-07-01",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16619
    },
    {
      "date": "2025-07-01",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7743
    },
    {
      "date": "2025-07-01",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8790
    },
    {
      "date": "2025-07-01",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5911
    },
    {
      "date": "2025-07-01",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6587
    },
    {
      "date": "2025-07-02",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11520
    },
    {
      "date": "2025-07-02",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13999
    },
    {
      "date": "2025-07-02",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8358
    },
    {
      "date": "2025-07-02",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9983
    },
    {
      "date": "2025-07-02",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5215
    },
    {
      "date": "2025-07-02",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6559
    },
    {
      "date": "2025-07-03",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14155
    },
    {
      "date": "2025-07-03",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16032
    },
    {
      "date": "2025-07-03",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7407
    },
    {
      "date": "2025-07-03",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14593
    },
    {
      "date": "2025-07-03",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5615
    },
    {
      "date": "2025-07-03",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6460
    },
    {
      "date": "2025-07-04",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12398
    },
    {
      "date": "2025-07-04",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13674
    },
    {
      "date": "2025-07-04",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8058
    },
    {
      "date": "2025-07-04",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10108
    },
    {
      "date": "2025-07-04",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4669
    },
    {
      "date": "2025-07-04",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6150
    },
    {
      "date": "2025-07-05",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13382
    },
    {
      "date": "2025-07-05",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15690
    },
    {
      "date": "2025-07-05",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9163
    },
    {
      "date": "2025-07-05",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10685
    },
    {
      "date": "2025-07-05",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7339
    },
    {
      "date": "2025-07-05",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7873
    },
    {
      "date": "2025-07-06",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13667
    },
    {
      "date": "2025-07-06",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17042
    },
    {
      "date": "2025-07-06",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9171
    },
    {
      "date": "2025-07-06",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10991
    },
    {
      "date": "2025-07-06",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6942
    },
    {
      "date": "2025-07-06",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7683
    },
    {
      "date": "2025-07-07",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13068
    },
    {
      "date": "2025-07-07",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16329
    },
    {
      "date": "2025-07-07",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7622
    },
    {
      "date": "2025-07-07",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9986
    },
    {
      "date": "2025-07-07",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5478
    },
    {
      "date": "2025-07-07",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6551
    },
    {
      "date": "2025-07-08",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10560
    },
    {
      "date": "2025-07-08",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12503
    },
    {
      "date": "2025-07-08",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7034
    },
    {
      "date": "2025-07-08",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8805
    },
    {
      "date": "2025-07-08",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5058
    },
    {
      "date": "2025-07-08",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 5538
    },
    {
      "date": "2025-07-09",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED_BANDH",
      "collectedTotalInr": 0
    },
    {
      "date": "2025-07-09",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED_BANDH",
      "collectedTotalInr": 0
    },
    {
      "date": "2025-07-09",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED_BANDH",
      "collectedTotalInr": 0
    },
    {
      "date": "2025-07-09",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED_BANDH",
      "collectedTotalInr": 0
    },
    {
      "date": "2025-07-09",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED_BANDH",
      "collectedTotalInr": 0
    },
    {
      "date": "2025-07-09",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED_BANDH",
      "collectedTotalInr": 0
    },
    {
      "date": "2025-07-10",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10738
    },
    {
      "date": "2025-07-10",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13413
    },
    {
      "date": "2025-07-10",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7546
    },
    {
      "date": "2025-07-10",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14868
    },
    {
      "date": "2025-07-10",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5514
    },
    {
      "date": "2025-07-10",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6444
    },
    {
      "date": "2025-07-11",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11989
    },
    {
      "date": "2025-07-11",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15470
    },
    {
      "date": "2025-07-11",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6735
    },
    {
      "date": "2025-07-11",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7861
    },
    {
      "date": "2025-07-11",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5369
    },
    {
      "date": "2025-07-11",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6585
    },
    {
      "date": "2025-07-12",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13193
    },
    {
      "date": "2025-07-12",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17006
    },
    {
      "date": "2025-07-12",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8770
    },
    {
      "date": "2025-07-12",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10175
    },
    {
      "date": "2025-07-12",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6878
    },
    {
      "date": "2025-07-12",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8477
    },
    {
      "date": "2025-07-13",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14993
    },
    {
      "date": "2025-07-13",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17264
    },
    {
      "date": "2025-07-13",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8757
    },
    {
      "date": "2025-07-13",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11128
    },
    {
      "date": "2025-07-13",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6485
    },
    {
      "date": "2025-07-13",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7870
    },
    {
      "date": "2025-07-14",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11374
    },
    {
      "date": "2025-07-14",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14164
    },
    {
      "date": "2025-07-14",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7607
    },
    {
      "date": "2025-07-14",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9494
    },
    {
      "date": "2025-07-14",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5014
    },
    {
      "date": "2025-07-14",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6192
    },
    {
      "date": "2025-07-15",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11580
    },
    {
      "date": "2025-07-15",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14834
    },
    {
      "date": "2025-07-15",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8220
    },
    {
      "date": "2025-07-15",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9353
    },
    {
      "date": "2025-07-15",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5300
    },
    {
      "date": "2025-07-15",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6797
    },
    {
      "date": "2025-07-16",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13416
    },
    {
      "date": "2025-07-16",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15983
    },
    {
      "date": "2025-07-16",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7570
    },
    {
      "date": "2025-07-16",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10224
    },
    {
      "date": "2025-07-16",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5544
    },
    {
      "date": "2025-07-16",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6796
    },
    {
      "date": "2025-07-17",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11239
    },
    {
      "date": "2025-07-17",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13105
    },
    {
      "date": "2025-07-17",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8177
    },
    {
      "date": "2025-07-17",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15905
    },
    {
      "date": "2025-07-17",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5392
    },
    {
      "date": "2025-07-17",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6373
    },
    {
      "date": "2025-07-18",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11696
    },
    {
      "date": "2025-07-18",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14813
    },
    {
      "date": "2025-07-18",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7712
    },
    {
      "date": "2025-07-18",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9039
    },
    {
      "date": "2025-07-18",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5929
    },
    {
      "date": "2025-07-18",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6736
    },
    {
      "date": "2025-07-19",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12832
    },
    {
      "date": "2025-07-19",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14774
    },
    {
      "date": "2025-07-19",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9180
    },
    {
      "date": "2025-07-19",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10594
    },
    {
      "date": "2025-07-19",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6622
    },
    {
      "date": "2025-07-19",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7523
    },
    {
      "date": "2025-07-20",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13060
    },
    {
      "date": "2025-07-20",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16306
    },
    {
      "date": "2025-07-20",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8031
    },
    {
      "date": "2025-07-20",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9866
    },
    {
      "date": "2025-07-20",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6446
    },
    {
      "date": "2025-07-20",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7396
    },
    {
      "date": "2025-07-21",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11310
    },
    {
      "date": "2025-07-21",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12933
    },
    {
      "date": "2025-07-21",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7013
    },
    {
      "date": "2025-07-21",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8949
    },
    {
      "date": "2025-07-21",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5207
    },
    {
      "date": "2025-07-21",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6562
    },
    {
      "date": "2025-07-22",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11932
    },
    {
      "date": "2025-07-22",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12721
    },
    {
      "date": "2025-07-22",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7758
    },
    {
      "date": "2025-07-22",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10417
    },
    {
      "date": "2025-07-22",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5777
    },
    {
      "date": "2025-07-22",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6876
    },
    {
      "date": "2025-07-23",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12058
    },
    {
      "date": "2025-07-23",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15381
    },
    {
      "date": "2025-07-23",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8128
    },
    {
      "date": "2025-07-23",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10158
    },
    {
      "date": "2025-07-23",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5471
    },
    {
      "date": "2025-07-23",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6706
    },
    {
      "date": "2025-07-24",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10991
    },
    {
      "date": "2025-07-24",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13820
    },
    {
      "date": "2025-07-24",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6810
    },
    {
      "date": "2025-07-24",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12628
    },
    {
      "date": "2025-07-24",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5394
    },
    {
      "date": "2025-07-24",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6799
    },
    {
      "date": "2025-07-25",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12760
    },
    {
      "date": "2025-07-25",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16065
    },
    {
      "date": "2025-07-25",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7227
    },
    {
      "date": "2025-07-25",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9608
    },
    {
      "date": "2025-07-25",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4918
    },
    {
      "date": "2025-07-25",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6173
    },
    {
      "date": "2025-07-26",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14671
    },
    {
      "date": "2025-07-26",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17359
    },
    {
      "date": "2025-07-26",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9008
    },
    {
      "date": "2025-07-26",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10855
    },
    {
      "date": "2025-07-26",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6850
    },
    {
      "date": "2025-07-26",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7820
    },
    {
      "date": "2025-07-27",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12920
    },
    {
      "date": "2025-07-27",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16526
    },
    {
      "date": "2025-07-27",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7599
    },
    {
      "date": "2025-07-27",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9171
    },
    {
      "date": "2025-07-27",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5573
    },
    {
      "date": "2025-07-27",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7283
    },
    {
      "date": "2025-07-28",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11886
    },
    {
      "date": "2025-07-28",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14077
    },
    {
      "date": "2025-07-28",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7052
    },
    {
      "date": "2025-07-28",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8313
    },
    {
      "date": "2025-07-28",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5563
    },
    {
      "date": "2025-07-28",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6544
    },
    {
      "date": "2025-07-29",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12818
    },
    {
      "date": "2025-07-29",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15139
    },
    {
      "date": "2025-07-29",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6969
    },
    {
      "date": "2025-07-29",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9090
    },
    {
      "date": "2025-07-29",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5206
    },
    {
      "date": "2025-07-29",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6969
    },
    {
      "date": "2025-07-30",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12247
    },
    {
      "date": "2025-07-30",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14937
    },
    {
      "date": "2025-07-30",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7840
    },
    {
      "date": "2025-07-30",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9873
    },
    {
      "date": "2025-07-30",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5417
    },
    {
      "date": "2025-07-30",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6191
    },
    {
      "date": "2025-07-31",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11605
    },
    {
      "date": "2025-07-31",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13951
    },
    {
      "date": "2025-07-31",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7098
    },
    {
      "date": "2025-07-31",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13945
    },
    {
      "date": "2025-07-31",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5473
    },
    {
      "date": "2025-07-31",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6555
    },
    {
      "date": "2025-08-01",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15209
    },
    {
      "date": "2025-08-01",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17726
    },
    {
      "date": "2025-08-01",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7915
    },
    {
      "date": "2025-08-01",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9215
    },
    {
      "date": "2025-08-01",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5697
    },
    {
      "date": "2025-08-01",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6857
    },
    {
      "date": "2025-08-02",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13235
    },
    {
      "date": "2025-08-02",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17737
    },
    {
      "date": "2025-08-02",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9698
    },
    {
      "date": "2025-08-02",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10318
    },
    {
      "date": "2025-08-02",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7422
    },
    {
      "date": "2025-08-02",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8437
    },
    {
      "date": "2025-08-03",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15001
    },
    {
      "date": "2025-08-03",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16773
    },
    {
      "date": "2025-08-03",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8748
    },
    {
      "date": "2025-08-03",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11784
    },
    {
      "date": "2025-08-03",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6492
    },
    {
      "date": "2025-08-03",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7795
    },
    {
      "date": "2025-08-04",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13561
    },
    {
      "date": "2025-08-04",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15569
    },
    {
      "date": "2025-08-04",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8401
    },
    {
      "date": "2025-08-04",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9807
    },
    {
      "date": "2025-08-04",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5586
    },
    {
      "date": "2025-08-04",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7585
    },
    {
      "date": "2025-08-05",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12374
    },
    {
      "date": "2025-08-05",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14997
    },
    {
      "date": "2025-08-05",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7807
    },
    {
      "date": "2025-08-05",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8480
    },
    {
      "date": "2025-08-05",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5489
    },
    {
      "date": "2025-08-05",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6877
    },
    {
      "date": "2025-08-06",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12326
    },
    {
      "date": "2025-08-06",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14976
    },
    {
      "date": "2025-08-06",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8543
    },
    {
      "date": "2025-08-06",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9977
    },
    {
      "date": "2025-08-06",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5630
    },
    {
      "date": "2025-08-06",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7320
    },
    {
      "date": "2025-08-07",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13482
    },
    {
      "date": "2025-08-07",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14020
    },
    {
      "date": "2025-08-07",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7418
    },
    {
      "date": "2025-08-07",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15640
    },
    {
      "date": "2025-08-07",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5381
    },
    {
      "date": "2025-08-07",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6869
    },
    {
      "date": "2025-08-08",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12506
    },
    {
      "date": "2025-08-08",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15358
    },
    {
      "date": "2025-08-08",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7805
    },
    {
      "date": "2025-08-08",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10054
    },
    {
      "date": "2025-08-08",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6529
    },
    {
      "date": "2025-08-08",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7680
    },
    {
      "date": "2025-08-09",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13204
    },
    {
      "date": "2025-08-09",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17542
    },
    {
      "date": "2025-08-09",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9200
    },
    {
      "date": "2025-08-09",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10116
    },
    {
      "date": "2025-08-09",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6137
    },
    {
      "date": "2025-08-09",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7610
    },
    {
      "date": "2025-08-10",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15111
    },
    {
      "date": "2025-08-10",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 20328
    },
    {
      "date": "2025-08-10",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10117
    },
    {
      "date": "2025-08-10",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11819
    },
    {
      "date": "2025-08-10",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6966
    },
    {
      "date": "2025-08-10",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8372
    },
    {
      "date": "2025-08-11",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12320
    },
    {
      "date": "2025-08-11",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14472
    },
    {
      "date": "2025-08-11",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7440
    },
    {
      "date": "2025-08-11",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8922
    },
    {
      "date": "2025-08-11",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5461
    },
    {
      "date": "2025-08-11",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6339
    },
    {
      "date": "2025-08-12",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13005
    },
    {
      "date": "2025-08-12",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15445
    },
    {
      "date": "2025-08-12",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7661
    },
    {
      "date": "2025-08-12",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9013
    },
    {
      "date": "2025-08-12",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5779
    },
    {
      "date": "2025-08-12",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7169
    },
    {
      "date": "2025-08-13",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14649
    },
    {
      "date": "2025-08-13",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17384
    },
    {
      "date": "2025-08-13",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7276
    },
    {
      "date": "2025-08-13",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9275
    },
    {
      "date": "2025-08-13",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5322
    },
    {
      "date": "2025-08-13",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6882
    },
    {
      "date": "2025-08-14",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14233
    },
    {
      "date": "2025-08-14",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17669
    },
    {
      "date": "2025-08-14",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7316
    },
    {
      "date": "2025-08-14",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16050
    },
    {
      "date": "2025-08-14",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5633
    },
    {
      "date": "2025-08-14",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6987
    },
    {
      "date": "2025-08-15",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12407
    },
    {
      "date": "2025-08-15",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14707
    },
    {
      "date": "2025-08-15",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8107
    },
    {
      "date": "2025-08-15",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9139
    },
    {
      "date": "2025-08-15",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6094
    },
    {
      "date": "2025-08-15",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7823
    },
    {
      "date": "2025-08-16",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14664
    },
    {
      "date": "2025-08-16",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 19384
    },
    {
      "date": "2025-08-16",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8923
    },
    {
      "date": "2025-08-16",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10379
    },
    {
      "date": "2025-08-16",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6027
    },
    {
      "date": "2025-08-16",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7514
    },
    {
      "date": "2025-08-17",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15007
    },
    {
      "date": "2025-08-17",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18036
    },
    {
      "date": "2025-08-17",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9260
    },
    {
      "date": "2025-08-17",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11740
    },
    {
      "date": "2025-08-17",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7531
    },
    {
      "date": "2025-08-17",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8719
    },
    {
      "date": "2025-08-18",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14466
    },
    {
      "date": "2025-08-18",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16125
    },
    {
      "date": "2025-08-18",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7775
    },
    {
      "date": "2025-08-18",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9202
    },
    {
      "date": "2025-08-18",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6071
    },
    {
      "date": "2025-08-18",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6602
    },
    {
      "date": "2025-08-19",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11971
    },
    {
      "date": "2025-08-19",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15019
    },
    {
      "date": "2025-08-19",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7798
    },
    {
      "date": "2025-08-19",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9342
    },
    {
      "date": "2025-08-19",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5059
    },
    {
      "date": "2025-08-19",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7019
    },
    {
      "date": "2025-08-20",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14147
    },
    {
      "date": "2025-08-20",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16391
    },
    {
      "date": "2025-08-20",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8316
    },
    {
      "date": "2025-08-20",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10032
    },
    {
      "date": "2025-08-20",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6561
    },
    {
      "date": "2025-08-20",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6886
    },
    {
      "date": "2025-08-21",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11868
    },
    {
      "date": "2025-08-21",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13798
    },
    {
      "date": "2025-08-21",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8049
    },
    {
      "date": "2025-08-21",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15104
    },
    {
      "date": "2025-08-21",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6151
    },
    {
      "date": "2025-08-21",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7743
    },
    {
      "date": "2025-08-22",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12251
    },
    {
      "date": "2025-08-22",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15487
    },
    {
      "date": "2025-08-22",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7888
    },
    {
      "date": "2025-08-22",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10274
    },
    {
      "date": "2025-08-22",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5399
    },
    {
      "date": "2025-08-22",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6421
    },
    {
      "date": "2025-08-23",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13708
    },
    {
      "date": "2025-08-23",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18588
    },
    {
      "date": "2025-08-23",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8755
    },
    {
      "date": "2025-08-23",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9620
    },
    {
      "date": "2025-08-23",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6617
    },
    {
      "date": "2025-08-23",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7643
    },
    {
      "date": "2025-08-24",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14791
    },
    {
      "date": "2025-08-24",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18968
    },
    {
      "date": "2025-08-24",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9928
    },
    {
      "date": "2025-08-24",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11618
    },
    {
      "date": "2025-08-24",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6128
    },
    {
      "date": "2025-08-24",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7085
    },
    {
      "date": "2025-08-25",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10869
    },
    {
      "date": "2025-08-25",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13928
    },
    {
      "date": "2025-08-25",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7904
    },
    {
      "date": "2025-08-25",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9892
    },
    {
      "date": "2025-08-25",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6207
    },
    {
      "date": "2025-08-25",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7033
    },
    {
      "date": "2025-08-26",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12152
    },
    {
      "date": "2025-08-26",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14209
    },
    {
      "date": "2025-08-26",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7637
    },
    {
      "date": "2025-08-26",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9521
    },
    {
      "date": "2025-08-26",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5678
    },
    {
      "date": "2025-08-26",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7107
    },
    {
      "date": "2025-08-27",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14896
    },
    {
      "date": "2025-08-27",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 19243
    },
    {
      "date": "2025-08-27",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9030
    },
    {
      "date": "2025-08-27",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11019
    },
    {
      "date": "2025-08-27",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6008
    },
    {
      "date": "2025-08-27",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7934
    },
    {
      "date": "2025-08-28",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15589
    },
    {
      "date": "2025-08-28",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 19054
    },
    {
      "date": "2025-08-28",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8613
    },
    {
      "date": "2025-08-28",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16948
    },
    {
      "date": "2025-08-28",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6981
    },
    {
      "date": "2025-08-28",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7884
    },
    {
      "date": "2025-08-29",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14222
    },
    {
      "date": "2025-08-29",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17888
    },
    {
      "date": "2025-08-29",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9697
    },
    {
      "date": "2025-08-29",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11443
    },
    {
      "date": "2025-08-29",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6421
    },
    {
      "date": "2025-08-29",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7663
    },
    {
      "date": "2025-08-30",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 16761
    },
    {
      "date": "2025-08-30",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 20997
    },
    {
      "date": "2025-08-30",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10965
    },
    {
      "date": "2025-08-30",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13192
    },
    {
      "date": "2025-08-30",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8143
    },
    {
      "date": "2025-08-30",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9245
    },
    {
      "date": "2025-08-31",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15555
    },
    {
      "date": "2025-08-31",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 20273
    },
    {
      "date": "2025-08-31",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11198
    },
    {
      "date": "2025-08-31",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12302
    },
    {
      "date": "2025-08-31",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7326
    },
    {
      "date": "2025-08-31",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8562
    },
    {
      "date": "2025-09-01",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13405
    },
    {
      "date": "2025-09-01",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17069
    },
    {
      "date": "2025-09-01",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8995
    },
    {
      "date": "2025-09-01",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10914
    },
    {
      "date": "2025-09-01",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6711
    },
    {
      "date": "2025-09-01",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7850
    },
    {
      "date": "2025-09-02",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15245
    },
    {
      "date": "2025-09-02",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 19641
    },
    {
      "date": "2025-09-02",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8845
    },
    {
      "date": "2025-09-02",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10298
    },
    {
      "date": "2025-09-02",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5602
    },
    {
      "date": "2025-09-02",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7788
    },
    {
      "date": "2025-09-03",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15771
    },
    {
      "date": "2025-09-03",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 19056
    },
    {
      "date": "2025-09-03",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9027
    },
    {
      "date": "2025-09-03",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10787
    },
    {
      "date": "2025-09-03",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6264
    },
    {
      "date": "2025-09-03",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7771
    },
    {
      "date": "2025-09-04",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 16520
    },
    {
      "date": "2025-09-04",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18790
    },
    {
      "date": "2025-09-04",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9157
    },
    {
      "date": "2025-09-04",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17123
    },
    {
      "date": "2025-09-04",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6261
    },
    {
      "date": "2025-09-04",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7117
    },
    {
      "date": "2025-09-05",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15659
    },
    {
      "date": "2025-09-05",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 19577
    },
    {
      "date": "2025-09-05",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9799
    },
    {
      "date": "2025-09-05",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11310
    },
    {
      "date": "2025-09-05",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7030
    },
    {
      "date": "2025-09-05",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9079
    },
    {
      "date": "2025-09-06",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 16901
    },
    {
      "date": "2025-09-06",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 20948
    },
    {
      "date": "2025-09-06",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10288
    },
    {
      "date": "2025-09-06",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13214
    },
    {
      "date": "2025-09-06",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7810
    },
    {
      "date": "2025-09-06",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9495
    },
    {
      "date": "2025-09-07",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12747
    },
    {
      "date": "2025-09-07",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16368
    },
    {
      "date": "2025-09-07",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9473
    },
    {
      "date": "2025-09-07",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11212
    },
    {
      "date": "2025-09-07",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6803
    },
    {
      "date": "2025-09-07",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8124
    },
    {
      "date": "2025-09-08",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13143
    },
    {
      "date": "2025-09-08",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15014
    },
    {
      "date": "2025-09-08",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8041
    },
    {
      "date": "2025-09-08",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9343
    },
    {
      "date": "2025-09-08",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6080
    },
    {
      "date": "2025-09-08",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7707
    },
    {
      "date": "2025-09-09",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10989
    },
    {
      "date": "2025-09-09",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13152
    },
    {
      "date": "2025-09-09",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7492
    },
    {
      "date": "2025-09-09",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8067
    },
    {
      "date": "2025-09-09",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5716
    },
    {
      "date": "2025-09-09",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6758
    },
    {
      "date": "2025-09-10",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13316
    },
    {
      "date": "2025-09-10",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15913
    },
    {
      "date": "2025-09-10",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7946
    },
    {
      "date": "2025-09-10",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10432
    },
    {
      "date": "2025-09-10",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5689
    },
    {
      "date": "2025-09-10",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6571
    },
    {
      "date": "2025-09-11",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13305
    },
    {
      "date": "2025-09-11",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16459
    },
    {
      "date": "2025-09-11",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7975
    },
    {
      "date": "2025-09-11",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14950
    },
    {
      "date": "2025-09-11",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5381
    },
    {
      "date": "2025-09-11",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6412
    },
    {
      "date": "2025-09-12",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11988
    },
    {
      "date": "2025-09-12",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14874
    },
    {
      "date": "2025-09-12",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8296
    },
    {
      "date": "2025-09-12",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9665
    },
    {
      "date": "2025-09-12",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5778
    },
    {
      "date": "2025-09-12",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7073
    },
    {
      "date": "2025-09-13",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14978
    },
    {
      "date": "2025-09-13",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18989
    },
    {
      "date": "2025-09-13",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9387
    },
    {
      "date": "2025-09-13",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12080
    },
    {
      "date": "2025-09-13",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6189
    },
    {
      "date": "2025-09-13",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7740
    },
    {
      "date": "2025-09-14",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14189
    },
    {
      "date": "2025-09-14",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18012
    },
    {
      "date": "2025-09-14",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9985
    },
    {
      "date": "2025-09-14",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12832
    },
    {
      "date": "2025-09-14",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6977
    },
    {
      "date": "2025-09-14",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9112
    },
    {
      "date": "2025-09-15",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10611
    },
    {
      "date": "2025-09-15",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12873
    },
    {
      "date": "2025-09-15",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7232
    },
    {
      "date": "2025-09-15",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8977
    },
    {
      "date": "2025-09-15",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5410
    },
    {
      "date": "2025-09-15",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6427
    },
    {
      "date": "2025-09-16",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10657
    },
    {
      "date": "2025-09-16",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13791
    },
    {
      "date": "2025-09-16",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8492
    },
    {
      "date": "2025-09-16",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10216
    },
    {
      "date": "2025-09-16",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5845
    },
    {
      "date": "2025-09-16",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6978
    },
    {
      "date": "2025-09-17",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12481
    },
    {
      "date": "2025-09-17",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15808
    },
    {
      "date": "2025-09-17",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7712
    },
    {
      "date": "2025-09-17",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8704
    },
    {
      "date": "2025-09-17",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5334
    },
    {
      "date": "2025-09-17",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6144
    },
    {
      "date": "2025-09-18",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13603
    },
    {
      "date": "2025-09-18",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17599
    },
    {
      "date": "2025-09-18",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9615
    },
    {
      "date": "2025-09-18",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17020
    },
    {
      "date": "2025-09-18",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6405
    },
    {
      "date": "2025-09-18",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7439
    },
    {
      "date": "2025-09-19",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12248
    },
    {
      "date": "2025-09-19",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15116
    },
    {
      "date": "2025-09-19",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8124
    },
    {
      "date": "2025-09-19",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9419
    },
    {
      "date": "2025-09-19",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5848
    },
    {
      "date": "2025-09-19",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6636
    },
    {
      "date": "2025-09-20",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12791
    },
    {
      "date": "2025-09-20",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15969
    },
    {
      "date": "2025-09-20",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8494
    },
    {
      "date": "2025-09-20",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10236
    },
    {
      "date": "2025-09-20",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6285
    },
    {
      "date": "2025-09-20",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7070
    },
    {
      "date": "2025-09-21",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 16284
    },
    {
      "date": "2025-09-21",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17579
    },
    {
      "date": "2025-09-21",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10314
    },
    {
      "date": "2025-09-21",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12661
    },
    {
      "date": "2025-09-21",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6157
    },
    {
      "date": "2025-09-21",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7260
    },
    {
      "date": "2025-09-22",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12370
    },
    {
      "date": "2025-09-22",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16064
    },
    {
      "date": "2025-09-22",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7800
    },
    {
      "date": "2025-09-22",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9977
    },
    {
      "date": "2025-09-22",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5211
    },
    {
      "date": "2025-09-22",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6158
    },
    {
      "date": "2025-09-23",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11615
    },
    {
      "date": "2025-09-23",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15852
    },
    {
      "date": "2025-09-23",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8156
    },
    {
      "date": "2025-09-23",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9683
    },
    {
      "date": "2025-09-23",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5210
    },
    {
      "date": "2025-09-23",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6709
    },
    {
      "date": "2025-09-24",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11890
    },
    {
      "date": "2025-09-24",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14224
    },
    {
      "date": "2025-09-24",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7409
    },
    {
      "date": "2025-09-24",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8851
    },
    {
      "date": "2025-09-24",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5503
    },
    {
      "date": "2025-09-24",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6938
    },
    {
      "date": "2025-09-25",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12320
    },
    {
      "date": "2025-09-25",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14691
    },
    {
      "date": "2025-09-25",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7894
    },
    {
      "date": "2025-09-25",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14630
    },
    {
      "date": "2025-09-25",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5511
    },
    {
      "date": "2025-09-25",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6940
    },
    {
      "date": "2025-09-26",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13034
    },
    {
      "date": "2025-09-26",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16553
    },
    {
      "date": "2025-09-26",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8001
    },
    {
      "date": "2025-09-26",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8952
    },
    {
      "date": "2025-09-26",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5816
    },
    {
      "date": "2025-09-26",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7173
    },
    {
      "date": "2025-09-27",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13376
    },
    {
      "date": "2025-09-27",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18100
    },
    {
      "date": "2025-09-27",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8852
    },
    {
      "date": "2025-09-27",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10811
    },
    {
      "date": "2025-09-27",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5958
    },
    {
      "date": "2025-09-27",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7773
    },
    {
      "date": "2025-09-28",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14847
    },
    {
      "date": "2025-09-28",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17624
    },
    {
      "date": "2025-09-28",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8640
    },
    {
      "date": "2025-09-28",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10931
    },
    {
      "date": "2025-09-28",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6760
    },
    {
      "date": "2025-09-28",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8205
    },
    {
      "date": "2025-09-29",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12673
    },
    {
      "date": "2025-09-29",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16514
    },
    {
      "date": "2025-09-29",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8351
    },
    {
      "date": "2025-09-29",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10055
    },
    {
      "date": "2025-09-29",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5795
    },
    {
      "date": "2025-09-29",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7151
    },
    {
      "date": "2025-09-30",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14307
    },
    {
      "date": "2025-09-30",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17550
    },
    {
      "date": "2025-09-30",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7850
    },
    {
      "date": "2025-09-30",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9490
    },
    {
      "date": "2025-09-30",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5912
    },
    {
      "date": "2025-09-30",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7669
    },
    {
      "date": "2025-10-01",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12977
    },
    {
      "date": "2025-10-01",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16626
    },
    {
      "date": "2025-10-01",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8361
    },
    {
      "date": "2025-10-01",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10504
    },
    {
      "date": "2025-10-01",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5845
    },
    {
      "date": "2025-10-01",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7044
    },
    {
      "date": "2025-10-02",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12723
    },
    {
      "date": "2025-10-02",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14853
    },
    {
      "date": "2025-10-02",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8311
    },
    {
      "date": "2025-10-02",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16309
    },
    {
      "date": "2025-10-02",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5540
    },
    {
      "date": "2025-10-02",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7171
    },
    {
      "date": "2025-10-03",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10529
    },
    {
      "date": "2025-10-03",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13370
    },
    {
      "date": "2025-10-03",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7099
    },
    {
      "date": "2025-10-03",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9921
    },
    {
      "date": "2025-10-03",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6569
    },
    {
      "date": "2025-10-03",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8173
    },
    {
      "date": "2025-10-04",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13914
    },
    {
      "date": "2025-10-04",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18594
    },
    {
      "date": "2025-10-04",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8733
    },
    {
      "date": "2025-10-04",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11110
    },
    {
      "date": "2025-10-04",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6172
    },
    {
      "date": "2025-10-04",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8183
    },
    {
      "date": "2025-10-05",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14880
    },
    {
      "date": "2025-10-05",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 19166
    },
    {
      "date": "2025-10-05",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9540
    },
    {
      "date": "2025-10-05",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11552
    },
    {
      "date": "2025-10-05",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6092
    },
    {
      "date": "2025-10-05",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7122
    },
    {
      "date": "2025-10-06",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13355
    },
    {
      "date": "2025-10-06",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16633
    },
    {
      "date": "2025-10-06",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9189
    },
    {
      "date": "2025-10-06",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11344
    },
    {
      "date": "2025-10-06",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5518
    },
    {
      "date": "2025-10-06",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7407
    },
    {
      "date": "2025-10-07",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14173
    },
    {
      "date": "2025-10-07",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18322
    },
    {
      "date": "2025-10-07",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9063
    },
    {
      "date": "2025-10-07",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11124
    },
    {
      "date": "2025-10-07",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7208
    },
    {
      "date": "2025-10-07",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8363
    },
    {
      "date": "2025-10-08",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12929
    },
    {
      "date": "2025-10-08",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17528
    },
    {
      "date": "2025-10-08",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9379
    },
    {
      "date": "2025-10-08",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11597
    },
    {
      "date": "2025-10-08",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6340
    },
    {
      "date": "2025-10-08",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8402
    },
    {
      "date": "2025-10-09",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14856
    },
    {
      "date": "2025-10-09",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17209
    },
    {
      "date": "2025-10-09",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8696
    },
    {
      "date": "2025-10-09",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17035
    },
    {
      "date": "2025-10-09",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5928
    },
    {
      "date": "2025-10-09",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7378
    },
    {
      "date": "2025-10-10",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14301
    },
    {
      "date": "2025-10-10",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17399
    },
    {
      "date": "2025-10-10",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9204
    },
    {
      "date": "2025-10-10",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11152
    },
    {
      "date": "2025-10-10",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6412
    },
    {
      "date": "2025-10-10",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7754
    },
    {
      "date": "2025-10-11",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15455
    },
    {
      "date": "2025-10-11",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17945
    },
    {
      "date": "2025-10-11",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9835
    },
    {
      "date": "2025-10-11",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12449
    },
    {
      "date": "2025-10-11",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6678
    },
    {
      "date": "2025-10-11",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8726
    },
    {
      "date": "2025-10-12",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 17302
    },
    {
      "date": "2025-10-12",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 20548
    },
    {
      "date": "2025-10-12",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10193
    },
    {
      "date": "2025-10-12",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13503
    },
    {
      "date": "2025-10-12",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6276
    },
    {
      "date": "2025-10-12",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8048
    },
    {
      "date": "2025-10-13",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13856
    },
    {
      "date": "2025-10-13",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16426
    },
    {
      "date": "2025-10-13",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8683
    },
    {
      "date": "2025-10-13",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10890
    },
    {
      "date": "2025-10-13",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6447
    },
    {
      "date": "2025-10-13",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7676
    },
    {
      "date": "2025-10-14",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13607
    },
    {
      "date": "2025-10-14",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17656
    },
    {
      "date": "2025-10-14",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9730
    },
    {
      "date": "2025-10-14",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10668
    },
    {
      "date": "2025-10-14",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6883
    },
    {
      "date": "2025-10-14",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8253
    },
    {
      "date": "2025-10-15",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 19479
    },
    {
      "date": "2025-10-15",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 26691
    },
    {
      "date": "2025-10-15",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11454
    },
    {
      "date": "2025-10-15",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14252
    },
    {
      "date": "2025-10-15",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9119
    },
    {
      "date": "2025-10-15",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10627
    },
    {
      "date": "2025-10-16",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 23891
    },
    {
      "date": "2025-10-16",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 28300
    },
    {
      "date": "2025-10-16",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12178
    },
    {
      "date": "2025-10-16",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 23319
    },
    {
      "date": "2025-10-16",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7852
    },
    {
      "date": "2025-10-16",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9646
    },
    {
      "date": "2025-10-17",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 19086
    },
    {
      "date": "2025-10-17",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 26264
    },
    {
      "date": "2025-10-17",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12461
    },
    {
      "date": "2025-10-17",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15087
    },
    {
      "date": "2025-10-17",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8607
    },
    {
      "date": "2025-10-17",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10533
    },
    {
      "date": "2025-10-18",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 26898
    },
    {
      "date": "2025-10-18",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 34250
    },
    {
      "date": "2025-10-18",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15937
    },
    {
      "date": "2025-10-18",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18630
    },
    {
      "date": "2025-10-18",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9867
    },
    {
      "date": "2025-10-18",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11215
    },
    {
      "date": "2025-10-19",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 24114
    },
    {
      "date": "2025-10-19",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 29944
    },
    {
      "date": "2025-10-19",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12321
    },
    {
      "date": "2025-10-19",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16234
    },
    {
      "date": "2025-10-19",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9141
    },
    {
      "date": "2025-10-19",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11586
    },
    {
      "date": "2025-10-20",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 23928
    },
    {
      "date": "2025-10-20",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 28728
    },
    {
      "date": "2025-10-20",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11406
    },
    {
      "date": "2025-10-20",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13834
    },
    {
      "date": "2025-10-20",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9764
    },
    {
      "date": "2025-10-20",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10568
    },
    {
      "date": "2025-10-21",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 23597
    },
    {
      "date": "2025-10-21",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 30730
    },
    {
      "date": "2025-10-21",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11715
    },
    {
      "date": "2025-10-21",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14188
    },
    {
      "date": "2025-10-21",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8220
    },
    {
      "date": "2025-10-21",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10770
    },
    {
      "date": "2025-10-22",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12013
    },
    {
      "date": "2025-10-22",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14731
    },
    {
      "date": "2025-10-22",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7483
    },
    {
      "date": "2025-10-22",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9049
    },
    {
      "date": "2025-10-22",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4819
    },
    {
      "date": "2025-10-22",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6387
    },
    {
      "date": "2025-10-23",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12177
    },
    {
      "date": "2025-10-23",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15864
    },
    {
      "date": "2025-10-23",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7055
    },
    {
      "date": "2025-10-23",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13034
    },
    {
      "date": "2025-10-23",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5092
    },
    {
      "date": "2025-10-23",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 5699
    },
    {
      "date": "2025-10-24",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11690
    },
    {
      "date": "2025-10-24",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13551
    },
    {
      "date": "2025-10-24",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6727
    },
    {
      "date": "2025-10-24",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8995
    },
    {
      "date": "2025-10-24",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4686
    },
    {
      "date": "2025-10-24",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 5867
    },
    {
      "date": "2025-10-25",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14082
    },
    {
      "date": "2025-10-25",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15935
    },
    {
      "date": "2025-10-25",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8821
    },
    {
      "date": "2025-10-25",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11062
    },
    {
      "date": "2025-10-25",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6106
    },
    {
      "date": "2025-10-25",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7383
    },
    {
      "date": "2025-10-26",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12090
    },
    {
      "date": "2025-10-26",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15319
    },
    {
      "date": "2025-10-26",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9165
    },
    {
      "date": "2025-10-26",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11645
    },
    {
      "date": "2025-10-26",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5514
    },
    {
      "date": "2025-10-26",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6881
    },
    {
      "date": "2025-10-27",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11751
    },
    {
      "date": "2025-10-27",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13703
    },
    {
      "date": "2025-10-27",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7460
    },
    {
      "date": "2025-10-27",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9035
    },
    {
      "date": "2025-10-27",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5368
    },
    {
      "date": "2025-10-27",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7049
    },
    {
      "date": "2025-10-28",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12250
    },
    {
      "date": "2025-10-28",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15966
    },
    {
      "date": "2025-10-28",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7493
    },
    {
      "date": "2025-10-28",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9744
    },
    {
      "date": "2025-10-28",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5653
    },
    {
      "date": "2025-10-28",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7049
    },
    {
      "date": "2025-10-29",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11003
    },
    {
      "date": "2025-10-29",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14038
    },
    {
      "date": "2025-10-29",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8190
    },
    {
      "date": "2025-10-29",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10021
    },
    {
      "date": "2025-10-29",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5643
    },
    {
      "date": "2025-10-29",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6836
    },
    {
      "date": "2025-10-30",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12324
    },
    {
      "date": "2025-10-30",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15119
    },
    {
      "date": "2025-10-30",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8181
    },
    {
      "date": "2025-10-30",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17677
    },
    {
      "date": "2025-10-30",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5800
    },
    {
      "date": "2025-10-30",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6575
    },
    {
      "date": "2025-10-31",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12235
    },
    {
      "date": "2025-10-31",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16016
    },
    {
      "date": "2025-10-31",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7539
    },
    {
      "date": "2025-10-31",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9537
    },
    {
      "date": "2025-10-31",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5641
    },
    {
      "date": "2025-10-31",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7285
    },
    {
      "date": "2025-11-01",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15292
    },
    {
      "date": "2025-11-01",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18819
    },
    {
      "date": "2025-11-01",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8303
    },
    {
      "date": "2025-11-01",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10091
    },
    {
      "date": "2025-11-01",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6597
    },
    {
      "date": "2025-11-01",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8152
    },
    {
      "date": "2025-11-02",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15980
    },
    {
      "date": "2025-11-02",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17942
    },
    {
      "date": "2025-11-02",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9705
    },
    {
      "date": "2025-11-02",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11188
    },
    {
      "date": "2025-11-02",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6386
    },
    {
      "date": "2025-11-02",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7768
    },
    {
      "date": "2025-11-03",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11987
    },
    {
      "date": "2025-11-03",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14489
    },
    {
      "date": "2025-11-03",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8060
    },
    {
      "date": "2025-11-03",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9824
    },
    {
      "date": "2025-11-03",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5728
    },
    {
      "date": "2025-11-03",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6829
    },
    {
      "date": "2025-11-04",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11271
    },
    {
      "date": "2025-11-04",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14233
    },
    {
      "date": "2025-11-04",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8082
    },
    {
      "date": "2025-11-04",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9108
    },
    {
      "date": "2025-11-04",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5450
    },
    {
      "date": "2025-11-04",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6704
    },
    {
      "date": "2025-11-05",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12865
    },
    {
      "date": "2025-11-05",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15219
    },
    {
      "date": "2025-11-05",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7927
    },
    {
      "date": "2025-11-05",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9600
    },
    {
      "date": "2025-11-05",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6347
    },
    {
      "date": "2025-11-05",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7575
    },
    {
      "date": "2025-11-06",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13681
    },
    {
      "date": "2025-11-06",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16130
    },
    {
      "date": "2025-11-06",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7465
    },
    {
      "date": "2025-11-06",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14811
    },
    {
      "date": "2025-11-06",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6195
    },
    {
      "date": "2025-11-06",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7662
    },
    {
      "date": "2025-11-07",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12369
    },
    {
      "date": "2025-11-07",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14901
    },
    {
      "date": "2025-11-07",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8250
    },
    {
      "date": "2025-11-07",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10277
    },
    {
      "date": "2025-11-07",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5504
    },
    {
      "date": "2025-11-07",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6768
    },
    {
      "date": "2025-11-08",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13231
    },
    {
      "date": "2025-11-08",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16386
    },
    {
      "date": "2025-11-08",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8885
    },
    {
      "date": "2025-11-08",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11255
    },
    {
      "date": "2025-11-08",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5929
    },
    {
      "date": "2025-11-08",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7359
    },
    {
      "date": "2025-11-09",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13815
    },
    {
      "date": "2025-11-09",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15810
    },
    {
      "date": "2025-11-09",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9390
    },
    {
      "date": "2025-11-09",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12052
    },
    {
      "date": "2025-11-09",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7249
    },
    {
      "date": "2025-11-09",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8042
    },
    {
      "date": "2025-11-10",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14332
    },
    {
      "date": "2025-11-10",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16497
    },
    {
      "date": "2025-11-10",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8944
    },
    {
      "date": "2025-11-10",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11147
    },
    {
      "date": "2025-11-10",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6237
    },
    {
      "date": "2025-11-10",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7073
    },
    {
      "date": "2025-11-11",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11679
    },
    {
      "date": "2025-11-11",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15009
    },
    {
      "date": "2025-11-11",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7607
    },
    {
      "date": "2025-11-11",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9297
    },
    {
      "date": "2025-11-11",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5482
    },
    {
      "date": "2025-11-11",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6353
    },
    {
      "date": "2025-11-12",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11845
    },
    {
      "date": "2025-11-12",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15550
    },
    {
      "date": "2025-11-12",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7758
    },
    {
      "date": "2025-11-12",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9170
    },
    {
      "date": "2025-11-12",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5111
    },
    {
      "date": "2025-11-12",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6358
    },
    {
      "date": "2025-11-13",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13534
    },
    {
      "date": "2025-11-13",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16767
    },
    {
      "date": "2025-11-13",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7810
    },
    {
      "date": "2025-11-13",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15803
    },
    {
      "date": "2025-11-13",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4798
    },
    {
      "date": "2025-11-13",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6143
    },
    {
      "date": "2025-11-14",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13612
    },
    {
      "date": "2025-11-14",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14855
    },
    {
      "date": "2025-11-14",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7308
    },
    {
      "date": "2025-11-14",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9421
    },
    {
      "date": "2025-11-14",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5573
    },
    {
      "date": "2025-11-14",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6386
    },
    {
      "date": "2025-11-15",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15799
    },
    {
      "date": "2025-11-15",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16806
    },
    {
      "date": "2025-11-15",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9512
    },
    {
      "date": "2025-11-15",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12397
    },
    {
      "date": "2025-11-15",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6435
    },
    {
      "date": "2025-11-15",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8807
    },
    {
      "date": "2025-11-16",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13176
    },
    {
      "date": "2025-11-16",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16041
    },
    {
      "date": "2025-11-16",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9548
    },
    {
      "date": "2025-11-16",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10963
    },
    {
      "date": "2025-11-16",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5583
    },
    {
      "date": "2025-11-16",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7248
    },
    {
      "date": "2025-11-17",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13341
    },
    {
      "date": "2025-11-17",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15042
    },
    {
      "date": "2025-11-17",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7898
    },
    {
      "date": "2025-11-17",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8733
    },
    {
      "date": "2025-11-17",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6290
    },
    {
      "date": "2025-11-17",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7765
    },
    {
      "date": "2025-11-18",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12683
    },
    {
      "date": "2025-11-18",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16693
    },
    {
      "date": "2025-11-18",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7511
    },
    {
      "date": "2025-11-18",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9161
    },
    {
      "date": "2025-11-18",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5401
    },
    {
      "date": "2025-11-18",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6744
    },
    {
      "date": "2025-11-19",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11814
    },
    {
      "date": "2025-11-19",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15136
    },
    {
      "date": "2025-11-19",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7495
    },
    {
      "date": "2025-11-19",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9740
    },
    {
      "date": "2025-11-19",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4966
    },
    {
      "date": "2025-11-19",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6492
    },
    {
      "date": "2025-11-20",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13412
    },
    {
      "date": "2025-11-20",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15051
    },
    {
      "date": "2025-11-20",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7217
    },
    {
      "date": "2025-11-20",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15496
    },
    {
      "date": "2025-11-20",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5323
    },
    {
      "date": "2025-11-20",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6097
    },
    {
      "date": "2025-11-21",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12470
    },
    {
      "date": "2025-11-21",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16035
    },
    {
      "date": "2025-11-21",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8047
    },
    {
      "date": "2025-11-21",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9464
    },
    {
      "date": "2025-11-21",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5611
    },
    {
      "date": "2025-11-21",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7399
    },
    {
      "date": "2025-11-22",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13526
    },
    {
      "date": "2025-11-22",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15724
    },
    {
      "date": "2025-11-22",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8789
    },
    {
      "date": "2025-11-22",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11279
    },
    {
      "date": "2025-11-22",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6925
    },
    {
      "date": "2025-11-22",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7816
    },
    {
      "date": "2025-11-23",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13788
    },
    {
      "date": "2025-11-23",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16536
    },
    {
      "date": "2025-11-23",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8626
    },
    {
      "date": "2025-11-23",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10868
    },
    {
      "date": "2025-11-23",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6237
    },
    {
      "date": "2025-11-23",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7798
    },
    {
      "date": "2025-11-24",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12854
    },
    {
      "date": "2025-11-24",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14565
    },
    {
      "date": "2025-11-24",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7236
    },
    {
      "date": "2025-11-24",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8093
    },
    {
      "date": "2025-11-24",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5375
    },
    {
      "date": "2025-11-24",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6442
    },
    {
      "date": "2025-11-25",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12744
    },
    {
      "date": "2025-11-25",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15033
    },
    {
      "date": "2025-11-25",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8251
    },
    {
      "date": "2025-11-25",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10428
    },
    {
      "date": "2025-11-25",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4703
    },
    {
      "date": "2025-11-25",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6051
    },
    {
      "date": "2025-11-26",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12671
    },
    {
      "date": "2025-11-26",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15563
    },
    {
      "date": "2025-11-26",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7527
    },
    {
      "date": "2025-11-26",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9805
    },
    {
      "date": "2025-11-26",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5475
    },
    {
      "date": "2025-11-26",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6754
    },
    {
      "date": "2025-11-27",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13099
    },
    {
      "date": "2025-11-27",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15155
    },
    {
      "date": "2025-11-27",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8013
    },
    {
      "date": "2025-11-27",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16097
    },
    {
      "date": "2025-11-27",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6102
    },
    {
      "date": "2025-11-27",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7749
    },
    {
      "date": "2025-11-28",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15349
    },
    {
      "date": "2025-11-28",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16669
    },
    {
      "date": "2025-11-28",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8604
    },
    {
      "date": "2025-11-28",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10176
    },
    {
      "date": "2025-11-28",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5999
    },
    {
      "date": "2025-11-28",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6719
    },
    {
      "date": "2025-11-29",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12725
    },
    {
      "date": "2025-11-29",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15568
    },
    {
      "date": "2025-11-29",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8096
    },
    {
      "date": "2025-11-29",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10246
    },
    {
      "date": "2025-11-29",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5976
    },
    {
      "date": "2025-11-29",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8593
    },
    {
      "date": "2025-11-30",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13684
    },
    {
      "date": "2025-11-30",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17897
    },
    {
      "date": "2025-11-30",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8848
    },
    {
      "date": "2025-11-30",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10934
    },
    {
      "date": "2025-11-30",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5633
    },
    {
      "date": "2025-11-30",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6887
    },
    {
      "date": "2025-12-01",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12233
    },
    {
      "date": "2025-12-01",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16322
    },
    {
      "date": "2025-12-01",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7139
    },
    {
      "date": "2025-12-01",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9372
    },
    {
      "date": "2025-12-01",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5424
    },
    {
      "date": "2025-12-01",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6919
    },
    {
      "date": "2025-12-02",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14331
    },
    {
      "date": "2025-12-02",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17163
    },
    {
      "date": "2025-12-02",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8775
    },
    {
      "date": "2025-12-02",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10125
    },
    {
      "date": "2025-12-02",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5182
    },
    {
      "date": "2025-12-02",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6106
    },
    {
      "date": "2025-12-03",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12788
    },
    {
      "date": "2025-12-03",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14230
    },
    {
      "date": "2025-12-03",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8630
    },
    {
      "date": "2025-12-03",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11018
    },
    {
      "date": "2025-12-03",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5470
    },
    {
      "date": "2025-12-03",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6597
    },
    {
      "date": "2025-12-04",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12512
    },
    {
      "date": "2025-12-04",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16724
    },
    {
      "date": "2025-12-04",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8294
    },
    {
      "date": "2025-12-04",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16157
    },
    {
      "date": "2025-12-04",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5787
    },
    {
      "date": "2025-12-04",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7053
    },
    {
      "date": "2025-12-05",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13312
    },
    {
      "date": "2025-12-05",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14563
    },
    {
      "date": "2025-12-05",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9148
    },
    {
      "date": "2025-12-05",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10611
    },
    {
      "date": "2025-12-05",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5278
    },
    {
      "date": "2025-12-05",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6923
    },
    {
      "date": "2025-12-06",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15183
    },
    {
      "date": "2025-12-06",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17696
    },
    {
      "date": "2025-12-06",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8528
    },
    {
      "date": "2025-12-06",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10717
    },
    {
      "date": "2025-12-06",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6703
    },
    {
      "date": "2025-12-06",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8161
    },
    {
      "date": "2025-12-07",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15353
    },
    {
      "date": "2025-12-07",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17647
    },
    {
      "date": "2025-12-07",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9732
    },
    {
      "date": "2025-12-07",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12676
    },
    {
      "date": "2025-12-07",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5605
    },
    {
      "date": "2025-12-07",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7039
    },
    {
      "date": "2025-12-08",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11361
    },
    {
      "date": "2025-12-08",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13403
    },
    {
      "date": "2025-12-08",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9385
    },
    {
      "date": "2025-12-08",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10043
    },
    {
      "date": "2025-12-08",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5438
    },
    {
      "date": "2025-12-08",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6540
    },
    {
      "date": "2025-12-09",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12288
    },
    {
      "date": "2025-12-09",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14074
    },
    {
      "date": "2025-12-09",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7674
    },
    {
      "date": "2025-12-09",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9311
    },
    {
      "date": "2025-12-09",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6101
    },
    {
      "date": "2025-12-09",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7400
    },
    {
      "date": "2025-12-10",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11644
    },
    {
      "date": "2025-12-10",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13670
    },
    {
      "date": "2025-12-10",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6798
    },
    {
      "date": "2025-12-10",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9120
    },
    {
      "date": "2025-12-10",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6155
    },
    {
      "date": "2025-12-10",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7403
    },
    {
      "date": "2025-12-11",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11133
    },
    {
      "date": "2025-12-11",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13331
    },
    {
      "date": "2025-12-11",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8028
    },
    {
      "date": "2025-12-11",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17302
    },
    {
      "date": "2025-12-11",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6172
    },
    {
      "date": "2025-12-11",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7418
    },
    {
      "date": "2025-12-12",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11438
    },
    {
      "date": "2025-12-12",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15236
    },
    {
      "date": "2025-12-12",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8440
    },
    {
      "date": "2025-12-12",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9899
    },
    {
      "date": "2025-12-12",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5498
    },
    {
      "date": "2025-12-12",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6865
    },
    {
      "date": "2025-12-13",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 16256
    },
    {
      "date": "2025-12-13",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18368
    },
    {
      "date": "2025-12-13",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9787
    },
    {
      "date": "2025-12-13",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12495
    },
    {
      "date": "2025-12-13",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6791
    },
    {
      "date": "2025-12-13",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7280
    },
    {
      "date": "2025-12-14",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14713
    },
    {
      "date": "2025-12-14",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18705
    },
    {
      "date": "2025-12-14",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9426
    },
    {
      "date": "2025-12-14",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11462
    },
    {
      "date": "2025-12-14",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6433
    },
    {
      "date": "2025-12-14",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7649
    },
    {
      "date": "2025-12-15",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13736
    },
    {
      "date": "2025-12-15",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15639
    },
    {
      "date": "2025-12-15",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8000
    },
    {
      "date": "2025-12-15",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10520
    },
    {
      "date": "2025-12-15",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6469
    },
    {
      "date": "2025-12-15",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7799
    },
    {
      "date": "2025-12-16",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12027
    },
    {
      "date": "2025-12-16",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15465
    },
    {
      "date": "2025-12-16",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8013
    },
    {
      "date": "2025-12-16",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10128
    },
    {
      "date": "2025-12-16",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5197
    },
    {
      "date": "2025-12-16",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6675
    },
    {
      "date": "2025-12-17",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13517
    },
    {
      "date": "2025-12-17",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16544
    },
    {
      "date": "2025-12-17",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8580
    },
    {
      "date": "2025-12-17",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9529
    },
    {
      "date": "2025-12-17",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5815
    },
    {
      "date": "2025-12-17",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7050
    },
    {
      "date": "2025-12-18",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12698
    },
    {
      "date": "2025-12-18",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16281
    },
    {
      "date": "2025-12-18",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7559
    },
    {
      "date": "2025-12-18",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17133
    },
    {
      "date": "2025-12-18",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6416
    },
    {
      "date": "2025-12-18",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7587
    },
    {
      "date": "2025-12-19",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10636
    },
    {
      "date": "2025-12-19",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13023
    },
    {
      "date": "2025-12-19",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8421
    },
    {
      "date": "2025-12-19",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9538
    },
    {
      "date": "2025-12-19",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5418
    },
    {
      "date": "2025-12-19",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6474
    },
    {
      "date": "2025-12-20",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12115
    },
    {
      "date": "2025-12-20",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14835
    },
    {
      "date": "2025-12-20",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8479
    },
    {
      "date": "2025-12-20",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10242
    },
    {
      "date": "2025-12-20",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5841
    },
    {
      "date": "2025-12-20",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7262
    },
    {
      "date": "2025-12-21",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14949
    },
    {
      "date": "2025-12-21",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17305
    },
    {
      "date": "2025-12-21",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8973
    },
    {
      "date": "2025-12-21",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12209
    },
    {
      "date": "2025-12-21",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5707
    },
    {
      "date": "2025-12-21",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7491
    },
    {
      "date": "2025-12-22",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11802
    },
    {
      "date": "2025-12-22",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15077
    },
    {
      "date": "2025-12-22",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8781
    },
    {
      "date": "2025-12-22",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10645
    },
    {
      "date": "2025-12-22",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6102
    },
    {
      "date": "2025-12-22",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6784
    },
    {
      "date": "2025-12-23",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11444
    },
    {
      "date": "2025-12-23",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14833
    },
    {
      "date": "2025-12-23",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8686
    },
    {
      "date": "2025-12-23",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9853
    },
    {
      "date": "2025-12-23",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5794
    },
    {
      "date": "2025-12-23",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6923
    },
    {
      "date": "2025-12-24",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12743
    },
    {
      "date": "2025-12-24",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15169
    },
    {
      "date": "2025-12-24",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8180
    },
    {
      "date": "2025-12-24",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9310
    },
    {
      "date": "2025-12-24",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6063
    },
    {
      "date": "2025-12-24",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7279
    },
    {
      "date": "2025-12-25",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12593
    },
    {
      "date": "2025-12-25",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16034
    },
    {
      "date": "2025-12-25",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7708
    },
    {
      "date": "2025-12-25",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16457
    },
    {
      "date": "2025-12-25",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5457
    },
    {
      "date": "2025-12-25",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6406
    },
    {
      "date": "2025-12-26",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11836
    },
    {
      "date": "2025-12-26",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14266
    },
    {
      "date": "2025-12-26",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8598
    },
    {
      "date": "2025-12-26",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10497
    },
    {
      "date": "2025-12-26",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5224
    },
    {
      "date": "2025-12-26",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6258
    },
    {
      "date": "2025-12-27",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14869
    },
    {
      "date": "2025-12-27",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17692
    },
    {
      "date": "2025-12-27",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9263
    },
    {
      "date": "2025-12-27",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10712
    },
    {
      "date": "2025-12-27",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6963
    },
    {
      "date": "2025-12-27",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7823
    },
    {
      "date": "2025-12-28",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15052
    },
    {
      "date": "2025-12-28",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16052
    },
    {
      "date": "2025-12-28",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8127
    },
    {
      "date": "2025-12-28",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10002
    },
    {
      "date": "2025-12-28",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6309
    },
    {
      "date": "2025-12-28",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7939
    },
    {
      "date": "2025-12-29",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11086
    },
    {
      "date": "2025-12-29",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14906
    },
    {
      "date": "2025-12-29",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9170
    },
    {
      "date": "2025-12-29",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11207
    },
    {
      "date": "2025-12-29",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5525
    },
    {
      "date": "2025-12-29",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6415
    },
    {
      "date": "2025-12-30",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13198
    },
    {
      "date": "2025-12-30",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14946
    },
    {
      "date": "2025-12-30",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7438
    },
    {
      "date": "2025-12-30",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9399
    },
    {
      "date": "2025-12-30",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5915
    },
    {
      "date": "2025-12-30",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7113
    },
    {
      "date": "2025-12-31",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11979
    },
    {
      "date": "2025-12-31",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14415
    },
    {
      "date": "2025-12-31",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9891
    },
    {
      "date": "2025-12-31",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11916
    },
    {
      "date": "2025-12-31",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5267
    },
    {
      "date": "2025-12-31",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6605
    },
    {
      "date": "2026-01-01",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12908
    },
    {
      "date": "2026-01-01",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16073
    },
    {
      "date": "2026-01-01",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7553
    },
    {
      "date": "2026-01-01",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15792
    },
    {
      "date": "2026-01-01",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6250
    },
    {
      "date": "2026-01-01",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7395
    },
    {
      "date": "2026-01-02",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13105
    },
    {
      "date": "2026-01-02",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16036
    },
    {
      "date": "2026-01-02",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7426
    },
    {
      "date": "2026-01-02",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9121
    },
    {
      "date": "2026-01-02",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5449
    },
    {
      "date": "2026-01-02",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6873
    },
    {
      "date": "2026-01-03",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12002
    },
    {
      "date": "2026-01-03",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16705
    },
    {
      "date": "2026-01-03",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9991
    },
    {
      "date": "2026-01-03",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11235
    },
    {
      "date": "2026-01-03",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6441
    },
    {
      "date": "2026-01-03",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7623
    },
    {
      "date": "2026-01-04",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14919
    },
    {
      "date": "2026-01-04",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17632
    },
    {
      "date": "2026-01-04",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9232
    },
    {
      "date": "2026-01-04",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11623
    },
    {
      "date": "2026-01-04",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6748
    },
    {
      "date": "2026-01-04",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8596
    },
    {
      "date": "2026-01-05",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13139
    },
    {
      "date": "2026-01-05",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16625
    },
    {
      "date": "2026-01-05",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7881
    },
    {
      "date": "2026-01-05",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10051
    },
    {
      "date": "2026-01-05",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5654
    },
    {
      "date": "2026-01-05",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7373
    },
    {
      "date": "2026-01-06",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12788
    },
    {
      "date": "2026-01-06",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15307
    },
    {
      "date": "2026-01-06",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7156
    },
    {
      "date": "2026-01-06",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9176
    },
    {
      "date": "2026-01-06",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5881
    },
    {
      "date": "2026-01-06",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7283
    },
    {
      "date": "2026-01-07",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12443
    },
    {
      "date": "2026-01-07",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14778
    },
    {
      "date": "2026-01-07",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7238
    },
    {
      "date": "2026-01-07",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9690
    },
    {
      "date": "2026-01-07",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5771
    },
    {
      "date": "2026-01-07",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6584
    },
    {
      "date": "2026-01-08",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15283
    },
    {
      "date": "2026-01-08",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18201
    },
    {
      "date": "2026-01-08",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8552
    },
    {
      "date": "2026-01-08",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15490
    },
    {
      "date": "2026-01-08",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4946
    },
    {
      "date": "2026-01-08",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6026
    },
    {
      "date": "2026-01-09",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12322
    },
    {
      "date": "2026-01-09",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14931
    },
    {
      "date": "2026-01-09",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7819
    },
    {
      "date": "2026-01-09",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10339
    },
    {
      "date": "2026-01-09",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5547
    },
    {
      "date": "2026-01-09",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6566
    },
    {
      "date": "2026-01-10",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15623
    },
    {
      "date": "2026-01-10",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18631
    },
    {
      "date": "2026-01-10",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8337
    },
    {
      "date": "2026-01-10",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10486
    },
    {
      "date": "2026-01-10",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6229
    },
    {
      "date": "2026-01-10",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7848
    },
    {
      "date": "2026-01-11",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15519
    },
    {
      "date": "2026-01-11",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18744
    },
    {
      "date": "2026-01-11",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8878
    },
    {
      "date": "2026-01-11",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11399
    },
    {
      "date": "2026-01-11",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6858
    },
    {
      "date": "2026-01-11",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7951
    },
    {
      "date": "2026-01-12",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED_BANDH",
      "collectedTotalInr": 0
    },
    {
      "date": "2026-01-12",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED_BANDH",
      "collectedTotalInr": 0
    },
    {
      "date": "2026-01-12",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED_BANDH",
      "collectedTotalInr": 0
    },
    {
      "date": "2026-01-12",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED_BANDH",
      "collectedTotalInr": 0
    },
    {
      "date": "2026-01-12",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED_BANDH",
      "collectedTotalInr": 0
    },
    {
      "date": "2026-01-12",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED_BANDH",
      "collectedTotalInr": 0
    },
    {
      "date": "2026-01-13",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11345
    },
    {
      "date": "2026-01-13",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13515
    },
    {
      "date": "2026-01-13",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8109
    },
    {
      "date": "2026-01-13",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9638
    },
    {
      "date": "2026-01-13",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6198
    },
    {
      "date": "2026-01-13",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6933
    },
    {
      "date": "2026-01-14",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12465
    },
    {
      "date": "2026-01-14",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15263
    },
    {
      "date": "2026-01-14",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7419
    },
    {
      "date": "2026-01-14",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8789
    },
    {
      "date": "2026-01-14",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5355
    },
    {
      "date": "2026-01-14",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6615
    },
    {
      "date": "2026-01-15",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13793
    },
    {
      "date": "2026-01-15",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17613
    },
    {
      "date": "2026-01-15",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8035
    },
    {
      "date": "2026-01-15",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14495
    },
    {
      "date": "2026-01-15",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5564
    },
    {
      "date": "2026-01-15",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6426
    },
    {
      "date": "2026-01-16",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12696
    },
    {
      "date": "2026-01-16",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14733
    },
    {
      "date": "2026-01-16",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7481
    },
    {
      "date": "2026-01-16",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10096
    },
    {
      "date": "2026-01-16",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5274
    },
    {
      "date": "2026-01-16",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6442
    },
    {
      "date": "2026-01-17",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14856
    },
    {
      "date": "2026-01-17",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17194
    },
    {
      "date": "2026-01-17",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7850
    },
    {
      "date": "2026-01-17",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10625
    },
    {
      "date": "2026-01-17",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6205
    },
    {
      "date": "2026-01-17",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7656
    },
    {
      "date": "2026-01-18",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14381
    },
    {
      "date": "2026-01-18",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18948
    },
    {
      "date": "2026-01-18",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9698
    },
    {
      "date": "2026-01-18",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11907
    },
    {
      "date": "2026-01-18",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6792
    },
    {
      "date": "2026-01-18",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8468
    },
    {
      "date": "2026-01-19",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13284
    },
    {
      "date": "2026-01-19",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16390
    },
    {
      "date": "2026-01-19",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7572
    },
    {
      "date": "2026-01-19",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9429
    },
    {
      "date": "2026-01-19",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5568
    },
    {
      "date": "2026-01-19",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6752
    },
    {
      "date": "2026-01-20",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12515
    },
    {
      "date": "2026-01-20",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14768
    },
    {
      "date": "2026-01-20",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8379
    },
    {
      "date": "2026-01-20",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9459
    },
    {
      "date": "2026-01-20",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6092
    },
    {
      "date": "2026-01-20",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7409
    },
    {
      "date": "2026-01-21",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12104
    },
    {
      "date": "2026-01-21",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14498
    },
    {
      "date": "2026-01-21",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8431
    },
    {
      "date": "2026-01-21",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10714
    },
    {
      "date": "2026-01-21",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5643
    },
    {
      "date": "2026-01-21",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7127
    },
    {
      "date": "2026-01-22",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13180
    },
    {
      "date": "2026-01-22",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14765
    },
    {
      "date": "2026-01-22",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7731
    },
    {
      "date": "2026-01-22",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16273
    },
    {
      "date": "2026-01-22",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5271
    },
    {
      "date": "2026-01-22",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6655
    },
    {
      "date": "2026-01-23",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12999
    },
    {
      "date": "2026-01-23",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15928
    },
    {
      "date": "2026-01-23",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7617
    },
    {
      "date": "2026-01-23",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8578
    },
    {
      "date": "2026-01-23",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5576
    },
    {
      "date": "2026-01-23",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7023
    },
    {
      "date": "2026-01-24",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15414
    },
    {
      "date": "2026-01-24",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18185
    },
    {
      "date": "2026-01-24",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9178
    },
    {
      "date": "2026-01-24",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10901
    },
    {
      "date": "2026-01-24",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5883
    },
    {
      "date": "2026-01-24",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7788
    },
    {
      "date": "2026-01-25",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13749
    },
    {
      "date": "2026-01-25",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16827
    },
    {
      "date": "2026-01-25",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8779
    },
    {
      "date": "2026-01-25",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11043
    },
    {
      "date": "2026-01-25",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6363
    },
    {
      "date": "2026-01-25",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8283
    },
    {
      "date": "2026-01-26",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14206
    },
    {
      "date": "2026-01-26",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16528
    },
    {
      "date": "2026-01-26",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7969
    },
    {
      "date": "2026-01-26",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9937
    },
    {
      "date": "2026-01-26",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5056
    },
    {
      "date": "2026-01-26",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 5753
    },
    {
      "date": "2026-01-27",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11531
    },
    {
      "date": "2026-01-27",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14398
    },
    {
      "date": "2026-01-27",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7782
    },
    {
      "date": "2026-01-27",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9542
    },
    {
      "date": "2026-01-27",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5376
    },
    {
      "date": "2026-01-27",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6540
    },
    {
      "date": "2026-01-28",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12148
    },
    {
      "date": "2026-01-28",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15349
    },
    {
      "date": "2026-01-28",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9223
    },
    {
      "date": "2026-01-28",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11236
    },
    {
      "date": "2026-01-28",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6218
    },
    {
      "date": "2026-01-28",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7366
    },
    {
      "date": "2026-01-29",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11906
    },
    {
      "date": "2026-01-29",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15109
    },
    {
      "date": "2026-01-29",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8666
    },
    {
      "date": "2026-01-29",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16054
    },
    {
      "date": "2026-01-29",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5728
    },
    {
      "date": "2026-01-29",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6714
    },
    {
      "date": "2026-01-30",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12404
    },
    {
      "date": "2026-01-30",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15179
    },
    {
      "date": "2026-01-30",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7989
    },
    {
      "date": "2026-01-30",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9244
    },
    {
      "date": "2026-01-30",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4997
    },
    {
      "date": "2026-01-30",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6427
    },
    {
      "date": "2026-01-31",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13257
    },
    {
      "date": "2026-01-31",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17496
    },
    {
      "date": "2026-01-31",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9018
    },
    {
      "date": "2026-01-31",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11429
    },
    {
      "date": "2026-01-31",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7409
    },
    {
      "date": "2026-01-31",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8287
    },
    {
      "date": "2026-02-01",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12401
    },
    {
      "date": "2026-02-01",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15312
    },
    {
      "date": "2026-02-01",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8251
    },
    {
      "date": "2026-02-01",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10055
    },
    {
      "date": "2026-02-01",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5889
    },
    {
      "date": "2026-02-01",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7715
    },
    {
      "date": "2026-02-02",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12621
    },
    {
      "date": "2026-02-02",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15335
    },
    {
      "date": "2026-02-02",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7046
    },
    {
      "date": "2026-02-02",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9020
    },
    {
      "date": "2026-02-02",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5169
    },
    {
      "date": "2026-02-02",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6386
    },
    {
      "date": "2026-02-03",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12162
    },
    {
      "date": "2026-02-03",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16807
    },
    {
      "date": "2026-02-03",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7251
    },
    {
      "date": "2026-02-03",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8837
    },
    {
      "date": "2026-02-03",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5720
    },
    {
      "date": "2026-02-03",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7214
    },
    {
      "date": "2026-02-04",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13210
    },
    {
      "date": "2026-02-04",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16636
    },
    {
      "date": "2026-02-04",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8224
    },
    {
      "date": "2026-02-04",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9789
    },
    {
      "date": "2026-02-04",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5505
    },
    {
      "date": "2026-02-04",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7475
    },
    {
      "date": "2026-02-05",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11605
    },
    {
      "date": "2026-02-05",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14510
    },
    {
      "date": "2026-02-05",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7870
    },
    {
      "date": "2026-02-05",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15408
    },
    {
      "date": "2026-02-05",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5677
    },
    {
      "date": "2026-02-05",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6107
    },
    {
      "date": "2026-02-06",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14755
    },
    {
      "date": "2026-02-06",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16532
    },
    {
      "date": "2026-02-06",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8361
    },
    {
      "date": "2026-02-06",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9627
    },
    {
      "date": "2026-02-06",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6436
    },
    {
      "date": "2026-02-06",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7426
    },
    {
      "date": "2026-02-07",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 16247
    },
    {
      "date": "2026-02-07",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 21270
    },
    {
      "date": "2026-02-07",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8510
    },
    {
      "date": "2026-02-07",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11378
    },
    {
      "date": "2026-02-07",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6836
    },
    {
      "date": "2026-02-07",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7963
    },
    {
      "date": "2026-02-08",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14466
    },
    {
      "date": "2026-02-08",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17848
    },
    {
      "date": "2026-02-08",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9534
    },
    {
      "date": "2026-02-08",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12672
    },
    {
      "date": "2026-02-08",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6468
    },
    {
      "date": "2026-02-08",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7968
    },
    {
      "date": "2026-02-09",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15756
    },
    {
      "date": "2026-02-09",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18093
    },
    {
      "date": "2026-02-09",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7663
    },
    {
      "date": "2026-02-09",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9271
    },
    {
      "date": "2026-02-09",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6254
    },
    {
      "date": "2026-02-09",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7146
    },
    {
      "date": "2026-02-10",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13146
    },
    {
      "date": "2026-02-10",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15985
    },
    {
      "date": "2026-02-10",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7925
    },
    {
      "date": "2026-02-10",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9772
    },
    {
      "date": "2026-02-10",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5242
    },
    {
      "date": "2026-02-10",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6770
    },
    {
      "date": "2026-02-11",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13305
    },
    {
      "date": "2026-02-11",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16424
    },
    {
      "date": "2026-02-11",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8904
    },
    {
      "date": "2026-02-11",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10299
    },
    {
      "date": "2026-02-11",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5370
    },
    {
      "date": "2026-02-11",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6667
    },
    {
      "date": "2026-02-12",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12765
    },
    {
      "date": "2026-02-12",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15657
    },
    {
      "date": "2026-02-12",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8178
    },
    {
      "date": "2026-02-12",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16959
    },
    {
      "date": "2026-02-12",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5822
    },
    {
      "date": "2026-02-12",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6752
    },
    {
      "date": "2026-02-13",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11506
    },
    {
      "date": "2026-02-13",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13165
    },
    {
      "date": "2026-02-13",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7992
    },
    {
      "date": "2026-02-13",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10216
    },
    {
      "date": "2026-02-13",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5337
    },
    {
      "date": "2026-02-13",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7065
    },
    {
      "date": "2026-02-14",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13241
    },
    {
      "date": "2026-02-14",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16276
    },
    {
      "date": "2026-02-14",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8375
    },
    {
      "date": "2026-02-14",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10932
    },
    {
      "date": "2026-02-14",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6261
    },
    {
      "date": "2026-02-14",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7524
    },
    {
      "date": "2026-02-15",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14351
    },
    {
      "date": "2026-02-15",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16080
    },
    {
      "date": "2026-02-15",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10139
    },
    {
      "date": "2026-02-15",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12242
    },
    {
      "date": "2026-02-15",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5923
    },
    {
      "date": "2026-02-15",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7839
    },
    {
      "date": "2026-02-16",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11996
    },
    {
      "date": "2026-02-16",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14981
    },
    {
      "date": "2026-02-16",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8675
    },
    {
      "date": "2026-02-16",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10918
    },
    {
      "date": "2026-02-16",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5465
    },
    {
      "date": "2026-02-16",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7040
    },
    {
      "date": "2026-02-17",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12291
    },
    {
      "date": "2026-02-17",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16099
    },
    {
      "date": "2026-02-17",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8994
    },
    {
      "date": "2026-02-17",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10493
    },
    {
      "date": "2026-02-17",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6398
    },
    {
      "date": "2026-02-17",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6889
    },
    {
      "date": "2026-02-18",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11711
    },
    {
      "date": "2026-02-18",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14275
    },
    {
      "date": "2026-02-18",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8353
    },
    {
      "date": "2026-02-18",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10089
    },
    {
      "date": "2026-02-18",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5816
    },
    {
      "date": "2026-02-18",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6239
    },
    {
      "date": "2026-02-19",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12464
    },
    {
      "date": "2026-02-19",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15305
    },
    {
      "date": "2026-02-19",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8950
    },
    {
      "date": "2026-02-19",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17918
    },
    {
      "date": "2026-02-19",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6123
    },
    {
      "date": "2026-02-19",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6877
    },
    {
      "date": "2026-02-20",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12677
    },
    {
      "date": "2026-02-20",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15948
    },
    {
      "date": "2026-02-20",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7881
    },
    {
      "date": "2026-02-20",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9866
    },
    {
      "date": "2026-02-20",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4986
    },
    {
      "date": "2026-02-20",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6563
    },
    {
      "date": "2026-02-21",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12918
    },
    {
      "date": "2026-02-21",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15839
    },
    {
      "date": "2026-02-21",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10264
    },
    {
      "date": "2026-02-21",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11458
    },
    {
      "date": "2026-02-21",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6394
    },
    {
      "date": "2026-02-21",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7863
    },
    {
      "date": "2026-02-22",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15476
    },
    {
      "date": "2026-02-22",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17689
    },
    {
      "date": "2026-02-22",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9764
    },
    {
      "date": "2026-02-22",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11018
    },
    {
      "date": "2026-02-22",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6342
    },
    {
      "date": "2026-02-22",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8060
    },
    {
      "date": "2026-02-23",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10116
    },
    {
      "date": "2026-02-23",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12803
    },
    {
      "date": "2026-02-23",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7754
    },
    {
      "date": "2026-02-23",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9029
    },
    {
      "date": "2026-02-23",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6098
    },
    {
      "date": "2026-02-23",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6939
    },
    {
      "date": "2026-02-24",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11973
    },
    {
      "date": "2026-02-24",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14897
    },
    {
      "date": "2026-02-24",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7858
    },
    {
      "date": "2026-02-24",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10179
    },
    {
      "date": "2026-02-24",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5303
    },
    {
      "date": "2026-02-24",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6012
    },
    {
      "date": "2026-02-25",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12880
    },
    {
      "date": "2026-02-25",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14693
    },
    {
      "date": "2026-02-25",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8117
    },
    {
      "date": "2026-02-25",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9683
    },
    {
      "date": "2026-02-25",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5614
    },
    {
      "date": "2026-02-25",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6477
    },
    {
      "date": "2026-02-26",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12180
    },
    {
      "date": "2026-02-26",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13735
    },
    {
      "date": "2026-02-26",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8175
    },
    {
      "date": "2026-02-26",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15783
    },
    {
      "date": "2026-02-26",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5266
    },
    {
      "date": "2026-02-26",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6592
    },
    {
      "date": "2026-02-27",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12934
    },
    {
      "date": "2026-02-27",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15652
    },
    {
      "date": "2026-02-27",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8237
    },
    {
      "date": "2026-02-27",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9768
    },
    {
      "date": "2026-02-27",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6138
    },
    {
      "date": "2026-02-27",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7344
    },
    {
      "date": "2026-02-28",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15527
    },
    {
      "date": "2026-02-28",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 21127
    },
    {
      "date": "2026-02-28",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9800
    },
    {
      "date": "2026-02-28",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11906
    },
    {
      "date": "2026-02-28",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5922
    },
    {
      "date": "2026-02-28",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7402
    },
    {
      "date": "2026-03-01",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13566
    },
    {
      "date": "2026-03-01",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17499
    },
    {
      "date": "2026-03-01",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9318
    },
    {
      "date": "2026-03-01",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11905
    },
    {
      "date": "2026-03-01",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6715
    },
    {
      "date": "2026-03-01",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7445
    },
    {
      "date": "2026-03-02",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11447
    },
    {
      "date": "2026-03-02",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14649
    },
    {
      "date": "2026-03-02",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7833
    },
    {
      "date": "2026-03-02",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9641
    },
    {
      "date": "2026-03-02",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5627
    },
    {
      "date": "2026-03-02",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6575
    },
    {
      "date": "2026-03-03",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12691
    },
    {
      "date": "2026-03-03",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16542
    },
    {
      "date": "2026-03-03",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8435
    },
    {
      "date": "2026-03-03",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11273
    },
    {
      "date": "2026-03-03",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5673
    },
    {
      "date": "2026-03-03",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6303
    },
    {
      "date": "2026-03-04",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14287
    },
    {
      "date": "2026-03-04",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16839
    },
    {
      "date": "2026-03-04",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7210
    },
    {
      "date": "2026-03-04",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8698
    },
    {
      "date": "2026-03-04",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5845
    },
    {
      "date": "2026-03-04",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6928
    },
    {
      "date": "2026-03-05",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12667
    },
    {
      "date": "2026-03-05",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16480
    },
    {
      "date": "2026-03-05",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7178
    },
    {
      "date": "2026-03-05",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13612
    },
    {
      "date": "2026-03-05",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5858
    },
    {
      "date": "2026-03-05",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6846
    },
    {
      "date": "2026-03-06",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12003
    },
    {
      "date": "2026-03-06",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14271
    },
    {
      "date": "2026-03-06",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7302
    },
    {
      "date": "2026-03-06",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9140
    },
    {
      "date": "2026-03-06",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6043
    },
    {
      "date": "2026-03-06",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6934
    },
    {
      "date": "2026-03-07",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15448
    },
    {
      "date": "2026-03-07",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17393
    },
    {
      "date": "2026-03-07",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10217
    },
    {
      "date": "2026-03-07",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12332
    },
    {
      "date": "2026-03-07",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6748
    },
    {
      "date": "2026-03-07",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8628
    },
    {
      "date": "2026-03-08",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14698
    },
    {
      "date": "2026-03-08",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18187
    },
    {
      "date": "2026-03-08",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10669
    },
    {
      "date": "2026-03-08",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12756
    },
    {
      "date": "2026-03-08",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5400
    },
    {
      "date": "2026-03-08",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7253
    },
    {
      "date": "2026-03-09",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12816
    },
    {
      "date": "2026-03-09",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16120
    },
    {
      "date": "2026-03-09",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7630
    },
    {
      "date": "2026-03-09",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9415
    },
    {
      "date": "2026-03-09",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4945
    },
    {
      "date": "2026-03-09",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6688
    },
    {
      "date": "2026-03-10",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14064
    },
    {
      "date": "2026-03-10",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17383
    },
    {
      "date": "2026-03-10",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7321
    },
    {
      "date": "2026-03-10",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9617
    },
    {
      "date": "2026-03-10",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6749
    },
    {
      "date": "2026-03-10",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7723
    },
    {
      "date": "2026-03-11",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11703
    },
    {
      "date": "2026-03-11",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14904
    },
    {
      "date": "2026-03-11",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8828
    },
    {
      "date": "2026-03-11",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10247
    },
    {
      "date": "2026-03-11",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5828
    },
    {
      "date": "2026-03-11",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7190
    },
    {
      "date": "2026-03-12",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13368
    },
    {
      "date": "2026-03-12",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16785
    },
    {
      "date": "2026-03-12",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8096
    },
    {
      "date": "2026-03-12",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15093
    },
    {
      "date": "2026-03-12",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5514
    },
    {
      "date": "2026-03-12",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6812
    },
    {
      "date": "2026-03-13",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13597
    },
    {
      "date": "2026-03-13",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16024
    },
    {
      "date": "2026-03-13",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7952
    },
    {
      "date": "2026-03-13",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9760
    },
    {
      "date": "2026-03-13",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5780
    },
    {
      "date": "2026-03-13",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7069
    },
    {
      "date": "2026-03-14",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14357
    },
    {
      "date": "2026-03-14",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15399
    },
    {
      "date": "2026-03-14",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9021
    },
    {
      "date": "2026-03-14",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10570
    },
    {
      "date": "2026-03-14",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7371
    },
    {
      "date": "2026-03-14",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8749
    },
    {
      "date": "2026-03-15",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12797
    },
    {
      "date": "2026-03-15",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16893
    },
    {
      "date": "2026-03-15",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9575
    },
    {
      "date": "2026-03-15",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11955
    },
    {
      "date": "2026-03-15",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7057
    },
    {
      "date": "2026-03-15",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9347
    },
    {
      "date": "2026-03-16",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13179
    },
    {
      "date": "2026-03-16",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15085
    },
    {
      "date": "2026-03-16",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8516
    },
    {
      "date": "2026-03-16",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9960
    },
    {
      "date": "2026-03-16",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6619
    },
    {
      "date": "2026-03-16",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6767
    },
    {
      "date": "2026-03-17",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12737
    },
    {
      "date": "2026-03-17",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14454
    },
    {
      "date": "2026-03-17",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8042
    },
    {
      "date": "2026-03-17",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11079
    },
    {
      "date": "2026-03-17",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5485
    },
    {
      "date": "2026-03-17",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6698
    },
    {
      "date": "2026-03-18",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14395
    },
    {
      "date": "2026-03-18",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17885
    },
    {
      "date": "2026-03-18",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8476
    },
    {
      "date": "2026-03-18",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9441
    },
    {
      "date": "2026-03-18",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6152
    },
    {
      "date": "2026-03-18",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8008
    },
    {
      "date": "2026-03-19",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13939
    },
    {
      "date": "2026-03-19",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16281
    },
    {
      "date": "2026-03-19",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8010
    },
    {
      "date": "2026-03-19",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15080
    },
    {
      "date": "2026-03-19",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6200
    },
    {
      "date": "2026-03-19",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7089
    },
    {
      "date": "2026-03-20",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12483
    },
    {
      "date": "2026-03-20",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14468
    },
    {
      "date": "2026-03-20",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7443
    },
    {
      "date": "2026-03-20",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8539
    },
    {
      "date": "2026-03-20",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6425
    },
    {
      "date": "2026-03-20",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7658
    },
    {
      "date": "2026-03-21",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13834
    },
    {
      "date": "2026-03-21",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18074
    },
    {
      "date": "2026-03-21",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9989
    },
    {
      "date": "2026-03-21",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12352
    },
    {
      "date": "2026-03-21",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6604
    },
    {
      "date": "2026-03-21",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7973
    },
    {
      "date": "2026-03-22",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14338
    },
    {
      "date": "2026-03-22",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17649
    },
    {
      "date": "2026-03-22",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9537
    },
    {
      "date": "2026-03-22",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11612
    },
    {
      "date": "2026-03-22",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6726
    },
    {
      "date": "2026-03-22",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7937
    },
    {
      "date": "2026-03-23",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13072
    },
    {
      "date": "2026-03-23",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14977
    },
    {
      "date": "2026-03-23",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8181
    },
    {
      "date": "2026-03-23",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9172
    },
    {
      "date": "2026-03-23",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5122
    },
    {
      "date": "2026-03-23",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6509
    },
    {
      "date": "2026-03-24",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12356
    },
    {
      "date": "2026-03-24",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14212
    },
    {
      "date": "2026-03-24",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7489
    },
    {
      "date": "2026-03-24",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8645
    },
    {
      "date": "2026-03-24",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5661
    },
    {
      "date": "2026-03-24",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6998
    },
    {
      "date": "2026-03-25",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11765
    },
    {
      "date": "2026-03-25",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14391
    },
    {
      "date": "2026-03-25",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7263
    },
    {
      "date": "2026-03-25",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9305
    },
    {
      "date": "2026-03-25",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5741
    },
    {
      "date": "2026-03-25",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6546
    },
    {
      "date": "2026-03-26",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11585
    },
    {
      "date": "2026-03-26",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14450
    },
    {
      "date": "2026-03-26",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8309
    },
    {
      "date": "2026-03-26",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15179
    },
    {
      "date": "2026-03-26",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5584
    },
    {
      "date": "2026-03-26",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6220
    },
    {
      "date": "2026-03-27",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13199
    },
    {
      "date": "2026-03-27",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14870
    },
    {
      "date": "2026-03-27",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8607
    },
    {
      "date": "2026-03-27",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10521
    },
    {
      "date": "2026-03-27",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5575
    },
    {
      "date": "2026-03-27",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6112
    },
    {
      "date": "2026-03-28",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14584
    },
    {
      "date": "2026-03-28",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17697
    },
    {
      "date": "2026-03-28",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10186
    },
    {
      "date": "2026-03-28",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12075
    },
    {
      "date": "2026-03-28",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7344
    },
    {
      "date": "2026-03-28",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8325
    },
    {
      "date": "2026-03-29",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 16177
    },
    {
      "date": "2026-03-29",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 20022
    },
    {
      "date": "2026-03-29",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9632
    },
    {
      "date": "2026-03-29",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11826
    },
    {
      "date": "2026-03-29",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6880
    },
    {
      "date": "2026-03-29",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7892
    },
    {
      "date": "2026-03-30",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13557
    },
    {
      "date": "2026-03-30",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16879
    },
    {
      "date": "2026-03-30",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7613
    },
    {
      "date": "2026-03-30",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9354
    },
    {
      "date": "2026-03-30",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5765
    },
    {
      "date": "2026-03-30",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7101
    },
    {
      "date": "2026-03-31",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13240
    },
    {
      "date": "2026-03-31",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16189
    },
    {
      "date": "2026-03-31",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7532
    },
    {
      "date": "2026-03-31",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9228
    },
    {
      "date": "2026-03-31",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5432
    },
    {
      "date": "2026-03-31",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6859
    },
    {
      "date": "2026-04-01",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13190
    },
    {
      "date": "2026-04-01",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15695
    },
    {
      "date": "2026-04-01",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9000
    },
    {
      "date": "2026-04-01",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10345
    },
    {
      "date": "2026-04-01",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5284
    },
    {
      "date": "2026-04-01",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6507
    },
    {
      "date": "2026-04-02",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12590
    },
    {
      "date": "2026-04-02",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15004
    },
    {
      "date": "2026-04-02",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8120
    },
    {
      "date": "2026-04-02",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15104
    },
    {
      "date": "2026-04-02",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6197
    },
    {
      "date": "2026-04-02",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7147
    },
    {
      "date": "2026-04-03",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13192
    },
    {
      "date": "2026-04-03",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15464
    },
    {
      "date": "2026-04-03",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8268
    },
    {
      "date": "2026-04-03",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9755
    },
    {
      "date": "2026-04-03",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5663
    },
    {
      "date": "2026-04-03",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6649
    },
    {
      "date": "2026-04-04",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15374
    },
    {
      "date": "2026-04-04",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17616
    },
    {
      "date": "2026-04-04",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9215
    },
    {
      "date": "2026-04-04",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10563
    },
    {
      "date": "2026-04-04",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6082
    },
    {
      "date": "2026-04-04",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8171
    },
    {
      "date": "2026-04-05",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15467
    },
    {
      "date": "2026-04-05",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18051
    },
    {
      "date": "2026-04-05",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9956
    },
    {
      "date": "2026-04-05",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12567
    },
    {
      "date": "2026-04-05",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5731
    },
    {
      "date": "2026-04-05",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6660
    },
    {
      "date": "2026-04-06",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11346
    },
    {
      "date": "2026-04-06",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14476
    },
    {
      "date": "2026-04-06",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8862
    },
    {
      "date": "2026-04-06",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10474
    },
    {
      "date": "2026-04-06",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5869
    },
    {
      "date": "2026-04-06",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6515
    },
    {
      "date": "2026-04-07",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12213
    },
    {
      "date": "2026-04-07",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15509
    },
    {
      "date": "2026-04-07",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8370
    },
    {
      "date": "2026-04-07",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10565
    },
    {
      "date": "2026-04-07",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5368
    },
    {
      "date": "2026-04-07",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6706
    },
    {
      "date": "2026-04-08",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13006
    },
    {
      "date": "2026-04-08",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15957
    },
    {
      "date": "2026-04-08",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7816
    },
    {
      "date": "2026-04-08",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9098
    },
    {
      "date": "2026-04-08",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5140
    },
    {
      "date": "2026-04-08",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6463
    },
    {
      "date": "2026-04-09",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12002
    },
    {
      "date": "2026-04-09",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15729
    },
    {
      "date": "2026-04-09",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8067
    },
    {
      "date": "2026-04-09",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14881
    },
    {
      "date": "2026-04-09",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6089
    },
    {
      "date": "2026-04-09",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7555
    },
    {
      "date": "2026-04-10",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11057
    },
    {
      "date": "2026-04-10",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13492
    },
    {
      "date": "2026-04-10",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7573
    },
    {
      "date": "2026-04-10",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8865
    },
    {
      "date": "2026-04-10",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5390
    },
    {
      "date": "2026-04-10",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7233
    },
    {
      "date": "2026-04-11",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 16158
    },
    {
      "date": "2026-04-11",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18986
    },
    {
      "date": "2026-04-11",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9022
    },
    {
      "date": "2026-04-11",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10801
    },
    {
      "date": "2026-04-11",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6280
    },
    {
      "date": "2026-04-11",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8163
    },
    {
      "date": "2026-04-12",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14319
    },
    {
      "date": "2026-04-12",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16806
    },
    {
      "date": "2026-04-12",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9054
    },
    {
      "date": "2026-04-12",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10788
    },
    {
      "date": "2026-04-12",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6045
    },
    {
      "date": "2026-04-12",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7569
    },
    {
      "date": "2026-04-13",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13089
    },
    {
      "date": "2026-04-13",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15040
    },
    {
      "date": "2026-04-13",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8842
    },
    {
      "date": "2026-04-13",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10015
    },
    {
      "date": "2026-04-13",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5680
    },
    {
      "date": "2026-04-13",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7470
    },
    {
      "date": "2026-04-14",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13570
    },
    {
      "date": "2026-04-14",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15537
    },
    {
      "date": "2026-04-14",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8167
    },
    {
      "date": "2026-04-14",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10226
    },
    {
      "date": "2026-04-14",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5215
    },
    {
      "date": "2026-04-14",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7103
    },
    {
      "date": "2026-04-15",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13719
    },
    {
      "date": "2026-04-15",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16372
    },
    {
      "date": "2026-04-15",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8979
    },
    {
      "date": "2026-04-15",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10017
    },
    {
      "date": "2026-04-15",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5644
    },
    {
      "date": "2026-04-15",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6954
    },
    {
      "date": "2026-04-16",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11615
    },
    {
      "date": "2026-04-16",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14380
    },
    {
      "date": "2026-04-16",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8646
    },
    {
      "date": "2026-04-16",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15952
    },
    {
      "date": "2026-04-16",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5600
    },
    {
      "date": "2026-04-16",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7029
    },
    {
      "date": "2026-04-17",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12513
    },
    {
      "date": "2026-04-17",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16170
    },
    {
      "date": "2026-04-17",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8270
    },
    {
      "date": "2026-04-17",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9792
    },
    {
      "date": "2026-04-17",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5239
    },
    {
      "date": "2026-04-17",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7506
    },
    {
      "date": "2026-04-18",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13323
    },
    {
      "date": "2026-04-18",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16490
    },
    {
      "date": "2026-04-18",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8658
    },
    {
      "date": "2026-04-18",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11244
    },
    {
      "date": "2026-04-18",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6218
    },
    {
      "date": "2026-04-18",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7129
    },
    {
      "date": "2026-04-19",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15860
    },
    {
      "date": "2026-04-19",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 21724
    },
    {
      "date": "2026-04-19",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9218
    },
    {
      "date": "2026-04-19",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11554
    },
    {
      "date": "2026-04-19",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6271
    },
    {
      "date": "2026-04-19",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7817
    },
    {
      "date": "2026-04-20",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12908
    },
    {
      "date": "2026-04-20",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15593
    },
    {
      "date": "2026-04-20",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7509
    },
    {
      "date": "2026-04-20",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9067
    },
    {
      "date": "2026-04-20",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6099
    },
    {
      "date": "2026-04-20",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7483
    },
    {
      "date": "2026-04-21",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12845
    },
    {
      "date": "2026-04-21",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16742
    },
    {
      "date": "2026-04-21",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9049
    },
    {
      "date": "2026-04-21",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10859
    },
    {
      "date": "2026-04-21",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5440
    },
    {
      "date": "2026-04-21",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 5890
    },
    {
      "date": "2026-04-22",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12811
    },
    {
      "date": "2026-04-22",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14584
    },
    {
      "date": "2026-04-22",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8207
    },
    {
      "date": "2026-04-22",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9540
    },
    {
      "date": "2026-04-22",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6418
    },
    {
      "date": "2026-04-22",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7706
    },
    {
      "date": "2026-04-23",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12012
    },
    {
      "date": "2026-04-23",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15606
    },
    {
      "date": "2026-04-23",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8065
    },
    {
      "date": "2026-04-23",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17049
    },
    {
      "date": "2026-04-23",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5373
    },
    {
      "date": "2026-04-23",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6405
    },
    {
      "date": "2026-04-24",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13681
    },
    {
      "date": "2026-04-24",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16642
    },
    {
      "date": "2026-04-24",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8673
    },
    {
      "date": "2026-04-24",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10437
    },
    {
      "date": "2026-04-24",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5575
    },
    {
      "date": "2026-04-24",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6344
    },
    {
      "date": "2026-04-25",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13412
    },
    {
      "date": "2026-04-25",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15522
    },
    {
      "date": "2026-04-25",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8414
    },
    {
      "date": "2026-04-25",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11671
    },
    {
      "date": "2026-04-25",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6892
    },
    {
      "date": "2026-04-25",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8289
    },
    {
      "date": "2026-04-26",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13825
    },
    {
      "date": "2026-04-26",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17652
    },
    {
      "date": "2026-04-26",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9129
    },
    {
      "date": "2026-04-26",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11501
    },
    {
      "date": "2026-04-26",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6341
    },
    {
      "date": "2026-04-26",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7372
    },
    {
      "date": "2026-04-27",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14549
    },
    {
      "date": "2026-04-27",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 19280
    },
    {
      "date": "2026-04-27",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7618
    },
    {
      "date": "2026-04-27",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9690
    },
    {
      "date": "2026-04-27",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4991
    },
    {
      "date": "2026-04-27",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6127
    },
    {
      "date": "2026-04-28",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12692
    },
    {
      "date": "2026-04-28",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15879
    },
    {
      "date": "2026-04-28",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8078
    },
    {
      "date": "2026-04-28",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9892
    },
    {
      "date": "2026-04-28",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5305
    },
    {
      "date": "2026-04-28",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6813
    },
    {
      "date": "2026-04-29",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12687
    },
    {
      "date": "2026-04-29",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15187
    },
    {
      "date": "2026-04-29",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8162
    },
    {
      "date": "2026-04-29",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10492
    },
    {
      "date": "2026-04-29",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4941
    },
    {
      "date": "2026-04-29",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6106
    },
    {
      "date": "2026-04-30",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10878
    },
    {
      "date": "2026-04-30",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14517
    },
    {
      "date": "2026-04-30",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8073
    },
    {
      "date": "2026-04-30",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17044
    },
    {
      "date": "2026-04-30",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5828
    },
    {
      "date": "2026-04-30",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7099
    },
    {
      "date": "2026-05-01",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12085
    },
    {
      "date": "2026-05-01",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15132
    },
    {
      "date": "2026-05-01",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7619
    },
    {
      "date": "2026-05-01",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9115
    },
    {
      "date": "2026-05-01",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6411
    },
    {
      "date": "2026-05-01",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7831
    },
    {
      "date": "2026-05-02",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15288
    },
    {
      "date": "2026-05-02",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18071
    },
    {
      "date": "2026-05-02",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9814
    },
    {
      "date": "2026-05-02",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10593
    },
    {
      "date": "2026-05-02",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6174
    },
    {
      "date": "2026-05-02",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7081
    },
    {
      "date": "2026-05-03",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 16592
    },
    {
      "date": "2026-05-03",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 19418
    },
    {
      "date": "2026-05-03",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8150
    },
    {
      "date": "2026-05-03",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11245
    },
    {
      "date": "2026-05-03",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6975
    },
    {
      "date": "2026-05-03",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8314
    },
    {
      "date": "2026-05-04",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14020
    },
    {
      "date": "2026-05-04",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17060
    },
    {
      "date": "2026-05-04",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7782
    },
    {
      "date": "2026-05-04",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9369
    },
    {
      "date": "2026-05-04",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5742
    },
    {
      "date": "2026-05-04",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6403
    },
    {
      "date": "2026-05-05",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13372
    },
    {
      "date": "2026-05-05",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16293
    },
    {
      "date": "2026-05-05",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7497
    },
    {
      "date": "2026-05-05",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10205
    },
    {
      "date": "2026-05-05",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5185
    },
    {
      "date": "2026-05-05",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7119
    },
    {
      "date": "2026-05-06",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12117
    },
    {
      "date": "2026-05-06",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13640
    },
    {
      "date": "2026-05-06",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8415
    },
    {
      "date": "2026-05-06",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10921
    },
    {
      "date": "2026-05-06",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5425
    },
    {
      "date": "2026-05-06",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6816
    },
    {
      "date": "2026-05-07",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12640
    },
    {
      "date": "2026-05-07",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15165
    },
    {
      "date": "2026-05-07",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7097
    },
    {
      "date": "2026-05-07",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15520
    },
    {
      "date": "2026-05-07",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5472
    },
    {
      "date": "2026-05-07",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6464
    },
    {
      "date": "2026-05-08",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13610
    },
    {
      "date": "2026-05-08",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16058
    },
    {
      "date": "2026-05-08",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8953
    },
    {
      "date": "2026-05-08",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10299
    },
    {
      "date": "2026-05-08",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6397
    },
    {
      "date": "2026-05-08",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7869
    },
    {
      "date": "2026-05-09",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14322
    },
    {
      "date": "2026-05-09",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17489
    },
    {
      "date": "2026-05-09",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9396
    },
    {
      "date": "2026-05-09",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11321
    },
    {
      "date": "2026-05-09",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6383
    },
    {
      "date": "2026-05-09",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7465
    },
    {
      "date": "2026-05-10",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15268
    },
    {
      "date": "2026-05-10",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 19201
    },
    {
      "date": "2026-05-10",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8431
    },
    {
      "date": "2026-05-10",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11044
    },
    {
      "date": "2026-05-10",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6513
    },
    {
      "date": "2026-05-10",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7278
    },
    {
      "date": "2026-05-11",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12075
    },
    {
      "date": "2026-05-11",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14496
    },
    {
      "date": "2026-05-11",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8145
    },
    {
      "date": "2026-05-11",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10714
    },
    {
      "date": "2026-05-11",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6232
    },
    {
      "date": "2026-05-11",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7959
    },
    {
      "date": "2026-05-12",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11917
    },
    {
      "date": "2026-05-12",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14596
    },
    {
      "date": "2026-05-12",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8419
    },
    {
      "date": "2026-05-12",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10340
    },
    {
      "date": "2026-05-12",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5079
    },
    {
      "date": "2026-05-12",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6149
    },
    {
      "date": "2026-05-13",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13291
    },
    {
      "date": "2026-05-13",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15073
    },
    {
      "date": "2026-05-13",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7201
    },
    {
      "date": "2026-05-13",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9191
    },
    {
      "date": "2026-05-13",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5721
    },
    {
      "date": "2026-05-13",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6846
    },
    {
      "date": "2026-05-14",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11403
    },
    {
      "date": "2026-05-14",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14624
    },
    {
      "date": "2026-05-14",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8267
    },
    {
      "date": "2026-05-14",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16068
    },
    {
      "date": "2026-05-14",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5028
    },
    {
      "date": "2026-05-14",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6452
    },
    {
      "date": "2026-05-15",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12052
    },
    {
      "date": "2026-05-15",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16000
    },
    {
      "date": "2026-05-15",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7701
    },
    {
      "date": "2026-05-15",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9070
    },
    {
      "date": "2026-05-15",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5319
    },
    {
      "date": "2026-05-15",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7108
    },
    {
      "date": "2026-05-16",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15087
    },
    {
      "date": "2026-05-16",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17556
    },
    {
      "date": "2026-05-16",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10026
    },
    {
      "date": "2026-05-16",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12064
    },
    {
      "date": "2026-05-16",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6768
    },
    {
      "date": "2026-05-16",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7696
    },
    {
      "date": "2026-05-17",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14452
    },
    {
      "date": "2026-05-17",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17730
    },
    {
      "date": "2026-05-17",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9017
    },
    {
      "date": "2026-05-17",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10905
    },
    {
      "date": "2026-05-17",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6546
    },
    {
      "date": "2026-05-17",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7492
    },
    {
      "date": "2026-05-18",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12715
    },
    {
      "date": "2026-05-18",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15739
    },
    {
      "date": "2026-05-18",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9591
    },
    {
      "date": "2026-05-18",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11254
    },
    {
      "date": "2026-05-18",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6091
    },
    {
      "date": "2026-05-18",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7712
    },
    {
      "date": "2026-05-19",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12187
    },
    {
      "date": "2026-05-19",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15304
    },
    {
      "date": "2026-05-19",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7909
    },
    {
      "date": "2026-05-19",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10690
    },
    {
      "date": "2026-05-19",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5338
    },
    {
      "date": "2026-05-19",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6344
    },
    {
      "date": "2026-05-20",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12749
    },
    {
      "date": "2026-05-20",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16481
    },
    {
      "date": "2026-05-20",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7853
    },
    {
      "date": "2026-05-20",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9818
    },
    {
      "date": "2026-05-20",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6130
    },
    {
      "date": "2026-05-20",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7509
    },
    {
      "date": "2026-05-21",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13485
    },
    {
      "date": "2026-05-21",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17003
    },
    {
      "date": "2026-05-21",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8227
    },
    {
      "date": "2026-05-21",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16035
    },
    {
      "date": "2026-05-21",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6387
    },
    {
      "date": "2026-05-21",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7686
    },
    {
      "date": "2026-05-22",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12507
    },
    {
      "date": "2026-05-22",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16076
    },
    {
      "date": "2026-05-22",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7800
    },
    {
      "date": "2026-05-22",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9582
    },
    {
      "date": "2026-05-22",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5020
    },
    {
      "date": "2026-05-22",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6060
    },
    {
      "date": "2026-05-23",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14569
    },
    {
      "date": "2026-05-23",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18886
    },
    {
      "date": "2026-05-23",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10022
    },
    {
      "date": "2026-05-23",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11921
    },
    {
      "date": "2026-05-23",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6799
    },
    {
      "date": "2026-05-23",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7807
    },
    {
      "date": "2026-05-24",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11804
    },
    {
      "date": "2026-05-24",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14560
    },
    {
      "date": "2026-05-24",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9331
    },
    {
      "date": "2026-05-24",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11213
    },
    {
      "date": "2026-05-24",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6021
    },
    {
      "date": "2026-05-24",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7796
    },
    {
      "date": "2026-05-25",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12188
    },
    {
      "date": "2026-05-25",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14168
    },
    {
      "date": "2026-05-25",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8198
    },
    {
      "date": "2026-05-25",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10358
    },
    {
      "date": "2026-05-25",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5199
    },
    {
      "date": "2026-05-25",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6316
    },
    {
      "date": "2026-05-26",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11460
    },
    {
      "date": "2026-05-26",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15995
    },
    {
      "date": "2026-05-26",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7626
    },
    {
      "date": "2026-05-26",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9790
    },
    {
      "date": "2026-05-26",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6521
    },
    {
      "date": "2026-05-26",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7575
    },
    {
      "date": "2026-05-27",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13791
    },
    {
      "date": "2026-05-27",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16889
    },
    {
      "date": "2026-05-27",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8115
    },
    {
      "date": "2026-05-27",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9969
    },
    {
      "date": "2026-05-27",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5583
    },
    {
      "date": "2026-05-27",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6944
    },
    {
      "date": "2026-05-28",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10882
    },
    {
      "date": "2026-05-28",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14289
    },
    {
      "date": "2026-05-28",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8638
    },
    {
      "date": "2026-05-28",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14602
    },
    {
      "date": "2026-05-28",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5260
    },
    {
      "date": "2026-05-28",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6999
    },
    {
      "date": "2026-05-29",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11812
    },
    {
      "date": "2026-05-29",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13588
    },
    {
      "date": "2026-05-29",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7708
    },
    {
      "date": "2026-05-29",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9704
    },
    {
      "date": "2026-05-29",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5309
    },
    {
      "date": "2026-05-29",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6190
    },
    {
      "date": "2026-05-30",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13907
    },
    {
      "date": "2026-05-30",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17146
    },
    {
      "date": "2026-05-30",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8861
    },
    {
      "date": "2026-05-30",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10781
    },
    {
      "date": "2026-05-30",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6636
    },
    {
      "date": "2026-05-30",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8572
    },
    {
      "date": "2026-05-31",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14075
    },
    {
      "date": "2026-05-31",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18767
    },
    {
      "date": "2026-05-31",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9019
    },
    {
      "date": "2026-05-31",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10622
    },
    {
      "date": "2026-05-31",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6271
    },
    {
      "date": "2026-05-31",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7827
    },
    {
      "date": "2026-06-01",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12301
    },
    {
      "date": "2026-06-01",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14653
    },
    {
      "date": "2026-06-01",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8649
    },
    {
      "date": "2026-06-01",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10609
    },
    {
      "date": "2026-06-01",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5271
    },
    {
      "date": "2026-06-01",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6489
    },
    {
      "date": "2026-06-02",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11441
    },
    {
      "date": "2026-06-02",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14370
    },
    {
      "date": "2026-06-02",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7390
    },
    {
      "date": "2026-06-02",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9169
    },
    {
      "date": "2026-06-02",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6359
    },
    {
      "date": "2026-06-02",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7883
    },
    {
      "date": "2026-06-03",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12982
    },
    {
      "date": "2026-06-03",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16965
    },
    {
      "date": "2026-06-03",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7531
    },
    {
      "date": "2026-06-03",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9159
    },
    {
      "date": "2026-06-03",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5477
    },
    {
      "date": "2026-06-03",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6739
    },
    {
      "date": "2026-06-04",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13231
    },
    {
      "date": "2026-06-04",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16836
    },
    {
      "date": "2026-06-04",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9661
    },
    {
      "date": "2026-06-04",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16366
    },
    {
      "date": "2026-06-04",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5852
    },
    {
      "date": "2026-06-04",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6682
    },
    {
      "date": "2026-06-05",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15285
    },
    {
      "date": "2026-06-05",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16445
    },
    {
      "date": "2026-06-05",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8967
    },
    {
      "date": "2026-06-05",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11823
    },
    {
      "date": "2026-06-05",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6094
    },
    {
      "date": "2026-06-05",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7286
    },
    {
      "date": "2026-06-06",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14527
    },
    {
      "date": "2026-06-06",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16037
    },
    {
      "date": "2026-06-06",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9381
    },
    {
      "date": "2026-06-06",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12170
    },
    {
      "date": "2026-06-06",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6990
    },
    {
      "date": "2026-06-06",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7504
    },
    {
      "date": "2026-06-07",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13110
    },
    {
      "date": "2026-06-07",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16615
    },
    {
      "date": "2026-06-07",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9356
    },
    {
      "date": "2026-06-07",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11288
    },
    {
      "date": "2026-06-07",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6387
    },
    {
      "date": "2026-06-07",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8639
    },
    {
      "date": "2026-06-08",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12186
    },
    {
      "date": "2026-06-08",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14879
    },
    {
      "date": "2026-06-08",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8631
    },
    {
      "date": "2026-06-08",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10447
    },
    {
      "date": "2026-06-08",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5770
    },
    {
      "date": "2026-06-08",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7396
    },
    {
      "date": "2026-06-09",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11641
    },
    {
      "date": "2026-06-09",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16145
    },
    {
      "date": "2026-06-09",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8754
    },
    {
      "date": "2026-06-09",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10765
    },
    {
      "date": "2026-06-09",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5592
    },
    {
      "date": "2026-06-09",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7192
    },
    {
      "date": "2026-06-10",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13262
    },
    {
      "date": "2026-06-10",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15354
    },
    {
      "date": "2026-06-10",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7378
    },
    {
      "date": "2026-06-10",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9195
    },
    {
      "date": "2026-06-10",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5797
    },
    {
      "date": "2026-06-10",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7021
    },
    {
      "date": "2026-06-11",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12094
    },
    {
      "date": "2026-06-11",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13679
    },
    {
      "date": "2026-06-11",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7963
    },
    {
      "date": "2026-06-11",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15690
    },
    {
      "date": "2026-06-11",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5822
    },
    {
      "date": "2026-06-11",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7067
    },
    {
      "date": "2026-06-12",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10776
    },
    {
      "date": "2026-06-12",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12941
    },
    {
      "date": "2026-06-12",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8402
    },
    {
      "date": "2026-06-12",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10244
    },
    {
      "date": "2026-06-12",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5788
    },
    {
      "date": "2026-06-12",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6339
    },
    {
      "date": "2026-06-13",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14203
    },
    {
      "date": "2026-06-13",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16434
    },
    {
      "date": "2026-06-13",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9043
    },
    {
      "date": "2026-06-13",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12166
    },
    {
      "date": "2026-06-13",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6548
    },
    {
      "date": "2026-06-13",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8698
    },
    {
      "date": "2026-06-14",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15896
    },
    {
      "date": "2026-06-14",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 19719
    },
    {
      "date": "2026-06-14",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9223
    },
    {
      "date": "2026-06-14",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11064
    },
    {
      "date": "2026-06-14",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5946
    },
    {
      "date": "2026-06-14",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7199
    },
    {
      "date": "2026-06-15",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12174
    },
    {
      "date": "2026-06-15",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15002
    },
    {
      "date": "2026-06-15",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7159
    },
    {
      "date": "2026-06-15",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9518
    },
    {
      "date": "2026-06-15",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5425
    },
    {
      "date": "2026-06-15",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6872
    },
    {
      "date": "2026-06-16",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12431
    },
    {
      "date": "2026-06-16",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15198
    },
    {
      "date": "2026-06-16",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8636
    },
    {
      "date": "2026-06-16",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8942
    },
    {
      "date": "2026-06-16",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4988
    },
    {
      "date": "2026-06-16",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 5919
    },
    {
      "date": "2026-06-17",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11641
    },
    {
      "date": "2026-06-17",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14193
    },
    {
      "date": "2026-06-17",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7580
    },
    {
      "date": "2026-06-17",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9650
    },
    {
      "date": "2026-06-17",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5369
    },
    {
      "date": "2026-06-17",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 5963
    },
    {
      "date": "2026-06-18",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12816
    },
    {
      "date": "2026-06-18",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14978
    },
    {
      "date": "2026-06-18",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8226
    },
    {
      "date": "2026-06-18",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14605
    },
    {
      "date": "2026-06-18",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5734
    },
    {
      "date": "2026-06-18",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7684
    },
    {
      "date": "2026-06-19",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12895
    },
    {
      "date": "2026-06-19",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15790
    },
    {
      "date": "2026-06-19",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7367
    },
    {
      "date": "2026-06-19",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8713
    },
    {
      "date": "2026-06-19",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5648
    },
    {
      "date": "2026-06-19",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6928
    },
    {
      "date": "2026-06-20",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 16716
    },
    {
      "date": "2026-06-20",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18651
    },
    {
      "date": "2026-06-20",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8479
    },
    {
      "date": "2026-06-20",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10752
    },
    {
      "date": "2026-06-20",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6634
    },
    {
      "date": "2026-06-20",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8138
    },
    {
      "date": "2026-06-21",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15673
    },
    {
      "date": "2026-06-21",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 20402
    },
    {
      "date": "2026-06-21",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8626
    },
    {
      "date": "2026-06-21",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11074
    },
    {
      "date": "2026-06-21",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6771
    },
    {
      "date": "2026-06-21",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8559
    },
    {
      "date": "2026-06-22",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12429
    },
    {
      "date": "2026-06-22",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14366
    },
    {
      "date": "2026-06-22",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8454
    },
    {
      "date": "2026-06-22",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10274
    },
    {
      "date": "2026-06-22",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6149
    },
    {
      "date": "2026-06-22",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7229
    },
    {
      "date": "2026-06-23",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11702
    },
    {
      "date": "2026-06-23",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15823
    },
    {
      "date": "2026-06-23",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8576
    },
    {
      "date": "2026-06-23",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10610
    },
    {
      "date": "2026-06-23",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5154
    },
    {
      "date": "2026-06-23",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6473
    },
    {
      "date": "2026-06-24",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13350
    },
    {
      "date": "2026-06-24",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17050
    },
    {
      "date": "2026-06-24",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8305
    },
    {
      "date": "2026-06-24",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9935
    },
    {
      "date": "2026-06-24",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5698
    },
    {
      "date": "2026-06-24",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7024
    },
    {
      "date": "2026-06-25",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11749
    },
    {
      "date": "2026-06-25",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15189
    },
    {
      "date": "2026-06-25",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7598
    },
    {
      "date": "2026-06-25",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15614
    },
    {
      "date": "2026-06-25",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5705
    },
    {
      "date": "2026-06-25",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7244
    },
    {
      "date": "2026-06-26",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13460
    },
    {
      "date": "2026-06-26",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15052
    },
    {
      "date": "2026-06-26",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7755
    },
    {
      "date": "2026-06-26",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9479
    },
    {
      "date": "2026-06-26",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5527
    },
    {
      "date": "2026-06-26",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7358
    },
    {
      "date": "2026-06-27",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15426
    },
    {
      "date": "2026-06-27",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 19388
    },
    {
      "date": "2026-06-27",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8907
    },
    {
      "date": "2026-06-27",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10501
    },
    {
      "date": "2026-06-27",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6906
    },
    {
      "date": "2026-06-27",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8965
    },
    {
      "date": "2026-06-28",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14060
    },
    {
      "date": "2026-06-28",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17140
    },
    {
      "date": "2026-06-28",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9033
    },
    {
      "date": "2026-06-28",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10452
    },
    {
      "date": "2026-06-28",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5907
    },
    {
      "date": "2026-06-28",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7328
    },
    {
      "date": "2026-06-29",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12289
    },
    {
      "date": "2026-06-29",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15013
    },
    {
      "date": "2026-06-29",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7668
    },
    {
      "date": "2026-06-29",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8805
    },
    {
      "date": "2026-06-29",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5386
    },
    {
      "date": "2026-06-29",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6222
    },
    {
      "date": "2026-06-30",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13867
    },
    {
      "date": "2026-06-30",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16889
    },
    {
      "date": "2026-06-30",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7828
    },
    {
      "date": "2026-06-30",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9998
    },
    {
      "date": "2026-06-30",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6112
    },
    {
      "date": "2026-06-30",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7240
    },
    {
      "date": "2026-07-01",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11864
    },
    {
      "date": "2026-07-01",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13934
    },
    {
      "date": "2026-07-01",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7261
    },
    {
      "date": "2026-07-01",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9515
    },
    {
      "date": "2026-07-01",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4597
    },
    {
      "date": "2026-07-01",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 5974
    },
    {
      "date": "2026-07-02",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11688
    },
    {
      "date": "2026-07-02",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15611
    },
    {
      "date": "2026-07-02",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7970
    },
    {
      "date": "2026-07-02",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14451
    },
    {
      "date": "2026-07-02",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4801
    },
    {
      "date": "2026-07-02",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6868
    },
    {
      "date": "2026-07-03",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12112
    },
    {
      "date": "2026-07-03",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15664
    },
    {
      "date": "2026-07-03",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6749
    },
    {
      "date": "2026-07-03",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8790
    },
    {
      "date": "2026-07-03",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5211
    },
    {
      "date": "2026-07-03",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6848
    },
    {
      "date": "2026-07-04",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11135
    },
    {
      "date": "2026-07-04",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15228
    },
    {
      "date": "2026-07-04",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10348
    },
    {
      "date": "2026-07-04",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11285
    },
    {
      "date": "2026-07-04",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5736
    },
    {
      "date": "2026-07-04",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7311
    },
    {
      "date": "2026-07-05",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13937
    },
    {
      "date": "2026-07-05",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15993
    },
    {
      "date": "2026-07-05",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8979
    },
    {
      "date": "2026-07-05",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11398
    },
    {
      "date": "2026-07-05",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7292
    },
    {
      "date": "2026-07-05",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8474
    },
    {
      "date": "2026-07-06",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12934
    },
    {
      "date": "2026-07-06",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15080
    },
    {
      "date": "2026-07-06",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6870
    },
    {
      "date": "2026-07-06",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8386
    },
    {
      "date": "2026-07-06",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5667
    },
    {
      "date": "2026-07-06",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6382
    },
    {
      "date": "2026-07-07",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11867
    },
    {
      "date": "2026-07-07",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14530
    },
    {
      "date": "2026-07-07",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8291
    },
    {
      "date": "2026-07-07",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9924
    },
    {
      "date": "2026-07-07",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5390
    },
    {
      "date": "2026-07-07",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6871
    },
    {
      "date": "2026-07-08",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10630
    },
    {
      "date": "2026-07-08",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13301
    },
    {
      "date": "2026-07-08",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6929
    },
    {
      "date": "2026-07-08",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8323
    },
    {
      "date": "2026-07-08",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5375
    },
    {
      "date": "2026-07-08",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6469
    },
    {
      "date": "2026-07-09",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10592
    },
    {
      "date": "2026-07-09",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12692
    },
    {
      "date": "2026-07-09",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8403
    },
    {
      "date": "2026-07-09",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16352
    },
    {
      "date": "2026-07-09",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4473
    },
    {
      "date": "2026-07-09",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 5569
    },
    {
      "date": "2026-07-10",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11306
    },
    {
      "date": "2026-07-10",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12686
    },
    {
      "date": "2026-07-10",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6517
    },
    {
      "date": "2026-07-10",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8281
    },
    {
      "date": "2026-07-10",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5463
    },
    {
      "date": "2026-07-10",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7159
    },
    {
      "date": "2026-07-11",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14701
    },
    {
      "date": "2026-07-11",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17260
    },
    {
      "date": "2026-07-11",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9377
    },
    {
      "date": "2026-07-11",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11302
    },
    {
      "date": "2026-07-11",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6368
    },
    {
      "date": "2026-07-11",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7974
    },
    {
      "date": "2026-07-12",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11384
    },
    {
      "date": "2026-07-12",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15211
    },
    {
      "date": "2026-07-12",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10157
    },
    {
      "date": "2026-07-12",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11813
    },
    {
      "date": "2026-07-12",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6055
    },
    {
      "date": "2026-07-12",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6958
    },
    {
      "date": "2026-07-13",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9980
    },
    {
      "date": "2026-07-13",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11798
    },
    {
      "date": "2026-07-13",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7436
    },
    {
      "date": "2026-07-13",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9220
    },
    {
      "date": "2026-07-13",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5350
    },
    {
      "date": "2026-07-13",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6254
    },
    {
      "date": "2026-07-14",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12212
    },
    {
      "date": "2026-07-14",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15584
    },
    {
      "date": "2026-07-14",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8518
    },
    {
      "date": "2026-07-14",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10538
    },
    {
      "date": "2026-07-14",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5637
    },
    {
      "date": "2026-07-14",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7210
    },
    {
      "date": "2026-07-15",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13310
    },
    {
      "date": "2026-07-15",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14993
    },
    {
      "date": "2026-07-15",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7788
    },
    {
      "date": "2026-07-15",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10281
    },
    {
      "date": "2026-07-15",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5346
    },
    {
      "date": "2026-07-15",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6543
    },
    {
      "date": "2026-07-16",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11522
    },
    {
      "date": "2026-07-16",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15673
    },
    {
      "date": "2026-07-16",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6759
    },
    {
      "date": "2026-07-16",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13425
    },
    {
      "date": "2026-07-16",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5458
    },
    {
      "date": "2026-07-16",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7013
    },
    {
      "date": "2026-07-17",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11168
    },
    {
      "date": "2026-07-17",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13947
    },
    {
      "date": "2026-07-17",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7311
    },
    {
      "date": "2026-07-17",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8788
    },
    {
      "date": "2026-07-17",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5978
    },
    {
      "date": "2026-07-17",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6934
    },
    {
      "date": "2026-07-18",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12632
    },
    {
      "date": "2026-07-18",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15903
    },
    {
      "date": "2026-07-18",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9565
    },
    {
      "date": "2026-07-18",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10278
    },
    {
      "date": "2026-07-18",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6220
    },
    {
      "date": "2026-07-18",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7636
    },
    {
      "date": "2026-07-19",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13130
    },
    {
      "date": "2026-07-19",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17016
    },
    {
      "date": "2026-07-19",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8842
    },
    {
      "date": "2026-07-19",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10367
    },
    {
      "date": "2026-07-19",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6090
    },
    {
      "date": "2026-07-19",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7701
    },
    {
      "date": "2026-07-20",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11594
    },
    {
      "date": "2026-07-20",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14634
    },
    {
      "date": "2026-07-20",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7149
    },
    {
      "date": "2026-07-20",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9855
    },
    {
      "date": "2026-07-20",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6162
    },
    {
      "date": "2026-07-20",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7324
    },
    {
      "date": "2026-07-21",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12737
    },
    {
      "date": "2026-07-21",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15656
    },
    {
      "date": "2026-07-21",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7922
    },
    {
      "date": "2026-07-21",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8915
    },
    {
      "date": "2026-07-21",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5443
    },
    {
      "date": "2026-07-21",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6476
    },
    {
      "date": "2026-07-22",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13619
    },
    {
      "date": "2026-07-22",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16771
    },
    {
      "date": "2026-07-22",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8075
    },
    {
      "date": "2026-07-22",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9879
    },
    {
      "date": "2026-07-22",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5178
    },
    {
      "date": "2026-07-22",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6953
    },
    {
      "date": "2026-07-23",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13946
    },
    {
      "date": "2026-07-23",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16652
    },
    {
      "date": "2026-07-23",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7382
    },
    {
      "date": "2026-07-23",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14550
    },
    {
      "date": "2026-07-23",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4902
    },
    {
      "date": "2026-07-23",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6119
    },
    {
      "date": "2026-07-24",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12483
    },
    {
      "date": "2026-07-24",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14679
    },
    {
      "date": "2026-07-24",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7223
    },
    {
      "date": "2026-07-24",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8658
    },
    {
      "date": "2026-07-24",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5917
    },
    {
      "date": "2026-07-24",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7162
    },
    {
      "date": "2026-07-25",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14173
    },
    {
      "date": "2026-07-25",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16002
    },
    {
      "date": "2026-07-25",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10008
    },
    {
      "date": "2026-07-25",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13059
    },
    {
      "date": "2026-07-25",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6349
    },
    {
      "date": "2026-07-25",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6489
    },
    {
      "date": "2026-07-26",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13648
    },
    {
      "date": "2026-07-26",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16011
    },
    {
      "date": "2026-07-26",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8738
    },
    {
      "date": "2026-07-26",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10025
    },
    {
      "date": "2026-07-26",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6450
    },
    {
      "date": "2026-07-26",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7237
    },
    {
      "date": "2026-07-27",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12042
    },
    {
      "date": "2026-07-27",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13666
    },
    {
      "date": "2026-07-27",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7470
    },
    {
      "date": "2026-07-27",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9646
    },
    {
      "date": "2026-07-27",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4989
    },
    {
      "date": "2026-07-27",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6124
    },
    {
      "date": "2026-07-28",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13181
    },
    {
      "date": "2026-07-28",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15205
    },
    {
      "date": "2026-07-28",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8149
    },
    {
      "date": "2026-07-28",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9669
    },
    {
      "date": "2026-07-28",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6047
    },
    {
      "date": "2026-07-28",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6974
    },
    {
      "date": "2026-07-29",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11453
    },
    {
      "date": "2026-07-29",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14053
    },
    {
      "date": "2026-07-29",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8369
    },
    {
      "date": "2026-07-29",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11282
    },
    {
      "date": "2026-07-29",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5335
    },
    {
      "date": "2026-07-29",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6145
    },
    {
      "date": "2026-07-30",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11597
    },
    {
      "date": "2026-07-30",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14928
    },
    {
      "date": "2026-07-30",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7167
    },
    {
      "date": "2026-07-30",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13769
    },
    {
      "date": "2026-07-30",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4678
    },
    {
      "date": "2026-07-30",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 5762
    },
    {
      "date": "2026-07-31",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11152
    },
    {
      "date": "2026-07-31",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12970
    },
    {
      "date": "2026-07-31",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9042
    },
    {
      "date": "2026-07-31",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10553
    },
    {
      "date": "2026-07-31",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4828
    },
    {
      "date": "2026-07-31",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6263
    },
    {
      "date": "2026-08-01",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14150
    },
    {
      "date": "2026-08-01",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 19079
    },
    {
      "date": "2026-08-01",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10204
    },
    {
      "date": "2026-08-01",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13126
    },
    {
      "date": "2026-08-01",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5305
    },
    {
      "date": "2026-08-01",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7052
    },
    {
      "date": "2026-08-02",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 16205
    },
    {
      "date": "2026-08-02",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17939
    },
    {
      "date": "2026-08-02",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8305
    },
    {
      "date": "2026-08-02",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10071
    },
    {
      "date": "2026-08-02",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6134
    },
    {
      "date": "2026-08-02",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8162
    },
    {
      "date": "2026-08-03",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13442
    },
    {
      "date": "2026-08-03",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15159
    },
    {
      "date": "2026-08-03",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7423
    },
    {
      "date": "2026-08-03",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8602
    },
    {
      "date": "2026-08-03",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5612
    },
    {
      "date": "2026-08-03",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6617
    },
    {
      "date": "2026-08-04",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12750
    },
    {
      "date": "2026-08-04",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15703
    },
    {
      "date": "2026-08-04",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9201
    },
    {
      "date": "2026-08-04",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10089
    },
    {
      "date": "2026-08-04",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5423
    },
    {
      "date": "2026-08-04",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6837
    },
    {
      "date": "2026-08-05",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12867
    },
    {
      "date": "2026-08-05",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16489
    },
    {
      "date": "2026-08-05",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7846
    },
    {
      "date": "2026-08-05",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9929
    },
    {
      "date": "2026-08-05",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5406
    },
    {
      "date": "2026-08-05",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6501
    },
    {
      "date": "2026-08-06",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12077
    },
    {
      "date": "2026-08-06",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16345
    },
    {
      "date": "2026-08-06",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7548
    },
    {
      "date": "2026-08-06",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17928
    },
    {
      "date": "2026-08-06",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5527
    },
    {
      "date": "2026-08-06",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6604
    },
    {
      "date": "2026-08-07",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11617
    },
    {
      "date": "2026-08-07",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15287
    },
    {
      "date": "2026-08-07",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7550
    },
    {
      "date": "2026-08-07",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9535
    },
    {
      "date": "2026-08-07",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5504
    },
    {
      "date": "2026-08-07",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6666
    },
    {
      "date": "2026-08-08",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14934
    },
    {
      "date": "2026-08-08",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 19322
    },
    {
      "date": "2026-08-08",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10242
    },
    {
      "date": "2026-08-08",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11948
    },
    {
      "date": "2026-08-08",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6154
    },
    {
      "date": "2026-08-08",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7316
    },
    {
      "date": "2026-08-09",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13334
    },
    {
      "date": "2026-08-09",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17761
    },
    {
      "date": "2026-08-09",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9121
    },
    {
      "date": "2026-08-09",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11475
    },
    {
      "date": "2026-08-09",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5724
    },
    {
      "date": "2026-08-09",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7359
    },
    {
      "date": "2026-08-10",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12408
    },
    {
      "date": "2026-08-10",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13814
    },
    {
      "date": "2026-08-10",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7138
    },
    {
      "date": "2026-08-10",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9122
    },
    {
      "date": "2026-08-10",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5656
    },
    {
      "date": "2026-08-10",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7862
    },
    {
      "date": "2026-08-11",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14415
    },
    {
      "date": "2026-08-11",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17073
    },
    {
      "date": "2026-08-11",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8145
    },
    {
      "date": "2026-08-11",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9263
    },
    {
      "date": "2026-08-11",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6246
    },
    {
      "date": "2026-08-11",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7480
    },
    {
      "date": "2026-08-12",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12312
    },
    {
      "date": "2026-08-12",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16692
    },
    {
      "date": "2026-08-12",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8548
    },
    {
      "date": "2026-08-12",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10197
    },
    {
      "date": "2026-08-12",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6088
    },
    {
      "date": "2026-08-12",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6931
    },
    {
      "date": "2026-08-13",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12241
    },
    {
      "date": "2026-08-13",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14790
    },
    {
      "date": "2026-08-13",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8045
    },
    {
      "date": "2026-08-13",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17807
    },
    {
      "date": "2026-08-13",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5596
    },
    {
      "date": "2026-08-13",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6730
    },
    {
      "date": "2026-08-14",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12495
    },
    {
      "date": "2026-08-14",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15006
    },
    {
      "date": "2026-08-14",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8386
    },
    {
      "date": "2026-08-14",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9700
    },
    {
      "date": "2026-08-14",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6025
    },
    {
      "date": "2026-08-14",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7093
    },
    {
      "date": "2026-08-15",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15043
    },
    {
      "date": "2026-08-15",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18774
    },
    {
      "date": "2026-08-15",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8561
    },
    {
      "date": "2026-08-15",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10758
    },
    {
      "date": "2026-08-15",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6532
    },
    {
      "date": "2026-08-15",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7934
    },
    {
      "date": "2026-08-16",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15429
    },
    {
      "date": "2026-08-16",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16200
    },
    {
      "date": "2026-08-16",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9183
    },
    {
      "date": "2026-08-16",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11240
    },
    {
      "date": "2026-08-16",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7151
    },
    {
      "date": "2026-08-16",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8490
    },
    {
      "date": "2026-08-17",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14336
    },
    {
      "date": "2026-08-17",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16033
    },
    {
      "date": "2026-08-17",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8943
    },
    {
      "date": "2026-08-17",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10745
    },
    {
      "date": "2026-08-17",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5277
    },
    {
      "date": "2026-08-17",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6434
    },
    {
      "date": "2026-08-18",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14969
    },
    {
      "date": "2026-08-18",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18278
    },
    {
      "date": "2026-08-18",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7304
    },
    {
      "date": "2026-08-18",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9227
    },
    {
      "date": "2026-08-18",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4902
    },
    {
      "date": "2026-08-18",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6312
    },
    {
      "date": "2026-08-19",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12496
    },
    {
      "date": "2026-08-19",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15278
    },
    {
      "date": "2026-08-19",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7448
    },
    {
      "date": "2026-08-19",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9360
    },
    {
      "date": "2026-08-19",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5671
    },
    {
      "date": "2026-08-19",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6709
    },
    {
      "date": "2026-08-20",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13625
    },
    {
      "date": "2026-08-20",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15859
    },
    {
      "date": "2026-08-20",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7578
    },
    {
      "date": "2026-08-20",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17346
    },
    {
      "date": "2026-08-20",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5544
    },
    {
      "date": "2026-08-20",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6947
    },
    {
      "date": "2026-08-21",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12314
    },
    {
      "date": "2026-08-21",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15108
    },
    {
      "date": "2026-08-21",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8664
    },
    {
      "date": "2026-08-21",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11598
    },
    {
      "date": "2026-08-21",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5911
    },
    {
      "date": "2026-08-21",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6995
    },
    {
      "date": "2026-08-22",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15507
    },
    {
      "date": "2026-08-22",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18198
    },
    {
      "date": "2026-08-22",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9198
    },
    {
      "date": "2026-08-22",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11375
    },
    {
      "date": "2026-08-22",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6899
    },
    {
      "date": "2026-08-22",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8701
    },
    {
      "date": "2026-08-23",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13220
    },
    {
      "date": "2026-08-23",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15669
    },
    {
      "date": "2026-08-23",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9517
    },
    {
      "date": "2026-08-23",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12422
    },
    {
      "date": "2026-08-23",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5838
    },
    {
      "date": "2026-08-23",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7755
    },
    {
      "date": "2026-08-24",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12721
    },
    {
      "date": "2026-08-24",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15328
    },
    {
      "date": "2026-08-24",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7879
    },
    {
      "date": "2026-08-24",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9382
    },
    {
      "date": "2026-08-24",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6008
    },
    {
      "date": "2026-08-24",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7298
    },
    {
      "date": "2026-08-25",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10026
    },
    {
      "date": "2026-08-25",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13472
    },
    {
      "date": "2026-08-25",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7517
    },
    {
      "date": "2026-08-25",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9371
    },
    {
      "date": "2026-08-25",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5330
    },
    {
      "date": "2026-08-25",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6878
    },
    {
      "date": "2026-08-26",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12268
    },
    {
      "date": "2026-08-26",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13979
    },
    {
      "date": "2026-08-26",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7605
    },
    {
      "date": "2026-08-26",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8678
    },
    {
      "date": "2026-08-26",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5639
    },
    {
      "date": "2026-08-26",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7368
    },
    {
      "date": "2026-08-27",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13640
    },
    {
      "date": "2026-08-27",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16963
    },
    {
      "date": "2026-08-27",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7744
    },
    {
      "date": "2026-08-27",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17465
    },
    {
      "date": "2026-08-27",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5208
    },
    {
      "date": "2026-08-27",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6957
    },
    {
      "date": "2026-08-28",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15373
    },
    {
      "date": "2026-08-28",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17468
    },
    {
      "date": "2026-08-28",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7563
    },
    {
      "date": "2026-08-28",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8969
    },
    {
      "date": "2026-08-28",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5838
    },
    {
      "date": "2026-08-28",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7322
    },
    {
      "date": "2026-08-29",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13785
    },
    {
      "date": "2026-08-29",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17421
    },
    {
      "date": "2026-08-29",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9222
    },
    {
      "date": "2026-08-29",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10447
    },
    {
      "date": "2026-08-29",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5846
    },
    {
      "date": "2026-08-29",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7691
    },
    {
      "date": "2026-08-30",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14155
    },
    {
      "date": "2026-08-30",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18638
    },
    {
      "date": "2026-08-30",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8777
    },
    {
      "date": "2026-08-30",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11083
    },
    {
      "date": "2026-08-30",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6354
    },
    {
      "date": "2026-08-30",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7955
    },
    {
      "date": "2026-08-31",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13702
    },
    {
      "date": "2026-08-31",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15331
    },
    {
      "date": "2026-08-31",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8400
    },
    {
      "date": "2026-08-31",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10946
    },
    {
      "date": "2026-08-31",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5939
    },
    {
      "date": "2026-08-31",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7048
    },
    {
      "date": "2026-09-01",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14208
    },
    {
      "date": "2026-09-01",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17792
    },
    {
      "date": "2026-09-01",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8220
    },
    {
      "date": "2026-09-01",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8925
    },
    {
      "date": "2026-09-01",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5658
    },
    {
      "date": "2026-09-01",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6962
    },
    {
      "date": "2026-09-02",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11644
    },
    {
      "date": "2026-09-02",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14999
    },
    {
      "date": "2026-09-02",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8449
    },
    {
      "date": "2026-09-02",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11490
    },
    {
      "date": "2026-09-02",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6042
    },
    {
      "date": "2026-09-02",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6172
    },
    {
      "date": "2026-09-03",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13374
    },
    {
      "date": "2026-09-03",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15502
    },
    {
      "date": "2026-09-03",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7968
    },
    {
      "date": "2026-09-03",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17575
    },
    {
      "date": "2026-09-03",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5491
    },
    {
      "date": "2026-09-03",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6506
    },
    {
      "date": "2026-09-04",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10954
    },
    {
      "date": "2026-09-04",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13207
    },
    {
      "date": "2026-09-04",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8754
    },
    {
      "date": "2026-09-04",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10229
    },
    {
      "date": "2026-09-04",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6129
    },
    {
      "date": "2026-09-04",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7238
    },
    {
      "date": "2026-09-05",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15237
    },
    {
      "date": "2026-09-05",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17794
    },
    {
      "date": "2026-09-05",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9519
    },
    {
      "date": "2026-09-05",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11347
    },
    {
      "date": "2026-09-05",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6332
    },
    {
      "date": "2026-09-05",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7741
    },
    {
      "date": "2026-09-06",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12540
    },
    {
      "date": "2026-09-06",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15344
    },
    {
      "date": "2026-09-06",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8250
    },
    {
      "date": "2026-09-06",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10515
    },
    {
      "date": "2026-09-06",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6386
    },
    {
      "date": "2026-09-06",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7944
    },
    {
      "date": "2026-09-07",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13462
    },
    {
      "date": "2026-09-07",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17171
    },
    {
      "date": "2026-09-07",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9190
    },
    {
      "date": "2026-09-07",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10863
    },
    {
      "date": "2026-09-07",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5599
    },
    {
      "date": "2026-09-07",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6892
    },
    {
      "date": "2026-09-08",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14193
    },
    {
      "date": "2026-09-08",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17426
    },
    {
      "date": "2026-09-08",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8396
    },
    {
      "date": "2026-09-08",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9697
    },
    {
      "date": "2026-09-08",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5240
    },
    {
      "date": "2026-09-08",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6248
    },
    {
      "date": "2026-09-09",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12839
    },
    {
      "date": "2026-09-09",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15976
    },
    {
      "date": "2026-09-09",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7678
    },
    {
      "date": "2026-09-09",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9227
    },
    {
      "date": "2026-09-09",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5472
    },
    {
      "date": "2026-09-09",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7606
    },
    {
      "date": "2026-09-10",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12416
    },
    {
      "date": "2026-09-10",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13868
    },
    {
      "date": "2026-09-10",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8232
    },
    {
      "date": "2026-09-10",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17395
    },
    {
      "date": "2026-09-10",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5456
    },
    {
      "date": "2026-09-10",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6854
    },
    {
      "date": "2026-09-11",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12926
    },
    {
      "date": "2026-09-11",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15304
    },
    {
      "date": "2026-09-11",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8356
    },
    {
      "date": "2026-09-11",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10342
    },
    {
      "date": "2026-09-11",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5184
    },
    {
      "date": "2026-09-11",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6522
    },
    {
      "date": "2026-09-12",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14096
    },
    {
      "date": "2026-09-12",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16922
    },
    {
      "date": "2026-09-12",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9340
    },
    {
      "date": "2026-09-12",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10907
    },
    {
      "date": "2026-09-12",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7767
    },
    {
      "date": "2026-09-12",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10001
    },
    {
      "date": "2026-09-13",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13556
    },
    {
      "date": "2026-09-13",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17541
    },
    {
      "date": "2026-09-13",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9672
    },
    {
      "date": "2026-09-13",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11205
    },
    {
      "date": "2026-09-13",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7053
    },
    {
      "date": "2026-09-13",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8164
    },
    {
      "date": "2026-09-14",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13897
    },
    {
      "date": "2026-09-14",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15746
    },
    {
      "date": "2026-09-14",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9011
    },
    {
      "date": "2026-09-14",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11057
    },
    {
      "date": "2026-09-14",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6488
    },
    {
      "date": "2026-09-14",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8977
    },
    {
      "date": "2026-09-15",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13643
    },
    {
      "date": "2026-09-15",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18027
    },
    {
      "date": "2026-09-15",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9056
    },
    {
      "date": "2026-09-15",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10980
    },
    {
      "date": "2026-09-15",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5884
    },
    {
      "date": "2026-09-15",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7888
    },
    {
      "date": "2026-09-16",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14637
    },
    {
      "date": "2026-09-16",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18405
    },
    {
      "date": "2026-09-16",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10293
    },
    {
      "date": "2026-09-16",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11538
    },
    {
      "date": "2026-09-16",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6660
    },
    {
      "date": "2026-09-16",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8456
    },
    {
      "date": "2026-09-17",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12731
    },
    {
      "date": "2026-09-17",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16883
    },
    {
      "date": "2026-09-17",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10948
    },
    {
      "date": "2026-09-17",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17732
    },
    {
      "date": "2026-09-17",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5830
    },
    {
      "date": "2026-09-17",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7487
    },
    {
      "date": "2026-09-18",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14626
    },
    {
      "date": "2026-09-18",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18224
    },
    {
      "date": "2026-09-18",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9128
    },
    {
      "date": "2026-09-18",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11365
    },
    {
      "date": "2026-09-18",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6387
    },
    {
      "date": "2026-09-18",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8314
    },
    {
      "date": "2026-09-19",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 16212
    },
    {
      "date": "2026-09-19",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 20066
    },
    {
      "date": "2026-09-19",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11294
    },
    {
      "date": "2026-09-19",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12981
    },
    {
      "date": "2026-09-19",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7154
    },
    {
      "date": "2026-09-19",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8658
    },
    {
      "date": "2026-09-20",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 16378
    },
    {
      "date": "2026-09-20",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 21709
    },
    {
      "date": "2026-09-20",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10381
    },
    {
      "date": "2026-09-20",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13379
    },
    {
      "date": "2026-09-20",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6423
    },
    {
      "date": "2026-09-20",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8280
    },
    {
      "date": "2026-09-21",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13143
    },
    {
      "date": "2026-09-21",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16498
    },
    {
      "date": "2026-09-21",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8917
    },
    {
      "date": "2026-09-21",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10825
    },
    {
      "date": "2026-09-21",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7451
    },
    {
      "date": "2026-09-21",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8305
    },
    {
      "date": "2026-09-22",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12156
    },
    {
      "date": "2026-09-22",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14885
    },
    {
      "date": "2026-09-22",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10698
    },
    {
      "date": "2026-09-22",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12466
    },
    {
      "date": "2026-09-22",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5524
    },
    {
      "date": "2026-09-22",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6531
    },
    {
      "date": "2026-09-23",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14730
    },
    {
      "date": "2026-09-23",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18089
    },
    {
      "date": "2026-09-23",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8814
    },
    {
      "date": "2026-09-23",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11034
    },
    {
      "date": "2026-09-23",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6683
    },
    {
      "date": "2026-09-23",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8580
    },
    {
      "date": "2026-09-24",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13152
    },
    {
      "date": "2026-09-24",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17945
    },
    {
      "date": "2026-09-24",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9783
    },
    {
      "date": "2026-09-24",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17694
    },
    {
      "date": "2026-09-24",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6681
    },
    {
      "date": "2026-09-24",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8172
    },
    {
      "date": "2026-09-25",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13172
    },
    {
      "date": "2026-09-25",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16538
    },
    {
      "date": "2026-09-25",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7893
    },
    {
      "date": "2026-09-25",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9746
    },
    {
      "date": "2026-09-25",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5753
    },
    {
      "date": "2026-09-25",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6877
    },
    {
      "date": "2026-09-26",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14624
    },
    {
      "date": "2026-09-26",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15872
    },
    {
      "date": "2026-09-26",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8312
    },
    {
      "date": "2026-09-26",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11117
    },
    {
      "date": "2026-09-26",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6728
    },
    {
      "date": "2026-09-26",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7943
    },
    {
      "date": "2026-09-27",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14149
    },
    {
      "date": "2026-09-27",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17825
    },
    {
      "date": "2026-09-27",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9981
    },
    {
      "date": "2026-09-27",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11750
    },
    {
      "date": "2026-09-27",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7105
    },
    {
      "date": "2026-09-27",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8696
    },
    {
      "date": "2026-09-28",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13639
    },
    {
      "date": "2026-09-28",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17421
    },
    {
      "date": "2026-09-28",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7820
    },
    {
      "date": "2026-09-28",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10616
    },
    {
      "date": "2026-09-28",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5614
    },
    {
      "date": "2026-09-28",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6738
    },
    {
      "date": "2026-09-29",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12711
    },
    {
      "date": "2026-09-29",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16475
    },
    {
      "date": "2026-09-29",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8300
    },
    {
      "date": "2026-09-29",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10045
    },
    {
      "date": "2026-09-29",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5607
    },
    {
      "date": "2026-09-29",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6911
    },
    {
      "date": "2026-09-30",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11553
    },
    {
      "date": "2026-09-30",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14684
    },
    {
      "date": "2026-09-30",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7109
    },
    {
      "date": "2026-09-30",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8967
    },
    {
      "date": "2026-09-30",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5261
    },
    {
      "date": "2026-09-30",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 5929
    },
    {
      "date": "2026-10-01",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13227
    },
    {
      "date": "2026-10-01",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14946
    },
    {
      "date": "2026-10-01",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8508
    },
    {
      "date": "2026-10-01",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17313
    },
    {
      "date": "2026-10-01",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5507
    },
    {
      "date": "2026-10-01",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6980
    },
    {
      "date": "2026-10-02",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11783
    },
    {
      "date": "2026-10-02",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14526
    },
    {
      "date": "2026-10-02",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7328
    },
    {
      "date": "2026-10-02",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9089
    },
    {
      "date": "2026-10-02",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5725
    },
    {
      "date": "2026-10-02",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6445
    },
    {
      "date": "2026-10-03",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13006
    },
    {
      "date": "2026-10-03",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15833
    },
    {
      "date": "2026-10-03",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8010
    },
    {
      "date": "2026-10-03",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10028
    },
    {
      "date": "2026-10-03",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6590
    },
    {
      "date": "2026-10-03",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8119
    },
    {
      "date": "2026-10-04",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15671
    },
    {
      "date": "2026-10-04",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18435
    },
    {
      "date": "2026-10-04",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8822
    },
    {
      "date": "2026-10-04",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11252
    },
    {
      "date": "2026-10-04",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6704
    },
    {
      "date": "2026-10-04",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7217
    },
    {
      "date": "2026-10-05",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12372
    },
    {
      "date": "2026-10-05",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14554
    },
    {
      "date": "2026-10-05",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8093
    },
    {
      "date": "2026-10-05",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10334
    },
    {
      "date": "2026-10-05",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4804
    },
    {
      "date": "2026-10-05",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6077
    },
    {
      "date": "2026-10-06",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11324
    },
    {
      "date": "2026-10-06",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14011
    },
    {
      "date": "2026-10-06",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8367
    },
    {
      "date": "2026-10-06",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10163
    },
    {
      "date": "2026-10-06",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5018
    },
    {
      "date": "2026-10-06",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6353
    },
    {
      "date": "2026-10-07",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11823
    },
    {
      "date": "2026-10-07",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14782
    },
    {
      "date": "2026-10-07",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8475
    },
    {
      "date": "2026-10-07",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10959
    },
    {
      "date": "2026-10-07",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4781
    },
    {
      "date": "2026-10-07",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6386
    },
    {
      "date": "2026-10-08",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11463
    },
    {
      "date": "2026-10-08",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13874
    },
    {
      "date": "2026-10-08",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8097
    },
    {
      "date": "2026-10-08",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17450
    },
    {
      "date": "2026-10-08",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5801
    },
    {
      "date": "2026-10-08",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6761
    },
    {
      "date": "2026-10-09",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12850
    },
    {
      "date": "2026-10-09",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14826
    },
    {
      "date": "2026-10-09",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8496
    },
    {
      "date": "2026-10-09",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9752
    },
    {
      "date": "2026-10-09",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4897
    },
    {
      "date": "2026-10-09",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6253
    },
    {
      "date": "2026-10-10",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13444
    },
    {
      "date": "2026-10-10",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17102
    },
    {
      "date": "2026-10-10",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9201
    },
    {
      "date": "2026-10-10",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11595
    },
    {
      "date": "2026-10-10",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7059
    },
    {
      "date": "2026-10-10",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8534
    },
    {
      "date": "2026-10-11",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12860
    },
    {
      "date": "2026-10-11",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16257
    },
    {
      "date": "2026-10-11",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9011
    },
    {
      "date": "2026-10-11",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10774
    },
    {
      "date": "2026-10-11",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6189
    },
    {
      "date": "2026-10-11",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7461
    },
    {
      "date": "2026-10-12",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12758
    },
    {
      "date": "2026-10-12",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14831
    },
    {
      "date": "2026-10-12",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7759
    },
    {
      "date": "2026-10-12",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9880
    },
    {
      "date": "2026-10-12",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6024
    },
    {
      "date": "2026-10-12",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6325
    },
    {
      "date": "2026-10-13",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 11721
    },
    {
      "date": "2026-10-13",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13917
    },
    {
      "date": "2026-10-13",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8995
    },
    {
      "date": "2026-10-13",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10420
    },
    {
      "date": "2026-10-13",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5817
    },
    {
      "date": "2026-10-13",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6387
    },
    {
      "date": "2026-10-14",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12814
    },
    {
      "date": "2026-10-14",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15997
    },
    {
      "date": "2026-10-14",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6727
    },
    {
      "date": "2026-10-14",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8942
    },
    {
      "date": "2026-10-14",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5294
    },
    {
      "date": "2026-10-14",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6550
    },
    {
      "date": "2026-10-15",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10955
    },
    {
      "date": "2026-10-15",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14068
    },
    {
      "date": "2026-10-15",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7444
    },
    {
      "date": "2026-10-15",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15127
    },
    {
      "date": "2026-10-15",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5230
    },
    {
      "date": "2026-10-15",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6410
    },
    {
      "date": "2026-10-16",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12240
    },
    {
      "date": "2026-10-16",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 15005
    },
    {
      "date": "2026-10-16",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7833
    },
    {
      "date": "2026-10-16",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9966
    },
    {
      "date": "2026-10-16",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5596
    },
    {
      "date": "2026-10-16",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7106
    },
    {
      "date": "2026-10-17",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14908
    },
    {
      "date": "2026-10-17",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 19224
    },
    {
      "date": "2026-10-17",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9649
    },
    {
      "date": "2026-10-17",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 12748
    },
    {
      "date": "2026-10-17",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6043
    },
    {
      "date": "2026-10-17",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8158
    },
    {
      "date": "2026-10-18",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13557
    },
    {
      "date": "2026-10-18",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17375
    },
    {
      "date": "2026-10-18",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9134
    },
    {
      "date": "2026-10-18",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11413
    },
    {
      "date": "2026-10-18",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6199
    },
    {
      "date": "2026-10-18",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8002
    },
    {
      "date": "2026-10-19",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12837
    },
    {
      "date": "2026-10-19",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16402
    },
    {
      "date": "2026-10-19",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8674
    },
    {
      "date": "2026-10-19",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9763
    },
    {
      "date": "2026-10-19",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 4940
    },
    {
      "date": "2026-10-19",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 6076
    },
    {
      "date": "2026-10-20",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 15340
    },
    {
      "date": "2026-10-20",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18516
    },
    {
      "date": "2026-10-20",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9093
    },
    {
      "date": "2026-10-20",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11620
    },
    {
      "date": "2026-10-20",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6249
    },
    {
      "date": "2026-10-20",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7529
    },
    {
      "date": "2026-10-21",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13467
    },
    {
      "date": "2026-10-21",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16908
    },
    {
      "date": "2026-10-21",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9113
    },
    {
      "date": "2026-10-21",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11073
    },
    {
      "date": "2026-10-21",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6105
    },
    {
      "date": "2026-10-21",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7630
    },
    {
      "date": "2026-10-22",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13624
    },
    {
      "date": "2026-10-22",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16732
    },
    {
      "date": "2026-10-22",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7927
    },
    {
      "date": "2026-10-22",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14044
    },
    {
      "date": "2026-10-22",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6128
    },
    {
      "date": "2026-10-22",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7595
    },
    {
      "date": "2026-10-23",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13589
    },
    {
      "date": "2026-10-23",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 18269
    },
    {
      "date": "2026-10-23",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9318
    },
    {
      "date": "2026-10-23",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10858
    },
    {
      "date": "2026-10-23",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6260
    },
    {
      "date": "2026-10-23",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7829
    },
    {
      "date": "2026-10-24",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14509
    },
    {
      "date": "2026-10-24",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 16981
    },
    {
      "date": "2026-10-24",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 9669
    },
    {
      "date": "2026-10-24",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 11203
    },
    {
      "date": "2026-10-24",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 7769
    },
    {
      "date": "2026-10-24",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10023
    },
    {
      "date": "2026-10-25",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 16526
    },
    {
      "date": "2026-10-25",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 20785
    },
    {
      "date": "2026-10-25",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 10067
    },
    {
      "date": "2026-10-25",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 13485
    },
    {
      "date": "2026-10-25",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6933
    },
    {
      "date": "2026-10-25",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8598
    },
    {
      "date": "2026-10-26",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14983
    },
    {
      "date": "2026-10-26",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 19014
    },
    {
      "date": "2026-10-26",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8238
    },
    {
      "date": "2026-10-26",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10249
    },
    {
      "date": "2026-10-26",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5683
    },
    {
      "date": "2026-10-26",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7161
    },
    {
      "date": "2026-10-27",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 12828
    },
    {
      "date": "2026-10-27",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14935
    },
    {
      "date": "2026-10-27",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8352
    },
    {
      "date": "2026-10-27",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 10745
    },
    {
      "date": "2026-10-27",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6745
    },
    {
      "date": "2026-10-27",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7937
    },
    {
      "date": "2026-10-28",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 14077
    },
    {
      "date": "2026-10-28",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17475
    },
    {
      "date": "2026-10-28",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8682
    },
    {
      "date": "2026-10-28",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 9357
    },
    {
      "date": "2026-10-28",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 5538
    },
    {
      "date": "2026-10-28",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 7377
    },
    {
      "date": "2026-10-29",
      "outletId": "DAD",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 13968
    },
    {
      "date": "2026-10-29",
      "outletId": "DAD",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 17278
    },
    {
      "date": "2026-10-29",
      "outletId": "MAT",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 8671
    },
    {
      "date": "2026-10-29",
      "outletId": "MAT",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 14470
    },
    {
      "date": "2026-10-29",
      "outletId": "SIO",
      "shift": "Morning",
      "status": "CLOSED",
      "collectedTotalInr": 6237
    },
    {
      "date": "2026-10-29",
      "outletId": "SIO",
      "shift": "Evening",
      "status": "CLOSED",
      "collectedTotalInr": 8233
    }
  ],
  "supplierSummary": [
    {
      "id": "SUP-01",
      "name": "Patel Traders",
      "accountLast4": "3307",
      "priorFyDebitCount": 49,
      "priorFyDebitTotal": 5008310,
      "derivedLimit": 5509141
    },
    {
      "id": "gupta",
      "name": "Gupta Distributors",
      "accountLast4": "7781",
      "priorFyDebitCount": 49,
      "priorFyDebitTotal": 5918310,
      "derivedLimit": 6510141
    },
    {
      "id": "SUP-03",
      "name": "Mehta Dry Fruits",
      "accountLast4": "5520",
      "priorFyDebitCount": 49,
      "priorFyDebitTotal": 1361060,
      "derivedLimit": 1497166
    },
    {
      "id": "SUP-04",
      "name": "Shree Ganesh Oil Mills",
      "accountLast4": "6194",
      "priorFyDebitCount": 48,
      "priorFyDebitTotal": 1843640,
      "derivedLimit": 2028004
    },
    {
      "id": "SUP-05",
      "name": "Kumar Agencies",
      "accountLast4": "2048",
      "priorFyDebitCount": 47,
      "priorFyDebitTotal": 1497770,
      "derivedLimit": 1647547
    },
    {
      "id": "SUP-06",
      "name": "Desai Packaging",
      "accountLast4": "8836",
      "priorFyDebitCount": 48,
      "priorFyDebitTotal": 772980,
      "derivedLimit": 850278
    }
  ],
  "aaDebits": [
    {
      "bankTxnId": "BNK000016",
      "supplier_id": "gupta",
      "amount": 116110,
      "date": "2025-05-01",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000032",
      "supplier_id": "SUP-06",
      "amount": 14240,
      "date": "2025-05-02",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000033",
      "supplier_id": "SUP-03",
      "amount": 27780,
      "date": "2025-05-02",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000072",
      "supplier_id": "SUP-01",
      "amount": 93030,
      "date": "2025-05-05",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000081",
      "supplier_id": "SUP-04",
      "amount": 38120,
      "date": "2025-05-06",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000101",
      "supplier_id": "SUP-05",
      "amount": 27350,
      "date": "2025-05-07",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000109",
      "supplier_id": "gupta",
      "amount": 107070,
      "date": "2025-05-08",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000124",
      "supplier_id": "SUP-03",
      "amount": 26050,
      "date": "2025-05-09",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000125",
      "supplier_id": "SUP-06",
      "amount": 17940,
      "date": "2025-05-09",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000164",
      "supplier_id": "SUP-01",
      "amount": 95160,
      "date": "2025-05-12",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000176",
      "supplier_id": "SUP-04",
      "amount": 40800,
      "date": "2025-05-13",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000194",
      "supplier_id": "SUP-05",
      "amount": 31140,
      "date": "2025-05-14",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000210",
      "supplier_id": "gupta",
      "amount": 87000,
      "date": "2025-05-15",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000225",
      "supplier_id": "SUP-06",
      "amount": 16250,
      "date": "2025-05-16",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000226",
      "supplier_id": "SUP-03",
      "amount": 26560,
      "date": "2025-05-16",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000262",
      "supplier_id": "SUP-01",
      "amount": 93840,
      "date": "2025-05-19",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000276",
      "supplier_id": "SUP-04",
      "amount": 50240,
      "date": "2025-05-20",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000296",
      "supplier_id": "SUP-05",
      "amount": 29070,
      "date": "2025-05-21",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000306",
      "supplier_id": "gupta",
      "amount": 99310,
      "date": "2025-05-22",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000321",
      "supplier_id": "SUP-06",
      "amount": 17210,
      "date": "2025-05-23",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000322",
      "supplier_id": "SUP-03",
      "amount": 32770,
      "date": "2025-05-23",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000359",
      "supplier_id": "SUP-01",
      "amount": 111140,
      "date": "2025-05-26",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000369",
      "supplier_id": "SUP-04",
      "amount": 37680,
      "date": "2025-05-27",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000384",
      "supplier_id": "SUP-05",
      "amount": 33110,
      "date": "2025-05-28",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000394",
      "supplier_id": "gupta",
      "amount": 108130,
      "date": "2025-05-29",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000408",
      "supplier_id": "SUP-06",
      "amount": 16020,
      "date": "2025-05-30",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000409",
      "supplier_id": "SUP-03",
      "amount": 24870,
      "date": "2025-05-30",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000453",
      "supplier_id": "SUP-01",
      "amount": 84030,
      "date": "2025-06-02",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000468",
      "supplier_id": "SUP-04",
      "amount": 40300,
      "date": "2025-06-03",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000481",
      "supplier_id": "SUP-05",
      "amount": 31070,
      "date": "2025-06-04",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000502",
      "supplier_id": "gupta",
      "amount": 128820,
      "date": "2025-06-05",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000514",
      "supplier_id": "SUP-03",
      "amount": 24230,
      "date": "2025-06-06",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000515",
      "supplier_id": "SUP-06",
      "amount": 14570,
      "date": "2025-06-06",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000563",
      "supplier_id": "SUP-01",
      "amount": 92540,
      "date": "2025-06-09",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000573",
      "supplier_id": "SUP-04",
      "amount": 32560,
      "date": "2025-06-10",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000588",
      "supplier_id": "SUP-05",
      "amount": 26720,
      "date": "2025-06-11",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000602",
      "supplier_id": "gupta",
      "amount": 89280,
      "date": "2025-06-12",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000614",
      "supplier_id": "SUP-03",
      "amount": 21990,
      "date": "2025-06-13",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000615",
      "supplier_id": "SUP-06",
      "amount": 15390,
      "date": "2025-06-13",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000657",
      "supplier_id": "SUP-01",
      "amount": 96880,
      "date": "2025-06-16",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000669",
      "supplier_id": "SUP-04",
      "amount": 32560,
      "date": "2025-06-17",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000685",
      "supplier_id": "SUP-05",
      "amount": 31350,
      "date": "2025-06-18",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000694",
      "supplier_id": "gupta",
      "amount": 130330,
      "date": "2025-06-19",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000711",
      "supplier_id": "SUP-06",
      "amount": 17770,
      "date": "2025-06-20",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000712",
      "supplier_id": "SUP-03",
      "amount": 24720,
      "date": "2025-06-20",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000749",
      "supplier_id": "SUP-01",
      "amount": 81360,
      "date": "2025-06-23",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000762",
      "supplier_id": "SUP-04",
      "amount": 38540,
      "date": "2025-06-24",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000781",
      "supplier_id": "SUP-05",
      "amount": 31510,
      "date": "2025-06-25",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000793",
      "supplier_id": "gupta",
      "amount": 112690,
      "date": "2025-06-26",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000807",
      "supplier_id": "SUP-06",
      "amount": 13510,
      "date": "2025-06-27",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000808",
      "supplier_id": "SUP-03",
      "amount": 23250,
      "date": "2025-06-27",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000849",
      "supplier_id": "SUP-01",
      "amount": 96100,
      "date": "2025-06-30",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000870",
      "supplier_id": "SUP-04",
      "amount": 35730,
      "date": "2025-07-01",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000884",
      "supplier_id": "SUP-05",
      "amount": 26260,
      "date": "2025-07-02",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000900",
      "supplier_id": "gupta",
      "amount": 112590,
      "date": "2025-07-03",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000920",
      "supplier_id": "SUP-06",
      "amount": 12500,
      "date": "2025-07-04",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000921",
      "supplier_id": "SUP-03",
      "amount": 20260,
      "date": "2025-07-04",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000969",
      "supplier_id": "SUP-01",
      "amount": 94230,
      "date": "2025-07-07",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000981",
      "supplier_id": "SUP-04",
      "amount": 34770,
      "date": "2025-07-08",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000988",
      "supplier_id": "SUP-05",
      "amount": 36980,
      "date": "2025-07-09",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK000998",
      "supplier_id": "gupta",
      "amount": 88110,
      "date": "2025-07-10",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001015",
      "supplier_id": "SUP-06",
      "amount": 14010,
      "date": "2025-07-11",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001016",
      "supplier_id": "SUP-03",
      "amount": 21040,
      "date": "2025-07-11",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001055",
      "supplier_id": "SUP-01",
      "amount": 98640,
      "date": "2025-07-14",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001070",
      "supplier_id": "SUP-04",
      "amount": 28010,
      "date": "2025-07-15",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001087",
      "supplier_id": "SUP-05",
      "amount": 28830,
      "date": "2025-07-16",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001099",
      "supplier_id": "gupta",
      "amount": 92300,
      "date": "2025-07-17",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001116",
      "supplier_id": "SUP-03",
      "amount": 28280,
      "date": "2025-07-18",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001117",
      "supplier_id": "SUP-06",
      "amount": 14940,
      "date": "2025-07-18",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001160",
      "supplier_id": "SUP-01",
      "amount": 91200,
      "date": "2025-07-21",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001170",
      "supplier_id": "SUP-04",
      "amount": 40940,
      "date": "2025-07-22",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001189",
      "supplier_id": "SUP-05",
      "amount": 31830,
      "date": "2025-07-23",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001199",
      "supplier_id": "gupta",
      "amount": 105390,
      "date": "2025-07-24",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001220",
      "supplier_id": "SUP-06",
      "amount": 15620,
      "date": "2025-07-25",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001221",
      "supplier_id": "SUP-03",
      "amount": 21000,
      "date": "2025-07-25",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001257",
      "supplier_id": "SUP-01",
      "amount": 80130,
      "date": "2025-07-28",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001270",
      "supplier_id": "SUP-04",
      "amount": 37510,
      "date": "2025-07-29",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001287",
      "supplier_id": "SUP-05",
      "amount": 27800,
      "date": "2025-07-30",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001294",
      "supplier_id": "gupta",
      "amount": 87480,
      "date": "2025-07-31",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001320",
      "supplier_id": "SUP-06",
      "amount": 16400,
      "date": "2025-08-01",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001321",
      "supplier_id": "SUP-03",
      "amount": 27170,
      "date": "2025-08-01",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001362",
      "supplier_id": "SUP-01",
      "amount": 106760,
      "date": "2025-08-04",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001378",
      "supplier_id": "SUP-04",
      "amount": 46730,
      "date": "2025-08-05",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001395",
      "supplier_id": "SUP-05",
      "amount": 30660,
      "date": "2025-08-06",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001408",
      "supplier_id": "gupta",
      "amount": 138910,
      "date": "2025-08-07",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001422",
      "supplier_id": "SUP-03",
      "amount": 30570,
      "date": "2025-08-08",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001423",
      "supplier_id": "SUP-06",
      "amount": 19400,
      "date": "2025-08-08",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001462",
      "supplier_id": "SUP-01",
      "amount": 90750,
      "date": "2025-08-11",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001475",
      "supplier_id": "SUP-04",
      "amount": 46110,
      "date": "2025-08-12",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001488",
      "supplier_id": "SUP-05",
      "amount": 34880,
      "date": "2025-08-13",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001504",
      "supplier_id": "gupta",
      "amount": 96180,
      "date": "2025-08-14",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001521",
      "supplier_id": "SUP-06",
      "amount": 20140,
      "date": "2025-08-15",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001522",
      "supplier_id": "SUP-03",
      "amount": 26130,
      "date": "2025-08-15",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001564",
      "supplier_id": "SUP-01",
      "amount": 104130,
      "date": "2025-08-18",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001575",
      "supplier_id": "SUP-04",
      "amount": 40710,
      "date": "2025-08-19",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001591",
      "supplier_id": "SUP-05",
      "amount": 36770,
      "date": "2025-08-20",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001605",
      "supplier_id": "gupta",
      "amount": 142670,
      "date": "2025-08-21",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001623",
      "supplier_id": "SUP-03",
      "amount": 30320,
      "date": "2025-08-22",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001624",
      "supplier_id": "SUP-06",
      "amount": 13980,
      "date": "2025-08-22",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001661",
      "supplier_id": "SUP-01",
      "amount": 88260,
      "date": "2025-08-25",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001674",
      "supplier_id": "SUP-04",
      "amount": 34760,
      "date": "2025-08-26",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001687",
      "supplier_id": "SUP-05",
      "amount": 35140,
      "date": "2025-08-27",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001703",
      "supplier_id": "gupta",
      "amount": 161670,
      "date": "2025-08-28",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001718",
      "supplier_id": "SUP-03",
      "amount": 26870,
      "date": "2025-08-29",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001719",
      "supplier_id": "SUP-06",
      "amount": 19060,
      "date": "2025-08-29",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001759",
      "supplier_id": "SUP-01",
      "amount": 112520,
      "date": "2025-09-01",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001772",
      "supplier_id": "SUP-04",
      "amount": 42900,
      "date": "2025-09-02",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001787",
      "supplier_id": "SUP-05",
      "amount": 29530,
      "date": "2025-09-03",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001802",
      "supplier_id": "gupta",
      "amount": 116310,
      "date": "2025-09-04",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001819",
      "supplier_id": "SUP-03",
      "amount": 23020,
      "date": "2025-09-05",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001820",
      "supplier_id": "SUP-06",
      "amount": 14760,
      "date": "2025-09-05",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001861",
      "supplier_id": "SUP-01",
      "amount": 111680,
      "date": "2025-09-08",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001877",
      "supplier_id": "SUP-04",
      "amount": 38870,
      "date": "2025-09-09",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001895",
      "supplier_id": "SUP-05",
      "amount": 38940,
      "date": "2025-09-10",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001907",
      "supplier_id": "gupta",
      "amount": 121250,
      "date": "2025-09-11",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001922",
      "supplier_id": "SUP-03",
      "amount": 27090,
      "date": "2025-09-12",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001923",
      "supplier_id": "SUP-06",
      "amount": 14610,
      "date": "2025-09-12",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001966",
      "supplier_id": "SUP-01",
      "amount": 105640,
      "date": "2025-09-15",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001982",
      "supplier_id": "SUP-04",
      "amount": 38320,
      "date": "2025-09-16",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK001994",
      "supplier_id": "SUP-05",
      "amount": 24750,
      "date": "2025-09-17",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002005",
      "supplier_id": "gupta",
      "amount": 135340,
      "date": "2025-09-18",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002023",
      "supplier_id": "SUP-06",
      "amount": 13770,
      "date": "2025-09-19",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002024",
      "supplier_id": "SUP-03",
      "amount": 29620,
      "date": "2025-09-19",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002066",
      "supplier_id": "SUP-01",
      "amount": 112020,
      "date": "2025-09-22",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002082",
      "supplier_id": "SUP-04",
      "amount": 34070,
      "date": "2025-09-23",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002098",
      "supplier_id": "SUP-05",
      "amount": 32650,
      "date": "2025-09-24",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002110",
      "supplier_id": "gupta",
      "amount": 118000,
      "date": "2025-09-25",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002123",
      "supplier_id": "SUP-06",
      "amount": 15990,
      "date": "2025-09-26",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002124",
      "supplier_id": "SUP-03",
      "amount": 24380,
      "date": "2025-09-26",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002166",
      "supplier_id": "SUP-01",
      "amount": 85030,
      "date": "2025-09-29",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002180",
      "supplier_id": "SUP-04",
      "amount": 40570,
      "date": "2025-09-30",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002202",
      "supplier_id": "SUP-05",
      "amount": 36100,
      "date": "2025-10-01",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002215",
      "supplier_id": "gupta",
      "amount": 147360,
      "date": "2025-10-02",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002230",
      "supplier_id": "SUP-03",
      "amount": 32410,
      "date": "2025-10-03",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002231",
      "supplier_id": "SUP-06",
      "amount": 21550,
      "date": "2025-10-03",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002266",
      "supplier_id": "SUP-01",
      "amount": 128000,
      "date": "2025-10-06",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002280",
      "supplier_id": "SUP-04",
      "amount": 41210,
      "date": "2025-10-07",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002296",
      "supplier_id": "SUP-05",
      "amount": 34350,
      "date": "2025-10-08",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002305",
      "supplier_id": "gupta",
      "amount": 134610,
      "date": "2025-10-09",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002320",
      "supplier_id": "SUP-06",
      "amount": 15590,
      "date": "2025-10-10",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002321",
      "supplier_id": "SUP-03",
      "amount": 25710,
      "date": "2025-10-10",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002365",
      "supplier_id": "SUP-01",
      "amount": 109360,
      "date": "2025-10-13",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002376",
      "supplier_id": "SUP-04",
      "amount": 47530,
      "date": "2025-10-14",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002393",
      "supplier_id": "SUP-05",
      "amount": 36670,
      "date": "2025-10-15",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002405",
      "supplier_id": "gupta",
      "amount": 165800,
      "date": "2025-10-16",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002407",
      "supplier_id": "SUP-01",
      "amount": 260000,
      "date": "2025-10-16",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002428",
      "supplier_id": "SUP-06",
      "amount": 20940,
      "date": "2025-10-17",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002429",
      "supplier_id": "SUP-03",
      "amount": 24830,
      "date": "2025-10-17",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002448",
      "supplier_id": "SUP-03",
      "amount": 140000,
      "date": "2025-10-18",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002477",
      "supplier_id": "SUP-01",
      "amount": 100360,
      "date": "2025-10-20",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002491",
      "supplier_id": "SUP-04",
      "amount": 38490,
      "date": "2025-10-21",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002508",
      "supplier_id": "SUP-05",
      "amount": 49130,
      "date": "2025-10-22",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002517",
      "supplier_id": "gupta",
      "amount": 158810,
      "date": "2025-10-23",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002532",
      "supplier_id": "SUP-06",
      "amount": 19980,
      "date": "2025-10-24",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002533",
      "supplier_id": "SUP-03",
      "amount": 28670,
      "date": "2025-10-24",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002536",
      "supplier_id": "gupta",
      "amount": 480000,
      "date": "2025-10-24",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002576",
      "supplier_id": "SUP-01",
      "amount": 120890,
      "date": "2025-10-27",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002590",
      "supplier_id": "SUP-04",
      "amount": 49650,
      "date": "2025-10-28",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002608",
      "supplier_id": "SUP-05",
      "amount": 40100,
      "date": "2025-10-29",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002618",
      "supplier_id": "gupta",
      "amount": 140690,
      "date": "2025-10-30",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002635",
      "supplier_id": "SUP-03",
      "amount": 31330,
      "date": "2025-10-31",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002636",
      "supplier_id": "SUP-06",
      "amount": 18700,
      "date": "2025-10-31",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002679",
      "supplier_id": "SUP-01",
      "amount": 83730,
      "date": "2025-11-03",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002697",
      "supplier_id": "SUP-04",
      "amount": 41370,
      "date": "2025-11-04",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002716",
      "supplier_id": "SUP-05",
      "amount": 34080,
      "date": "2025-11-05",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002728",
      "supplier_id": "gupta",
      "amount": 110600,
      "date": "2025-11-06",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002746",
      "supplier_id": "SUP-06",
      "amount": 15510,
      "date": "2025-11-07",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002747",
      "supplier_id": "SUP-03",
      "amount": 25660,
      "date": "2025-11-07",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002784",
      "supplier_id": "SUP-01",
      "amount": 86690,
      "date": "2025-11-10",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002799",
      "supplier_id": "SUP-04",
      "amount": 39200,
      "date": "2025-11-11",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002818",
      "supplier_id": "SUP-05",
      "amount": 27860,
      "date": "2025-11-12",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002829",
      "supplier_id": "gupta",
      "amount": 110030,
      "date": "2025-11-13",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002844",
      "supplier_id": "SUP-03",
      "amount": 22580,
      "date": "2025-11-14",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002845",
      "supplier_id": "SUP-06",
      "amount": 14300,
      "date": "2025-11-14",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002883",
      "supplier_id": "SUP-01",
      "amount": 89630,
      "date": "2025-11-17",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002892",
      "supplier_id": "SUP-04",
      "amount": 27270,
      "date": "2025-11-18",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002909",
      "supplier_id": "SUP-05",
      "amount": 28490,
      "date": "2025-11-19",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002924",
      "supplier_id": "gupta",
      "amount": 103350,
      "date": "2025-11-20",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002942",
      "supplier_id": "SUP-03",
      "amount": 22240,
      "date": "2025-11-21",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002943",
      "supplier_id": "SUP-06",
      "amount": 15470,
      "date": "2025-11-21",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002985",
      "supplier_id": "SUP-01",
      "amount": 113060,
      "date": "2025-11-24",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK002994",
      "supplier_id": "SUP-04",
      "amount": 42490,
      "date": "2025-11-25",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003013",
      "supplier_id": "SUP-05",
      "amount": 29340,
      "date": "2025-11-26",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003022",
      "supplier_id": "gupta",
      "amount": 109780,
      "date": "2025-11-27",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003036",
      "supplier_id": "SUP-06",
      "amount": 17120,
      "date": "2025-11-28",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003037",
      "supplier_id": "SUP-03",
      "amount": 24400,
      "date": "2025-11-28",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003092",
      "supplier_id": "SUP-01",
      "amount": 93000,
      "date": "2025-12-01",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003105",
      "supplier_id": "SUP-04",
      "amount": 44820,
      "date": "2025-12-02",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003120",
      "supplier_id": "SUP-05",
      "amount": 26650,
      "date": "2025-12-03",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003129",
      "supplier_id": "gupta",
      "amount": 112510,
      "date": "2025-12-04",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003147",
      "supplier_id": "SUP-06",
      "amount": 16100,
      "date": "2025-12-05",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003148",
      "supplier_id": "SUP-03",
      "amount": 26340,
      "date": "2025-12-05",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003184",
      "supplier_id": "SUP-01",
      "amount": 105250,
      "date": "2025-12-08",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003200",
      "supplier_id": "SUP-04",
      "amount": 37580,
      "date": "2025-12-09",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003216",
      "supplier_id": "SUP-05",
      "amount": 30070,
      "date": "2025-12-10",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003229",
      "supplier_id": "gupta",
      "amount": 110370,
      "date": "2025-12-11",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003248",
      "supplier_id": "SUP-03",
      "amount": 26840,
      "date": "2025-12-12",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003249",
      "supplier_id": "SUP-06",
      "amount": 18340,
      "date": "2025-12-12",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003286",
      "supplier_id": "SUP-01",
      "amount": 100660,
      "date": "2025-12-15",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003295",
      "supplier_id": "SUP-04",
      "amount": 35040,
      "date": "2025-12-16",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003315",
      "supplier_id": "SUP-05",
      "amount": 36700,
      "date": "2025-12-17",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003329",
      "supplier_id": "gupta",
      "amount": 103470,
      "date": "2025-12-18",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003343",
      "supplier_id": "SUP-06",
      "amount": 14220,
      "date": "2025-12-19",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003344",
      "supplier_id": "SUP-03",
      "amount": 21980,
      "date": "2025-12-19",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003378",
      "supplier_id": "SUP-01",
      "amount": 102710,
      "date": "2025-12-22",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003392",
      "supplier_id": "SUP-04",
      "amount": 39280,
      "date": "2025-12-23",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003412",
      "supplier_id": "SUP-05",
      "amount": 30510,
      "date": "2025-12-24",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003423",
      "supplier_id": "gupta",
      "amount": 97600,
      "date": "2025-12-25",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003435",
      "supplier_id": "SUP-06",
      "amount": 18230,
      "date": "2025-12-26",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003436",
      "supplier_id": "SUP-03",
      "amount": 22300,
      "date": "2025-12-26",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003477",
      "supplier_id": "SUP-01",
      "amount": 100610,
      "date": "2025-12-29",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003492",
      "supplier_id": "SUP-04",
      "amount": 31570,
      "date": "2025-12-30",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003508",
      "supplier_id": "SUP-05",
      "amount": 29690,
      "date": "2025-12-31",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003528",
      "supplier_id": "gupta",
      "amount": 91200,
      "date": "2026-01-01",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003546",
      "supplier_id": "SUP-03",
      "amount": 20690,
      "date": "2026-01-02",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003547",
      "supplier_id": "SUP-06",
      "amount": 14150,
      "date": "2026-01-02",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003585",
      "supplier_id": "SUP-01",
      "amount": 88140,
      "date": "2026-01-05",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003598",
      "supplier_id": "SUP-04",
      "amount": 41080,
      "date": "2026-01-06",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003615",
      "supplier_id": "SUP-05",
      "amount": 30670,
      "date": "2026-01-07",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003629",
      "supplier_id": "gupta",
      "amount": 99940,
      "date": "2026-01-08",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003646",
      "supplier_id": "SUP-03",
      "amount": 26610,
      "date": "2026-01-09",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003647",
      "supplier_id": "SUP-06",
      "amount": 15800,
      "date": "2026-01-09",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003689",
      "supplier_id": "SUP-01",
      "amount": 97490,
      "date": "2026-01-12",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003699",
      "supplier_id": "SUP-04",
      "amount": 32580,
      "date": "2026-01-13",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003715",
      "supplier_id": "SUP-05",
      "amount": 32120,
      "date": "2026-01-14",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003735",
      "supplier_id": "gupta",
      "amount": 128830,
      "date": "2026-01-15",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003755",
      "supplier_id": "SUP-06",
      "amount": 14950,
      "date": "2026-01-16",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003756",
      "supplier_id": "SUP-03",
      "amount": 24160,
      "date": "2026-01-16",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003789",
      "supplier_id": "SUP-01",
      "amount": 95820,
      "date": "2026-01-19",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003802",
      "supplier_id": "SUP-04",
      "amount": 35120,
      "date": "2026-01-20",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003815",
      "supplier_id": "SUP-05",
      "amount": 28130,
      "date": "2026-01-21",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003831",
      "supplier_id": "gupta",
      "amount": 82270,
      "date": "2026-01-22",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003848",
      "supplier_id": "SUP-03",
      "amount": 23790,
      "date": "2026-01-23",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003849",
      "supplier_id": "SUP-06",
      "amount": 15620,
      "date": "2026-01-23",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003888",
      "supplier_id": "SUP-01",
      "amount": 125510,
      "date": "2026-01-26",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003899",
      "supplier_id": "SUP-04",
      "amount": 34680,
      "date": "2026-01-27",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003914",
      "supplier_id": "SUP-05",
      "amount": 27140,
      "date": "2026-01-28",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003926",
      "supplier_id": "gupta",
      "amount": 103750,
      "date": "2026-01-29",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003943",
      "supplier_id": "SUP-03",
      "amount": 26310,
      "date": "2026-01-30",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003944",
      "supplier_id": "SUP-06",
      "amount": 14180,
      "date": "2026-01-30",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK003988",
      "supplier_id": "SUP-01",
      "amount": 90260,
      "date": "2026-02-02",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004002",
      "supplier_id": "SUP-04",
      "amount": 32070,
      "date": "2026-02-03",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004020",
      "supplier_id": "SUP-05",
      "amount": 30060,
      "date": "2026-02-04",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004033",
      "supplier_id": "gupta",
      "amount": 83160,
      "date": "2026-02-05",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004050",
      "supplier_id": "SUP-06",
      "amount": 16050,
      "date": "2026-02-06",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004051",
      "supplier_id": "SUP-03",
      "amount": 27890,
      "date": "2026-02-06",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004092",
      "supplier_id": "SUP-01",
      "amount": 86800,
      "date": "2026-02-09",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004108",
      "supplier_id": "SUP-04",
      "amount": 35340,
      "date": "2026-02-10",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004125",
      "supplier_id": "SUP-05",
      "amount": 29310,
      "date": "2026-02-11",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004137",
      "supplier_id": "gupta",
      "amount": 97350,
      "date": "2026-02-12",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004152",
      "supplier_id": "SUP-06",
      "amount": 12840,
      "date": "2026-02-13",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004153",
      "supplier_id": "SUP-03",
      "amount": 26420,
      "date": "2026-02-13",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004190",
      "supplier_id": "SUP-01",
      "amount": 86620,
      "date": "2026-02-16",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004200",
      "supplier_id": "SUP-04",
      "amount": 36430,
      "date": "2026-02-17",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004213",
      "supplier_id": "SUP-05",
      "amount": 26770,
      "date": "2026-02-18",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004226",
      "supplier_id": "gupta",
      "amount": 121530,
      "date": "2026-02-19",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004241",
      "supplier_id": "SUP-03",
      "amount": 20520,
      "date": "2026-02-20",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004242",
      "supplier_id": "SUP-06",
      "amount": 17410,
      "date": "2026-02-20",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004279",
      "supplier_id": "SUP-01",
      "amount": 82990,
      "date": "2026-02-23",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004290",
      "supplier_id": "SUP-04",
      "amount": 35710,
      "date": "2026-02-24",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004306",
      "supplier_id": "SUP-05",
      "amount": 29850,
      "date": "2026-02-25",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004320",
      "supplier_id": "gupta",
      "amount": 113150,
      "date": "2026-02-26",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004336",
      "supplier_id": "SUP-06",
      "amount": 15490,
      "date": "2026-02-27",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004337",
      "supplier_id": "SUP-03",
      "amount": 21460,
      "date": "2026-02-27",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004381",
      "supplier_id": "SUP-01",
      "amount": 106260,
      "date": "2026-03-02",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004397",
      "supplier_id": "SUP-04",
      "amount": 37170,
      "date": "2026-03-03",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004412",
      "supplier_id": "SUP-05",
      "amount": 29830,
      "date": "2026-03-04",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004428",
      "supplier_id": "gupta",
      "amount": 108850,
      "date": "2026-03-05",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004445",
      "supplier_id": "SUP-06",
      "amount": 14170,
      "date": "2026-03-06",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004446",
      "supplier_id": "SUP-03",
      "amount": 26260,
      "date": "2026-03-06",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004489",
      "supplier_id": "SUP-01",
      "amount": 98020,
      "date": "2026-03-09",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004499",
      "supplier_id": "SUP-04",
      "amount": 32630,
      "date": "2026-03-10",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004512",
      "supplier_id": "SUP-05",
      "amount": 37720,
      "date": "2026-03-11",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004528",
      "supplier_id": "gupta",
      "amount": 114180,
      "date": "2026-03-12",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004545",
      "supplier_id": "SUP-06",
      "amount": 13730,
      "date": "2026-03-13",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004546",
      "supplier_id": "SUP-03",
      "amount": 24790,
      "date": "2026-03-13",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004585",
      "supplier_id": "SUP-01",
      "amount": 107770,
      "date": "2026-03-16",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004596",
      "supplier_id": "SUP-04",
      "amount": 39900,
      "date": "2026-03-17",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004616",
      "supplier_id": "SUP-05",
      "amount": 39560,
      "date": "2026-03-18",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004622",
      "supplier_id": "gupta",
      "amount": 85190,
      "date": "2026-03-19",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004641",
      "supplier_id": "SUP-03",
      "amount": 24450,
      "date": "2026-03-20",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004642",
      "supplier_id": "SUP-06",
      "amount": 17740,
      "date": "2026-03-20",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004681",
      "supplier_id": "SUP-01",
      "amount": 106750,
      "date": "2026-03-23",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004693",
      "supplier_id": "SUP-04",
      "amount": 37590,
      "date": "2026-03-24",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004705",
      "supplier_id": "SUP-05",
      "amount": 30530,
      "date": "2026-03-25",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004721",
      "supplier_id": "gupta",
      "amount": 108990,
      "date": "2026-03-26",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004736",
      "supplier_id": "SUP-03",
      "amount": 24450,
      "date": "2026-03-27",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004737",
      "supplier_id": "SUP-06",
      "amount": 16720,
      "date": "2026-03-27",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004773",
      "supplier_id": "SUP-01",
      "amount": 116860,
      "date": "2026-03-30",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    },
    {
      "bankTxnId": "BNK004785",
      "supplier_id": "SUP-04",
      "amount": 47040,
      "date": "2026-03-31",
      "source": "AA",
      "direction": "debit",
      "verified": true,
      "verificationKind": "synthetic_generator_label"
    }
  ],
  "invoice": {
    "number": "GD-1182",
    "supplierName": "Gupta Distributors",
    "amount": 520000,
    "dueDate": "2026-11-04",
    "accountLast4": "7781",
    "description": "FMCG Diwali stock, 212 lines",
    "hasFullBody": false,
    "integrity": "Metadata and short description only; original 212-line invoice body was not supplied.",
    "variants": [
      {
        "scenario": "changed_account",
        "supplierName": "Gupta Traders & Logistics",
        "accountLast4": "3390"
      }
    ]
  }
};
