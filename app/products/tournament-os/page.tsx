import type { Metadata } from "next";
import { Section, Tag, CTABand } from "@/components/primitives";
import { PricingTiers } from "@/components/products/PricingTiers";
import { TOSHero } from "@/components/products/TOSHero";
import { BeforeAfter } from "@/components/products/BeforeAfter";
import { ScoreboardMoat } from "@/components/products/ScoreboardMoat";
import { FeatureGridTOS } from "@/components/products/FeatureGridTOS";
import { SetupTimeline } from "@/components/products/SetupTimeline";
import { ProofRow } from "@/components/products/ProofRow";
import { MiniFAQ } from "@/components/MiniFAQ";

export const metadata: Metadata = {
  title: "Tournament OS — run your entire tournament from one dashboard",
  description:
    "Website, registrations, payments, brackets, live scoring and communication — branded, automated, and live the same day you brief us. Live scoring runs itself.",
};

/**
 * Tournament OS — the flagship product page (os / dark throughout). Assembled
 * from product section components. One 3D scene (the hero scoreboard); zero
 * pinned sections (the timeline + bracket use scrubbed / in-view animation, not
 * pinning). Reduced-motion + mobile-3D fallbacks handled per component.
 */
export default function TournamentOSPage() {
  return (
    <>
      <TOSHero />

      {/* The problem */}
      <Section mode="os">
        <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "52rem" }}>
          <Tag>The old way</Tag>
          <h2 className="h1">Twelve tools. Zero of them talking.</h2>
          <p className="body-l muted">
            Most tournaments are run on a patchwork — a Google Form for
            registrations, a spreadsheet for payments, a WhatsApp group for
            updates, paper sheets for scoring, a designer for the poster, and
            someone&apos;s cousin to build a website. Nothing connects. Organisers
            spend the event firefighting instead of running it. Players get
            confused timings and slow results.
          </p>
        </div>
      </Section>

      <BeforeAfter />
      <ScoreboardMoat />
      <FeatureGridTOS />
      <SetupTimeline />

      {/* Who it's for */}
      <Section mode="os">
        <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "52rem" }}>
          <Tag>Built for</Tag>
          <h2 className="h1">From a local open to a national league.</h2>
          <div className="cluster" style={{ gap: "var(--space-3)" }}>
            {[
              "Pickleball tournaments",
              "Badminton championships",
              "Leagues & seasons",
              "Corporate events",
              "Academy & club tournaments",
              "Multi-city circuits",
              "Cricket & football tournaments",
            ].map((c) => (
              <span key={c} className="pill">
                {c}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <PricingTiers />

      <ProofRow />
      <MiniFAQ group="tournament-os" />
      <Section mode="os">
        <CTABand
          title="Your next tournament, on autopilot."
          primary={{ label: "Book a demo", href: "/book-a-demo" }}
        />
      </Section>
    </>
  );
}
