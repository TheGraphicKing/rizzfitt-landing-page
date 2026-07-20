import type { Metadata } from "next";
import { Section, Tag, CTABand } from "@/components/primitives";
import { PricingTiers } from "@/components/products/PricingTiers";
import { TOSHero } from "@/components/products/TOSHero";
import { BeforeAfter } from "@/components/products/BeforeAfter";
import { ScoreboardMoat } from "@/components/products/ScoreboardMoat";
import { FeatureGridTOS } from "@/components/products/FeatureGridTOS";
import { SetupTimeline } from "@/components/products/SetupTimeline";
import { ProofRow } from "@/components/products/ProofRow";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { ProductMedia } from "@/components/ProductMedia";
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

      {/* Live scoring — real product screenshot slot */}
      <Section mode="os">
        <div className="stack" style={{ gap: "var(--space-3)", maxWidth: "48rem", marginBottom: "var(--space-6)" }}>
          <Tag>Live scoring</Tag>
          <h2 className="h1" style={{ margin: 0 }}>
            A scoreboard your referees just watch.
          </h2>
        </div>
        {/* TODO(content): /public/product/live-scoring.png — a real live-scoring screenshot. */}
        <ProductMedia
          src="/product/live-scoring.png"
          alt="RizzFitt live scoring — a bracket updating in real time with a broadcast-style scoreboard"
          caption="Live scores and brackets update the moment a point is entered."
        />
      </Section>

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

      {/* Dashboard / analytics — real product screenshot slot */}
      <Section mode="os">
        <div className="stack" style={{ gap: "var(--space-3)", maxWidth: "48rem", marginBottom: "var(--space-6)" }}>
          <Tag>One dashboard</Tag>
          <h2 className="h1" style={{ margin: 0 }}>
            Registrations, payments and results in one view.
          </h2>
        </div>
        {/* TODO(content): /public/product/dashboard-analytics.png — a real organiser dashboard screenshot. */}
        <ProductMedia
          src="/product/dashboard-analytics.png"
          alt="RizzFitt organiser dashboard — registrations, payments and analytics at a glance"
          caption="The organiser dashboard: registrations, revenue and attendance at a glance."
        />
      </Section>

      <PricingTiers />

      <ProofRow />
      <Testimonials tag="tournament-os" mode="os" eyebrow="From organisers" heading="Run by the people who run events." />
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
