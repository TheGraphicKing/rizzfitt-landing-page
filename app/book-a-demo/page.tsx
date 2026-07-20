import type { Metadata } from "next";
import Link from "next/link";
import { Section, Tag } from "@/components/primitives";
import { ReachOutForm } from "@/components/forms/ReachOutForm";
import { getForm } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Book a demo",
  description: "See how RizzFitt runs a tournament end to end. Tell us a little and we'll set up a walkthrough.",
};

export default function BookADemoPage() {
  return (
    <Section mode="os">
      <div className="stack" style={{ gap: "var(--space-3)", maxWidth: "48rem", marginBottom: "var(--space-6)" }}>
        <Tag>Book a demo</Tag>
        <h1 className="display-l" style={{ margin: 0 }}>
          See it run, end to end.
        </h1>
        <p className="muted">
          Running a community or club instead?{" "}
          <Link href="/contact" style={{ color: "var(--accent)" }}>
            Pick the right path on contact
          </Link>
          .
        </p>
      </div>
      <div style={{ maxWidth: "48rem" }}>
        <ReachOutForm config={getForm("tournament-demo")} />
      </div>
    </Section>
  );
}
