"use client";

import { useState } from "react";
import { pedestal, type PedestalControls } from "@/lib/scene/pedestal";
import { cn } from "@/lib/cn";

/**
 * The control panel — the club site's, in ASTA's type. Every control writes
 * straight into the pedestal store; React state here is only for the label.
 */
export function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-card border border-hairline bg-well/70 p-5">
      <div className="machine text-ink-3">{title}</div>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

export function Slider({
  label,
  keyName,
  min,
  max,
  step = 1,
  unit,
  format,
}: {
  label: string;
  keyName: "hr" | "light" | "beds";
  min: number;
  max: number;
  step?: number;
  unit?: string;
  format?: (v: number) => string;
}) {
  const [v, setV] = useState<number>(pedestal.controls[keyName] as number);
  return (
    <label className="block">
      <div className="flex items-baseline justify-between">
        <span className="machine text-ink-2">{label}</span>
        <span className="font-machine text-[13px] tabular-nums text-ink">{format ? format(v) : v}{unit ? <span className="ml-1 text-ink-3">{unit}</span> : null}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={v}
        onChange={(e) => {
          const n = Number(e.target.value);
          setV(n);
          (pedestal.controls as unknown as Record<string, number>)[keyName] = n;
          pedestal.lastInput = performance.now();
        }}
        className="mt-2 w-full accent-[#DE2588]"
      />
    </label>
  );
}

export function Toggle({ label, keyName, on, off }: { label: string; keyName: "deep" | "withAsta" | "night"; on: string; off: string }) {
  const [v, setV] = useState<boolean>(pedestal.controls[keyName]);
  const set = (next: boolean) => {
    setV(next);
    (pedestal.controls as unknown as Record<string, boolean>)[keyName] = next;
    pedestal.lastInput = performance.now();
  };
  return (
    <div>
      <div className="machine text-ink-2">{label}</div>
      <div className="mt-2 grid grid-cols-2 gap-1 rounded-card border border-hairline p-1">
        {[off, on].map((t, i) => {
          const active = (i === 1) === v;
          return (
            <button key={t} type="button" onClick={() => set(i === 1)} aria-pressed={active}
              className={cn("machine rounded-card px-3 py-1.5 transition-colors", active ? "bg-violet/25 text-ink" : "text-ink-3 hover:text-ink-2")}>
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Segmented({ label, keyName, options }: { label: string; keyName: "layout" | "severity" | "spoke"; options: string[] }) {
  const [v, setV] = useState<number>(pedestal.controls[keyName]);
  return (
    <div>
      <div className="machine text-ink-2">{label}</div>
      <div className="mt-2 flex flex-wrap gap-1 rounded-card border border-hairline p-1">
        {options.map((t, i) => (
          <button key={t} type="button" onClick={() => { setV(i); pedestal.controls[keyName] = i; pedestal.lastInput = performance.now(); }} aria-pressed={v === i}
            className={cn("machine rounded-card px-3 py-1.5 transition-colors", v === i ? "bg-violet/25 text-ink" : "text-ink-3 hover:text-ink-2")}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Readout({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="mt-1 border-t border-hairline pt-3">
      {rows.map(([k, val]) => (
        <div key={k} className="flex items-baseline justify-between gap-6 py-1.5">
          <dt className="machine text-ink-3">{k}</dt>
          <dd className="text-right font-machine text-[12.5px] tabular-nums text-ink">{val}</dd>
        </div>
      ))}
    </dl>
  );
}

export type { PedestalControls };
