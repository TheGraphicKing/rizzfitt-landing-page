"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Section, Tag } from "@/components/primitives";

const BEFORE_ITEMS = [
  "Spreadsheets",
  "WhatsApp chaos",
  "Paper brackets",
  "Manual payment chasing",
  "Last-minute posters",
];

/**
 * Before / After drag comparison (os). A GSAP Draggable handle wipes between a
 * messy handwritten umpire sheet (before) and one branded RizzFitt dashboard
 * (after). Fully keyboard-operable: the handle is a `role="slider"` — arrow keys
 * move it, Home/End jump to the ends. Drag works on touch + mouse via Draggable.
 */
export function BeforeAfter() {
  const wrap = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLButtonElement>(null);
  const draggable = useRef<Draggable | null>(null);
  const [pos, setPos] = useState(50); // % from the left

  useLayoutEffect(() => {
    gsap.registerPlugin(Draggable);
    const wrapEl = wrap.current;
    const handleEl = handle.current;
    if (!wrapEl || !handleEl) return;

    const width = () => wrapEl.clientWidth;

    const apply = (pct: number) => {
      const clamped = Math.max(0, Math.min(100, pct));
      setPos(clamped);
      gsap.set(handleEl, { x: (clamped / 100) * width() });
    };

    const [d] = Draggable.create(handleEl, {
      type: "x",
      bounds: wrapEl,
      cursor: "ew-resize",
      onDrag() {
        setPos((this.x / width()) * 100);
      },
    });
    draggable.current = d;

    apply(50);
    const onResize = () => apply(pos);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      d.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nudge = (delta: number) => {
    const wrapEl = wrap.current;
    const handleEl = handle.current;
    if (!wrapEl || !handleEl) return;
    const next = Math.max(0, Math.min(100, pos + delta));
    setPos(next);
    gsap.set(handleEl, { x: (next / 100) * wrapEl.clientWidth });
    draggable.current?.update();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        nudge(-5);
        break;
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        nudge(5);
        break;
      case "Home":
        e.preventDefault();
        nudge(-100);
        break;
      case "End":
        e.preventDefault();
        nudge(100);
        break;
    }
  };

  return (
    <Section mode="os">
      <div className="stack" style={{ gap: "var(--space-3)", maxWidth: "48rem", marginBottom: "var(--space-7)" }}>
        <Tag>Before / after</Tag>
        <h2 className="h1">From twelve tabs to one.</h2>
      </div>

      <div className="ba-slider" ref={wrap}>
        {/* AFTER — one branded dashboard (full layer) */}
        <div className="ba-after ba-panel ba-after-panel">
          <span className="eyebrow">After</span>
          <span className="h3">One branded RizzFitt dashboard</span>
          <div className="ba-result">
            <div className="cluster" style={{ justifyContent: "space-between" }}>
              <span className="pill">
                <span className="live-dot" aria-hidden /> Final · Court 3
              </span>
              <span className="status-pill status-completed">Completed</span>
            </div>
            <div
              className="cluster"
              style={{ justifyContent: "space-between", alignItems: "baseline", marginTop: "var(--space-3)" }}
            >
              <span className="small">Aravind</span>
              <span className="score">11 – 8</span>
              <span className="small">Surya</span>
            </div>
          </div>
        </div>

        {/* BEFORE — messy handwritten sheet (clipped layer) */}
        <div
          className="ba-before ba-panel ba-before-panel"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          aria-hidden
        >
          <span className="ba-before-label">Before</span>
          <ul className="ba-scrawl">
            {BEFORE_ITEMS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        {/* Handle */}
        <button
          ref={handle}
          type="button"
          className="ba-handle"
          role="slider"
          aria-label="Drag to compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% before`}
          onKeyDown={onKeyDown}
        />
      </div>
    </Section>
  );
}
