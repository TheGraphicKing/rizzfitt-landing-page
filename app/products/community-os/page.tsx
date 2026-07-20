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
import { MiniFAQ } from "@/components/MiniFAQ";

export const metadata: Metadata = {
  title: "Community OS — build communities that actually show up",
  description:
    "Members, events, attendance, payments and communication — one place to run any sports community, and the tools to keep it growing.",
};

const FEATURES: RevealFeature[] = [
  { name: "Member database", benefit: "One source of truth for everyone in your community, with profiles, tags and history.", icon: Users },
  { name: "Attendance tracking", benefit: "Who came, how often, who's slipping away — automatically.", icon: UserCheck },
  { name: "Event registrations & payments", benefit: "Recurring or one-off, free or paid, individual or group.", icon: Ticket },
  { name: "Announcements & comms", benefit: "Reach everyone on WhatsApp, email and SMS without copy-pasting.", icon: Megaphone },
  { name: "Recurring event automation", benefit: "Set a weekly/monthly cadence once; invites and reminders fire on their own.", icon: Repeat },
  { name: "Volunteer management", benefit: "Recruit, assign roles and confirm volunteers without the back-and-forth.", icon: HeartHandshake },
  { name: "Member segmentation", benefit: "Group by skill, location, activity or membership for targeted outreach.", icon: Layers },
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
      <CommunitiesChips />
      <EngagementStats />
      <MiniFAQ group="community-os" />
      <Section mode="os">
        <CTABand title="Give your community a home." primary={{ label: "Book a demo", href: "/book-a-demo" }} />
      </Section>
    </>
  );
}
