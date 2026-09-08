"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * A card that tilts toward the pointer and settles back — the club site's
 * portrait hover, kept small (±5°). Pure CSS transforms; no library.
 */
export function Tilt({ children, className, max = 5 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateY(-2px)`;
    el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("relative h-full transition-transform duration-300 ease-out will-change-transform [transform-style:preserve-3d]", className)}
    >
      {/* a violet plinth glow that follows the pointer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-card opacity-0 transition-opacity duration-300 [.group:hover_&]:opacity-100"
        style={{ background: "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(138,79,224,0.18), transparent 70%)" }}
      />
      {children}
    </div>
  );
}
