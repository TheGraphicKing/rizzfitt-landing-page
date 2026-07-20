"use client";

import { useState } from "react";
import { Check } from "lucide-react";

/**
 * Footer newsletter strip. Posts to the shared reach-out endpoint with a
 * `newsletter` form id. Inline success state; keyboard + reduced-motion safe.
 */
export function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return;
    try {
      await fetch("/api/reach-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId: "newsletter", email }),
      });
    } catch {
      /* swallow — placeholder endpoint */
    }
    setDone(true);
  };

  return (
    <div className="newsletter-strip">
      <div className="stack" style={{ gap: "var(--space-2)" }}>
        <span className="eyebrow">Stay in the loop</span>
        <h2 className="h2" style={{ margin: 0 }}>
          New events, near you.
        </h2>
        <p className="muted small">Occasional updates on tournaments and mixers — no spam.</p>
      </div>
      {done ? (
        <p className="newsletter-done" role="status">
          <Check size={18} /> You&apos;re on the list.
        </p>
      ) : (
        <form className="newsletter-form" onSubmit={onSubmit} noValidate>
          <label htmlFor="nl-email" className="sr-only">
            Email address
          </label>
          <input
            id="nl-email"
            type="email"
            required
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="reach-input"
          />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
