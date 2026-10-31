import { retired } from "../../disabled";

export const dynamic = "force-dynamic";

export async function GET() {
  return retired("GET /api/simulator/state");
}
