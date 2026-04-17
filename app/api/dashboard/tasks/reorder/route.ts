import { reorderTask } from "@/lib/dashboard-state";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as {
    taskId?: string;
    status?: "now" | "next" | "waiting" | "done";
    overTaskId?: string | null;
  };

  if (!payload.taskId || !payload.status) {
    return NextResponse.json({ message: "taskId and status are required." }, { status: 400 });
  }

  const tasks = await reorderTask(payload.taskId, payload.status, payload.overTaskId || null);
  return NextResponse.json(tasks, { status: 200 });
}
