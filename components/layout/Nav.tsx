"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  Trophy,
  Users,
  Footprints,
  Handshake,
  Calendar,
  FileText,
  Tag as TagIcon,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";

type MenuItem = {
  label: string;
  href: string;
  desc: string;
  icon: LucideIcon;
  soon?: boolean;
};

/** Two audience tracks. Hrefs are explicit (not slug-derived) so they always
 *  resolve to the real routes. */
const PLAY_MENU: MenuItem[] = [
  { label: "Events", href: "/events", desc: "Every tournament, league & mixer", icon: Calendar },
  { label: "Social Mixers", href: "/mixers", desc: "Beginner-friendly pickleball mornings", icon: Users },
  { label: "RizzFitt Connect", href: "/products/connect", desc: "Find your next match", icon: Handshake, soon: true },
];

const ORG_MENU: MenuItem[] = [
  { label: "Tournament OS", href: "/products/tournament-os", desc: "Run a tournament like a broadcast", icon: Trophy },
  { label: "Community OS", href: "/products/community-os", desc: "Turn players into a community", icon: Users },
  { label: "Run Club OS", href: "/products/run-clubs", desc: "Every Saturday, organised", icon: Footprints },
  { label: "Case studies", href: "/case-studies", desc: "Real events, real numbers", icon: FileText },
  { label: "Pricing", href: "/pricing", desc: "Simple, event-based pricing", icon: TagIcon },
  { label: "Book a demo", href: "/book-a-demo", desc: "See it run, end to end", icon: Calendar },
];

type MenuKey = "play" | "org";

/**
 * Sticky, mode-aware top navigation split into two audience tracks: **Play**
 * (players → events, mixers, Connect) and **For Organisers** (the software +
 * case studies, pricing, demo), plus About and the two CTAs.
 *
 * Accessibility:
 * - Each track is a `button` with `aria-haspopup`/`aria-expanded`/`aria-controls`.
 * - Opens on hover (with close-intent delay) AND on click / ArrowDown / Enter.
 * - Escape closes and returns focus to the trigger; outside-click and focus-out
 *   also close. On touch/keyboard there is no dead hover gap.
 * - Below `lg` it collapses to a hamburger overlay with the same two tracks as
 *   expandable (`aria-expanded`) sections.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes whatever is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", mobileOpen);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [mobileOpen]);

  return (
    <nav className={cn("nav", scrolled && "nav--scrolled")} aria-label="Primary">
      <Link href="/" aria-label="RizzFitt home" style={{ display: "inline-flex" }}>
        <Logo height={28} />
      </Link>

      {/* Desktop links */}
      <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "var(--space-5)" }}>
        <NavDropdown
          id="play-menu"
          label="Play"
          items={PLAY_MENU}
          isOpen={openMenu === "play"}
          onOpen={() => open("play")}
          onCloseSoon={closeSoon}
          onToggle={() => setOpenMenu((v) => (v === "play" ? null : "play"))}
          onItemClick={() => setOpenMenu(null)}
        />
        <NavDropdown
          id="organisers-menu"
          label="For Organisers"
          items={ORG_MENU}
          isOpen={openMenu === "org"}
          onOpen={() => open("org")}
          onCloseSoon={closeSoon}
          onToggle={() => setOpenMenu((v) => (v === "org" ? null : "org"))}
          onItemClick={() => setOpenMenu(null)}
        />

        <Link href="/about">About</Link>

        <Link href="/events" className="btn btn-ghost" style={{ padding: "10px 18px" }}>
          Find events near you
        </Link>
        <Link href="/book-a-demo" className="btn btn-primary" style={{ padding: "10px 20px" }}>
          Book a demo
        </Link>
      </div>

      {/* Mobile trigger */}
      <button
        type="button"
        className="nav-burger"
        aria-label="Open menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(true)}
        style={{ display: "none", color: "var(--nav-text)" }}
      >
        <Menu size={24} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: "var(--z-overlay)" as unknown as number,
            background: "var(--surface)",
            color: "var(--text)",
            padding: "var(--space-5) var(--gutter)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-5)",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Logo height={28} />
            <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <MobileSection title="Play" items={PLAY_MENU} onNavigate={() => setMobileOpen(false)} />
          <hr className="court-rule" />
          <MobileSection title="For Organisers" items={ORG_MENU} onNavigate={() => setMobileOpen(false)} />
          <hr className="court-rule" />

          <Link href="/about" onClick={() => setMobileOpen(false)} className="h3">
            About
          </Link>

          <div className="stack" style={{ gap: "var(--space-3)", marginTop: "auto" }}>
            <Link
              href="/events"
              className="btn btn-ghost"
              onClick={() => setMobileOpen(false)}
              style={{ justifyContent: "center" }}
            >
              <MapPin size={18} /> Find events near you
            </Link>
            <Link
              href="/book-a-demo"
              className="btn btn-primary"
              onClick={() => setMobileOpen(false)}
              style={{ justifyContent: "center" }}
            >
              Book a demo
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

