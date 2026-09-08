"use client";

import { useEffect, useRef, useState } from "react";
import { registerAnchor, type GroundKind } from "@/lib/scene/anchors";
import { pedestal, resetPedestal } from "@/lib/scene/pedestal";
import { cn } from "@/lib/cn";

/**
 * The pedestal's DOM half: the box the object is placed in, and the surface
 * the user operates it through.
 *
 *   drag          rotates the object (the shared camera never moves)
 *   wheel         zooms, within limits
 *   double-click  resets view and explode
 *   idle 3 s      the object resumes its slow spin
 *   Explode       takes it apart with labels; once, shortly after it builds,
 *                 it breathes apart a little on its own so people know it can
 */
export function Pedestal({ kind, className, hint = "drag · zoom · 2×click", initialYaw = 0 }: { kind: GroundKind; className?: string; hint?: string; /** where the slow spin starts from, radians */ initialYaw?: number }) {
  const box = useRef<HTMLDivElement>(null);
  const [exploded, setExploded] = useState(false);
  const touched = useRef(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    resetPedestal();
    pedestal.rotY = initialYaw;
    const off = registerAnchor(el, kind);

    let lastX = 0;
    let downX = 0, downY = 0;
    const down = (e: PointerEvent) => {
      pedestal.dragging = true;
      pedestal.lastInput = performance.now();
      touched.current = true;
      lastX = e.clientX;
      downX = e.clientX; downY = e.clientY;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!pedestal.dragging) return;
      pedestal.rotY += (e.clientX - lastX) * 0.01;
      lastX = e.clientX;
      pedestal.lastInput = performance.now();
    };
    const up = (e: PointerEvent) => {
      pedestal.dragging = false;
      pedestal.lastInput = performance.now();
      el.releasePointerCapture(e.pointerId);
      el.style.cursor = "grab";
      // a press that did not drag is a click on the object
      if (Math.hypot(e.clientX - downX, e.clientY - downY) < 5) pedestal.click = { x: e.clientX, y: e.clientY };
    };
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      pedestal.zoom = Math.max(0.75, Math.min(1.35, pedestal.zoom - e.deltaY * 0.0012));
      pedestal.lastInput = performance.now();
      touched.current = true;
    };
    const dbl = () => {
      resetPedestal();
      pedestal.rotY = initialYaw;
      setExploded(false);
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("wheel", wheel, { passive: false });
    el.addEventListener("dblclick", dbl);

    // the breath: a small explode and back, once, if nobody has touched it
    const t1 = window.setTimeout(() => { if (!touched.current) pedestal.explodeTarget = 0.35; }, 3200);
    const t2 = window.setTimeout(() => { if (!touched.current) pedestal.explodeTarget = 0; }, 5200);

    return () => {
      off();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("wheel", wheel);
      el.removeEventListener("dblclick", dbl);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [kind, initialYaw]);

  const toggle = () => {
    touched.current = true;
    const next = !exploded;
    setExploded(next);
    pedestal.explodeTarget = next ? 1 : 0;
    pedestal.lastInput = performance.now();
  };

  return (
    <div className={cn("relative", className)}>
      <div ref={box} className="aspect-[5/4] w-full touch-pan-y select-none" style={{ cursor: "grab" }} aria-label="3D model — drag to rotate" role="img" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={exploded}
        className={cn(
          "machine absolute right-0 top-0 rounded-pill border px-3.5 py-1.5 transition-colors",
          exploded ? "border-violet/70 bg-violet/20 text-ink" : "border-hairline-strong text-ink-2 hover:text-ink"
        )}
      >
        {exploded ? "Assemble" : "Explode view"}
      </button>
      <div className="machine pointer-events-none absolute bottom-0 right-0 text-ink-3">{hint}</div>
    </div>
  );
}
