import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  /** Optional leading icon (e.g. a Lucide icon element). */
  iconLeft?: ReactNode;
  /** Optional trailing icon. */
  iconRight?: ReactNode;
  className?: string;
}

type AnchorProps = BaseProps & {
  /** When provided, renders a Next.js <Link>. */
  href: string;
  /** Open in a new tab (adds rel=noopener). */
  external?: boolean;
};

type NativeButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

export type ButtonProps = AnchorProps | NativeButtonProps;

/**
 * Primary / ghost button. Primary = orange fill (the one bold action); ghost =
 * 1px inset ring that turns orange on hover. Lift-on-hover is CSS-driven and
 * automatically disabled under `prefers-reduced-motion` (transition vars → 0).
 * Renders a Next <Link> when `href` is set, otherwise a real <button>.
 */
export function Button(props: ButtonProps) {
  const { children, variant = "primary", iconLeft, iconRight, className } = props;
  const classes = cn(
    "btn",
    variant === "primary" ? "btn-primary" : "btn-ghost",
    className,
  );

  const content = (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, external } = props;
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </Link>
    );
  }

  const { variant: _v, iconLeft: _l, iconRight: _r, className: _c, children: _ch, ...rest } =
    props as NativeButtonProps;
  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
