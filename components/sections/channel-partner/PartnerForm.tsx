"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { countryCallingCodes } from "@/lib/countryCodes";
import type { IconName } from "@/lib/types";
import { partnerForm } from "@/content/channel-partner";
import { CONTACT_EMAIL } from "@/content/contact";

const fieldShellClass =
  "group relative overflow-hidden rounded-xl border border-border bg-bg transition-all duration-200 focus-within:border-accent focus-within:bg-white focus-within:ring-2 focus-within:ring-accent/10 dark:border-night-edge dark:bg-night dark:focus-within:border-accent dark:focus-within:bg-night-panel";

const inputClass =
  "h-11 w-full bg-transparent pl-10 pr-4 text-[0.875rem] text-fg outline-none placeholder:text-fg-subtle dark:text-frost dark:placeholder:text-frost-muted";

const textareaClass =
  "min-h-[120px] w-full resize-none bg-transparent pl-10 pr-4 pt-3 text-[0.875rem] text-fg outline-none placeholder:text-fg-subtle dark:text-frost dark:placeholder:text-frost-muted";

type SubmitStatus = "idle" | "submitting" | "success" | "error" | "rate-limited";

export function PartnerForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [selectedCountryIso, setSelectedCountryIso] = useState("IN");
  const [countrySearch, setCountrySearch] = useState("");
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);
  const countryPickerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!countryPickerRef.current?.contains(event.target as Node)) {
        setCountryMenuOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setCountryMenuOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selectedCountry =
    countryCallingCodes.find((c) => c.iso2 === selectedCountryIso) ??
    countryCallingCodes.find((c) => c.iso2 === "IN") ??
    countryCallingCodes[0];

  const normalizedSearch = countrySearch.trim().toLowerCase();
  const filteredCountries = countryCallingCodes.filter((c) => {
    if (!normalizedSearch) return true;
    return (
      c.name.toLowerCase().includes(normalizedSearch) ||
      c.iso2.toLowerCase().includes(normalizedSearch) ||
      c.dialCode.toLowerCase().includes(normalizedSearch)
    );
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitStatus === "submitting") return;

    setSubmitStatus("submitting");
    setSubmitMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: String(formData.get("fullName") ?? "").trim(),
      workEmail: String(formData.get("workEmail") ?? "").trim(),
      institution: String(formData.get("institution") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      countryCode: selectedCountry.dialCode,
      country: String(formData.get("country") ?? "").trim(),
      state: String(formData.get("state") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/channel-partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setSubmitStatus("success");
        setSubmitMessage("Your proposal has been submitted successfully. We'll be in touch soon.");
        formRef.current?.reset();
      } else if (res.status === 429) {
        setSubmitStatus("rate-limited");
        const retryMin = data.retryAfterMs ? Math.ceil(data.retryAfterMs / 60000) : 15;
        setSubmitMessage(`Too many submissions. Please wait ${retryMin} minute${retryMin > 1 ? "s" : ""} or contact us directly.`);
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.error || "Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("Network error. Please check your connection and try again.");
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mt-4">
      {/* Fields */}
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          icon="user"
          label={partnerForm.labels.fullName}
          name="fullName"
          type="text"
          required
          autoComplete="name"
          placeholder={partnerForm.placeholders.fullName}
        />

        <TextField
          icon="mail"
          label={partnerForm.labels.workEmail}
          name="workEmail"
          type="email"
          required
          autoComplete="email"
          placeholder={partnerForm.placeholders.workEmail}
        />

        <TextField
          icon="building"
          label={partnerForm.labels.institution}
          name="institution"
          type="text"
          required
          autoComplete="organization"
          placeholder={partnerForm.placeholders.institution}
        />

        <div className="block">
          <FieldLabel label={partnerForm.labels.phone} />
          <div className="mt-1.5 grid grid-cols-[100px_1fr] gap-2">
            <div ref={countryPickerRef} className="relative">
              <input type="hidden" name="countryCode" value={selectedCountry.dialCode} />
              <button
                type="button"
                onClick={() => setCountryMenuOpen((open) => !open)}
                className={cn(
                  fieldShellClass,
                  "flex h-11 w-full items-center justify-between px-3 text-left"
                )}
                aria-label="Select country calling code"
                aria-haspopup="listbox"
                aria-expanded={countryMenuOpen}
              >
                <span className="flex items-center gap-1.5 min-w-0">
                  <Icon name="globe" className="h-3.5 w-3.5 flex-none text-fg-subtle dark:text-frost-muted" />
                  <span className="text-[0.8125rem] font-semibold text-fg dark:text-frost">
                    {selectedCountry.dialCode}
                  </span>
                </span>
                <Icon
                  name="chevron-down"
                  className={cn(
                    "h-3.5 w-3.5 text-fg-subtle transition-transform duration-200 dark:text-frost-muted",
                    countryMenuOpen && "rotate-180"
                  )}
                />
              </button>

              {countryMenuOpen && (
                <div className="absolute left-0 top-[calc(100%+0.5rem)] z-30 w-[260px] overflow-hidden rounded-xl border border-border bg-white shadow-lg dark:border-night-edge dark:bg-night-panel">
                  <div className="border-b border-border p-2 dark:border-night-edge">
                    <input
                      type="text"
                      autoFocus
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      placeholder="Search country..."
                      className="w-full rounded-md border border-border bg-bg px-2.5 py-1.5 text-[0.8rem] text-fg outline-none dark:border-night-edge dark:bg-night dark:text-frost"
                    />
                  </div>
                  <div className="max-h-52 overflow-y-auto py-1" role="listbox">
                    {filteredCountries.map((country) => (
                      <button
                        key={`${country.iso2}-${country.dialCode}`}
                        type="button"
                        onClick={() => {
                          setSelectedCountryIso(country.iso2);
                          setCountryMenuOpen(false);
                          setCountrySearch("");
                        }}
                        className={cn(
                          "flex w-full items-center justify-between px-3 py-2 text-left text-[0.8rem] transition-colors",
                          selectedCountryIso === country.iso2
                            ? "bg-accent/10 font-semibold text-accent"
                            : "hover:bg-bg dark:hover:bg-night"
                        )}
                      >
                        <span className="truncate text-fg dark:text-frost">{country.name}</span>
                        <span className="font-mono text-[0.75rem] text-fg-subtle dark:text-frost-muted">{country.dialCode}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={fieldShellClass}>
              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-subtle transition-colors group-focus-within:text-accent dark:text-frost-muted">
                <Icon name="phone" className="h-4 w-4" />
              </div>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                aria-label={partnerForm.labels.phone}
                placeholder={partnerForm.placeholders.phone}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="block">
          <FieldLabel label={partnerForm.labels.country} />
          <div className={cn(fieldShellClass, "mt-1.5")}>
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-subtle transition-colors group-focus-within:text-accent dark:text-frost-muted">
              <Icon name="map-pin" className="h-4 w-4" />
            </div>
            <select
              name="country"
              required
              className={cn(inputClass, "appearance-none cursor-pointer")}
              defaultValue=""
            >
              <option value="" disabled>{partnerForm.placeholders.country}</option>
              {countryCallingCodes.map((c) => (
                <option key={c.iso2} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-fg-subtle">
              <Icon name="chevron-down" className="h-4 w-4" />
            </div>
          </div>
        </div>

        <TextField
          icon="map-pin"
          label={partnerForm.labels.state}
          name="state"
          type="text"
          required
          placeholder={partnerForm.placeholders.state}
        />

        <TextAreaField
          icon="message-circle"
          label={partnerForm.labels.message}
          name="message"
          required
          placeholder={partnerForm.placeholders.message}
          className="md:col-span-2"
        />
      </div>

      {/* Consent */}
      <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-bg p-3.5 transition hover:border-fg-subtle dark:border-night-edge dark:bg-night">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-accent"
        />
        <span className="text-[0.78rem] leading-relaxed text-fg-muted dark:text-frost-muted">
          {partnerForm.consentLabel}
        </span>
      </label>

      {/* Submit Action */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5 dark:border-night-edge">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={submitStatus === "submitting"}
          className="w-full sm:w-auto"
        >
          {submitStatus === "submitting" ? "Sending..." : partnerForm.submitLabel}
        </Button>
        <div className="flex gap-4 text-[0.78rem]">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Channel%20Partner%20Inquiry`}
            className="text-fg-subtle transition-colors hover:text-accent dark:text-frost-muted"
          >
            Email directly
          </a>
        </div>
      </div>

      {/* Feedback message */}
      {submitMessage && (
        <div
          className={cn(
            "mt-4 rounded-lg border p-3.5 text-[0.82rem] leading-relaxed",
            submitStatus === "success" && "border-brand-300 bg-brand-50 text-brand-900 dark:border-brand-800 dark:bg-brand-950/40 dark:text-brand-300",
            submitStatus === "rate-limited" && "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
            submitStatus === "error" && "border-red-300 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
          )}
        >
          {submitMessage}
        </div>
      )}
    </form>
  );
}

function FieldLabel({ label }: { label: string }) {
  return (
    <span className="text-[0.78rem] font-medium text-fg dark:text-frost">{label}</span>
  );
}

function TextField({
  icon,
  label,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  icon: IconName;
  label: string;
}) {
  return (
    <label className={cn("block", className)}>
      <FieldLabel label={label} />
      <div className={cn(fieldShellClass, "mt-1.5")}>
        <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-subtle transition-colors group-focus-within:text-accent dark:text-frost-muted">
          <Icon name={icon} className="h-4 w-4" />
        </div>
        <input {...props} className={inputClass} />
      </div>
    </label>
  );
}

function TextAreaField({
  icon,
  label,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  icon: IconName;
  label: string;
}) {
  return (
    <label className={cn("block", className)}>
      <FieldLabel label={label} />
      <div className={cn(fieldShellClass, "mt-1.5")}>
        <div className="pointer-events-none absolute left-3.5 top-3 text-fg-subtle transition-colors group-focus-within:text-accent dark:text-frost-muted">
          <Icon name={icon} className="h-4 w-4" />
        </div>
        <textarea {...props} className={textareaClass} />
      </div>
    </label>
  );
}
