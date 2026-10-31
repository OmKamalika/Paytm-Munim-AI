import { getFlowRuntime } from "../../../../lib/flow-runtime.js";
import { result } from "../http";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  return result(async () => {
    const url = new URL(request.url);
    return (await getFlowRuntime()).getState(url.searchParams.get("view") || "merchant", url.searchParams.get("runId") || undefined);
  });
}
