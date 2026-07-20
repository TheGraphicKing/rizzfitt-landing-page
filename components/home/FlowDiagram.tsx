"use client";

import { useLayoutEffect, useRef } from "react";
import {
  Globe,
  ClipboardList,
  IndianRupee,
  GitBranch,
  Activity,
  MessageCircle,
  Megaphone,
  BarChart3,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/primitives";

interface Output {
  label: string;
  icon: LucideIcon;
}

const OUTPUTS: Output[] = [
  { label: "Event website", icon: Globe },
  { label: "Online registrations", icon: ClipboardList },
  { label: "Payment collection", icon: IndianRupee },
  { label: "Brackets & fixtures", icon: GitBranch },
  { label: "Live scoring", icon: Activity },
  { label: "Participant communication", icon: MessageCircle },
  { label: "Marketing & sponsor assets", icon: Megaphone },
  { label: "Analytics dashboard", icon: BarChart3 },
];

/**
 * "How it works" — the home showpiece (os / dark) and the page's ONLY pinned
 * GSAP set-piece. The input card pins in place while the eight output tiles deal
 * out on scrub and the SVG connectors draw themselves in, ending on
 * "live in hours, not weeks."
 *
 * Reduced motion: no pin, no scrub. The diagram renders in its final state
 * (all tiles visible, connectors fully drawn) and is fully readable.
 */
export function FlowDiagram() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const svg = useRef<SVGSVGElement>(null);
  const endLine = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Static (no pin/scrub) under reduced motion OR on small screens, where a
    // pinned horizontal deal-out reads poorly. Final state renders fully.
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 900px)").matches;

    /** Measure DOM and draw the connector paths from the input card to each tile. */
    const drawConnectors = () => {
      const stageEl = stage.current;
      const inputEl = input.current;
      const svgEl = svg.current;
      if (!stageEl || !inputEl || !svgEl) return;
      const s = stageEl.getBoundingClientRect();
      svgEl.setAttribute("viewBox", `0 0 ${s.width} ${s.height}`);
      const i = inputEl.getBoundingClientRect();
      const sx = i.right - s.left;
      const sy = i.top + i.height / 2 - s.top;

      tiles.current.forEach((t, idx) => {
        const p = paths.current[idx];
        if (!t || !p) return;
        const r = t.getBoundingClientRect();
        const ex = r.left - s.left;
        const ey = r.top + r.height / 2 - s.top;
        const mx = (sx + ex) / 2;
        p.setAttribute("d", `M ${sx} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`);
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = reduced ? "0" : `${len}`;
      });
    };

    const ctx = gsap.context(() => {
      drawConnectors();

      if (reduced) return; // final state already rendered; no scrub.

      // Hidden start state: tiles collapsed toward the input card.
      const stageRect = stage.current!.getBoundingClientRect();
      const inputRect = input.current!.getBoundingClientRect();
      const inputCx = inputRect.left + inputRect.width / 2 - stageRect.left;
      const inputCy = inputRect.top + inputRect.height / 2 - stageRect.top;

      tiles.current.forEach((t) => {
        if (!t) return;
        const r = t.getBoundingClientRect();
        const cx = r.left + r.width / 2 - stageRect.left;
        const cy = r.top + r.height / 2 - stageRect.top;
        gsap.set(t, { x: inputCx - cx, y: inputCy - cy, scale: 0.5, autoAlpha: 0 });
      });
      gsap.set(endLine.current, { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=1700",
          pin: stage.current,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tiles.current.forEach((t, idx) => {
        if (!t) return;
        const at = idx * 0.55;
        tl.to(t, { x: 0, y: 0, scale: 1, autoAlpha: 1, ease: "power2.out", duration: 0.7 }, at);
        const p = paths.current[idx];
        if (p) {
          tl.to(p, { strokeDashoffset: 0, ease: "none", duration: 0.55 }, at + 0.15);
        }
      });

      tl.to(endLine.current, { autoAlpha: 1, y: 0, duration: 1 }, ">-0.2");
    }, root);

    // Recompute connector geometry after layout settles and on refresh.
    const onRefresh = () => drawConnectors();
    ScrollTrigger.addEventListener("refreshInit", onRefresh);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", onRefresh);
      ctx.revert();
    };
  }, []);

  return (
    <section className="section" data-mode="os" ref={root}>
      <div className="flow-stage" ref={stage}>
        <div className="container">
          <div className="stack" style={{ gap: "var(--space-3)", maxWidth: "44rem" }}>
            <Tag>How it works</Tag>
            <h2 className="h1">One input. A full event stack.</h2>
            <p className="body-l muted">
              Tell us about your event once. RizzFitt turns that single brief into
              a complete, branded, operational stack — no developers, no design
              team, no spreadsheets.
            </p>
          </div>

          <div className="flow-board">
            <svg className="flow-connectors" ref={svg} aria-hidden preserveAspectRatio="none">
              {OUTPUTS.map((_, i) => (
                <path
                  key={i}
                  ref={(el) => {
                    paths.current[i] = el;
                  }}
                  className="flow-path"
                  fill="none"
                />
              ))}
            </svg>

            <div className="flow-input" ref={input}>
              <span className="eyebrow">Your brief</span>
              <span className="h3" style={{ marginTop: "var(--space-2)" }}>
                One event
              </span>
              <span className="small muted">Sport, dates, format, venue.</span>
            </div>

            <div className="flow-tiles">
              {OUTPUTS.map(({ label, icon: Icon }, i) => (
                <div
                  className="flow-output"
                  key={label}
                  ref={(el) => {
                    tiles.current[i] = el;
                  }}
                >
                  <span className="flow-output__icon" aria-hidden>
                    <Icon size={20} />
                  </span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flow-end" ref={endLine}>
            <ArrowRight size={20} />
            <span className="h2" style={{ margin: 0 }}>
              live in hours, not weeks.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
