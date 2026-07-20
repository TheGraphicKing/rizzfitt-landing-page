import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, Tag } from "@/components/primitives";

const PLAIN = [
  "Pickleball clubs",
  "Cycling clubs",
  "Fitness communities",
  "College sports clubs",
  "Corporate sports groups",
];

/**
 * "Who it's for" — example communities (os). The Run clubs chip links through to
 * the Run Club OS solution page; the rest are categorical chips.
 */
export function CommunitiesChips() {
  return (
    <Section mode="os">
      <div className="stack" style={{ gap: "var(--space-5)", maxWidth: "52rem" }}>
        <Tag>Who it&apos;s for</Tag>
        <h2 className="h1">Any community that moves.</h2>
        <div className="cluster" style={{ gap: "var(--space-3)" }}>
          <Link href="/products/run-clubs" aria-label="Run clubs — see Run Club OS">
            <span className="tag" style={{ gap: 8 }}>
              Run clubs <ArrowRight size={14} />
            </span>
          </Link>
          {PLAIN.map((c) => (
            <span key={c} className="pill">
              {c}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
