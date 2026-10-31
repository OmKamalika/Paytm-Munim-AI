"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, ArrowLeft, ArrowRight, BadgeCheck, Bell, Check, CheckCircle2, ChevronRight, CircleAlert, FileText, Handshake, Home, Info, Landmark, LockKeyhole, RotateCcw, ShieldCheck, Sparkles, Store, Wallet } from "lucide-react";
import RiskOps, { type CaseRecord } from "../components/RiskOps";
import { Activity, ArrowLeft, ArrowRight, BadgeCheck, Bell, CheckCircle2, ChevronRight, CircleAlert, FileText, Handshake, Home, Info, Landmark, RotateCcw, ShieldCheck, Sparkles, Store, Wallet } from "lucide-react";
import FlowRiskOps from "../components/FlowRiskOps";
import FlowMerchant from "../components/FlowMerchant";

type Screen = "home" | "plan" | "munim" | "supplier" | "mandate" | "guard" | "capital" | "data" | "evidence";
type Cash = {
  business: { name: string; owner: string; outlets: string[] };
  homePaytmToday: { totalInr: number; outlets: { outlet: string; amountInr: number }[] };
  monthlyAllChannelCollectionsInr: number; existingMonthlyEmiInr: number; sourceNote: string;
  cashPlan: { label: string; dailyBalanceNote: string;
    anchors: { firstNegativeDate: string; lowestDate: string; lowestBalanceInr: number; recoveryAboveZeroDate: string };
    dailyBalanceSeries?: { date: string; balanceInr: number; inflowForecastInr: number; knownOutflowsInr: number }[] | null;
    outflows: { id: string; date: string; payee: string; amountInr: number; quality: string; status?: string; invoiceId?: string; deferredFrom?: string; outletSplit?: { outlet: string; amountInr: number }[] }[];
    afterHorizon?: { id: string; date: string; payee: string; amountInr: number; invoiceId?: string; note?: string }[];
    appliedRelief?: { id: string; type: string; label: string }[];
    pendingActions?: { id: string; type: string; amountInr: number; label: string }[];
  };
};
type Option = { id: string; rank: number; title: string; costLabel: string; amountInr?: number; destinationAccountMasked?: string; conditions: string[]; accepted?: boolean; calculated?: boolean; effectOn5Nov: { balanceInr: number | null; note?: string } };
type Options = { basis: string; options: Option[]; recommendation?: { status: string; text: string } };
type Lender = { id: string; name: string; type: string; aprPercent: number; tenorMonths: number; emiInr: number; totalInterestInr: number; totalMonthlyEmiInr: number; underCap: boolean; earlyRepayment?: { afterDays: number; estimatedInterestInr: number } };
type Lenders = { scheduleLabel: string; emiCap: { monthlyCollectionsInr: number; existingMonthlyEmiInr: number; percentage: number; maxTotalMonthlyEmiInr: number }; offers: Lender[] };
type Session = { sessionId: string; sessionStartedAt: string; revision: number; paused: boolean };
type Entry = { seq: number; timestamp: string; actor?: string; outcome?: string; event?: string; summary?: string; ledgerRef?: string | null; disclosure?: { id: string; version: number; hash: string; type: string } | null; hash?: string };
type Verification = { ok: boolean; first_broken_seq?: number | null };
type DataSummary = {
  synthetic: boolean;
  asOf: string;
  sources: Record<string, unknown>;
  outlets: { id: string; name: string; paytmToday: number; paytmAverageMonthly: number; averageMonthlyAllChannelCollections: number; diwaliWeek2025Multiplier: number; monthlyTarget: number }[];
  supplier: { id: string; name: string; priorFyDebitCount: number; priorFyDebitTotal: number; derivedLimit: number; limitRule: string; aaAvailable: boolean; sourceLabel: string; completeFinancialYear: boolean; missingPeriod: string | null };
  invoice: { number: string; amount: number; verifiedAccountLast4: string; hasFullBody: boolean; integrity: string };
  procurement?: { description: string; productsInDocuments: number; sample: { description: string; unit: string; purchasedQuantityFromDocuments: number; invoiceRows: string[] }[] };
};
type ForecastDay = {
  date: string; pointInr: number; lowInr: number; highInr: number; label: "estimate";
  components: { weekdayBaselineInr: number; trendFactor: number; festivalFactor: number };
};
type ForecastOutlet = {
  id: string; name: string; historyDays: number; trendFactor: number;
  festivalUplift: { factor: number; source: string };
  days: ForecastDay[];
  total: { pointInr: number; lowInr: number; highInr: number };
};
type OutletForecast = {
  synthetic: true; modelVersion: string;
  window: { from: string; to: string };
  source: { table: string; channel: string; through: string; partialDayExcluded: string; sourceHash: string };
  rangeLabel: string;
  outlets: ForecastOutlet[];
};
type StockInput = { outletId: string; skuLabel: string; priceInr: string; revenueSharePercent: string; unitsOnHand: string; coverageDays: string };
type StockCoverage = {
  synthetic: true; label: string; modelVersion: string;
  outlet: { id: string; name: string }; skuLabel?: string;
  horizon: { from: string; to: string; coverageDays: number };
  assumptions: { priceInr: number; revenueSharePercent: number; unitsOnHand: number; coverageDays: number };
  estimatedDemandUnits: { low: number; point: number; high: number };
  gapsUnits: { low: number; point: number; high: number };
  state: "likely_shortage" | "possible_surplus" | "monitor";
  recommendedReviewUnits: number;
  explanation: string;
};

