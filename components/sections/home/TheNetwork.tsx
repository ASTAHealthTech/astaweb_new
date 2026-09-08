"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { deployments } from "@/content/home";
import { ROUTES } from "@/lib/constants";

/**
 * §05 — up through the ceiling.
 *
 * The camera leaves the ward and the argument changes scale: this is not one
 * clever night on one bed, it is seven live hospitals across two states.
 *
 * Plotted on real coordinates rather than a map outline. Every deployment ASTA
 * has is inside a four-degree box of southern India, so a national map would be
 * mostly empty space — and a coordinate grid is the same instrument language
 * the rest of the site speaks anyway.
 */

const CITIES: Record<string, { lat: number; lon: number }> = {
  Chennai: { lat: 13.08, lon: 80.27 },
  Chitradurga: { lat: 14.23, lon: 76.4 },
  Bangalore: { lat: 12.97, lon: 77.59 },
  Kumbakonam: { lat: 10.96, lon: 79.39 },
};

const BOUNDS = { latMin: 10.2, latMax: 14.9, lonMin: 75.6, lonMax: 81.2 };

const W = 560;
const H = 470;
const PAD = 46;

function px(lon: number): number {
  return PAD + ((lon - BOUNDS.lonMin) / (BOUNDS.lonMax - BOUNDS.lonMin)) * (W - PAD * 2);
}
function py(lat: number): number {
  return PAD + (1 - (lat - BOUNDS.latMin) / (BOUNDS.latMax - BOUNDS.latMin)) * (H - PAD * 2);
}

type Node = { city: string; lat: number; lon: number; hospitals: string[] };

function buildNodes(): Node[] {
  const byCity = new Map<string, string[]>();
  for (const d of deployments.items) {
    const list = byCity.get(d.city) ?? [];
    list.push(d.name);
    byCity.set(d.city, list);
  }
  return [...byCity.entries()]
    .filter(([city]) => CITIES[city])
    .map(([city, hospitals]) => ({ city, ...CITIES[city], hospitals }))
    .sort((a, b) => b.hospitals.length - a.hospitals.length);
}

