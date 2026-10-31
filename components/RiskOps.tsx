"use client";

import { useEffect, useState } from "react";
import FlowRiskOps from "./FlowRiskOps";
import { displayCopy } from "../lib/ui-copy.js";
import "./RiskOps.css";

export type CaseDecision = "PASS" | "ESCALATE" | "BLOCK";

export type CaseRecord = {
  id: string;
  decision: CaseDecision;
  reasons: { code: string; message: string }[];
  checks: { id: string; status: string; detail: string }[];
  trace: { step: string | number; tool: string; status: string; details: unknown }[];
  evidenceHash: string;
  originalIntent: Record<string, unknown>;
  candidate: Record<string, unknown>;
  timestamp: string;
  title?: string;
  simulatorEventSeq?: number;
};

type RiskOpsProps = {
  cases: CaseRecord[];
  paused: boolean;
  onPauseChange: (paused: boolean) => void;
  onBack: () => void;
};

type CaseFilter = "all" | "attention" | "blocked" | "clear";
type ExecutionEvidence = {
  seq: number;
  timestamp: string;
  action?: { type?: string; simulator_event_seq?: number };
  guardResults?: { id: string; status: string; detail: string }[];
  reason?: string | null;
  outcome: string;
  hash: string;
};

function displayValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "Not set";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return new Intl.NumberFormat("en-IN").format(value);
  if (typeof value === "string") return displayCopy(value);
  if (Array.isArray(value)) return value.map(displayValue).join(", ");
  try {
    return displayCopy(JSON.stringify(value));
  } catch {
    return String(value);
  }
}

function readableToken(value: unknown): string {
  const raw = displayValue(value).replaceAll("_", " ");
  return raw === "Not set" ? raw : raw.charAt(0).toUpperCase() + raw.slice(1);
}

type ComparisonRow = { label: string; original: string; runtime: string; changed: boolean };

function comparisonRows(item: CaseRecord): ComparisonRow[] {
  const original = item.originalIntent ?? {};
  const candidate = item.candidate ?? {};
  const accountCheck = item.checks.find((check) => check.id === "verified_account");
  const verifiedAccount = accountCheck?.detail.match(/verified account\s+([A-Z0-9·*]+)/i)?.[1]
    ?? accountCheck?.detail.match(/supplier account\s+([A-Z0-9·*]+)/i)?.[1];
  const rows: { label: string; source: unknown; observed: unknown; format: (value: unknown) => string; forceChange?: boolean }[] = [
    { label: "Purpose", source: original.purpose, observed: candidate.purpose, format: readableToken },
    { label: "Supplier", source: original.supplierId, observed: candidate.supplierId, format: readableToken },
    { label: "Beneficiary name", source: candidate.beneficiaryName ? "Gupta Distributors" : undefined, observed: candidate.beneficiaryName, format: displayValue },
    { label: "Item", source: original.sku, observed: candidate.sku, format: readableToken },
    { label: "Quantity", source: original.units, observed: candidate.units, format: (value) => `${displayValue(value)} boxes` },
    { label: "Supplier credit", source: original.targetCreditDays, observed: candidate.creditDays, format: (value) => `${displayValue(value)} days` },
    { label: "Buyback of unsold", source: original.targetBuybackPercent, observed: candidate.buybackPercent, format: (value) => `${displayValue(value)}%` },
    { label: "Payee account", source: verifiedAccount, observed: candidate.supplierAccount, format: displayValue, forceChange: accountCheck ? toneFor(accountCheck.status) === "blocked" : undefined },
  ];
  return rows
    .filter((row) => row.source !== undefined || row.observed !== undefined)
    .map((row) => {
      const source = row.source === undefined ? "Not stated" : row.format(row.source);
      const observed = row.observed === undefined ? "Not stated" : row.format(row.observed);
      return {
        label: row.label,
        original: source,
        runtime: observed,
        changed: row.forceChange ?? (row.source !== undefined && row.observed !== undefined && source !== observed),
      };
    });
}

function TraceDetails({ details }: { details: unknown }) {
  if (details && typeof details === "object" && !Array.isArray(details)) {
    return (
      <dl className="rops-trace-facts">
        {Object.entries(details as Record<string, unknown>).filter(([key]) => key !== "synthetic").slice(0, 6).map(([key, value]) => (
          <div key={key}><dt>{readableToken(key)}</dt><dd>{displayValue(value)}</dd></div>
        ))}
      </dl>
    );
  }
  return <p>{displayValue(details)}</p>;
}

