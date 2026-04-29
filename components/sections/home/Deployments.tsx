import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { deployments } from "@/content/home";

const HOSPITAL_LOGOS: Record<string, string> = {
  "Southern Railway HQ Hospital": "/hospitals/southern-railway.jpg",
  "Karnataka ENT Hospital": "/hospitals/karnataka-ent.jpg",
  "Aksha Hospital": "/hospitals/aksha.png",
  "Seethapathy Clinic": "/hospitals/seethapathy.png",
  "K.S. Hospital": "/hospitals/ks.png",
  "Sugam Hospital": "/hospitals/sugam.png",
  "Anbu Hospital": "/hospitals/anbu.png",
};

const ROW_ACCENTS = [
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

export function Deployments() {
  const states = new Set(deployments.items.map((d) => d.state));
  const cities = new Set(deployments.items.map((d) => d.city));
  const earliest = Math.min(...deployments.items.map((d) => Number(d.liveSince)));

  const STATS = [
    { val: String(deployments.items.length), label: "Live hospitals",  sub: "Named & verified",  color: "#4F6BFF" },
    { val: String(states.size),              label: "States",           sub: "TN + Karnataka",    color: "#28D7B5" },
    { val: String(cities.size),              label: "Cities",           sub: "Operational",       color: "#7C5CFF" },
    { val: String(earliest),                 label: "First go-live",    sub: "Year",              color: "#49C6FF" },
  ];

  return (
    <section
      id="deployments"
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
        <div className="absolute inset-0 hidden dark:block bg-grid-fine bg-[length:44px_44px] opacity-60" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-400/25" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent dark:via-white/[0.06]" />
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-teal-400/[0.03] blur-[140px] dark:bg-teal-400/[0.05]" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-brand-500/[0.03] blur-[120px] dark:bg-brand-500/[0.05]" />
      </div>

      <Container className="relative">

        {/* ══ HEADER ══ */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400" />
              {deployments.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-h2 md:text-h2-lg font-semibold tracking-[-0.04em] text-balance text-ink dark:text-frost">
              {deployments.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-body-lg text-pretty text-ink-muted dark:text-frost-muted">
              {deployments.sub}
            </p>
          </Reveal>
        </div>

        {/* ══ STATS STRIP ══ */}
        <Reveal delay={0.13}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/[0.07]">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.45),rgba(40,215,181,0.35),transparent)",
              }}
            />
            <div className="grid grid-cols-2 divide-x divide-y divide-slate-200/80 lg:grid-cols-4 lg:divide-y-0 dark:divide-white/[0.07]">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="group relative flex flex-col items-center gap-1.5 px-6 py-8 text-center"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%,${s.color}08,transparent 70%)`,
                    }}
                  />
                  <div
                    className="font-mono text-[3rem] font-bold leading-none tracking-[-0.06em]"
                    style={{
                      background: `linear-gradient(135deg,${s.color},${s.color}cc)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.val}
                  </div>
                  <p className="text-[0.78rem] font-medium text-ink dark:text-frost/80">
                    {s.label}
                  </p>
                  <p className="text-[0.70rem] text-ink-muted dark:text-frost-subtle">
                    {s.sub}
                  </p>
                  <div
                    aria-hidden
                    className="absolute inset-x-8 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(to right,transparent,${s.color}60,transparent)`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ══ DEPLOYMENT ROSTER ══ */}
        <Reveal delay={0.17}>
          <div className="relative mt-4 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/[0.07]">
            {/* Top rule */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(40,215,181,0.40),rgba(73,198,255,0.30),transparent)",
              }}
            />

            {/* Title bar */}
            <div className="flex items-center justify-between border-b border-slate-100/80 bg-white px-6 py-3 dark:border-white/[0.05] dark:bg-white/[0.015]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400" />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-subtle dark:text-white/30">
                  Live Deployment Roster
                </span>
              </div>
              <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400/70">
                {deployments.items.length} hospitals &middot; 2 states &middot; operational
              </span>
            </div>

            {/* Hospital rows */}
            <div className="divide-y divide-slate-100/80 dark:divide-white/[0.05]">
              {deployments.items.map((hospital, i) => {
                const acc = ROW_ACCENTS[i];
                const logoSrc = HOSPITAL_LOGOS[hospital.name];
                return (
                  <div
                    key={hospital.name}
                    className="group relative flex items-center gap-5 px-6 py-4 transition-colors hover:bg-slate-50/70 dark:hover:bg-white/[0.025]"
                  >
                    {/* Left accent bar */}
                    <div
                      aria-hidden
                      className="absolute inset-y-3 left-0 w-[3px] rounded-r-full opacity-40 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(to bottom,${acc.from},${acc.to})`,
                      }}
                    />

                    {/* Logo */}
                    <div className="flex h-11 w-11 flex-none items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 dark:ring-white/10">
                      {logoSrc ? (
                        <Image
                          src={logoSrc}
                          alt={hospital.name}
                          width={36}
                          height={36}
                          className="h-9 w-9 object-contain"
                          unoptimized
                        />
                      ) : (
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-[0.65rem] font-bold text-white"
                          style={{
                            background: `linear-gradient(135deg,${acc.from},${acc.to})`,
                          }}
                        >
                          {hospital.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Name + location */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-[0.88rem] font-semibold tracking-[-0.01em] text-ink dark:text-frost">
                          {hospital.name}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200/80 bg-emerald-50 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.10em] text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/[0.08] dark:text-emerald-400">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400" />
                          {hospital.status}
                        </span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-1 text-[0.75rem] text-ink-muted dark:text-frost-subtle">
                        <Icon name="map-pin" className="h-3 w-3 flex-none" />
                        {hospital.city}, {hospital.state}
                      </div>
                    </div>

                    {/* Since + website — hidden on xs */}
                    <div className="hidden items-center gap-6 sm:flex">
                      <span
                        className="font-mono text-[0.72rem] font-medium"
                        style={{ color: acc.from }}
                      >
                        Since {hospital.liveSince}
                      </span>
                      <a
                        href={hospital.website}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-[0.72rem] font-medium text-ink-muted transition-colors hover:text-ink dark:text-frost-subtle dark:hover:text-frost"
                      >
                        {hostname(hospital.website)}
                        <Icon name="arrow-right" className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100/80 bg-slate-50/50 px-6 py-3 dark:border-white/[0.05] dark:bg-white/[0.008]">
              <p className="text-[0.72rem] text-ink-subtle dark:text-white/25">
                {deployments.publicNote}
              </p>
            </div>
          </div>
        </Reveal>

      </Container>
    </section>
  );
}
