import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeInvoiceDocument, evaluateInvoiceEvidence, deriveAaHistory, deriveRecurringBills } from '../lib/v3-evidence.js';
import { validateXmlJsonMirror, deriveGstEvidence } from '../lib/v4-evidence.js';

// Our importer reads supplied files as evidence. It never runs the supplied Python generators.
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = join(root, 'data', 'synthetic-v4');
function parseCsv(text) {
  const rows = []; let row = []; let field = ''; let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === '"' && text[index + 1] === '"') { field += '"'; index += 1; }
      else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ',') { row.push(field); field = ''; }
    else if (char === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (char !== '\r') field += char;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  if (quoted) throw new Error('Unterminated CSV field');
  const headers = rows.shift();
  return rows.filter(values => values.some(Boolean)).map(values => Object.fromEntries(headers.map((key, index) => [key, values[index] ?? ''])));
}
async function csv(name) { return parseCsv(await readFile(join(sourceDir, 'csv', name), 'utf8')); }
async function walk(folder = '') {
  const entries = await readdir(join(sourceDir, folder), { withFileTypes: true });
  const paths = [];
  for (const entry of entries) {
    const path = join(folder, entry.name);
    if (entry.isDirectory()) paths.push(...await walk(path));
    else if (entry.isFile()) paths.push(path.replaceAll('\\', '/'));
  }
  return paths.sort();
}
const [supplierRows, billRows, paytmRows, handovers, gstRows, outletRows] = await Promise.all([
  csv('suppliers.csv'), csv('bill_uploads.csv'), csv('paytm_transactions.csv'), csv('shift_handovers.csv'), csv('gst_returns.csv'), csv('outlets.csv'),
]);
const suppliers = supplierRows.map(row => ({ id: row.supplier_id === 'SUP-02' ? 'gupta' : row.supplier_id,
  registryId: row.supplier_id, name: row.name, category: row.category,
  accountLast4: row.verified_account_last4, approved: row.approved === 'True', accountChangedOn: row.account_changed_on }));
