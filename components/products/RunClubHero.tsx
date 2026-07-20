"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Flag } from "lucide-react";
import { Section, Tag, Button } from "@/components/primitives";
import { EASE } from "@/lib/motion";

const ROUTE = "M24 150 C 70 60, 120 60, 150 110 S 230 180, 270 120 S 330 50, 344 44";

const LANES = [
  { pace: "5:00 /km", runners: ["A", "R", "K"] },
  { pace: "5:30 /km", runners: ["S", "M"] },
  { pace: "6:00 /km", runners: ["D", "N", "V", "P"] },
];

/**
 * Run Club OS hero (os). The visual: a route line drawing itself across a
 * stylised map, with pace-group chips sorting into their lanes. Reduced motion:
 * the route renders fully drawn and chips appear in place.
 */
export function RunClubHero() {
  const reduced = useReducedMotion() ?? false;

  return (
    <Section mode="os" className="tos-hero">
      <div className="tos-hero-grid">
        <div className="stack" style={{ gap: "var(--space-5)", maxWidth: "32rem" }}>
          <Tag>Run Club OS</Tag>
          <h1 className="display-l" style={{ margin: 0 }}>
            The all-in-one platform for run clubs.
          </h1>
          <p className="body-l muted">
            Less spreadsheet wrangling, more running together. Registrations, pace
            groups, routes, attendance and perks — handled.
          </p>
          <div className="cluster">
            <Button href="/book-a-demo" variant="primary">
              Book a demo
            </Button>
            <Button href="#features" variant="ghost">
              See features
            </Button>
          </div>
        </div>

        <div className="stack" style={{ gap: "var(--space-4)" }}>
          {/* Stylised map with a drawing route */}
          <div className="route-map">
            <svg viewBox="0 0 360 200" role="img" aria-label="A run route drawing across a map">
              <motion.path
                d={ROUTE}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: reduced ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduced ? 0 : 1.6, ease: EASE, delay: 0.2 }}
              />
              <circle cx="24" cy="150" r="6" fill="var(--accent)" />
              <circle cx="344" cy="44" r="6" fill="var(--surface)" stroke="var(--accent)" strokeWidth="3" />
            </svg>
            <span className="route-pin route-start" aria-hidden>
              <MapPin size={14} /> Start
            </span>
            <span className="route-pin route-end" aria-hidden>
              <Flag size={14} /> 5K
            </span>
          </div>

          {/* Pace-group chips sorting into lanes */}
          <div className="pace-lanes">
            {LANES.map((lane, li) => (
              <div className="pace-lane" key={lane.pace}>
                <span className="data small muted pace-label">{lane.pace}</span>
                <div className="pace-runners">
                  {lane.runners.map((rn, ri) => (
                    <motion.span
                      key={`${li}-${ri}`}
                      className="pace-chip"
                      initial={{ opacity: 0, x: reduced ? 0 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: reduced ? 0 : 0.4,
                        ease: EASE,
                        delay: reduced ? 0 : 0.6 + li * 0.18 + ri * 0.08,
                      }}
                    >
                      {rn}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
