import { DashboardCrmPanel } from "@/components/dashboard-crm-panel";
import { DashboardJadeButton } from "@/components/dashboard-jade-button";
import { DashboardOpsChat } from "@/components/dashboard-ops-chat";
import { DashboardTaskBoard } from "@/components/dashboard-task-board";
import { DashboardTopbarShell } from "@/components/dashboard-topbar-shell";
import { getDashboardStateSnapshot } from "@/lib/dashboard-state";
import { getDashboardOverview } from "@/lib/dashboard-live";
import { siteConfig } from "@/lib/site";
import styles from "./dashboard.module.css";

const sections = [
  { label: "Pulse", href: "#pulse" },
  { label: "Field", href: "#field" },
  { label: "Playbook", href: "#playbook" },
  { label: "CRM", href: "#crm" },
  { label: "Tasks", href: "#tasks" },
  { label: "Growth", href: "#growth" },
  { label: "Jade", href: "#jade" },
];

function SectionTools({
  tooltip,
  section,
  prompt,
  label,
}: {
  tooltip: string;
  section: "pulse" | "field" | "playbook" | "profit" | "growth" | "crm" | "tasks";
  prompt: string;
  label?: string;
}) {
  return (
    <div className={styles.panelTools}>
      <span className={styles.tipWrap}>
        <button type="button" className={styles.tipIcon} aria-label="About this section" title={tooltip}>
          i
        </button>
        <span className={styles.tipBubble}>{tooltip}</span>
      </span>
      <DashboardJadeButton section={section} prompt={prompt} label={label} compact />
    </div>
  );
}

