"""GST data as fetched via Account Aggregator: ReBIT FI schema gstr1_3b v1.1.0
(https://specifications.rebit.org.in/api_schema/account_aggregator/documentation/gstr1_3b_v1.1.0.html).

Profile/BusinessDetails/PlaceofBusiness, GSTR-1 b2b_dtls/b2b/itm_det/itm and GSTR-3B sup_details (osup_det, osup_zero,
osup_nil_exmp, isup_rev, osup_nongst) follow the ReBIT documentation. The published page stops after osup_det, so the
remaining GSTR-3B blocks (sup_inter, eco_dtls, itc_elg, inward_sup, intr_ltfee, tx_pmt, pdcash_dtls) use GSTN GSTR-3B
field names, which the ReBIT schema mirrors. Check against the XSD before production.

Writes rebit/gstr1_3b_v1.1.0.xml + .json, csv/gstr1_b2b_invoices.csv, csv/gstr3b_returns.csv. Seed 777. Synthetic."""
import csv, json, os, pickle, sys
from datetime import date, timedelta
from decimal import Decimal, ROUND_HALF_UP
from xml.sax.saxutils import quoteattr
import numpy as np

OUT = sys.argv[1] if len(sys.argv) > 1 else "out"
rng = np.random.default_rng(777)
D = pickle.load(open(f"{OUT}/_data.pkl", "rb"))
def r2(x): return float(Decimal(str(x)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))
def ddmmyyyy(d): return d.strftime("%d-%m-%Y")

GSTIN = "27ABCDE1234F1Z5"
B2B_BUYERS = [("27AAICS9921L1ZQ", "Shree Caterers (fictional)"), ("27AAFCO4410M1Z8", "Orbit Office Canteen (fictional)"),
              ("27AABHM7703N1Z2", "Hotel Matunga Residency (fictional)"), ("27AACFD1086P1Z6", "Dadar Gymkhana Pantry (fictional)")]
RATES = [0.05, 0.12, 0.18]

