"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Interactive "audience field" — a grid of dots (players/people) that light up
 * and swell around your cursor, like reaching a room. Pointer-driven (no
 * autonomous motion), canvas-rendered, paused when offscreen. Used as the
 * signature illustration on reach/community/proof pages.
 *
 * Reduced motion: renders the static dot grid and skips the cursor reaction.
 */
export function AudienceField({ caption, className }: { caption?: string; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    const box = wrap.current;
    if (!cv || !box) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const GAP = 26;
    const R = 110; // influence radius
    let dpr = 1;
    let w = 0;
    let h = 0;
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let active = true;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = box.clientWidth;
      h = box.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / GAP);
      const rows = Math.ceil(h / GAP);
      const ox = (w - (cols - 1) * GAP) / 2;
      const oy = (h - (rows - 1) * GAP) / 2;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = ox + i * GAP;
          const y = oy + j * GAP;
          const d = Math.hypot(x - mouse.x, y - mouse.y);
          const t = reduced ? 0 : Math.max(0, 1 - d / R);
          const r = 1.8 + t * 4.5;
          // orange when lit, muted dot otherwise
          if (t > 0.02) {
            ctx.fillStyle = `rgba(241,108,29,${0.35 + t * 0.65})`;
          } else {
            ctx.fillStyle = "rgba(241,108,29,0.16)";
          }
          ctx.beginPath();
          ctx.arc(x, y - t * 4, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = () => {
      draw();
      if (active && !reduced) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = cv.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    draw();
    if (!reduced) raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(box);
    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(([en]) => {
      active = en.isIntersecting;
      if (active && !reduced) raf = requestAnimationFrame(loop);
      else cancelAnimationFrame(raf);
    });
    io.observe(box);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrap} className={cn("audience-field", className)}>
      <canvas ref={canvas} className="audience-canvas" />
      {caption ? <span className="audience-caption data">{caption}</span> : null}
    </div>
  );
}
