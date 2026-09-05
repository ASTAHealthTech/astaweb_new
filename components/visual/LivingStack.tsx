"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * VARIANT B — "Living stack"
 * The three intelligence layers as glass planes in isometric 3D, joined by
 * data-beams (brand-gradient strokes with flowing dashes) and slow glowing
 * pulses travelling the connectors. Layered idle float + breathing glow.
 * Reduced motion: static planes, drawn beams, no travel.
 */

/* Frame is a fixed 620 x 560 coordinate space (wrapper keeps this aspect),
   so HTML plane positions (%) and SVG beam paths (viewBox px) stay aligned. */
const FRAME_W = 620;
const FRAME_H = 560;

/* Three near-vertical beams following the diagonal spine of the stack. */
const BEAMS = [
  // routed through the three plane centers (~391,102 / ~320,258 / ~249,414)
  "M 459 -15 C 435 40, 417 58, 391 100 C 361 148, 343 210, 320 258 C 297 306, 273 366, 249 414 C 225 462, 203 518, 189 575",
  "M 433 -15 C 411 34, 393 48, 367 88 C 339 138, 319 198, 296 246 C 273 294, 249 354, 225 402 C 203 448, 183 508, 169 575",
  "M 483 -15 C 459 50, 441 70, 415 111 C 385 160, 367 222, 344 269 C 321 317, 297 377, 273 425 C 249 473, 227 530, 213 575",
] as const;

/* Pulse dots: [path index, dur seconds, begin seconds, core hex] */
const PULSES: readonly [number, number, number, string][] = [
  [0, 6.4, -1.2, "#FFC98A"],
  [1, 7.6, -4.0, "#FF7DBE"],
  [2, 6.9, -2.6, "#C7A4F4"],
  [0, 6.4, -4.4, "#FF7DBE"],
  [1, 7.6, -0.4, "#FFC98A"],
  [2, 6.9, -5.5, "#FF7DBE"],
];

const PLANES = [
  { id: "01", name: "Computer vision", left: "30%", top: "4.5%" },
  { id: "02", name: "PPLM reasoning", left: "18.5%", top: "32.5%" },
  { id: "03", name: "Clinical output", left: "7%", top: "60.5%" },
] as const;

