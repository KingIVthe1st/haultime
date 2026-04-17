"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { siteConfig } from "@/lib/site";

type ChatMessage = { role: "assistant" | "user"; content: string };

const quickPrompts = ["Same-day quote", "Office cleanout", "Can I send photos?"];

export function JadeChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: siteConfig.chatGreeting },
  ]);

  const sessionId = useMemo(() => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `session-${Date.now()}`;
  }, []);

  async function sendPayload(content: string) {
    if (!content.trim() || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content: content.trim() }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sessionId,
        messages: nextMessages,
      }),
    });

    const data = (await response.json()) as { reply?: string };

    setMessages((current) => [
      ...current,
      { role: "assistant", content: data.reply || "Tell me a little about the job and I’ll help with the next step." },
    ]);
    setLoading(false);
  }

  async function sendMessage() {
    await sendPayload(input);
  }

  return (
    <>
      <button className="chat-launcher" onClick={() => setOpen((current) => !current)}>
        <span className="chat-launcher-avatar">
          <Image src="/ai/jade-concierge.png" alt="Jade" width={48} height={48} className="chat-launcher-avatar-image" />
        </span>
        <span className="chat-launcher-copy">
          <strong>{open ? "Close Jade" : "Chat with Jade"}</strong>
          <span>{open ? "Back to the page" : "Fast quote help, photo prompts, smart intake"}</span>
        </span>
      </button>

      {open ? (
        <section className="chat-panel" aria-label="Chat with Jade">
          <div className="chat-header">
            <div>
              <p className="eyebrow">Lead concierge</p>
              <h3>Chat with Jade</h3>
              <p className="chat-subcopy">Fast answers, cleaner quotes, premium routing.</p>
            </div>
            <span className="chat-badge">Secure website mode</span>
          </div>

          <div className="chat-quick-row">
            {quickPrompts.map((prompt) => (
              <button key={prompt} type="button" className="chat-quick-pill" onClick={() => sendPayload(prompt)} disabled={loading}>
                {prompt}
              </button>
            ))}
          </div>

          <div className="chat-thread">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={message.role === "assistant" ? "bubble assistant" : "bubble user"}>
                {message.content}
              </div>
            ))}
            {loading ? <div className="bubble assistant">Thinking through the next step...</div> : null}
          </div>

          <div className="chat-footer">
            <textarea
              rows={3}
              placeholder="Tell Jade what needs to be removed, where the job is, and when you want it done."
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <button className="primary-button" onClick={sendMessage} disabled={loading || !input.trim()}>
              Send
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
