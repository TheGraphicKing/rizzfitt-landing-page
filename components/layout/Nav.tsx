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
  type LucideIcon,
} from "lucide-react";
import { products } from "@/data";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";

/** Lucide icon lookup for product entries (design system PART 6.2). */
const PRODUCT_ICONS: Record<string, LucideIcon> = {
  Trophy,
  Users,
  Footprints,
  Handshake,
};

const PRIMARY_LINKS = [
  { label: "Events", href: "/events" },
  { label: "Community", href: "/community" },
  { label: "Case studies", href: "/case-studies" },
  { label: "About", href: "/about" },
] as const;

/**
 * Sticky, mode-aware top navigation.
 *
 * - Colors follow the page mode via `--nav-text` / `--surface`; gains a solid
 *   background + hairline once scrolled (`.nav--scrolled`).
 * - Products dropdown is keyboard-operable (button with `aria-expanded`, closes
 *   on Escape / outside click / blur).
 * - Below the `lg` breakpoint it collapses to a hamburger that opens a full
 *   overlay menu (Escape to close, body scroll locked while open).
 * - Visible focus rings come from the global `:focus-visible` token.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hover-intent: open immediately, close after a short delay so moving the
  // cursor from the trigger to the menu doesn't dismiss it.
  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductsOpen(true);
  };
  const closeMenuSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProductsOpen(false), 180);
  };

  // Solid background after a little scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the dropdown on outside click.
  useEffect(() => {
    if (!productsOpen) return;
    const onClick = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [productsOpen]);

  // Escape closes whatever is open; lock body scroll for the mobile overlay.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setProductsOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

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
      <div
        className="nav-links"
        style={{ display: "flex", alignItems: "center", gap: "var(--space-5)" }}
      >
        {/* Products dropdown */}
        <div
          ref={productsRef}
          style={{ position: "relative" }}
          onMouseEnter={openMenu}
          onMouseLeave={closeMenuSoon}
        >
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={productsOpen}
            aria-controls="products-menu"
            onClick={() => setProductsOpen((v) => !v)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              color: "var(--nav-text)",
              fontSize: "var(--fs-small)",
            }}
          >
            Products
            <ChevronDown
              size={16}
              style={{
                transition: "transform var(--t-fast) var(--ease)",
                transform: productsOpen ? "rotate(180deg)" : "none",
              }}
            />
          </button>

          {productsOpen ? (
            <div
              id="products-menu"
              role="menu"
              aria-label="Products"
              onMouseEnter={openMenu}
              onMouseLeave={closeMenuSoon}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: 320,
                // Transparent bridge so the cursor can travel from the trigger
                // into the panel without crossing a dead gap (which closed it).
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
              {products.map((p) => {
                const Icon = PRODUCT_ICONS[p.icon] ?? Trophy;
                const teaser = p.status === "teaser";
                return (
                  <Link
                    key={p.id}
                    href={teaser ? "/connect" : `/products/${p.slug}`}
                    role="menuitem"
                    onClick={() => setProductsOpen(false)}
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
                      <span
                        style={{
                          fontWeight: 600,
                          display: "inline-flex",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        {p.name}
                        {teaser ? (
                          <span className="tag" style={{ padding: "2px 8px" }}>
                            Soon
                          </span>
                        ) : null}
                      </span>
                      <span className="small muted">{p.tagline}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
            </div>
          ) : null}
        </div>

        {PRIMARY_LINKS.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}

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
            gap: "var(--space-6)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Logo height={28} />
            <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="stack" style={{ gap: "var(--space-4)" }}>
            <span className="eyebrow">Products</span>
            {products.map((p) => (
              <Link
                key={p.id}
                href={p.status === "teaser" ? "/connect" : `/products/${p.slug}`}
                onClick={() => setMobileOpen(false)}
                className="h3"
              >
                {p.name}
              </Link>
            ))}
          </div>

          <hr className="court-rule" />

          <div className="stack" style={{ gap: "var(--space-4)" }}>
            {PRIMARY_LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="h3">
                {l.label}
              </Link>
            ))}
          </div>

          <Link
            href="/book-a-demo"
            className="btn btn-primary"
            onClick={() => setMobileOpen(false)}
            style={{ justifyContent: "center" }}
          >
            Book a demo
          </Link>
        </div>
      ) : null}
    </nav>
  );
}
