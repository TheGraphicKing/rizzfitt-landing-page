import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import { Logo } from "./Logo";
import { NewsletterStrip } from "./NewsletterStrip";
import { BrandBadge } from "@/components/BrandBadge";
import { CONTACT } from "@/lib/contact";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Products",
    links: [
      { label: "Tournament OS", href: "/products/tournament-os" },
      { label: "Community OS", href: "/products/community-os" },
      { label: "Run Club OS", href: "/products/run-clubs" },
      { label: "RizzFitt Connect", href: "/products/connect" },
    ],
  },
  {
    title: "Events",
    links: [
      { label: "All events", href: "/events" },
      { label: "Social mixers", href: "/community" },
      { label: "List your tournament", href: "/list-your-tournament" },
      { label: "Case studies", href: "/case-studies" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Social mixers", href: "/community" },
      { label: "Run clubs", href: "/products/run-clubs" },
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Partners",
    links: [
      { label: "Partner with us", href: "/partner-with-us" },
      { label: "Sponsor an event", href: "/partner-with-us" },
      { label: "Become a venue", href: "/partner-with-us" },
      { label: "Creators", href: "/partner-with-us" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

/**
 * Site footer — always dark (`data-mode="os"`). Newsletter strip, six link
 * columns, association badges, socials, and the legal row.
 */
export function Footer() {
  return (
    <footer className="footer" data-mode="os">
      <div className="container">
        <NewsletterStrip />

        <hr className="court-rule" style={{ marginBlock: "var(--space-8)" }} />

        <div className="footer-grid">
          <div className="stack" style={{ gap: "var(--space-4)" }}>
            <Logo height={30} />
            <p className="muted small" style={{ maxWidth: "26ch" }}>
              The operating system for sports communities and events.
            </p>
            <div className="cluster" style={{ gap: "var(--space-3)" }}>
              <BrandBadge name="TNPA" />
              <BrandBadge name="Indian Pickleball Association" />
            </div>
          </div>

          <div className="footer-cols">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title} className="stack" style={{ gap: "var(--space-3)" }}>
                <span className="eyebrow">{col.title}</span>
                {col.links.map((l) => (
                  <Link key={l.label + l.href} href={l.href} className="small muted">
                    {l.label}
                  </Link>
                ))}
              </nav>
            ))}
          </div>
        </div>

        <hr className="court-rule" style={{ marginBlock: "var(--space-8)" }} />

        <div className="footer-legal">
          <span className="data small muted">© 2026 RizzFitt · Built for sport. Made in India.</span>
          <div className="cluster" style={{ gap: "var(--space-4)" }}>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="muted">
              <Instagram size={18} />
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="muted">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${CONTACT.email}`} className="small muted">
              {CONTACT.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
