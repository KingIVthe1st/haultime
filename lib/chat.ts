import { detectPromptInjection } from "@/lib/security";

type ChatMessage = { role: "user" | "assistant"; content: string };

type LeadContext = {
  name?: string;
  phone?: string;
  zipCode?: string;
  serviceType?: string;
  timeline?: string;
};

function latestUserMessage(messages: ChatMessage[]) {
  return [...messages].reverse().find((message) => message.role === "user")?.content || "";
}

function buildFallbackReply(message: string, leadContext?: LeadContext) {
  const lower = message.toLowerCase();

  if (detectPromptInjection(message)) {
    return "I can help with junk removal questions, quote details, service areas, timing, and getting your request in front of the Haul Time team. Tell me what needs to be removed and where the job is located.";
  }

  if (lower.includes("price") || lower.includes("cost") || lower.includes("quote")) {
    return "I can help get this qualified quickly. For a rough estimate, send what needs to be removed, your ZIP code, about how much there is, and any access issues like stairs, gates, or long carry distance.";
  }

  if (lower.includes("same day") || lower.includes("today") || lower.includes("asap")) {
    return "Got it. If this is urgent, send your ZIP code, what needs to go, and whether photos are available. I’ll help tee this up for the fastest possible response.";
  }

  if (lower.includes("service area") || lower.includes("zip") || lower.includes("location")) {
    return "Send the job ZIP code or city and I’ll help confirm whether it fits the service area and what the best next step is.";
  }

  if (!leadContext?.zipCode) {
    return "Happy to help. What ZIP code is the job in, and what needs to be removed? If you have photos, that usually speeds things up.";
  }

  if (!leadContext?.serviceType) {
    return "Thanks. Is this more like a residential pickup, a property cleanout, a commercial cleanout, or a bulky-item removal?";
  }

  if (!leadContext?.timeline) {
    return "Perfect. When are you hoping to get it done, and are there any access issues like stairs, elevators, gates, or a long walk to the truck?";
  }

  return "That helps. The fastest next step is to share photos plus your best callback number, and I’ll make sure the request is qualified for the team.";
}

export async function getWebsiteChatReply(input: {
  sessionId: string;
  messages: ChatMessage[];
  leadContext?: LeadContext;
}) {
  const message = latestUserMessage(input.messages);
  const webhookUrl = process.env.JADE_SITE_WEBHOOK_URL;
  const webhookSecret = process.env.JADE_SITE_WEBHOOK_SECRET;

  if (!webhookUrl) {
    return { reply: buildFallbackReply(message, input.leadContext), mode: "fallback" as const };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(webhookSecret ? { authorization: `Bearer ${webhookSecret}` } : {}),
    },
    body: JSON.stringify({
      mode: "website-lead-intake",
      sessionId: input.sessionId,
      constraints: {
        allowFaq: true,
        allowLeadCapture: true,
        allowCallbackRequest: true,
        allowQuoteQualification: true,
        allowFinalPricing: false,
        allowBookingConfirmation: false,
        toolScope: ["faq", "lead_capture", "escalation", "owner_notify"],
      },
      messages: input.messages,
      leadContext: input.leadContext,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return { reply: buildFallbackReply(message, input.leadContext), mode: "fallback" as const };
  }

  const data = (await response.json()) as { reply?: string };
  return {
    reply: data.reply?.slice(0, 1200) || buildFallbackReply(message, input.leadContext),
    mode: "webhook" as const,
  };
}