function toneFor(status: string): "clear" | "attention" | "blocked" {
  const normalized = status.toUpperCase();
  if (["BLOCK", "BLOCKED", "FAIL", "FAILED", "ERROR"].includes(normalized)) return "blocked";
  if (["ESCALATE", "ESCALATED", "NEEDS_OWNER", "WARN", "WARNING"].includes(normalized)) {
    return "attention";
  }
  return "clear";
}

function decisionCopy(decision: CaseDecision): string {
  if (decision === "BLOCK") return "Blocked by policy";
  if (decision === "ESCALATE") return "Needs merchant review";
  return "Intent matched";
}

function caseTitle(item: CaseRecord): string {
  for (const value of [item.title, item.candidate?.displayName, item.candidate?.summary]) {
    if (typeof value === "string" && value.trim()) return displayCopy(value);
  }
  return "Supplier action check";
}

function formatTime(timestamp: string): string {
  if (!timestamp) return "Demo time unavailable";
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return timestamp;
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default function RiskOps({ cases, paused, onPauseChange, onBack }: RiskOpsProps) {
  const [filter, setFilter] = useState<CaseFilter>("all");
  const [selection, setSelection] = useState<{ headId: string | null; caseId: string | null }>({ headId: null, caseId: null });
  const [executionEvidence, setExecutionEvidence] = useState<ExecutionEvidence[] | null>(null);
  const [chainCheck, setChainCheck] = useState<{ ok: boolean; first_broken_seq: number | null } | null>(null);
  const [chainError, setChainError] = useState("");
  const [observedPause, setObservedPause] = useState<boolean | null>(null);
  useEffect(() => {
    let active = true;
    let inFlight = false;
    const load = () => {
      if (inFlight) return;
      inFlight = true;
      Promise.all([fetch("/api/evidence?scope=legacy", { cache: "no-store" }), fetch("/api/evidence/verify?scope=legacy", { cache: "no-store" }), fetch("/api/control/pause", { cache: "no-store" })])
        .then(async ([entriesResponse, checkResponse, pauseResponse]) => {
          if (!entriesResponse.ok || !checkResponse.ok || !pauseResponse.ok) throw new Error("The server evidence chain could not load.");
          const entriesData = await entriesResponse.json() as { entries: ExecutionEvidence[] };
          const checkData = await checkResponse.json() as { ok: boolean; first_broken_seq: number | null };
          const pauseData = await pauseResponse.json() as { paused: boolean };
          if (active) { setExecutionEvidence(entriesData.entries); setChainCheck(checkData); setObservedPause(pauseData.paused); setChainError(""); }
        })
        .catch(() => { if (active) setChainError("The server evidence chain could not load."); })
        .finally(() => { inFlight = false; });
    };
    const initial = window.setTimeout(load, 0);
    const timer = window.setInterval(load, 1000);
    return () => { active = false; window.clearTimeout(initial); window.clearInterval(timer); };
  }, []);
  const effectivePaused = observedPause ?? paused;
  const headId = cases[0]?.id ?? null;
  const selectedId = selection.headId === headId ? selection.caseId : headId;
  const filteredCases = cases.filter((item) => {
    if (filter === "all") return true;
    if (filter === "attention") return item.decision === "ESCALATE";
    if (filter === "blocked") return item.decision === "BLOCK";
    return item.decision === "PASS";
  });
  const selected = filteredCases.find((item) => item.id === selectedId) ?? filteredCases[0];
  const attentionCount = cases.filter((item) => item.decision === "ESCALATE").length;
  const blockedCount = cases.filter((item) => item.decision === "BLOCK").length;
  const clearCount = cases.filter((item) => item.decision === "PASS").length;

  const rows = selected ? comparisonRows(selected) : [];
  const selectedActionEntry = selected?.simulatorEventSeq
    ? executionEvidence?.filter(entry => entry.action?.simulator_event_seq === selected.simulatorEventSeq).at(-1)
    : undefined;
  const selectedActionIssue = selectedActionEntry?.guardResults?.find(check => check.status !== "PASS");

  return (
    <section className="rops-shell" aria-label="PayTMunim RiskOps">
      <header className="rops-masthead">
        <div className="rops-brand-lockup">
          <span className="rops-brand-mark" aria-hidden="true"><span /><span /><span /></span>
          <span className="rops-brand-name">PayTMunim <strong>RiskOps</strong></span>
          <span className="rops-demo-tag">Demo</span>
        </div>
        <div className="rops-masthead-actions">
          <button className="rops-link-button" type="button" onClick={onBack}>
            <span aria-hidden="true">←</span> Merchant view
          </button>
          <button
            className={`rops-pause-button ${effectivePaused ? "is-paused" : ""}`}
            type="button"
            onClick={() => onPauseChange(!effectivePaused)}
            aria-pressed={effectivePaused}
          >
            {effectivePaused ? "Resume demo checks" : "Pause demo checks"}
          </button>
        </div>
      </header>

      <FlowRiskOps/>

      <div className="rops-page">
        <div className="rops-intro">
          <div>
            <p className="rops-context">Sharma General Stores / delegated supplier actions</p>
            <h1>Historical single-step checks</h1>
            <p>Read-only diagnostics from the retired single-step demo. Tracked requests, disclosures and money outcomes are shown in the live workflow dashboard above.</p>
          </div>
          <div className={`rops-delegate-state ${effectivePaused ? "is-paused" : ""}`} role="status" aria-live="polite">
            <span className="rops-state-dot" />
            <div>
              <strong>{effectivePaused ? "Demo-session pause is on" : "Demo checks active"}</strong>
              <span>{effectivePaused ? "Future checks in this demo server session are paused" : "Future checks in this demo server session can run"}</span>
            </div>
          </div>
        </div>

        <div className="rops-ledger-heading">
          <h2>Historical supplier intent checks</h2>
          <p>{cases.length} checked · {attentionCount + blockedCount} need attention</p>
        </div>

        <section className="rops-server-evidence" aria-label="Server evidence chain">
          <div><strong>Historical action evidence chain</strong><p>Read-only checks from the retired single-step runtime. Public execution through that endpoint is disabled. This chain is held in server memory and has no external audit anchor.</p></div>
          <div className="rops-server-evidence-status" role="status">
            {chainError || (chainCheck ? chainCheck.ok ? `Verified · ${executionEvidence?.length ?? 0} attempts` : `Broken at entry ${chainCheck.first_broken_seq ?? "unknown"}` : "Checking chain…")}
          </div>
          {executionEvidence && executionEvidence.length > 0 && <ol>
            {executionEvidence.slice(-5).reverse().map(entry => <li key={entry.seq}>
              <span>#{entry.seq} · {entry.action?.type?.replaceAll("_", " ") || "action"}</span>
              <b>{entry.outcome.replaceAll("-", " ")}</b>
              <code>{entry.hash.slice(0, 18)}…</code>
            </li>)}
          </ol>}
        </section>

        <div className="rops-workspace">
          <aside className="rops-queue" aria-label="Case queue">
            <div className="rops-filter-row" role="group" aria-label="Filter cases">
              {([
                ["all", "All", cases.length],
                ["attention", "Review", attentionCount],
                ["blocked", "Blocked", blockedCount],
                ["clear", "Clear", clearCount],
              ] as const).map(([key, label, count]) => (
                <button
                  key={key}
                  type="button"
                  className={`rops-filter ${filter === key ? "is-active" : ""}`}
                  onClick={() => setFilter(key)}
                  aria-pressed={filter === key}
                >
                  {label} <span>{count}</span>
                </button>
              ))}
            </div>

            <div className="rops-case-list">
              {filteredCases.length === 0 ? (
                <div className="rops-queue-empty">
                  <strong>{cases.length ? "No cases in this filter" : "No actions checked yet"}</strong>
                  <p>{cases.length ? "Choose another case status." : "Run a supplier proposal from the merchant view to create a case."}</p>
                  {!cases.length && <button type="button" onClick={onBack}>Open merchant view</button>}
                </div>
              ) : (
                filteredCases.map((item) => {
                  const tone = toneFor(item.decision);
                  return (
                    <button
                      className={`rops-case-row is-${tone} ${selected?.id === item.id ? "is-selected" : ""}`}
                      type="button"
                      key={item.id}
                      onClick={() => setSelection({ headId, caseId: item.id })}
                      aria-current={selected?.id === item.id ? "true" : undefined}
                    >
                      <span className="rops-case-row-top"><span className={`rops-status-dot is-${tone}`} />{decisionCopy(item.decision)}</span>
                      <strong>{caseTitle(item)}</strong>
                      {typeof item.candidate?.summary === "string" && <span className="rops-case-summary">{displayCopy(item.candidate.summary)}</span>}
                      <span className="rops-case-meta"><span>{item.id}</span><span>{formatTime(item.timestamp)}</span></span>
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          <main className="rops-case-detail" aria-label="Selected case">
            {!selected ? (
              <div className="rops-detail-empty">
                <div className="rops-empty-art" aria-hidden="true"><span /><span /><span /></div>
                <h3>Every delegated action leaves a trace here</h3>
                <p>Check a proposal in the merchant flow, then return to inspect the intent comparison and guard decision.</p>
                <button type="button" onClick={onBack}>Run a merchant scenario</button>
              </div>
            ) : (
              <>
                <div className="rops-detail-header">
                  <div>
                    <p className="rops-context">Case {selected.id} / {formatTime(selected.timestamp)}</p>
                    <h3>{caseTitle(selected)}</h3>
                  </div>
                  <span className={`rops-decision is-${toneFor(selected.decision)}`}>{decisionCopy(selected.decision)}</span>
                </div>

                <div className="rops-explanation" role="status">
                  <span className={`rops-explanation-rail is-${toneFor(selected.decision)}`} />
                  <div>
                    <strong>{selected.decision === "PASS" ? "The supplier reply matched the merchant's intent; payment still needs the final server guard." : selected.decision === "ESCALATE" ? "The proposed terms need the merchant." : "A hard rule stopped this action."}</strong>
                    <p>{displayCopy(selected.reasons[0]?.message || (selected.decision === "PASS" ? "No divergence was found in this check." : "Inspect the checks below for the reason."))}</p>
                  </div>
                </div>
                {selectedActionEntry && <div className="rops-linked-action" role="status">
                  <strong>Final server action: {selectedActionEntry.outcome.replaceAll("-", " ")}</strong>
                  <span>{displayCopy(selectedActionIssue?.detail || selectedActionEntry.reason || "See the server evidence chain for the final guard and execution outcome.")}</span>
                </div>}

                <section className="rops-section rops-compare-section" aria-labelledby="rops-compare-title">
                  <div className="rops-section-heading">
                    <h4 id="rops-compare-title">Original intent vs runtime action</h4>
                    <span>Merchant mandate / agent proposal</span>
                  </div>
                  <div className="rops-brief-row">
                    <div><span>Merchant&apos;s brief</span><p>{displayValue(selected.originalIntent?.explanation ?? selected.originalIntent?.goal)}</p>{selected.originalIntent?.source ? <small>{displayValue(selected.originalIntent.source)}</small> : null}</div>
                    <div><span>Supplier reply · simulated</span><p>{displayValue(selected.candidate?.supplierMessage)}</p></div>
                  </div>
                  <div className="rops-compare-head"><span>Merchant goal or mandate</span><span>Agent attempted</span></div>
                  {rows.length ? rows.map((row) => (
                    <div className={`rops-compare-row ${row.changed ? "has-delta" : ""}`} key={row.label}>
                      <span className="rops-field-name">{row.label}</span>
                      <span className="rops-field-value">{row.original}</span>
                      <span className="rops-field-value">{row.runtime}</span>
                      {row.changed && <span className="rops-delta-word">Changed</span>}
                    </div>
                  )) : <p className="rops-no-data">Structured intent fields are unavailable for this case.</p>}
                </section>

                <div className="rops-lower-grid">
                  <section className="rops-section" aria-labelledby="rops-checks-title">
                    <div className="rops-section-heading"><h4 id="rops-checks-title">Guard checks</h4><span>{selected.checks.length} evaluated</span></div>
                    <ol className="rops-check-list">
                      {selected.checks.map((check, index) => (
                        <li key={`${check.id}-${index}`}>
                          <span className={`rops-check-symbol is-${toneFor(check.status)}`} aria-hidden="true">{toneFor(check.status) === "clear" ? "✓" : toneFor(check.status) === "blocked" ? "×" : "!"}</span>
                          <div><strong>{check.id}</strong><p>{displayCopy(check.detail)}</p></div>
                          <span className={`rops-check-status is-${toneFor(check.status)}`}>{check.status.replaceAll("_", " ").toLowerCase()}</span>
                        </li>
                      ))}
                      {!selected.checks.length && <li className="rops-no-data">No check details were returned.</li>}
                    </ol>
                  </section>

                  <section className="rops-section" aria-labelledby="rops-trace-title">
                    <div className="rops-section-heading"><h4 id="rops-trace-title">Execution trace</h4><span>Tools and decisions</span></div>
                    <ol className="rops-trace-list">
                      {selected.trace.map((event, index) => (
                        <li key={`${event.step}-${index}`}>
                          <span className="rops-trace-index">{String(index + 1).padStart(2, "0")}</span>
                          <div><strong>{event.tool || `Step ${event.step}`}</strong><TraceDetails details={event.details} /></div>
                          <span className={`rops-trace-state is-${toneFor(event.status)}`}>{event.status.replaceAll("_", " ").toLowerCase()}</span>
                        </li>
                      ))}
                      {!selected.trace.length && <li className="rops-no-data">No tool trace was returned.</li>}
                    </ol>
                  </section>
                </div>

                <div className="rops-evidence">
                  <div><strong>Evidence fingerprint</strong><p>Hash of this check. This demo does not provide an externally anchored audit log.</p></div>
                  <code>{selected.evidenceHash || "Not available"}</code>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
