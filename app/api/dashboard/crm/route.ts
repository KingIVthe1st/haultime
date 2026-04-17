import { getDashboardStateSnapshot } from "@/lib/dashboard-state";
import { NextResponse } from "next/server";

export async function GET() {
  const snapshot = await getDashboardStateSnapshot();
  return NextResponse.json(snapshot, { status: 200 });
}
