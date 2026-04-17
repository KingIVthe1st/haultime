"use client";

import Link from "next/link";
import { useState } from "react";
import { DashboardJadeButton } from "@/components/dashboard-jade-button";
import styles from "@/app/dashboard/dashboard.module.css";

type Section = {
  label: string;
  href: string;
};

export function DashboardTopbarShell({
  sections,
  phoneHref,
  phoneDisplay,
}: {
  sections: Section[];
  phoneHref: string;
  phoneDisplay: string;
}) {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className={styles.topbar}>
      <div className={`container ${styles.topbarInner}`}>
        <div className={styles.topbarPrimary}>
          <div className={styles.brandLockup}>
            <div className={styles.brandMark}>HT</div>
            <div>
              <p className={styles.eyebrow}>Haul Time Command Center</p>
              <h1 className={styles.brandTitle}>Read the board. Move the loads.</h1>
            </div>
          </div>

          <button
            type="button"
            className={styles.mobileMenuToggle}
            aria-expanded={open}
            aria-controls="dashboard-topbar-menu"
            onClick={() => setOpen((current) => !current)}
          >
            <span>{open ? "Close" : "Menu"}</span>
          </button>
        </div>

        <div id="dashboard-topbar-menu" className={open ? `${styles.topbarSecondary} ${styles.topbarSecondaryOpen}` : styles.topbarSecondary}>
          <nav className={styles.sectionNav} aria-label="Dashboard sections">
            {sections.map((section) => (
              <a key={section.href} href={section.href} className={styles.navPill} onClick={closeMenu}>
                {section.label}
              </a>
            ))}
          </nav>

          <div className={styles.topbarActions}>
            <Link href="/" className={styles.actionGhost} onClick={closeMenu}>
              Public site
            </Link>
            <div onClick={closeMenu}>
              <DashboardJadeButton section="pulse" prompt="Give me the first move this shift." label="Ask Jade" compact />
            </div>
            <a href={phoneHref} className={styles.actionPrimary} onClick={closeMenu}>
              Call {phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
