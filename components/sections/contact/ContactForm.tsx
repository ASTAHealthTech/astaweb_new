"use client";

import { useState, type FormEvent } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LedgerRow } from "@/components/ui/LedgerRow";
import { EvidenceChip } from "@/components/ui/Pill";
import { contactForm, contactInquiryTypes, type ContactInquiryType } from "@/content/contact";

const inputClass =
  "w-full rounded-card border border-hairline bg-surface px-4 py-3 font-body text-body text-ink placeholder:text-ink-3 transition-colors duration-200 hover:border-hairline-strong focus:border-ink focus:outline-none";

function Field({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`group ${className ?? ""}`}>
      <label
        htmlFor={htmlFor}
        className="mb-2 block font-body text-label text-ink-2 transition-colors duration-200 group-focus-within:text-ink"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

type Status = "idle" | "sending" | "success" | "error";

/**
 * — 03 Inquiry form. The page's single FEATURED card. Posts to
 * /api/contact with the exact payload the route validates. Focus is
 * expressed by the border turning INK — accent never marks focus.
 */
export function ContactForm({ defaultInquiryType }: { defaultInquiryType: ContactInquiryType }) {
  const [inquiryType, setInquiryType] = useState<ContactInquiryType>(defaultInquiryType);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent || status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      fullName: String(data.get("fullName") ?? ""),
      workEmail: String(data.get("workEmail") ?? ""),
      institution: String(data.get("institution") ?? ""),
      phone: String(data.get("phone") ?? ""),
      countryCode: "",
      message: String(data.get("message") ?? ""),
      inquiryType,
    };

    setStatus("sending");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setErrorMessage(body?.error ?? "Failed to send inquiry. Please try again or email us directly.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Failed to send inquiry. Please try again or email us directly.");
      setStatus("error");
    }
  }

  return (
    <Card featured interactive={false} padded={false} className="p-10 max-md:p-6">
      {/* Brand-gradient top rule (paints over Card's accent featured rule). */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-brand-gradient" />
      <div className="flex items-center gap-3">
        <span aria-hidden className="block h-px w-6 bg-hairline-strong" />
        <span className="font-display text-label tnum text-ink-3">03</span>
        <span className="font-body text-label text-ink-2">{contactForm.eyebrow}</span>
      </div>

      <h2 className="mt-5 font-display text-title text-ink">{contactForm.heading}</h2>
      <p className="mt-2 font-body text-label text-ink-2">{contactForm.sub}</p>

      {status === "success" ? (
        <div className="mt-8 border-t border-hairline pt-6" role="status">
          <LedgerRow label="Inquiry received" value="Routed to the ASTA team" tick={false} />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <EvidenceChip>{inquiryType}</EvidenceChip>
            <span className="font-body text-label text-ink-2">{contactForm.sub}</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate={false}>
          <div className="mt-8 grid gap-x-5 gap-y-6 sm:grid-cols-2">
            <Field label={contactForm.labels.fullName} htmlFor="contact-fullName">
              <input
                id="contact-fullName"
                name="fullName"
                type="text"
                required
                autoComplete="name"
                placeholder={contactForm.placeholders.fullName}
                className={inputClass}
              />
            </Field>

            <Field label={contactForm.labels.workEmail} htmlFor="contact-workEmail">
              <input
                id="contact-workEmail"
                name="workEmail"
                type="email"
                required
                autoComplete="email"
                placeholder={contactForm.placeholders.workEmail}
                className={inputClass}
              />
            </Field>

            <Field label={contactForm.labels.institution} htmlFor="contact-institution">
              <input
                id="contact-institution"
                name="institution"
                type="text"
                required
                autoComplete="organization"
                placeholder={contactForm.placeholders.institution}
                className={inputClass}
              />
            </Field>

            <Field label={contactForm.labels.phone} htmlFor="contact-phone">
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder={contactForm.placeholders.phone}
                className={inputClass}
              />
            </Field>

            <Field label="Inquiry type" htmlFor="contact-inquiryType" className="sm:col-span-2">
              <div className="relative">
                <select
                  id="contact-inquiryType"
                  name="inquiryType"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value as ContactInquiryType)}
                  className={`${inputClass} appearance-none pr-10`}
                >
                  {contactInquiryTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <svg
                  aria-hidden
                  viewBox="0 0 12 12"
                  className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-ink"
                >
                  <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </Field>

            <Field label={contactForm.labels.message} htmlFor="contact-message" className="sm:col-span-2">
              <textarea
                id="contact-message"
                name="message"
                required
                placeholder={contactForm.placeholders.message}
                className={`${inputClass} min-h-[10rem] resize-y`}
              />
            </Field>
          </div>

          <label className="mt-6 flex cursor-pointer items-start gap-3">
            <span className="relative mt-0.5 inline-flex h-[18px] w-[18px] shrink-0">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="peer h-full w-full cursor-pointer appearance-none rounded-card border border-hairline bg-surface transition-colors duration-200 checked:border-ink checked:bg-ink"
              />
              <svg
                aria-hidden
                viewBox="0 0 10 10"
                className="pointer-events-none absolute inset-0 m-auto h-2.5 w-2.5 text-surface opacity-0 transition-opacity duration-150 peer-checked:opacity-100"
              >
                <path d="M1.5 5.5 4 7.5 8.5 2" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
            <span className="font-body text-label text-ink-2">{contactForm.consentLabel}</span>
          </label>

          <div className="mt-8">
            <Button
              type="submit"
              disabled={!consent || status === "sending"}
              arrow={status !== "sending"}
              className="w-full disabled:pointer-events-none disabled:opacity-40 sm:w-auto"
            >
              {status === "sending" ? "Sending…" : contactForm.submitLabel}
            </Button>
            {status === "error" && errorMessage && (
              <p className="mt-3 font-body text-label text-alarm" role="alert">
                {errorMessage}
              </p>
            )}
          </div>
        </form>
      )}
    </Card>
  );
}
