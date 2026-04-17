import { buildDashboardAssistantReply } from "@/lib/dashboard-live";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const json = (await request.json().catch(() => ({}))) as { question?: string; section?: string };
    const question = json.question?.trim();
    const section = json.section?.trim();

    if (!question) {
      return NextResponse.json(
        {
          reply:
            "Ask me what deserves attention first, whether same-day is realistic, how route pressure looks, or what Jade should do next.",
        },
        { status: 400 },
      );
    }

    const reply = await buildDashboardAssistantReply(question, section);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      {
        reply:
          "The ops reply route glitched. Default move: hit hot leads first, keep route time honest, and ask for photos before casual quotes.",
      },
      { status: 200 },
    );
  }
}
