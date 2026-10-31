import { buildCashPlan, buildOptions } from "../../../lib/cash-fixture.js";
import { currentRelief } from "../../../lib/cash-state.js";
import { answerQuestion } from "../../../lib/munim-dialogue.js";
import { getSimulatorStore } from "../../../lib/simulator-store.js";
import { syntheticSource } from "../../../lib/synthetic-source.generated.js";
import { revisedInvoice } from "../../../lib/invoice-gd-1182-r1.generated.js";
import { outletOrder } from "../../../lib/outlet-order.js";

export const dynamic = "force-dynamic";

// Deterministic dialogue only: it reads calculated results and never acts.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Send a JSON question." }, { status: 400 });
  }
  const question = typeof body.question === "string" ? body.question.slice(0, 500) : "";
  const relief = await currentRelief();
  const store = getSimulatorStore();
  const state = store.getState();
  const answer = answerQuestion(question, {
    cash: buildCashPlan(relief),
    options: buildOptions(relief),
    invoice: syntheticSource.invoice,
    revisedInvoice,
    order: outletOrder,
    outlets: syntheticSource.outletMetrics,
    supplier: {
      requested: Boolean(state.latestRequest.supplier),
      eventSeq: store.getActiveResponse("supplier")?.seq ?? null,
      accepted: relief.some((item) => item.type === "supplier_deferral"),
      paidInvoiceId: relief.find((item) => item.type === "payment_record")?.paidInvoiceId ?? null,
    },
  });
  return Response.json({ question, ...answer, synthetic: true, actionTaken: false }, { headers: { "Cache-Control": "no-store" } });
}