export function LivingStack() {
  const reduced = useReducedMotion();

  return (
    <div
      className="relative mx-auto w-full max-w-[620px]"
      style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
    >
      {/* ————— breathing glow behind the stack ————— */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={reduced ? undefined : { opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
        style={{ opacity: reduced ? 0.65 : undefined }}
      >
        <div className="absolute left-[42%] top-[30%] h-[44%] w-[52%] rounded-pill bg-accent/25 blur-[90px]" />
        <div className="absolute left-[22%] top-[48%] h-[42%] w-[50%] rounded-pill bg-violet/25 blur-[110px]" />
        <div className="absolute left-[56%] top-[6%] h-[26%] w-[34%] rounded-pill bg-amber/15 blur-[80px]" />
      </motion.div>

      {/* ————— beams (behind the planes) ————— */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${FRAME_W} ${FRAME_H}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="lsb-brand" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0" stopColor="#F09030" />
            <stop offset="0.48" stopColor="#DE2588" />
            <stop offset="1" stopColor="#8A4FE0" />
          </linearGradient>
          <linearGradient id="lsb-spark" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#F09030" />
            <stop offset="0.55" stopColor="#DE2588" />
            <stop offset="1" stopColor="#8A4FE0" />
          </linearGradient>
          <linearGradient id="lsb-fadegrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#000" />
            <stop offset="0.09" stopColor="#fff" />
            <stop offset="0.86" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <mask id="lsb-fade" maskUnits="userSpaceOnUse" x="0" y="-20" width={FRAME_W} height={FRAME_H + 40}>
            <rect x="0" y="-20" width={FRAME_W} height={FRAME_H + 40} fill="url(#lsb-fadegrad)" />
          </mask>
          <radialGradient id="lsb-halo">
            <stop offset="0" stopColor="#DE2588" stopOpacity="0.75" />
            <stop offset="0.5" stopColor="#DE2588" stopOpacity="0.28" />
            <stop offset="1" stopColor="#DE2588" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g mask="url(#lsb-fade)">
          {BEAMS.map((d, i) => (
            <g key={i}>
              {/* faint continuous rail */}
              <path d={d} stroke="url(#lsb-brand)" strokeWidth="1.2" opacity="0.38" />
              {/* flowing dashes */}
              <path
                d={d}
                stroke="url(#lsb-brand)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="5 13"
                strokeDashoffset={reduced ? 6 * i : 0}
                opacity="0.9"
              >
                {!reduced && (
                  <animate
                    attributeName="stroke-dashoffset"
                    from={`${-18 * i}`}
                    to={`${-18 * i - 180}`}
                    dur={`${10 + i * 2.4}s`}
                    repeatCount="indefinite"
                  />
                )}
              </path>
            </g>
          ))}
        </g>
      </svg>

      {/* ————— the three glass planes ————— */}
      {PLANES.map((p, i) => (
        <motion.div
          key={p.id}
          className="absolute w-[66%]"
          style={{ left: p.left, top: p.top, zIndex: 10 + i }}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 52 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: "spring", stiffness: 56, damping: 15, delay: 0.1 + i * 0.16 }}
        >
          <motion.div
            animate={reduced ? undefined : { y: [0, -7, 0] }}
            transition={{
              duration: 7 + i * 1.7,
              ease: "easeInOut",
              repeat: Infinity,
              delay: i * 1.1,
            }}
          >
            <div
              className="relative flex flex-col justify-between overflow-hidden rounded-card border border-hairline bg-surface/70 p-4 backdrop-blur-md sm:p-5"
              style={{
                aspectRatio: "400 / 152",
                transform: "perspective(1300px) rotateX(52deg) rotateZ(-36deg)",
                boxShadow:
                  i === 1
                    ? "inset 0 1px 0 rgba(246,242,248,0.09), 0 24px 56px rgba(0,0,0,0.5), 0 0 44px rgba(222,37,136,0.14)"
                    : "inset 0 1px 0 rgba(246,242,248,0.09), 0 24px 56px rgba(0,0,0,0.5)",
              }}
            >
              {/* gradient lip on the plane's top edge + glass sheen */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-gradient opacity-60"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ink/[0.05] via-transparent to-transparent"
              />

              <div className="flex items-baseline gap-2.5 sm:gap-3">
                <span className="tnum font-display text-[11px] text-ink-3 sm:text-label">{p.id}</span>
                <span className="font-display text-[15px] tracking-[-0.01em] text-ink sm:text-title-sm">
                  {p.name}
                </span>
              </div>

              {i === 0 && (
                <div className="flex items-end justify-between">
                  <div className="flex gap-3 font-machine text-[10px] lowercase text-ink-3 sm:gap-4 sm:text-machine">
                    <span>
                      hr <span className="tnum text-ink">072</span>
                    </span>
                    <span>
                      spo2 <span className="tnum text-ink">098</span>
                    </span>
                    <span>
                      rr <span className="tnum text-ink">16</span>
                    </span>
                  </div>
                  {/* detection reticle */}
                  <span className="relative hidden h-6 w-11 items-center justify-center border border-amber/40 sm:flex">
                    <span className="absolute h-1.5 w-1.5 rounded-pill bg-amber" />
                    {!reduced && (
                      <span className="absolute h-1.5 w-1.5 rounded-pill bg-amber animate-live-ping" />
                    )}
                  </span>
                </div>
              )}

              {i === 1 && (
                <div className="flex items-end justify-between">
                  <svg viewBox="0 0 132 26" fill="none" className="h-5 w-28 sm:h-6 sm:w-32">
                    <path
                      d="M0 19 L13 17 L21 20 L32 9 L43 15 L55 5 L66 12 L78 8 L88 11"
                      stroke="url(#lsb-spark)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M88 11 L100 14 L114 7 L132 10"
                      stroke="#8A4FE0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="2 4"
                      opacity="0.75"
                    />
                  </svg>
                  <span className="hidden font-machine text-[10px] lowercase text-ink-3 sm:inline sm:text-machine">
                    pplm · forecasting
                  </span>
                </div>
              )}

              {i === 2 && (
                <div className="flex items-center justify-between gap-3">
                  <p className="whitespace-nowrap font-body text-[11px] leading-snug text-ink-2 sm:text-[12.5px]">
                    Escalation advised
                    <span className="hidden sm:inline">
                      {" "}
                      — <span className="text-ink">12-lead ECG</span>
                    </span>
                  </p>
                  <span className="tnum shrink-0 rounded-pill border border-hairline-strong px-2 py-0.5 font-display text-[10px] text-ink sm:text-[11px]">
                    74%
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* ————— light travelling over the glass + pulses (in front) ————— */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
        viewBox={`0 0 ${FRAME_W} ${FRAME_H}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {BEAMS.map((d, i) => (
            <path key={i} id={`lsb-beam-${i}`} d={d} />
          ))}
        </defs>
        <g mask="url(#lsb-fade)">
          {/* faint continuation of the flow across the plane surfaces */}
          {BEAMS.map((d, i) => (
            <path
              key={`over-${i}`}
              d={d}
              stroke="url(#lsb-brand)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="5 13"
              strokeDashoffset={reduced ? 6 * i : 0}
              opacity="0.32"
            >
              {!reduced && (
                <animate
                  attributeName="stroke-dashoffset"
                  from={`${-18 * i}`}
                  to={`${-18 * i - 180}`}
                  dur={`${10 + i * 2.4}s`}
                  repeatCount="indefinite"
                />
              )}
            </path>
          ))}
          {!reduced &&
            PULSES.map(([beam, dur, begin, core], i) => (
              <g key={i}>
                <animateMotion
                  dur={`${dur}s`}
                  begin={`${begin}s`}
                  repeatCount="indefinite"
                  rotate="0"
                >
                  <mpath href={`#lsb-beam-${beam}`} />
                </animateMotion>
                <circle r="9" fill="url(#lsb-halo)" />
                <circle r="2.1" fill={core} />
              </g>
            ))}
        </g>
      </svg>
    </div>
  );
}
