"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section, Tag } from "@/components/primitives";

const STEPS = [
  "Share your tournament details (a single form).",
  "We apply your branding and build the site.",
  "Registration and payments go live.",
  "Marketing, comms and sponsor outreach fire automatically.",
  "On match day, scoring and brackets run themselves.",
];

/**
 * "Go live today" setup timeline (os). Five numbered steps with a connecting
 * line that draws (scaleY 0→1) on scroll — a scrubbed ScrollTrigger, NOT pinned,
 * so it doesn't spend the page's one-pinned-section budget. Reduced motion: the
 * line renders fully drawn and steps are static.
 */
export function SetupTimeline() {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lineEl = line.current;
    if (!lineEl) return;

    if (reduced) {
      gsap.set(lineEl, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineEl,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 65%",
            end: "bottom 75%",
            scrub: 0.5,
          },
        },
      );
      gsap.from(".tos-step", {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <Section mode="os">
      <div className="stack" style={{ gap: "var(--space-3)", maxWidth: "48rem", marginBottom: "var(--space-8)" }}>
        <Tag>Go live today</Tag>
        <h2 className="h1">Submit once. Live the same day.</h2>
      </div>

      <div className="tos-timeline" ref={root}>
        <div className="tos-track" aria-hidden>
          <div className="tos-track-fill" ref={line} />
        </div>
        <ol className="tos-steps">
          {STEPS.map((step, i) => (
            <li className="tos-step" key={i}>
              <span className="tos-step-num data">{String(i + 1).padStart(2, "0")}</span>
              <span className="body-l">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
