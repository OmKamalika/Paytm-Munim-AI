"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { FlowCheck, FlowDisclosure, FlowRun, FlowState, FlowTrace } from "../lib/flow-types";
import "./FlowRiskOps.css";

type RunFilter = "all" | "attention" | "owner" | "waiting" | "completed";
type PauseState = { paused: boolean; scope: string; durable: boolean };

const statusLabels: Record<FlowRun["status"], string> = {
  awaiting_response: "Waiting for response", awaiting_owner: "Awaiting merchant sign-off",
  paused: "Paused for review", blocked: "Blocked", completed: "Completed (simulated)",
  failed: "Failed", payment_pending: "Payment outcome pending", declined: "Merchant declined",
};

function label(value: string): string {
  const text = value.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replaceAll("_", " ").replace(/\bInr\b/g, "(₹)");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function valueText(value: unknown): string {
  if (value === null || value === undefined || value === "") return "Not supplied";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(value);
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.length ? value.map(valueText).join(" · ") : "None recorded";
  return JSON.stringify(value);
}

function timeLabel(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", second: "2-digit" }).format(date);
}

function tone(value: string): string {
  const normalized = value.toLowerCase();
  if (/block|fail|declin|revok|reject/.test(normalized)) return "red";
  if (/owner|pause|pending|concern|escalat|verification|unavailable/.test(normalized)) return "amber";
  if (/complet|success|pass|clear|allow|approved/.test(normalized)) return "green";
  return "blue";
}

function Facts({ data }: { data: Record<string, unknown> }) {
  return <dl className="frops-facts">{Object.entries(data).map(([key, value]) => <div key={key}><dt>{label(key)}</dt><dd>{typeof value === "number" && /Inr$/.test(key) ? `₹${valueText(value)}` : valueText(value)}</dd></div>)}</dl>;
}

function Checks({ checks }: { checks: FlowCheck[] }) {
  return checks.length ? <ul className="frops-checks">{checks.map((check, index) => <li key={`${check.id}-${index}`}><span className={`frops-badge frops-${tone(check.status)}`}>{label(check.status)}</span><div><b>{label(check.id)}</b><p>{check.detail}</p></div></li>)}</ul> : <p className="frops-muted">No guard checks have run at this stage.</p>;
}

function isFlagEvent(trace: FlowTrace): boolean {
  return trace.event === "instruction_attack_flagged" || trace.event === "guard_decision" ||
    (trace.event === "judge_result" && trace.judge?.decision !== "clear") ||
    (trace.event === "owner_signoff_requested" && ["terms_change", "judge_review"].includes(trace.merchantDisclosure?.type ?? ""));
}

function Disclosure({ disclosure, traces }: { disclosure: FlowDisclosure; traces: FlowTrace[] }) {
  const consentEvents = traces.filter((trace) => trace.merchantDisclosure?.id === disclosure.id && trace.actor.role === "merchant_owner" && /consent|approval/i.test(`${trace.event} ${trace.tool}`));
  return <article className="frops-disclosure">
    <div className="frops-disclosure-title"><div><span>Immutable merchant disclosure · version {disclosure.version}</span><h4>{disclosure.summary}</h4></div><span className="frops-badge frops-amber">{disclosure.requiresPin ? "PIN sign-off required" : "Explicit sign-off required"}</span></div>
    <p className="frops-disclosure-why">{disclosure.why}</p>
    <div className="frops-disclosure-grid"><section><h5>Original merchant intent</h5><Facts data={disclosure.originalIntent}/></section><section><h5>Proposed action</h5><Facts data={disclosure.proposedAction}/></section></div>
    <section><h5>Terms shown to the merchant</h5><Facts data={disclosure.terms}/></section>
    {disclosure.delta.length > 0 && <section><h5>Changes shown before sign-off</h5><DeltaTable runDelta={disclosure.delta}/></section>}
    <div className="frops-disclosure-grid"><section><h5>Risks surfaced</h5><ul>{disclosure.risks.map((risk, index) => <li key={index}>{risk}</li>)}</ul></section><section><h5>Alternatives surfaced</h5><ul>{disclosure.alternatives.map((item, index) => <li key={index}>{item}</li>)}</ul></section></div>
    <section><h5>Data to be shared</h5>{disclosure.dataShared.length ? <ul>{disclosure.dataShared.map((item, index) => <li key={index}>{item}</li>)}</ul> : <p className="frops-muted">No data sharing recorded for this decision.</p>}</section>
    <section><h5>Checks included in the disclosure</h5><Checks checks={disclosure.checks}/></section>
    <div className="frops-disclosure-meta"><span>{disclosure.id}</span><span>{timeLabel(disclosure.createdAt)}</span><code>{disclosure.hash}</code></div>
    <section className="frops-consent-record"><h5>Sign-off record for this snapshot</h5>{consentEvents.length ? <ol>{consentEvents.map((event) => <li key={event.eventId}><span className={`frops-badge frops-${tone(event.event)}`}>{label(event.event)}</span><div><b>{event.actor.id} · {label(event.actor.role)}</b><p>{event.summary}</p><small>{timeLabel(event.at)} · event #{event.seq}</small></div></li>)}</ol> : <p className="frops-muted">No merchant sign-off event is recorded for this disclosure yet.</p>}</section>
  </article>;
}

function DeltaTable({ runDelta }: { runDelta: FlowRun["delta"] }) {
  return <div className="frops-delta" role="table" aria-label="Intent delta"><div className="frops-delta-head" role="row"><span role="columnheader">Field</span><span role="columnheader">Original intent</span><span role="columnheader">Runtime proposal</span></div>{runDelta.map((item, index) => <div className={`frops-delta-row frops-delta-${item.severity}`} role="row" key={`${item.field}-${index}`}><span role="cell"><b>{label(item.field)}</b><small>{label(item.severity)}</small></span><span role="cell">{valueText(item.original)}</span><span role="cell">{valueText(item.proposed)}</span></div>)}</div>;
}

export default function FlowRiskOps({ standalone = false }: { standalone?: boolean }) {
  const [state, setState] = useState<FlowState | null>(null);
  const [pauseState, setPauseState] = useState<PauseState | null>(null);
  const [filter, setFilter] = useState<RunFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [pauseBusy, setPauseBusy] = useState(false);
  const [refreshedAt, setRefreshedAt] = useState("");
  const [refreshVersion, setRefreshVersion] = useState(0);

  useEffect(() => {
    let active = true;
    let inFlight = false;
    const controller = new AbortController();
    const load = async () => {
      if (inFlight) return;
      inFlight = true;
      try {
        const [response, pauseResponse] = await Promise.all([
          fetch("/api/flows/state?view=riskops", { cache: "no-store", signal: controller.signal }),
          fetch("/api/control/pause", { cache: "no-store", signal: controller.signal }),
        ]);
        if (!response.ok || !pauseResponse.ok) throw new Error("Live server flows could not load.");
        const [next, pause] = await Promise.all([response.json() as Promise<FlowState>, pauseResponse.json() as Promise<PauseState>]);
        if (active) { setState(next); setPauseState(pause); setError(""); setRefreshedAt(new Date().toISOString()); }
      } catch (caught) {
        if (active) setError(caught instanceof Error ? caught.message : "Live server flows could not load.");
      } finally { inFlight = false; }
    };
    const initial = window.setTimeout(() => { void load(); }, 0);
    const timer = window.setInterval(() => { void load(); }, 1000);
    return () => { active = false; controller.abort(); window.clearTimeout(initial); window.clearInterval(timer); };
  }, [refreshVersion]);

  async function changePause() {
    const next = !(pauseState?.paused ?? state?.paused ?? false);
    setPauseBusy(true);
    try {
      const response = await fetch("/api/control/pause", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ paused: next }) });
      if (!response.ok) throw new Error("Server pause could not be changed.");
      setPauseState(await response.json() as PauseState); setError("");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Server pause could not be changed."); }
    finally { setPauseBusy(false); }
  }

  const runs = state?.runs ?? [];
  const waitingOwner = runs.filter((run) => run.status === "awaiting_owner");
  const attention = runs.filter((run) => ["paused", "blocked", "failed", "payment_pending"].includes(run.status) || run.judge?.decision === "concern");
  const completed = runs.filter((run) => run.status === "completed");
  const waiting = runs.filter((run) => run.status === "awaiting_response");
  const filteredRuns = runs.filter((run) => filter === "all" || (filter === "owner" ? run.status === "awaiting_owner" : filter === "attention" ? attention.includes(run) : filter === "waiting" ? run.status === "awaiting_response" || run.status === "payment_pending" : run.status === "completed"));
  const selected = filteredRuns.find((run) => run.id === selectedId) ?? filteredRuns[0];
  const traces = (state?.traces ?? []).filter((trace) => trace.runId === selected?.id);
  const requests = (state?.requests ?? []).filter((request) => request.runId === selected?.id);
  const flagEvents = traces.filter(isFlagEvent);
  const badChecks = selected?.checks.filter((check) => check.status !== "PASS") ?? [];
  const paused = pauseState?.paused ?? state?.paused ?? false;
  const disclosures = selected ? [...selected.disclosureHistory, ...(selected.currentDisclosure && !selected.disclosureHistory.some((item) => item.id === selected.currentDisclosure?.id) ? [selected.currentDisclosure] : [])] : [];
  const Title = standalone ? "h1" : "h2";

  return <section className={`frops-shell ${standalone ? "frops-standalone" : "frops-embedded"}`} aria-label="Live workflow RiskOps">
    {standalone && <header className="frops-topbar"><div><b>paytm</b><span>Munim / RiskOps</span></div><nav><Link href="/">Merchant app ↗</Link><Link href="/simulator">Simulator ↗</Link></nav></header>}
    {standalone && <div className="frops-synthetic">Synthetic demo data - nothing here is real.</div>}
    <div className="frops-content">
      <div className="frops-heading"><div><span className="frops-eyebrow"><i className={error ? "is-error" : ""}/>Shared server feed · refreshes every second</span><Title>Follow each delegated decision</Title><p>Trace the request, response, guard action, and information shown before merchant sign-off.</p></div><div className="frops-actions"><button type="button" onClick={() => setRefreshVersion((previous) => previous + 1)}>Refresh</button><button className={paused ? "is-paused" : ""} type="button" disabled={pauseBusy || !state} onClick={() => void changePause()}>{pauseBusy ? "Updating…" : paused ? "Resume demo checks" : "Pause demo checks"}</button>{!standalone && <Link href="/riskops" target="_blank" rel="noreferrer">Open live dashboard ↗</Link>}</div></div>
    {standalone && <header className="frops-topbar"><div><b>paytm</b><span>Munim / RiskOps</span></div><nav><Link prefetch={false} href="/">Merchant app ↗</Link><Link prefetch={false} href="/simulator">Simulator ↗</Link></nav></header>}
    {standalone && <div className="frops-synthetic">Synthetic demo data - nothing here is real.</div>}
    <div className="frops-content">
      <div className="frops-heading"><div><span className="frops-eyebrow"><i className={error ? "is-error" : ""}/>Shared server feed · refreshes every second</span><Title>Follow each delegated decision</Title><p>Trace the request, response, guard action, and information shown before merchant sign-off.</p></div><div className="frops-actions"><button type="button" onClick={() => setRefreshVersion((previous) => previous + 1)}>Refresh</button><button className={paused ? "is-paused" : ""} type="button" disabled={pauseBusy || !state} onClick={() => void changePause()}>{pauseBusy ? "Updating…" : paused ? "Resume demo checks" : "Pause demo checks"}</button>{!standalone && <Link prefetch={false} href="/riskops" target="_blank" rel="noreferrer">Open live dashboard ↗</Link>}</div></div>
      <div className="frops-boundary"><span>Demo actor roles · no user authentication</span><span>Server memory · resets on restart · no external audit anchor</span>{refreshedAt && <span>Updated {timeLabel(refreshedAt)}</span>}</div>
      {error && <div className="frops-error" role="alert"><b>Live feed unavailable.</b> {error} {state && "The last successful snapshot remains visible."}</div>}
      {paused && <div className="frops-pause-banner" role="status"><b>RiskOps paused the demo server.</b> Guarded progress and owner approvals are held until checks resume.</div>}
      <div className="frops-metrics"><div><span>Server runs</span><strong>{runs.length}</strong></div><div><span>Need attention</span><strong>{attention.length}</strong></div><div><span>Awaiting merchant</span><strong>{waitingOwner.length}</strong></div><div><span>Waiting for response</span><strong>{waiting.length}</strong></div><div><span>Completed</span><strong>{completed.length}</strong></div></div>
      <div className="frops-integrity"><span className={`frops-badge frops-${state?.verification.ok ? "green" : state ? "red" : "blue"}`}>{state ? state.verification.ok ? "Journal chain verified" : `Journal broken at #${state.verification.firstBrokenSeq ?? "unknown"}` : "Connecting to server…"}</span><span>{state?.traces.length ?? 0} recorded trace events · revision {state?.revision ?? 0}</span><span>{state?.ledger.length ?? 0} simulated ledger effects</span></div>
      <div className="frops-workspace"><aside className="frops-queue" aria-label="Server workflow runs"><div className="frops-filters" role="group" aria-label="Filter workflow runs">{([ ["all", "All"], ["attention", "Attention"], ["owner", "Merchant"], ["waiting", "Waiting"], ["completed", "Done"] ] as const).map(([id, text]) => <button key={id} type="button" className={filter === id ? "is-active" : ""} aria-pressed={filter === id} onClick={() => setFilter(id)}>{text}</button>)}</div>{filteredRuns.length ? <ol>{filteredRuns.map((run) => <li key={run.id}><button type="button" className={selected?.id === run.id ? "is-selected" : ""} onClick={() => setSelectedId(run.id)}><span className={`frops-badge frops-${tone(run.status)}`}>{statusLabels[run.status]}</span><b>{run.title}</b><p>{run.summary}</p><small>{run.id}</small><span className="frops-queue-time">{label(run.stage)} · {timeLabel(run.updatedAt)}</span></button></li>)}</ol> : <div className="frops-empty"><b>{runs.length ? "No runs in this filter" : "No server runs yet"}</b><p>{runs.length ? "Choose a different status to inspect another run." : "Start a merchant intent. Its requests, decisions, and disclosure snapshots will arrive here."}</p>{standalone && <Link href="/">Open merchant app ↗</Link>}</div>}</aside>
      <div className="frops-workspace"><aside className="frops-queue" aria-label="Server workflow runs"><div className="frops-filters" role="group" aria-label="Filter workflow runs">{([ ["all", "All"], ["attention", "Attention"], ["owner", "Merchant"], ["waiting", "Waiting"], ["completed", "Done"] ] as const).map(([id, text]) => <button key={id} type="button" className={filter === id ? "is-active" : ""} aria-pressed={filter === id} onClick={() => setFilter(id)}>{text}</button>)}</div>{filteredRuns.length ? <ol>{filteredRuns.map((run) => <li key={run.id}><button type="button" className={selected?.id === run.id ? "is-selected" : ""} onClick={() => setSelectedId(run.id)}><span className={`frops-badge frops-${tone(run.status)}`}>{statusLabels[run.status]}</span><b>{run.title}</b><p>{run.summary}</p><small>{run.id}</small><span className="frops-queue-time">{label(run.stage)} · {timeLabel(run.updatedAt)}</span></button></li>)}</ol> : <div className="frops-empty"><b>{runs.length ? "No runs in this filter" : "No server runs yet"}</b><p>{runs.length ? "Choose a different status to inspect another run." : "Start a merchant intent. Its requests, decisions, and disclosure snapshots will arrive here."}</p>{standalone && <Link prefetch={false} href="/">Open merchant app ↗</Link>}</div>}</aside>
      <main className="frops-detail" aria-live="polite">{selected ? <>
        <header className="frops-run-head"><div><span className="frops-eyebrow">{label(selected.category)} · {selected.intentId}</span><h3>{selected.title}</h3><p>{selected.summary}</p></div><span className={`frops-badge frops-${tone(selected.status)}`}>{statusLabels[selected.status]}</span></header>
        <div className="frops-ids"><span>Run <code>{selected.id}</code></span><span>Trace <code>{selected.traceId}</code></span><span>Version {selected.version} · {label(selected.stage)}</span></div>
        <div className={`frops-guard-banner frops-guard-${tone(selected.guardAction)}`}><span>Guard action</span><b>{label(selected.guardAction)}</b><p>{badChecks[0]?.detail ?? selected.summary}</p></div>
        <section className="frops-section"><h4>Original intent and current proposal</h4><div className="frops-compare"><div><h5>Merchant intent</h5><Facts data={selected.originalIntent}/></div><div><h5>Runtime action</h5><Facts data={selected.proposedAction}/></div></div>{selected.delta.length ? <DeltaTable runDelta={selected.delta}/> : <p className="frops-muted">No commercial intent delta is recorded at this stage.</p>}</section>
        <section className="frops-section"><h4>System and judge findings</h4>{selected.judge && <div className={`frops-judge frops-judge-${tone(selected.judge.decision)}`}><span className={`frops-badge frops-${tone(selected.judge.decision)}`}>{label(selected.judge.decision)}</span><div><b>{selected.judge.mode === "deterministic_document_scan" ? "Deterministic document instruction scan" : "Simulated LLM judge"}</b><p>{selected.judge.reason}</p><small>{selected.judge.mode === "deterministic_document_scan" ? "Source notes and line descriptions were scanned as untrusted data. No model call was made." : "Judge responses can add review or stop progress. Deterministic guard checks still apply."}</small></div></div>}<Checks checks={selected.checks}/>{flagEvents.length > 0 && <details className="frops-recorded-flags"><summary>{flagEvents.length} recorded findings and review requests</summary><ol>{flagEvents.map((event) => <li key={event.eventId}><b>{label(event.event)}</b><p>{event.summary}</p><small>#{event.seq} · {event.tool} · {timeLabel(event.at)} · Guard: {label(event.guardAction)}</small></li>)}</ol></details>}</section>
        {selected.latestResponse && <section className="frops-section"><h4>Latest external response</h4><div className="frops-response"><b>{selected.latestResponse.label}</b><p>{selected.latestResponse.summary}</p><small>{timeLabel(selected.latestResponse.receivedAt)} · {selected.latestResponse.requestId}</small><details><summary>Response data</summary><Facts data={selected.latestResponse.data}/></details></div></section>}
        <section className="frops-section"><h4>What the merchant was shown</h4><p className="frops-muted">These are the server snapshots tied to sign-off. A later response cannot rewrite an earlier disclosure.</p>{disclosures.length ? <div className="frops-disclosures">{[...disclosures].reverse().map((disclosure) => <details key={disclosure.id} open={disclosure.id === selected.currentDisclosure?.id}><summary><span>{label(disclosure.type)} · v{disclosure.version}</span><small>{disclosure.id === selected.currentDisclosure?.id ? "Current decision" : "Earlier disclosure"}</small></summary><Disclosure disclosure={disclosure} traces={traces}/></details>)}</div> : <div className="frops-inline-empty">This run has not requested merchant sign-off yet.</div>}</section>
        {requests.length > 0 && <section className="frops-section"><h4>Correlated external requests</h4><ol className="frops-requests">{requests.map((request) => <li key={request.id}><span className={`frops-badge frops-${request.status === "open" ? "amber" : "blue"}`}>{label(request.status)}</span><div><b>{request.title}</b><p>{request.summary}</p><small>{request.kind} · {request.id}</small><span>Expected data: {request.expectedDataTypes.map(label).join(", ") || "No data specified"}</span></div></li>)}</ol></section>}
        {selected.ledgerEffect && <section className="frops-section"><h4>Simulated ledger effect</h4><div className="frops-effect"><span className="frops-badge frops-green">One effect recorded</span><Facts data={selected.ledgerEffect}/></div></section>}
        <section className="frops-section"><h4>Trace and tool calls</h4><p className="frops-muted">Actor identities below are named demo roles. Events are correlated by run, trace, span, and request.</p>{traces.length ? <ol className="frops-timeline">{traces.map((trace) => <li key={trace.eventId}><div className="frops-trace-marker">{trace.seq}</div><article><header><div><b>{label(trace.event)}</b><span>{trace.tool}</span></div><span className={`frops-badge frops-${tone(trace.status)}`}>{label(trace.status)}</span></header><p>{trace.summary}</p><div className="frops-trace-meta"><span>{trace.actor.id} · {label(trace.actor.role)}</span><time>{timeLabel(trace.at)}</time><span>Guard: {label(trace.guardAction)}</span></div><details><summary>Span, intent delta, and evidence</summary><Facts data={{ eventId: trace.eventId, traceId: trace.traceId, spanId: trace.spanId, parentSpanId: trace.parentSpanId, requestId: trace.requestId, originalIntent: trace.originalIntent, proposedAction: trace.proposedAction, terms: trace.terms, delta: trace.delta, judge: trace.judge, merchantDisclosureId: trace.merchantDisclosure?.id ?? null, previousHash: trace.prevHash, hash: trace.hash }}/></details></article></li>)}</ol> : <div className="frops-inline-empty">No trace events recorded for this run yet.</div>}</section>
      </> : <div className="frops-detail-empty"><span>Request → response → guard → sign-off → outcome</span><h3>A decision trail starts with a merchant intent</h3><p>The live queue will show the guard&apos;s action and the exact information surfaced to the merchant whenever an approval is requested.</p></div>}</main></div>
    </div>
  </section>;
}
