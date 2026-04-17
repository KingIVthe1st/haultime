import Image from "next/image";
import { JadeChatWidget } from "@/components/jade-chat-widget";
import { LeadForm } from "@/components/lead-form";
import { MobileScrollChrome } from "@/components/mobile-scroll-chrome";
import { faqs, services, siteConfig, testimonials } from "@/lib/site";

const heroBadges = ["On-time arrival", "Licensed & insured", "Family-owned DMV crew"];
const trustRibbon = ["Single-item pickups", "Estate cleanouts", "Property turnovers", "Office clear-outs", "Appliance haul-away", "Same-day windows"];
const premiumReasons = [
  {
    title: "They show up like pros",
    body: "Fast is nice. Showing up when you said you would, moving with care, and leaving the place clean is what people actually remember.",
  },
  {
    title: "Bulky-item quotes without the circus",
    body: "Couches, appliances, garage piles, office junk, and full cleanouts all need different handling. Haul Time makes the next step clear fast.",
  },
  {
    title: "Built for homeowners, landlords, and property managers",
    body: "This is the kind of crew you call when a move, turnover, estate situation, or office clear-out needs to get handled without drama.",
  },
];

const stats = [
  { value: "1 item", label: "or a full cleanout, the team can size up the job fast" },
  { value: "DMV", label: "coverage for homes, offices, rentals, and property turns" },
  { value: "Photo-first", label: "quotes move faster when the team sees the job early" },
];

const process = [
  {
    step: "01",
    title: "Tell Haul Time what needs to go",
    body: "A few details about the items, the property, and the timing help the team sort whether this is a quick pickup or a bigger cleanout.",
  },
  {
    step: "02",
    title: "Send photos if you have them",
    body: "Photos help with volume, access, and bulky-item read. That means less back-and-forth and a faster next move.",
  },
  {
    step: "03",
    title: "Get the right follow-up",
    body: "Jade helps qualify the request first so Antoine and Anthony can follow up with context instead of starting blind.",
  },
];

