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
import {
  CONTACT_EMAIL,
  CONTACT_WHATSAPP_URL,
  contactForm,
  contactInquiryTypes,
  resolveContactInquiryType,
  type ContactInquiryType,
} from "@/content/contact";

const INQUIRY_COLORS: Record<ContactInquiryType, string> = {
  "Product walkthrough": "#4F6BFF",
  "Deployment review": "#28D7B5",
  "Teaching hospital / research": "#7C5CFF",
  "Partnership": "#49C6FF",
  "Other": "#64748B",
};

const fieldShellClass =
  "group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04] transition-all duration-200 focus-within:border-brand-400/50 focus-within:bg-white/[0.06] focus-within:shadow-[0_0_0_3px_rgba(79,107,255,0.10)]";

const inputClass =
  "h-12 w-full bg-transparent pl-11 pr-4 text-[0.92rem] text-frost outline-none placeholder:text-white/28";

const textareaClass =
  "min-h-[130px] w-full resize-none bg-transparent pl-11 pr-4 pt-4 text-[0.92rem] text-frost outline-none placeholder:text-white/28";

export function ContactInquiryForm() {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [selectedInquiryType, setSelectedInquiryType] =
    useState<ContactInquiryType>("Other");
  const [selectedCountryIso, setSelectedCountryIso] = useState("IN");
  const [countrySearch, setCountrySearch] = useState("");
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);
  const countryPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSelectedInquiryType(resolveContactInquiryType(params.get("intent") ?? undefined));
  }, []);

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("fullName") ?? "").trim();
    const workEmail = String(formData.get("workEmail") ?? "").trim();
    const institution = String(formData.get("institution") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const subjectParts =
      selectedInquiryType === "Other"
        ? ["ASTA inquiry", institution || fullName]
        : ["ASTA inquiry", selectedInquiryType, institution || fullName];
    const subject = subjectParts.filter(Boolean).join(" | ");

    const detailLines = [
      selectedInquiryType !== "Other" ? `Inquiry type: ${selectedInquiryType}` : "",
      `Full name: ${fullName}`,
      `Work email: ${workEmail}`,
      `Hospital / institution: ${institution}`,
      phone ? `Contact number: ${selectedCountry.dialCode} ${phone}` : "",
    ].filter(Boolean);

    const body = [
      "Hello ASTA team,",
      "",
      "I would like to start a conversation with ASTA.",
      "",
      ...detailLines,
      "",
      "Message:",
      message,
      "",
      "Regards,",
      fullName,
    ].join("\n");

    setStatusMessage(`Opening your mail client with a drafted inquiry to ${CONTACT_EMAIL}.`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const activeColor = INQUIRY_COLORS[selectedInquiryType];

  return (
    <form onSubmit={handleSubmit} className="mt-6">

      {/* ── Inquiry type selector ── */}
      <div className="mb-5">
        <div className="mb-2.5 font-mono text-[8.5px] uppercase tracking-[0.20em] text-white/22">
          Inquiry type
        </div>
        <div className="flex flex-wrap gap-2">
          {contactInquiryTypes.map((type) => {
            const color = INQUIRY_COLORS[type];
            const isActive = selectedInquiryType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedInquiryType(type)}
                aria-pressed={isActive}
                className="rounded-full border px-3 py-1.5 text-[0.72rem] font-medium transition-all duration-150"
                style={
                  isActive
                    ? {
                        background: color + "22",
                        borderColor: color + "55",
                        color: color,
                      }
                    : {
                        background: "rgba(255,255,255,0.03)",
                        borderColor: "rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.40)",
                      }
                }
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Active type indicator strip ── */}
      <div
        className="mb-5 flex items-center gap-2.5 rounded-xl border px-4 py-2.5"
        style={{
          borderColor: activeColor + "28",
          background: activeColor + "0C",
        }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: activeColor }}
        />
        <span className="font-mono text-[0.65rem] text-white/38">
          Routing as
        </span>
        <span
          className="font-mono text-[0.68rem] font-semibold"
          style={{ color: activeColor }}
        >
          {selectedInquiryType}
        </span>
        <span className="ml-auto font-mono text-[0.62rem] text-white/28">
          via {CONTACT_EMAIL}
        </span>
      </div>

      {/* ── Fields ── */}
      <div className="grid gap-3.5 md:grid-cols-2">
        <TextField
          icon="user"
          label={contactForm.labels.fullName}
          name="fullName"
          type="text"
          required
          autoComplete="name"
          placeholder={contactForm.placeholders.fullName}
        />

        <TextField
          icon="mail"
          label={contactForm.labels.workEmail}
          name="workEmail"
          type="email"
          required
          autoComplete="email"
          placeholder={contactForm.placeholders.workEmail}
        />

        <TextField
          icon="building"
          label={contactForm.labels.institution}
          name="institution"
          type="text"
          required
          autoComplete="organization"
          placeholder={contactForm.placeholders.institution}
        />

        <div className="block">
          <FieldLabel icon="phone" label={contactForm.labels.phone} />
          <div className="mt-2 grid grid-cols-[172px_1fr] gap-3">
            <div ref={countryPickerRef} className="relative">
              <input type="hidden" name="countryCode" value={selectedCountry.dialCode} />
              <button
                type="button"
                onClick={() => setCountryMenuOpen((open) => !open)}
                className={cn(
                  fieldShellClass,
                  "flex h-12 w-full items-center justify-between px-3.5 text-left"
                )}
                aria-label="Select country calling code"
                aria-haspopup="listbox"
                aria-expanded={countryMenuOpen}
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-500/[0.12] text-brand-400">
                    <Icon name="globe" className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.84rem] font-semibold text-frost">
                      {selectedCountry.dialCode}
                    </span>
                    <span className="block truncate font-mono text-[0.60rem] uppercase tracking-[0.14em] text-white/30">
                      {selectedCountry.iso2}
                    </span>
                  </span>
                </span>
                <Icon
                  name="chevron-down"
                  className={cn(
                    "h-4 w-4 text-white/30 transition-transform duration-200",
                    countryMenuOpen && "rotate-180"
                  )}
                />
              </button>

              {countryMenuOpen && (
                <div className="absolute left-0 top-[calc(100%+0.5rem)] z-30 w-[min(340px,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#081020] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.72)]">
                  <div className="border-b border-white/[0.07] p-3">
                    <div className={fieldShellClass}>
                      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/28 transition-colors duration-200 group-focus-within:text-brand-400">
                        <Icon name="search" className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        autoFocus
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        placeholder="Search country or code"
                        aria-label="Search country calling code"
                        className={cn(inputClass, "h-11 text-[0.86rem]")}
                      />
                    </div>
                  </div>
                  <div
                    className="max-h-64 overflow-y-auto py-2"
                    role="listbox"
                    aria-label="Country calling codes"
                  >
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <button
                          key={`${country.iso2}-${country.dialCode}`}
                          type="button"
                          onClick={() => {
                            setSelectedCountryIso(country.iso2);
                            setCountryMenuOpen(false);
                            setCountrySearch("");
                          }}
                          role="option"
                          aria-selected={selectedCountryIso === country.iso2}
                          className={cn(
                            "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors duration-150",
                            selectedCountryIso === country.iso2
                              ? "bg-brand-500/[0.12] text-cyan-300"
                              : "hover:bg-white/[0.04]"
                          )}
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-[0.88rem] font-medium text-frost">
                              {country.name}
                            </span>
                            <span className="block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/30">
                              {country.iso2}
                            </span>
                          </span>
                          <span className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 font-mono text-[0.72rem] font-semibold text-white/50">
                            {country.dialCode}
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-[0.82rem] text-white/38">
                        No countries found.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className={fieldShellClass}>
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/28 transition-colors duration-200 group-focus-within:text-brand-400">
                <Icon name="phone" className="h-4 w-4" />
              </div>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                aria-label={contactForm.labels.phone}
                placeholder={contactForm.placeholders.phone}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <TextAreaField
          icon="message-circle"
          label={contactForm.labels.message}
          name="message"
          required
          placeholder={contactForm.placeholders.message}
          className="md:col-span-2"
        />
      </div>

      {/* Consent */}
      <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 transition hover:bg-white/[0.04]">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/[0.20] bg-transparent accent-brand-500"
        />
        <span className="text-[0.75rem] leading-relaxed text-white/45">
          {contactForm.consentLabel}
        </span>
      </label>

      {/* Submit */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-5">
        <Button type="submit" variant="glow" size="lg" trailingIcon>
          {contactForm.submitLabel}
        </Button>
        <div className="flex flex-wrap gap-4 text-[0.76rem]">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-white/40 underline-offset-4 transition hover:text-white/65 hover:underline"
          >
            Email directly
          </a>
          <a
            href={CONTACT_WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="text-emerald-400/60 underline-offset-4 transition hover:text-emerald-400 hover:underline"
          >
            Continue on WhatsApp
          </a>
        </div>
      </div>

      {statusMessage && (
        <p aria-live="polite" className="mt-3 text-[0.76rem] leading-relaxed text-cyan-300/70">
          {statusMessage}
        </p>
      )}
    </form>
  );
}

function FieldLabel({ label }: { icon?: IconName; label: string }) {
  return (
    <span className="text-[0.74rem] font-medium text-white/48">{label}</span>
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
      <FieldLabel icon={icon} label={label} />
      <div className={cn(fieldShellClass, "mt-2")}>
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/28 transition-colors duration-200 group-focus-within:text-brand-400">
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
      <FieldLabel icon={icon} label={label} />
      <div className={cn(fieldShellClass, "mt-2")}>
        <div className="pointer-events-none absolute left-4 top-4 text-white/28 transition-colors duration-200 group-focus-within:text-brand-400">
          <Icon name={icon} className="h-4 w-4" />
        </div>
        <textarea {...props} className={textareaClass} />
      </div>
    </label>
  );
}
