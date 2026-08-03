"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface Props {
  className?: string;
  radius?: number; // Border radius, defaults to 12 (xl)
}

export function DrawBorders({ className, radius = 12 }: Props) {
  const containerRef = useRef<SVGSVGElement>(null);
  const [progress, setProgress] = useState(1); // 1 = hidden, 0 = fully drawn

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startTrigger = windowHeight * 0.95;
      const endTrigger = windowHeight * 0.55;

      if (rect.top > startTrigger) {
        setProgress(1);
      } else if (rect.top < endTrigger) {
        setProgress(0);
      } else {
        const currentProgress = (rect.top - endTrigger) / (startTrigger - endTrigger);
        setProgress(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <svg
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full text-border dark:text-night-edge", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        rx={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={progress}
        className="transition-all duration-75 ease-linear"
      />
    </svg>
  );
}
