"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ScrollScaleProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function ScrollScale({ children, className, intensity = 0.05 }: ScrollScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1 - intensity);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Start scaling when it enters the bottom of the screen
      const startTrigger = windowHeight;
      // Finish scaling when it reaches the middle of the screen
      const endTrigger = windowHeight * 0.5;
      
      let progress = (startTrigger - rect.top) / (startTrigger - endTrigger);
      progress = Math.max(0, Math.min(1, progress));
      
      // Calculate actual scale based on intensity
      const currentScale = (1 - intensity) + (intensity * progress);
      setScale(currentScale);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [intensity]);

  return (
    <div
      ref={ref}
      className={cn("transition-transform duration-150 ease-out", className)}
      style={{
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </div>
  );
}
