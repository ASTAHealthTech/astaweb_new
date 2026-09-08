"use client";

import { useEffect, useState, type ComponentType } from "react";
import { sceneState } from "@/lib/scene/state";
import { tierReport, useTier, type Tier } from "@/lib/tier";
import { Aurora } from "@/components/visual/Aurora";

/**
 * The scene's mount point: a fixed layer behind every page.
 *
 * Three.js lives in its own chunk and is only requested once the tier probe
 * says the device can use it — which happens a frame after mount. The headline
 * text is therefore always the largest-contentful paint, never the canvas.
 *
 * The chunk is loaded by hand rather than with next/dynamic, because dynamic()
 * renders nothing and says nothing when the import fails. That is how a missing
 * dependency turns into "the 3D is just not there" with no way to tell whether
 * it broke or is simply subtle — which cost a day.
 */

type CanvasProps = { tier: Tier };

/** Pointer parallax. Passive, and never re-renders. */
function useSceneDrivers(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const onPointer = (e: PointerEvent) => {
      sceneState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      sceneState.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    if (process.env.NODE_ENV === "development") {
      (window as unknown as Record<string, unknown>).__scene = sceneState;
    }

    window.addEventListener("pointermove", onPointer, { passive: true });

    const mq = window.matchMedia("(max-width: 1023px)");
    const onMq = () => { sceneState.phone = mq.matches; };
    onMq();
    mq.addEventListener("change", onMq);

    // `progress` belongs to whichever section holds the camera (useSceneShot).
    // A page-level scroll listener here used to overwrite it with whole-page
    // scroll every frame, which is why pinned builds crawled.
    return () => {
      window.removeEventListener("pointermove", onPointer);
      mq.removeEventListener("change", onMq);
    };
  }, [active]);
}

/**
 * Tier "static" — genuinely no WebGL. Phase 09 replaces these gradients with
 * posters baked from the real scene at build time. Until then it is a faithful
 * stand-in, and it is never an empty box.
 */
function StaticRoom() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-paper"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 40% 34% at 66% 40%, rgba(240,144,48,0.10), transparent 68%)," +
          "radial-gradient(ellipse 52% 42% at 72% 50%, rgba(222,37,136,0.14), transparent 70%)," +
          "radial-gradient(ellipse 42% 36% at 78% 62%, rgba(138,79,224,0.12), transparent 68%)",
      }}
    />
  );
}

/**
 * Development only. Says out loud what the scene decided and why.
 *
 * Every hour lost on this redesign so far has been spent guessing whether the
 * 3D was broken, subtle, or never loaded. This answers that in one glance, on
 * whatever machine is actually in front of you.
 */
function SceneDiagnostic({ chunk }: { chunk: "loading" | "ready" | "failed"; }) {
  const [report, setReport] = useState<ReturnType<typeof tierReport>>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setReport(tierReport());
  }, []);

  if (!report) return null;

  const rows: [string, string][] = [
    ["tier", report.tier],
    ["3D chunk", chunk],
    ["webgl2", report.webgl2 ? "yes" : "NO"],
    ["gpu", report.renderer.slice(0, 42)],
    ["reduced motion", report.reducedMotion ? "yes" : "no"],
    ["save data", report.saveData ? "yes" : "no"],
    ["cores / memory", `${report.cores} / ${report.memory}GB`],
  ];

  return (
    <div className="fixed bottom-3 right-3 z-50 max-w-[19rem] rounded-card border border-hairline bg-panel/95">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left"
      >
        <span
          className={
            chunk === "ready"
              ? "h-1.5 w-1.5 rounded-pill bg-ok"
              : chunk === "failed"
                ? "h-1.5 w-1.5 rounded-pill bg-alarm"
                : "h-1.5 w-1.5 rounded-pill bg-watch"
          }
        />
        <span className="machine flex-1 text-ink-2">scene · {report.tier}</span>
        <span className="machine text-ink-3">{open ? "hide" : "show"}</span>
      </button>

      {open ? (
        <div className="border-t border-hairline px-3 py-2.5">
          <dl className="space-y-1">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3">
                <dt className="machine text-ink-3">{k}</dt>
                <dd className="truncate font-machine text-[11px] text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2.5 border-t border-hairline pt-2 text-[11px] leading-snug text-ink-3">
            {chunk === "failed"
              ? "The 3D chunk failed to load. Run npm install — the dependency list changed."
              : report.tier === "static"
                ? "No WebGL on this browser, so the scene is the flat fallback."
                : "Force a tier with ?tier=full, ?tier=reduced or ?tier=static."}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function SceneRoot() {
  const tier = useTier();
  const active = tier !== "static";

  const [Canvas, setCanvas] = useState<ComponentType<CanvasProps> | null>(null);
  const [chunk, setChunk] = useState<"loading" | "ready" | "failed">("loading");

  useSceneDrivers(active);

  useEffect(() => {
    if (!active) return;
    let alive = true;

    import("./SceneCanvas")
      .then((m) => {
        if (!alive) return;
        setCanvas(() => m.default);
        setChunk("ready");
      })
      .catch((err) => {
        if (!alive) return;
        setChunk("failed");
        console.error(
          "[scene] The 3D chunk failed to load. Run `npm install` — the " +
            "dependency list changed. Falling back to the flat scene.",
          err
        );
      });

    return () => {
      alive = false;
    };
  }, [active]);

  const dev = process.env.NODE_ENV === "development";

  return (
    <>
      {active && Canvas ? (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-paper">
          {/* The brand's light: the original aurora, turned down so it lights
              the ground without competing with the drawing on top of it. */}
          <Aurora className="absolute inset-0 opacity-[0.55]" />
          <div className="absolute inset-0">
            <Canvas tier={tier} />
          </div>
        </div>
      ) : (
        <StaticRoom />
      )}
      {dev ? <SceneDiagnostic chunk={active ? chunk : "ready"} /> : null}
    </>
  );
}
