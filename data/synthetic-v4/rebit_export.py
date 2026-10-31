"""Export the bank statement as a ReBIT Account Aggregator FI document, Deposit schema v2.0.0
(https://specifications.rebit.org.in/api_schema/account_aggregator/documentation/deposit_v2.0.0.html).
Writes rebit/deposit_v2.0.0.xml (namespace http://api.rebit.org.in/FISchema/deposit) and the same structure as JSON.
All values synthetic."""
import csv, json, os, re, sys
from xml.sax.saxutils import quoteattr

OUT = sys.argv[1] if len(sys.argv) > 1 else "out"
os.makedirs(f"{OUT}/rebit", exist_ok=True)
rows = list(csv.DictReader(open(f"{OUT}/csv/bank_statement.csv", encoding="utf-8")))
MODES = {"CASH", "UPI", "IMPS", "NEFT", "RTGS", "CARD", "ATM", "CHEQUE", "DEMAND_DRAFT", "AUTO_DEBIT", "INTEREST_CREDIT",
         "NACH", "ECS", "REMITTANCE", "OTHERS"}
acct = dict(linkedAccRef="SYN-LINK-7f3a9c21-SGS-CA", maskedAccNumber="XXXXXXXX4029", type="deposit", version="2.0.0")
holder = dict(name="SHARMA GENERAL STORES (PROP. RAKESH SHARMA)", dob="1979-03-14", mobile="9000000042",
              ckycRegistered="YES", nominee="REGISTERED", address="Shop 4, Dadar (W), Mumbai 400028",
              email="sharma.stores@example.com", pan="ABCPS1234F")
last = rows[-1]
summary = dict(currentBalance=last["transactionalBalance"], currency="INR", balanceDateTime="2026-10-29T23:59:59+05:30",
               accountType="REGULAR", accountSubType="CURRENT", branch="Dadar (W)", facility="NO_FACILITY_GRANTED",
               ifsc="DEMO0004029", micrCode="400999042", openingDate="2019-06-03", status="ACTIVE")
assert re.fullmatch(r"[A-Z]{4}0[A-Z0-9]{6}", summary["ifsc"])
txns = []
for r in rows:
    assert r["type"] in ("CREDIT", "DEBIT") and r["mode"] in MODES, (r["txnId"], r["mode"])
    txns.append(dict(type=r["type"], mode=r["mode"], amount=r["amount"], transactionalBalance=r["transactionalBalance"],
                     transactionTimestamp=r["transactionTimestamp"], valueDate=r["valueDate"] + "T00:00:00+05:30",
                     txnId=r["txnId"], narration=r["narration"], reference=r["reference"]))
period = dict(startDate=rows[0]["valueDate"], endDate=last["valueDate"])

def attrs(d): return " ".join(f"{k}={quoteattr(str(v))}" for k, v in d.items())
with open(f"{OUT}/rebit/deposit_v2.0.0.xml", "w", encoding="utf-8") as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write(f'<aa:Account xmlns:aa="http://api.rebit.org.in/FISchema/deposit" {attrs(acct)}>\n')
    f.write(f'  <aa:Profile>\n    <aa:Holders type="SINGLE">\n      <aa:Holder {attrs(holder)}/>\n    </aa:Holders>\n  </aa:Profile>\n')
    f.write(f'  <aa:Summary {attrs(summary)}/>\n')
    f.write(f'  <aa:Transactions {attrs(period)}>\n')
    for t in txns:
        f.write(f"    <aa:Transaction {attrs(t)}/>\n")
    f.write("  </aa:Transactions>\n</aa:Account>\n")
doc = {"Account": {**acct, "Profile": {"Holders": {"type": "SINGLE", "Holder": [holder]}}, "Summary": summary,
                   "Transactions": {**period, "Transaction": txns}}, "data_source": "synthetic"}
json.dump(doc, open(f"{OUT}/rebit/deposit_v2.0.0.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
# sanity: parse back
import xml.etree.ElementTree as ET
root = ET.parse(f"{OUT}/rebit/deposit_v2.0.0.xml").getroot()
ns = {"aa": "http://api.rebit.org.in/FISchema/deposit"}
n = len(root.findall("aa:Transactions/aa:Transaction", ns))
print("rebit transactions", n, "balance", summary["currentBalance"], "period", period)
