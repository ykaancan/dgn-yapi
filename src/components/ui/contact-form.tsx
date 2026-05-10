"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [status, setStatus] = useState<Status>("idle");
  const mountedAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    const data = new FormData(form);
    const payload = {
      ...Object.fromEntries(data.entries()),
      _ts: String(mountedAt.current),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div
        aria-hidden="true"
        className="absolute left-[-10000px] top-auto w-px h-px overflow-hidden"
      >
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="name" label={dict.contact.form.name} required />
        <Field name="phone" label={dict.contact.form.phone} type="tel" required />
      </div>
      <Field name="email" label={dict.contact.form.email} type="email" />
      <Field
        name="message"
        label={dict.contact.form.message}
        as="textarea"
        rows={5}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="px-7 py-3.5 bg-bronze text-bg font-medium rounded-full hover:bg-bronze-light transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? dict.contact.form.submitting : dict.contact.form.submit}
      </button>
      <p className="text-xs text-fg-muted leading-relaxed">
        {dict.contact.form.consent.split("{link}").map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 && (
              <Link
                href={`/${lang}/aydinlatma-metni`}
                className="text-bronze hover:underline"
              >
                {dict.contact.form.consentLink}
              </Link>
            )}
          </span>
        ))}
      </p>
      {status === "success" && (
        <p className="text-bronze text-sm">{dict.contact.form.success}</p>
      )}
      {status === "error" && (
        <p className="text-accent text-sm">{dict.contact.form.error}</p>
      )}
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  as = "input",
  rows,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
  required?: boolean;
}) {
  const className =
    "w-full bg-bg-soft border border-white/10 rounded-lg px-4 py-3 text-fg placeholder:text-fg-muted focus:outline-none focus:border-bronze transition-colors";
  return (
    <label className="block">
      <span className="text-xs tracking-wider text-fg-muted uppercase block mb-2">
        {label}
        {required && <span className="text-bronze ml-1">*</span>}
      </span>
      {as === "textarea" ? (
        <textarea name={name} rows={rows} required={required} className={className} />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          autoComplete="off"
          className={className}
        />
      )}
    </label>
  );
}
