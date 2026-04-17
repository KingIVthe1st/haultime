"use client";

import { useEffect } from "react";

const MOBILE_BREAKPOINT = 720;
const TOP_RESTING_Y = 96;
const DELTA_THRESHOLD = 8;

export function MobileScrollChrome() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    let lastY = window.scrollY;
    let ticking = false;

    const setChromeState = () => {
      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

      if (!isMobile) {
        delete root.dataset.mobileChrome;
        lastY = window.scrollY;
        ticking = false;
        return;
      }

      const currentY = window.scrollY;
      const delta = currentY - lastY;
      let nextState = root.dataset.mobileChrome || "resting";

      if (currentY <= TOP_RESTING_Y) {
        nextState = "resting";
      } else if (delta > DELTA_THRESHOLD) {
        nextState = "hidden";
      } else if (delta < -DELTA_THRESHOLD) {
        nextState = "shown";
      }

      root.dataset.mobileChrome = nextState;
      lastY = currentY;
      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(setChromeState);
    };

    setChromeState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      delete root.dataset.mobileChrome;
    };
  }, []);

  return null;
}
