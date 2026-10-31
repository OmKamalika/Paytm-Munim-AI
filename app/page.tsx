"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Activity, ArrowLeft, ArrowRight, BadgeCheck, Bell, CheckCircle2, ChevronRight, CircleAlert, FileText, Handshake, Home, Info, Landmark, RotateCcw, ShieldCheck, Sparkles, Store, Wallet } from "lucide-react";
import RiskOps from "../components/RiskOps";
import FlowRiskOps from "../components/FlowRiskOps";
import type { FlowState } from "../lib/flow-types";
import FlowMerchant from "../components/FlowMerchant";
import MunimChat, { munimPrompts, type MunimMessage } from "../components/MunimChat";
import { suggestsStockAgent } from "../lib/munim-chat.js";
import { displayCopy } from "../lib/ui-copy.js";
import { filterOutletRows, isOutletScope, outletDataId, outletScopeLabel, outletScopes, questionOutletScope } from "../lib/outlet-scope.js";
import "../components/OutletScope.css";

type Screen = "home" | "plan" | "munim" | "supplier" | "mandate" | "guard" | "capital" | "data" | "evidence";
type Kind = "supplier" | "aa" | "lenders";
type OutletScope = "all" | "dadar" | "matunga" | "sion";
type SalesOutlet = { id: string; name: string; available: boolean; totalInr: number | null; transactionCount: number | null; latestAvailableAt: string | null };
type SalesSummary = {
  asOf: string; latestAvailableAt: string | null;
  today: { date: string; available: boolean; totalInr: number | null; transactionCount: number | null; outlets: SalesOutlet[] };
  last7Days: { from: string; to: string; available: boolean; complete: boolean; totalInr: number | null; transactionCount: number | null; outlets: SalesOutlet[] };
};
type Cash = {
  business: { name: string; owner: string; outlets: string[] };
  homePaytmToday: { totalInr: number; outlets: { outlet: string; amountInr: number }[] };
  monthlyAllChannelCollectionsInr: number; existingMonthlyEmiInr: number; sourceNote: string;
  cashPlan: { label: string; dailyBalanceNote: string;
    anchors: { firstNegativeDate: string; lowestDate: string; lowestBalanceInr: number; recoveryAboveZeroDate: string };
    dailyBalanceSeries?: { date: string; balanceInr: number; inflowForecastInr: number; knownOutflowsInr: number }[] | null;
    outflows: { id: string; date: string; payee: string; amountInr: number; quality: string; invoiceId?: string; outletSplit?: { outlet: string; amountInr: number }[] }[];
  };
};
type Option = { id: string; rank: number; title: string; costLabel: string; amountInr?: number; destinationAccountMasked?: string; conditions: string[]; effectOn5Nov: { balanceInr: number | null; note?: string } };
type Options = { basis: string; options: Option[] };
type Lender = { id: string; name: string; type: string; aprPercent: number; tenorMonths: number; emiInr: number; totalInterestInr: number; totalMonthlyEmiInr: number; underCap: boolean; earlyRepayment?: { afterDays: number; estimatedInterestInr: number } };
type Lenders = { scheduleLabel: string; emiCap: { monthlyCollectionsInr: number; existingMonthlyEmiInr: number; percentage: number; maxTotalMonthlyEmiInr: number }; offers: Lender[] };
type Event = { seq: number; kind: Kind; scenarioId: string; timestamp: string; payload: {
  candidate?: { totalAmount: number; upfrontPercent: number; supplierId: string; supplierAccount: string; beneficiaryName?: string; supplierMessage?: string };
  offers?: Lender[];
  emiCap?: Lenders["emiCap"];
  status?: string;
  source?: string;
} };
type Simulator = { latestSeq: number; latest: Record<Kind, Event | null>; events: Event[] };
type RequestState = { cursor: number; event?: Event; waiting: boolean };
type PauseState = { paused: boolean; scope: string; durable: boolean };
type DataSummary = {
  synthetic: boolean;
  asOf: string;
  sources: Record<string, unknown>;
  outlets: { id: string; name: string; paytmToday: number | null; paytmAverageMonthly: number; averageMonthlyAllChannelCollections: number; diwaliWeek2025Multiplier: number; monthlyTarget: number }[];
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
const asOfLabel = (s?: string | null) => s ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "Asia/Kolkata" }).format(new Date(s)) + " IST" : "Unavailable";
async function get<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { cache: "no-store", ...init });
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

function answerFor(question: string, cash: Cash | null, options: Options | null, forecast: OutletForecast | null, outletScope: string): string {
  if (/\b(sku|stock|replenish|reorder)\b/i.test(question))
    return "Payment records do not show which SKU sold or how many units remain. Open Your data and enter the item price, estimated share of outlet revenue, stock on hand, and the number of festival days to cover from 4 Nov. I can then flag a possible shortfall or surplus for your review; no order is placed.";
  if (/\b(outlets?|dadar|matunga|sion|demand|sales|revenue|forecast)\b/i.test(question)) {
    if (!forecast) return "The outlet sales estimate is still loading. Open Your data to review it when ready.";
    const scoped = filterOutletRows(forecast.outlets, outletScope, row => row.id);
    const named = outletScope !== "all" ? scoped[0] : undefined;
    if (named) return `For ${dateLabel(forecast.window.from)}–${dateLabel(forecast.window.to)}, ${named.name} has an estimated ${money(named.total.pointInr)} in all-channel sales, with a historical low/high scenario of ${money(named.total.lowInr)}–${money(named.total.highInr)}. Count stock before deciding what to replenish; this is not SKU demand.`;
    if (!scoped.length) return `No sales forecast is available for ${outletScopeLabel(outletScope)}.`;
    const point = scoped.reduce((sum, item) => sum + item.total.pointInr, 0);
    return `For ${dateLabel(forecast.window.from)}–${dateLabel(forecast.window.to)}, All outlets have a forecast of ${money(point)} in all-channel sales. The combined cash plan uses the same outlet forecasting method with listed bills and payment effects. Check actual stock before confirming an order.`;
  }
  if (!cash || !options) return "Loading the cash plan.";
  const a = cash.cashPlan.anchors;
  const gupta = cash.cashPlan.outflows.find(item => item.id === "gupta");
  if (/gupta|supplier|invoice|defer|split/i.test(question))
    return "The listed " + (gupta?.invoiceId || "Gupta") + " bill is " + money(gupta?.amountInr) + " due " + dateLabel(gupta?.date) + ". Asking for a deferral is conditional on Gupta agreeing. No revised cash balance has been supplied.";
  if (/lender|loan|emi|capital|credit/i.test(question))
    return "The illustrative plan offers a " + money(options.options.find(item => item.id === "drawdown")?.amountInr) + " Lender A drawdown. Open Capital to request the simulated offers and compare their EMI cap checks.";
  return "The cash plan for All outlets marks a projected low of " + money(a.lowestBalanceInr) + " on " + dateLabel(a.lowestDate) + ". It first turns negative on " + dateLabel(a.firstNegativeDate) + " and is above zero on " + dateLabel(a.recoveryAboveZeroDate) + ". Review the three cost-ordered choices.";
}

