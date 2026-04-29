import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { aboutLeadership } from "@/content/about";

export function AboutLeadership() {
  return (
    <section
      id="leadership-team"
      className="relative overflow-hidden bg-canvas py-24 md:py-32 dark:bg-[#060816]"
    >
      {/* ── BG ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,22,40,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(10,22,40,0.03) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="absolute inset-0 hidden bg-grid-fine bg-[length:44px_44px] opacity-60 dark:block" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-400/25" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent dark:via-white/[0.04]" />
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-brand-500/[0.03] blur-[160px] dark:bg-brand-500/[0.07]" />
        <div className="absolute right-0 top-1/4 h-[320px] w-[320px] rounded-full bg-cyan-400/[0.02] blur-[100px] dark:bg-cyan-400/[0.05]" />
      </div>

      <Container className="relative">

        {/* ══ HEADER ══ */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-cyan-400" />
              {aboutLeadership.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-h2 font-semibold tracking-[-0.04em] text-ink dark:text-frost md:text-h2-lg">
              {aboutLeadership.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-body-lg text-ink-muted dark:text-frost-muted">
              {aboutLeadership.sub}
            </p>
          </Reveal>
        </div>

        {/* ══ SINGLE DARK PANEL ══ */}
        <Reveal delay={0.14}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-slate-200/80 bg-[#040810] text-white shadow-[0_8px_40px_-12px_rgba(10,22,40,0.18)] dark:border-white/[0.07] dark:shadow-none">

            {/* Glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-12 top-0 h-56 w-56 rounded-full bg-brand-500/[0.09] blur-[90px]" />
              <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-violet-500/[0.07] blur-[80px]" />
            </div>

            {/* Top shine */}
            <div
              aria-hidden
              className="absolute inset-x-[5%] top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.55),rgba(124,92,255,0.35),rgba(73,198,255,0.25),transparent)",
              }}
            />

            {/* Panel header */}
            <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.05] px-7 py-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/28">
                  Founding team · {aboutLeadership.members.length} members
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {aboutLeadership.pillars.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2.5 py-0.5 text-[0.63rem] font-medium text-white/50"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* 2×2 member grid */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2">
              {aboutLeadership.members.map((member, i) => (
                <div
                  key={member.name}
                  className="group relative flex flex-col gap-5 overflow-hidden p-8 lg:p-10"
                  style={{
                    borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.05)" : undefined,
                    borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : undefined,
                  }}
                >
                  {/* Per-cell top accent line */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[1.5px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(to right,${member.accent}60,transparent)`,
                    }}
                  />

                  {/* Ghost index */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-5 right-6 select-none font-mono text-[3.5rem] font-bold leading-none tracking-tight"
                    style={{ color: member.accent + "08" }}
                  >
                    0{i + 1}
                  </div>

                  {/* Photo + badge row */}
                  <div className="flex items-start justify-between gap-4">

                    {/* Photo with gradient ring + targeting brackets */}
                    <div className="relative">
                      <div
                        className="relative h-[80px] w-[80px] rounded-2xl p-[1.5px]"
                        style={{
                          background: `linear-gradient(135deg,${member.accent},${member.accentTo})`,
                        }}
                      >
                        <div className="relative h-full w-full overflow-hidden rounded-[13px] bg-[#040810]">
                          <Image
                            src={member.photo}
                            alt={member.name}
                            fill
                            className="object-cover object-top"
                            sizes="80px"
                          />
                        </div>
                        {/* Scan-line overlay */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 rounded-[13px] overflow-hidden"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.07) 3px,rgba(0,0,0,0.07) 4px)",
                          }}
                        />
                      </div>
                      {/* Corner targeting brackets */}
                      <div className="pointer-events-none absolute -inset-1.5">
                        <div
                          className="absolute left-0 top-0 h-4 w-4 border-l border-t"
                          style={{ borderColor: member.accent + "70" }}
                        />
                        <div
                          className="absolute right-0 top-0 h-4 w-4 border-r border-t"
                          style={{ borderColor: member.accent + "70" }}
                        />
                        <div
                          className="absolute bottom-0 left-0 h-4 w-4 border-b border-l"
                          style={{ borderColor: member.accent + "70" }}
                        />
                        <div
                          className="absolute bottom-0 right-0 h-4 w-4 border-b border-r"
                          style={{ borderColor: member.accent + "70" }}
                        />
                      </div>
                    </div>

                    {/* Badge + status */}
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className="rounded-full px-2.5 py-1 font-mono text-[0.58rem] font-bold uppercase tracking-[0.13em]"
                        style={{ background: member.accent + "14", color: member.accent }}
                      >
                        {member.badge}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-[0.56rem] text-white/28">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Active
                      </span>
                    </div>
                  </div>

                  {/* Name + title + LinkedIn */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-[1.12rem] font-semibold leading-tight tracking-[-0.03em] text-frost">
                        {member.name}
                      </h3>
                      <p className="mt-0.5 font-mono text-[0.72rem] tracking-[0.04em] text-white/40">
                        {member.title}
                      </p>
                    </div>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        className="flex h-7 w-7 flex-none items-center justify-center rounded-lg border border-white/[0.10] bg-white/[0.05] text-white/40 transition-all hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                  </div>

                  {/* Headline */}
                  <p className="text-[0.83rem] leading-relaxed text-white/65">
                    {member.headline}
                  </p>

                  {/* Contribution strip */}
                  <div
                    className="mt-auto rounded-xl border px-4 py-3"
                    style={{
                      borderColor: member.accent + "22",
                      background: `linear-gradient(180deg,${member.accent}0C,transparent)`,
                    }}
                  >
                    <div className="mb-1.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.18em] text-white/25">
                      · · asta role · ·
                    </div>
                    <p className="text-[0.76rem] leading-relaxed text-white/55">
                      {member.contribution}
                    </p>
                  </div>

                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="relative border-t border-white/[0.05] px-7 py-4">
              <p className="text-[0.73rem] leading-relaxed text-white/30">
                {aboutLeadership.framing}
              </p>
            </div>

          </div>
        </Reveal>

      </Container>
    </section>
  );
}
