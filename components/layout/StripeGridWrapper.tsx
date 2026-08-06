import React from "react";

export function StripeGridWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full bg-bg dark:bg-night overflow-x-hidden">
      {children}
    </div>
  );
}

export function GridRow({ children, striped = false, showGrid = false }: { children: React.ReactNode; striped?: boolean; showGrid?: boolean }) {
  return (
    <div className={`relative w-full ${striped && showGrid ? 'md:bg-diagonal-stripes' : 'bg-bg dark:bg-night md:bg-transparent'}`}>
      <div className={`mx-auto flex w-full flex-col bg-bg dark:bg-night md:w-[calc(100%-2.5rem)] md:max-w-[1280px] ${showGrid ? 'md:border-x md:border-border/80 dark:md:border-night-edge/80 md:shadow-sm' : ''}`}>
        {children}
      </div>
    </div>
  );
}

export function CrossLine({ dashed = false, showGrid = false }: { dashed?: boolean; showGrid?: boolean }) {
  if (!showGrid) return null;
  return (
    <div className="relative w-full z-0 hidden md:block">
      <div
        className={`absolute top-0 left-1/2 w-[100vw] -translate-x-1/2 pointer-events-none ${dashed
          ? "border-t-2 border-dashed border-border/90 dark:border-night-edge/90 bg-transparent h-0"
          : "h-px bg-border/80 dark:bg-night-edge/80"
          }`}
      />
    </div>
  );
}