const paths = await walk();
const files = await Promise.all(paths.map(async path => {
  const bytes = await readFile(join(sourceDir, path));
  return { path, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') };
}));
const document = JSON.parse(await readFile(join(sourceDir, 'rebit', 'deposit_v2.0.0.json'), 'utf8'));
const account = document.Account;
const gstDocument = JSON.parse(await readFile(join(sourceDir, 'rebit', 'gstr1_3b_v1.1.0.json'), 'utf8'));
const mirrorChecks = {
  deposit: validateXmlJsonMirror(await readFile(join(sourceDir, 'rebit', 'deposit_v2.0.0.xml'), 'utf8'), account, 'http://api.rebit.org.in/FISchema/deposit'),
  gst: validateXmlJsonMirror(await readFile(join(sourceDir, 'rebit', 'gstr1_3b_v1.1.0.xml'), 'utf8'), gstDocument.Account, 'http://api.rebit.org.in/FISchema/gstr1_3b'),
};
if (!mirrorChecks.deposit.ok || !mirrorChecks.gst.ok) throw new Error(`FI source mirrors do not agree: ${JSON.stringify(mirrorChecks)}`);
const gstEvidence = deriveGstEvidence(gstDocument);
if (!gstEvidence.gstHistorySummary.validatedStructure) throw new Error('GST source has invalid or duplicate filing evidence.');
// Whitelist actual FI fields. Test-label columns are deliberately not copied into runtime data.
const bankTransactions = account.Transactions.Transaction.map(row => ({
  txnId: String(row.txnId), type: String(row.type), mode: String(row.mode), amount: Number(row.amount),
  transactionalBalance: Number(row.transactionalBalance), transactionTimestamp: String(row.transactionTimestamp),
  valueDate: String(row.valueDate).slice(0, 10), narration: String(row.narration ?? ''), reference: String(row.reference ?? ''),
}));
const invoices = [];
for (const path of paths.filter(path => path.startsWith('invoices/') && path.endsWith('.json'))) {
  const raw = JSON.parse(await readFile(join(sourceDir, path), 'utf8'));
  invoices.push({ ...normalizeInvoiceDocument(raw, suppliers), sourcePath: path,
    sourceSha256: files.find(item => item.path === path).sha256 });
}
invoices.sort((left, right) => left.row.localeCompare(right.row));
for (const invoice of invoices) invoice.evidence = evaluateInvoiceEvidence(invoice, invoices, suppliers);
const aa = deriveAaHistory(bankTransactions, suppliers, { allowUniqueTransferFragments: true });
const firstDate = bankTransactions.map(row => row.valueDate).sort()[0];
const lastDate = bankTransactions.map(row => row.valueDate).sort().at(-1);
const completeFinancialYear = firstDate <= '2025-04-01' && lastDate >= '2026-03-31';
const coverage = { from: firstDate > '2025-04-01' ? firstDate : '2025-04-01', to: lastDate < '2026-03-31' ? lastDate : '2026-03-31', completeFinancialYear,
  missingPeriod: completeFinancialYear ? null : `Source coverage ${firstDate} to ${lastDate} does not cover all of FY 2025–26`,
  note: completeFinancialYear ? 'The supplied statement covers all dates in FY 2025–26; supplier attribution is still inferred from transfer narrations and the registry.' : 'The supplied statement does not cover a complete FY.' };
const supplierSummary = aa.supplierSummary.map(row => ({ ...row, coverage }));
const sum = (rows, key) => rows.reduce((total, row) => total + Number(row[key]), 0);
const inRange = (value, from, to) => value >= from && value <= to;
const outletMetrics = outletRows.map(outlet => {
  const history = handovers.filter(row => row.outlet_id === outlet.outlet_id);
  const yearly = history.filter(row => inRange(row.date, '2025-10-01', '2026-09-30'));
  const diwali = history.filter(row => inRange(row.date, '2025-10-15', '2025-10-21'));
  const reference = history.filter(row => inRange(row.date, '2025-09-08', '2025-10-05'));
  const outletPaytm = paytmRows.filter(row => row.outlet_id === outlet.outlet_id);
  return { id: outlet.outlet_id, name: outlet.name, monthlyTarget: Number(outlet.monthly_target_inr),
    averageMonthlyAllChannelCollections: Math.round(sum(yearly, 'collected_total_inr') / 12),
    averageMonthlyPaytmCollections: Math.round(sum(outletPaytm.filter(row => inRange(row.txn_date, '2025-10-01', '2026-09-30')), 'amount_inr') / 12),
    paytmToday: sum(outletPaytm.filter(row => row.txn_date === '2026-10-30' && row.txn_timestamp.slice(11, 16) <= '12:40'), 'amount_inr'),
    diwaliWeek2025Multiplier: Number((sum(diwali, 'collected_total_inr') / (sum(reference, 'collected_total_inr') / 4)).toFixed(2)) };
});
const acceptedPurchases = invoices.filter(row => row.evidence.status === 'PASS');
const productMap = new Map();
for (const invoice of acceptedPurchases) for (const line of invoice.lines) {
  const key = `${line.description}|${line.unit}`;
  if (!productMap.has(key)) productMap.set(key, { description: line.description, unit: line.unit, purchasedQuantityFromDocuments: 0, invoiceRows: [],
    sourceType: 'supplier_invoice_lines', stockOnHandObserved: false });
  const product = productMap.get(key);
  product.purchasedQuantityFromDocuments += line.quantity;
  if (!product.invoiceRows.includes(invoice.row)) product.invoiceRows.push(invoice.row);
}
const paymentTrails = acceptedPurchases.map(invoice => {
  const escaped = invoice.number.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const exactInvoice = new RegExp(`(?:^|[^A-Z0-9])${escaped}(?:$|[^A-Z0-9])`, 'i');
  const matches = bankTransactions.filter(row => row.type === 'DEBIT' && exactInvoice.test(row.narration));
  return { invoiceRow: invoice.row, invoiceNumber: invoice.number, suppliedPeriodThrough: account.Transactions.endDate,
    matchedPaymentInr: matches.reduce((total, row) => total + row.amount, 0), matchedTxnIds: matches.map(row => row.txnId),
    status: matches.length ? 'payment_reference_seen' : 'no_matching_payment_in_supplied_period',
    caveat: 'Absence of a matching narration does not prove that a bill is unpaid. Open-bill status comes from supplied bill uploads.' };
});
const source = {
  synthetic: true, version: 'v4', asOf: '2026-10-31',
  provenance: { description: 'User-supplied v4 synthetic invoice, CSV, Excel, Deposit FI and GST FI evidence; no test answer keys drive runtime decisions.',
    files, rowCounts: { bankTransactions: bankTransactions.length, paytmTransactions: paytmRows.length, shiftHandovers: handovers.length,
      suppliers: suppliers.length, invoiceDocuments: invoices.length, invoiceLines: invoices.reduce((total, row) => total + row.lines.length, 0), billUploads: billRows.length, gstReturns: gstRows.length, gstFiledPeriods: gstEvidence.gstReturnsFiled.length },
    aaDataRule: 'Narration and registry matching only; unknown or ambiguous payees stay unmatched. label_* is not imported.',
    fyCoverage: coverage, mirrorChecks,
  },
  bankAccount: { maskedAccount: account.maskedAccNumber, maskedAccNumber: account.maskedAccNumber, ifsc: account.Summary.ifsc, schemaVersion: account.version,
    statementFrom: account.Transactions.startDate, statementThrough: account.Transactions.endDate },
  ...gstEvidence,
  gstReturns: gstEvidence.gstReturnsFiled,
  outletMetrics,
  handoverShifts: handovers.map(row => ({ date: row.date, outletId: row.outlet_id, shift: row.shift, status: row.status, collectedTotalInr: Number(row.collected_total_inr) })),
  suppliers, invoices, bankTransactions, aaDebits: aa.matchedDebits, supplierSummary,
  aaAttribution: { matchedDebitCount: aa.matchedDebits.length, unmatchedDebitCount: aa.unmatchedDebitCount,
    highConfidenceMatchedCount: aa.matchedDebits.filter(row => row.confidence === 'high').length,
    mediumConfidenceMatchedCount: aa.matchedDebits.filter(row => row.confidence === 'medium').length,
    notAttributedToSupplierCount: aa.unmatchedDebitCount,
    note: 'Matching is a synthetic evidence inference, not beneficiary identity attested by the bank. Unattributed debits include legitimate payroll, rent and other non-supplier expenses, plus blank or ambiguous narrations.' },
  recurringBills: deriveRecurringBills(bankTransactions),
  billUploads: billRows.map(row => ({ id: row.upload_id, uploadedAt: row.uploaded_at, uploadedBy: row.uploaded_by,
    uploaderRole: row.uploader_role, channel: row.channel, mimeType: row.file_type, invoiceRow: row.linked_invoice_row || null,
    extraction: row.extraction, voiceTranscript: row.voice_transcript, extractionSummary: row.extraction_summary })),
  procurementEstimates: { stockOnHandObserved: false, salesUnitsObserved: false,
    description: 'Invoice quantities describe documented B2B purchases. Payment trails and negotiation terms can support procurement estimates, but do not measure stock on hand or end-customer SKU sales.',
    invoiceRowsIncluded: acceptedPurchases.map(row => row.row), products: [...productMap.values()], paymentTrails },
};
await writeFile(join(root, 'lib', 'v4-source.generated.js'),
  '// Generated by scripts/derive-v4-data.mjs from data/synthetic-v4. Do not edit by hand.\nexport const v4Source = ' + JSON.stringify(source) + ';\n', 'utf8');
console.log(`Generated v4: ${bankTransactions.length} label-free FI transactions, ${gstEvidence.gstReturnsFiled.length} filed GST periods, ${invoices.length} invoice documents, ${source.provenance.rowCounts.invoiceLines} lines, ${files.length} source hashes.`);
for (const invoice of invoices) console.log(`${invoice.row} ${invoice.number}: ${invoice.evidence.status}`);
console.log(`Gupta observed FY spend: ${supplierSummary.find(row => row.id === 'gupta').priorFyDebitTotal}; complete FY coverage ${completeFinancialYear}.`);
