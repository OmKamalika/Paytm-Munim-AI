import { getDemoActionRuntime } from "../../../../lib/action-runtime.js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Send a JSON action to evaluate." }, { status: 400 });
  }
  const result = await getDemoActionRuntime().evaluate(body.action);
  return Response.json({ ...result, synthetic: true, moneyMovement: "none" }, {
    headers: { "Cache-Control": "no-store" },
  });
}