export default function HomePage() {
  return (
    <main className="page-shell premium-page-shell">
      <MobileScrollChrome />
      <div className="grain-overlay" />
      <div className="hero-mesh hero-mesh-a" />
      <div className="hero-mesh hero-mesh-b" />

      <header className="site-header premium-header">
        <div className="container header-row">
          <div className="brand-lockup">
            <span className="brand-mark premium-brand-mark">HT</span>
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

      <section className="hero-section premium-hero-section">
        <div className="hero-spotlight" />
        <div className="container premium-hero-shell">
          <div className="hero-copy-column premium-hero-copy reveal-up">
            <div className="hero-chip-row premium-chip-row">
              {heroBadges.map((badge) => (
                <span key={badge} className="hero-chip premium-chip">
                  {badge}
                </span>
              ))}
            </div>

            <p className="eyebrow">DMV junk removal done right</p>
            <h2 className="hero-title editorial-title premium-hero-title">
              From one bulky pickup to a full cleanout, Haul Time gets it gone without turning your day into a mess.
            </h2>
            <p className="hero-copy hero-copy-premium premium-hero-subcopy">
              Homeowners, landlords, property managers, and business owners call Haul Time when they need a crew that shows up on time, moves fast, handles the heavy lifting, and leaves the property ready for what comes next.
            </p>

            <div className="cta-row hero-cta-row premium-hero-cta-row">
              <a href="#quote" className="primary-button large-button pulse-button">
                Get my free quote
              </a>
              <a href={siteConfig.phoneHref} className="secondary-button luxury-button premium-dark-outline">
                Call Haul Time
              </a>
            </div>

            <div className="hero-proof-list premium-proof-list">
              <div className="proof-pill premium-proof-pill">
                <span className="proof-dot" />
                {siteConfig.serviceAreas}
              </div>
              <div className="proof-pill premium-proof-pill">
                <span className="proof-dot" />
                {siteConfig.textPhotoCta}
              </div>
            </div>

            <div className="hero-stats-grid premium-stats-grid">
              {stats.map((stat) => (
                <article key={stat.label} className="hero-stat-card premium-stat-card glass-card hover-float-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="premium-hero-art reveal-up delayed">
            <div className="hero-art-primary image-hover-frame">
              <Image
                src="/ai/hero-truck.jpg"
                alt="Haul Time truck at an upscale residential property"
                width={1536}
                height={1024}
                className="hero-main-image premium-hero-image"
                priority
              />
              <div className="hero-image-overlay premium-image-overlay" />
            </div>

            <div className="hero-art-card hero-art-card-top glass-card floating-soft">
              <p className="floating-label">Fast quote path</p>
              <strong>Single item, packed garage, office junk, turnover day, whatever the job is, the next step should feel obvious.</strong>
              <span>Photos, ZIP code, and a rough idea of volume usually get the team moving much faster.</span>
            </div>

            <div className="hero-art-card hero-art-card-bottom solid-panel floating-soft delayed-float">
              <p className="floating-label">Chat with Jade</p>
              <strong>Use Jade to qualify the job fast, check timing, and tee it up cleanly for the brothers.</strong>
              <span className="inline-badge">Secure website chat</span>
            </div>

            <div className="hero-art-mini image-hover-frame">
              <Image
                src="/ai/transformation.png"
                alt="Clean transformed space after junk removal"
                width={1024}
                height={1024}
                className="hero-mini-image"
              />
            </div>
          </div>
        </div>

        <div className="container trust-ribbon-wrap reveal-up delayed-2">
          <div className="trust-ribbon premium-ribbon">
            {trustRibbon.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section premium-reasons-section">
        <div className="container premium-section-head reveal-up">
          <p className="eyebrow">Why choose Haul Time</p>
          <h2 className="section-title-xl">Why people call Haul Time when they need it handled cleanly, quickly, and without excuses</h2>
          <p className="section-copy-lg">The win is not just getting junk removed. It is getting your space back without losing a day to chaos.</p>
        </div>

        <div className="container premium-reason-grid">
          {premiumReasons.map((reason, index) => (
            <article key={reason.title} className={`premium-reason-card glass-card hover-float-card stagger-${index + 1}`}>
              <span className="reason-index">0{index + 1}</span>
              <h3>{reason.title}</h3>
              <p>{reason.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section showcase-split-section">
        <div className="container showcase-split-grid">
          <div className="showcase-copy reveal-up">
            <p className="eyebrow">What Haul Time handles</p>
            <h2 className="section-title-xl">Furniture, appliances, garage piles, office junk, estate situations, and turnover pressure. This is what they do.</h2>
            <p className="section-copy-lg">
              If it is slowing down a move, blocking a renovation, holding up a property turn, or just taking up space you want back, Haul Time can clear it out.
            </p>

            <div className="showcase-service-grid">
              {services.map((service, index) => (
                <article key={service.title} className={`showcase-service-card hover-float-card ${index === 0 ? "featured-service-card" : ""}`}>
                  <span className="service-index">0{index + 1}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="showcase-visual-column reveal-up delayed">
            <div className="showcase-stack-card image-hover-frame premium-photo-frame">
              <Image
                src="/ai/commercial-office.jpg"
                alt="Commercial cleanout presentation for Haul Time"
                width={1536}
                height={1024}
                className="showcase-image"
              />
            </div>
            <div className="showcase-stack-card glass-card showcase-note-card floating-soft">
              <p className="floating-label">What actually sells</p>
              <strong>Show up when you said you would. Move quickly. Protect the property. Leave the place clean.</strong>
              <span>That is what earns the referral, the repeat call, and the review that makes the phone ring again.</span>
            </div>
            <div className="showcase-stack-card image-hover-frame showcase-small-frame">
              <Image
                src="/ai/community-family.jpg"
                alt="Homeowner trust and family-owned service energy"
                width={1536}
                height={1024}
                className="showcase-image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section dark-process-section">
        <div className="container dark-process-grid">
          <div className="dark-process-copy reveal-up">
            <p className="eyebrow light-eyebrow">How it works</p>
            <h2 className="section-title-xl light-title">Three quick steps to get your quote moving without the usual back-and-forth</h2>
            <p className="section-copy-lg light-copy">
              Give the team the right details once, let Jade qualify the basics, and get a cleaner follow-up from the jump.
            </p>

            <div className="process-timeline">
              {process.map((item) => (
                <article key={item.step} className="process-timeline-card glass-card hover-float-card">
                  <span className="step-number">{item.step}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="quote-stage-shell reveal-up delayed" id="quote">
            <div className="quote-stage-copy">
              <p className="eyebrow light-eyebrow">Free quote request</p>
              <h3>Get your quote started in under a minute.</h3>
              <p>
                Best for single-item pickups, packed rooms, office clear-outs, and property-turn jobs that need a fast next step.
              </p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      <section className="section testimonials-section-premium">
        <div className="container premium-section-head reveal-up">
          <p className="eyebrow">Customer feedback</p>
          <h2 className="section-title-xl">Discretion, punctuality, and a clean finish. Every single time.</h2>
        </div>

        <div className="container testimonial-faq-premium-grid">
          <div className="testimonial-column">
            {testimonials.map((testimonial, index) => (
              <blockquote key={testimonial.quote} className={`testimonial-premium-card hover-float-card tier-${index + 1}`}>
                <p>“{testimonial.quote}”</p>
                <footer>{testimonial.author}</footer>
              </blockquote>
            ))}
          </div>

          <div className="faq-column">
            {faqs.map((faq) => (
              <article key={faq.question} className="faq-item premium-faq-item hover-float-card">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band luxury-cta-band final-cta-band">
        <div className="container cta-band-inner">
          <div>
            <p className="eyebrow light-eyebrow">Ready to clear it out?</p>
            <h2>Call Haul Time, send the job details, or chat with Jade and get the right next step without the runaround.</h2>
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

      <footer className="site-footer premium-footer">
        <div className="container footer-row">
          <div>
            <strong>Haul Time</strong>
            <p>{siteConfig.serviceAreas}</p>
          </div>
          <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
        </div>
      </footer>

      <div className="mobile-action-bar">
        <a href={siteConfig.phoneHref} className="mobile-action-button primary-mobile-action">
          Call Haul Time
        </a>
        <a href="#quote" className="mobile-action-button secondary-mobile-action">
          Fast quote
        </a>
      </div>

      <JadeChatWidget />
    </main>
  );
}
