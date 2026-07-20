"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

const LINE = "M20 150 L74 140 L128 120 L182 125 L236 100 L290 85 L344 70 L380 52";
const AREA = `${LINE} L380 185 L20 185 Z`;
const DOTS: [number, number][] = [
  [20, 150],
  [74, 140],
  [128, 120],
  [182, 125],
  [236, 100],
  [290, 85],
  [344, 70],
  [380, 52],
];

/**
 * Animated attendance graph (os). The line draws itself (Framer `pathLength`),
 * the area fades up, and week markers pop in — the "attendance trending up"
 * story for the retention section. Reduced motion: renders fully drawn, no
 * animation.
 */
export function AttendanceGraph() {
  const ref = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const show = reduced || inView;

  return (
    <div className="attend-graph">
      <div className="cluster" style={{ justifyContent: "space-between", marginBottom: "var(--space-4)" }}>
        <span className="eyebrow">Weekly attendance</span>
        <span className="data small" style={{ color: "var(--accent)" }}>
          trending up
        </span>
      </div>
      <svg ref={ref} viewBox="0 0 400 200" role="img" aria-label="Weekly attendance trending upward">
        {/* baseline */}
        <line x1="20" y1="185" x2="380" y2="185" stroke="var(--border)" strokeWidth="1" />
        {/* area */}
        <motion.path
          d={AREA}
          fill="var(--accent)"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 0.12 } : {}}
          transition={{ duration: reduced ? 0 : 0.8, ease: EASE, delay: 0.3 }}
        />
        {/* line */}
        <motion.path
          d={LINE}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduced ? 1 : 0 }}
          animate={show ? { pathLength: 1 } : {}}
          transition={{ duration: reduced ? 0 : 1.2, ease: EASE }}
        />
        {/* markers */}
        {DOTS.map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="3.5"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="2"
            initial={{ scale: reduced ? 1 : 0, opacity: reduced ? 1 : 0 }}
            animate={show ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: reduced ? 0 : 0.3, ease: EASE, delay: reduced ? 0 : 0.6 + i * 0.08 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}
      </svg>
    </div>
  );
}
