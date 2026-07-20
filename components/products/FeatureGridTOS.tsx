import {
  Globe,
  ClipboardList,
  IndianRupee,
  GitBranch,
  Activity,
  MessageCircle,
  Handshake,
  BarChart3,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Section, Tag, Reveal, RevealItem } from "@/components/primitives";

interface Feature {
  name: string;
  benefit: string;
  icon: LucideIcon;
}

const FEATURES: Feature[] = [
  {
    name: "Event website builder",
    benefit:
      "A branded, mobile-first tournament site with schedule, venue map, categories, rules, sponsors and FAQs. Live in minutes, on your domain or ours.",
    icon: Globe,
  },
  {
    name: "Registration management",
    benefit:
      "Individual and team modes, category selection, capacity limits, automatic waitlists when a category fills.",
    icon: ClipboardList,
  },
  {
    name: "Payment collection",
    benefit:
      "UPI, cards and net-banking via Razorpay. Instant PDF invoices, automatic status updates, and reminders for incomplete payments at 24h and 48h.",
    icon: IndianRupee,
  },
  {
    name: "Brackets & fixtures",
    benefit:
      "Draws and fixtures generated instantly from registrations. Courts, timeslots and referees assigned. Printable and digital schedules.",
    icon: GitBranch,
  },
  {
    name: "Live scoring",
    benefit: "Real-time, zero-touch results across every court and category.",
    icon: Activity,
  },
  {
    name: "Communication engine",
    benefit:
      "The full participant lifecycle on autopilot: confirmations, payment reminders, D-7 and D-1 nudges, match-morning alerts, results and a post-event thank-you — over email, WhatsApp and SMS.",
    icon: MessageCircle,
  },
  {
    name: "Sponsor toolkit",
    benefit:
      "Auto-generated, branded sponsor decks with audience and reach estimates, plus outreach sequences to relevant local brands.",
    icon: Handshake,
  },
  {
    name: "Analytics dashboard",
    benefit:
      "Registrations, revenue, traffic sources, conversion, category-wise signups and geographic spread — for you, and benchmarked across the RizzFitt network.",
    icon: BarChart3,
  },
  {
    name: "AI tournament consultant",
    benefit:
      "Ask it anything: one day or two? what fee for this city? what prize pool? It answers from comparable events across our data.",
    icon: Sparkles,
  },
];

/**
 * "Everything included" — 9 feature tiles (os). Each tile reveals its benefit
 * line on hover/tap/focus (CSS `.reveal-line`), with an icon micro-animation.
 * Tiles are focusable so the reveal is keyboard- and touch-operable; the full
 * benefit text is also exposed to assistive tech via `aria-label`.
 */
export function FeatureGridTOS() {
  return (
    <Section mode="os">
      <div className="stack" style={{ gap: "var(--space-3)", maxWidth: "48rem", marginBottom: "var(--space-7)" }}>
        <Tag>End to end</Tag>
        <h2 className="h1">One system, the whole event.</h2>
      </div>

      <Reveal className="feature-grid tos-features" stagger={0.05}>
        {FEATURES.map(({ name, benefit, icon: Icon }) => (
          <RevealItem as="div" key={name}>
            <article className="feature-tile" tabIndex={0} aria-label={`${name}. ${benefit}`}>
              <span className="feature-ic" aria-hidden>
                <Icon size={20} />
              </span>
              <h3 className="h3" style={{ marginTop: "var(--space-3)", fontSize: "1.125rem" }}>
                {name}
              </h3>
              <p className="reveal-line small muted" style={{ marginTop: "var(--space-2)" }}>
                {benefit}
              </p>
            </article>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
