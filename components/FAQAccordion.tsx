"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/data/faq";

/**
 * Accessible FAQ accordion. One item open at a time; the trigger is a real
 * button with `aria-expanded`, and the panel animates height via CSS (which is
 * reduced-motion safe — the transition vars collapse to 0). Reusable for the
 * /faq page and per-page mini-FAQs.
 */
export function FAQAccordion({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div className="faq-list">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div className="faq-item" key={it.q} aria-expanded={isOpen}>
            <button type="button" className="faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
              {it.q}
              <ChevronDown size={20} style={{ flexShrink: 0, transition: "transform var(--t)", transform: isOpen ? "rotate(180deg)" : "none" }} />
            </button>
            <div className="faq-a" style={{ maxHeight: isOpen ? 400 : 0 }}>
              <p className="muted" style={{ paddingBottom: "var(--space-5)" }}>
                {it.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
