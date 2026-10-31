import test from 'node:test';
import assert from 'node:assert/strict';
import { createPaymentFence } from '../lib/payment-fence.js';
import { createActionRuntime, sha256Hex } from '../lib/action-runtime.js';

test('a pending instruction reserves one invoice until definitive failure or completion', () => {
  const fence = createPaymentFence();
  const token = fence.reserve('supplier_payment', 'GD-1182', 'run-1');
  assert.ok(token);
  assert.equal(fence.reserve('supplier_payment', 'GD-1182', 'run-2'), null);
  assert.equal(fence.get('supplier_payment', 'GD-1182').status, 'reserved');
  assert.equal(fence.release(token), true);
  const second = fence.reserve('supplier_payment', 'GD-1182', 'run-2');
  fence.commit(second, { amountInr: 260000 });
  assert.equal(fence.release(second), false);
  assert.equal(fence.get('supplier_payment', 'GD-1182').status, 'completed');
  assert.equal(fence.reserve('supplier_payment', 'GD-1182', 'run-3'), null);
});

test('separate action runtimes cannot both execute the same invoice through the shared fence', async () => {
  const paymentFence = createPaymentFence();
  const pin = crypto.randomUUID();
  const pinHash = await sha256Hex(pin);
  const first = createActionRuntime({ pinHash, paymentFence });
  const second = createActionRuntime({ pinHash, paymentFence });
  const action = { type: 'drawdown', lender_id: 'A', amount: 200000, destination_account: '**4029', invoice_id: 'GD-1182' };
  const a = await first.evaluate(action);
  const b = await second.evaluate(action);
  const executed = await first.execute({ action, approval_id: a.approval_id, pin, idempotency_key: crypto.randomUUID() });
  assert.equal(executed.outcome, 'done-simulated');
  const refused = await second.execute({ action, approval_id: b.approval_id, pin, idempotency_key: crypto.randomUUID() });
  assert.equal(refused.outcome, 'blocked');
  assert.equal((await second.getLedger()).effects.length, 0);
  assert.equal((await first.getLedger()).effects.length, 1);
});
