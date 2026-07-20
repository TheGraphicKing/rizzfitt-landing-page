import type { Metadata } from "next";
import Link from "next/link";
import { Section, Tag, CourtRule } from "@/components/primitives";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PageMode } from "@/components/layout/PageMode";
import { AudienceField } from "@/components/illustrations/AudienceField";
import { FAQ_GROUPS } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ — everything, answered",
  description: "Answers on RizzFitt, Tournament OS, Community & Run Club OS, events and mixers, and partnerships.",
};

export default function FAQPage() {
  return (
    <>
      <PageMode mode="live" />

      <Section mode="live">
        <div className="illus-grid">
          <div className="stack" style={{ gap: "var(--space-4)" }}>
            <Tag>FAQ</Tag>
            <h1 className="display-l" style={{ margin: 0 }}>
              Everything, answered.
            </h1>
            <p className="body-l muted">
              The questions we hear most — about the product, our events, and
              partnering with us. Can&apos;t find it? Just ask on{" "}
              <Link href="/contact" style={{ color: "var(--accent)" }}>
                contact
              </Link>
              .
            </p>
          </div>
          <AudienceField caption="Hover the room — we've answered for everyone in it." />
        </div>
      </Section>

      {FAQ_GROUPS.map((group, i) => (
        <Section mode="live" key={group.id} id={group.id}>
          <div className="faq-group-grid">
            <div className="faq-group-head">
              <span className="eyebrow">{group.title}</span>
              <Link href={group.cta.href} className="btn btn-primary" style={{ marginTop: "var(--space-4)" }}>
                {group.cta.label}
              </Link>
            </div>
            <div className="faq-group-body">
              <FAQAccordion items={group.items} defaultOpen={i === 0 ? 0 : null} />
            </div>
          </div>
          {i < FAQ_GROUPS.length - 1 ? <CourtRule style={{ marginTop: "var(--space-8)" }} /> : null}
        </Section>
      ))}
    </>
  );
}
