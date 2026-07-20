"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Users, CalendarCheck, MessageCircle, TrendingUp } from "lucide-react";
import { Section, Tag, Button } from "@/components/primitives";
import { EASE } from "@/lib/motion";

/** Mock dashboard widgets that "assemble" into place on load. */
const WIDGETS = [
  { icon: Users, label: "Members", value: "1,284", span: 1 },
  { icon: CalendarCheck, label: "This week's attendance", value: "92%", span: 1 },
  { icon: MessageCircle, label: "Comms sent", value: "3,410", span: 1 },
  { icon: TrendingUp, label: "Retention", value: "+38%", span: 1 },
];

/**
 * Community OS hero (os). The visual is a dashboard that assembles itself —
 * widgets pop into place with a staggered spring on load. Reduced motion:
 * widgets appear in place with no transform.
 */
export function CommunityHero() {
  const reduced = useReducedMotion() ?? false;

  return (
    <Section mode="os" className="tos-hero">
      <div className="tos-hero-grid">
        <div className="stack" style={{ gap: "var(--space-5)", maxWidth: "32rem" }}>
          <Tag>Community OS</Tag>
          <h1 className="display-l" style={{ margin: 0 }}>
            Build communities that actually show up.
          </h1>
          <p className="body-l muted">
            Members, events, attendance, payments and communication — one place
            to run any sports community, and the tools to keep it growing.
          </p>
          <div className="cluster">
            <Button href="/book-a-demo" variant="primary">
              Book a demo
            </Button>
            <Button href="#features" variant="ghost">
              See features
            </Button>
          </div>
        </div>

        {/* Self-assembling dashboard */}
        <div className="dash" aria-label="A community dashboard assembling itself">
          <motion.div
            className="dash-grid"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduced ? 0 : 0.1, delayChildren: 0.15 } },
            }}
          >
            {WIDGETS.map(({ icon: Icon, label, value }) => (
              <motion.div
                key={label}
                className="dash-widget"
                variants={{
                  hidden: { opacity: 0, scale: reduced ? 1 : 0.85, y: reduced ? 0 : 12 },
                  show: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: reduced
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 24 },
                  },
                }}
              >
                <span className="dash-ic" aria-hidden>
                  <Icon size={18} />
                </span>
                <span className="data dash-value">{value}</span>
                <span className="small muted">{label}</span>
              </motion.div>
            ))}
            <motion.div
              className="dash-widget dash-wide"
              variants={{
                hidden: { opacity: 0, scale: reduced ? 1 : 0.9 },
                show: {
                  opacity: 1,
                  scale: 1,
                  transition: reduced ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 26 },
                },
              }}
            >
              <span className="eyebrow">Upcoming</span>
              <div className="cluster" style={{ justifyContent: "space-between", marginTop: 8 }}>
                <span className="small">Saturday morning run</span>
                <span className="status-pill status-upcoming">RSVP open</span>
              </div>
              <div className="cluster" style={{ justifyContent: "space-between", marginTop: 8 }}>
                <span className="small">Members night mixer</span>
                <span className="status-pill status-upcoming">Reminders set</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
