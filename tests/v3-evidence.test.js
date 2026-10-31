import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { normalizeInvoiceDocument, evaluateInvoiceEvidence, deriveAaHistory, deriveRecurringBills } from '../lib/v3-evidence.js';
import { v3Source } from '../lib/v3-source.generated.js';

test('v3 supplied source bytes match the bundled source fingerprints', async () => {
  assert.equal(v3Source.provenance.files.length, 33);
  for (const item of v3Source.provenance.files) {
    const bytes = await readFile(new URL(`../data/synthetic-v3/${item.path}`, import.meta.url));
    assert.equal(bytes.length, item.bytes);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), item.sha256);
  }
  assert.equal(v3Source.bankAccount.maskedAccount, 'XXXXXXXX4029');
  assert.equal(v3Source.provenance.rowCounts.bankTransactions, 7789);
});

test('GD-1182 full body verifies while the owner photo remains missing evidence', () => {
  const header = v3Source.invoices.find(row => row.row === 'INV-01');
  const full = v3Source.invoices.find(row => row.row === 'INV-07');
  assert.equal(evaluateInvoiceEvidence(header, v3Source.invoices, v3Source.suppliers).status, 'NEEDS_VERIFICATION');
  const checked = evaluateInvoiceEvidence(full, v3Source.invoices, v3Source.suppliers);
  assert.equal(full.lines.length, 212);
  assert.equal(checked.status, 'PASS');
  assert.equal(checked.computedTotalInr, 520000);
  assert.equal(checked.injectionDetected, false);
  assert.deepEqual(checked.duplicateOf, []);
});

test('invoice evidence detects changed accounts, true duplicates, injected notes, and arithmetic tampering', () => {
  const check = row => evaluateInvoiceEvidence(v3Source.invoices.find(item => item.row === row), v3Source.invoices, v3Source.suppliers);
  assert.equal(check('INV-02').status, 'BLOCK');
  assert.ok(check('INV-02').duplicateOf.includes('INV-07'));
  assert.equal(check('INV-04').status, 'BLOCK');
  assert.equal(check('INV-03').injectionDetected, true);
  assert.equal(check('INV-03').status, 'ESCALATE');
  const tampered = structuredClone(v3Source.invoices.find(row => row.row === 'INV-07'));
  tampered.lines[0].totalInr += 1;
  assert.equal(evaluateInvoiceEvidence(tampered, v3Source.invoices, v3Source.suppliers).status, 'NEEDS_VERIFICATION');
});

test('fixture answer keys do not determine invoice or bank decisions', async () => {
  const raw = JSON.parse(await readFile(new URL('../data/synthetic-v3/invoices/INV-07_GD-1182.json', import.meta.url), 'utf8'));
  const before = normalizeInvoiceDocument(raw, v3Source.suppliers);
  raw.header.expected_guard_result = 'BLOCK'; raw.header.scenario = 'changed_account'; raw.evidence_check = 'BLOCK';
  assert.deepEqual(normalizeInvoiceDocument(raw, v3Source.suppliers), before);
  const rows = [{ txnId: 'TEST1', type: 'DEBIT', mode: 'NEFT', amount: '2000', valueDate: '2025-09-01', narration: 'NEFT DR-GUPTA DISTRIBUTORS-INV GD-1100', reference: 'REF1' },
    { txnId: 'TEST2', type: 'DEBIT', mode: 'NEFT', amount: '9000', valueDate: '2025-09-02', narration: '', reference: '' }];
  const result = deriveAaHistory(rows, v3Source.suppliers);
  const poisoned = rows.map(row => ({ ...row, label_payee: 'Kumar Agencies', label_category: 'salary', expected_guard_result: 'PASS' }));
  assert.deepEqual(deriveAaHistory(poisoned, v3Source.suppliers), result);
  assert.equal(result.matchedDebits.length, 1);
  assert.equal(result.unmatchedDebitCount, 1);
  assert.equal(result.matchedDebits[0].supplier_id, 'gupta');
  assert.equal(result.supplierSummary.find(row => row.id === 'gupta').priorFyDebitTotal, 2000);
});

test('recurring bills are inferred from narration and exclude already planned expenses', () => {
  const recurring = deriveRecurringBills(v3Source.bankTransactions);
  const emi = recurring.find(row => row.id === 'emi');
  assert.equal(emi.monthlyAmountInr, 22000);
  assert.equal(emi.nextDueDate, '2026-11-07');
  assert.equal(emi.includeInCashPlan, true);
  assert.equal(recurring.find(row => row.id === 'broadband').monthlyAmountInr, 3540);
  assert.equal(recurring.find(row => row.id === 'rent').includeInCashPlan, false);
  assert.equal(v3Source.procurementEstimates.stockOnHandObserved, false);
});

test('uncertain narration matches stay outside the conservative amount ceiling', () => {
  const rows = [
    { txnId: 'HIGH', type: 'DEBIT', amount: 1000, valueDate: '2025-09-01', narration: 'NEFT-7781-GUPTA' },
    { txnId: 'MEDIUM', type: 'DEBIT', amount: 9000, valueDate: '2025-09-02', narration: 'NEFT/GUPTA DISTRI/PAYMENT' },
    { txnId: 'UNRELATED', type: 'DEBIT', amount: 8000, valueDate: '2025-09-03', narration: 'GUPTA salary ref9927781' },
  ];
  const result = deriveAaHistory(rows, v3Source.suppliers);
  const summary = result.supplierSummary.find(row => row.id === 'gupta');
  assert.equal(summary.priorFyDebitTotal, 1000);
  assert.equal(summary.conservativeObservedLimit, 1100);
  assert.equal(summary.allAttributedDebitTotal, 10000);
  assert.equal(result.matchedDebits.find(row => row.bankTxnId === 'MEDIUM').verified, false);
  assert.equal(result.unmatchedDebitCount, 1);
});
