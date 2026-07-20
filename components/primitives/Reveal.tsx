"use client";

import { useRef, type ComponentType, type ElementType, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { revealItem, staggerContainer, VIEWPORT } from "@/lib/motion";

/** A Framer motion component that accepts arbitrary motion + DOM props. */
type AnyMotion = ComponentType<Record<string, unknown> & { children?: ReactNode }>;

/**
 * Resolve a Framer motion component for either an intrinsic tag string
 * ("div", "h2"…) via the proxy, or a custom React component via the factory.
 */
function motionFor(as: ElementType): AnyMotion {
  const resolved =
    typeof as === "string"
      ? (motion as unknown as Record<string, unknown>)[as]
      : motion(as);
  return resolved as AnyMotion;
}

interface RevealProps {
  children: ReactNode;
  /** Element to render the container as. Defaults to `div`. */
  as?: ElementType;
  /** Seconds between staggered children (design system: 0.06–0.09). */
  stagger?: number;
  /** Fraction of the element in view before triggering (default 0.15). */
  amount?: number;
  /** Animate only once (default true). */
  once?: boolean;
  className?: string;
}

interface RevealItemProps {
  children: ReactNode;
  as?: ElementType;
  /** Travel distance in px (default 16). */
  y?: number;
  className?: string;
}

/**
 * In-view stagger container (Framer Motion). Put one or more `<Reveal.Item>`s
 * inside; they fade + rise in sequence when the group scrolls ~15% into view.
 * For a single block reveal, wrap one `<Reveal.Item>` in a `<Reveal>`.
 *
 * Implementation note: this drives `animate` off the `useInView` hook rather
 * than the declarative `whileInView` prop. `whileInView` proved unreliable here
 * (its IntersectionObserver can get torn down under React Strict Mode and never
 * re-fire on scroll); the hook + `animate` propagation is robust.
 *
 * Reduced motion: stagger + y-travel collapse to an instant opacity change
 * (handled by the variant factories), so nothing slides.
 *
 * @example
 * <Reveal stagger={0.08}>
 *   <Reveal.Item><h2 className="h2">Headline</h2></Reveal.Item>
 *   <Reveal.Item><p className="muted">Subhead</p></Reveal.Item>
 * </Reveal>
 */
export function Reveal({
  children,
  as = "div",
  stagger = 0.07,
  amount = VIEWPORT.amount,
  once = true,
  className,
}: RevealProps) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, amount });
  const MotionTag = motionFor(as);

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={staggerContainer(stagger, reduced)}
    >
      {children}
    </MotionTag>
  );
}

/**
 * A single revealed element. Inherits the stagger timing from its `<Reveal>`.
 *
 * Exported both standalone (`RevealItem`) and as `Reveal.Item`. Prefer the
 * standalone import in Server Components — static properties on a "use client"
 * component (`Reveal.Item`) don't cross the RSC boundary and resolve to
 * `undefined` there.
 */
export function RevealItem({ children, as = "div", y = 16, className }: RevealItemProps) {
  const reduced = useReducedMotion() ?? false;
  const MotionTag = motionFor(as);

  return (
    <MotionTag className={className} variants={revealItem(y, reduced)}>
      {children}
    </MotionTag>
  );
}

Reveal.Item = RevealItem;
