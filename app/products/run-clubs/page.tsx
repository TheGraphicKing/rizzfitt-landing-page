import type { Metadata } from "next";
import {
  CalendarDays,
  UserCheck,
  Gauge,
  Route,
  UserPlus,
  Users,
  MessageCircle,
  Gift,
  Handshake,
  BarChart3,
  Repeat,
} from "lucide-react";
import { Section, Tag, CTABand } from "@/components/primitives";
import { RunClubHero } from "@/components/products/RunClubHero";
import { FeatureRevealGrid, type RevealFeature } from "@/components/products/FeatureRevealGrid";
import { QuoteBand } from "@/components/products/QuoteBand";
import { MiniFAQ } from "@/components/MiniFAQ";

export const metadata: Metadata = {
  title: "Run Club OS — the all-in-one platform for run clubs",
  description:
    "Less spreadsheet wrangling, more running together. Registrations, pace groups, routes, attendance and perks — handled.",
};

// Run Clubs is a solution page on the Community OS engine — same components,
// run-club framing. Spec lists 11 features under "Everything a run club needs".
const FEATURES: RevealFeature[] = [
  { name: "Weekly run registrations", benefit: "Members RSVP for specific runs; capacity and waitlists handled.", icon: CalendarDays },
  { name: "Attendance tracking", benefit: "Who showed, how often, and who's drifting — logged automatically.", icon: UserCheck },
  { name: "Pace-group allocation", benefit: "Sort runners into pace groups automatically, run after run.", icon: Gauge },
  { name: "Route management", benefit: "Save, share and map routes with distance and meeting points.", icon: Route },
  { name: "New-runner onboarding", benefit: "Welcome first-timers with the info they need to show up confident.", icon: UserPlus },
  { name: "Volunteer & pacer management", benefit: "Recruit pacers and volunteers, assign roles, confirm without the chase.", icon: Users },
  { name: "WhatsApp & email comms", benefit: "Reach the whole club without copy-pasting into a group chat.", icon: MessageCircle },
  { name: "Partner discounts & perks", benefit: "Bring brand discounts and partner perks to your runners.", icon: Gift },
  { name: "Sponsor management", benefit: "Package your club's reach and manage sponsor relationships.", icon: Handshake },
  { name: "Member analytics", benefit: "Growth, attendance, pace trends and engagement at a glance.", icon: BarChart3 },
  { name: "Recurring-run automation", benefit: "Set the weekly cadence once; invites and reminders fire on their own.", icon: Repeat },
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
      <MiniFAQ group="community-os" />
      <Section mode="os">
        <CTABand title="Start your run club, properly." primary={{ label: "Book a demo", href: "/book-a-demo" }} />
      </Section>
    </>
  );
}
