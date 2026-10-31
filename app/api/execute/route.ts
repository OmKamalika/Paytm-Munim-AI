import { retired } from "../disabled";

export const dynamic = "force-dynamic";

export async function POST() {
  return retired("POST /api/execute");
}
