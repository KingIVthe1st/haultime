import { getCloudflareContext } from "@opennextjs/cloudflare";

export type LeadStatus = "new" | "hot" | "contacted" | "quote" | "won" | "stale";
export type TaskStatus = "now" | "next" | "waiting" | "done";
export type TaskPriority = "critical" | "high" | "normal" | "low";

export type LeadRecord = {
  id: string;
  source: string;
  sessionId?: string;
  name?: string;
  phone?: string;
  email?: string;
  serviceType?: string;
  zipCode?: string;
  timeline?: string;
  details?: string;
  preferredContact?: string;
  leadTier?: string;
  leadScore?: number;
  restrictedItemsFlag?: boolean;
  status: LeadStatus;
  priority: TaskPriority;
  owner?: string;
  hasPhotos?: boolean;
  nextAction?: string;
  nextActionDue?: string;
  lastMessage?: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskSubtask = {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
};

export type TaskRecord = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  owner?: string;
  source?: string;
  tags: string[];
  subtasks: TaskSubtask[];
  position: number;
  createdAt: string;
  updatedAt: string;
};

export type DashboardStateSnapshot = {
  leads: LeadRecord[];
  tasks: TaskRecord[];
  leadSummary: {
    total: number;
    hot: number;
    needingCallback: number;
    quotesInFlight: number;
    wonThisBoard: number;
  };
  taskSummary: {
    totalOpen: number;
    overdue: number;
    dueToday: number;
    critical: number;
  };
  generatedAt: string;
};

export type CreateTaskInput = {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
  owner?: string;
  tags?: string[];
  subtasks?: Array<{ title: string }>;
  source?: string;
};

export type UpdateTaskInput = Partial<{
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  owner: string | null;
  tags: string[];
}>;

async function getStateBinding() {
  if (process.env.NEXT_PHASE === "phase-production-build" || process.env.npm_lifecycle_event === "build") {
    return undefined;
  }

  const cloudflareContext = await getCloudflareContext({ async: true }).catch(() => null);
  const env = cloudflareContext?.env as Record<string, any> | undefined;
  return env?.HAULTIME_STATE as { idFromName(name: string): any; get(id: any): { fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> } } | undefined;
}

async function stateFetch(path: string, init?: RequestInit) {
  const binding = await getStateBinding();

  if (!binding) {
    return null;
  }

  const stub = binding.get(binding.idFromName("primary"));
  return stub.fetch(`https://haultime-state${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers || {}),
    },
  });
}

export async function getDashboardStateSnapshot(): Promise<DashboardStateSnapshot> {
  const response = await stateFetch("/snapshot", { method: "GET" });

  if (!response?.ok) {
    return {
      leads: [],
      tasks: [],
      leadSummary: {
        total: 0,
        hot: 0,
        needingCallback: 0,
        quotesInFlight: 0,
        wonThisBoard: 0,
      },
      taskSummary: {
        totalOpen: 0,
        overdue: 0,
        dueToday: 0,
        critical: 0,
      },
      generatedAt: new Date().toISOString(),
    };
  }

  return (await response.json()) as DashboardStateSnapshot;
}

export async function recordLeadCapture(payload: Record<string, unknown>) {
  const response = await stateFetch("/lead", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response?.ok) return null;
  return response.json();
}

export async function recordChatLeadCapture(payload: Record<string, unknown>) {
  const response = await stateFetch("/lead/chat-capture", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response?.ok) return null;
  return response.json();
}

export async function listTasks() {
  const response = await stateFetch("/tasks", { method: "GET" });
  if (!response?.ok) return [];
  return (await response.json()) as TaskRecord[];
}

export async function createTask(payload: CreateTaskInput) {
  const response = await stateFetch("/tasks", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response?.ok) {
    throw new Error("task-create-failed");
  }

  return (await response.json()) as TaskRecord;
}

export async function updateTask(taskId: string, payload: UpdateTaskInput) {
  const response = await stateFetch(`/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (!response?.ok) {
    throw new Error("task-update-failed");
  }

  return (await response.json()) as TaskRecord;
}

export async function reorderTask(taskId: string, status: TaskStatus, overTaskId?: string | null) {
  const response = await stateFetch("/tasks/reorder", {
    method: "POST",
    body: JSON.stringify({ taskId, status, overTaskId }),
  });

  if (!response?.ok) {
    throw new Error("task-reorder-failed");
  }

  return (await response.json()) as TaskRecord[];
}

export async function addTaskSubtask(taskId: string, title: string) {
  const response = await stateFetch(`/tasks/${taskId}/subtasks`, {
    method: "POST",
    body: JSON.stringify({ title }),
  });

  if (!response?.ok) {
    throw new Error("subtask-create-failed");
  }

  return (await response.json()) as TaskRecord;
}

export async function updateTaskSubtask(taskId: string, subtaskId: string, payload: { title?: string; done?: boolean }) {
  const response = await stateFetch(`/tasks/${taskId}/subtasks/${subtaskId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (!response?.ok) {
    throw new Error("subtask-update-failed");
  }

  return (await response.json()) as TaskRecord;
}

export async function listLeads() {
  const response = await stateFetch("/leads", { method: "GET" });
  if (!response?.ok) return [];
  return (await response.json()) as LeadRecord[];
}

export async function updateLead(leadId: string, payload: Partial<LeadRecord>) {
  const response = await stateFetch(`/leads/${leadId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (!response?.ok) {
    throw new Error("lead-update-failed");
  }

  return (await response.json()) as LeadRecord;
}
