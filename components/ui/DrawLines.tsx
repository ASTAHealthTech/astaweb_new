"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface DrawLinesProps {
  horizontal?: boolean;
  className?: string;
  delay?: number;
}

export function DrawLines({ horizontal = false, className, delay = 0 }: DrawLinesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // The animation starts when the element enters the bottom 90% of the screen
      // and completes by the time it reaches the top 30% of the screen.
      const startTrigger = windowHeight * 0.9;
      const endTrigger = windowHeight * 0.3;
      
      let currentProgress = (startTrigger - rect.top) / (startTrigger - endTrigger);
      
      // Clamp between 0 and 1
      currentProgress = Math.max(0, Math.min(1, currentProgress));
      
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-10 pointer-events-none",
        horizontal ? "left-0 h-px w-full" : "top-0 w-px h-full",
        className
      )}
    >
      <div
        className={cn(
          "w-full h-full bg-border dark:bg-night-edge transition-transform duration-150 ease-out",
          horizontal ? "origin-left" : "origin-top"
        )}
        style={{
          transform: horizontal ? `scaleX(${progress})` : `scaleY(${progress})`,
        }}
      />
    </div>
  );
}
