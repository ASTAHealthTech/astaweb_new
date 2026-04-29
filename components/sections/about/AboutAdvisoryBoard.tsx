import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { aboutAdvisoryBoard } from "@/content/about";

export function AboutAdvisoryBoard() {
  return (
    <section
      id="advisory-board"
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
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent dark:via-white/[0.05]" />
        <div className="absolute -left-20 top-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/[0.03] blur-[130px] dark:bg-violet-500/[0.06]" />
        <div className="absolute right-0 bottom-1/4 h-[350px] w-[350px] rounded-full bg-cyan-400/[0.02] blur-[110px] dark:bg-cyan-400/[0.05]" />
      </div>

      <Container className="relative">

        {/* ══ HEADER ══ */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-cyan-400" />
              {aboutAdvisoryBoard.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-h2 font-semibold tracking-[-0.04em] text-ink dark:text-frost md:text-h2-lg">
              {aboutAdvisoryBoard.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-body-lg text-ink-muted dark:text-frost-muted">
              {aboutAdvisoryBoard.sub}
            </p>
          </Reveal>
        </div>

        {/* ══ SINGLE DARK PANEL ══ */}
        <Reveal delay={0.14}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-slate-200/80 bg-[#040810] text-white shadow-[0_8px_40px_-12px_rgba(10,22,40,0.18)] dark:border-white/[0.07] dark:shadow-none">

            {/* Glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -right-10 top-0 h-48 w-48 rounded-full bg-violet-500/[0.09] blur-[80px]" />
              <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-brand-500/[0.07] blur-[70px]" />
            </div>

            {/* Top shine */}
            <div
              aria-hidden
              className="absolute inset-x-[5%] top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(124,92,255,0.55),rgba(79,107,255,0.35),transparent)",
              }}
            />

            {/* Panel header */}
            <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.05] px-7 py-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/28">
                  Advisory board · {aboutAdvisoryBoard.members.length} advisors
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {aboutAdvisoryBoard.lenses.map((lens) => (
                  <span
                    key={lens}
                    className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2.5 py-0.5 text-[0.63rem] font-medium text-white/50"
                  >
                    {lens}
                  </span>
                ))}
              </div>
            </div>

            {/* 2×2 advisor grid */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2">
              {aboutAdvisoryBoard.members.map((member, i) => (
                <div
                  key={member.name}
                  className="group relative flex flex-col gap-4 overflow-hidden p-7 lg:p-8"
                  style={{
                    borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.05)" : undefined,
                    borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : undefined,
                  }}
                >
                  {/* Ghost index */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-4 right-5 select-none font-mono text-[3rem] font-bold leading-none tracking-tight"
                    style={{ color: member.accent + "08" }}
                  >
                    0{i + 1}
                  </div>

                  {/* Photo + name + badge row */}
                  <div className="flex items-start gap-4">

                    {/* Photo with gradient ring + targeting brackets */}
                    <div className="relative flex-none">
                      <div
                        className="relative h-[60px] w-[60px] rounded-xl p-[1.5px]"
                        style={{
                          background: `linear-gradient(135deg,${member.accent},${member.accentTo})`,
                        }}
                      >
                        <div className="relative h-full w-full overflow-hidden rounded-[10px] bg-[#040810]">
                          <Image
                            src={member.photo}
                            alt={member.name}
                            fill
                            className="object-cover object-top"
                            sizes="60px"
                          />
                        </div>
                        {/* Scan-line overlay */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 rounded-[10px] overflow-hidden"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px)",
                          }}
                        />
                      </div>
                      {/* Corner targeting brackets */}
                      <div className="pointer-events-none absolute -inset-1">
                        <div
                          className="absolute left-0 top-0 h-3 w-3 border-l border-t"
                          style={{ borderColor: member.accent + "65" }}
                        />
                        <div
                          className="absolute right-0 top-0 h-3 w-3 border-r border-t"
                          style={{ borderColor: member.accent + "65" }}
                        />
                        <div
                          className="absolute bottom-0 left-0 h-3 w-3 border-b border-l"
                          style={{ borderColor: member.accent + "65" }}
                        />
                        <div
                          className="absolute bottom-0 right-0 h-3 w-3 border-b border-r"
                          style={{ borderColor: member.accent + "65" }}
                        />
                      </div>
                    </div>

                    {/* Name + title + badge */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-1.5">
                        <h3 className="text-[0.94rem] font-semibold leading-tight tracking-[-0.025em] text-frost">
                          {member.name}
                        </h3>
                        <span
                          className="rounded-full px-2 py-0.5 font-mono text-[0.53rem] font-bold uppercase tracking-[0.12em]"
                          style={{ background: member.accent + "14", color: member.accent }}
                        >
                          {member.badge}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <p className="font-mono text-[0.68rem] tracking-[0.03em] text-white/38">
                          {member.title}
                        </p>
                        {/* Profile links */}
                        <div className="flex items-center gap-1.5">
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`${member.name} on LinkedIn`}
                              className="flex h-5 w-5 items-center justify-center rounded border border-white/[0.10] bg-white/[0.04] text-white/35 transition-all hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]"
                            >
                              <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </a>
                          )}
                          {member.scholar && (
                            <a
                              href={member.scholar}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`${member.name} on Google Scholar`}
                              className="flex h-5 w-5 items-center justify-center rounded border border-white/[0.10] bg-white/[0.04] text-white/35 transition-all hover:border-[#4285F4]/40 hover:bg-[#4285F4]/10 hover:text-[#4285F4]"
                            >
                              <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5">
                                <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 10a8 8 0 0 1 7.162 3.44L24 9.5z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Headline */}
                  <p className="text-[0.81rem] font-medium leading-relaxed text-white/65">
                    {member.headline}
                  </p>

                  {/* Body */}
                  <p className="text-[0.74rem] leading-relaxed text-white/42">
                    {member.body}
                  </p>

                  {/* Contribution — bullet line */}
                  <div className="flex items-start gap-2.5">
                    <span
                      className="mt-[4px] h-1.5 w-1.5 flex-none rounded-full"
                      style={{ background: member.accent }}
                    />
                    <p className="text-[0.73rem] leading-relaxed text-white/50">
                      {member.contribution}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="relative border-t border-white/[0.05] px-7 py-4">
              <p className="text-[0.73rem] leading-relaxed text-white/30">
                {aboutAdvisoryBoard.supportNote}
              </p>
            </div>

          </div>
        </Reveal>

      </Container>
    </section>
  );
}
