import { getDemoActionRuntime } from "../../../lib/action-runtime.js";
import { buildCashPlan } from "../../../lib/cash-fixture.js";
import { currentRelief } from "../../../lib/cash-state.js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Send the approved action and owner PIN." }, { status: 400 });
  }
  const result = await getDemoActionRuntime().execute({
    action: body.action,
    approval_id: body.approval_id,
    pin: body.pin,
    idempotency_key: body.idempotency_key,
  });
  // The 5 Nov balance comes from the cash engine with the relief that has
  // actually happened, not from a fixed baseline.
  const done = result.outcome === "done-simulated";
  const balance = done && "balance_on_5_nov" in result
    ? buildCashPlan(await currentRelief()).cashPlan.dailyBalanceSeries.find((day) => day.date === "2026-11-05")?.balanceInr ?? null
    : undefined;
  return Response.json({ ...result, ...(balance !== undefined ? { balance_on_5_nov: balance } : {}), synthetic: true, moneyMovement: "in-memory only" }, {
    status: done ? 200 : 409,
    headers: { "Cache-Control": "no-store" },
  });
}
