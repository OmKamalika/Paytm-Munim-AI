export const DEMO_AS_OF = '2026-10-31T15:55:00+05:30';
const IST_OFFSET_MS = 330 * 60_000;
const DAY_MS = 86_400_000;
const OUTLETS = [{ id: 'DAD', name: 'Dadar' }, { id: 'MAT', name: 'Matunga' }, { id: 'SIO', name: 'Sion' }];
const SUCCESS = new Set(['SUCCESS', 'SUCCESSFUL', 'COMPLETED', 'SETTLED']);

function timestamp(value) {
  if (typeof value !== 'string') return null;
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,3})?(Z|[+-](\d{2}):(\d{2}))$/.exec(value);
  if (!match || Number(match[2]) > 23 || Number(match[3]) > 59 || Number(match[4]) > 59 || Number(match[6] ?? 0) > 14 || Number(match[7] ?? 0) > 59 || Number(match[6] ?? 0) === 14 && Number(match[7] ?? 0) !== 0) return null;
  const midnight = Date.parse(`${match[1]}T00:00:00Z`);
  if (!Number.isFinite(midnight) || new Date(midnight).toISOString().slice(0, 10) !== match[1]) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}
function istDate(at) { return new Date(at + IST_OFFSET_MS).toISOString().slice(0, 10); }
function istTimestamp(at) { return at === null ? null : new Date(at + IST_OFFSET_MS).toISOString().replace('.000Z', '+05:30').replace(/Z$/, '+05:30'); }
function addDays(date, count) { return new Date(Date.parse(`${date}T00:00:00Z`) + count * DAY_MS).toISOString().slice(0, 10); }
function paise(value) {
  if (!['string', 'number'].includes(typeof value) || !/^-?\d+(?:\.\d{1,2})?$/.test(String(value))) return null;
  const amount = Math.round(Number(value) * 100);
  return Number.isSafeInteger(amount) ? amount : null;
}

/** Actual Paytm net sales, measured in IST; absent source rows remain unavailable. */
export function buildSalesSummary(rows, { asOf = DEMO_AS_OF } = {}) {
  const cutoff = timestamp(asOf);
  if (cutoff === null || cutoff > Date.parse(DEMO_AS_OF)) throw new RangeError('The as-of timestamp must be valid and no later than the fixed demo cutoff.');
  if (!Array.isArray(rows)) throw new TypeError('Sales transaction rows must be an array.');
  const today = istDate(cutoff);
  const from = addDays(today, -6);
  const accepted = [];
  const seen = new Set();
  for (const row of rows) {
    if (!row || typeof row !== 'object' || !OUTLETS.some((outlet) => outlet.id === row.outlet_id) || typeof row.txn_id !== 'string' || !row.txn_id.trim() || !['PAYMENT', 'REFUND'].includes(row.txn_type)) continue;
    const at = timestamp(row.txn_timestamp);
    const amount = paise(row.amount_inr);
    if (at === null || at > cutoff || amount === null || (row.txn_type === 'PAYMENT' ? amount <= 0 : amount >= 0)) continue;
    const date = istDate(at);
    if ('txn_date' in row && row.txn_date !== date) continue;
    if (['status', 'txn_status', 'payment_status'].some((field) => field in row && !SUCCESS.has(String(row[field]).trim().toUpperCase()))) continue;
    if (seen.has(row.txn_id)) continue;
    seen.add(row.txn_id);
    accepted.push({ at, date, outletId: row.outlet_id, amount, type: row.txn_type });
  }
  const latest = accepted.reduce((value, row) => value === null || row.at > value ? row.at : value, null);
  function totals(items) {
    const totalPaise = items.reduce((total, row) => total + row.amount, 0);
    if (!Number.isSafeInteger(totalPaise)) throw new RangeError('The observed sales total exceeds the safe amount range.');
    return {
      available: items.length > 0,
      totalInr: items.length ? totalPaise / 100 : null,
      transactionCount: items.length || null,
      paymentCount: items.length ? items.filter((row) => row.type === 'PAYMENT').length : null,
      refundCount: items.length ? items.filter((row) => row.type === 'REFUND').length : null,
    };
  }
  function period(start, end) {
    const items = accepted.filter((row) => row.date >= start && row.date <= end);
    const dates = [];
    for (let date = start; date <= end; date = addDays(date, 1)) dates.push(date);
    const observedDates = [...new Set(items.map((row) => row.date))].sort();
    return {
      ...totals(items),
      // Transaction timestamps do not prove that an export covers an entire period.
      complete: false,
      outlets: OUTLETS.map((outlet) => {
        const outletRows = accepted.filter((row) => row.outletId === outlet.id);
        const latestAt = outletRows.reduce((value, row) => value === null || row.at > value ? row.at : value, null);
        const inPeriod = items.filter((row) => row.outletId === outlet.id);
        const represented = new Set(inPeriod.map((row) => row.date));
        return { ...outlet, ...totals(inPeriod), latestAvailableAt: istTimestamp(latestAt), dataThrough: latestAt === null ? null : istDate(latestAt), dataAgeMinutes: latestAt === null ? null : Math.floor((cutoff - latestAt) / 60_000), missingDates: dates.filter((date) => !represented.has(date)) };
      }),
      coverage: { requestedDays: dates.length, observedDays: observedDates.length, observedDates, missingDates: dates.filter((date) => !observedDates.includes(date)), fullPeriodVerified: false, includesToday: observedDates.includes(today) },
    };
  }
  return {
    asOf: istTimestamp(cutoff), timezone: 'Asia/Kolkata', basis: 'paytm_net_sales',
    latestAvailableAt: istTimestamp(latest), dataThrough: latest === null ? null : istDate(latest), dataAgeMinutes: latest === null ? null : Math.floor((cutoff - latest) / 60_000),
    today: { date: today, ...period(today, today) },
    last7Days: { from, to: today, ...period(from, today) },
    coverageNote: 'Observed Paytm payments less refunds. No source rows means unavailable, not zero sales; the export does not prove full-period coverage.',
  };
}
