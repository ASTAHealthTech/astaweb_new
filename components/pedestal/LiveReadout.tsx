"use client";

import { useEffect, useState } from "react";
import { pedestal, type PedestalControls } from "@/lib/scene/pedestal";

/** Rows derived from the live controls, refreshed ten times a second. */
export function LiveReadout({ derive }: { derive: (c: PedestalControls) => [string, string, string?][] }) {
  const [rows, setRows] = useState(() => derive(pedestal.controls));
  useEffect(() => {
    const id = setInterval(() => setRows(derive(pedestal.controls)), 100);
    return () => clearInterval(id);
  }, [derive]);
  return (
    <dl className="border-t border-hairline pt-3">
      {rows.map(([k, v, tone]) => (
        <div key={k} className="flex items-baseline justify-between gap-6 py-1.5">
          <dt className="machine text-ink-3">{k}</dt>
          <dd className="text-right font-machine text-[12.5px] tabular-nums" style={{ color: tone ?? "#F6F2F8" }}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
