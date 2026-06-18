import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { aboutInstitutionalPedigree } from "@/content/about";

export function AboutInstitutionalPedigree() {
  return (
    <section
      id="institutional-pedigree"
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
        <div className="absolute left-[12%] top-1/3 h-[380px] w-[380px] rounded-full bg-violet-500/[0.03] blur-[120px] dark:bg-violet-500/[0.07]" />
        <div className="absolute right-[12%] bottom-1/4 h-[320px] w-[320px] rounded-full bg-cyan-400/[0.02] blur-[100px] dark:bg-cyan-400/[0.05]" />
      </div>

      <Container className="relative">

        {/* ══ HEADER ══ */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-cyan-400" />
              {aboutInstitutionalPedigree.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-h2 font-semibold tracking-[-0.04em] text-ink dark:text-frost md:text-h2-lg">
              {aboutInstitutionalPedigree.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-body-lg text-ink-muted dark:text-frost-muted">
              {aboutInstitutionalPedigree.sub}
            </p>
          </Reveal>
        </div>

        {/* ══ SINGLE DARK PANEL ══ */}
        <Reveal delay={0.14}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-slate-200/80 bg-[#040810] text-white shadow-[0_8px_40px_-12px_rgba(10,22,40,0.18)] dark:border-white/[0.07] dark:shadow-none">

            {/* Glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-10 top-0 h-48 w-48 rounded-full bg-brand-500/[0.08] blur-[80px]" />
              <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-teal-400/[0.06] blur-[70px]" />
            </div>

            {/* Top shine */}
            <div
              aria-hidden
              className="absolute inset-x-[5%] top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.50),rgba(40,215,181,0.32),transparent)",
              }}
            />

            {/* Panel header */}
            <div className="relative flex items-center justify-between border-b border-white/[0.05] px-7 py-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/28">
                  Institutional backing
                </span>
              </div>
              <span className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2.5 py-0.5 font-mono text-[8px] font-bold text-white/40">
                4 institutions
              </span>
            </div>

            {/* 4-cell grid */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
              {aboutInstitutionalPedigree.partners.map((partner, i) => (
                <div
                  key={partner.name}
                  className="relative flex flex-col gap-4 p-7 lg:p-8"
                  style={{
                    borderRight:
                      i < 3 && i !== 1
                        ? "1px solid rgba(255,255,255,0.05)"
                        : i === 1
                          ? "1px solid rgba(255,255,255,0.05)"
                          : undefined,
                    borderBottom:
                      i < 2
                        ? "1px solid rgba(255,255,255,0.05)"
                        : undefined,
                  }}
                >
                  {/* Top accent */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[1.5px]"
                    style={{
                      background: `linear-gradient(to right,${partner.color}55,transparent)`,
                    }}
                  />

                  {/* Badge */}
                  <span
                    className="self-start rounded-full px-2.5 py-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em]"
                    style={{ background: partner.color + "14", color: partner.color }}
                  >
                    {partner.badge}
                  </span>

                  {/* Logo */}
                  <div className="relative flex h-[88px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-white px-5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.28)]">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain p-5"
                      sizes="180px"
                    />
                  </div>

                  {/* Name + descriptor */}
                  <div>
                    <h3 className="text-[0.96rem] font-semibold leading-snug tracking-[-0.025em] text-frost">
                      {partner.name}
                    </h3>
                    <p className="mt-1 text-[0.72rem] leading-relaxed text-white/38">
                      {partner.descriptor}
                    </p>
                  </div>

                  {/* Note */}
                  <p className="text-[0.76rem] leading-relaxed text-white/52">
                    {partner.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="relative border-t border-white/[0.05] px-7 py-5 text-center">
              <div className="mb-1.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-white/25">
                What this signals to hospital buyers
              </div>
              <p className="mx-auto max-w-3xl text-[0.82rem] leading-relaxed text-white/48">
                {aboutInstitutionalPedigree.footer}
              </p>
            </div>

          </div>
        </Reveal>

      </Container>
    </section>
  );
}
