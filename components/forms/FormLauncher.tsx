"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { getForm, type FormId } from "@/lib/forms";
import { ReachOutForm } from "./ReachOutForm";

interface FormLauncherProps {
  formId: FormId;
  /** Default-trigger label (ignored when `children` is provided). */
  label?: string;
  variant?: "primary" | "ghost";
  /** Custom trigger content — renders as a styled button with `className`. */
  children?: ReactNode;
  className?: string;
}

/**
 * Opens a reach-out form in an accessible modal dialog. Reused across the
 * contact hub, partner paths, and community collab CTAs. Escape + outside-click
 * close it; focus moves into the dialog and returns to the trigger on close;
 * body scroll locks while open.
 */
export function FormLauncher({ formId, label, variant = "primary", children, className }: FormLauncherProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const config = getForm(formId);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("lenis-stopped");
    // Focus the dialog heading region.
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("lenis-stopped");
      trigger?.focus();
    };
  }, [open]);

  const triggerClass = children
    ? className
    : cn("btn", variant === "primary" ? "btn-primary" : "btn-ghost", className);

  return (
    <>
      <button ref={triggerRef} type="button" className={triggerClass} onClick={() => setOpen(true)}>
        {children ?? label}
      </button>

      {open ? (
        <div className="form-modal" onClick={() => setOpen(false)}>
          <div
            ref={dialogRef}
            className="form-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-label={config.title}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="form-modal-head">
              <h2 className="h2" style={{ margin: 0 }}>
                {config.title}
              </h2>
              <button type="button" aria-label="Close" className="form-modal-close" onClick={() => setOpen(false)}>
                <X size={22} />
              </button>
            </div>
            <ReachOutForm config={config} />
          </div>
        </div>
      ) : null}
    </>
  );
}