filed = [g for g in D["gst"] if g["status"] == "FILED"]
b2b_rows, r3b_rows, g1_xml, g3_xml, g1_json, g3_json = [], [], [], [], [], []
for g in filed:
    y, m = map(int, g["period"].split("-"))
    ret_prd = f"{m:02d}{y}"
    # ---- GSTR-1 B2B (a kirana sells mostly B2C; only a handful of registered buyers)
    invs = []
    for k in range(int(rng.integers(3, 8))):
        buyer = B2B_BUYERS[int(rng.integers(0, len(B2B_BUYERS)))]
        idt = date(y, m, int(rng.integers(1, 28)))
        items = []
        for _ in range(int(rng.integers(1, 4))):
            rate = RATES[int(rng.integers(0, 3))]
            tx = r2(float(rng.integers(1500, 9000)))
            half = r2(tx * rate / 2)
            items.append(dict(txval=tx, iamt=0.0, camt=half, samt=half, csamt=0.0, rt=rate))
        val = r2(sum(i["txval"] + i["camt"] + i["samt"] for i in items))
        inum = f"SGS/{y % 100:02d}-{(y + 1) % 100 if m >= 4 else y % 100:02d}/B{m:02d}{k + 1:02d}"
        inv = dict(ctin=buyer[0], inum=inum, idt=ddmmyyyy(idt), val=val, pos="27", rchrg="N", inv_typ="R", diff_percent=0.0)
        invs.append((inv, items))
        for n, i in enumerate(items, 1):
            b2b_rows.append(dict(ret_prd=ret_prd, ctin=buyer[0], buyer_name=buyer[1], inum=inum, idt=idt.isoformat(), inv_val=val,
                                 pos="27", rchrg="N", inv_typ="R", item_no=n, rate=i["rt"], txval=i["txval"], iamt=0.0,
                                 camt=i["camt"], samt=i["samt"], csamt=0.0))
    g1 = dict(ret_prd=ret_prd, dof=ddmmyyyy(g["gstr1_filed"]), filingFrequency="MONTHLY", status="Filed")
    g1_xml.append((g1, invs))
    g1_json.append({**g1, "b2b_dtls": {"b2b": [{**inv, "itm_det": {"itm": [{k: v for k, v in i.items() if k != "rt"} for i in items]}}
                                               for inv, items in invs]}})
    # ---- GSTR-3B
    taxable = g["tv5"] + g["tv12"] + g["tv18"]
    camt = r2(g["out_tax"] / 2); samt = r2(g["out_tax"] - camt)
    itc_c = r2(g["itc"] / 2); itc_s = r2(g["itc"] - itc_c)
    cash_c = r2(camt - itc_c); cash_s = r2(samt - itc_s)
    intr_c = r2(g["interest"] / 2); intr_s = r2(g["interest"] - intr_c)
    fee_c = fee_s = r2(g["late_fee"] / 2)
    exempt_purch = int(round(g["tv0"] * 0.74))          # nil-rated staples bought (dal, rice, atta, salt)
    r3 = dict(
        sup_details=dict(osup_det=dict(txval=float(taxable), iamt=0.0, camt=camt, samt=samt, csamt=0.0),
                         osup_zero=dict(txval=0.0, iamt=0.0, csamt=0.0),
                         osup_nil_exmp=dict(txval=float(g["tv0"])),
                         isup_rev=dict(txval=0.0, iamt=0.0, camt=0.0, samt=0.0, csamt=0.0),
                         osup_nongst=dict(txval=0.0)),
        sup_inter=dict(unreg_details=[], comp_details=[], uin_details=[]),
        eco_dtls=dict(eco_sup=dict(txval=0.0, iamt=0.0, camt=0.0, samt=0.0, csamt=0.0), eco_reg_sup=dict(txval=0.0)),
        itc_elg=dict(itc_avl=[dict(ty=t, iamt=0.0, camt=(itc_c if t == "OTH" else 0.0), samt=(itc_s if t == "OTH" else 0.0), csamt=0.0)
                              for t in ("IMPG", "IMPS", "ISRC", "ISD", "OTH")],
                     itc_rev=[dict(ty=t, iamt=0.0, camt=0.0, samt=0.0, csamt=0.0) for t in ("RUL", "OTH")],
                     itc_net=dict(iamt=0.0, camt=itc_c, samt=itc_s, csamt=0.0),
                     itc_inelg=[dict(ty=t, iamt=0.0, camt=0.0, samt=0.0, csamt=0.0) for t in ("RUL", "OTH")]),
        inward_sup=dict(isup_details=[dict(ty="GST", inter=0.0, intra=float(exempt_purch)), dict(ty="NONGST", inter=0.0, intra=0.0)]),
        intr_ltfee=dict(intr_details=dict(iamt=0.0, camt=intr_c, samt=intr_s, csamt=0.0),
                        ltfee_details=dict(camt=fee_c, samt=fee_s)),
        tx_pmt=dict(tx_py=[dict(trancd=30002, trandate=ddmmyyyy(g["gstr3b_filed"]),
                                cgst=dict(tx=camt, intr=intr_c, fee=fee_c), sgst=dict(tx=samt, intr=intr_s, fee=fee_s),
                                igst=dict(tx=0.0, intr=0.0, fee=0.0), cess=dict(tx=0.0, intr=0.0, fee=0.0))],
                    pditc=dict(i_pdi=0.0, i_pdc=0.0, i_pds=0.0, c_pdi=0.0, c_pdc=itc_c, s_pdi=0.0, s_pds=itc_s, cs_pdcs=0.0)),
        pdcash_dtls=dict(pdcash=[dict(ipd=0.0, cpd=cash_c, spd=cash_s, cspd=0.0, i_intrpd=0.0, c_intrpd=intr_c, s_intrpd=intr_s,
                                      cs_intrpd=0.0, c_lfeepd=fee_c, s_lfeepd=fee_s)]))
    g3 = dict(ret_prd=ret_prd, dof=ddmmyyyy(g["gstr3b_filed"]), filingFrequency="MONTHLY", status="Filed")
    g3_xml.append((g3, r3)); g3_json.append({**g3, **r3})
    r3b_rows.append(dict(ret_prd=ret_prd, period=g["period"], dof=g["gstr3b_filed"].isoformat(), due=g["gstr3b_due"].isoformat(),
                         days_late=g["late_days"], osup_txval=taxable, osup_camt=camt, osup_samt=samt, nil_exempt_txval=g["tv0"],
                         itc_camt=itc_c, itc_samt=itc_s, cash_cgst=cash_c, cash_sgst=cash_s, interest=g["interest"],
                         late_fee=g["late_fee"], exempt_inward_intra=exempt_purch,
                         b2b_txval_gstr1=r2(sum(i["txval"] for _, items in invs for i in items))))

# ---------------------------------------------------------------- write
os.makedirs(f"{OUT}/rebit", exist_ok=True)
acct = dict(linkedAccRef="SYN-LINK-GST-91c4e2", maskedGstinNumber="27ABCDXXXXXX1Z5", type="gstr1_3b", version="1.1.0")
biz = dict(lgnm="RAKESH SHARMA", trdnm="SHARMA GENERAL STORES", apprvdt="03/06/2019", iscmp="N", dty="Regular", sts="Active")
addr = dict(bnm="Ganesh Niwas", bno="Shop 4", flno="Ground", st="Gokhale Road", loc="Dadar West", dst="Mumbai", stcd="Maharashtra",
            pncd="400028")
