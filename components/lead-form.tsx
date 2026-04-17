"use client";

import { FormEvent, useMemo, useState } from "react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  zipCode: string;
  timeline: string;
  details: string;
  preferredContact: "call" | "text" | "email";
  hasPhotos: "yes" | "no";
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
  hasPhotos: "yes",
  honeypot: "",
};

const steps = [
  { id: 1, label: "Job basics" },
  { id: 2, label: "What needs to go" },
  { id: 3, label: "Best contact" },
] as const;

export function LeadForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const canContinue = useMemo(() => {
    if (step === 1) return Boolean(form.serviceType && form.zipCode && form.timeline);
    if (step === 2) return Boolean(form.details.trim());
    return Boolean(form.name.trim() && form.phone.trim());
  }, [form, step]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step < 3) {
      setStep((current) => (current + 1) as 2 | 3);
      return;
    }

    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...form,
        details: `${form.details}${form.hasPhotos === "yes" ? "\nPhotos available: yes" : "\nPhotos available: no"}`,
        source: "website-form",
      }),
    });

    const data = (await response.json()) as { ok?: boolean; message?: string };

    if (!response.ok) {
      setStatus("error");
      setMessage(data.message || "Something went wrong. Try again or call us directly.");
      return;
    }

    setStatus("success");
    setMessage(data.message || "Got it. The Haul Time team will follow up shortly.");
    setForm(initialState);
    setStep(1);
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="lead-form-progress">
        {steps.map((item) => (
          <div key={item.id} className={item.id <= step ? "progress-step active" : "progress-step"}>
            <span>{item.id}</span>
            <strong>{item.label}</strong>
          </div>
        ))}
      </div>

      {step === 1 ? (
        <div className="lead-step-shell">
          <div className="lead-step-copy">
            <p className="eyebrow">Step 1</p>
            <h3>First, what are we moving and where is it?</h3>
            <p>
              Service type, ZIP code, and timing help the team tell whether this is a quick pickup, a bulky-item run, or a bigger cleanout.
            </p>
          </div>

          <div className="lead-form-grid">
            <select value={form.serviceType} onChange={(event) => setForm({ ...form, serviceType: event.target.value })}>
              <option>Residential removal</option>
              <option>Commercial cleanout</option>
              <option>Property cleanout</option>
              <option>Appliance removal</option>
              <option>Yard debris</option>
              <option>Donation pickup</option>
            </select>
            <input
              placeholder="Job ZIP code"
              value={form.zipCode}
              onChange={(event) => setForm({ ...form, zipCode: event.target.value })}
              required
            />
            <select value={form.timeline} onChange={(event) => setForm({ ...form, timeline: event.target.value })}>
              <option>As soon as possible</option>
              <option>This week</option>
              <option>Next week</option>
              <option>Just getting pricing</option>
            </select>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="lead-step-shell">
          <div className="lead-step-copy">
            <p className="eyebrow">Step 2</p>
            <h3>Now tell us what is actually there.</h3>
            <p>
              A short description and a few photos, if you have them, make it much easier to give you the right next step.
            </p>
          </div>

          <textarea
            placeholder="Example: refrigerator, washer, old couch, boxes in the basement, 1 flight of stairs, narrow hallway."
            value={form.details}
            onChange={(event) => setForm({ ...form, details: event.target.value })}
            rows={6}
            required
          />

          <div className="mini-choice-row">
            <span className="mini-choice-label">Do you have photos ready?</span>
            <div className="contact-pills">
              {(["yes", "no"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={form.hasPhotos === option ? "pill active" : "pill"}
                  onClick={() => setForm({ ...form, hasPhotos: option })}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="lead-step-shell">
          <div className="lead-step-copy">
            <p className="eyebrow">Step 3</p>
            <h3>Where should the team follow up?</h3>
            <p>
              Add your best contact info and how you want Haul Time to reach you.
            </p>
          </div>

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
          </div>

          <div className="lead-form-footer compact-footer">
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
          </div>
        </div>
      ) : null}

      <div className="lead-nav-row">
        {step > 1 ? (
          <button type="button" className="secondary-button" onClick={() => setStep((current) => (current - 1) as 1 | 2)}>
            Back
          </button>
        ) : (
          <span />
        )}

        <button type="submit" className="primary-button" disabled={status === "loading" || !canContinue}>
          {step < 3 ? "Continue" : status === "loading" ? "Sending..." : "Get my quote"}
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
