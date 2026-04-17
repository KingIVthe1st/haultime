import { createTask, listTasks } from "@/lib/dashboard-state";
import { NextResponse } from "next/server";

export async function GET() {
  const tasks = await listTasks();
  return NextResponse.json(tasks, { status: 200 });
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  if (!payload.title || typeof payload.title !== "string") {
    return NextResponse.json({ message: "Task title is required." }, { status: 400 });
  }

  const task = await createTask(payload as never);
  return NextResponse.json(task, { status: 201 });
}
