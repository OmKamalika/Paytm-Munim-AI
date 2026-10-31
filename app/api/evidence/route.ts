import { getDemoActionRuntime } from "../../../lib/action-runtime.js";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await getDemoActionRuntime().getEvidence();
  return Response.json({ ...result, synthetic: true, storage: "process-local memory" }, {
    headers: { "Cache-Control": "no-store" },
  });
}
