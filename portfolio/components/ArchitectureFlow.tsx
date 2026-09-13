"use client";

import { useState } from "react";

interface Layer {
  label: string;
  detail: string;
}

export default function ArchitectureFlow({ layers }: { layers: Layer[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="rounded-xl border border-line bg-surface p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <p className="font-mono text-[12px] text-faint">system flow</p>
        <p className="font-mono text-[11px] text-faint">tap a layer</p>
      </div>
      <div className="flex flex-col">
        {layers.map((layer, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={layer.label}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                data-cursor="expand"
                className="group flex w-full items-center gap-4 text-left"
              >
                <span className="font-mono text-[12px] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className={`flex-1 rounded-lg border px-4 py-3 transition-colors ${
                    isOpen
                      ? "border-signal/50 bg-signal/[0.06]"
                      : "border-line bg-surface2 group-hover:border-faint"
                  }`}
                >
                  <p className="text-[13.5px] text-ink">{layer.label}</p>
                </div>
                <span
                  className={`shrink-0 font-mono text-[13px] text-faint transition-transform ${
                    isOpen ? "rotate-45 text-signal" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              <div className={`details-panel ${isOpen ? "is-open" : ""}`}>
                <div>
                  <p className="ml-[2.6rem] mr-8 py-3 text-[12.5px] leading-relaxed text-muted">
                    {layer.detail}
                  </p>
                </div>
              </div>

              {i < layers.length - 1 && (
                <div
                  className="ml-[1.05rem] my-1.5 h-4 border-l border-dashed border-line"
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
