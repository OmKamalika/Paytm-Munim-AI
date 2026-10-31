import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// This is our importer for the supplied synthetic CSVs. The supplied Python
// generators are preserved only as provenance; this script does not run them.
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = join(root, 'data', 'synthetic');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') { field += '"'; i += 1; }
      else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ',') { row.push(field); field = ''; }
    else if (char === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (char !== '\r') field += char;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  const headers = rows.shift();
  if (!headers || quoted) throw new Error('Malformed CSV');
  return rows.map((values) => Object.fromEntries(headers.map((key, i) => [key, values[i] ?? ''])));
}

async function csv(name) {
  const bytes = await readFile(join(sourceDir, name));
  return {
    rows: parseCsv(bytes.toString('utf8')),
    sha256: createHash('sha256').update(bytes).digest('hex'),
  };
}

const [bank, paytm, handovers, outlets, suppliers, invoices] = await Promise.all([
  'bank_statement.csv', 'paytm_transactions.csv', 'shift_handovers.csv',
  'outlets.csv', 'suppliers.csv', 'invoices.csv',
].map(csv));

const fyStart = '2025-04-01';
const fyEnd = '2026-03-31';
const monthsStart = '2025-10-01';
const monthsEnd = '2026-09-30';
const diwaliStart = '2025-10-15';
const diwaliEnd = '2025-10-21';
const referenceStart = '2025-09-08';
const referenceEnd = '2025-10-05';
const sum = (rows, key) => rows.reduce((total, row) => total + Number(row[key]), 0);
const inRange = (value, start, end) => value >= start && value <= end;

const supplierRows = bank.rows.filter((row) => row.type === 'DEBIT' &&
  row.label_category === 'supplier_payment' &&
  inRange(row.transactionTimestamp.slice(0, 10), fyStart, fyEnd));
const debitRows = supplierRows.flatMap((row) => {
  const supplier = suppliers.rows.find((item) => item.name === row.label_payee && item.approved === 'True');
  return supplier ? [{
    bankTxnId: row.txnId,
    supplier_id: supplier.supplier_id === 'SUP-02' ? 'gupta' : supplier.supplier_id,
    amount: Number(row.amount),
    date: row.transactionTimestamp.slice(0, 10),
    source: 'AA',
    direction: 'debit',
    verified: true,
    verificationKind: 'synthetic_generator_label',
  }] : [];
});

const supplierSummary = suppliers.rows.filter((row) => row.approved === 'True').map((supplier) => {
  const sameSupplier = supplierRows.filter((row) => row.label_payee === supplier.name);
  const priorFyDebitTotal = sum(sameSupplier, 'amount');
  return {
    id: supplier.supplier_id === 'SUP-02' ? 'gupta' : supplier.supplier_id,
    name: supplier.name,
    accountLast4: supplier.verified_account_last4,
    priorFyDebitCount: sameSupplier.length,
    priorFyDebitTotal,
    derivedLimit: Math.floor(priorFyDebitTotal * 1.10),
  };
});

const outletMetrics = outlets.rows.map((outlet) => {
  const outletHandover = handovers.rows.filter((row) => row.outlet_id === outlet.outlet_id);
  const yearHandover = outletHandover.filter((row) => inRange(row.date, monthsStart, monthsEnd));
  const diwali = outletHandover.filter((row) => inRange(row.date, diwaliStart, diwaliEnd));
  const reference = outletHandover.filter((row) => inRange(row.date, referenceStart, referenceEnd));
  const outletPaytm = paytm.rows.filter((row) => row.outlet_id === outlet.outlet_id);
  const paytmYear = outletPaytm.filter((row) => inRange(row.txn_date, monthsStart, monthsEnd));
  const paytmToday = outletPaytm.filter((row) => row.txn_date === '2026-10-30' && row.txn_timestamp.slice(11, 16) <= '12:40');
  return {
    id: outlet.outlet_id,
    name: outlet.name,
    monthlyTarget: Number(outlet.monthly_target_inr),
    averageMonthlyAllChannelCollections: Math.round(sum(yearHandover, 'collected_total_inr') / 12),
    averageMonthlyPaytmCollections: Math.round(sum(paytmYear, 'amount_inr') / 12),
    paytmToday: sum(paytmToday, 'amount_inr'),
    diwaliWeek2025Multiplier: Number((sum(diwali, 'collected_total_inr') /
      (sum(reference, 'collected_total_inr') / 4)).toFixed(2)),
  };
});

const primaryInvoice = invoices.rows.find((row) => row.invoice_no === 'GD-1182' && row.scenario === 'legit');
if (!primaryInvoice) throw new Error('GD-1182 primary invoice metadata is missing');

const source = {
  synthetic: true,
  asOf: '2026-10-30',
  provenance: {
    description: 'User supplied synthetic CSV fixture. Bank label_* fields are generator ground truth, not bank-attested beneficiary identity.',
    aaConsent: 'simulated; bank rows unlock only after aa_available simulator dispatch',
    rowCounts: {
      bankStatement: bank.rows.length, paytmTransactions: paytm.rows.length,
      shiftHandovers: handovers.rows.length, outlets: outlets.rows.length,
      suppliers: suppliers.rows.length, invoices: invoices.rows.length,
    },
    sha256: {
      bankStatement: bank.sha256, paytmTransactions: paytm.sha256,
      shiftHandovers: handovers.sha256, outlets: outlets.sha256,
      suppliers: suppliers.sha256, invoices: invoices.sha256,
    },
  },
  outletMetrics,
  handoverShifts: handovers.rows.map((row) => ({
    date: row.date,
    outletId: row.outlet_id,
    shift: row.shift,
    status: row.status,
    collectedTotalInr: Number(row.collected_total_inr),
  })),
  supplierSummary,
  aaDebits: debitRows,
  invoice: {
    number: primaryInvoice.invoice_no,
    supplierName: primaryInvoice.supplier_name,
    amount: Number(primaryInvoice.amount_inr),
    dueDate: primaryInvoice.due_date,
    accountLast4: primaryInvoice.pay_to_account_last4,
    description: primaryInvoice.description,
    hasFullBody: false,
    integrity: 'Metadata and short description only; original 212-line invoice body was not supplied.',
    variants: invoices.rows.filter((row) => row.invoice_no === primaryInvoice.invoice_no && row.scenario !== 'legit')
      .map((row) => ({ scenario: row.scenario, supplierName: row.supplier_name, accountLast4: row.pay_to_account_last4 })),
  },
};

const output = `// Generated from data/synthetic/*.csv by scripts/derive-synthetic-data.mjs.\n` +
  `// Do not edit this snapshot by hand; synthetic labels are not live AA attestations.\n` +
  `export const syntheticSource = ${JSON.stringify(source, null, 2)};\n`;
await writeFile(join(root, 'lib', 'synthetic-source.generated.js'), output, 'utf8');
process.stdout.write(`Generated synthetic snapshot: ${bank.rows.length} bank, ${paytm.rows.length} Paytm, ${handovers.rows.length} handover rows.\n`);