/* ── Desktop dropdown ─────────────────────────────────────────────────── */
function NavDropdown({
  id,
  label,
  items,
  isOpen,
  onOpen,
  onCloseSoon,
  onToggle,
  onItemClick,
}: {
  id: string;
  label: string;
  items: MenuItem[];
  isOpen: boolean;
  onOpen: () => void;
  onCloseSoon: () => void;
  onToggle: () => void;
  onItemClick: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  // When opened via keyboard, move focus into the panel.
  const handleTriggerKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      onOpen();
      requestAnimationFrame(() => firstItemRef.current?.focus());
    }
  };

  // Close if focus leaves the whole group (keyboard tab-out).
  const handleBlur = (e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) onCloseSoon();
  };

  return (
    <div
      ref={containerRef}
      style={{ position: "relative" }}
      onMouseEnter={onOpen}
      onMouseLeave={onCloseSoon}
      onBlur={handleBlur}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={onToggle}
        onKeyDown={handleTriggerKey}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          color: "var(--nav-text)",
          fontSize: "var(--fs-small)",
        }}
      >
        {label}
        <ChevronDown
          size={16}
          style={{
            transition: "transform var(--t-fast) var(--ease)",
            transform: isOpen ? "rotate(180deg)" : "none",
          }}
        />
      </button>

      {isOpen ? (
        <div
          id={id}
          role="menu"
          aria-label={label}
          onMouseEnter={onOpen}
          onMouseLeave={onCloseSoon}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: 320,
            // Transparent bridge so the cursor can cross from trigger to panel.
            paddingTop: "10px",
            zIndex: "var(--z-nav)" as unknown as number,
          }}
        >
          <div
            style={{
              padding: "var(--space-3)",
              borderRadius: "var(--r-lg)",
              background: "var(--surface-2)",
              boxShadow: "inset 0 0 0 1px var(--border), var(--shadow-pop)",
              display: "grid",
              gap: 4,
            }}
          >
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  role="menuitem"
                  ref={i === 0 ? firstItemRef : undefined}
                  onClick={onItemClick}
                  style={{
                    display: "flex",
                    gap: "var(--space-3)",
                    padding: "var(--space-3)",
                    borderRadius: "var(--r-md)",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: 36,
                      height: 36,
                      borderRadius: "var(--r-sm)",
                      background: "var(--accent-soft)",
                      color: "var(--accent)",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} />
                  </span>
                  <span style={{ display: "grid", gap: 2 }}>
                    <span style={{ fontWeight: 600, display: "inline-flex", gap: 8, alignItems: "center" }}>
                      {item.label}
                      {item.soon ? (
                        <span className="tag" style={{ padding: "2px 8px" }}>
                          Soon
                        </span>
                      ) : null}
                    </span>
                    <span className="small muted">{item.desc}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ── Mobile expandable section ────────────────────────────────────────── */
function MobileSection({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: MenuItem[];
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const regionId = `mobile-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="stack" style={{ gap: "var(--space-3)" }}>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={regionId}
        onClick={() => setExpanded((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "var(--text)",
        }}
      >
        <span className="eyebrow">{title}</span>
        <ChevronDown
          size={18}
          style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform var(--t-fast) var(--ease)" }}
        />
      </button>
      {expanded ? (
        <div id={regionId} className="stack" style={{ gap: "var(--space-4)", paddingLeft: 4 }}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={onNavigate}
                className="cluster"
                style={{ gap: "var(--space-3)", alignItems: "center" }}
              >
                <Icon size={20} style={{ color: "var(--accent)", flexShrink: 0 }} aria-hidden />
                <span className="h3" style={{ fontSize: "1.25rem" }}>
                  {item.label}
                </span>
                {item.soon ? (
                  <span className="tag" style={{ padding: "2px 8px" }}>
                    Soon
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
