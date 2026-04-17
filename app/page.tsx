import Image from "next/image";
import { JadeChatWidget } from "@/components/jade-chat-widget";
import { LeadForm } from "@/components/lead-form";
import { faqs, services, siteConfig, testimonials } from "@/lib/site";

const heroStats = [
  { value: "Same-day", label: "response energy" },
  { value: "3 paths", label: "to become a lead fast" },
  { value: "Private", label: "Jade website mode" },
];

const proofPoints = [
  "Concierge-style lead handling",
  "Photo-first estimate flow",
  "Presentation that feels premium before the callback",
];

const trustMetrics = [
  { value: "Fast", label: "quote-ready intake" },
  { value: "Premium", label: "brand positioning" },
  { value: "Secure", label: "sandboxed Jade mode" },
  { value: "Human", label: "calm, polished tone" },
];

const signaturePillars = [
  {
    title: "Luxury-level first impression",
    body: "The brand feels expensive, organized, and competent before the conversation even starts.",
  },
  {
    title: "Lead handling that feels concierge-driven",
    body: "Jade qualifies the right details without turning the site into a clunky support desk.",
  },
  {
    title: "Clean owner handoffs",
    body: "Antoine and Anthony get stronger lead context and less back-and-forth noise.",
  },
];

const processSteps = [
  {
    title: "The site creates confidence instantly",
    body: "Cinematic visuals, polished typography, and controlled spacing make the service feel established and high-end.",
  },
  {
    title: "Jade guides the next step without exposing internals",
    body: "Visitors can ask questions, request help, and qualify their job without touching the real internal agent layer.",
  },
  {
    title: "The team gets cleaner, better-context leads",
    body: "Faster callbacks, stronger intent signals, better photo requests, and fewer messy dead-end threads.",
  },
];

const luxuryRail = ["Residential", "Commercial", "Property turnover", "Estate cleanouts", "Same-day jobs", "Photo estimates"];

