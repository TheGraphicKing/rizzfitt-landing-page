"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { Section, Tag } from "@/components/primitives";

const CHIPS = [
  "Auto scoring",
  "Auto fixtures",
  "Auto re-seeding",
  "WhatsApp score-in",
  "Public live bracket",
];

/**
 * Live scoring — "the moat" (os). A self-drawing bracket, a pulsing live match
 * row with a ticking score, and a WhatsApp score-in demo, given room to breathe.
 *
 * Reduced motion: the bracket renders fully drawn, the score holds a final
 * value, and nothing pulses or ticks (the live dot's CSS pulse is already
 * disabled under reduced motion).
 */
export function ScoreboardMoat() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const drawn = reduced || inView;
  const [score, setScore] = useState<[number, number]>(reduced ? [11, 8] : [8, 6]);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setScore(([a, b]) => {
        const next: [number, number] = Math.random() > 0.5 ? [a + 1, b] : [a, b + 1];
        const [na, nb] = next;
        if ((na >= 11 || nb >= 11) && Math.abs(na - nb) >= 2) return [7, 6];
        return next;
      });
    }, 1600);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <Section mode="os" id="live-scoring">
      <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "52rem", marginBottom: "var(--space-8)" }}>
        <Tag>Live scoring</Tag>
        <h2 className="display-l" style={{ margin: 0 }}>
          The court runs itself.
        </h2>
        <p className="body-l muted">
          Scores come in from the court — typed, tapped, or sent on WhatsApp — and
          everything downstream happens on its own. The bracket updates, the next
          match is called, standings recalculate, and the public live page and
          community group reflect it instantly. Referees officiate; they don&apos;t
          do admin. Disputes drop because the source of truth is live and shared.
        </p>
      </div>

      <div className="moat-grid" ref={ref}>
        {/* Left: live scoreboard + WhatsApp demo */}
        <div className="stack" style={{ gap: "var(--space-5)" }}>
          <div className="scoreboard">
            <span className="eyebrow">Live now</span>
            <div className="moat-rows" style={{ marginTop: "var(--space-4)" }}>
              <div className="moat-row moat-row--live">
                <span className="cluster" style={{ gap: 8 }}>
                  <span className="live-dot" aria-hidden /> Court 3 · Final
                </span>
                <span className="score" aria-live={reduced ? undefined : "polite"}>
                  {score[0]} – {score[1]}
                </span>
              </div>
              <div className="moat-row">
                <span className="muted small">Court 1 · Semi-final</span>
                <span className="status-pill status-completed">11 – 7</span>
              </div>
              <div className="moat-row">
                <span className="muted small">Court 2 · Up next</span>
                <span className="status-pill status-upcoming">Called</span>
              </div>
            </div>
          </div>

          {/* WhatsApp score-in */}
          <div className="scoreboard wa-demo">
            <span className="eyebrow">
              <MessageCircle size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />
              WhatsApp score-in
            </span>
            <div className="wa-bubble wa-in">Court 3, game point: 11 – 8</div>
            <div className="wa-bubble wa-out">
              <Check size={14} /> Recorded · bracket updated · next match called
            </div>
          </div>
        </div>

        {/* Right: self-drawing bracket */}
        <div className="scoreboard moat-bracket">
          <span className="eyebrow">Public live bracket</span>
          <svg
            viewBox="0 0 360 260"
            className={`bracket-svg${drawn ? " is-drawn" : ""}`}
            role="img"
            aria-label="Tournament bracket that updates automatically"
            style={{ marginTop: "var(--space-4)" }}
          >
            {/* Connectors */}
            <path className="bracket-line" d="M120 40 H160 V90 H200" />
            <path className="bracket-line" d="M120 140 H160 V90" />
            <path className="bracket-line" d="M120 200 H160 V150 H200" style={{ ["--d" as string]: "0.4s" }} />
            <path className="bracket-line" d="M120 240 H160 V150" style={{ ["--d" as string]: "0.4s" }} />
            <path className="bracket-line" d="M280 90 H300 V120 H320" style={{ ["--d" as string]: "0.8s" }} />
            <path className="bracket-line" d="M280 150 H300 V120" style={{ ["--d" as string]: "0.8s" }} />
            {/* Seed boxes */}
            {[
              [20, 30, "Aravind"],
              [20, 130, "Surya"],
              [20, 190, "Kiran"],
              [20, 230, "Devi"],
              [200, 80, "Aravind"],
              [200, 140, "Kiran"],
              [320, 110, "Final"],
            ].map(([x, y, label], i) => (
              <g className="bracket-seed" key={i} style={{ ["--d" as string]: `${0.1 * i}s` }}>
                <rect x={x as number} y={y as number} width="100" height="22" rx="6" />
                <text x={(x as number) + 10} y={(y as number) + 15}>
                  {label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className="cluster" style={{ marginTop: "var(--space-7)" }}>
        {CHIPS.map((c) => (
          <Tag key={c}>{c}</Tag>
        ))}
      </div>
    </Section>
  );
}
