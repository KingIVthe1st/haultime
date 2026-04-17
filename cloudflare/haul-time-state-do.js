import { DurableObject } from "cloudflare:workers";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });
}

function normalizePriority(value) {
  return ["critical", "high", "normal", "low"].includes(value) ? value : "normal";
}

function normalizeTaskStatus(value) {
  return ["now", "next", "waiting", "done"].includes(value) ? value : "next";
}

function normalizeLeadStatus(value) {
  return ["new", "hot", "contacted", "quote", "won", "stale"].includes(value) ? value : "new";
}

function parseJson(request) {
  return request.json().catch(() => ({}));
}

function buildLeadPriority(input) {
  if (input.leadTier === "hot" || input.restrictedItemsFlag) return "critical";
  if ((input.leadScore || 0) >= 4) return "high";
  return "normal";
}

function taskComparator(a, b) {
  return a.position - b.position || new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}

export class HaulTimeStateDO extends DurableObject {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    const method = request.method.toUpperCase();

    if (method === "GET" && path === "/snapshot") {
      return json(await this.getSnapshot());
    }

    if (method === "GET" && path === "/leads") {
      return json(await this.getLeads());
    }

    if (method === "POST" && path === "/lead") {
      const payload = await parseJson(request);
      return json(await this.createLead(payload));
    }

    if (method === "POST" && path === "/lead/chat-capture") {
      const payload = await parseJson(request);
      return json(await this.upsertChatLead(payload));
    }

    if (method === "PATCH" && path.startsWith("/leads/")) {
      const leadId = path.split("/")[2];
      const payload = await parseJson(request);
      return json(await this.updateLead(leadId, payload));
    }

    if (method === "GET" && path === "/tasks") {
      return json(await this.getTasks());
    }

    if (method === "POST" && path === "/tasks") {
      const payload = await parseJson(request);
      return json(await this.createTask(payload));
    }

    if (method === "POST" && path === "/tasks/reorder") {
      const payload = await parseJson(request);
      return json(await this.reorderTask(payload));
    }

    if (method === "PATCH" && /^\/tasks\/[^/]+$/.test(path)) {
      const taskId = path.split("/")[2];
      const payload = await parseJson(request);
      return json(await this.updateTask(taskId, payload));
    }

    if (method === "POST" && /^\/tasks\/[^/]+\/subtasks$/.test(path)) {
      const taskId = path.split("/")[2];
      const payload = await parseJson(request);
      return json(await this.addSubtask(taskId, payload));
    }

    if (method === "PATCH" && /^\/tasks\/[^/]+\/subtasks\/[^/]+$/.test(path)) {
      const [, , taskId, , subtaskId] = path.split("/");
      const payload = await parseJson(request);
      return json(await this.updateSubtask(taskId, subtaskId, payload));
    }

