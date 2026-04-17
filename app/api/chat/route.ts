import { classifyLeadIntent, mentionsRestrictedItems } from "@/lib/business-rules";
import { getWebsiteChatReply } from "@/lib/chat";
import { recordChatLeadCapture } from "@/lib/dashboard-state";
import { detectPromptInjection, getClientIp, takeRateLimit } from "@/lib/security";
import { chatRequestSchema } from "@/lib/validators";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = takeRateLimit(`chat:${ip}`, 20, 60_000);

  if (!limit.allowed) {
    return NextResponse.json(
      { reply: "You’re moving fast, which I respect, but give me a second and try again." },
      { status: 429 },
    );
  }

  const json = await request.json();
  const parsed = chatRequestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { reply: "Tell me what needs to be removed, where the job is, and when you want it done." },
      { status: 400 },
    );
  }

  const latestMessage = parsed.data.messages[parsed.data.messages.length - 1]?.content || "";

  if (detectPromptInjection(latestMessage)) {
    return NextResponse.json({
      reply:
        "I can help with junk removal questions, quote details, service area checks, timing, and callback requests. Tell me about the job and I’ll help with the next step.",
    });
  }

  const intent = classifyLeadIntent({
    timeline: parsed.data.leadContext?.timeline,
    details: latestMessage,
    serviceType: parsed.data.leadContext?.serviceType,
  });

  const hasCaptureSignals = Boolean(
    parsed.data.leadContext?.phone ||
      parsed.data.leadContext?.zipCode ||
      parsed.data.leadContext?.serviceType ||
      /quote|price|pickup|remove|cleanout|same day|today|asap/i.test(latestMessage),
  );

  if (hasCaptureSignals) {
    await recordChatLeadCapture({
      sessionId: parsed.data.sessionId,
      source: "website-chat",
      leadContext: parsed.data.leadContext,
      latestUserMessage: latestMessage,
      leadTier: intent.tier,
      leadScore: intent.score,
      restrictedItemsFlag: mentionsRestrictedItems(latestMessage),
    }).catch(() => null);
  }

  const reply = await getWebsiteChatReply(parsed.data);
  return NextResponse.json(reply);
}
