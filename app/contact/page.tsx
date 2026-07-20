import type { Metadata } from "next";
import {
  Trophy,
  Users,
  Handshake,
  Gift,
  MapPin,
  Video,
  FileText,
  Newspaper,
  Briefcase,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { Section, Tag } from "@/components/primitives";
import { FormLauncher } from "@/components/forms/FormLauncher";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CONTACT } from "@/lib/contact";
import type { FormId } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Contact — tell us what you're here for",
  description: "Pick a path and you'll reach the right person — usually within one business day.",
};

const INTENTS: { icon: LucideIcon; label: string; sub: string; form: FormId }[] = [
  { icon: Trophy, label: "Run a tournament", sub: "Tournament OS demo", form: "tournament-demo" },
  { icon: Users, label: "Manage a community / run club", sub: "Community OS demo", form: "community-demo" },
  { icon: Handshake, label: "Sponsor an event", sub: "Sponsorship", form: "sponsor" },
  { icon: Gift, label: "Brand collaboration / gifting", sub: "Collaboration", form: "brand-collab" },
  { icon: MapPin, label: "Become a venue partner", sub: "Venues", form: "venue" },
  { icon: Video, label: "Creator / influencer", sub: "Creators", form: "creator" },
  { icon: FileText, label: "List your tournament", sub: "Get a quote", form: "quote" },
  { icon: Newspaper, label: "Press & media", sub: "Press", form: "press" },
  { icon: Briefcase, label: "Careers", sub: "Join the team", form: "careers" },
  { icon: MessageCircle, label: "Something else", sub: "General enquiry", form: "general" },
];

export default function ContactPage() {
  return (
    <>
      <Section mode="os">
        <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "48rem", marginBottom: "var(--space-8)" }}>
          <Tag>Let&apos;s talk</Tag>
          <h1 className="display-l" style={{ margin: 0 }}>
            Tell us what you&apos;re here for.
          </h1>
          <p className="body-l muted">
            Pick a path and you&apos;ll reach the right person — usually within one
            business day.
          </p>
        </div>

        <div className="intent-grid">
          {INTENTS.map(({ icon: Icon, label, sub, form }) => (
            <FormLauncher key={form + label} formId={form} className="intent-card">
              <span className="intent-ic" aria-hidden>
                <Icon size={20} />
              </span>
              <span className="h3" style={{ fontSize: "1.125rem" }}>
                {label}
              </span>
              <span className="small muted">{sub}</span>
            </FormLauncher>
          ))}
        </div>
      </Section>

      {/* Direct lines */}
      <Section mode="os">
        <div className="direct-grid">
          <div className="stack" style={{ gap: "var(--space-3)" }}>
            <Tag>Direct lines</Tag>
            <h2 className="h2" style={{ margin: 0 }}>
              Or reach us directly.
            </h2>
            <p className="muted small">{CONTACT.location}.</p>
          </div>
          <div className="stack" style={{ gap: "var(--space-3)" }}>
            <a className="pill" href={`mailto:${CONTACT.email}`}>
              General · <span className="data">{CONTACT.email}</span>
            </a>
            <a className="pill" href={`mailto:${CONTACT.partnersEmail}`}>
              Partnerships · <span className="data">{CONTACT.partnersEmail}</span>
            </a>
            <a className="pill" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
              WhatsApp · <span className="data">{CONTACT.whatsappNumber}</span>
            </a>
            <div className="cluster">
              <a className="pill" href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a className="pill" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Quick FAQ */}
      <Section mode="os">
        <div className="stack" style={{ gap: "var(--space-3)", marginBottom: "var(--space-5)" }}>
          <Tag>Quick FAQ</Tag>
          <h2 className="h1">Before you write.</h2>
        </div>
        <div style={{ maxWidth: "52rem" }}>
          <FAQAccordion
            items={[
              { q: "How soon will you reply?", a: "Usually within one business day." },
              { q: "Do you work outside your current cities?", a: "Yes — tell us where you are and we'll figure it out." },
              { q: "Can I just ask a question?", a: "Of course — use the General enquiry option above." },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
