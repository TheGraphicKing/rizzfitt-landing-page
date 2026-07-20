"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis smooth-scroll wrapper, synced to GSAP ScrollTrigger.
 *
 * - Drives Lenis from GSAP's ticker (single rAF loop) and forwards every Lenis
 *   scroll event to `ScrollTrigger.update()` so pinned/scrubbed set-pieces stay
 *   perfectly aligned with the smoothed scroll position.
 * - Respects `prefers-reduced-motion`: when set, Lenis is NOT initialised at all
 *   — native scrolling is used, and `scroll-behavior` stays `auto` (the CSS
 *   reduced-motion block already handles this). ScrollTrigger still works on the
 *   native scroller.
 *
 * Mount once near the root (wraps the whole app in `app/layout.tsx`).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      // No smooth scroll; ensure any ScrollTriggers still refresh on resize.
      ScrollTrigger.refresh();
      return;
    }

    // Light, responsive smoothing — lerp mode feels close to native (the long
    // duration-eased glide felt floaty / "unusual").
    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Expose for anchor links and programmatic scrolling (e.g. nav jumps).
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
