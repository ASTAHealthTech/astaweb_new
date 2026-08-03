"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const inputId = "newsletter-email";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMessage(data.error || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p aria-live="polite" className="text-[0.74rem] text-brand-400/80">
        Subscribed. We'll be in touch with updates.
      </p>
    );
  }

  return (
    <div>
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
        className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-bg/50 px-3 text-[0.78rem] text-fg outline-none placeholder:text-fg-subtle transition focus:ring-2 focus:ring-accent/30 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-frost dark:placeholder:text-white/22 dark:focus:border-brand-400/40 dark:focus:bg-white/[0.06]"
      />
      <span id={`${inputId}-hint`} className="sr-only">
        Enter your work email to subscribe to ASTA updates.
      </span>
      <button
        type="submit"
        disabled={status === "submitting"}
        aria-label="Subscribe to ASTA updates"
        className="h-9 rounded-lg bg-accent px-3.5 text-[0.78rem] font-semibold text-white transition hover:bg-accent/90 active:scale-95 disabled:opacity-50"
      >
        {status === "submitting" ? "..." : "→"}
      </button>
    </form>
    {status === "error" && (
      <p className="mt-2 text-[0.74rem] text-red-500">{errorMessage}</p>
    )}
    </div>
  );
}
