import type { Metadata } from "next";
import {
  CalendarDays,
  UserCheck,
  Gauge,
  Route,
  UserPlus,
  Users,
  MessageCircle,
  Flame,
  BarChart3,
  Repeat,
} from "lucide-react";
import { Section, Tag, CTABand } from "@/components/primitives";
import { RunClubHero } from "@/components/products/RunClubHero";
import { FeatureRevealGrid, type RevealFeature } from "@/components/products/FeatureRevealGrid";
import { QuoteBand } from "@/components/products/QuoteBand";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { MiniFAQ } from "@/components/MiniFAQ";

export const metadata: Metadata = {
  title: "Run Club OS — the all-in-one platform for run clubs",
  description:
    "Less spreadsheet wrangling, more running together. Registrations, pace groups, routes, attendance and perks — handled.",
};

// Run Clubs is a solution page on the Community OS engine — same components,
// run-club framing. Spec lists 11 features under "Everything a run club needs".
// Run Club OS emphasis: pace groups, routes and weekly cadence — the tooling a
// running crew needs. (Memberships/segmentation live on Community OS.)
const FEATURES: RevealFeature[] = [
  { name: "Pace-group allocation", benefit: "Sort runners into pace groups automatically, run after run — everyone runs with their speed.", icon: Gauge },
  { name: "Route management & maps", benefit: "Build a route library with distance, elevation and meeting points; share the week's route in a tap.", icon: Route },
  { name: "Weekly run registrations", benefit: "Members RSVP for specific runs; capacity and waitlists handled.", icon: CalendarDays },
  { name: "New-runner onboarding", benefit: "Welcome first-timers with where to be, what to bring, and which pace group is theirs.", icon: UserPlus },
  { name: "Streaks & leaderboards", benefit: "Reward the regulars — streaks and friendly leaderboards keep runners coming back.", icon: Flame },
  { name: "Attendance tracking", benefit: "Who showed, how often, and who's drifting — logged automatically.", icon: UserCheck },
  { name: "Recurring-run automation", benefit: "Set the weekly cadence once; invites and reminders fire on their own.", icon: Repeat },
  { name: "WhatsApp & email comms", benefit: "Reach the whole club without copy-pasting into a group chat.", icon: MessageCircle },
  { name: "Pacer & volunteer management", benefit: "Recruit pacers and volunteers, assign roles, confirm without the chase.", icon: Users },
  { name: "Pace & attendance analytics", benefit: "Attendance, pace trends and engagement at a glance.", icon: BarChart3 },
];

/**
 * Run Club OS — a solution page on the Community OS engine (os / dark). Route-map
 * hero with pace-group lanes, the run-club feature grid, a pull-quote, and CTA.
 */
export default function RunClubsPage() {
  return (
    <>
      <RunClubHero />

      {/* Why run clubs */}
      <Section mode="os">
        <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "52rem" }}>
          <Tag>The moment</Tag>
          <h2 className="h1">Run clubs are booming. Managing them isn&apos;t.</h2>
          <p className="body-l muted">
            Run clubs have exploded — and most are still run on a WhatsApp group
            and a founder&apos;s goodwill. Weekly RSVPs, pace groups, new-runner
            onboarding, routes, partner perks — it adds up fast. Run Club OS gives
            you the infrastructure of a serious organisation with the warmth of a
            weekend crew.
          </p>
        </div>
      </Section>

      <FeatureRevealGrid id="features" eyebrow="Everything a run club needs" headline="From RSVP to recap." features={FEATURES} />
      <QuoteBand quote="Spend less time managing spreadsheets. Spend more time building community." />
      <Testimonials tag="run-club-os" mode="os" eyebrow="From run-club organisers" heading="Clubs that show up, week after week." />
      <MiniFAQ group="run-club-os" />
      <Section mode="os">
        <CTABand title="Start your run club, properly." primary={{ label: "Book a demo", href: "/book-a-demo" }} />
      </Section>
    </>
  );
}
