import { demoFixture } from './demo-fixture.js';
import { lendersFixture } from './cash-fixture.js';
import { outletOrder } from './outlet-order.js';

const catalog = [
  { id: 'supplier_clean', kind: 'supplier', label: 'Supplier: agreed terms', description: 'Gupta replies with the requested credit and buyback.' },
  { id: 'supplier_drift', kind: 'supplier', label: 'Supplier: changed terms', description: 'Gupta shortens credit and removes buyback.' },
  { id: 'supplier_account_change', kind: 'supplier', label: 'Supplier: changed account', description: 'The payment account changes to an unverified account.' },
  { id: 'supplier_name_change', kind: 'supplier', label: 'Supplier: changed beneficiary', description: 'The payment account name changes to Gupta Traders & Logistics.' },
  { id: 'supplier_outlet_order', kind: 'supplier', label: 'Supplier: accepts outlet order + invoice', description: 'Gupta accepts the terms and the outlet x SKU delivery split, and sends full invoice GD-1182-R1.' },
  { id: 'supplier_delivery_drift', kind: 'supplier', label: 'Supplier: changes the delivery split', description: 'Gupta accepts the terms but wants to deliver all 400 boxes to Dadar.' },
  { id: 'aa_available', kind: 'aa', label: 'AA: sample response available', description: 'Release the bundled synthetic bank sample for server-side checks.' },
  { id: 'aa_unavailable', kind: 'aa', label: 'AA: response unavailable', description: 'A synthetic AA request has no response.' },
  { id: 'lender_offers', kind: 'lenders', label: 'Lenders: A, B and C', description: 'Send the three illustrative lender offers.' },
];

function supplierCandidate(id) {
  const candidate = demoFixture.candidates.find((item) => item.id === id);
  if (!candidate) throw new Error(`Missing seeded supplier case: ${id}`);
  return structuredClone(candidate);
}

function payloadFor(scenarioId) {
  if (scenarioId === 'supplier_clean') return { candidate: supplierCandidate('clean') };
  if (scenarioId === 'supplier_drift') return { candidate: supplierCandidate('drift') };
  if (scenarioId === 'supplier_account_change') return { candidate: supplierCandidate('account_change') };
  if (scenarioId === 'supplier_name_change') {
    return {
      candidate: {
        ...supplierCandidate('clean'),
        id: 'name_change',
        displayName: 'Beneficiary name changed',
        summary: 'The payee name changed while the account stayed the same.',
        beneficiaryName: 'Gupta Traders & Logistics',
        supplierMessage: 'Please pay Gupta Traders & Logistics on the account ending 7781.',
        supplierAcceptance: null,
      },
    };
  }
  if (scenarioId === 'supplier_outlet_order' || scenarioId === 'supplier_delivery_drift') {
    const drift = scenarioId === 'supplier_delivery_drift';
    const deliveries = drift
      ? Object.values(outletOrder.deliveries.reduce((acc, line) => {
        acc[line.skuId] ??= { outletId: 'DAD', skuId: line.skuId, units: 0 };
        acc[line.skuId].units += line.units;
        return acc;
      }, {}))
      : structuredClone(outletOrder.deliveries);
    const split = outletOrder.byOutlet.map((item) => `${item.outlet} (${item.units})`).join(', ');
    const clean = supplierCandidate('clean');
    return {
      candidate: {
        ...clean,
        id: drift ? 'delivery_drift' : 'outlet_order',
        displayName: drift ? 'Delivery split changed' : 'Outlet order accepted',
        summary: drift ? 'Terms agreed, but all boxes go to Dadar.' : 'Terms and outlet x SKU deliveries agreed; full invoice attached.',
        invoiceId: 'GD-1182-R1',
        deliveries,
        supplierMessage: drift
          ? 'Agreed: 400 gift boxes for ₹5,20,000. 50% now, balance in 45 days, 50% buyback on unsold boxes after the season. We will deliver all 400 boxes to Dadar on 4 Nov; please move them to the other outlets yourself. Invoice GD-1182-R1 attached.'
          : `Agreed: 400 gift boxes for ₹5,20,000, delivered on 4 Nov as per your SKU split: ${split}. 50% now, balance in 45 days, 50% buyback on unsold boxes after the season. Invoice GD-1182-R1 attached.`,
        supplierAcceptance: {
          ...clean.supplierAcceptance,
          reference: drift ? 'SIM-GUP-1005' : 'SIM-GUP-1004',
          acceptedAt: drift ? '2026-10-30T19:18:00+05:30' : '2026-10-30T19:17:00+05:30',
        },
      },
    };
  }
  if (scenarioId === 'aa_available') {
    return {
      status: 'available',
      requestId: demoFixture.aa.requestId,
      source: 'simulated_aa_request',
      note: 'Synthetic bank sample is available for server-side checks. This response does not display bank transaction rows.',
    };
  }
  if (scenarioId === 'aa_unavailable') {
    return {
      status: 'unavailable',
      requestId: demoFixture.aa.requestId,
      source: 'simulated_aa_request',
      note: 'No sample response was returned.',
    };
  }
  if (scenarioId === 'lender_offers') {
    return {
      status: 'available',
      illustrative: true,
      scheduleLabel: lendersFixture.scheduleLabel,
      emiCap: structuredClone(lendersFixture.emiCap),
      offers: structuredClone(lendersFixture.offers),
    };
  }
  throw new RangeError(`Unknown simulator scenario: ${scenarioId}`);
}

