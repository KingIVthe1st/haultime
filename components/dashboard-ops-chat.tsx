"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  initialBrief: string[];
  refreshedLabel: string;
};

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

type ScopeKey = "general" | "pulse" | "field" | "playbook" | "profit" | "growth" | "crm" | "tasks";

type ScopeMeta = {
  label: string;
  intro: string;
  prompts: string[];
};

const scopeMeta: Record<ScopeKey, ScopeMeta> = {
  general: {
    label: "operator desk",
    intro: "Ask what deserves attention first and I’ll answer like a sharp dispatcher, not a motivational poster.",
    prompts: [
      "What should Antoine prioritize first?",
      "Is same-day realistic right now?",
      "What should Jade watch today?",
    ],
  },
  pulse: {
    label: "ops pulse",
    intro: "I’ll read the top-level pressure fast: route, weather, daylight, and what deserves the first callback burst.",
    prompts: [
      "What is the first move this login?",
      "What changes in the next 4 hours?",
      "What is the biggest risk right now?",
    ],
  },
  field: {
    label: "field desk",
    intro: "I’ll translate weather, drive time, and daylight into scheduling moves that protect margin.",
    prompts: [
      "Which zone is easiest money right now?",
      "Should they push outdoor jobs first?",
      "Where does route time get dangerous?",
    ],
  },
  playbook: {
    label: "owner playbook",
    intro: "I’ll turn the board into the next three owner actions, not another layer of admin sludge.",
    prompts: [
      "What should they do before lunch?",
      "What gets a callback first?",
      "What should be ignored for now?",
    ],
  },
  profit: {
    label: "profit centers",
    intro: "I’ll stay focused on lead speed, quoting, reviews, and the parts of the machine that actually move revenue.",
    prompts: [
      "Which module makes money fastest?",
      "Where is the quoting friction?",
      "What should be automated next?",
    ],
  },
  growth: {
    label: "growth desk",
    intro: "I’ll stay on review capture, local SEO, proof gaps, and the moves that make the phone ring more often.",
    prompts: [
      "What should they publish next?",
      "What proof is missing?",
      "What question should become SEO content?",
    ],
  },
  crm: {
    label: "crm desk",
    intro: "I’ll read the live lead board and tell you who deserves the next callback, quote push, or rescue move.",
    prompts: [
      "Who should get the next callback?",
      "Which lead is hottest right now?",
      "Where is the quote friction?",
    ],
  },
  tasks: {
    label: "task board",
    intro: "I’ll read the shared operating board like a chief of staff, not a sticky-note app.",
    prompts: [
      "What should move to now?",
      "What is overdue?",
      "What can wait until later?",
    ],
  },
};

export function DashboardOpsChat({ initialBrief, refreshedLabel }: Props) {
  const [scope, setScope] = useState<ScopeKey>("general");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Last refresh: ${refreshedLabel}. ${scopeMeta.general.intro}`,
    },
  ]);

  const prompts = useMemo(() => scopeMeta[scope].prompts, [scope]);

  useEffect(() => {
    function handlePreset(event: Event) {
      const detail = (event as CustomEvent<{ section?: string; prompt?: string }>).detail;
      const nextScope = (detail?.section as ScopeKey | undefined) || "general";
      const prompt = detail?.prompt?.trim();

      setScope(nextScope in scopeMeta ? nextScope : "general");

      if (prompt) {
        void sendMessage(prompt, nextScope in scopeMeta ? nextScope : "general");
      }
    }

    window.addEventListener("dashboard-jade-open", handlePreset as EventListener);
    return () => window.removeEventListener("dashboard-jade-open", handlePreset as EventListener);
  }, [messages, loading]);

  async function sendMessage(content: string, forcedScope?: ScopeKey) {
    if (!content.trim() || loading) return;

    const activeScope = forcedScope || scope;
    const nextMessages = [...messages, { role: "user" as const, content: content.trim() }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/dashboard/jade", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: content.trim(), section: activeScope }),
      });

      const data = (await response.json()) as { reply?: string };
      setMessages((current) => [...current, { role: "assistant", content: data.reply || initialBrief[0] || "Ask me for the next best move." }]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "The ops reply route glitched. Default move: close hot leads first, keep route time honest, and ask for photos before casual quotes.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="dashboardOpsHeader">
        <div>
          <p className="dashboardEyebrow">Jade strategist</p>
          <h3 className="dashboardSectionTitle">{scopeMeta[scope].label}</h3>
          <p className="dashboardSectionSubcopy">{scopeMeta[scope].intro}</p>
        </div>
        <span className="dashboardPill">Live ops context</span>
      </div>

      <div className="dashboardBriefList">
        {initialBrief.map((item) => (
          <article key={item} className="dashboardBriefCard">
            {item}
          </article>
        ))}
      </div>

      <div className="dashboardPromptRow">
        {prompts.map((prompt) => (
          <button key={prompt} type="button" className="dashboardPromptButton" onClick={() => sendMessage(prompt)} disabled={loading}>
            {prompt}
          </button>
        ))}
      </div>

      <div className="dashboardChatThread">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={message.role === "assistant" ? "dashboardBubble dashboardBubbleAssistant" : "dashboardBubble dashboardBubbleUser"}>
            {message.content}
          </div>
        ))}
        {loading ? <div className="dashboardBubble dashboardBubbleAssistant">Thinking through the best move...</div> : null}
      </div>

      <div className="dashboardChatComposer">
        <textarea
          rows={3}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about route risk, callback order, quote pressure, review timing, or what Jade should do next."
        />
        <button type="button" className="dashboardAction dashboardActionPrimary" onClick={() => sendMessage(input)} disabled={loading || !input.trim()}>
          Ask Jade
        </button>
      </div>
    </section>
  );
}
