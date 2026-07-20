"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section, Button, Tag, CountUp } from "@/components/primitives";
import { Hero3DCanvas } from "@/components/primitives";
import { EASE } from "@/lib/motion";
import { PaddleScene } from "./hero3d/PaddleScene";

const HEADLINE = "Run the game. We run everything else.";

/**
 * Home hero (os / dark). Staggered headline words, a floating paddle+ball 3D
 * scene with a live "events powered" stat overlay, and the two primary CTAs.
 * Reduced motion: words appear without travel; the 3D swaps to the static still.
 *
 * `eventsCount` is passed from the server so the real number is derived from the
 * events dataset without bundling the JSON into this client component.
 */
export function HeroSection({ eventsCount }: { eventsCount: number }) {
  const reduced = useReducedMotion() ?? false;
  const words = HEADLINE.split(" ");

  return (
    <Section mode="os" as="section" className="hero-section">
      <div className="hero-grid">
        {/* Copy */}
        <div className="stack" style={{ gap: "var(--space-5)", maxWidth: "32rem" }}>
          <Tag>Sports &amp; community OS</Tag>

          <h1 className="display-xl" style={{ margin: 0 }}>
            <span style={{ display: "inline" }}>
              {words.map((w, i) => (
                <span
                  key={`${w}-${i}`}
                  style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
                >
                  <motion.span
                    style={{ display: "inline-block", paddingRight: "0.25em" }}
                    initial={{ opacity: 0, y: reduced ? 0 : "0.4em" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduced ? 0 : 0.4,
                      ease: EASE,
                      delay: reduced ? 0 : 0.04 + i * 0.035,
                    }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <p className="body-l muted">
            RizzFitt is the operating system behind sports events and communities
            in India — from professional tournaments to run clubs to
            Saturday-morning mixers. One platform to launch, manage, grow and
            automate it all.
          </p>

          <div className="cluster">
            <Button href="/book-a-demo" variant="primary">
              Book a demo
            </Button>
            <Button href="#products" variant="ghost">
              Explore products
            </Button>
          </div>
        </div>

        {/* 3D visual + stat overlay */}
        <div className="hero-visual">
          <Hero3DCanvas
            fallbackSrc="/hero-fallback.svg"
            fallbackAlt="RizzFitt pickleball paddle and ball"
            height="clamp(300px, 38vw, 460px)"
          >
            <PaddleScene />
          </Hero3DCanvas>

          <span className="hero-hint data" aria-hidden>
            Move your cursor · click to serve
          </span>

          <div className="hero-stat" aria-label={`${eventsCount} events powered`}>
            <span className="data hero-stat__num">
              <CountUp to={eventsCount} suffix="+" />
            </span>
            <span className="hero-stat__label">events powered</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
