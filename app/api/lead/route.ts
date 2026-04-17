import { classifyLeadIntent, mentionsRestrictedItems } from "@/lib/business-rules";
import { forwardLead } from "@/lib/leads";
import { getClientIp, takeRateLimit } from "@/lib/security";
import { leadSchema } from "@/lib/validators";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = takeRateLimit(`lead:${ip}`, 8, 60_000);

  if (!limit.allowed) {
    return NextResponse.json({ message: "Too many requests. Please wait a minute and try again." }, { status: 429 });
  }

  const json = await request.json();
  const parsed = leadSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ message: "A few details are missing. Double-check the form and try again." }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true, message: "Thanks, we’ve got your request." });
  }

  const intent = classifyLeadIntent({
    timeline: parsed.data.timeline,
    details: parsed.data.details,
    serviceType: parsed.data.serviceType,
  });
  const restricted = mentionsRestrictedItems(parsed.data.details);

  const payload = {
    ...parsed.data,
    receivedAt: new Date().toISOString(),
    channel: "website",
    ip,
    leadTier: intent.tier,
    leadScore: intent.score,
    restrictedItemsFlag: restricted,
  };

  await forwardLead(payload);

  return NextResponse.json({
    ok: true,
    message: "Got it. Haul Time should be able to follow up shortly. If this is urgent, call now for the fastest response.",
  });
}
