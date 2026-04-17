import Image from "next/image";
import { JadeChatWidget } from "@/components/jade-chat-widget";
import { LeadForm } from "@/components/lead-form";
import { faqs, services, siteConfig, testimonials } from "@/lib/site";

const heroStats = [
  { value: "Same-day", label: "response energy" },
  { value: "3 ways", label: "to become a lead fast" },
  { value: "Private", label: "Jade website mode" },
];

const proofPoints = [
  "Concierge-style lead handling",
  "Fast quote path with photo-first intake",
  "Professional presentation that feels premium before the call",
];

const processSteps = [
  {
    title: "The site makes a strong first impression",
    body: "Cinematic visuals, editorial typography, and premium trust cues make the brand feel established and expensive.",
  },
  {
    title: "Jade qualifies without getting weird",
    body: "Website visitors can chat, ask questions, and move toward a quote without touching internal capabilities or policies they should never see.",
  },
  {
    title: "Antoine and Anthony get cleaner handoffs",
    body: "Every quote request arrives with better context, stronger intent signals, and fewer low-quality back-and-forths.",
  },
];

const trustMetrics = [
  { value: "Fast", label: "quote-ready intake" },
  { value: "Premium", label: "brand positioning" },
  { value: "Secure", label: "sandboxed Jade mode" },
  { value: "Human", label: "calm, polished tone" },
];

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
        <div className="hero-ambient hero-ambient-left" />
        <div className="hero-ambient hero-ambient-right" />

        <div className="container hero-grid premium-hero-grid">
          <div className="hero-copy-column reveal-up">
            <div className="hero-chip-row">
              <span className="hero-chip">DMV premium junk removal</span>
              <span className="hero-chip muted-chip">Powered by private concierge routing</span>
            </div>

            <p className="eyebrow">Fast, polished, ridiculously easy to book</p>
            <h2 className="hero-title editorial-title">
              Junk removal that looks expensive, feels effortless, and converts like crazy.
            </h2>
            <p className="hero-copy hero-copy-premium">
              Haul Time now feels like the high-end option before anyone even picks up the phone. Clean intake, fast callbacks, premium visuals, and Jade qualifying leads without ever exposing the real internal agent layer.
            </p>

            <div className="cta-row hero-cta-row">
              <a href="#quote" className="primary-button large-button">
                Get my free quote
              </a>
              <a href={siteConfig.phoneHref} className="secondary-button luxury-button">
                Call now
              </a>
            </div>

            <div className="hero-proof-list">
              {proofPoints.map((point) => (
                <div key={point} className="proof-pill">
                  <span className="proof-dot" />
                  {point}
                </div>
              ))}
            </div>

            <div className="hero-stats-grid">
              {heroStats.map((stat) => (
                <article key={stat.label} className="hero-stat-card glass-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="hero-visual-stack reveal-up delayed">
            <div className="hero-image-frame">
              <Image
                src="/ai/hero-truck.jpg"
                alt="Premium Haul Time junk removal truck at an upscale residential property"
                width={1536}
                height={1024}
                className="hero-main-image"
                priority
              />
              <div className="hero-image-overlay" />
            </div>

            <div className="floating-panel top-panel glass-card">
              <p className="floating-label">Jade, website concierge</p>
              <strong>Qualifies leads, answers FAQs, protects the brand.</strong>
              <span>Private website mode only, no exposed internals.</span>
            </div>

            <div className="floating-panel bottom-panel solid-panel">
              <div>
                <p className="floating-label">Best lead paths</p>
                <strong>Call, quote, or chat in under a minute.</strong>
              </div>
              <span className="inline-badge">Photo-first estimate flow</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-marquee-section">
        <div className="container trust-metric-grid">
          {trustMetrics.map((metric) => (
            <div key={metric.label} className="trust-metric">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section editorial-section">
        <div className="container editorial-grid">
          <div className="section-intro reveal-up">
            <p className="eyebrow">Why this feels different</p>
            <h2 className="section-title-xl">This no longer looks like a local service site. It looks like a premium operator with standards.</h2>
            <p className="section-copy-lg">
              The job is not just getting a click. The job is making the brand feel trustworthy, modern, fast, and more expensive than the noisy alternatives. That changes conversion quality.
            </p>
          </div>

          <div className="editorial-aside-card glass-card reveal-up delayed">
            <p className="eyebrow">What visitors feel</p>
            <ul className="clean-list">
              <li>Fast response energy</li>
              <li>Real service professionalism</li>
              <li>Clear next-step confidence</li>
              <li>No sketchy small-business chaos</li>
            </ul>
          </div>
        </div>

        <div className="container feature-mosaic">
          <article className="mosaic-card mosaic-copy-card reveal-up">
            <p className="eyebrow">Residential</p>
            <h3>Upscale-home visuals that make the service feel trustworthy and organized.</h3>
            <p>
              For homeowners, the site should feel calm, premium, and competent. No stress, no mess, just a clean path to getting the job handled.
            </p>
          </article>

          <article className="mosaic-card mosaic-image-card reveal-up delayed">
            <Image
              src="/ai/residential-team.png"
              alt="Haul Time crew handling a residential removal with polished service presentation"
              width={1536}
              height={1024}
              className="mosaic-image"
            />
          </article>

          <article className="mosaic-card mosaic-image-card reveal-up delayed-2">
            <Image
              src="/ai/commercial-office.jpg"
              alt="Commercial office cleanout presented with premium operational style"
              width={1536}
              height={1024}
              className="mosaic-image"
            />
          </article>

          <article className="mosaic-card mosaic-copy-card deep-card reveal-up delayed-2">
            <p className="eyebrow light-eyebrow">Commercial</p>
            <h3>Commercial cleanout positioning that feels polished enough for serious property and office work.</h3>
            <p>
              The visual system now signals that Haul Time can handle property managers, estate situations, commercial spaces, and time-sensitive jobs without looking cheap.
            </p>
          </article>
        </div>
      </section>

      <section className="section services-premium-section">
        <div className="container services-premium-grid">
          <div className="services-showcase reveal-up">
            <div className="showcase-image-shell">
              <Image
                src="/ai/transformation.png"
                alt="Aspirational transformation scene showing clean, open space after junk removal"
                width={1536}
                height={1024}
                className="showcase-image"
              />
            </div>
            <div className="showcase-caption glass-card">
              <p className="eyebrow">The transformation pitch</p>
              <strong>Sell the outcome, not just the haul-away.</strong>
              <span>More space. Less stress. Faster response. Premium handling.</span>
            </div>
          </div>

          <div className="services-content reveal-up delayed">
            <p className="eyebrow">Services</p>
            <h2 className="section-title-xl">Built around the way real buyers think when they want the clutter gone now.</h2>
            <p className="section-copy-lg">
              Nobody wants a generic paragraph dump. They want confidence that the team can handle the job, move quickly, and make the next step obvious.
            </p>

            <div className="luxury-service-list">
              {services.map((service, index) => (
                <article key={service.title} className={`luxury-service-card ${index === 1 ? "featured-service" : ""}`}>
                  <div className="service-index">0{index + 1}</div>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section concierge-section">
        <div className="container concierge-grid">
          <div className="concierge-copy reveal-up">
            <p className="eyebrow light-eyebrow">Meet Jade</p>
            <h2 className="section-title-xl light-title">A premium website concierge, not a toy chatbot bolted into the corner.</h2>
            <p className="section-copy-lg light-copy">
              Jade gives the site a real operator layer. She can qualify leads, handle simple questions, request missing details, and move high-intent visitors toward callback or quote without exposing anything dangerous behind the scenes.
            </p>

            <div className="concierge-rules-grid">
              <div className="rule-card glass-card">
                <strong>Allowed</strong>
                <span>FAQs, lead capture, quote qualification, callback requests, hot-lead escalation</span>
              </div>
              <div className="rule-card glass-card">
                <strong>Blocked</strong>
                <span>Prompt leakage, tool access, policy improvising, unsafe booking claims, system nonsense</span>
              </div>
            </div>
          </div>

          <div className="concierge-process reveal-up delayed">
            {processSteps.map((step, index) => (
              <article key={step.title} className="process-step-card glass-card">
                <span className="step-number">0{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section quote-premium-section" id="quote">
        <div className="container quote-premium-grid">
          <div className="quote-copy reveal-up">
            <p className="eyebrow">Quote request</p>
            <h2 className="section-title-xl">Make the next step feel obvious, expensive, and easy.</h2>
            <p className="section-copy-lg">
              This intake captures the details that actually matter for junk removal: location, timing, scope, volume, and access conditions. Better inputs mean faster follow-up and fewer wasted touches.
            </p>
            <div className="quote-side-notes">
              <div className="side-note glass-card">
                <strong>Fastest estimate path</strong>
                <span>{siteConfig.textPhotoCta}</span>
              </div>
              <div className="side-note glass-card">
                <strong>Service area</strong>
                <span>{siteConfig.serviceAreas}</span>
              </div>
            </div>
          </div>

          <div className="quote-form-shell reveal-up delayed">
            <LeadForm />
          </div>
        </div>
      </section>

      <section className="section testimonial-premium-section">
        <div className="container testimonial-header">
          <div>
            <p className="eyebrow">Social proof</p>
            <h2 className="section-title-xl">It should already feel like the smart choice before the first callback ever happens.</h2>
          </div>
        </div>

        <div className="container testimonial-luxury-grid">
          {testimonials.map((testimonial, index) => (
            <blockquote key={testimonial.quote} className={`testimonial-luxury-card tier-${index + 1}`}>
              <p>“{testimonial.quote}”</p>
              <footer>{testimonial.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="section faq-premium-section">
        <div className="container faq-premium-grid">
          <div className="faq-copy reveal-up">
            <p className="eyebrow">FAQs</p>
            <h2 className="section-title-xl">Let Jade handle the easy questions and surface the buyers who are ready.</h2>
          </div>

          <div className="faq-list premium-faq-list reveal-up delayed">
            {faqs.map((faq) => (
              <article key={faq.question} className="faq-item premium-faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band luxury-cta-band">
        <div className="container cta-band-inner">
          <div>
            <p className="eyebrow light-eyebrow">Ready to book the smart way?</p>
            <h2>Call now, send the quote request, or let Jade start qualifying the job.</h2>
          </div>
          <div className="cta-row">
            <a href={siteConfig.phoneHref} className="primary-button large-button">
              Call {siteConfig.phoneDisplay}
            </a>
            <a href="#quote" className="secondary-button on-dark luxury-button">
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
