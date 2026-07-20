"use client";

import { useState } from "react";
import { Check } from "lucide-react";

/**
 * Connect waitlist — email + city. Posts to the shared reach-out endpoint with a
 * `waitlist` form id. Inline validation + success; keyboard + reduced-motion safe.
 */
export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErr("Enter a valid email address.");
      return;
    }
    setErr("");
    try {
      await fetch("/api/reach-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId: "waitlist", email, city }),
      });
    } catch {
      /* placeholder endpoint */
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="form-success" role="status">
        <span className="form-success-ic" aria-hidden>
          <Check size={22} />
        </span>
        <p className="body-l">You&apos;re on the list. We&apos;ll let you know the moment Connect opens in your city.</p>
      </div>
    );
  }

  return (
    <form className="waitlist-form" onSubmit={onSubmit} noValidate>
      <div className="reach-field">
        <label htmlFor="wl-email" className="small">
          Email <span className="req" aria-hidden>*</span>
        </label>
        <input
          id="wl-email"
          type="email"
          required
          className="reach-input"
          placeholder="you@email.com"
          value={email}
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? "wl-err" : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            if (err) setErr("");
          }}
        />
        {err ? (
          <span id="wl-err" className="reach-err" role="alert">
            {err}
          </span>
        ) : null}
      </div>
      <div className="reach-field">
        <label htmlFor="wl-city" className="small">
          City
        </label>
        <input id="wl-city" type="text" className="reach-input" placeholder="Bengaluru" value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary waitlist-submit">
        Join the waitlist
      </button>
    </form>
  );
}
