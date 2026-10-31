'use client';

import Link from 'next/link';
import FlowSimulator from '../../components/FlowSimulator';
import './simulator.css';

// Operator console. It answers only the open, correlated requests of tracked
// merchant tasks; the earlier single-step dispatcher is retired.
export default function SimulatorPage() {
  return <main className="sim-page">
    <header className="sim-topbar">
      <div className="sim-brand"><span>paytm</span><small>Munim</small><strong>Simulator console</strong></div>
      <Link prefetch={false} className="sim-merchant-link" href="/">Open merchant demo <span aria-hidden="true">↗</span></Link>
    </header>
    <div className="sim-ribbon">Synthetic demo data - nothing here is real.</div>
    <div className="sim-content">
      <section className="sim-intro">
        <div>
          <span className="sim-eyebrow">Demo control room</span>
          <h1>Control the next external response</h1>
          <p>Each merchant task opens one request at a time. Pick that request and choose a synthetic response for its current step. A response to an older or answered request is rejected. The merchant sees the result and RiskOps sees the same decision trail.</p>
        </div>
        <div className="sim-sequence"><span>Runtime</span><strong>Local</strong><small>Synthetic responses only · resets on server restart</small></div>
      </section>
      <FlowSimulator/>
    </div>
  </main>;
}
