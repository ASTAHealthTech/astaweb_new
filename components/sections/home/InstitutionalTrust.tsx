import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";

/* ─── Partner data ──────────────────────────────────────────── */
const PARTNERS = [
  {
    name: "AIC-SEED",
    full: "Atal Incubation Centre – SEED",
    role: "Incubation",
    logo: "/partners/AIC-SEED.jpg",
    from: "#4F6BFF",
    to: "#7C5CFF",
    desc: "Atal Incubation Centre providing venture support for translational healthcare innovation.",
  },
  {
    name: "MeitY Startup Hub",
    full: "Ministry of Electronics & IT, Govt. of India",
    role: "National Innovation",
    logo: "/partners/MeitY.png",
    from: "#28D7B5",
    to: "#49C6FF",
    desc: "Government of India's national innovation program backing technology ventures.",
  },
  {
    name: "IISER Pune",
    full: "Indian Institute of Science Education & Research",
    role: "Research",
    logo: "/partners/IISER.png",
    from: "#7C5CFF",
    to: "#4F6BFF",
    desc: "Premier research institution grounding product development in scientific rigor.",
  },
  {
    name: "NIT Andhra Pradesh",
    full: "National Institute of Technology, Andhra Pradesh",
    role: "Technology",
    logo: "/partners/NIT.png",
    from: "#49C6FF",
    to: "#28D7B5",
    desc: "Technical collaboration supporting engineering depth and clinical validation.",
  },
] as const;

const POSTURES = [
  "DPDP-aligned",
  "Legal audit logs",
  "Role-based access",
  "Data residency",
  "E2E encryption",
] as const;

