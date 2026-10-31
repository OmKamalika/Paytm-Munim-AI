'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import FlowSimulator from '../../components/FlowSimulator';
import './simulator.css';

type Kind = 'supplier' | 'aa' | 'lenders';
type Scenario = { id: string; kind: Kind; label: string; description: string };
type SimEvent = { seq: number; kind: Kind; scenarioId: string; payload: Record<string, unknown>; timestamp: string };
type SimState = {
  synthetic: true;
  sessionOnly: true;
  latestSeq: number;
  catalog: Scenario[];
  latest: Record<Kind, SimEvent | null>;
  events: SimEvent[];
  requests: { kind: Kind; requestId: string; cursor: number; timestamp: string }[];
  latestRequest: Record<Kind, { requestId: string; cursor: number; timestamp: string } | null>;
};

function hasPending(state: SimState | null, kind: Kind) {
  const request = state?.latestRequest[kind];
  const response = state?.latest[kind];
  return Boolean(request && (!response || response.seq <= request.cursor));
}

const groups: { kind: Kind; title: string; description: string }[] = [
  { kind: 'supplier', title: 'Supplier replies', description: 'Terms, account, or beneficiary changes for Gupta Distributors.' },
  { kind: 'aa', title: 'AA sample request', description: 'Release the bundled synthetic bank sample for server-side checks. The merchant receives a status summary.' },
  { kind: 'lenders', title: 'Partner lender response', description: 'Three illustrative offers from the static fixture.' },
];

function eventTitle(event: SimEvent, catalog: Scenario[]) {
  return catalog.find((item) => item.id === event.scenarioId)?.label ?? event.scenarioId;
}

function eventSummary(event: SimEvent) {
  if (event.kind === 'supplier') {
    const candidate = event.payload.candidate as { summary?: string } | undefined;
    return candidate?.summary ?? 'Supplier response sent.';
  }
  if (event.kind === 'aa') return event.payload.status === 'available' ? 'Sample response available' : 'No sample response';
  return 'Lender A, B and C offers sent';
}

export default function SimulatorPage() {
  const [state, setState] = useState<SimState | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [lastSent, setLastSent] = useState<number | null>(null);

  const load = useCallback(async () => {
    try {
      const response = await fetch('/api/simulator/state', { cache: 'no-store' });
      if (!response.ok) throw new Error('Could not load simulator state.');
      setState(await response.json() as SimState);
      setError('');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not load simulator state.');
    }
  }, []);

  useEffect(() => {
    const initial = window.setTimeout(() => { void load(); }, 0);
    const timer = window.setInterval(() => { void load(); }, 3000);
    return () => { window.clearTimeout(initial); window.clearInterval(timer); };
  }, [load]);

  async function dispatch(scenarioId: string) {
    setBusyId(scenarioId);
    setError('');
    try {
      const response = await fetch('/api/simulator/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId }),
      });
      const result = await response.json() as { event?: SimEvent; state?: SimState; error?: string };
      if (!response.ok || !result.event || !result.state) throw new Error(result.error ?? 'Could not send response.');
      setState(result.state);
      setLastSent(result.event.seq);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not send response.');
    } finally {
      setBusyId(null);
    }
  }

  return <main className="sim-page">
    <header className="sim-topbar">
      <div className="sim-brand"><span>paytm</span><small>Munim</small><strong>Simulator console</strong></div>
      <Link className="sim-merchant-link" href="/">Open merchant demo <span aria-hidden="true">↗</span></Link>
    </header>
    <div className="sim-ribbon">Synthetic demo data - nothing here is real.</div>
    <div className="sim-content">
      <section className="sim-intro">
        <div>
          <span className="sim-eyebrow">Demo control room</span>
          <h1>Control the next external response</h1>
          <p>Watch incoming merchant tasks, inspect each request, and choose a synthetic response for its current step. The merchant sees the result and RiskOps sees the decision trail.</p>
        </div>
        <div className="sim-sequence"><span>Runtime</span><strong>Local</strong><small>Synthetic responses only</small></div>
      </section>

      {error && <div className="sim-error" role="alert">{error} <button onClick={() => void load()}>Retry</button></div>}

      <FlowSimulator/>
      <details className="sim-legacy">
        <summary>Single-step sample requests · supplier, AA, and offer comparison</summary>
        <p>These requests come from the individual comparison screens. The tracked-task inbox above handles complete delegated journeys.</p>
        <div className="sim-legacy-requests">{groups.map(group => <div key={group.kind}><b>{group.title}</b><span>{hasPending(state, group.kind) ? "Incoming request · waiting" : state?.latestRequest[group.kind] ? "Response delivered" : "No request yet"}</span><small>{state?.latestRequest[group.kind]?.requestId || "Start a request in the merchant app"}</small></div>)}</div>
      <div className="sim-grid">
        <div className="sim-scenarios">
          {groups.map((group) => <section className="sim-section" key={group.kind} aria-labelledby={`sim-${group.kind}`}>
            <div className="sim-section-head">
              <div><h2 id={`sim-${group.kind}`}>{group.title}</h2><p>{group.description}</p></div>
              <span className="sim-kind">{group.kind}</span>
            </div>
            <div className="sim-card-list">
              {state ? state.catalog.filter((scenario) => scenario.kind === group.kind).map((scenario) =>
                <div className="sim-card" key={scenario.id}>
                  <div><h3>{scenario.label}</h3><p>{scenario.description}</p></div>
                  <button disabled={busyId !== null || !hasPending(state, group.kind)} onClick={() => void dispatch(scenario.id)}>
                    {busyId === scenario.id ? 'Sending…' : lastSent !== null && state.latest[group.kind]?.seq === lastSent && state.latest[group.kind]?.scenarioId === scenario.id ? 'Send again' : 'Send to merchant'}
                  </button>
                </div>) : <p className="sim-loading">Loading scenarios…</p>}
            </div>
          </section>)}
        </div>

        <aside className="sim-ledger" aria-label="Recent simulator dispatches">
          <div className="sim-ledger-head"><div><span className="sim-eyebrow">Live local feed</span><h2>Recent dispatches</h2></div><button onClick={() => void load()}>Refresh</button></div>
          {!state || state.events.length === 0 ?
            <div className="sim-empty"><strong>No response sent yet</strong><p>The feed begins empty. Sending a scenario records the actual local dispatch here.</p></div> :
            <ol className="sim-events">{[...state.events].reverse().slice(0, 10).map((event) =>
              <li key={event.seq}>
                <div className="sim-event-top"><b>#{event.seq}</b><span>{event.kind}</span></div>
                <strong>{eventTitle(event, state.catalog)}</strong>
                <p>{eventSummary(event)}</p>
                <time dateTime={event.timestamp}>{new Date(event.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</time>
              </li>)}</ol>}
          <p className="sim-footnote">This feed lives in server memory for the demo session. Restarting the server clears it. It is not the evidence log.</p>
        </aside>
      </div>
      </details>
    </div>
  </main>;
}
