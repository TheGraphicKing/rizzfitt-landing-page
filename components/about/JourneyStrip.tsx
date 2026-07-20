"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/primitives";

const MILESTONES = [
  { k: "01", title: "First event", sub: "Where it started — one messy tournament, run cleaner." },
  { k: "02", title: "First league", sub: "Recurring play: WPPL and the Salem Challenger." },
  { k: "03", title: "First state association", sub: "Tamil Nadu Pickleball Association on board." },
  { k: "04", title: "First national", sub: "The Indian Pickleball Nationals, fully live-scored." },
  { k: "05", title: "First international", sub: "KLTR Open, Singapore — across the border." },
  { k: "06", title: "47 events", sub: "Across 10 cities and five sports, and counting." },
  { k: "07", title: "What's next", sub: "RizzFitt Connect, and the rooms we haven't run yet." },
];

/**
 * The journey — a horizontally-scrubbed, pinned strip of mono milestones (the
 * one pinned set-piece on About). Reduced motion / small screens fall back to a
 * vertical list (no pin, no horizontal scrub).
 */
export function JourneyStrip() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 900px)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const trackEl = track.current!;
      const distance = () => trackEl.scrollWidth - window.innerWidth + 80;
      gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, root);
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, []);

  return (
    <section className="section journey" data-mode="live" ref={root}>
      <div className="container">
        <div className="stack" style={{ gap: "var(--space-3)", marginBottom: "var(--space-7)" }}>
          <Tag>The journey</Tag>
          <h2 className="h1">From one court to a network.</h2>
        </div>
      </div>
      <div className="journey-track" ref={track}>
        {MILESTONES.map((m, i) => (
          <div className="journey-card" key={m.k}>
            <span className="data journey-k">{m.k}</span>
            <h3 className="h2" style={{ margin: 0 }}>
              {m.title}
            </h3>
            <p className="muted">{m.sub}</p>
            {i < MILESTONES.length - 1 ? <span className="journey-arrow data" aria-hidden>→</span> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
