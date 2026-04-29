import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { capabilities } from "@/content/home";

/* ─── Per-capability colour palettes ──────────────────────── */
const CAP_META = [
  { from: "#4F6BFF", to: "#7C5CFF", glow: "rgba(79,107,255,0.28)",  tag: "Monitoring"  },
  { from: "#28D7B5", to: "#49C6FF", glow: "rgba(40,215,181,0.24)",  tag: "Alerting"    },
  { from: "#7C5CFF", to: "#4F6BFF", glow: "rgba(124,92,255,0.22)",  tag: "Visibility"  },
  { from: "#49C6FF", to: "#28D7B5", glow: "rgba(73,198,255,0.20)",  tag: "Compliance"  },
  { from: "#4F6BFF", to: "#49C6FF", glow: "rgba(79,107,255,0.18)",  tag: "Integration" },
  { from: "#28D7B5", to: "#7C5CFF", glow: "rgba(40,215,181,0.18)",  tag: "Deployment"  },
] as const;

/* ─── Monitor mini-UI data ──────────────────────────────────── */
const VITALS = [
  { label: "HR",   value: "78",     unit: "bpm",  color: "#4F6BFF", bar: 62 },
  { label: "SpO\u2082", value: "97", unit: "%",   color: "#28D7B5", bar: 97 },
  { label: "BP",   value: "124/78", unit: "mmHg", color: "#49C6FF", bar: 54 },
  { label: "RR",   value: "18",     unit: "/min", color: "#7C5CFF", bar: 72 },
  { label: "Temp", value: "37.1",   unit: "\u00b0C", color: "#28D7B5", bar: 68 },
] as const;

const HERO_BULLETS = [
  "Device-agnostic — no new hardware per bed",
  "Sub-2 s signal-to-interpretation latency",
  "Structured vitals at clinical cadence",
] as const;

// 3-beat ECG (viewBox 720 × 60)
const ECG_PATH =
  "M 0 36 H 12 C 14 36 15 30 18 36 H 30 L 32 41 L 34 5 L 36 41 C 37 41 41 36 46 36 C 46 36 52 28 58 28 C 64 28 70 28 76 36 H 240 C 242 36 243 30 246 36 H 258 L 260 41 L 262 5 L 264 41 C 265 41 269 36 274 36 C 274 36 280 28 286 28 C 292 28 298 28 304 36 H 480 C 482 36 483 30 486 36 H 498 L 500 41 L 502 5 L 504 41 C 505 41 509 36 514 36 C 514 36 520 28 526 28 C 532 28 538 28 544 36 H 720";