export default function HomePage() {
  return (
    <main className="page-shell">
      <div className="grain-overlay" />

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
        <div className="hero-ambient hero-ambient-center" />

        <div className="container hero-grid premium-hero-grid">
          <div className="hero-copy-column reveal-up">
            <div className="hero-chip-row">
              <span className="hero-chip">DMV premium junk removal</span>
              <span className="hero-chip muted-chip">Private concierge routing</span>
            </div>

            <p className="eyebrow">Fast, elevated, unmistakably premium</p>
            <h2 className="hero-title editorial-title">
              The junk removal site that looks like a luxury brand and converts like a killer sales machine.
            </h2>
            <p className="hero-copy hero-copy-premium">
              Haul Time now feels like the high-end choice before anyone even picks up the phone. Strong visuals, better lead flow, faster quote intent, and Jade guiding the conversation like a private concierge instead of a cheap little widget.
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
                <article key={stat.label} className="hero-stat-card glass-card hover-float-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="hero-visual-stack reveal-up delayed">
            <div className="hero-image-frame image-hover-frame">
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

            <div className="floating-panel top-panel glass-card floating-soft">
              <p className="floating-label">Jade, website concierge</p>
              <strong>Qualifies leads, answers FAQs, protects the brand.</strong>
              <span>Private website mode only, no exposed internals.</span>
            </div>

            <div className="floating-panel bottom-panel solid-panel floating-soft delayed-float">
              <div>
                <p className="floating-label">Best lead paths</p>
                <strong>Call, quote, or chat in under a minute.</strong>
              </div>
              <span className="inline-badge">Photo-first estimate flow</span>
            </div>
          </div>
        </div>

        <div className="container luxury-rail-wrap reveal-up delayed-2">
          <div className="luxury-rail">
            {luxuryRail.map((item) => (
              <span key={item}>{item}</span>
            ))}
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

      <section className="section signature-section">
        <div className="container signature-grid">
          <div className="section-intro reveal-up">
            <p className="eyebrow">The premium difference</p>
            <h2 className="section-title-xl">This now feels like a serious operator, not a random local service page trying too hard.</h2>
            <p className="section-copy-lg">
              The whole structure is built to do three things at once: make Haul Time feel expensive, make the next step obvious, and help the team spend more time on real buyers instead of sloppy intake.
            </p>
          </div>

          <div className="signature-card-stack reveal-up delayed">
            {signaturePillars.map((pillar) => (
              <article key={pillar.title} className="signature-card glass-card hover-float-card">
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section editorial-section">
        <div className="container editorial-grid">
          <div className="section-intro reveal-up">
            <p className="eyebrow">Why this feels different</p>
            <h2 className="section-title-xl">It looks curated, cinematic, and more expensive than competitors before the first callback ever happens.</h2>
            <p className="section-copy-lg">
              That matters. Perception changes lead quality. Stronger visual hierarchy, cleaner spacing, and better sequencing make visitors assume the service itself is tighter and more trustworthy.
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
          <article className="mosaic-card mosaic-copy-card reveal-up hover-float-card">
            <p className="eyebrow">Residential</p>
            <h3>Upscale-home visuals that make the service feel trustworthy, calm, and organized.</h3>
            <p>
              For homeowners, the site should feel like the smart, polished option. No chaos, no stress, just a clean path to getting the job handled fast.
            </p>
          </article>

          <article className="mosaic-card mosaic-image-card reveal-up delayed image-hover-frame">
            <Image
              src="/ai/residential-team.png"
              alt="Haul Time crew handling a residential removal with polished service presentation"
              width={1536}
              height={1024}
              className="mosaic-image"
            />
          </article>

          <article className="mosaic-card mosaic-image-card reveal-up delayed-2 image-hover-frame">
            <Image
              src="/ai/commercial-office.jpg"
              alt="Commercial office cleanout presented with premium operational style"
              width={1536}
              height={1024}
              className="mosaic-image"
            />
          </article>

          <article className="mosaic-card mosaic-copy-card deep-card reveal-up delayed-2 hover-float-card">
            <p className="eyebrow light-eyebrow">Commercial</p>
            <h3>Commercial cleanout positioning polished enough for offices, property managers, and time-sensitive work.</h3>
            <p>
              The visual system now signals that Haul Time can handle serious spaces, not just small household pickups, and that changes how buyers judge the brand.
            </p>
          </article>
        </div>
      </section>

      <section className="section services-premium-section">
        <div className="container services-premium-grid">
          <div className="services-showcase reveal-up">
            <div className="showcase-image-shell image-hover-frame">
              <Image
                src="/ai/transformation.png"
                alt="Aspirational transformation scene showing clean, open space after junk removal"
                width={1536}
                height={1024}
                className="showcase-image"
              />
            </div>
            <div className="showcase-caption glass-card floating-soft">
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
                <article key={service.title} className={`luxury-service-card hover-float-card ${index === 1 ? "featured-service" : ""}`}>
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
        <div className="container concierge-grid premium-concierge-grid">
          <div className="concierge-copy reveal-up">
            <p className="eyebrow light-eyebrow">Meet Jade</p>
            <h2 className="section-title-xl light-title">A premium website concierge, not a toy chatbot bolted into the corner.</h2>
            <p className="section-copy-lg light-copy">
              Jade gives the site a real operator layer. She can qualify leads, handle simple questions, request missing details, and move high-intent visitors toward callback or quote without exposing anything dangerous behind the scenes.
            </p>

            <div className="concierge-rules-grid">
              <div className="rule-card glass-card hover-float-card">
                <strong>Allowed</strong>
                <span>FAQs, lead capture, quote qualification, callback requests, hot-lead escalation</span>
              </div>
              <div className="rule-card glass-card hover-float-card">
                <strong>Blocked</strong>
                <span>Prompt leakage, tool access, policy improvising, unsafe booking claims, system nonsense</span>
              </div>
            </div>
          </div>

          <div className="concierge-portrait-wrap reveal-up delayed">
            <div className="concierge-portrait-frame image-hover-frame">
              <Image
                src="/ai/jade-concierge.png"
                alt="Jade concierge portrait for Haul Time website"
                width={1024}
                height={1536}
                className="concierge-portrait"
              />
              <div className="portrait-overlay" />
            </div>
            <div className="portrait-card glass-card floating-soft">
              <p className="floating-label">Private website mode</p>
              <strong>Luxury service energy, strict operational boundaries.</strong>
              <span>She qualifies, guides, captures, and escalates. Nothing sloppy.</span>
            </div>
          </div>
        </div>

        <div className="container concierge-process-grid reveal-up delayed-2">
          {processSteps.map((step, index) => (
            <article key={step.title} className="process-step-card glass-card hover-float-card">
              <span className="step-number">0{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
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
              <div className="side-note glass-card hover-float-card">
                <strong>Fastest estimate path</strong>
                <span>{siteConfig.textPhotoCta}</span>
              </div>
              <div className="side-note glass-card hover-float-card">
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
            <blockquote key={testimonial.quote} className={`testimonial-luxury-card hover-float-card tier-${index + 1}`}>
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
              <article key={faq.question} className="faq-item premium-faq-item hover-float-card">
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