export default async function DashboardPage() {
  const [overview, snapshot] = await Promise.all([getDashboardOverview(), getDashboardStateSnapshot()]);

  return (
    <main className={styles.pageShell}>
      <div className={styles.ambientA} />
      <div className={styles.ambientB} />
      <div className={styles.gridGlow} />

      <DashboardTopbarShell sections={sections} phoneHref={siteConfig.phoneHref} phoneDisplay={siteConfig.phoneDisplay} />

      <section id="pulse" className={styles.heroSection}>
        <div className={`container ${styles.heroGrid}`}>
          <article className={styles.heroCard}>
            <div className={styles.heroMetaRow}>
              <span className={styles.livePill}>Live refresh {overview.refreshedLabel}</span>
              <SectionTools
                section="pulse"
                prompt="Give me the first move this shift."
                tooltip="This opener rotates every 4 hours so the board feels alive when they log in."
                label="Ask Jade"
              />
            </div>
            <p className={styles.eyebrow}>{overview.welcomeLabel}</p>
            <h2 className={styles.heroTitle}>{overview.welcomeTitle}</h2>
            <p className={styles.welcomeNote}>{overview.welcomeNote}</p>
            <div className={styles.heroDivider} />
            <h3 className={styles.heroSubhead}>{overview.heroTitle}</h3>
            <p className={styles.heroCopy}>{overview.heroCopy}</p>

            <div className={styles.quickActionRow}>
              <a href="#playbook" className={styles.actionPrimary}>
                Today&apos;s playbook
              </a>
              <a href="#crm" className={styles.actionGhost}>
                CRM inbox
              </a>
              <a href="#tasks" className={styles.actionGhost}>
                Shared board
              </a>
              <a href="#field" className={styles.actionGhost}>
                Field read
              </a>
            </div>
          </article>

          <article className={styles.signalCard}>
            <div className={styles.panelHead}>
              <div>
                <p className={styles.eyebrow}>Board read</p>
                <h3 className={styles.signalTitle}>{overview.operatingHeadline}</h3>
              </div>
              <span className={styles.panelBadge}>Live</span>
            </div>
            <p className={styles.signalCopy}>{overview.operatingNote}</p>

            <div className={styles.signalStatGrid}>
              {overview.vitals.map((item) => (
                <article key={item.label} className={styles.metricCard}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className={styles.quoteSection}>
        <div className="container">
          <article className={styles.quoteCard}>
            <div className={styles.quoteHead}>
              <div>
                <p className={styles.eyebrow}>Quote of the day</p>
                <h3 className={styles.quoteTitle}>Daily fuel for builders</h3>
              </div>
              <span className={styles.livePillMuted}>Rotates daily</span>
            </div>
            <blockquote className={styles.quoteText}>“{overview.quoteOfDay.text}”</blockquote>
            <p className={styles.quoteAuthor}>{overview.quoteOfDay.author}</p>
          </article>
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={`container ${styles.twoUpGrid}`}>
          <article id="field" className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <p className={styles.eyebrow}>Field desk</p>
                <h3 className={styles.sectionTitle}>Weather, rain window, and daylight</h3>
              </div>
              <SectionTools
                section="field"
                prompt="Read today’s field conditions and tell me what changes the schedule."
                tooltip="Live weather, rain timing, and daylight. This should help stage outdoor jobs and avoid dumb surprises."
              />
            </div>

            <div className={styles.weatherGrid}>
              <article className={styles.weatherCard}>
                <span>Temperature</span>
                <strong>{overview.weather.temperature}</strong>
                <p>Feels like {overview.weather.feelsLike}</p>
              </article>
              <article className={styles.weatherCard}>
                <span>Wind</span>
                <strong>{overview.weather.wind}</strong>
                <p>Mattresses, loose debris, and awkward loads need tighter prep.</p>
              </article>
              <article className={styles.weatherCard}>
                <span>Rain window</span>
                <strong>{overview.weather.rainWindow}</strong>
                <p>Pull curbside and outdoor-heavy jobs ahead of this window.</p>
              </article>
              <article className={styles.weatherCard}>
                <span>Daylight</span>
                <strong>{overview.weather.daylight}</strong>
                <p>Use the clean light for estimates, proof, and property turns.</p>
              </article>
            </div>

            <p className={styles.panelNote}>{overview.weather.note}</p>
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <p className={styles.eyebrow}>Route desk</p>
                <h3 className={styles.sectionTitle}>Which lanes pay cleanest right now</h3>
              </div>
              <SectionTools
                section="field"
                prompt="Which zone is easiest money right now and where should they add buffer?"
                tooltip="Live drive-time estimates from Gaithersburg into the service zones. Great for same-day routing and pricing discipline."
                label="Ask Jade"
              />
            </div>

            <div className={styles.routeList}>
              {overview.routes.map((route) => (
                <article key={route.name} className={`${styles.routeCard} ${styles[`routeTone${route.tone[0].toUpperCase()}${route.tone.slice(1)}`]}`}>
                  <div>
                    <p className={styles.routeName}>{route.name}</p>
                    <p className={styles.routeNote}>{route.note}</p>
                  </div>
                  <strong className={styles.routeMinutes}>{route.minutes}</strong>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={`container ${styles.twoUpGrid}`}>
          <article id="playbook" className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <p className={styles.eyebrow}>Owner playbook</p>
                <h3 className={styles.sectionTitle}>What Antoine and Anthony should do next</h3>
              </div>
              <SectionTools
                section="playbook"
                prompt="Turn the board into the next three owner moves."
                tooltip="This is the action order. It should read like a closer’s checklist, not a report."
              />
            </div>

            <div className={styles.playbookList}>
              {overview.priorities.map((item, index) => (
                <article key={item.title} className={styles.playbookCard}>
                  <span className={styles.playbookIndex}>0{index + 1}</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                    <strong>{item.action}</strong>
                  </div>
                </article>
              ))}
            </div>
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <p className={styles.eyebrow}>Revenue surfaces</p>
                <h3 className={styles.sectionTitle}>What this dashboard should make more money on</h3>
              </div>
              <SectionTools
                section="profit"
                prompt="Which module matters most if they want more money, not more admin?"
                tooltip="These are the core systems that actually move revenue. If a module does not help callbacks, quoting, proof, or search, it should not be here."
              />
            </div>

            <div className={styles.moduleGrid}>
              {overview.crmModules.map((module) => (
                <article key={module.label} className={styles.moduleCard}>
                  <span>{module.label}</span>
                  <h4>{module.title}</h4>
                  <p>{module.body}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className="container">
          <article id="crm" className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <p className={styles.eyebrow}>Real CRM</p>
                <h3 className={styles.sectionTitle}>Lead inbox, callback pressure, and quote-stage visibility</h3>
              </div>
              <SectionTools
                section="crm"
                prompt="Read the CRM and tell me which lead deserves the next callback first."
                tooltip="This is the actual lead board. Form fills and qualified chat leads should land here automatically so the brothers can work from one board."
              />
            </div>

            <DashboardCrmPanel initialSnapshot={snapshot} />
          </article>
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className="container">
          <article id="tasks" className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <p className={styles.eyebrow}>Shared task board</p>
                <h3 className={styles.sectionTitle}>Drag-ranked business work with due dates, flags, and subtasks</h3>
              </div>
              <SectionTools
                section="tasks"
                prompt="Read the shared task board and tell me what should move to now, what should wait, and what is overdue."
                tooltip="This is the shared operating board. The goal is Trello energy with sharper prioritization and better agent awareness."
              />
            </div>

            <DashboardTaskBoard initialTasks={snapshot.tasks} />
          </article>
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={`container ${styles.twoUpGrid}`}>
          <article id="growth" className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <p className={styles.eyebrow}>Growth desk</p>
                <h3 className={styles.sectionTitle}>Compounding moves after the hot leads are handled</h3>
              </div>
              <SectionTools
                section="growth"
                prompt="What should they publish, capture, or systemize next to compound growth?"
                tooltip="This is for review capture, local SEO, proof gaps, and partnership lanes, not vanity metrics."
              />
            </div>

            <ul className={styles.growthList}>
              {overview.growthQueue.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article id="jade" className={styles.panel}>
            <DashboardOpsChat initialBrief={overview.jadeBrief} refreshedLabel={overview.refreshedLabel} />
          </article>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <div>
            <p className={styles.eyebrow}>System status</p>
            <h3 className={styles.footerTitle}>Weather feed live, route feed live, website intake live, Jade ready.</h3>
          </div>
          <div className={styles.footerActions}>
            <span className={styles.livePill}>Field feed ready</span>
            <span className={styles.livePillMuted}>Route pulse ready</span>
            <span className={styles.livePillMuted}>Website intake ready</span>
            <a href="#pulse" className={styles.actionGhost}>
              Jump to top
            </a>
            <a href={siteConfig.phoneHref} className={styles.actionPrimary}>
              Call the team
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