export default function HomePage() {
  const [mode, setMode] = useState<"merchant" | "riskops">("merchant");
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedOutlet, setSelectedOutlet] = useState<OutletScope>("all");
  const [cash, setCash] = useState<Cash | null>(null);
  const [salesSummary, setSalesSummary] = useState<SalesSummary | null>(null);
  const [salesError, setSalesError] = useState("");
  const [options, setOptions] = useState<Options | null>(null);
  const [lenders, setLenders] = useState<Lenders | null>(null);
  const [dataSummary, setDataSummary] = useState<DataSummary | null>(null);
  const [outletForecast, setOutletForecast] = useState<OutletForecast | null>(null);
  const [forecastError, setForecastError] = useState("");
  const [stockInput, setStockInput] = useState<StockInput>({ outletId: "", skuLabel: "", priceInr: "", revenueSharePercent: "", unitsOnHand: "", coverageDays: "" });
  const [stockResult, setStockResult] = useState<StockCoverage | null>(null);
  const [stockError, setStockError] = useState("");
  const [stockBusy, setStockBusy] = useState(false);
  const stockRequestToken = useRef(0);
  const [requests, setRequests] = useState<Partial<Record<Kind, RequestState>>>({});
  const [paused, setPaused] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatDraft, setChatDraft] = useState("");
  const [chatMessages, setChatMessages] = useState<MunimMessage[]>([]);
  const [agentSetupRequest, setAgentSetupRequest] = useState(0);
  const [whatIf, setWhatIf] = useState(false);
  const [error, setError] = useState("");
  const [liveError, setLiveError] = useState("");
  const [attentionCount, setAttentionCount] = useState(0);

  useEffect(() => {
    get<Lenders>("/api/lenders").then(setLenders)
      .catch(e => setError(e instanceof Error ? e.message : "Shop data could not load."));
    get<DataSummary>("/api/data-summary").then(setDataSummary)
      .catch(() => setError("Outlet and bank-data summary could not load."));
    get<SalesSummary>("/api/sales-summary").then(setSalesSummary)
      .catch(() => setSalesError("Recorded sales could not load."));
    get<OutletForecast>("/api/outlet-forecast").then(setOutletForecast)
      .catch(e => setForecastError(e instanceof Error ? e.message : "Outlet forecast could not load."));
    get<PauseState>("/api/control/pause").then(state => setPaused(state.paused))
      .catch(() => setError("Pause status could not load."));
  }, []);
  useEffect(() => {
    let active = true;
    let inFlight = false;
    const controller = new AbortController();
    const refresh = async () => {
      if (inFlight || document.visibilityState === "hidden") return;
      inFlight = true;
      try {
        const [nextCash, nextOptions, flowState, control] = await Promise.all([
          get<Cash>("/api/cashplan", { signal: controller.signal }),
          get<Options>("/api/options", { signal: controller.signal }),
          get<FlowState>("/api/flows/state?view=merchant", { signal: controller.signal }),
          get<PauseState>("/api/control/pause", { signal: controller.signal }),
        ]);
        if (active) {
          setCash(nextCash); setOptions(nextOptions); setPaused(control.paused);
          setLiveError("");
          setAttentionCount(flowState.runs.filter(run => ["awaiting_owner", "blocked", "payment_pending", "paused"].includes(run.status)).length);
        }
      } catch { if (active) setLiveError("Live cash and task status could not refresh. The last successful snapshot remains visible."); }
      finally { inFlight = false; }
    };
    void refresh();
    const timer = window.setInterval(() => void refresh(), 2000);
    document.addEventListener("visibilitychange", refresh);
    return () => { active = false; controller.abort(); window.clearInterval(timer); document.removeEventListener("visibilitychange", refresh); };
  }, []);
  const aaEventSeq = requests.aa?.event?.seq;
  useEffect(() => {
    if (!aaEventSeq) return;
    get<DataSummary>("/api/data-summary").then(setDataSummary)
      .catch(() => setError("The bank-data summary could not refresh."));
  }, [aaEventSeq]);
  useEffect(() => {
    if (!Object.values(requests).some(item => item?.waiting)) return;
    const timer = setInterval(() => {
      get<Simulator>("/api/simulator/state").then(state => {
        setRequests(previous => {
          const next = { ...previous };
          let changed = false;
          for (const kind of ["supplier", "aa", "lenders"] as Kind[]) {
            const request = previous[kind];
            const event = state.latest?.[kind];
            if (request?.waiting && event && event.seq > request.cursor) {
              next[kind] = { cursor: request.cursor, event, waiting: false };
              changed = true;
            }
          }
          return changed ? next : previous;
        });
      }).catch(() => {});
    }, 1000);
    return () => clearInterval(timer);
  }, [requests]);
  const choices = useMemo(() => [...(options?.options || [])].sort((a, b) => a.rank - b.rank), [options]);
  const scopedSalesRows = filterOutletRows(salesSummary?.today.outlets || [], selectedOutlet, row => row.id);
  const scopedSalesAvailable = Boolean(salesSummary?.today.available && scopedSalesRows.some(row => row.available));
  const scopedSalesTotal = scopedSalesAvailable ? scopedSalesRows.reduce((sum, row) => sum + (row.totalInr ?? 0), 0) : undefined;
  const scopedLatestAvailableAt = selectedOutlet === "all" ? salesSummary?.latestAvailableAt : scopedSalesRows[0]?.latestAvailableAt;
  const scopedWeekRows = filterOutletRows(salesSummary?.last7Days.outlets || [], selectedOutlet, row => row.id);
  const scopedWeekAvailable = Boolean(salesSummary?.last7Days.available && scopedWeekRows.some(row => row.available));
  const scopedWeekTotal = scopedWeekAvailable ? scopedWeekRows.reduce((sum, row) => sum + (row.totalInr ?? 0), 0) : undefined;
  const scopedWeekLatestAt = selectedOutlet === "all" ? salesSummary?.latestAvailableAt : scopedWeekRows[0]?.latestAvailableAt;
  const scopedOutlets = filterOutletRows(dataSummary?.outlets || [], selectedOutlet, row => row.id);
  const scopedForecastOutlets = filterOutletRows(outletForecast?.outlets || [], selectedOutlet, row => row.id);
  const scopeLabel = outletScopeLabel(selectedOutlet);
  const scopePrompts = [munimPrompts[0], `How is ${selectedOutlet === "all" ? "Dadar" : scopeLabel} doing?`, munimPrompts[2]];
  const gupta = cash?.cashPlan.outflows.find(item => item.id === "gupta");
  const aaEvent = requests.aa?.event;

  async function changePause(next: boolean) {
    try {
      const state = await get<PauseState>("/api/control/pause", body({ paused: next }));
      setPaused(state.paused);
    } catch (e) { setError(e instanceof Error ? e.message : "Pause control unavailable."); }
  }
  async function request(kind: Kind) {
    setError("");
    try {
      const started = await get<{ kind: Kind; cursor: number; requestId: string }>("/api/simulator/request", body({ kind }));
      setRequests(previous => ({ ...previous, [kind]: { cursor: started.cursor, waiting: true } }));
    } catch (e) { setError(e instanceof Error ? e.message : "Simulator unavailable."); }
  }
  function retrySales() {
    setSalesError("");
    void get<SalesSummary>("/api/sales-summary").then(setSalesSummary)
      .catch(() => setSalesError("Recorded sales could not load."));
  }
  function updateStockField(field: keyof StockInput, value: string) {
    stockRequestToken.current += 1;
    setStockInput(previous => ({ ...previous, [field]: value }));
    setStockResult(null);
    setStockError("");
  }
  function changeOutletScope(value: string) {
    if (!isOutletScope(value)) return;
    const next = value as OutletScope;
    stockRequestToken.current += 1;
    setSelectedOutlet(next);
    setStockInput(previous => ({ ...previous, outletId: outletDataId(next) }));
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
    const requestToken = ++stockRequestToken.current;
    try {
      const result = await get<StockCoverage>("/api/stock-coverage", body({
        outletId: stockInput.outletId,
        skuLabel: stockInput.skuLabel.trim() || undefined,
        priceInr: Number(stockInput.priceInr),
        revenueSharePercent: Number(stockInput.revenueSharePercent),
        unitsOnHand: Number(stockInput.unitsOnHand),
        coverageDays: Number(stockInput.coverageDays),
      }));
      if (requestToken === stockRequestToken.current) setStockResult(result);
    } catch (e) {
      if (requestToken === stockRequestToken.current) setStockError(e instanceof Error ? e.message : "Stock coverage could not be checked.");
    } finally { setStockBusy(false); }
  }
  function choose(item: Option) {
    if (item.id === "supplier_deferral") setScreen("supplier");
    else if (item.id === "drawdown") setScreen("capital");
    else setWhatIf(true);
  }
  function sendChatMessage(question: string) {
    const text = question.trim();
    if (!text) return;
    const offerAgentSetup = suggestsStockAgent(text);
    const questionScope = questionOutletScope(text, selectedOutlet);
    const asksRecordedSales = /\b(sales|revenue)\b/i.test(text) && /\b(7|seven|today)\b/i.test(text) && !/\b(next|forecast|projected|estimate|future)\b/i.test(text);
    let recordedReply = "";
    if (asksRecordedSales) {
      if (!salesSummary) recordedReply = salesError || "Recorded sales are still loading. Try again when the sales summary is ready.";
      else {
        const today = /\btoday\b/i.test(text);
        const period = today ? salesSummary.today : salesSummary.last7Days;
        const rows = filterOutletRows(period.outlets, questionScope, row => row.id);
        const label = outletScopeLabel(questionScope);
        const latest = questionScope === "all" ? salesSummary.latestAvailableAt : rows[0]?.latestAvailableAt;
        const available = period.available && rows.some(row => row.available);
        const amount = rows.reduce((sum, row) => sum + (row.totalInr ?? 0), 0);
        recordedReply = !available
          ? `${label}: no sales records for ${today ? dateLabel(salesSummary.today.date) : `${dateLabel(salesSummary.last7Days.from)}–${dateLabel(salesSummary.last7Days.to)}`}. Latest recorded sale: ${asOfLabel(latest)}.`
          : `${label}: recorded net Paytm sales ${today ? `on ${dateLabel(salesSummary.today.date)}` : `for ${dateLabel(salesSummary.last7Days.from)}–${dateLabel(salesSummary.last7Days.to)}`} total ${money(amount)}. Net of refunds. Latest recorded sale: ${asOfLabel(latest)}.${!today && !salesSummary.last7Days.complete ? ` Full-period coverage is unverified.${!salesSummary.today.available ? ` No sales records for ${dateLabel(salesSummary.today.date)}.` : ""}` : ""}`;
      }
    }
    const reply = offerAgentSetup
      ? "I can help you set up a stock agent for the outlet and item you choose. You decide what it watches, when it should propose a reorder, and its spending limits. Review the setup first; no agent has started."
      : asksRecordedSales ? recordedReply : answerFor(text, cash, options, outletForecast, questionScope);
    setChatMessages(previous => [...previous,
      { id: crypto.randomUUID(), role: "user", text },
      { id: crypto.randomUUID(), role: "assistant", text: reply, offerAgentSetup },
    ]);
    setChatDraft("");
  }
  function openChat(prompt?: string) {
    setScreen("munim");
    setChatOpen(true);
    if (prompt) sendChatMessage(prompt);
  }
  function openStockAgentSetup() {
    setChatOpen(false);
    setScreen("munim");
    setAgentSetupRequest(previous => previous + 1);
  }
  function resetView() {
    setMode("merchant"); setScreen("home"); setChatOpen(false); setChatDraft(""); setChatMessages([]);
    changeOutletScope("all");
    setWhatIf(false); setError("");
  }
  function back() {
    const previous: Partial<Record<Screen, Screen>> = { plan: "home", munim: "home", supplier: "plan", mandate: "supplier", guard: "home", capital: "plan", data: "home", evidence: "home" };
    setScreen(previous[screen] || "home");
  }
  if (mode === "riskops") return <RiskOps cases={[]} paused={paused} onPauseChange={next => void changePause(next)} onBack={() => setMode("merchant")} />;
  return <main className="pm-shell">
    <aside className="pm-side" aria-label="Demo navigation">
      <div className="pm-side-brand"><span>paytm</span><small>for Business</small><strong>Munim</strong></div>
      <p>A merchant decision, from early warning to a guarded action.</p>
      <nav>{(["home", "plan", "capital", "guard", "evidence"] as Screen[]).map((item, index) => <button type="button" key={item} className={screen === item ? "active" : ""} onClick={() => setScreen(item)}><i>{index + 1}</i><span><b>{labels[item]}</b><small>{item === "evidence" ? "Verify chain" : "Review demo"}</small></span></button>)}</nav>
      <div className="pm-side-foot"><Pill>Demo</Pill><span>{asOfLabel(salesSummary?.asOf || "2026-10-31T15:55:00+05:30")}</span></div>
    </aside>
    <section className="pm-stage">
      <header className="pm-stage-head"><div><p>PayTMunim / Demo journey</p><h1>Give the owner a plan. Keep the mandate in control.</h1></div><div>
        <button type="button" className="pm-quiet" onClick={resetView}><RotateCcw size={16}/>Restart view</button>
        <button type="button" className="pm-risk-button" onClick={() => setMode("riskops")}><ShieldCheck size={17}/>RiskOps view</button>
      </div></header>
      <div className="pm-phone" aria-label="Merchant app">
        <div className="pm-statusbar"><span>15:55</span><span>●●● ▰</span></div>
        <header className="pm-app-head"><div>{screen !== "home" && <button type="button" aria-label="Back" onClick={back}><ArrowLeft size={22}/></button>}{screen === "home" ? <span className="pm-logo">paytm <small>for Business</small></span> : <strong>{labels[screen]}</strong>}</div><button type="button" aria-label="Open evidence" onClick={() => setScreen("evidence")}><Bell size={19}/>{attentionCount > 0 && <i/>}</button></header>
        <div className="os-selector"><label htmlFor="merchant-outlet"><Store size={15}/>Outlet</label><select id="merchant-outlet" value={selectedOutlet} onChange={event => changeOutletScope(event.target.value)}>{outletScopes.map(outlet => <option key={outlet.id} value={outlet.id}>{outlet.label}</option>)}</select></div>
        <p className="os-asof">As of {asOfLabel(salesSummary?.asOf || "2026-10-31T15:55:00+05:30")}</p>
        <div className="pm-scroll" key={screen}>
          {(error || liveError) && <div className="pm-error" role="alert"><CircleAlert size={17}/>{displayCopy(error || liveError)}{error && <button type="button" aria-label="Dismiss" onClick={() => setError("")}>×</button>}</div>}
          {selectedOutlet !== "all" && ["plan", "supplier", "mandate", "guard", "capital"].includes(screen) && <p className="os-business-note">Cash planning, supplier invoices and credit limits cover All outlets.</p>}
          {screen === "home" && <div className="pm-screen">
            <p className="pm-greeting">Good evening, {cash?.business.owner || "Rakesh"}</p>
            <button type="button" className="pm-ask" onClick={() => openChat()}><span><Sparkles size={22}/></span><b>Ask Munim<small>“Diwali ke liye paisa kahan se aayega?”</small></b><ArrowRight size={18}/></button>
            <div className="pm-gap"><div className="pm-gap-top"><span><Activity size={16}/>All outlets · Payout planning</span><Pill tone="amber">Projected</Pill></div><p>Cash may run short on <b>{dateLabel(cash?.cashPlan.anchors.lowestDate)}</b></p><strong>{money(cash?.cashPlan.anchors.lowestBalanceInr)}</strong><div className="pm-gap-notes"><span>Gupta stock · rent · bonus</span><span>Above zero on {dateLabel(cash?.cashPlan.anchors.recoveryAboveZeroDate)}</span></div><button type="button" className="pm-primary" onClick={() => setScreen("plan")}>Review relief options &amp; scenarios<ArrowRight size={18}/></button></div>
            <Heading title="Today on Paytm" action="See sources" onAction={() => setScreen("data")}/>
            <div className="pm-today"><small>{scopeLabel} · Paytm sales today</small>{scopedSalesAvailable ? <><strong>{money(scopedSalesTotal)}</strong><div>{scopedSalesRows.map(item => <span key={item.id}>{item.name} <b>{money(item.totalInr)}</b></span>)}</div></> : <p className="os-sales-empty">{salesSummary ? `No sales records for ${dateLabel(salesSummary.today.date)}` : salesError || "Loading recorded sales…"}</p>}{salesSummary && !scopedSalesAvailable && <p className="os-sales-source">Latest available sale: {asOfLabel(scopedLatestAvailableAt)}</p>}</div>
            <div className="pm-today os-recorded"><small>Recorded sales · last 7 days · {scopeLabel}</small><strong>{scopedWeekAvailable ? money(scopedWeekTotal) : salesSummary ? "No sales records" : salesError ? "Sales unavailable" : "…"}</strong>{salesSummary && <><p className="os-sales-window">{dateLabel(salesSummary.last7Days.from)}–{dateLabel(salesSummary.last7Days.to)} · Net of refunds</p><p className="os-sales-source">{salesSummary.last7Days.complete ? "Complete source coverage for this window." : `Latest recorded sale: ${asOfLabel(scopedWeekLatestAt)}. Full-period coverage is unverified.${!salesSummary.today.available ? ` No sales records for ${dateLabel(salesSummary.today.date)}.` : ""}`}</p></>}{salesError && <button type="button" className="os-sales-retry" onClick={retrySales}>Retry recorded sales</button>}</div>
            <button type="button" className="pm-row" onClick={() => setScreen("data")}><span className="pm-row-icon pm-green-bg"><Store size={19}/></span><span><b>How each outlet is doing</b><small>Payment pace and last Diwali&apos;s demand signal</small></span><ChevronRight size={18}/></button>
            <Heading title="Needs your attention" action="View all" onAction={() => setScreen("evidence")}/>
            <button type="button" className="pm-row" onClick={openStockAgentSetup}><span className="pm-row-icon"><ShieldCheck size={19}/></span><span><b>Set up a stock agent</b><small>Choose what to watch and set your limits</small></span><ChevronRight size={18}/></button>
            <button type="button" className="pm-row" onClick={() => setScreen("supplier")}><span className="pm-row-icon"><Handshake size={19}/></span><span><b>Supplier terms</b><small>Ask Gupta to defer or split GD-1182</small></span><ChevronRight size={18}/></button>
            <button type="button" className="pm-row" onClick={() => setScreen("data")}><span className="pm-row-icon pm-green-bg"><BadgeCheck size={19}/></span><span><b>Sources and gaps</b><small>See what is supplied and missing</small></span><ChevronRight size={18}/></button>
            <button type="button" className="pm-capital-tile" onClick={() => setScreen("capital")}><Landmark size={20}/><span><b>Capital when you need it</b><small>Request illustrative lender offers</small></span><ChevronRight size={18}/></button>
          </div>}
          {screen === "plan" && <div className="pm-screen">
            <div className="pm-lead"><p>30 Oct–7 Nov · all outlets</p><h2>A gap before Diwali</h2><span>Projected low on {dateLabel(cash?.cashPlan.anchors.lowestDate)}</span><strong className="pm-negative">{money(cash?.cashPlan.anchors.lowestBalanceInr)}</strong></div>
            <p className="pm-chart-label">{displayCopy(cash?.cashPlan.label || "Illustrative projection from the listed bills - not a measured future")}</p>
            <AnchorChart cash={cash}/>
            {!!cash?.cashPlan.dailyBalanceSeries?.length && <div className="pm-daily-series" aria-label="Modeled closing cash from 4 to 7 November"><b>Modeled closing cash · decision window</b>{cash.cashPlan.dailyBalanceSeries.filter(item => item.date >= "2026-11-04" && item.date <= "2026-11-07").map(item => <div key={item.date}><span>{dateLabel(item.date)}</span><strong className={item.balanceInr < 0 ? "negative" : "positive"}>{money(item.balanceInr)}</strong></div>)}<small>Forecast inflows and listed outflows; no future bank balance is measured.</small></div>}
            <div className="pm-source"><Info size={16}/>{displayCopy(cash?.cashPlan.dailyBalanceNote || "This view highlights three modeled dates.")}<button type="button" onClick={() => setScreen("data")}>Sources</button></div>
            <Heading title="Planned outflows"/>
            <div className="pm-ledger">{cash?.cashPlan.outflows.map(item => <div key={item.id}><span>{dateLabel(item.date)}</span><span>{item.payee}{item.invoiceId ? " · " + item.invoiceId : ""}{item.quality === "estimate" && <Pill tone="amber">Estimate</Pill>}</span><b>{money(item.amountInr)}</b></div>)}</div>
            <Heading title="Three ways to cover the gap"/>
            {choices.map(item => <button type="button" className="pm-option" key={item.id} onClick={() => choose(item)}><i>{item.rank}</i><span><b>{displayCopy(item.title)}</b><small>{displayCopy(item.costLabel)}</small><em>{typeof item.effectOn5Nov.balanceInr === "number" ? "5 Nov: " + money(item.effectOn5Nov.balanceInr) + (item.id === "cut_stock" ? " · illustrative arithmetic" : "") : displayCopy(item.effectOn5Nov.note || "Effect not supplied")}</em></span><ChevronRight size={18}/></button>)}
            {whatIf && <div className="pm-note"><b>Stock reduction · illustrative</b><p>{displayCopy(choices.find(item => item.id === "cut_stock")?.conditions.join(" "))}</p><p>Payment amounts do not reveal which products sold.</p><button type="button" onClick={() => setWhatIf(false)}>Close</button></div>}
          </div>}
          {screen === "munim" && <div className="pm-screen">
            <div className="ml-hero"><span><Sparkles size={27}/></span><h2>How can I help your shop?</h2><p>Talk through your cash and stock, or give an agent a task with limits you choose.</p><button type="button" className="pm-primary" data-munim-chat-trigger onClick={() => openChat()}>Ask Munim<Sparkles size={17}/></button><div className="ml-prompts" aria-label="Start a conversation">{scopePrompts.map(prompt => <button type="button" key={prompt} onClick={() => openChat(prompt)}>{prompt}</button>)}</div></div>
            <FlowMerchant setupRequest={agentSetupRequest} outletId={selectedOutlet} onSetupOpened={() => setAgentSetupRequest(0)}/>
            <div className="ml-tools"><button type="button" onClick={() => setScreen("plan")}><Activity size={16}/>Cash plan</button><button type="button" onClick={() => setScreen("data")}><Store size={16}/>Your shop data</button></div>
          </div>}
          {screen === "supplier" && <div className="pm-screen">
            <div className="pm-lead"><p>Gupta Distributors · invoice {gupta?.invoiceId || "GD-1182"}</p><h2>Ask for room to stock up</h2><span>Review supplier replies, full invoice evidence and your disclosure before a simulated payment.</span></div>
            <div className="pm-intent"><div><Handshake size={17}/><b>Listed supplier bill</b></div><p>{money(gupta?.amountInr)} due {dateLabel(gupta?.date)}. No supplier is contacted by this demo.</p></div>
            <button type="button" className="pm-row pm-mandate-link" onClick={() => setScreen("mandate")}><ShieldCheck size={19}/><span><b>View guard boundaries</b><small>Identity, account, evidence and your sign-off</small></span><ChevronRight size={18}/></button>
            <FlowMerchant category="supplier" outletId={selectedOutlet}/>
          </div>}
          {screen === "mandate" && <div className="pm-screen">
            <div className="pm-lead"><p>Owner boundaries</p><h2>What the guard can verify</h2><span>Missing requirements fail closed.</span></div>
            <div className="pm-mandate-table"><div><span>Drawdown destination</span><b>Owner account **4029</b></div><div><span>Drawdown ceiling</span><b>₹2,00,000</b></div><div><span>Approved lenders</span><b>Lender A, B, C</b></div><div><span>Supplier name</span><b>Gupta Distributors exactly</b></div><div><span>Supplier payment ceiling</span><b>{aaEvent && dataSummary?.supplier.aaAvailable ? money(dataSummary.supplier.derivedLimit) : "Awaiting AA sample"}</b></div></div>
            <div className="pm-hold"><CircleAlert size={18}/><span><b>Evidence follows the task</b><small>{aaEvent && dataSummary?.supplier.aaAvailable ? "The current ceiling uses clearly matched bank narrations across the complete prior financial year." : "Request the AA response before the guard uses observed Gupta payments."} The tracked task checks the selected header-only or full invoice version before any sign-off.</small></span></div>
            <button type="button" className="pm-primary pm-full" onClick={() => setScreen("supplier")}>Return to supplier request<ArrowRight size={18}/></button>
          </div>}
          {screen === "guard" && <div className="pm-screen" aria-live="polite"><FlowRiskOps compact/></div>}
          {screen === "capital" && <div className="pm-screen">
            <div className="pm-lead"><p>Partner financing · separate from supplier terms</p><h2>Compare capital offers</h2><span>Every executable request follows tracked evidence, bureau consent, offer disclosure and a simulated rail response.</span></div>
            <FlowMerchant category="capital" outletId={selectedOutlet}/>
            {lenders && <details className="pm-note"><summary>Illustrative lender comparison</summary><p>{displayCopy(lenders.scheduleLabel)}</p><p>Monthly EMI ceiling: {money(lenders.emiCap.maxTotalMonthlyEmiInr)}. Existing EMI: {money(lenders.emiCap.existingMonthlyEmiInr)}.</p><div className="pm-offer-list">{lenders.offers.map(item => <div key={item.id} className="pm-loan"><div><Landmark size={21}/><Pill tone={item.underCap ? "green" : "red"}>{item.underCap ? "Under cap" : "Over cap"}</Pill></div><b>{item.name} · {item.type}</b><p>{item.aprPercent}% APR · {item.tenorMonths} months · {money(item.totalInterestInr)} total interest</p><div><span>Monthly EMI <strong>{money(item.emiInr)}</strong></span><span>With existing <strong>{money(item.totalMonthlyEmiInr)}</strong></span></div></div>)}</div></details>}
          </div>}
          {screen === "data" && <div className="pm-screen">
            <div className="pm-lead"><p>Sources and limits</p><h2>Where the plan&apos;s numbers come from</h2><span>Cash anchors are illustrative, not measured future balances.</span></div>
            <div className="pm-data-row"><Wallet size={19}/><span><b>Paytm sales today · {scopeLabel}</b><small>{scopedSalesAvailable ? `${money(scopedSalesTotal)} recorded on ${dateLabel(salesSummary?.today.date)}.` : salesSummary ? `No sales records for ${dateLabel(salesSummary.today.date)}. Latest available sale: ${asOfLabel(scopedLatestAvailableAt)}.` : salesError || "Loading recorded sales…"}</small></span><Pill tone="green">Paytm</Pill></div>
            <div className="pm-data-row"><Activity size={19}/><span><b>Projected cash low · All outlets</b><small>{money(cash?.cashPlan.anchors.lowestBalanceInr)} on {dateLabel(cash?.cashPlan.anchors.lowestDate)} from the cash model.</small></span><Pill tone="amber">Projected</Pill></div>
            <div className="pm-data-row"><Store size={19}/><span><b>Outlet payment signals</b><small>Paytm activity by mapped device and last year&apos;s Diwali uplift. No SKU or unit data.</small></span><Pill>Sample</Pill></div>
            <Heading title={"Storefront pulse · " + dateLabel(salesSummary?.today.date || "2026-10-31")}/>
            {scopedOutlets.length ? <div className="pm-outlets">{scopedOutlets.map(item => <section className="pm-outlet" key={item.id}>
              <div className="pm-outlet-head"><span className="pm-outlet-code">{item.id}</span><h3>{item.name}</h3><Pill tone="blue">Paytm</Pill></div>
              <div className="pm-outlet-today"><span>Sales today</span><strong className={scopedSalesAvailable ? "" : "os-outlet-empty"}>{scopedSalesAvailable && scopedSalesRows.find(row => row.id === item.id)?.available ? money(scopedSalesRows.find(row => row.id === item.id)?.totalInr) : salesSummary ? "No sales records for 31 Oct" : salesError || "Loading recorded sales…"}</strong></div>
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
            <Heading title="Diwali week sales forecast"/>
            <div className="pm-forecast-intro"><span><Sparkles size={16}/>4–10 Nov · Projected future sales</span><p>The combined cash plan uses this outlet forecasting method, listed bills and completed payment effects. These figures are estimates, separate from recorded sales.</p></div>
            {forecastError && <div className="pm-hold" role="alert"><CircleAlert size={18}/><span><b>Outlet estimate unavailable</b><small>{displayCopy(forecastError)}</small></span><button type="button" onClick={() => { setForecastError(""); void get<OutletForecast>("/api/outlet-forecast").then(setOutletForecast).catch(e => setForecastError(e instanceof Error ? e.message : "Outlet forecast could not load.")); }}>Retry</button></div>}
            {scopedForecastOutlets.length ? <>
              <div className="pm-forecast-source"><b>{money(scopedForecastOutlets.reduce((sum, item) => sum + item.total.pointInr, 0))}</b><span>Forecast sales · {scopeLabel} · 4–10 Nov</span><small>Complete shift handovers through {dateLabel(outletForecast?.source.through)}. Partial 30 Oct payments are excluded.</small></div>
              <div className="pm-forecast-cards">{scopedForecastOutlets.map(item => <section className="pm-forecast-card" key={item.id}>
                <div className="pm-forecast-head"><b>{item.name}</b><Pill tone="amber">Estimate</Pill></div>
                <div className="pm-forecast-point"><span>7-day sales forecast</span><strong>{money(item.total.pointInr)}</strong></div>
                <p>Historical spread: <b>{money(item.total.lowInr)}–{money(item.total.highInr)}</b></p>
                <details><summary>See daily amounts and basis</summary><div className="pm-forecast-days">{item.days.map(day => <div key={day.date}><span>{dateLabel(day.date)}</span><b>{money(day.pointInr)}</b><small>{money(day.lowInr)}–{money(day.highInr)}</small></div>)}</div><p>Recent sales pace: {item.trendFactor.toFixed(2)}×. Last Diwali uplift: {item.festivalUplift.factor.toFixed(2)}×. These are payment patterns, not individual product sales.</p></details>
              </section>)}</div>
              <p className="pm-forecast-foot">{displayCopy(outletForecast?.rangeLabel)} Historical variation is a planning aid, not a guarantee.</p>
            </> : !forecastError && <div className="pm-hold"><CircleAlert size={18}/><span><b>Preparing outlet estimates</b><small>Reading the handover summary.</small></span></div>}
            <Heading title="Check stock coverage"/>
            <div className="pm-stock-intro"><b>Use your own item assumptions</b><p>Payments do not tell us which SKU sold. Enter a price, an estimated share of outlet revenue, stock on hand, and how many festival days to cover from 4 Nov to see a unit proxy.</p></div>
            <form className="pm-stock-form" onSubmit={event => void checkStock(event)}>
              <label>Outlet<select required value={stockInput.outletId} onChange={event => updateStockField("outletId", event.target.value)}><option value="">Choose outlet</option>{scopedForecastOutlets.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
              <label>Item name (optional)<input value={stockInput.skuLabel} onChange={event => updateStockField("skuLabel", event.target.value)} maxLength={80} placeholder="e.g. Diwali gift box"/></label>
              <div className="pm-stock-grid"><label>Price per unit (₹)<input required type="number" inputMode="numeric" min="1" step="1" value={stockInput.priceInr} onChange={event => updateStockField("priceInr", event.target.value)} placeholder="Owner input"/></label><label>Revenue share (%)<input required type="number" inputMode="decimal" min="0.1" max="100" step="0.1" value={stockInput.revenueSharePercent} onChange={event => updateStockField("revenueSharePercent", event.target.value)} placeholder="Estimate"/></label></div>
              <div className="pm-stock-grid"><label>Festival days to cover (from 4 Nov)<input required type="number" inputMode="numeric" min="1" max="7" step="1" value={stockInput.coverageDays} onChange={event => updateStockField("coverageDays", event.target.value)} placeholder="1–7"/></label><label>Units on hand<input required type="number" inputMode="numeric" min="0" step="1" value={stockInput.unitsOnHand} onChange={event => updateStockField("unitsOnHand", event.target.value)} placeholder="Counted stock"/></label></div>
              <button type="submit" className="pm-primary pm-full" disabled={stockBusy || !outletForecast}>{stockBusy ? "Checking…" : "Check coverage"}<ArrowRight size={17}/></button>
            </form>
            {stockError && <div className="pm-hold" role="alert"><CircleAlert size={18}/><span><b>Coverage not calculated</b><small>{displayCopy(stockError)}</small></span></div>}
            {stockResult && <div className={"pm-stock-result pm-stock-result-" + stockResult.state} role="status"><div className="pm-stock-result-head"><b>{stockResult.state === "likely_shortage" ? "Likely shortfall — review replenishment" : stockResult.state === "possible_surplus" ? "Possible surplus — review the order" : "Coverage needs monitoring"}</b><Pill tone={stockResult.state === "likely_shortage" ? "red" : "amber"}>Proxy</Pill></div><p>{stockResult.outlet.name} · {dateLabel(stockResult.horizon.from)} to {dateLabel(stockResult.horizon.to)} · {stockResult.horizon.coverageDays} festival days covered</p><div><span>Estimated units needed<b>{stockResult.estimatedDemandUnits.point}</b><small>Historical range {stockResult.estimatedDemandUnits.low}–{stockResult.estimatedDemandUnits.high}</small></span><span>Units on hand<b>{stockResult.assumptions.unitsOnHand}</b><small>Entered by owner</small></span></div><p>{displayCopy(stockResult.explanation)}</p>{stockResult.recommendedReviewUnits > 0 && <strong>Point-scenario gap: {stockResult.recommendedReviewUnits} units to review with the supplier.</strong>}<small>No SKU sales were observed. This check does not place an order or payment.</small></div>}
            <div className="pm-data-row"><Landmark size={19}/><span><b>Supplier payment history</b><small>{aaEvent && dataSummary?.supplier.aaAvailable ? `${dataSummary.supplier.priorFyDebitCount} clearly matched Gupta debits total ${money(dataSummary.supplier.priorFyDebitTotal)}. 110% ceiling: ${money(dataSummary.supplier.derivedLimit)}. ${dataSummary.supplier.completeFinancialYear ? "The prior FY is complete." : "The available period is partial."} Uncertain matches are excluded.` : "Observed Gupta payments are inferred from current bank narrations. Request an AA sample response before the guard uses them."}</small></span><Pill tone={aaEvent && dataSummary?.supplier.aaAvailable ? "green" : "amber"}>{aaEvent && dataSummary?.supplier.aaAvailable ? "Sample ready" : "Awaiting"}</Pill></div>
            <div className="pm-data-row"><FileText size={19}/><span><b>GD-1182 invoice</b><small>The source includes a header-only photo and full 212-line document. A tracked task checks the selected version, arithmetic, account, duplicates, and instructions.</small></span><Pill tone="green">V4 supplied</Pill></div>
            <button type="button" className="pm-primary pm-full" onClick={() => void request("aa")}>Request sample AA response<ArrowRight size={18}/></button>
            {requests.aa?.waiting && <div className="pm-hold"><CircleAlert size={18}/><span><b>Requested - waiting (simulated)</b><small>Waiting for the bank data response.</small></span></div>}
            {aaEvent && !requests.aa?.waiting && <div className="pm-note"><b>AA response received</b><p>{displayCopy(String(aaEvent.payload.status || aaEvent.payload.source || "Sample status received"))}. {dataSummary?.supplier.aaAvailable ? "The server can now check the bank rows for the supplier limit." : "The bank sample is not available for this request."} No real AA rail was contacted.</p></div>}
            <p className="pm-caption">{displayCopy(cash?.sourceNote)}</p>
          </div>}
          {screen === "evidence" && <div className="pm-screen">
            <div className="pm-lead"><p>Shared workflow evidence</p><h2>What happened, and what you were shown</h2><span>Follow the same live journal, disclosures and outcomes available in RiskOps.</span></div>
            <FlowRiskOps compact/>
            <button type="button" className="pm-secondary pm-full" onClick={() => setMode("riskops")}>Open full RiskOps trace<ArrowRight size={18}/></button>
          </div>}
        </div>
        <nav className="pm-bottom" aria-label="Merchant sections">{([{ id: "home", icon: Home, name: "Home" }, { id: "plan", icon: Activity, name: "Plan" }, { id: "munim", icon: Sparkles, name: "Munim" }, { id: "capital", icon: Landmark, name: "Capital" }, { id: "evidence", icon: FileText, name: "More" }] as const).map(item => { const Icon = item.icon; return <button type="button" key={item.id} className={screen === item.id ? "active" : ""} onClick={() => setScreen(item.id)}><Icon size={19}/><span>{item.name}</span></button>; })}</nav>
      </div>
    </section>
    <aside className="pm-right" aria-label="Demo controls">
      <div className="pm-control"><span>Journey control</span><h2>From projected gap to guarded action</h2><p>Compare the choices, request an external response, then inspect the guard and evidence.</p><button type="button" className="pm-primary pm-full" onClick={() => setScreen("plan")}>Review cash plan<ArrowRight size={18}/></button></div>
      <div className="pm-right-card"><span>Decision outcomes</span><p><CheckCircle2 size={17} className="pm-green"/>Requested - waiting</p><p><CircleAlert size={17} className="pm-amber"/>Needs verification</p><p><ShieldCheck size={17} className="pm-red"/>Blocked action</p></div>
      <div className="pm-right-card"><span>Source truth</span><p><b>Paytm</b> sees payment amounts by outlet, not products sold.</p><p><b>Cash plan</b> is a model, not a measured future.</p><p><b>Supplier cap</b> comes from prior-FY bank debits after a simulated AA response.</p></div>
      <button type="button" className="pm-open-risk" onClick={() => setMode("riskops")}><ShieldCheck size={20}/><span><b>Open RiskOps</b><small>Inspect cases and evidence</small></span><ArrowRight size={18}/></button>
    </aside>
    <MunimChat prompts={scopePrompts} open={chatOpen} messages={chatMessages} draft={chatDraft} onDraftChange={setChatDraft} onSend={sendChatMessage} onClose={() => setChatOpen(false)} onSetupAgent={openStockAgentSetup}/>
  </main>;
}
