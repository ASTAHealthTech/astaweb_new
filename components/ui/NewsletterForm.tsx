"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [email, setEmail] = useState("");
  const inputId = "newsletter-email";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("success");
  }

  if (status === "success") {
    return (
      <p aria-live="polite" className="text-[0.74rem] text-emerald-400/80">
        Subscribed. We'll be in touch with updates.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <input
        id={inputId}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@hospital.org"
        autoComplete="email"
        inputMode="email"
        aria-describedby={`${inputId}-hint`}
        className="h-9 min-w-0 flex-1 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 text-[0.78rem] text-frost outline-none placeholder:text-white/22 transition focus:border-brand-400/40 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(79,107,255,0.08)]"
      />
      <span id={`${inputId}-hint`} className="sr-only">
        Enter your work email to subscribe to ASTA updates.
      </span>
      <button
        type="submit"
        aria-label="Subscribe to ASTA updates"
        className="h-9 rounded-lg bg-brand-500/70 px-3.5 text-[0.78rem] font-semibold text-white/90 transition hover:bg-brand-500/90 active:scale-95"
      >
        →
      </button>
    </form>
  );
}
