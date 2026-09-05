"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Bezel } from "@/components/ui/Bezel";

export type GlassShot = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  label: string;
  timestamp?: string;
  live?: boolean;
};

/**
 * "Product glass" — the interior-page hero visual. Real product screenshots
 * floating in tilted glass: front card with a slow bob and brand glow, an
 * optional counter-tilted back card, cursor parallax pulling the planes
 * apart. Reduced motion renders the static composition.
 */
export function ProductGlass({
  front,
  back,
  chip = "Live · demo ward",
  priority = false,
}: {
  front: GlassShot;
  back?: GlassShot;
  chip?: string | null;
  priority?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 55, damping: 16, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 55, damping: 16, mass: 0.6 });

  const frontX = useTransform(sx, (v) => v * 12);
  const frontY = useTransform(sy, (v) => v * 9);
  const frontRotY = useTransform(sx, (v) => -10 + v * 5);
  const frontRotX = useTransform(sy, (v) => 3 - v * 4);
  const backX = useTransform(sx, (v) => v * -16);
  const backY = useTransform(sy, (v) => v * -11);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={reduced ? undefined : onPointerMove}
      onPointerLeave={reduced ? undefined : onPointerLeave}
      className="relative w-full"
      style={{ perspective: "1400px" }}
    >
      {/* Brand light source behind the glass group */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-24 -inset-y-16 scale-110 bg-brand-gradient-soft blur-3xl"
      />

      {back && (
        <motion.div
          aria-hidden
          className="absolute -top-8 left-0 z-0 hidden w-[58%] opacity-80 sm:block lg:-top-12"
          style={
            reduced
              ? { rotateY: 9, rotateX: -3 }
              : { x: backX, y: backY, rotateY: 9, rotateX: -3 }
          }
        >
          <Bezel
            label={back.label}
            timestamp={back.timestamp}
            className="rounded-card shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
          >
            <Image
              src={back.src}
              alt=""
              width={back.width}
              height={back.height}
              className="h-auto w-full"
            />
          </Bezel>
        </motion.div>
      )}

      <motion.div
        className={back ? "relative z-10 ml-auto w-full sm:w-[76%]" : "relative z-10 w-full"}
        style={
          reduced
            ? { rotateY: -10, rotateX: 3 }
            : { x: frontX, y: frontY, rotateY: frontRotY, rotateX: frontRotX }
        }
      >
        <motion.div
          animate={reduced ? undefined : { y: [-7, 7] }}
          transition={
            reduced
              ? undefined
              : { duration: 3.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
          }
        >
          <div className="relative">
            <Bezel
              label={front.label}
              timestamp={front.timestamp}
              live={front.live}
              className="rounded-card shadow-glow-brand"
            >
              <Image
                src={front.src}
                alt={front.alt ?? ""}
                width={front.width}
                height={front.height}
                className="h-auto w-full"
                priority={priority}
              />
            </Bezel>

            {chip && (
              <div className="absolute -bottom-4 -left-4 z-20 inline-flex items-center gap-2 rounded-pill border border-hairline-strong bg-paper/85 px-3.5 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <span aria-hidden className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-live-ping rounded-full bg-accent" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span className="font-body text-label text-ink-2">{chip}</span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
