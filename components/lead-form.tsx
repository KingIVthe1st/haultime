"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  zipCode: string;
  timeline: string;
  details: string;
  preferredContact: "call" | "text" | "email";
  honeypot: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  serviceType: "Residential removal",
  zipCode: "",
  timeline: "As soon as possible",
  details: "",
  preferredContact: "text",
  honeypot: "",
};

export function LeadForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...form, source: "website-form" }),
    });

    const data = (await response.json()) as { ok?: boolean; message?: string };

    if (!response.ok) {
      setStatus("error");
      setMessage(data.message || "Something went wrong. Try again or call us directly.");
      return;
    }

    setStatus("success");
    setMessage(data.message || "Got it. Haul Time will follow up shortly.");
    setForm(initialState);
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="lead-form-grid">
        <input
          placeholder="Your name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          required
        />
        <input
          placeholder="Best phone number"
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
          required
        />
        <input
          placeholder="Email address"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          type="email"
        />
        <input
          placeholder="ZIP code"
          value={form.zipCode}
          onChange={(event) => setForm({ ...form, zipCode: event.target.value })}
          required
        />
        <select
          value={form.serviceType}
          onChange={(event) => setForm({ ...form, serviceType: event.target.value })}
        >
          <option>Residential removal</option>
          <option>Commercial cleanout</option>
          <option>Property cleanout</option>
          <option>Appliance removal</option>
          <option>Yard debris</option>
          <option>Donation pickup</option>
        </select>
        <select
          value={form.timeline}
          onChange={(event) => setForm({ ...form, timeline: event.target.value })}
        >
          <option>As soon as possible</option>
          <option>This week</option>
          <option>Next week</option>
          <option>Just getting pricing</option>
        </select>
      </div>

      <textarea
        placeholder="What needs to be removed? Include rough amount, item types, and any access issues like stairs, gates, or long walk distance."
        value={form.details}
        onChange={(event) => setForm({ ...form, details: event.target.value })}
        rows={5}
        required
      />

      <div className="lead-form-footer">
        <div>
          <label className="contact-label">Preferred contact</label>
          <div className="contact-pills">
            {(["text", "call", "email"] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={form.preferredContact === option ? "pill active" : "pill"}
                onClick={() => setForm({ ...form, preferredContact: option })}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="primary-button" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Get my quote"}
        </button>
      </div>

      <input
        tabIndex={-1}
        autoComplete="off"
        className="honeypot"
        value={form.honeypot}
        onChange={(event) => setForm({ ...form, honeypot: event.target.value })}
        aria-hidden="true"
      />

      {message ? <p className={status === "success" ? "form-success" : "form-error"}>{message}</p> : null}
    </form>
  );
}
