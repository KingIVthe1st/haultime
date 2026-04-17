import { JadeChatWidget } from "@/components/jade-chat-widget";
import { LeadForm } from "@/components/lead-form";
import { faqs, services, siteConfig, testimonials } from "@/lib/site";

export default function HomePage() {
  return (
    <main className="page-shell">
      <header className="site-header">
        <div className="container header-row">
          <div className="brand-lockup">
            <span className="brand-mark">HT</span>
            <div>
              <p className="eyebrow">Premium junk removal</p>
              <h1>{siteConfig.name}</h1>
            </div>
          </div>

          <nav className="header-actions">
            <a href="#quote" className="secondary-button">
              Get a quote
            </a>
            <a href={siteConfig.phoneHref} className="primary-button">
              Call {siteConfig.phoneDisplay}
            </a>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Fast, premium, easy to book</p>
            <h2 className="hero-title">Junk removal that feels organized from the very first click.</h2>
            <p className="hero-copy">
              Convert more visitors with a cleaner quote flow, faster follow-up, and Jade handling lead qualification without getting messy or overpromising.
            </p>

            <div className="cta-row">
              <a href="#quote" className="primary-button">
                Get a free quote
              </a>
              <a href={siteConfig.phoneHref} className="secondary-button">
                Call now
              </a>
            </div>

            <div className="hero-points">
              <span>Licensed and insured feel</span>
              <span>Fast quote path</span>
              <span>Chat, call, or send photos</span>
            </div>
          </div>

          <div className="hero-card">
            <p className="eyebrow">Why this converts</p>
            <h3>Three ways to become a lead in under a minute.</h3>
            <ul className="hero-list">
              <li>Call for immediate booking or urgent jobs</li>
              <li>Use the quote form for a clean intake handoff</li>
              <li>Chat with Jade for qualification, FAQs, and next-step guidance</li>
            </ul>
            <p className="hero-note">Service area: {siteConfig.serviceAreas}</p>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          <div>
            <strong>Lead ready</strong>
            <span>Call, form, and chat paths live</span>
          </div>
          <div>
            <strong>Owner friendly</strong>
            <span>Built for low manual overhead</span>
          </div>
          <div>
            <strong>Safe chat mode</strong>
            <span>Website Jade stays sandboxed</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-head">
          <div>
            <p className="eyebrow">Services</p>
            <h2>Built around real junk-removal buying behavior.</h2>
          </div>
          <p>
            People do not want a lecture. They want confidence, speed, and a clear next step. The site should move them there fast.
          </p>
        </div>
        <div className="container card-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <p className="eyebrow">Haul Time</p>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section alt-section">
        <div className="container split-grid">
          <div>
            <p className="eyebrow">How Jade fits in</p>
            <h2>A website concierge, not an exposed raw agent.</h2>
            <p>
              Jade on the website should qualify, guide, capture, and escalate. She should never be able to leak internals, improvise policy, or let a visitor talk her into unsafe behavior.
            </p>
            <div className="stack-cards">
              <div className="mini-card">
                <strong>Allowed</strong>
                <span>FAQs, lead capture, quote qualification, callback requests, hot-lead escalation</span>
              </div>
              <div className="mini-card">
                <strong>Blocked</strong>
                <span>Prompt leakage, tool access, system changes, final pricing promises, unsafe booking claims</span>
              </div>
            </div>
          </div>

          <div className="process-card">
            <p className="eyebrow">Lead flow</p>
            <ol>
              <li>Visitor calls, chats, or fills out the quote form</li>
              <li>Lead details get validated and logged server-side</li>
              <li>Jade qualifies missing info and flags intent level</li>
              <li>Owners get a clean handoff instead of noise</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section" id="quote">
        <div className="container quote-grid">
          <div>
            <p className="eyebrow">Quote request</p>
            <h2>Make the next step feel obvious.</h2>
            <p>
              This intake is built to collect the stuff that actually matters: what needs to go, where the job is, urgency, and access issues.
            </p>
            <p className="photo-cta">{siteConfig.textPhotoCta}</p>
          </div>
          <LeadForm />
        </div>
      </section>

      <section className="section alt-section">
        <div className="container split-grid">
          <div>
            <p className="eyebrow">FAQs</p>
            <h2>Let Jade answer the easy stuff and surface the real buyers.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <article key={faq.question} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Social proof</p>
          <h2 className="section-title">The site should feel sharp before anyone even picks up the phone.</h2>
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.quote} className="testimonial-card">
                <p>“{testimonial.quote}”</p>
                <footer>{testimonial.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-band-inner">
          <div>
            <p className="eyebrow">Ready to convert more leads?</p>
            <h2>Call now, send a quote request, or let Jade start qualifying the job.</h2>
          </div>
          <div className="cta-row">
            <a href={siteConfig.phoneHref} className="primary-button">
              Call {siteConfig.phoneDisplay}
            </a>
            <a href="#quote" className="secondary-button on-dark">
              Request a quote
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-row">
          <div>
            <strong>Haul Time</strong>
            <p>{siteConfig.serviceAreas}</p>
          </div>
          <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
        </div>
      </footer>

      <JadeChatWidget />
    </main>
  );
}