/* ─── Main section ──────────────────────────────────────────── */
export function Capabilities() {
  const [cap0, cap1, cap2, cap3, cap4, cap5] = capabilities.items;

  return (
    <section
      id="capabilities"
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
        <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-brand-500/[0.04] blur-[140px] dark:bg-brand-500/[0.07]" />
        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-400/[0.03] blur-[130px] dark:bg-cyan-400/[0.05]" />
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.02] blur-[120px] dark:bg-violet-500/[0.04]" />
      </div>

      <Container className="relative">
        {/* ── Header ── */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-cyan-400" />
              {capabilities.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-h2 md:text-h2-lg font-semibold tracking-[-0.04em] text-balance text-ink dark:text-frost">
              {capabilities.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-body-lg text-pretty text-ink-muted dark:text-frost-muted">
              {capabilities.sub}
            </p>
          </Reveal>
        </div>

        {/* ══════════════════════════════════════════════════════
            HERO FEATURE — Real-time monitoring
            Split: left = feature info | right = live monitor visual
        ══════════════════════════════════════════════════════ */}
        <Reveal delay={0.12}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/[0.07]">
            {/* Top gradient rule */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px z-10"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.50),rgba(124,92,255,0.40),transparent)",
              }}
            />

            <div className="grid lg:grid-cols-[2fr_3fr]">
              {/* Left — capability info */}
              <div className="flex flex-col justify-center gap-6 bg-white p-8 dark:bg-white/[0.02] lg:p-10">
                {/* Tag + icon */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-white ring-1 ring-black/[0.04] dark:ring-white/10"
                    style={{
                      background: `linear-gradient(135deg,${CAP_META[0].from},${CAP_META[0].to})`,
                      boxShadow: `0 6px 20px ${CAP_META[0].glow}`,
                    }}
                  >
                    <Icon name={cap0.icon} className="h-5 w-5" />
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em]"
                    style={{
                      background: `${CAP_META[0].from}12`,
                      color: CAP_META[0].from,
                    }}
                  >
                    {CAP_META[0].tag}
                  </span>
                </div>

                {/* Title + body */}
                <div>
                  <h3 className="text-[1.35rem] font-semibold leading-snug tracking-[-0.03em] text-ink dark:text-frost">
                    {cap0.title}
                  </h3>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-ink-muted dark:text-frost-muted">
                    {cap0.body}
                  </p>
                </div>

                {/* Bullet points */}
                <ul className="space-y-2.5">
                  {HERO_BULLETS.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span
                        className="mt-1 h-4 w-4 flex-none rounded-full flex items-center justify-center"
                        style={{ background: `${CAP_META[0].from}18` }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: CAP_META[0].from }} />
                      </span>
                      <span className="text-[0.82rem] leading-relaxed text-ink-muted dark:text-frost-muted">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — live monitor visual */}
              <div className="relative overflow-hidden bg-[#040810] text-white">
                {/* Internal glow blobs */}
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="absolute -left-16 top-8 h-48 w-48 rounded-full bg-brand-500/[0.12] blur-[70px]" />
                  <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-cyan-400/[0.07] blur-[80px]" />
                </div>

                {/* Panel titlebar */}
                <div className="relative flex items-center justify-between border-b border-white/[0.05] px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                      Ward 4 · ICU-04 · Lead II
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden font-mono text-[9px] text-white/20 sm:block">09:42:31</span>
                    <span className="rounded-full border border-emerald-500/25 bg-emerald-500/[0.12] px-2 py-0.5 font-mono text-[8px] font-bold text-emerald-400">
                      LIVE
                    </span>
                  </div>
                </div>

                {/* Scrolling ECG */}
                <div className="relative overflow-hidden">
                  {/* Graph paper — fine */}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
                      backgroundSize: "18px 18px",
                    }}
                  />
                  {/* Graph paper — major */}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.044) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.044) 1px,transparent 1px)",
                      backgroundSize: "90px 90px",
                    }}
                  />
                  {/* Fade masks */}
                  <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8" style={{ background: "linear-gradient(to right,#040810,transparent)" }} />
                  <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14" style={{ background: "linear-gradient(to left,#040810 25%,transparent)" }} />
                  {/* Write cursor */}
                  <div
                    aria-hidden
                    className="absolute right-5 top-1/2 z-20 -translate-y-1/2"
                    style={{ animation: "vitals-tick 0.9s ease-in-out infinite" }}
                  >
                    <div className="h-16 w-0.5 rounded-full bg-brand-400/60" />
                    <div
                      className="absolute -top-0.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand-400"
                      style={{ boxShadow: "0 0 8px #4F6BFF,0 0 16px #4F6BFF60" }}
                    />
                  </div>
                  {/* Scrolling ECG — dual wave */}
                  <div style={{ display: "flex", width: "200%", animation: "ecg-scroll 5s linear infinite" }}>
                    <ECGWave sfx="cap-a" />
                    <ECGWave sfx="cap-b" />
                  </div>
                </div>

                {/* Vitals row */}
                <div className="relative grid grid-cols-5 divide-x divide-white/[0.04] border-t border-white/[0.05]">
                  {VITALS.map((v, i) => (
                    <div key={v.label} className="flex flex-col items-center gap-1 px-2 py-3 sm:py-4">
                      <div className="h-0.5 w-5 rounded-full" style={{ background: v.color }} />
                      <span className="font-mono text-[8px] font-bold uppercase tracking-[0.14em]" style={{ color: v.color }}>
                        {v.label}
                      </span>
                      <span
                        className="font-mono text-[1.15rem] font-bold leading-none text-white"
                        style={{ animation: `vitals-tick ${1.4 + i * 0.3}s ease-in-out infinite` }}
                      >
                        {v.value}
                      </span>
                      <span className="text-[7px] text-white/28">{v.unit}</span>
                      <div className="mt-0.5 h-0.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                        <div className="h-full rounded-full" style={{ width: `${v.bar}%`, background: `linear-gradient(90deg,${v.color}50,${v.color})` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══════════════════════════════════════════════════════
            FEATURE STRIP — 5 remaining capabilities
            No card boxes — icon + title + body with dividers
        ══════════════════════════════════════════════════════ */}
        <Reveal delay={0.18}>
          <div className="relative mt-4 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/[0.07]">
            {/* Top rule */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(40,215,181,0.30),rgba(73,198,255,0.25),transparent)",
              }}
            />

            <div className="grid divide-y divide-slate-100/80 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-5 dark:divide-white/[0.05]">
              {[cap1, cap2, cap3, cap4, cap5].map((item, i) => {
                const meta = CAP_META[i + 1];
                return (
                  <div
                    key={item.title}
                    className="group relative flex flex-col gap-4 overflow-hidden px-6 py-6 transition-colors duration-200 hover:bg-slate-50/70 dark:hover:bg-white/[0.025] sm:px-5 lg:px-6"
                  >
                    {/* Hover glow */}
                    <div
                      aria-hidden
                      className="absolute -right-6 -top-6 h-16 w-16 rounded-full blur-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                      style={{ background: meta.from + "25" }}
                    />

                    {/* Icon */}
                    <div
                      className="relative flex h-10 w-10 flex-none items-center justify-center rounded-xl text-white ring-1 ring-black/[0.04] transition-shadow duration-300 dark:ring-white/[0.08] group-hover:shadow-lg"
                      style={{
                        background: `linear-gradient(135deg,${meta.from},${meta.to})`,
                        boxShadow: `0 4px 12px ${meta.glow}`,
                      }}
                    >
                      <Icon name={item.icon} className="h-4 w-4" />
                    </div>

                    {/* Tag */}
                    <div className="flex items-center gap-2">
                      <span
                        className="rounded-full px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.13em]"
                        style={{ background: `${meta.from}12`, color: meta.from }}
                      >
                        {meta.tag}
                      </span>
                    </div>

                    {/* Text */}
                    <div className="relative">
                      <h3 className="text-[0.92rem] font-semibold tracking-[-0.02em] text-ink dark:text-frost">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[0.78rem] leading-relaxed text-ink-muted dark:text-frost-subtle">
                        {item.body}
                      </p>
                    </div>

                    {/* Bottom accent — hover only */}
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: `linear-gradient(to right,transparent,${meta.from}50,${meta.to}40,transparent)` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ─── ECG wave helper (duplicated for seamless scroll) ──────── */
function ECGWave({ sfx }: { sfx: string }) {
  const gId = `ecg-g-${sfx}`;
  const glId = `ecg-gl-${sfx}`;
  const trId = `ecg-tr-${sfx}`;
  return (
    <svg
      viewBox="0 0 720 60"
      preserveAspectRatio="none"
      style={{ width: "50%", height: 90, flex: "none" }}
    >
      <defs>
        <linearGradient id={gId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#4F6BFF" />
          <stop offset="40%"  stopColor="#7C5CFF" />
          <stop offset="75%"  stopColor="#49C6FF" />
          <stop offset="100%" stopColor="#28D7B5" />
        </linearGradient>
        <filter id={glId} x="-5%" y="-50%" width="110%" height="200%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id={trId} x="-5%" y="-50%" width="110%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
        </filter>
      </defs>
      <line x1="0" y1="36" x2="720" y2="36" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
      <path d={ECG_PATH} fill="none" stroke={`url(#${gId})`} strokeWidth="5"   strokeLinecap="round" strokeLinejoin="round" filter={`url(#${trId})`} opacity="0.20" />
      <path d={ECG_PATH} fill="none" stroke={`url(#${gId})`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${glId})`} />
    </svg>
  );
}
