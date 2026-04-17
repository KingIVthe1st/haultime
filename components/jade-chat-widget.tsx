"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/site";

type ChatMessage = { role: "assistant" | "user"; content: string };

const quickPrompts = ["Need this gone today", "Office cleanout", "Can I send photos first?"];

export function JadeChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [quoteInView, setQuoteInView] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: siteConfig.chatGreeting },
  ]);

  const sessionId = useMemo(() => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `session-${Date.now()}`;
  }, []);

  useEffect(() => {
    const quoteSection = document.getElementById("quote");
    if (!quoteSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setQuoteInView(entry.isIntersecting);
      },
      { threshold: 0.28 },
    );

    observer.observe(quoteSection);
    return () => observer.disconnect();
  }, []);

  async function sendPayload(content: string) {
    if (!content.trim() || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content: content.trim() }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
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
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "Something glitched on my side. Tell me what needs to be removed, your ZIP code, and when you want it done, or call Haul Time for the fastest response.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage() {
    await sendPayload(input);
  }

  return (
    <>
      <button className={quoteInView && !open ? "chat-launcher chat-launcher-hidden" : "chat-launcher"} onClick={() => setOpen((current) => !current)}>
        <span className="chat-launcher-avatar">
          <Image src="/ai/jade-concierge.png" alt="Jade" width={48} height={48} className="chat-launcher-avatar-image" />
        </span>
        <span className="chat-launcher-copy">
          <strong>{open ? "Close Jade" : "Chat with Jade"}</strong>
          <span>{open ? "Back to the page" : "Fast intake, photo-first quotes, cleaner follow-up"}</span>
        </span>
      </button>

      {open ? (
        <section className="chat-panel" aria-label="Chat with Jade">
          <div className="chat-header">
            <div>
              <p className="eyebrow">Lead concierge</p>
              <h3>Chat with Jade</h3>
              <p className="chat-subcopy">Fast answers, cleaner intake, and a sharper handoff to the Haul Time team.</p>
            </div>
            <div className="chat-header-actions">
              <span className="chat-badge">Secure website mode</span>
              <button type="button" className="chat-close" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
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
              placeholder="Tell Jade what needs to be removed, where the job is, and how fast you need it handled."
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