    return json({ error: "not-found" }, 404);
  }

  async getLeads() {
    return (await this.ctx.storage.get("leads")) || [];
  }

  async saveLeads(leads) {
    await this.ctx.storage.put("leads", leads);
    return leads;
  }

  async getTasks() {
    const tasks = (await this.ctx.storage.get("tasks")) || [];
    if (!tasks.length) {
      const seeded = this.buildStarterTasks();
      await this.ctx.storage.put("tasks", seeded);
      return seeded;
    }
    return tasks.sort(taskComparator);
  }

  async saveTasks(tasks) {
    const next = [...tasks].sort(taskComparator);
    await this.ctx.storage.put("tasks", next);
    return next;
  }

  buildStarterTasks() {
    const now = new Date().toISOString();
    return [
      {
        id: crypto.randomUUID(),
        title: "Lock approved pricing bands",
        description: "Turn the rough quoting flow into a business-approved price rubric for the most common haul types.",
        status: "now",
        priority: "critical",
        dueDate: now.slice(0, 10),
        owner: "Antoine / Anthony",
        source: "system-seed",
        tags: ["pricing", "quotes"],
        subtasks: [
          { id: crypto.randomUUID(), title: "List the 10 most common job types", done: false, createdAt: now },
          { id: crypto.randomUUID(), title: "Define floor, target, and stretch price bands", done: false, createdAt: now },
        ],
        position: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: crypto.randomUUID(),
        title: "Define restricted-item policy",
        description: "Get crystal clear on what Haul Time will not haul, what needs review, and what language Jade should use.",
        status: "now",
        priority: "high",
        dueDate: now.slice(0, 10),
        owner: "Antoine / Anthony",
        source: "system-seed",
        tags: ["policy", "risk"],
        subtasks: [
          { id: crypto.randomUUID(), title: "Approve do-not-haul list", done: false, createdAt: now },
          { id: crypto.randomUUID(), title: "Approve escalation wording", done: false, createdAt: now },
        ],
        position: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: crypto.randomUUID(),
        title: "Get Anthony direct notification number",
        description: "Finish the owner loop so hot leads and system alerts reach both brothers without gaps.",
        status: "next",
        priority: "high",
        owner: "Ivanlee",
        source: "system-seed",
        tags: ["owners", "notifications"],
        subtasks: [],
        position: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: crypto.randomUUID(),
        title: "Approve after-hours callback rules",
        description: "Give Jade and the CRM a real expectation ladder for nights, weekends, and holidays.",
        status: "waiting",
        priority: "normal",
        owner: "Antoine / Anthony",
        source: "system-seed",
        tags: ["policy", "callbacks"],
        subtasks: [],
        position: 0,
        createdAt: now,
        updatedAt: now,
      },
    ];
  }

  async getSnapshot() {
    const [leads, tasks] = await Promise.all([this.getLeads(), this.getTasks()]);
    const openTasks = tasks.filter((task) => task.status !== "done");
    const today = new Date().toISOString().slice(0, 10);

    return {
      leads,
      tasks,
      leadSummary: {
        total: leads.length,
        hot: leads.filter((lead) => lead.status === "hot" || lead.priority === "critical").length,
        needingCallback: leads.filter((lead) => ["new", "hot"].includes(lead.status)).length,
        quotesInFlight: leads.filter((lead) => lead.status === "quote").length,
        wonThisBoard: leads.filter((lead) => lead.status === "won").length,
      },
      taskSummary: {
        totalOpen: openTasks.length,
        overdue: openTasks.filter((task) => task.dueDate && task.dueDate < today).length,
        dueToday: openTasks.filter((task) => task.dueDate === today).length,
        critical: openTasks.filter((task) => task.priority === "critical").length,
      },
      generatedAt: new Date().toISOString(),
    };
  }

  async createLead(input) {
    const leads = await this.getLeads();
    const createdAt = input.receivedAt || new Date().toISOString();
    const lead = {
      id: crypto.randomUUID(),
      source: input.source || "website-form",
      sessionId: input.sessionId,
      name: input.name,
      phone: input.phone,
      email: input.email,
      serviceType: input.serviceType,
      zipCode: input.zipCode,
      timeline: input.timeline,
      details: input.details,
      preferredContact: input.preferredContact,
      leadTier: input.leadTier,
      leadScore: input.leadScore || 0,
      restrictedItemsFlag: Boolean(input.restrictedItemsFlag),
      status: normalizeLeadStatus(input.leadTier === "hot" ? "hot" : input.status),
      priority: buildLeadPriority(input),
      owner: input.owner || "Antoine / Anthony",
      hasPhotos: String(input.details || "").toLowerCase().includes("photos available: yes"),
      nextAction: input.leadTier === "hot" ? "Call now" : "Review and reply",
      nextActionDue: createdAt,
      lastMessage: input.details,
      createdAt,
      updatedAt: createdAt,
    };

    leads.unshift(lead);
    await this.saveLeads(leads.slice(0, 250));
    return lead;
  }

  async upsertChatLead(input) {
    const leads = await this.getLeads();
    const now = new Date().toISOString();
    const sessionId = input.sessionId || crypto.randomUUID();
    const existingIndex = leads.findIndex((lead) => lead.sessionId && lead.sessionId === sessionId);
    const priority = buildLeadPriority(input);
    const next = {
      source: input.source || "website-chat",
      sessionId,
      name: input.leadContext?.name,
      phone: input.leadContext?.phone,
      zipCode: input.leadContext?.zipCode,
      serviceType: input.leadContext?.serviceType,
      timeline: input.leadContext?.timeline,
      details: input.latestUserMessage,
      lastMessage: input.latestUserMessage,
      leadTier: input.leadTier,
      leadScore: input.leadScore || 0,
      restrictedItemsFlag: Boolean(input.restrictedItemsFlag),
      status: normalizeLeadStatus(input.leadTier === "hot" ? "hot" : existingIndex >= 0 ? leads[existingIndex].status : "new"),
      priority,
      owner: "Antoine / Anthony",
      hasPhotos: String(input.latestUserMessage || "").toLowerCase().includes("photo"),
      nextAction: priority === "critical" ? "Call or text now" : "Continue qualifying",
      nextActionDue: now,
      updatedAt: now,
    };

    if (existingIndex >= 0) {
      leads[existingIndex] = {
        ...leads[existingIndex],
        ...next,
      };
      await this.saveLeads(leads);
      return leads[existingIndex];
    }

    const lead = {
      id: crypto.randomUUID(),
      createdAt: now,
      ...next,
    };

    leads.unshift(lead);
    await this.saveLeads(leads.slice(0, 250));
    return lead;
  }

  async updateLead(leadId, payload) {
    const leads = await this.getLeads();
    const index = leads.findIndex((lead) => lead.id === leadId);

    if (index < 0) {
      return { error: "lead-not-found" };
    }

    leads[index] = {
      ...leads[index],
      ...payload,
      status: payload.status ? normalizeLeadStatus(payload.status) : leads[index].status,
      priority: payload.priority ? normalizePriority(payload.priority) : leads[index].priority,
      updatedAt: new Date().toISOString(),
    };

    await this.saveLeads(leads);
    return leads[index];
  }

  async createTask(input) {
    const tasks = await this.getTasks();
    const now = new Date().toISOString();
    const status = normalizeTaskStatus(input.status);
    const laneTasks = tasks.filter((task) => task.status === status);
    const task = {
      id: crypto.randomUUID(),
      title: String(input.title || "").trim(),
      description: String(input.description || "").trim() || undefined,
      status,
      priority: normalizePriority(input.priority),
      dueDate: input.dueDate || undefined,
      owner: input.owner || "Shared",
      source: input.source || "dashboard",
      tags: Array.isArray(input.tags) ? input.tags.filter(Boolean).slice(0, 5) : [],
      subtasks: Array.isArray(input.subtasks)
        ? input.subtasks
            .filter((subtask) => subtask?.title)
            .slice(0, 8)
            .map((subtask) => ({
              id: crypto.randomUUID(),
              title: String(subtask.title).trim(),
              done: false,
              createdAt: now,
            }))
        : [],
      position: laneTasks.length,
      createdAt: now,
      updatedAt: now,
    };

    tasks.push(task);
    await this.saveTasks(tasks);
    return task;
  }

  async updateTask(taskId, payload) {
    const tasks = await this.getTasks();
    const index = tasks.findIndex((task) => task.id === taskId);

    if (index < 0) {
      return { error: "task-not-found" };
    }

    tasks[index] = {
      ...tasks[index],
      ...payload,
      status: payload.status ? normalizeTaskStatus(payload.status) : tasks[index].status,
      priority: payload.priority ? normalizePriority(payload.priority) : tasks[index].priority,
      dueDate: payload.dueDate || undefined,
      owner: payload.owner || tasks[index].owner,
      updatedAt: new Date().toISOString(),
    };

    await this.saveTasks(tasks);
    return tasks[index];
  }

  async reorderTask(input) {
    const tasks = await this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === input.taskId);
    if (taskIndex < 0) return tasks;

    const moving = { ...tasks[taskIndex], status: normalizeTaskStatus(input.status), updatedAt: new Date().toISOString() };
    const remaining = tasks.filter((task) => task.id !== input.taskId);
    const lanes = {
      now: remaining.filter((task) => task.status === "now").sort(taskComparator),
      next: remaining.filter((task) => task.status === "next").sort(taskComparator),
      waiting: remaining.filter((task) => task.status === "waiting").sort(taskComparator),
      done: remaining.filter((task) => task.status === "done").sort(taskComparator),
    };

    const lane = lanes[moving.status];
    const insertAt = input.overTaskId ? lane.findIndex((task) => task.id === input.overTaskId) : lane.length;
    lane.splice(insertAt >= 0 ? insertAt : lane.length, 0, moving);

    const finalTasks = ([]).concat(
      lanes.now.map((task, index) => ({ ...task, position: index })),
      lanes.next.map((task, index) => ({ ...task, position: index })),
      lanes.waiting.map((task, index) => ({ ...task, position: index })),
      lanes.done.map((task, index) => ({ ...task, position: index })),
    );

    await this.saveTasks(finalTasks);
    return this.getTasks();
  }

  async addSubtask(taskId, input) {
    const tasks = await this.getTasks();
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index < 0) return { error: "task-not-found" };

    tasks[index] = {
      ...tasks[index],
      subtasks: [
        ...tasks[index].subtasks,
        {
          id: crypto.randomUUID(),
          title: String(input.title || "").trim(),
          done: false,
          createdAt: new Date().toISOString(),
        },
      ],
      updatedAt: new Date().toISOString(),
    };

    await this.saveTasks(tasks);
    return tasks[index];
  }

  async updateSubtask(taskId, subtaskId, input) {
    const tasks = await this.getTasks();
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index < 0) return { error: "task-not-found" };

    tasks[index] = {
      ...tasks[index],
      subtasks: tasks[index].subtasks.map((subtask) =>
        subtask.id === subtaskId
          ? {
              ...subtask,
              title: input.title ? String(input.title).trim() : subtask.title,
              done: typeof input.done === "boolean" ? input.done : subtask.done,
            }
          : subtask,
      ),
      updatedAt: new Date().toISOString(),
    };

    await this.saveTasks(tasks);
    return tasks[index];
  }
}
