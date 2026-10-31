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