export function TheNetwork() {
  const ref = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [lit, setLit] = useState(0);
  const [active, setActive] = useState<string | null>(null);


  const nodes = buildNodes();
  const total = deployments.items.length;

  // Sites light one after another once the plot is on screen — the network
  // assembling rather than arriving.
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        let i = 0;
        const id = setInterval(() => {
          i += 1;
          setLit(i);
          if (i >= nodes.length) clearInterval(id);
        }, 260);
      },
      { threshold: 0.35 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [nodes.length]);

  return (
    <section ref={ref} className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,7,16,0.7) 0%, rgba(10,7,16,0.97) 12%, rgba(10,7,16,0.97) 88%, rgba(10,7,16,0.6) 100%)",
        }}
      />

      <div className="relative py-section-sm">
        <Container wide>
          <div className="flex items-center gap-3">
            <span aria-hidden className="block h-px w-6 bg-hairline-strong" />
            <span className="machine text-ink-3">05</span>
            <span className="machine text-ink-2">{deployments.eyebrow}</span>
          </div>

          <div className="mt-12 grid grid-cols-1 items-center gap-x-14 gap-y-14 lg:grid-cols-12">
            {/* ── the plot ── */}
            <div className="lg:col-span-5">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${W} ${H}`}
                className="w-full"
                role="img"
                aria-label={`${total} live ASTA deployments across ${nodes.length} cities in Tamil Nadu and Karnataka.`}
              >
                {/* degree grid */}
                {[11, 12, 13, 14].map((lat) => (
                  <g key={`lat${lat}`}>
                    <line x1={PAD} x2={W - PAD} y1={py(lat)} y2={py(lat)} stroke="rgba(246,242,248,0.06)" />
                    <text x={8} y={py(lat) + 3.5} fill="#7C7189" fontSize="10" fontFamily="ui-monospace, monospace">
                      {lat}°N
                    </text>
                  </g>
                ))}
                {[76, 77, 78, 79, 80, 81].map((lon) => (
                  <g key={`lon${lon}`}>
                    <line x1={px(lon)} x2={px(lon)} y1={PAD} y2={H - PAD} stroke="rgba(246,242,248,0.06)" />
                    <text
                      x={px(lon)}
                      y={H - PAD + 18}
                      fill="#7C7189"
                      fontSize="10"
                      fontFamily="ui-monospace, monospace"
                      textAnchor="middle"
                    >
                      {lon}°E
                    </text>
                  </g>
                ))}

                {/* every site sees every other one — one platform, one estate */}
                {nodes.map((a, i) =>
                  nodes.slice(i + 1).map((b) => (
                    <line
                      key={`${a.city}-${b.city}`}
                      x1={px(a.lon)}
                      y1={py(a.lat)}
                      x2={px(b.lon)}
                      y2={py(b.lat)}
                      stroke="url(#netline)"
                      strokeWidth="1"
                      opacity={lit >= nodes.length ? 0.55 : 0}
                      style={{ transition: "opacity 900ms ease" }}
                    />
                  ))
                )}

                <defs>
                  <linearGradient id="netline" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F09030" />
                    <stop offset="50%" stopColor="#DE2588" />
                    <stop offset="100%" stopColor="#8A4FE0" />
                  </linearGradient>
                </defs>

                {nodes.map((n, i) => {
                  const on = lit > i;
                  const r = 5 + n.hospitals.length * 2.6;
                  const isActive = active === n.city;
                  return (
                    <g
                      key={n.city}
                      opacity={on ? 1 : 0}
                      style={{ transition: "opacity 700ms ease" }}
                      onMouseEnter={() => setActive(n.city)}
                      onMouseLeave={() => setActive(null)}
                    >
                      <circle
                        cx={px(n.lon)}
                        cy={py(n.lat)}
                        r={r + 11}
                        fill="#DE2588"
                        opacity={isActive ? 0.22 : 0.1}
                        style={{ transition: "opacity 200ms ease" }}
                      />
                      <circle cx={px(n.lon)} cy={py(n.lat)} r={r} fill="#DE2588" />
                      <circle cx={px(n.lon)} cy={py(n.lat)} r={r * 0.42} fill="#FFE9F4" />
                      <text
                        x={px(n.lon) + r + 10}
                        y={py(n.lat) - 2}
                        fill="#F6F2F8"
                        fontSize="13"
                        fontFamily="ui-monospace, monospace"
                      >
                        {n.city}
                      </text>
                      <text
                        x={px(n.lon) + r + 10}
                        y={py(n.lat) + 13}
                        fill="#7C7189"
                        fontSize="11"
                        fontFamily="ui-monospace, monospace"
                      >
                        {n.hospitals.length} {n.hospitals.length === 1 ? "site" : "sites"}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* ── the roll call ── */}
            <div className="lg:col-span-7">
              <h2 className="max-w-[24ch] font-display text-[clamp(1.9rem,2.8vw,2.7rem)] font-semibold leading-[1.12] tracking-[-0.028em] text-balance text-ink">
                {deployments.heading}
              </h2>
              <p className="mt-6 max-w-measure text-body-lg text-pretty text-ink-2">
                {deployments.sub}
              </p>

              <ul className="mt-10 border-t border-hairline">
                {deployments.items.map((d) => (
                  <li
                    key={d.name}
                    onMouseEnter={() => setActive(d.city)}
                    onMouseLeave={() => setActive(null)}
                    className={[
                      "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-hairline py-3.5 transition-colors duration-200",
                      active === d.city ? "bg-surface" : "",
                    ].join(" ")}
                  >
                    <span className="text-[15px] text-ink">{d.name}</span>
                    <span className="machine text-ink-3">
                      {d.city} · {d.state} · live {d.liveSince}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 max-w-measure text-[13.5px] leading-relaxed text-ink-3">
                {deployments.publicNote}
              </p>

              <div className="mt-9">
                <Button href={ROUTES.useCases} variant="secondary">
                  See how each ward uses it
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
