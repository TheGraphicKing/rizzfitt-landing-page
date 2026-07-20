"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/content/testimonials";

/**
 * Accessible testimonials carousel. Degrades to a horizontally-scrollable row
 * with no JS; the arrow buttons are an enhancement. The track is a labelled,
 * keyboard-scrollable region. Placeholder entries carry a visible amber badge
 * (they only ever reach here in development).
 */
export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".testi-card");
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="testi-carousel">
      <div
        ref={trackRef}
        className="testi-track"
        role="group"
        aria-label="Testimonials — scroll for more"
        tabIndex={0}
      >
        {items.map((t) => (
          <figure key={t.id} className="testi-card">
            {t.isPlaceholder ? (
              <span className="testi-badge" aria-label="Placeholder — not a real testimonial">
                PLACEHOLDER
              </span>
            ) : null}
            <Quote size={24} aria-hidden style={{ color: "var(--accent)" }} />
            <blockquote className="body-l" style={{ margin: 0 }}>
              {t.quote}
            </blockquote>
            <figcaption className="stack" style={{ gap: 2, marginTop: "var(--space-3)" }}>
              <span style={{ fontWeight: 600 }}>{t.name}</span>
              <span className="small muted">
                {t.role} · {t.org}
              </span>
              <span className="data small muted">
                {t.city} · {t.sport}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="testi-nav" aria-hidden={items.length <= 1}>
        <button type="button" className="testi-arrow" aria-label="Previous testimonials" onClick={() => scrollBy(-1)}>
          <ChevronLeft size={20} />
        </button>
        <button type="button" className="testi-arrow" aria-label="Next testimonials" onClick={() => scrollBy(1)}>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