const money = (n?: number | null) => typeof n === "number" ? (n < 0 ? "−" : "") + "₹" + new Intl.NumberFormat("en-IN").format(Math.abs(n)) : "Not supplied";
const dateLabel = (s?: string) => {
  if (!s) return "Not supplied";
  const d = new Date(s + "T12:00:00+05:30");
  return Number.isNaN(d.getTime()) ? s : new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", timeZone: "Asia/Kolkata" }).format(d);
};
async function get<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const data = await response.json() as T & { error?: string; reason?: string; outcome?: string };
  if (!response.ok && !data.outcome) throw new Error(data.error || data.reason || "Demo service unavailable");
  return data;
}
const body = (value: unknown): RequestInit => ({ method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(value) });
const labels = { home: "Sharma General Stores", plan: "Cash plan preview", munim: "Ask Munim AI", supplier: "Supplier terms", mandate: "Your delegation", guard: "Intent Guard", capital: "Capital", data: "Your data", evidence: "Evidence" };
const Pill = ({ children, tone = "blue" }: { children: React.ReactNode; tone?: string }) => <span className={"pm-pill pm-pill-" + tone}>{children}</span>;
const Heading = ({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) => <div className="pm-section-head"><h2>{title}</h2>{action && <button type="button" onClick={onAction}>{action}<ChevronRight size={16}/></button>}</div>;

function AnchorChart({ cash }: { cash: Cash | null }) {
  const a = cash?.cashPlan.anchors;
  const daily = cash?.cashPlan.dailyBalanceSeries || [];
  const first = daily.find(item => item.date === a?.firstNegativeDate)?.balanceInr;
  const recovered = daily.find(item => item.date === a?.recoveryAboveZeroDate)?.balanceInr;
  return <div className="pm-chart pm-anchor-chart" role="img" aria-label={`First negative on ${dateLabel(a?.firstNegativeDate)} at ${money(first)}, projected low ${money(a?.lowestBalanceInr)} on ${dateLabel(a?.lowestDate)}, back above zero on ${dateLabel(a?.recoveryAboveZeroDate)} at ${money(recovered)}.`}>
    <div><span>{dateLabel(a?.firstNegativeDate)}</span><b>{typeof first === "number" ? money(first) : "Below ₹0"}</b><small>First negative</small></div>
    <div className="low"><span>{dateLabel(a?.lowestDate)}</span><b>{money(a?.lowestBalanceInr)}</b><small>Projected low</small></div>
    <div><span>{dateLabel(a?.recoveryAboveZeroDate)}</span><b>{typeof recovered === "number" ? money(recovered) : "Above ₹0"}</b><small>Back above zero</small></div>
  </div>;
}

export default function HomePage() {
  const [mode, setMode] = useState<"merchant" | "riskops">("merchant");
  const [screen, setScreen] = useState<Screen>("home");
  const [cash, setCash] = useState<Cash | null>(null);
  const [options, setOptions] = useState<Options | null>(null);
  const [lenders, setLenders] = useState<Lenders | null>(null);
  const [dataSummary, setDataSummary] = useState<DataSummary | null>(null);
  const [outletForecast, setOutletForecast] = useState<OutletForecast | null>(null);
  const [forecastError, setForecastError] = useState("");
  const [stockInput, setStockInput] = useState<StockInput>({ outletId: "", skuLabel: "", priceInr: "", revenueSharePercent: "", unitsOnHand: "", coverageDays: "" });
  const [stockResult, setStockResult] = useState<StockCoverage | null>(null);
  const [stockError, setStockError] = useState("");
  const [stockBusy, setStockBusy] = useState(false);
  const [paused, setPaused] = useState(false);
  const [question, setQuestion] = useState("Diwali ke liye paisa kahan se aayega?");
  const [answer, setAnswer] = useState("");
  const [focusTask, setFocusTask] = useState(0);
  const [whatIf, setWhatIf] = useState(false);
  const [selectedLender, setSelectedLender] = useState("A");
  const [taskBusy, setTaskBusy] = useState(false);
  const [resetNotice, setResetNotice] = useState(false);
  const [online, setOnline] = useState(true);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [verification, setVerification] = useState<Verification | null>(null);
  const [error, setError] = useState("");

  async function refreshPlan() {
    try {
      const [c, o, d] = await Promise.all([get<Cash>("/api/cashplan"), get<Options>("/api/options"), get<DataSummary>("/api/data-summary")]);
      setCash(c); setOptions(o); setDataSummary(d);
    } catch (e) { setError(e instanceof Error ? e.message : "The cash plan could not refresh."); }
  }
  // Ask Munim answers from the server's scripted dialogue over the same
  // calculated plan and action history (not a language model).
  async function ask(text: string) {
    try {
      const reply = await get<{ text: string }>("/api/munim", body({ question: text }));
      setAnswer(reply.text);
    } catch (e) { setError(e instanceof Error ? e.message : "Munim could not answer."); }
  }
  useEffect(() => {
    // Re-answer when the plan changes so the reply never describes an old state.
    if (screen !== "munim") return;
    let active = true;
    get<{ text: string }>("/api/munim", body({ question })).then(reply => { if (active) setAnswer(reply.text); }).catch(() => {});
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, cash]);
  async function refreshEvidence() {
    try {
      const [log, checked] = await Promise.all([get<{ entries: Entry[] }>("/api/evidence"), get<Verification>("/api/evidence/verify")]);
      setEntries(log.entries || []); setVerification(checked);
    } catch (e) { setVerification(null); setError(e instanceof Error ? e.message : "Evidence unavailable."); }
  }
  useEffect(() => {
    get<Lenders>("/api/lenders").then(setLenders).catch(() => setError("Lender comparison could not load."));
    get<OutletForecast>("/api/outlet-forecast").then(setOutletForecast)
      .catch(e => setForecastError(e instanceof Error ? e.message : "Outlet forecast could not load."));
  }, []);
  // One session poll keeps Home, Plan, options and Evidence on the server's
  // current action history, and notices a server restart (new session id).
  useEffect(() => {
    let active = true;
    let known: Session | null = null;
    const tick = async () => {
      try {
        const next = await get<Session>("/api/session");
        if (!active) return;
        setOnline(true); setPaused(next.paused);
        if (known && known.sessionId !== next.sessionId) {
          setResetNotice(true); setScreen("home"); setEntries([]); setVerification(null);
        }
        if (!known || known.sessionId !== next.sessionId || known.revision !== next.revision) {
          known = next;
          await Promise.all([refreshPlan(), refreshEvidence()]);
        }
      } catch { if (active) setOnline(false); }
    };
    void tick();
    const timer = window.setInterval(() => { void tick(); }, 2000);
    const connectivity = () => setOnline(navigator.onLine);
    window.addEventListener("online", connectivity); window.addEventListener("offline", connectivity);
    return () => { active = false; window.clearInterval(timer); window.removeEventListener("online", connectivity); window.removeEventListener("offline", connectivity); };
  }, []);
  const choices = useMemo(() => [...(options?.options || [])].sort((a, b) => a.rank - b.rank), [options]);
  const drawdown = choices.find(item => item.id === "drawdown");
  const gupta = cash?.cashPlan.outflows.find(item => item.id === "gupta");
  const anchors = cash?.cashPlan.anchors;
  const covered = typeof anchors?.lowestBalanceInr === "number" && anchors.lowestBalanceInr >= 0;
  const aaReleased = Boolean(dataSummary?.supplier?.aaAvailable);
  // Every supplier and capital action starts as a tracked task: correlated
  // requests, disclosure, PIN, fenced rail instruction and journal.
  async function startTask(intentId: "supplier_stock" | "supplier_header_review" | "capital_standard" | "capital_extended") {
    setTaskBusy(true); setError("");
    try {
      const response = await fetch("/api/flows/start", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ intentId }) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "The task could not start.");
      setScreen("munim"); setFocusTask(value => value + 1);
    } catch (e) { setError(e instanceof Error ? e.message : "The task could not start."); }
    finally { setTaskBusy(false); }
  }
  function updateStockField(field: keyof StockInput, value: string) {
    setStockInput(previous => ({ ...previous, [field]: value }));
    setStockResult(null);
    setStockError("");
  }
  async function checkStock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStockResult(null);
    setStockError("");
    if (!outletForecast || !stockInput.outletId || !stockInput.priceInr ||
      !stockInput.revenueSharePercent || !stockInput.unitsOnHand || !stockInput.coverageDays) {
      setStockError("Choose an outlet and enter a price, estimated revenue share, units on hand, and festival days to cover.");
      return;
    }
    setStockBusy(true);
    try {
      const result = await get<StockCoverage>("/api/stock-coverage", body({
        outletId: stockInput.outletId,
        skuLabel: stockInput.skuLabel.trim() || undefined,
        priceInr: Number(stockInput.priceInr),
        revenueSharePercent: Number(stockInput.revenueSharePercent),
        unitsOnHand: Number(stockInput.unitsOnHand),
        coverageDays: Number(stockInput.coverageDays),
      }));
      setStockResult(result);
    } catch (e) {
      setStockError(e instanceof Error ? e.message : "Stock coverage could not be checked.");
    } finally { setStockBusy(false); }
  }
  function choose(item: Option) {
    if (item.id === "supplier_deferral") setScreen("supplier");
    else if (item.id === "drawdown") setScreen("capital");
    else setWhatIf(true);
  }
  function resetView() {
    setMode("merchant"); setScreen("home"); setQuestion("Diwali ke liye paisa kahan se aayega?");
    setAnswer(""); setWhatIf(false); setSelectedLender("A"); setError(""); setResetNotice(false);
  }
  function back() {
    const previous: Partial<Record<Screen, Screen>> = { plan: "home", munim: "home", supplier: "plan", mandate: "supplier", guard: "munim", capital: "plan", data: "home", evidence: "home" };
    setScreen(previous[screen] || "home");
  }
  if (mode === "riskops") return <main className="pm-riskops-mode"><button type="button" className="pm-secondary" onClick={() => setMode("merchant")}><ArrowLeft size={17}/>Back to merchant app</button><FlowRiskOps/></main>;
  return <main className="pm-shell">
    <aside className="pm-side" aria-label="Demo navigation">
      <div className="pm-side-brand"><span>paytm</span><small>for Business</small><strong>Munim</strong></div>
      <p>A merchant decision, from early warning to a guarded action.</p>
      <nav>{(["home", "plan", "capital", "guard", "evidence"] as Screen[]).map((item, index) => <button type="button" key={item} className={screen === item ? "active" : ""} onClick={() => setScreen(item)}><i>{index + 1}</i><span><b>{labels[item]}</b><small>{item === "evidence" ? "Verify chain" : "Review demo"}</small></span></button>)}</nav>
      <div className="pm-side-foot"><Pill>Synthetic demo</Pill><span>Fixture date: 30 Oct 2026</span></div>
    </aside>
    <section className="pm-stage">
      <header className="pm-stage-head"><div><p>PayTMunim / Demo journey</p><h1>Give the owner a plan. Keep the mandate in control.</h1></div><div>
        <button type="button" className="pm-quiet" onClick={resetView}><RotateCcw size={16}/>Restart view</button>
        <button type="button" className="pm-risk-button" onClick={() => setMode("riskops")}><ShieldCheck size={17}/>RiskOps view</button>
      </div></header>
      <div className="pm-phone" aria-label="Merchant app">
        <div className="pm-statusbar"><span>9:41</span><span>●●● ▰</span></div>
        <header className="pm-app-head"><div>{screen !== "home" && <button type="button" aria-label="Back" onClick={back}><ArrowLeft size={22}/></button>}{screen === "home" ? <span className="pm-logo">paytm <small>for Business</small></span> : <strong>{labels[screen]}</strong>}</div><button type="button" aria-label="Open evidence" onClick={() => setScreen("evidence")}><Bell size={19}/>{entries.length > 0 && <i/>}</button></header>
        <div className="pm-synthetic"><span/>Synthetic demo data - nothing here is real.<em>30 Oct 2026</em></div>
        <div className="pm-scroll" key={screen}>
          {error && <div className="pm-error" role="alert"><CircleAlert size={17}/>{error}<button type="button" aria-label="Dismiss" onClick={() => setError("")}>×</button></div>}
          {paused && <div className="pm-hold" role="status"><CircleAlert size={18}/><span><b>RiskOps has paused demo checks</b><small>No task can advance or pay until RiskOps resumes.</small></span></div>}
          {!online && <div className="pm-hold" role="status"><CircleAlert size={18}/><span><b>Offline · nothing is being sent</b><small>The demo server cannot be reached. Approvals and payments are disabled until the connection returns; the screen will refresh from the server then.</small></span></div>}
          {resetNotice && <div className="pm-hold" role="status"><CircleAlert size={18}/><span><b>The demo server restarted</b><small>Earlier tasks, approvals, payments and evidence from that session are gone. Nothing shown here is from before the restart.</small></span><button type="button" onClick={() => setResetNotice(false)}>OK</button></div>}
          {screen === "home" && <div className="pm-screen">
            <p className="pm-greeting">Good evening, {cash?.business.owner || "Rakesh"}</p>
            <button type="button" className="pm-ask" onClick={() => setScreen("munim")}><span><Sparkles size={22}/></span><b>Ask Munim AI<small>“Diwali ke liye paisa kahan se aayega?”</small></b><ArrowRight size={18}/></button>
            <div className="pm-gap"><div className="pm-gap-top"><span><Activity size={16}/>Upcoming payout planning</span><Pill tone="amber">Projected</Pill></div>{covered ? <p>Cash stays above zero · lowest on <b>{dateLabel(anchors?.lowestDate)}</b></p> : <p>Cash may run short on <b>{dateLabel(anchors?.lowestDate)}</b></p>}<strong>{money(anchors?.lowestBalanceInr)}</strong><div className="pm-gap-notes"><span>{cash?.cashPlan.pendingActions?.length ? "A payment is pending reconciliation" : cash?.cashPlan.appliedRelief?.length ? "Includes completed relief" : "Gupta stock · rent · bonus"}</span><span>{covered ? "All outlets · one account" : "Above zero on " + dateLabel(anchors?.recoveryAboveZeroDate)}</span></div><button type="button" className="pm-primary" onClick={() => setScreen("plan")}>Review relief options &amp; scenarios<ArrowRight size={18}/></button></div>
            <Heading title="Today on Paytm" action="See sources" onAction={() => setScreen("data")}/>
            <div className="pm-today"><strong>{money(cash?.homePaytmToday.totalInr)}</strong><small>Collections to 12:40 pm · synthetic Paytm-only sample</small><div>{cash?.homePaytmToday.outlets.map(item => <span key={item.outlet}>{item.outlet} <b>{money(item.amountInr)}</b></span>)}</div></div>
            <button type="button" className="pm-row" onClick={() => setScreen("data")}><span className="pm-row-icon pm-green-bg"><Store size={19}/></span><span><b>How each outlet is doing</b><small>Payment pace and last Diwali&apos;s demand signal</small></span><ChevronRight size={18}/></button>
            <Heading title="Needs your attention" action="View all" onAction={() => setScreen("evidence")}/>
            <button type="button" className="pm-row" onClick={() => setScreen("munim")}><span className="pm-row-icon"><ShieldCheck size={19}/></span><span><b>Delegate and track a task</b><small>Supplier negotiation, evidence, and capital consent</small></span><ChevronRight size={18}/></button>
            <button type="button" className="pm-row" onClick={() => setScreen("supplier")}><span className="pm-row-icon"><Handshake size={19}/></span><span><b>Supplier terms</b><small>Ask Gupta to defer or split GD-1182</small></span><ChevronRight size={18}/></button>
            <button type="button" className="pm-row" onClick={() => setScreen("supplier")}><span className="pm-row-icon"><Handshake size={19}/></span><span><b>Supplier terms</b><small>Negotiate GD-1182 as a tracked task</small></span><ChevronRight size={18}/></button>
            <button type="button" className="pm-row" onClick={() => setScreen("data")}><span className="pm-row-icon pm-green-bg"><BadgeCheck size={19}/></span><span><b>Sources and gaps</b><small>See what is supplied and missing</small></span><ChevronRight size={18}/></button>
            <button type="button" className="pm-capital-tile" onClick={() => setScreen("capital")}><Landmark size={20}/><span><b>Capital when you need it</b><small>Compare offers · drawdown runs as a tracked task</small></span><ChevronRight size={18}/></button>
          </div>}
          {screen === "plan" && <div className="pm-screen">
            <div className="pm-lead"><p>30 Oct–20 Nov · all outlets · one bank account</p><h2>{covered ? "No shortfall left" : "A gap before Diwali"}</h2><span>{covered ? "Lowest closing" : "Projected low"} on {dateLabel(anchors?.lowestDate)}</span><strong className={covered ? "" : "pm-negative"}>{money(anchors?.lowestBalanceInr)}</strong></div>
            {!!cash?.cashPlan.pendingActions?.length && <div className="pm-hold" role="status"><CircleAlert size={18}/><span><b>Payment pending reconciliation</b>{cash.cashPlan.pendingActions.map(item => <small key={item.id}>{item.label}</small>)}</span></div>}
            {!!cash?.cashPlan.appliedRelief?.length && <div className="pm-success"><CheckCircle2 size={20}/><span><b>Completed relief in this plan</b>{cash.cashPlan.appliedRelief.map(item => <small key={item.id}>{item.label}</small>)}</span></div>}
            {options?.recommendation?.text && <div className="pm-note"><b>Munim&apos;s recommendation · calculated</b><p>{options.recommendation.text}</p></div>}
            <p className="pm-chart-label">{cash?.cashPlan.label || "Illustrative projection from the listed bills - not a measured future"}</p>
            <AnchorChart cash={cash}/>
            {!!cash?.cashPlan.dailyBalanceSeries?.length && <div className="pm-daily-series" aria-label="Modeled closing cash from 4 to 7 November"><b>Modeled closing cash · decision window</b>{cash.cashPlan.dailyBalanceSeries.filter(item => item.date >= "2026-11-04" && item.date <= "2026-11-07").map(item => <div key={item.date}><span>{dateLabel(item.date)}</span><strong className={item.balanceInr < 0 ? "negative" : "positive"}>{money(item.balanceInr)}</strong></div>)}<small>Expected collections, completed relief and listed bills; no future bank balance is measured.</small></div>}
            <div className="pm-source"><Info size={16}/>{cash?.cashPlan.dailyBalanceNote || "This view highlights three modeled dates."}<button type="button" onClick={() => setScreen("data")}>Sources</button></div>
            <Heading title="Planned outflows"/>
            <div className="pm-ledger">{cash?.cashPlan.outflows.map(item => <div key={item.id}><span>{dateLabel(item.date)}</span><span>{item.payee}{item.invoiceId ? " · " + item.invoiceId : ""}{item.status === "paid_simulated" && <Pill tone="green">Paid · simulated</Pill>}{item.status === "payment_pending" && <Pill tone="amber">Payment pending</Pill>}{item.deferredFrom && <Pill tone="blue">Moved</Pill>}{item.quality === "estimate" && <Pill tone="amber">Estimate</Pill>}</span><b>{money(item.amountInr)}</b></div>)}
              {cash?.cashPlan.afterHorizon?.map(item => <div key={item.id}><span>{dateLabel(item.date)}</span><span>{item.payee}{item.invoiceId ? " · " + item.invoiceId : ""}<Pill tone="amber">Still owed</Pill></span><b>{money(item.amountInr)}</b></div>)}</div>
            <Heading title={covered ? "Relief options (no gap left)" : "Three ways to cover the gap"}/>
            {choices.map(item => <button type="button" className="pm-option" key={item.id} onClick={() => choose(item)}><i>{item.rank}</i><span><b>{item.title}</b><small>{item.costLabel}</small><em>{typeof item.effectOn5Nov.balanceInr === "number" ? "5 Nov: " + money(item.effectOn5Nov.balanceInr) + (item.calculated === false ? " · assumption, not calculated" : "") : item.effectOn5Nov.note || "Effect not supplied"}</em></span><ChevronRight size={18}/></button>)}
            {whatIf && <div className="pm-note"><b>Stock reduction · illustrative</b><p>{choices.find(item => item.id === "cut_stock")?.conditions.join(" ")}</p><p>Payment amounts do not reveal which products sold.</p><button type="button" onClick={() => setWhatIf(false)}>Close</button></div>}
          </div>}
          {screen === "munim" && <div className="pm-screen pm-chat">
            <form className="pm-ask-form" onSubmit={event => { event.preventDefault(); setAnswer(answerFor(question, cash, options, outletForecast)); }}><label htmlFor="pm-question">Ask about cash, outlets, stock, suppliers, or lenders</label><input id="pm-question" value={question} onChange={event => setQuestion(event.target.value)}/><button type="submit" className="pm-primary">Ask Munim<ArrowRight size={17}/></button></form>
            <div className="pm-answer"><span><Sparkles size={18}/></span><div><b>Munim</b><p>{answer || answerFor(question, cash, options, outletForecast)}</p><small>Scripted demo response · numbers from backend tools</small></div></div>
            <FlowMerchant/>
            <form className="pm-ask-form" onSubmit={event => { event.preventDefault(); void ask(question); }}><label htmlFor="pm-question">Ask about cash, outlets, suppliers, or lenders</label><input id="pm-question" value={question} onChange={event => setQuestion(event.target.value)}/><button type="submit" className="pm-primary">Ask Munim<ArrowRight size={17}/></button></form>
            <div className="pm-answer"><span><Sparkles size={18}/></span><div><b>Munim</b><p>{answer || "Ask a question about cash, suppliers, lenders or outlets."}</p><small>Scripted demo dialogue · numbers from the calculated plan · not an AI model</small></div></div>
            <FlowMerchant focusKey={focusTask}/>
            <Heading title="Choose what to explore"/>
            <button type="button" className="pm-row" onClick={() => setScreen("plan")}><Activity size={19}/><span><b>See cash gap and options</b><small>Calculated plan and relief</small></span><ChevronRight size={18}/></button>
            <button type="button" className="pm-row" onClick={() => setScreen("supplier")}><Handshake size={19}/><span><b>Supplier terms</b><small>What the Gupta task negotiates</small></span><ChevronRight size={18}/></button>
            <button type="button" className="pm-row" onClick={() => setScreen("capital")}><Landmark size={19}/><span><b>Compare lenders</b><small>Owner PIN controls a passing drawdown</small></span><ChevronRight size={18}/></button>
          </div>}
          {screen === "supplier" && <div className="pm-screen">
            <button type="button" className="pm-primary pm-full" onClick={() => setScreen("munim")}>Delegate and track a negotiation<ArrowRight size={18}/></button>
            <div className="pm-lead"><p>Gupta Distributors · invoice {gupta?.invoiceId || "GD-1182"}</p><h2>Ask for room to stock up</h2><span>Deferral or a split costs ₹0 only if Gupta agrees. No revised terms are guaranteed.</span></div>
            <div className="pm-intent"><div><Handshake size={17}/><b>Listed supplier bill</b></div><p>{money(gupta?.amountInr)} due {dateLabel(gupta?.date)}. No supplier is contacted by this demo.</p></div>
            <button type="button" className="pm-row pm-mandate-link" onClick={() => setScreen("mandate")}><ShieldCheck size={19}/><span><b>View guard boundaries</b><small>Identity, account, amount limit, and owner approval</small></span><ChevronRight size={18}/></button>
            <button type="button" className="pm-primary pm-full" onClick={() => void request("supplier")}>Request supplier response<ArrowRight size={18}/></button>
            {requests.supplier?.waiting && <div className="pm-hold"><CircleAlert size={18}/><span><b>Requested - waiting (simulated)</b><small>Waiting for Gupta&apos;s response.</small></span></div>}
            {supplierEvent && !requests.supplier?.waiting && <div className="pm-loan-step"><div><Handshake size={19}/><b>Supplier response received</b></div><p>{String(receivedCandidate?.supplierMessage || "A supplier response was received.")}</p><small>{receivedCandidate?.beneficiaryName ? "Proposed beneficiary name: " + String(receivedCandidate.beneficiaryName) : "Registered payee on file: Gupta Distributors; reply did not supply a name."}</small><small>Conditional upfront payment from quote: {money(receivedUpfront)}. The listed {money(gupta?.amountInr)} invoice stays in the baseline plan.</small><small>Received after this request · event #{supplierEvent.seq}</small><button type="button" className="pm-primary pm-full" disabled={busy} onClick={() => void evaluateSupplier()}>{busy ? "Checking…" : "Check received response"}<ArrowRight size={18}/></button></div>}
            <p className="pm-caption">{aaEvent && dataSummary?.supplier.aaAvailable ? "The synthetic AA sample has released observed Gupta payments for the guard." : "Request a simulated AA response before the guard uses observed Gupta payments."} This single-quote check uses header-only evidence. A tracked negotiation can request the full invoice, sign-off, and rail outcome.</p>
          </div>}
          {screen === "mandate" && <div className="pm-screen">
            <div className="pm-lead"><p>Owner boundaries</p><h2>What the guard can verify</h2><span>Missing requirements fail closed.</span></div>
            <div className="pm-mandate-table"><div><span>Drawdown destination</span><b>Owner account **4029</b></div><div><span>Drawdown ceiling</span><b>₹2,00,000</b></div><div><span>Approved lenders</span><b>Lender A, B, C</b></div><div><span>Supplier name</span><b>Gupta Distributors exactly</b></div><div><span>Supplier payment ceiling</span><b>{aaEvent && dataSummary?.supplier.aaAvailable ? money(dataSummary.supplier.derivedLimit) : "Awaiting AA sample"}</b></div></div>
            <div className="pm-hold"><CircleAlert size={18}/><span><b>Evidence follows the task</b><small>{aaEvent && dataSummary?.supplier.aaAvailable ? "The current ceiling uses clearly matched bank narrations across the complete prior financial year." : "Request the synthetic AA response before the guard uses observed Gupta payments."} The tracked task checks the selected header-only or full invoice version before any sign-off.</small></span></div>
            <button type="button" className="pm-primary pm-full" onClick={() => setScreen("supplier")}>Return to supplier request<ArrowRight size={18}/></button>
            <button type="button" className="pm-primary pm-full" disabled={taskBusy || !online} onClick={() => void startTask("supplier_stock")}>{taskBusy ? "Starting…" : "Start the tracked Gupta negotiation"}<ArrowRight size={18}/></button>
            <button type="button" className="pm-secondary pm-full" disabled={taskBusy || !online} onClick={() => void startTask("supplier_header_review")}>Start from the header-only GD-1182 photo<ArrowRight size={18}/></button>
            <p className="pm-caption">Gupta&apos;s reply, the invoice evidence, the AA bank sample and the payment rail each arrive as a request in the simulator inbox. The advance needs your sign-off on the exact disclosure and your PIN.</p>
          </div>}
          {screen === "mandate" && <div className="pm-screen">
            <div className="pm-lead"><p>Owner boundaries</p><h2>What the guard can verify</h2><span>Missing requirements fail closed.</span></div>
            <div className="pm-mandate-table"><div><span>Drawdown destination</span><b>Owner account **4029</b></div><div><span>Drawdown ceiling</span><b>₹2,00,000</b></div><div><span>Approved lenders</span><b>Lender A, B, C</b></div><div><span>Supplier name</span><b>Gupta Distributors exactly</b></div><div><span>Supplier payment ceiling</span><b>{aaReleased && dataSummary ? money(dataSummary.supplier.derivedLimit) : "Awaiting AA sample"}</b></div></div>
            <div className="pm-hold"><CircleAlert size={18}/><span><b>Evidence follows the task</b><small>{aaReleased ? "The current ceiling uses clearly matched bank narrations across the complete prior financial year." : "Request the synthetic AA response before the guard uses observed Gupta payments."} The tracked task checks the selected header-only or full invoice version before any sign-off.</small></span></div>
            <button type="button" className="pm-primary pm-full" onClick={() => setScreen("supplier")}>Return to supplier terms<ArrowRight size={18}/></button>
          </div>}
          {screen === "guard" && <div className="pm-screen" aria-live="polite">
            <div className="pm-lead"><p>Intent Guard</p><h2>Every action runs as a tracked task</h2><span>Checks, disclosures, approvals and rail outcomes for each task appear below and in RiskOps.</span></div>
            <FlowMerchant/>
            <div className="pm-ai-note"><ShieldCheck size={19}/><div><b>AI can stop or escalate, never approve</b><small>Fixed limits are enforced in code. Only the owner PIN can approve a passing action.</small></div></div>
            <button type="button" className="pm-secondary pm-full" onClick={() => setScreen("evidence")}>View evidence and verify chain<ArrowRight size={18}/></button>
          </div>}
          {screen === "capital" && <div className="pm-screen">
            <div className="pm-lead"><p>Partner financing · separate from supplier terms</p><h2>Compare capital offers</h2><span>Illustrative schedules. The drawdown itself runs as a tracked task with AA data, bureau consent, lender reply, disclosure and your PIN.</span></div>
            {lenders && <><p className="pm-caption">{lenders.scheduleLabel}</p><div className="pm-note"><b>Monthly EMI cap: {money(lenders.emiCap.maxTotalMonthlyEmiInr)}</b><p>{money(lenders.emiCap.monthlyCollectionsInr)} collections × {lenders.emiCap.percentage}%. Existing EMI: {money(lenders.emiCap.existingMonthlyEmiInr)}.</p></div>
              <div className="pm-offer-list">{lenders.offers.map(item => <button type="button" key={item.id} className={"pm-loan pm-offer-choice " + (selectedLender === item.id ? "selected" : "")} onClick={() => setSelectedLender(item.id)}><div><Landmark size={21}/><Pill tone={item.underCap ? "green" : "red"}>{item.underCap ? "Under cap" : "Over cap"}</Pill></div><b>{item.name} · {item.type}</b><p>{item.aprPercent}% APR · {item.tenorMonths} months · {money(item.totalInterestInr)} total interest</p><div><span>Monthly EMI <strong>{money(item.emiInr)}</strong></span><span>With existing <strong>{money(item.totalMonthlyEmiInr)}</strong></span></div>{item.earlyRepayment && <small>After {item.earlyRepayment.afterDays} days: about {money(item.earlyRepayment.estimatedInterestInr)} interest</small>}</button>)}</div></>}
            {selectedLender === "A" ? <div className="pm-loan-step"><div><ShieldCheck size={19}/><b>Lender A drawdown · tracked task</b></div><p>{money(drawdown?.amountInr)} enters the owner account {drawdown?.destinationAccountMasked || "**4029"} once. Gupta invoice {gupta?.invoiceId || "GD-1182"} remains a full {money(gupta?.amountInr)} outflow.</p><small>{typeof drawdown?.effectOn5Nov.balanceInr === "number" ? "With it, 5 Nov closes at " + money(drawdown.effectOn5Nov.balanceInr) + ". " : ""}The plan changes only after the rail confirms the drawdown.</small><button type="button" className="pm-primary pm-full" disabled={taskBusy || !online} onClick={() => void startTask("capital_standard")}>{taskBusy ? "Starting…" : "Start the tracked ₹2 lakh drawdown"}<ArrowRight size={18}/></button><button type="button" className="pm-secondary pm-full" disabled={taskBusy || !online} onClick={() => void startTask("capital_extended")}>₹2.5 lakh with Know Your Agent<ArrowRight size={18}/></button></div> : <div className="pm-note"><b>Comparison only</b><p>The tracked drawdown uses Lender A&apos;s offer. Select Lender A to start it.</p></div>}
          </div>}
          {screen === "data" && <div className="pm-screen">
            <div className="pm-lead"><p>Sources and limits</p><h2>Where the plan&apos;s numbers come from</h2><span>The cash plan is calculated from listed bills and each outlet&apos;s collection forecast. It is not a measured future.</span></div>
            <div className="pm-data-row"><Wallet size={19}/><span><b>Paytm collections</b><small>{money(cash?.homePaytmToday.totalInr)} to 12:40 pm in the synthetic Paytm-only channel.</small></span><Pill tone="green">Sample</Pill></div>
            <div className="pm-data-row"><Activity size={19}/><span><b>Projected cash low</b><small>{money(cash?.cashPlan.anchors.lowestBalanceInr)} on {dateLabel(cash?.cashPlan.anchors.lowestDate)} from the synthetic cash model.</small></span><Pill tone="amber">Projected</Pill></div>
            <div className="pm-data-row"><Store size={19}/><span><b>Outlet payment signals</b><small>Paytm activity by mapped device and last year&apos;s Diwali uplift. No SKU or unit data.</small></span><Pill>Sample</Pill></div>
            <Heading title="Storefront pulse · 12:40 pm"/>
            {dataSummary?.outlets?.length ? <div className="pm-outlets">{dataSummary.outlets.map(item => <section className="pm-outlet" key={item.id}>
              <div className="pm-outlet-head"><span className="pm-outlet-code">{item.id}</span><h3>{item.name}</h3><Pill tone="blue">Paytm</Pill></div>
              <div className="pm-outlet-today"><span>Collected today</span><strong>{money(item.paytmToday)}</strong></div>
              <div className="pm-outlet-stats"><div><span>Average Paytm month</span><b>{money(item.paytmAverageMonthly)}</b></div><div><span>Last Diwali week</span><b>{item.diwaliWeek2025Multiplier.toFixed(2)}×</b><small>vs prior four weeks</small></div></div>
              <p>Average all-channel month: {money(item.averageMonthlyAllChannelCollections)} against a {money(item.monthlyTarget)} monthly target. Today&apos;s Paytm amount is only one channel and part of one day.</p>
            </section>)}</div> : <div className="pm-hold"><CircleAlert size={18}/><span><b>Outlet summary unavailable</b><small>The transaction file could not be summarized.</small></span></div>}
            <div className="pm-note"><b>Stocking signal, not a SKU count</b><p>Last year&apos;s payment uplift can guide an outlet-level replenishment conversation. Payments do not identify units sold or stock on hand.</p></div>
            {dataSummary?.procurement && <>
              <Heading title="What suppliers billed"/>
              <div className="pm-note"><b>{dataSummary.procurement.productsInDocuments} product descriptions in source invoices</b><p>These quantities describe supplier-billed purchases. Past payments and negotiated terms help estimate procurement commitments; the documents do not show what remains on the shelf.</p></div>
              <div className="pm-ledger">{dataSummary.procurement.sample.map(item => <div key={item.description}><span>{item.invoiceRows.join(", ")}</span><span>{item.description}</span><b>{item.purchasedQuantityFromDocuments} {item.unit}</b></div>)}</div>
              <button type="button" className="pm-secondary pm-full" onClick={() => setScreen("munim")}>Negotiate and review a supplier commitment<ArrowRight size={17}/></button>
            </>}
            <Heading title="Diwali week collection estimate"/>
            <div className="pm-forecast-intro"><span><Sparkles size={16}/>4–10 Nov · all-channel</span><p>The cash plan&apos;s expected collections use this same outlet estimate, extended to 20 Nov.</p></div>
            {forecastError && <div className="pm-hold" role="alert"><CircleAlert size={18}/><span><b>Outlet estimate unavailable</b><small>{forecastError}</small></span><button type="button" onClick={() => { setForecastError(""); void get<OutletForecast>("/api/outlet-forecast").then(setOutletForecast).catch(e => setForecastError(e instanceof Error ? e.message : "Outlet forecast could not load.")); }}>Retry</button></div>}
            {outletForecast?.outlets?.length ? <>
              <div className="pm-forecast-source"><b>{money(outletForecast.outlets.reduce((sum, item) => sum + item.total.pointInr, 0))}</b><span>estimated collections across three outlets for the week</span><small>Complete shift handovers through {dateLabel(outletForecast.source.through)}. Partial 30 Oct payments are excluded.</small></div>
              <div className="pm-forecast-cards">{outletForecast.outlets.map(item => <section className="pm-forecast-card" key={item.id}>
                <div className="pm-forecast-head"><b>{item.name}</b><Pill tone="amber">Estimate</Pill></div>
                <div className="pm-forecast-point"><span>7-day collections</span><strong>{money(item.total.pointInr)}</strong></div>
                <p>Historical spread: <b>{money(item.total.lowInr)}–{money(item.total.highInr)}</b></p>
                <details><summary>See daily amounts and basis</summary><div className="pm-forecast-days">{item.days.map(day => <div key={day.date}><span>{dateLabel(day.date)}</span><b>{money(day.pointInr)}</b><small>{money(day.lowInr)}–{money(day.highInr)}</small></div>)}</div><p>Recent collection pace: {item.trendFactor.toFixed(2)}×. Last Diwali uplift: {item.festivalUplift.factor.toFixed(2)}×. These are payment patterns, not product sales.</p></details>
              </section>)}</div>
              <p className="pm-forecast-foot">{outletForecast.rangeLabel} Historical variation is a planning aid, not a guarantee.</p>
            </> : !forecastError && <div className="pm-hold"><CircleAlert size={18}/><span><b>Preparing outlet estimates</b><small>Reading the bundled synthetic handover summary.</small></span></div>}
            <Heading title="Check stock coverage"/>
            <div className="pm-stock-intro"><b>Use your own item assumptions</b><p>Payments do not tell us which SKU sold. Enter a price, an estimated share of outlet revenue, stock on hand, and how many festival days to cover from 4 Nov to see a unit proxy.</p></div>
            <form className="pm-stock-form" onSubmit={event => void checkStock(event)}>
              <label>Outlet<select required value={stockInput.outletId} onChange={event => updateStockField("outletId", event.target.value)}><option value="">Choose outlet</option>{outletForecast?.outlets.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
              <label>Item name (optional)<input value={stockInput.skuLabel} onChange={event => updateStockField("skuLabel", event.target.value)} maxLength={80} placeholder="e.g. Diwali gift box"/></label>
              <div className="pm-stock-grid"><label>Price per unit (₹)<input required type="number" inputMode="numeric" min="1" step="1" value={stockInput.priceInr} onChange={event => updateStockField("priceInr", event.target.value)} placeholder="Owner input"/></label><label>Revenue share (%)<input required type="number" inputMode="decimal" min="0.1" max="100" step="0.1" value={stockInput.revenueSharePercent} onChange={event => updateStockField("revenueSharePercent", event.target.value)} placeholder="Estimate"/></label></div>
              <div className="pm-stock-grid"><label>Festival days to cover (from 4 Nov)<input required type="number" inputMode="numeric" min="1" max="7" step="1" value={stockInput.coverageDays} onChange={event => updateStockField("coverageDays", event.target.value)} placeholder="1–7"/></label><label>Units on hand<input required type="number" inputMode="numeric" min="0" step="1" value={stockInput.unitsOnHand} onChange={event => updateStockField("unitsOnHand", event.target.value)} placeholder="Counted stock"/></label></div>
              <button type="submit" className="pm-primary pm-full" disabled={stockBusy || !outletForecast}>{stockBusy ? "Checking…" : "Check coverage"}<ArrowRight size={17}/></button>
            </form>
            {stockError && <div className="pm-hold" role="alert"><CircleAlert size={18}/><span><b>Coverage not calculated</b><small>{stockError}</small></span></div>}
            {stockResult && <div className={"pm-stock-result pm-stock-result-" + stockResult.state} role="status"><div className="pm-stock-result-head"><b>{stockResult.state === "likely_shortage" ? "Likely shortfall — review replenishment" : stockResult.state === "possible_surplus" ? "Possible surplus — review the order" : "Coverage needs monitoring"}</b><Pill tone={stockResult.state === "likely_shortage" ? "red" : "amber"}>Proxy</Pill></div><p>{stockResult.outlet.name} · {dateLabel(stockResult.horizon.from)} to {dateLabel(stockResult.horizon.to)} · {stockResult.horizon.coverageDays} festival days covered</p><div><span>Estimated units needed<b>{stockResult.estimatedDemandUnits.point}</b><small>Historical range {stockResult.estimatedDemandUnits.low}–{stockResult.estimatedDemandUnits.high}</small></span><span>Units on hand<b>{stockResult.assumptions.unitsOnHand}</b><small>Entered by owner</small></span></div><p>{stockResult.explanation}</p>{stockResult.recommendedReviewUnits > 0 && <strong>Point-scenario gap: {stockResult.recommendedReviewUnits} units to review with the supplier.</strong>}<small>No SKU sales were observed. This check does not place an order or payment.</small></div>}
            <div className="pm-data-row"><Landmark size={19}/><span><b>Supplier payment history</b><small>{aaEvent && dataSummary?.supplier.aaAvailable ? `${dataSummary.supplier.priorFyDebitCount} clearly matched synthetic Gupta debits total ${money(dataSummary.supplier.priorFyDebitTotal)}. 110% ceiling: ${money(dataSummary.supplier.derivedLimit)}. ${dataSummary.supplier.completeFinancialYear ? "The prior FY is complete." : "The available period is partial."} Uncertain matches are excluded.` : "Observed Gupta payments are inferred from current bank narrations. Request an AA sample response before the guard uses them."}</small></span><Pill tone={aaEvent && dataSummary?.supplier.aaAvailable ? "green" : "amber"}>{aaEvent && dataSummary?.supplier.aaAvailable ? "Sample ready" : "Awaiting"}</Pill></div>
            <div className="pm-data-row"><FileText size={19}/><span><b>GD-1182 invoice</b><small>The source includes a header-only photo and full 212-line document. A tracked task checks the selected version, arithmetic, account, duplicates, and instructions.</small></span><Pill tone="green">V4 supplied</Pill></div>
            <button type="button" className="pm-primary pm-full" onClick={() => void request("aa")}>Request sample AA response<ArrowRight size={18}/></button>
            {requests.aa?.waiting && <div className="pm-hold"><CircleAlert size={18}/><span><b>Requested - waiting (simulated)</b><small>Waiting for the bank data response.</small></span></div>}
            {aaEvent && !requests.aa?.waiting && <div className="pm-note"><b>AA response received</b><p>{String(aaEvent.payload.status || aaEvent.payload.source || "Sample status received")}. {dataSummary?.supplier.aaAvailable ? "The server can now check the synthetic bank rows for the supplier limit." : "The bank sample is not available for this request."} No real AA rail was contacted.</p></div>}
            <div className="pm-data-row"><Landmark size={19}/><span><b>Supplier payment history</b><small>{aaReleased && dataSummary ? `${dataSummary.supplier.priorFyDebitCount} clearly matched synthetic Gupta debits total ${money(dataSummary.supplier.priorFyDebitTotal)}. 110% ceiling: ${money(dataSummary.supplier.derivedLimit)}. ${dataSummary.supplier.completeFinancialYear ? "The prior FY is complete." : "The available period is partial."} Uncertain matches are excluded.` : "Observed Gupta payments are inferred from current bank narrations. A tracked task releases them when the simulator returns an available AA response."}</small></span><Pill tone={aaReleased ? "green" : "amber"}>{aaReleased ? "Sample ready" : "Awaiting"}</Pill></div>
            <div className="pm-data-row"><FileText size={19}/><span><b>GD-1182 invoice</b><small>The source includes a header-only photo and full 212-line document. A tracked task checks the selected version, arithmetic, account, duplicates, and instructions.</small></span><Pill tone="green">V4 supplied</Pill></div>
            <p className="pm-caption">{cash?.sourceNote}</p>
          </div>}
          {screen === "evidence" && <div className="pm-screen">
            <div className="pm-lead"><p>Server evidence log</p><h2>What the guard recorded</h2><span>The same journal RiskOps reads: requests, responses, disclosures, approvals and outcomes. Resets when the server restarts.</span></div>
            <div className={verification?.ok && entries.length > 0 ? "pm-success" : "pm-hold"}>{verification?.ok && entries.length > 0 ? <CheckCircle2 size={20}/> : <CircleAlert size={20}/>}<span><b>{verification ? entries.length === 0 ? "No entries to verify" : verification.ok ? "Hash chain verified" : "Hash chain failed" : "Verification unavailable"}</b><small>{verification && !verification.ok ? "First broken sequence: " + String(verification.first_broken_seq ?? "unknown") : "Read from the verification endpoint."}</small></span></div>
            {entries.length === 0 ? <div className="pm-empty"><FileText size={28}/><h2>No attempts yet</h2><p>Start a tracked task to create the first evidence entry.</p><button type="button" className="pm-primary" onClick={() => setScreen("munim")}>Delegate a task<ArrowRight size={18}/></button></div> : <div className="pm-case-list">{[...entries].reverse().map(item => <div className="pm-evidence-entry" key={item.seq}><span><b>#{item.seq} · {(item.event || item.outcome || "Recorded").replaceAll("_", " ")}</b><small>{item.summary}</small><small>{item.timestamp}{item.disclosure ? " · disclosure v" + item.disclosure.version + " " + item.disclosure.hash.slice(0, 12) + "…" : ""}{item.ledgerRef ? " · ledger " + item.ledgerRef.slice(0, 8) : ""}</small></span><code>{item.hash?.slice(0, 20)}…</code></div>)}</div>}
            <button type="button" className="pm-secondary pm-full" onClick={() => void refreshEvidence()}>Verify again<ArrowRight size={18}/></button>
            <button type="button" className="pm-secondary pm-full" onClick={() => setMode("riskops")}>Open RiskOps trace<ArrowRight size={18}/></button>
            <p className="pm-caption">This log records checks and outcomes, not a payment receipt.</p>
          </div>}
        </div>
        <nav className="pm-bottom" aria-label="Merchant sections">{([{ id: "home", icon: Home, name: "Home" }, { id: "plan", icon: Activity, name: "Plan" }, { id: "munim", icon: Sparkles, name: "Munim" }, { id: "capital", icon: Landmark, name: "Capital" }, { id: "evidence", icon: FileText, name: "More" }] as const).map(item => { const Icon = item.icon; return <button type="button" key={item.id} className={screen === item.id ? "active" : ""} onClick={() => setScreen(item.id)}><Icon size={19}/><span>{item.name}</span></button>; })}</nav>
      </div>
    </section>
    <aside className="pm-right" aria-label="Demo controls">
      <div className="pm-control"><span>Journey control</span><h2>From projected gap to guarded action</h2><p>Start a tracked task, answer its requests in the simulator, then review the disclosure, PIN, outcome and evidence.</p><button type="button" className="pm-primary pm-full" onClick={() => setScreen("plan")}>Review cash plan<ArrowRight size={18}/></button></div>
      <div className="pm-right-card"><span>Decision outcomes</span><p><CheckCircle2 size={17} className="pm-green"/>Requested - waiting</p><p><CircleAlert size={17} className="pm-amber"/>Needs verification</p><p><ShieldCheck size={17} className="pm-red"/>Blocked action</p></div>
      <div className="pm-right-card"><span>Source truth</span><p><b>Paytm</b> sees payment amounts by outlet, not products sold.</p><p><b>Cash plan</b> is a synthetic model, not a measured future.</p><p><b>Supplier cap</b> comes from prior-FY bank debits after a tracked AA response.</p></div>
      <button type="button" className="pm-open-risk" onClick={() => setMode("riskops")}><ShieldCheck size={20}/><span><b>Open RiskOps</b><small>Same journal as Evidence</small></span><ArrowRight size={18}/></button>
    </aside>
  </main>;
}
