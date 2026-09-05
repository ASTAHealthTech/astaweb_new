"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shared motion vocabulary — the whole site uses exactly three animations:
 *  A. Drawn rule & numbered entry (SectionHeader / Reveal)
 *  B. Ledger tick (LedgerTick / LedgerRow)
 *  C. Capture sweep (home hero instrument + solutions dashboard ONLY)
 * Everything imports springs and viewport config from here; nothing invents
 * its own timing.
 */

export const spring = { type: "spring", stiffness: 120, damping: 20 } as const;
export const springSettle = { type: "spring", stiffness: 120, damping: 22 } as const;
export const ruleEase = [0.22, 1, 0.36, 1] as const;
export const viewportOnce = { once: true, amount: 0.3 } as const;

/** The product's real capture cadence — single source of truth. */
export const CADENCE_MS = 5000;

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

// ── Shared 5s cadence driver ─────────────────────────────────────────────
// One module-level interval serves every subscriber (hero instrument,
// solutions dashboard sweep). The interval only runs while at least one
// subscriber is active (on-screen).

type CadenceCb = () => void;
const subscribers = new Set<CadenceCb>();
let interval: ReturnType<typeof setInterval> | null = null;

function syncInterval() {
  if (subscribers.size > 0 && interval === null) {
    interval = setInterval(() => {
      subscribers.forEach((cb) => cb());
    }, CADENCE_MS);
  } else if (subscribers.size === 0 && interval !== null) {
    clearInterval(interval);
    interval = null;
  }
}

/**
 * Subscribe `cb` to the shared 5s cadence while `ref`'s element is on-screen.
 * Automatically unsubscribes off-screen and on unmount.
 */
export function useSharedCadence(
  ref: React.RefObject<Element | null>,
  cb: CadenceCb,
  enabled = true
) {
  const cbRef = useRef(cb);
  cbRef.current = cb;

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const stable: CadenceCb = () => cbRef.current();
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        subscribers.add(stable);
      } else {
        subscribers.delete(stable);
      }
      syncInterval();
    });
    io.observe(el);
    return () => {
      io.disconnect();
      subscribers.delete(stable);
      syncInterval();
    };
  }, [ref, enabled]);
}

/**
 * sentenceCase with a protected-token allowlist so acronyms survive.
 * Used ONLY for eyebrow display transforms (content files stay untouched).
 */
const PROTECTED = [
  "ASTA", "PPLM", "SaMD", "SAMD", "CV", "OEM", "HL7", "FHIR", "ICU", "HDU",
  "DPDP", "AI", "IT", "EMR", "EHR", "ISO", "CDSCO", "SpO₂", "SpO2", "ENT",
  "MeitY", "IISER", "NIT", "AIC-SEED", "E2E", "QMS", "API", "LCD",
];
export function sentenceCase(s: string): string {
  const lower = s.toLowerCase();
  let out = lower.charAt(0).toUpperCase() + lower.slice(1);
  for (const token of PROTECTED) {
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // word-boundary match so "NIT" never rewrites the middle of "monitor"
    out = out.replace(new RegExp(`(?<![A-Za-z0-9])${escaped}(?![A-Za-z0-9])`, "gi"), token);
  }
  return out;
}
