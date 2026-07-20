import type { Metadata } from "next";
import {
  Users,
  UserCheck,
  Ticket,
  Megaphone,
  Repeat,
  HeartHandshake,
  Layers,
  Gift,
  BarChart3,
} from "lucide-react";
import { Section, Tag, CTABand } from "@/components/primitives";
import { CommunityHero } from "@/components/products/CommunityHero";
import { FeatureRevealGrid, type RevealFeature } from "@/components/products/FeatureRevealGrid";
import { CommunitiesChips } from "@/components/products/CommunitiesChips";
import { EngagementStats } from "@/components/products/EngagementStats";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { Collage } from "@/components/Collage";
import { communityGalleryItems } from "@/lib/gallery";
import { MiniFAQ } from "@/components/MiniFAQ";

export const metadata: Metadata = {
  title: "Community OS — build communities that actually show up",
  description:
    "Members, events, attendance, payments and communication — one place to run any sports community, and the tools to keep it growing.",
};

// Community OS emphasis: memberships, multi-community, segmentation — the
// membership-org toolkit. (Run-specific tooling lives on Run Club OS.)
const FEATURES: RevealFeature[] = [
  { name: "Memberships & tiers", benefit: "Paid or free, monthly or annual — with renewals, joining flows and member perks handled.", icon: Ticket },
  { name: "Multi-community management", benefit: "Run several communities from one account, each with its own members, branding and calendar.", icon: Layers },
  { name: "Member directory", benefit: "One source of truth for everyone, with profiles, roles, tags and full history.", icon: Users },
  { name: "Member segmentation", benefit: "Group by skill, location, tier or activity, then message just that segment.", icon: HeartHandshake },
  { name: "Attendance & drift alerts", benefit: "See who came, how often, and who's slipping away — and re-invite them before they lapse.", icon: UserCheck },
  { name: "Announcements & comms", benefit: "Reach everyone on WhatsApp, email and SMS without copy-pasting.", icon: Megaphone },
  { name: "Recurring event automation", benefit: "Set a weekly/monthly cadence once; invites and reminders fire on their own.", icon: Repeat },
  { name: "Partner offers & perks", benefit: "Bring sponsor discounts and partner perks to your members.", icon: Gift },
  { name: "Community analytics", benefit: "Growth, retention, attendance and engagement at a glance.", icon: BarChart3 },
];

/**
 * Community OS — product page (os / dark). Self-assembling dashboard hero,
 * feature grid, example-communities router (Run clubs → Run Club OS), the
 * engagement flywheel with an animated attendance graph + stat band, and CTA.
 */
export default function CommunityOSPage() {
  return (
    <>
      <CommunityHero />

      {/* The struggle */}
      <Section mode="os">
        <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "52rem" }}>
          <Tag>The struggle</Tag>
          <h2 className="h1">Passion isn&apos;t the problem. Logistics is.</h2>
          <p className="body-l muted">
            Whoever runs a community knows the grind — chasing RSVPs, re-sharing
            the same details, tracking who paid, who showed, who drifted away. The
            energy goes into admin instead of the people. Community OS takes the
            operations off your plate so the community can actually grow.
          </p>
        </div>
      </Section>

      <FeatureRevealGrid id="features" eyebrow="Manage everything" headline="From members to moments." features={FEATURES} />

      {/* Real community photography */}
      <Section mode="os">
        <div className="stack" style={{ gap: "var(--space-3)", maxWidth: "48rem", marginBottom: "var(--space-6)" }}>
          <Tag>Communities we power</Tag>
          <h2 className="h1" style={{ margin: 0 }}>
            Real rooms, real regulars.
          </h2>
          <p className="body-l muted">
            From our own Bangalore pickleball mixers to the clubs on RizzFitt — this
            is what &ldquo;showing up&rdquo; actually looks like.
          </p>
        </div>
        <Collage label="Photos from RizzFitt community mixers" items={communityGalleryItems()} />
      </Section>

      <CommunitiesChips />
      <EngagementStats />
      <Testimonials tag="community-os" mode="os" eyebrow="From community builders" heading="Communities that stuck around." />
      <MiniFAQ group="community-os" />
      <Section mode="os">
        <CTABand title="Give your community a home." primary={{ label: "Book a demo", href: "/book-a-demo" }} />
      </Section>
    </>
  );
}