period = dict(strdt=ddmmyyyy(date(2025, 4, 1)), endt=ddmmyyyy(date(2026, 9, 30)))

def A(d): return " ".join(f"{k}={quoteattr(str(v))}" for k, v in d.items())
def el(name, d, ind):
    """emit an element: dict values that are dicts/lists become children, scalars become attributes"""
    sc = {k: v for k, v in d.items() if not isinstance(v, (dict, list))}
    ch = {k: v for k, v in d.items() if isinstance(v, (dict, list))}
    if not ch:
        return f'{ind}<aa:{name}{" " + A(sc) if sc else ""}/>\n'
    s = f'{ind}<aa:{name}{" " + A(sc) if sc else ""}>\n'
    for k, v in ch.items():
        for x in (v if isinstance(v, list) else [v]):
            s += el(k, x, ind + "  ")
    return s + f"{ind}</aa:{name}>\n"

with open(f"{OUT}/rebit/gstr1_3b_v1.1.0.xml", "w", encoding="utf-8") as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write(f'<aa:Account xmlns:aa="http://api.rebit.org.in/FISchema/gstr1_3b" {A(acct)}>\n')
    f.write(f'  <aa:Profile>\n    <aa:BusinessDetails {A(biz)}>\n      <aa:CategoryList>\n        <aa:cat>Retail Business</aa:cat>\n'
            f'        <aa:cat>Wholesale Business</aa:cat>\n      </aa:CategoryList>\n    </aa:BusinessDetails>\n')
    f.write(f'    <aa:PlaceofBusiness>\n      <aa:Address {A(addr)}>\n        <aa:NatureOfBusinessList>\n'
            f'          <aa:ntr>RETAIL_BUSINESS</aa:ntr>\n          <aa:ntr>WAREHOUSE_OR_DEPOT</aa:ntr>\n'
            f'        </aa:NatureOfBusinessList>\n      </aa:Address>\n    </aa:PlaceofBusiness>\n  </aa:Profile>\n')
    f.write(f'  <aa:Transactions {A(period)}>\n    <aa:Gstr1Details>\n')
    for g1, invs in g1_xml:
        f.write(f'      <aa:gstr1 {A(g1)}>\n        <aa:b2b_dtls>\n')
        for inv, items in invs:
            f.write(f'          <aa:b2b {A(inv)}>\n            <aa:itm_det>\n')
            for i in items:
                f.write(f'              <aa:itm {A({k: v for k, v in i.items() if k != "rt"})}/>\n')
            f.write('            </aa:itm_det>\n          </aa:b2b>\n')
        f.write('        </aa:b2b_dtls>\n      </aa:gstr1>\n')
    f.write('    </aa:Gstr1Details>\n    <aa:Gstr3bDetails>\n')
    for g3, r3 in g3_xml:
        f.write(el("gstr3b", {**g3, **r3}, "      "))
    f.write('    </aa:Gstr3bDetails>\n  </aa:Transactions>\n</aa:Account>\n')
doc = {"Account": {**acct, "Profile": {"BusinessDetails": {**biz, "CategoryList": {"cat": ["Retail Business", "Wholesale Business"]}},
                                       "PlaceofBusiness": {"Address": {**addr, "NatureOfBusinessList": {"ntr": ["RETAIL_BUSINESS", "WAREHOUSE_OR_DEPOT"]}}}},
                   "Transactions": {**period, "Gstr1Details": {"gstr1": g1_json}, "Gstr3bDetails": {"gstr3b": g3_json}}},
       "data_source": "synthetic",
       "schema_note": "gstr3b blocks after sup_details use GSTN GSTR-3B field names (ReBIT doc page truncated); verify against XSD"}
json.dump(doc, open(f"{OUT}/rebit/gstr1_3b_v1.1.0.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)

def wcsv(name, rows):
    with open(f"{OUT}/csv/{name}.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0])); w.writeheader(); w.writerows(rows)
wcsv("gstr1_b2b_invoices", b2b_rows); wcsv("gstr3b_returns", r3b_rows)
D["GSTR1_B2B"], D["GSTR3B"] = b2b_rows, r3b_rows
pickle.dump(D, open(f"{OUT}/_data.pkl", "wb"))
import xml.etree.ElementTree as ET
root = ET.parse(f"{OUT}/rebit/gstr1_3b_v1.1.0.xml").getroot()
ns = {"aa": "http://api.rebit.org.in/FISchema/gstr1_3b"}
print("gstr1", len(root.findall(".//aa:gstr1", ns)), "b2b", len(root.findall(".//aa:b2b", ns)), "gstr3b", len(root.findall(".//aa:gstr3b", ns)))
