"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section, Tag } from "@/components/primitives";

const CHIPS = ["Auto scoring", "Auto fixtures", "Auto re-seeding", "Live public bracket"];

interface Seed {
  id: string;
  name: string;
  pts: number;
}

const INITIAL_SEEDS: Seed[] = [
  { id: "a", name: "Karthik / Meera", pts: 0 },
  { id: "b", name: "Arjun / Diya", pts: 0 },
  { id: "c", name: "Rohan / Sara", pts: 0 },
  { id: "d", name: "Vikram / Nila", pts: 0 },
];

/**
 * The differentiator (os / dark). A mini live scoreboard ticks a game out while
 * the bracket below re-seeds itself by points — the "it updates itself" story.
 * Reduced motion: the score sits at a representative value and the bracket holds
 * a fixed order (no intervals, no layout animation).
 */
export function Differentiator() {
  const reduced = useReducedMotion() ?? false;
  const [score, setScore] = useState<[number, number]>(reduced ? [11, 8] : [4, 3]);
  const [seeds, setSeeds] = useState<Seed[]>(
    reduced
      ? INITIAL_SEEDS.map((s, i) => ({ ...s, pts: 8 - i * 2 }))
      : INITIAL_SEEDS,
  );

  // Tick the score; when a side reaches 11 (win by ≥2), reset the game.
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setScore(([a, b]) => {
        const next: [number, number] = Math.random() > 0.5 ? [a + 1, b] : [a, b + 1];
        const [na, nb] = next;
        if ((na >= 11 || nb >= 11) && Math.abs(na - nb) >= 2) return [0, 0];
        return next;
      });
      // Nudge a random team's points and re-seed by points desc.
      setSeeds((prev) => {
        const i = Math.floor(Math.random() * prev.length);
        const bumped = prev.map((s, idx) => (idx === i ? { ...s, pts: s.pts + 1 } : s));
        return [...bumped].sort((x, y) => y.pts - x.pts);
      });
    }, 1500);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <Section mode="os">
      <div className="diff-grid">
        {/* Copy */}
        <div className="stack" style={{ gap: "var(--space-5)", maxWidth: "34rem" }}>
          <Tag>The difference</Tag>
          <h2 className="h1">Referees just watch the game.</h2>
          <p className="body-l muted">
            This is the part nobody else automates. On match day, scoring,
            fixtures and re-seeding update themselves in real time. A score comes
            in, the bracket re-orders, the next match is called, the website and
            community group update — automatically. No bottleneck at the scoring
            table, no manual draw sheets, no disputes over who plays next.
          </p>
          <div className="cluster">
            {CHIPS.map((c) => (
              <Tag key={c}>{c}</Tag>
            ))}
          </div>
        </div>

        {/* Live panel */}
        <div className="stack" style={{ gap: "var(--space-5)" }}>
          <div className="scoreboard">
            <div
              className="cluster"
              style={{ justifyContent: "space-between", marginBottom: "var(--space-4)" }}
            >
              <span className="pill">
                <span className="live-dot" aria-hidden /> Live
              </span>
              <span className="data small muted">Court 1 · Semi-final</span>
            </div>
            <div
              className="cluster"
              style={{ justifyContent: "space-between", alignItems: "baseline" }}
              aria-live={reduced ? undefined : "polite"}
            >
              <span className="small muted">Karthik / Meera</span>
              <span className="score">
                {score[0]} – {score[1]}
              </span>
              <span className="small muted">Arjun / Diya</span>
            </div>
          </div>

          <div className="scoreboard">
            <span className="eyebrow">Live bracket · re-seeding</span>
            <ul className="diff-bracket" style={{ marginTop: "var(--space-3)" }}>
              {seeds.map((s, i) => (
                <motion.li
                  key={s.id}
                  layout={!reduced}
                  transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                  className="diff-seed"
                >
                  <span className="data small muted">#{i + 1}</span>
                  <span className="small">{s.name}</span>
                  <span className="data small" style={{ color: "var(--accent)" }}>
                    {s.pts}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
