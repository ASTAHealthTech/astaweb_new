import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { useCasesLiveProof } from "@/content/use-cases";

const HOSPITAL_LOGOS: Record<string, string> = {
  "Southern Railway HQ Hospital": "/hospitals/southern-railway.jpg",
  "Karnataka ENT Hospital": "/hospitals/karnataka-ent.jpg",
  "Aksha Hospital": "/hospitals/aksha.png",
  "Seethapathy Clinic": "/hospitals/seethapathy.png",
  "K.S. Hospital": "/hospitals/ks.png",
  "Sugam Hospital": "/hospitals/sugam.png",
  "Anbu Hospital": "/hospitals/anbu.png",
};

const ACCENTS = [
  { from: "#4F6BFF", to: "#7C5CFF" },
  { from: "#28D7B5", to: "#49C6FF" },
  { from: "#7C5CFF", to: "#49C6FF" },
  { from: "#49C6FF", to: "#4F6BFF" },
  { from: "#4F6BFF", to: "#28D7B5" },
  { from: "#28D7B5", to: "#7C5CFF" },
  { from: "#7C5CFF", to: "#4F6BFF" },
] as const;

function hostname(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
}

export function UseCasesProof() {
  return (
    <section
      id="live-hospital-proof"
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
        <div className="absolute -left-24 top-1/3 h-[420px] w-[420px] rounded-full bg-brand-500/[0.03] blur-[120px] dark:bg-brand-500/[0.05]" />
        <div className="absolute right-0 bottom-1/4 h-[360px] w-[360px] rounded-full bg-cyan-400/[0.02] blur-[110px] dark:bg-cyan-400/[0.04]" />
      </div>

      <Container className="relative">

        {/* ══ HEADER ══ */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400" />
              {useCasesLiveProof.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-h2 font-semibold tracking-[-0.04em] text-ink dark:text-frost md:text-h2-lg">
              {useCasesLiveProof.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-body-lg text-ink-muted dark:text-frost-muted">
              {useCasesLiveProof.sub}
            </p>
          </Reveal>
        </div>

        {/* ══ METRICS STRIP ══ */}
        <Reveal delay={0.14}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#040810] text-white">

            {/* Glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-10 top-0 h-44 w-44 rounded-full bg-brand-500/[0.09] blur-[80px]" />
              <div className="absolute bottom-0 right-0 h-36 w-36 rounded-full bg-emerald-400/[0.06] blur-[70px]" />
            </div>

            {/* Top shine */}
            <div
              aria-hidden
              className="absolute inset-x-[5%] top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.50),rgba(40,215,181,0.35),transparent)",
              }}
            />

            {/* Panel label */}
            <div className="relative flex items-center justify-between border-b border-white/[0.05] px-7 py-3.5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/28">
                  Live hospital deployments
                </span>
              </div>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2.5 py-0.5 font-mono text-[8px] font-bold text-emerald-400">
                Active patient care
              </span>
            </div>

            {/* 4 metrics */}
            <div className="relative grid grid-cols-2 divide-x divide-y divide-white/[0.05] sm:grid-cols-4 sm:divide-y-0">
              {useCasesLiveProof.metrics.map((metric, index) => (
                <div key={metric.label} className="flex flex-col items-center gap-1 px-6 py-6 text-center">
                  <div
                    className="font-mono text-[2rem] font-bold leading-none tracking-[-0.04em]"
                    style={{
                      background:
                        index === 0
                          ? "linear-gradient(135deg,#4F6BFF,#7C5CFF)"
                          : index === 1
                            ? "linear-gradient(135deg,#28D7B5,#49C6FF)"
                            : index === 2
                              ? "linear-gradient(135deg,#49C6FF,#4F6BFF)"
                              : "linear-gradient(135deg,#28D7B5,#4F6BFF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {metric.value}
                  </div>
                  <p className="text-[0.69rem] text-white/35">{metric.label}</p>
                </div>
              ))}
            </div>

          </div>
        </Reveal>

        {/* ══ HOSPITAL CARDS ══ */}
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {useCasesLiveProof.hospitals.map((hospital, index) => {
            const accent = ACCENTS[index % ACCENTS.length];
            const logoSrc = HOSPITAL_LOGOS[hospital.name];

            return (
              <Reveal key={hospital.name} delay={0.18 + index * 0.02}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background: `linear-gradient(to right,transparent,${accent.from}70,${accent.to}45,transparent)`,
                    }}
                  />

                  {/* Logo + name + live badge */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-slate-200 dark:ring-white/10">
                      {logoSrc ? (
                        <Image
                          src={logoSrc}
                          alt={hospital.name}
                          width={32}
                          height={32}
                          className="h-8 w-8 object-contain"
                          unoptimized
                        />
                      ) : (
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-md text-[0.6rem] font-bold text-white"
                          style={{
                            background: `linear-gradient(135deg,${accent.from},${accent.to})`,
                          }}
                        >
                          {hospital.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-[0.88rem] font-semibold leading-snug tracking-[-0.02em] text-ink dark:text-frost">
                        {hospital.name}
                      </h3>
                      <div className="mt-0.5 flex items-center gap-1 text-[0.7rem] text-ink-muted dark:text-frost-subtle">
                        <Icon name="map-pin" className="h-3 w-3 flex-none" />
                        {hospital.city}, {hospital.state}
                      </div>
                    </div>

                    <span className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-1.5 py-0.5 font-mono text-[0.52rem] font-bold text-emerald-400">
                      <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                      Live
                    </span>
                  </div>

                  {/* Context tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span
                      className="rounded-full px-2 py-0.5 text-[0.65rem] font-medium"
                      style={{ background: accent.from + "14", color: accent.from }}
                    >
                      {hospital.careContext}
                    </span>
                    <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 text-[0.65rem] text-ink-muted dark:text-frost-subtle">
                      {hospital.deploymentFit}
                    </span>
                  </div>

                  {/* Footer — live since + website */}
                  <div className="mt-3 flex items-center justify-between border-t border-white/[0.05] pt-3 text-[0.68rem]">
                    <span
                      className="font-mono font-bold uppercase tracking-[0.12em]"
                      style={{ color: accent.from }}
                    >
                      Since {hospital.liveSince}
                    </span>
                    <a
                      href={hospital.website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-ink-muted transition-colors hover:text-ink dark:text-frost-subtle dark:hover:text-frost"
                    >
                      {hostname(hospital.website)}
                      <Icon name="arrow-right" className="h-3 w-3" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.36}>
          <p className="mt-4 text-[0.73rem] leading-relaxed text-ink-muted dark:text-frost-subtle">
            {useCasesLiveProof.note}
          </p>
        </Reveal>

      </Container>
    </section>
  );
}
