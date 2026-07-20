import type { Metadata } from "next";
import { Section, Tag } from "@/components/primitives";
import { ReachOutForm } from "@/components/forms/ReachOutForm";
import { getForm } from "@/lib/forms";

export const metadata: Metadata = {
  title: "List your tournament",
  description: "Get the full RizzFitt stack behind your event — website, registrations, payments, scoring and comms.",
};

export default function ListYourTournamentPage() {
  return (
    <Section mode="os">
      <div className="stack" style={{ gap: "var(--space-3)", maxWidth: "48rem", marginBottom: "var(--space-6)" }}>
        <Tag>List your tournament</Tag>
        <h1 className="display-l" style={{ margin: 0 }}>
          Your event, the whole stack.
        </h1>
      </div>
      <div style={{ maxWidth: "48rem" }}>
        <ReachOutForm config={getForm("quote")} />
      </div>
    </Section>
  );
}