export function createSimulatorStore({ now = () => new Date().toISOString() } = {}) {
  const events = [];
  const latest = { supplier: null, aa: null, lenders: null };
  const latestRequest = { supplier: null, aa: null, lenders: null };
  const requests = [];

  function request(kind) {
    if (!Object.hasOwn(latest, kind)) throw new RangeError(`Unknown simulator request kind: ${kind}`);
    const receipt = { kind, cursor: events.length, requestId: crypto.randomUUID(), timestamp: now() };
    requests.push(receipt);
    latestRequest[kind] = receipt;
    return structuredClone(receipt);
  }

  function dispatch(scenarioId) {
    const scenario = catalog.find((item) => item.id === scenarioId);
    if (!scenario) throw new RangeError(`Unknown simulator scenario: ${scenarioId}`);
    const event = {
      seq: events.length + 1,
      kind: scenario.kind,
      scenarioId,
      payload: payloadFor(scenarioId),
      requestId: latestRequest[scenario.kind]?.requestId ?? null,
      timestamp: now(),
    };
    events.push(event);
    latest[scenario.kind] = event;
    return structuredClone(event);
  }

  function getState() {
    return structuredClone({
      synthetic: true,
      sessionOnly: true,
      latestSeq: events.length,
      catalog,
      latest,
      latestRequest,
      events,
      requests,
    });
  }

  function getEvent(seq) {
    if (!Number.isSafeInteger(seq) || seq < 1) return null;
    const event = events[seq - 1];
    return event ? structuredClone(event) : null;
  }

  function getActiveResponse(kind) {
    if (!Object.hasOwn(latest, kind)) return null;
    const request = latestRequest[kind];
    const event = latest[kind];
    return request && event && event.seq > request.cursor && event.requestId === request.requestId
      ? structuredClone(event) : null;
  }

  return { request, dispatch, getState, getEvent, getActiveResponse };
}

// One in-memory store per server process or Worker isolate. It is deliberately
// ephemeral and is not a durable ledger or a multi-user simulator service.
const storeKey = Symbol.for('paytmunim.synthetic.simulator.store');
export function getSimulatorStore() {
  globalThis[storeKey] ??= createSimulatorStore();
  return globalThis[storeKey];
}

export function getSimulatorEvent(seq) {
  return getSimulatorStore().getEvent(seq);
}
