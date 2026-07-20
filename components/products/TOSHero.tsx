"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section, Tag, Button, Hero3DCanvas } from "@/components/primitives";
import { EASE } from "@/lib/motion";
import { ScoreboardScene } from "./ScoreboardScene";

const HEADLINE = "Run your entire tournament from one dashboard.";

/**
 * Tournament OS hero (os). 3D scoreboard/court scene with a live score demo that
 * ticks beside the staggered headline. Reduced motion: no tick, words appear
 * without travel, 3D swaps to the static still.
 */
export function TOSHero() {
  const reduced = useReducedMotion() ?? false;
  const words = HEADLINE.split(" ");
  const [score, setScore] = useState<[number, number]>(reduced ? [11, 8] : [9, 7]);

  // Live score demo ticking toward game point.
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setScore(([a, b]) => {
        const next: [number, number] = Math.random() > 0.5 ? [a + 1, b] : [a, b + 1];
        const [na, nb] = next;
        if ((na >= 11 || nb >= 11) && Math.abs(na - nb) >= 2) return [6, 5];
        return next;
      });
    }, 1700);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <Section mode="os" className="tos-hero">
      <div className="tos-hero-grid">
        <div className="stack" style={{ gap: "var(--space-5)", maxWidth: "34rem" }}>
          <Tag>Flagship · Tournament OS</Tag>

          <h1 className="display-l" style={{ margin: 0 }}>
            {words.map((w, i) => (
              <span
                key={`${w}-${i}`}
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
              >
                <motion.span
                  style={{ display: "inline-block", paddingRight: "0.25em" }}
                  initial={{ opacity: 0, y: reduced ? 0 : "0.4em" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.4, ease: EASE, delay: reduced ? 0 : 0.04 + i * 0.03 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <p className="body-l muted">
            Website, registrations, payments, brackets, live scoring and
            communication — branded, automated, and live the same day you brief
            us.
          </p>

          <div className="cluster">
            <Button href="/book-a-demo" variant="primary">
              Book a demo
            </Button>
            <Button href="#live-scoring" variant="ghost">
              See live scoring
            </Button>
          </div>
        </div>

        <div className="tos-hero-visual">
          <Hero3DCanvas
            fallbackSrc="/hero-fallback.svg"
            fallbackAlt="RizzFitt 3D tournament scoreboard and court"
            height="clamp(320px, 44vw, 520px)"
          >
            <ScoreboardScene />
          </Hero3DCanvas>

          {/* Live score demo overlay */}
          <div className="tos-score" data-score={`${score[0]}-${score[1]}`}>
            <span className="pill">
              <span className="live-dot" aria-hidden /> Live · Court 3
            </span>
            <div
              className="cluster"
              style={{ justifyContent: "space-between", alignItems: "baseline", marginTop: "var(--space-2)" }}
              aria-live={reduced ? undefined : "polite"}
            >
              <span className="small muted">Aravind</span>
              <span className="score">
                {score[0]} – {score[1]}
              </span>
              <span className="small muted">Surya</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
