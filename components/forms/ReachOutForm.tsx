"use client";

import { useId, useState } from "react";
import { Check, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/primitives";
import { whatsappLink } from "@/lib/contact";
import type { FormConfig, FormField } from "@/lib/forms";

type Values = Record<string, string>;
type Errors = Record<string, string>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(config: FormConfig, values: Values): Errors {
  const errors: Errors = {};
  for (const f of config.fields) {
    const v = (values[f.name] ?? "").trim();
    if (f.required && !v) {
      errors[f.name] = "This field is required.";
    } else if (f.type === "email" && v && !EMAIL_RE.test(v)) {
      errors[f.name] = "Enter a valid email address.";
    }
  }
  return errors;
}

/**
 * The one reach-out form, driven by a `FormConfig`. Inline validation (required
 * + email), an accessible success state, and a WhatsApp shortcut. Fully
 * keyboard-operable; visible focus from the global token; no motion that isn't
 * reduced-motion safe (success swap is an instant opacity change in CSS).
 */
export function ReachOutForm({ config }: { config: FormConfig }) {
  const uid = useId();
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(config, values);
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Move focus to the first invalid field.
      const first = config.fields.find((f) => errs[f.name]);
      if (first) document.getElementById(`${uid}-${first.name}`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/reach-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId: config.id, ...values }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <span className="form-success-ic" aria-hidden>
          <Check size={22} />
        </span>
        <p className="body-l">{config.success}</p>
        {config.whatsapp ? (
          <a className="btn btn-ghost" href={whatsappLink(`Hi RizzFitt — re: ${config.title}`)} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={16} /> Or message us on WhatsApp
          </a>
        ) : null}
        <button
          type="button"
          className="small muted form-reset"
          onClick={() => {
            setValues({});
            setErrors({});
            setStatus("idle");
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="reach-form" onSubmit={onSubmit} noValidate>
      <p className="muted" style={{ marginBottom: "var(--space-5)" }}>
        {config.intro}
      </p>

      <div className="reach-fields">
        {config.fields.map((f) => (
          <Field key={f.name} field={f} uid={uid} value={values[f.name] ?? ""} error={errors[f.name]} onChange={set} />
        ))}
      </div>

      {status === "error" ? (
        <p className="form-error-banner" role="alert">
          Something went wrong sending that. Please try again, or message us on WhatsApp.
        </p>
      ) : null}

      <div className="cluster" style={{ marginTop: "var(--space-5)" }}>
        <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 size={16} className="spin" /> Sending…
            </>
          ) : (
            config.submitLabel
          )}
        </button>
        {config.whatsapp ? (
          <Button href={whatsappLink(`Hi RizzFitt — re: ${config.title}`)} variant="ghost" external iconLeft={<MessageCircle size={16} />}>
            WhatsApp instead
          </Button>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  field,
  uid,
  value,
  error,
  onChange,
}: {
  field: FormField;
  uid: string;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}) {
  const id = `${uid}-${field.name}`;
  const errId = `${id}-err`;
  const common = {
    id,
    name: field.name,
    value,
    "aria-required": field.required || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errId : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      onChange(field.name, e.target.value),
  };

  return (
    <div className={`reach-field${field.type === "textarea" ? " reach-field--wide" : ""}`}>
      <label htmlFor={id} className="small">
        {field.label}
        {field.required ? <span className="req" aria-hidden> *</span> : null}
      </label>
      {field.type === "textarea" ? (
        <textarea {...common} rows={4} placeholder={field.placeholder} className="reach-input" />
      ) : field.type === "select" ? (
        <select {...common} className="reach-input">
          <option value="">Select…</option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input {...common} type={field.type} placeholder={field.placeholder} className="reach-input" />
      )}
      {error ? (
        <span id={errId} className="reach-err" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
