// A process-local reservation shared by the single-step and tracked demos.
// No database or external payment rail is involved.
export function createPaymentFence() {
  const entries = new Map();
  const tokens = new Map();
  const keyFor = (type, invoiceId) => `${type}|${invoiceId}`;
  return {
    get(type, invoiceId) {
      const entry = entries.get(keyFor(type, invoiceId));
      return entry ? structuredClone(entry) : null;
    },
    reserve(type, invoiceId, ownerId) {
      if (!['drawdown', 'supplier_payment'].includes(type) || typeof invoiceId !== 'string' || !invoiceId || typeof ownerId !== 'string' || !ownerId) throw new RangeError('A scoped payment reservation is required.');
      const key = keyFor(type, invoiceId);
      if (entries.has(key)) return null;
      const token = crypto.randomUUID();
      entries.set(key, { type, invoiceId, ownerId, status: 'reserved' });
      tokens.set(token, key);
      return token;
    },
    commit(token, effect) {
      const key = tokens.get(token);
      const entry = key ? entries.get(key) : null;
      if (!entry || entry.status !== 'reserved') throw new Error('Payment reservation is no longer valid.');
      entries.set(key, { ...entry, status: 'completed', effect: structuredClone(effect) });
      tokens.delete(token);
    },
    release(token) {
      const key = tokens.get(token);
      if (!key || entries.get(key)?.status !== 'reserved') return false;
      entries.delete(key); tokens.delete(token); return true;
    },
  };
}

export function getPaymentFence() {
  const key = Symbol.for('paytmunim.payment.fence');
  globalThis[key] ??= createPaymentFence();
  return globalThis[key];
}
