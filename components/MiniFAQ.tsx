import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, Tag } from "@/components/primitives";
import { FAQAccordion } from "./FAQAccordion";
import { getFaqGroup, type FaqGroupId } from "@/data/faq";
import type { Mode } from "@/lib/types";

/**
 * Per-page mini-FAQ — pulls a group from the master FAQ (data/faq.ts), shows a
 * few questions, and ends with that group's CTA. Inherits the page mode unless
 * one is passed. Links to the full /faq.
 */
export function MiniFAQ({ group, limit = 4, mode }: { group: FaqGroupId; limit?: number; mode?: Mode }) {
  const g = getFaqGroup(group);
  if (!g) return null;
  return (
    <Section mode={mode}>
      <div className="cluster" style={{ justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--space-6)" }}>
        <div className="stack" style={{ gap: "var(--space-3)" }}>
          <Tag>FAQ</Tag>
          <h2 className="h1">Questions, answered.</h2>
        </div>
        <Link href="/faq" className="small" style={{ color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: 6 }}>
          All FAQs <ArrowRight size={14} />
        </Link>
      </div>
      <div style={{ maxWidth: "52rem" }}>
        <FAQAccordion items={g.items.slice(0, limit)} />
      </div>
      <div style={{ marginTop: "var(--space-6)" }}>
        <Link href={g.cta.href} className="btn btn-primary">
          {g.cta.label}
        </Link>
      </div>
    </Section>
  );
}
