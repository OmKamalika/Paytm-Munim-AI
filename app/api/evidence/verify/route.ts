import { getDemoActionRuntime } from "../../../../lib/action-runtime.js";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await getDemoActionRuntime().verifyEvidence();
  return Response.json({ ...result, status: result.ok ? "OK" : "VERIFICATION_FAILED", synthetic: true }, {
    headers: { "Cache-Control": "no-store" },
  });
}
