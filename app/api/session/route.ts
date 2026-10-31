import { getFlowRuntime } from "../../../lib/flow-runtime.js";

export const dynamic = "force-dynamic";

// Lets clients notice a server restart (new sessionId) and refresh projections
// when the action history changes (revision).
export async function GET() {
  return Response.json({ ...(await (await getFlowRuntime()).getSession()), synthetic: true }, { headers: { "Cache-Control": "no-store" } });
}
