"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { EventCover } from "@/components/events/EventCover";
import { realOrNone } from "@/lib/assets";

export interface CollageItem {
  /** Real image path under /public (rendered only if the file exists). */
  src?: string;
  /** Sport, for the branded placeholder cover when there's no photo. */
  sport?: string;
  alt?: string;
}

const ASPECTS = ["3 / 4", "1 / 1", "4 / 3", "3 / 4", "4 / 5", "1 / 1", "3 / 4", "4 / 3"];

/**
 * Reusable collage — CSS masonry, a gentle in-frame parallax on scroll, and a
 * lightbox. Real photos render when the file exists (per the asset manifest);
 * otherwise a branded per-sport cover fills the slot. Parallax is disabled under
 * reduced motion; the lightbox is keyboard-operable (Esc / arrows).
 */
export function Collage({ items, label }: { items: CollageItem[]; label?: string }) {
  const cells = useRef<(HTMLButtonElement | null)[]>([]);
  const [open, setOpen] = useState<number | null>(null);

  // In-frame parallax: shift each cell's inner layer as it crosses the viewport.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const vh = window.innerHeight;
      cells.current.forEach((cell, i) => {
        if (!cell) return;
        const inner = cell.firstElementChild as HTMLElement | null;
        if (!inner) return;
        const r = cell.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const progress = (r.top + r.height / 2 - vh / 2) / vh; // -0.5..0.5-ish
        const speed = 18 + (i % 3) * 8;
        inner.style.transform = `translateY(${(-progress * speed).toFixed(1)}px)`;
      });
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length]);

  // Lightbox keyboard nav.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? 0 : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? 0 : (i - 1 + items.length) % items.length));
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("lenis-stopped");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [open, items.length]);

  return (
    <div className="collage2" role="group" aria-label={label}>
      {items.map((it, i) => {
        const real = realOrNone(it.src);
        return (
          <button
            key={i}
            type="button"
            className="collage-cell"
            style={{ aspectRatio: ASPECTS[i % ASPECTS.length] }}
            aria-label={`Open ${it.alt ?? it.sport ?? "photo"} ${i + 1}`}
            ref={(el) => {
              cells.current[i] = el;
            }}
            onClick={() => setOpen(i)}
          >
            <span className="collage-inner">
              {real ? (
                <Image src={real} alt={it.alt ?? ""} fill sizes="(max-width:900px) 50vw, 33vw" style={{ objectFit: "cover" }} />
              ) : (
                <EventCover sport={it.sport ?? "Pickleball"} />
              )}
            </span>
          </button>
        );
      })}

      {open !== null ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setOpen(null)}>
          <button type="button" className="lightbox-close" aria-label="Close" onClick={() => setOpen(null)}>
            <X size={22} />
          </button>
          <div className="lightbox-img" data-i={open % 4} onClick={(e) => e.stopPropagation()}>
            {realOrNone(items[open].src) ? (
              <Image src={items[open].src as string} alt={items[open].alt ?? ""} fill sizes="90vw" style={{ objectFit: "contain" }} />
            ) : (
              <span className="data muted">
                {items[open].sport ?? "Photo"} · {open + 1} / {items.length}
              </span>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
