import { getDemoActionRuntime } from "../../../lib/action-runtime.js";

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
  return Response.json({ ...result, synthetic: true, moneyMovement: "in-memory only" }, {
    status: result.outcome === "done-simulated" ? 200 : 409,
    headers: { "Cache-Control": "no-store" },
  });
}
