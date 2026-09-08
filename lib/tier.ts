"use client";

import { useEffect, useState } from "react";

/**
 * Device tiering for the Vigil scene.
 *
 *  full     — discrete GPU / many cores / good connection. The whole room.
 *  reduced  — integrated graphics, few cores, or mobile. Half-res, no fog,
 *             particle counts cut hard.
 *  static   — no WebGL, reduced-motion, or data-saver. Pre-baked posters of
 *             each camera framing. Never an empty box.
 *
 * SSR and first paint ALWAYS report "static". The tier only upgrades after
 * mount, which keeps hydration deterministic and guarantees the canvas can
 * never become the largest-contentful paint.
 */

export type Tier = "full" | "reduced" | "static";

/**
 * Software rasterisers. These used to fall all the way back to "static" — no
 * 3D at all — which was far too harsh: the scene is four draw calls and runs
 * perfectly well on SwiftShader. Chrome quietly drops to the Microsoft Basic
 * Render Driver whenever hardware acceleration is off or a driver is
 * blocklisted, which is common on work laptops, so refusing to render there
 * meant a lot of people saw an empty page.
 */
const SOFTWARE_RENDERER = /swiftshader|llvmpipe|software|basic render|microsoft basic/i;

/** One throwaway context, read, then explicitly released. */
function probeGpu(): { webgl2: boolean; renderer: string } {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    if (!gl) return { webgl2: false, renderer: "" };

    let renderer = "";
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    if (ext) {
      renderer = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) ?? "");
    }
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return { webgl2: true, renderer };
  } catch {
    return { webgl2: false, renderer: "" };
  }
}

/** Everything the tier decision is based on, for the on-screen diagnostic. */
export function tierReport() {
  if (typeof window === "undefined") return null;
  const { webgl2, renderer } = probeGpu();
  const conn = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection;
  return {
    tier: detectTier(),
    webgl2,
    renderer: renderer || "(hidden by browser)",
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    saveData: Boolean(conn?.saveData),
    effectiveType: conn?.effectiveType ?? "—",
    cores: navigator.hardwareConcurrency ?? 0,
    memory: (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 0,
    dpr: Math.round(window.devicePixelRatio * 100) / 100,
  };
}

export function detectTier(): Tier {
  if (typeof window === "undefined") return "static";

  // QA override: ?tier=full | reduced | static. Lets you check on a real
  // hospital desktop what the other two tiers actually look like, instead of
  // guessing from a laptop that always reports "full".
  const forced = new URLSearchParams(window.location.search).get("tier");
  if (forced === "full" || forced === "reduced" || forced === "static") {
    return forced;
  }

  // Reduced motion used to return "static" here, which removed the model from
  // the page entirely. That is the wrong reading of the preference: it asks for
  // less movement, not less content — and on Windows the "animation effects"
  // toggle sets it for a great many people who have no idea they have asked for
  // anything. The scene still renders; it just stops moving.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return probeGpu().webgl2 ? "reduced" : "static";
  }

  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (conn?.saveData) return "static";
  if (conn?.effectiveType && /^(slow-)?2g$/.test(conn.effectiveType)) return "static";

  const { webgl2, renderer } = probeGpu();
  // Only a browser that genuinely cannot do WebGL gets the flat fallback.
  if (!webgl2) return "static";
  if (renderer && SOFTWARE_RENDERER.test(renderer)) return "reduced";

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  if (cores <= 4 || memory < 4 || coarse) return "reduced";

  return "full";
}

/** Per-tier scene budget. One place, so no component invents its own numbers. */
export const TIER_BUDGET = {
  full: { dpr: [1, 2] as [number, number], fog: true, particles: 1, shadows: false },
  reduced: { dpr: [0.75, 1] as [number, number], fog: false, particles: 0.3, shadows: false },
  static: { dpr: [1, 1] as [number, number], fog: false, particles: 0, shadows: false },
} as const;

export function useTier(): Tier {
  const [tier, setTier] = useState<Tier>("static");

  useEffect(() => {
    // One frame after mount, so the tier probe never competes with first paint.
    const id = requestAnimationFrame(() => setTier(detectTier()));

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setTier(detectTier());
    mq.addEventListener("change", onChange);

    return () => {
      cancelAnimationFrame(id);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  return tier;
}