/* ─── Section ───────────────────────────────────────────────── */
export function InstitutionalTrust() {
  return (
    <section className="relative overflow-hidden bg-canvas py-20 md:py-28 dark:bg-night-deep">
      {/* ── BG layer ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Light grid */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,22,40,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(10,22,40,0.035) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        {/* Dark grid */}
        <div className="absolute inset-0 hidden dark:block bg-grid-fine bg-[length:44px_44px] opacity-55" />
        {/* Glows */}
        <div className="absolute left-1/4 top-0 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-brand-500/[0.04] blur-[150px] dark:bg-brand-500/[0.06]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[500px] rounded-full bg-violet-500/[0.03] blur-[130px] dark:bg-violet-500/[0.05]" />
        {/* Top/bottom rules */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 to-transparent dark:via-white/[0.08]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/60 to-transparent dark:via-white/[0.05]" />
      </div>

      <Container className="relative">
        {/* ── Header ── */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            {/* Eyebrow with verified icon */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/[0.08] dark:text-cyan-300/90">
              <VerifiedIcon />
              Institutional trust
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-5 text-h2 md:text-h2-lg font-semibold tracking-[-0.04em] text-balance text-ink dark:text-frost">
              Backed by India's foremost
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg,#4F6BFF 0%,#7C5CFF 50%,#49C6FF 100%)" }}
              >
                innovation ecosystem
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-4 text-body-lg text-pretty text-ink-muted dark:text-frost-muted">
              ASTA is supported by national incubation programs, government innovation mandates,
              and leading research institutions — validating clinical credibility at every layer.
            </p>
          </Reveal>

          {/* Quick credibility pills */}
          <Reveal delay={0.14}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {[
                { val: "4", label: "institutional partners" },
                { val: "National", label: "Govt. backing" },
                { val: "7+", label: "live deployments" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 dark:border-white/[0.07] dark:bg-white/[0.04]"
                >
                  <span className="font-mono text-[0.78rem] font-bold text-ink dark:text-frost">{m.val}</span>
                  <span className="text-[0.72rem] text-ink-muted dark:text-frost-muted">{m.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── Divider ── */}
        <Reveal delay={0.16}>
          <div className="relative my-12 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/[0.08]" />
            <div className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-brand-400/60 dark:bg-brand-400/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500/80 dark:bg-brand-400/60" />
              <span className="h-1 w-1 rounded-full bg-brand-400/60 dark:bg-brand-400/40" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/[0.08]" />
          </div>
        </Reveal>

        {/* ── Partner cards ── */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.name} delay={0.18 + i * 0.07}>
              <PartnerCard partner={p} />
            </Reveal>
          ))}
        </div>

        {/* ── Compliance strip ── */}
        <Reveal delay={0.46}>
          <ComplianceStrip />
        </Reveal>
      </Container>
    </section>
  );
}

/* ─── Partner Card ──────────────────────────────────────────── */
function PartnerCard({
  partner,
}: {
  partner: (typeof PARTNERS)[number];
}) {
  return (
    /* Gradient-border wrapper */
    <div
      className="group relative rounded-[20px] p-[1.5px] transition-all duration-300 hover:-translate-y-1"
      style={{
        background: `linear-gradient(135deg, ${partner.from}30, transparent 55%, ${partner.to}20)`,
      }}
    >
      {/* Hover: intensify border */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${partner.from}55, transparent 55%, ${partner.to}40)`,
        }}
      />

      {/* Inner card */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-[18.5px] bg-white p-6 dark:bg-[#080E1E]">
        {/* Hover glow inside */}
        <div
          aria-hidden
          className="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `${partner.from}20` }}
        />

        {/* Role badge */}
        <div className="mb-5 flex items-center justify-between">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em]"
            style={{
              background: `linear-gradient(135deg, ${partner.from}14, ${partner.to}10)`,
              color: partner.from,
              border: `1px solid ${partner.from}25`,
            }}
          >
            <span
              className="h-1 w-1 rounded-full"
              style={{ background: partner.from }}
            />
            {partner.role}
          </span>
        </div>

        {/* Logo — always on white tile */}
        <div className="relative flex h-[72px] items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white px-4 shadow-sm dark:border-white/[0.06]">
          <Image
            src={partner.logo}
            alt={partner.name}
            fill
            className="object-contain p-4"
            sizes="148px"
          />
        </div>

        {/* Accent rule */}
        <div
          className="mt-5 h-px w-full"
          style={{
            background: `linear-gradient(to right, ${partner.from}50, ${partner.to}40, transparent)`,
          }}
        />

        {/* Name + descriptor */}
        <h3 className="mt-4 text-[0.92rem] font-semibold leading-snug tracking-[-0.015em] text-ink dark:text-frost">
          {partner.name}
        </h3>
        <p className="mt-1.5 text-[0.78rem] leading-relaxed text-ink-muted dark:text-frost-muted">
          {partner.desc}
        </p>
      </div>
    </div>
  );
}

/* ─── Compliance Strip ──────────────────────────────────────── */
function ComplianceStrip() {
  return (
    <div className="relative mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/80 dark:border-white/[0.07] dark:bg-white/[0.025]">
      {/* Gradient top rule */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(79,107,255,0.3), rgba(73,198,255,0.3), transparent)",
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-5 px-6 py-5 sm:flex-nowrap">
        {/* Left: label */}
        <div className="flex items-center gap-3 flex-none">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-brand-50 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:ring-brand-500/20">
            <ShieldCheckIcon />
          </div>
          <div>
            <div className="text-[0.78rem] font-semibold text-ink dark:text-frost">
              Clinical-grade compliance posture
            </div>
            <div className="mt-0.5 text-[0.72rem] text-ink-muted dark:text-frost-muted">
              Built for regulated hospital environments
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-slate-200 dark:bg-white/[0.07] sm:block" />

        {/* Right: posture chips */}
        <div className="flex flex-wrap gap-2">
          {POSTURES.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-white px-3 py-1.5 text-[0.72rem] font-medium text-ink-muted shadow-[0_1px_3px_rgba(10,22,40,0.06)] transition-colors hover:border-brand-200 hover:text-ink dark:border-brand-500/15 dark:bg-brand-500/[0.06] dark:text-frost-muted dark:hover:border-brand-500/30 dark:hover:text-frost"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "linear-gradient(135deg,#4F6BFF,#28D7B5)" }}
              />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Micro icons ───────────────────────────────────────────── */
function VerifiedIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3 w-3 text-brand-600 dark:text-cyan-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 1.5 L10 3h2.5v2.5L14.5 8 12.5 10.5V13H10L8 14.5 5.5 13H3v-2.5L1.5 8 3 5.5V3h2.5Z" />
      <path d="m5.5 8 2 2 3-3" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4 text-brand-600 dark:text-cyan-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 2 3.5 5v5c0 4.5 3 7.5 6.5 8 3.5-.5 6.5-3.5 6.5-8V5L10 2Z" />
      <path d="m7 10 2 2 4-4" />
    </svg>
  );
}
