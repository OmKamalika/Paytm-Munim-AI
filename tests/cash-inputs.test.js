import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { cashInputs } from '../lib/cash-inputs.js';
import { activeSource } from '../lib/active-source.js';

const root = new URL('../', import.meta.url);
function csv(path) {
  const [header, ...rows] = readFileSync(new URL(path, root), 'utf8').trim().split(/\r?\n/);
  const keys = header.split(',');
  return rows.map((line) => {
    const cells = line.match(/("([^"]|"")*"|[^,]*)(,|$)/g).map((cell) => cell.replace(/,$/, '').replace(/^"|"$/g, ''));
    return Object.fromEntries(keys.map((key, index) => [key, cells[index]]));
  });
}

test('every upcoming outflow in the CSV is mapped with the same date and amount', () => {
  const source = csv('data/synthetic-v4/csv/upcoming_outflows.csv');
  for (const row of source) {
    const mapped = cashInputs.outflows.find((item) => item.sourceId === row.outflow_id);
    assert.ok(mapped, `${row.outflow_id} is mapped`);
    assert.equal(mapped.date, row.due_date);
    assert.equal(mapped.amountInr, Number(row.amount_inr));
    if (row.invoice_no) assert.equal(mapped.invoiceId, row.invoice_no);
  }
});

test('the existing EMI is a v4 recurring bill and agrees with existing_emis.csv', () => {
  const [emi] = csv('data/synthetic-v4/csv/existing_emis.csv');
  const mapped = cashInputs.outflows.find((item) => item.id === 'recurring_emi');
  assert.equal(mapped.amountInr, Number(emi.emi_inr));
  assert.equal(Number(mapped.date.slice(8)), Number(emi.debit_day));
  assert.ok(mapped.date <= emi.ends_on);
});

test('only mapped sources become outflows: upcoming bills plus v4 recurring bills flagged for the cash plan', () => {
  const upcoming = new Set(csv('data/synthetic-v4/csv/upcoming_outflows.csv').map((row) => row.outflow_id));
  const recurring = new Set(activeSource.recurringBills.filter((bill) => bill.includeInCashPlan).map((bill) => `recurringBills.${bill.id}`));
  assert.deepEqual(cashInputs.outflows.map((item) => item.sourceId).filter((id) => !upcoming.has(id) && !recurring.has(id)), []);
  // Streams already in upcoming_outflows.csv are excluded by v4 and must stay out.
  assert.deepEqual(activeSource.recurringBills.filter((bill) => !bill.includeInCashPlan).map((bill) => bill.id), ['rent', 'salary', 'gst']);
});

test('the opening balance is the 29 Oct v4 bank close plus till cash, as in v4 workbook Cash_Plan!B2', () => {
  const bank = csv('data/synthetic-v4/csv/bank_statement.csv');
  const last = bank.at(-1);
  const bankClose = cashInputs.openingBalance.components.find((item) => item.id === 'bank_close_29_oct');
  assert.equal(bankClose.amountInr, Number(last.transactionalBalance ?? last.currentBalance));
  const till = cashInputs.openingBalance.components.find((item) => item.id === 'till_cash_29_oct');
  // v4 workbook Assumptions!B6 (the value is recorded here; the workbook is not parsed in tests).
  assert.equal(till.amountInr, 97270);
  assert.equal(cashInputs.openingBalance.amountInr, Math.round(bankClose.amountInr + till.amountInr));
});

test('expected collections cover every day of the horizon exactly once', () => {
  for (let date = cashInputs.horizon.start; date <= cashInputs.horizon.end;) {
    assert.equal(cashInputs.expectedCollections.filter((band) => band.from <= date && date <= band.to).length, 1, date);
    date = new Date(Date.parse(`${date}T00:00:00Z`) + 86400000).toISOString().slice(0, 10);
  }
});
