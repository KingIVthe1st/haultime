import { getWebsiteChatReply } from "@/lib/chat";
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

  const reply = await getWebsiteChatReply(parsed.data);
  return NextResponse.json(reply);
}
