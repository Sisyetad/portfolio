"use client";

import { useEffect, useRef, useState } from "react";
import { FiEye } from "react-icons/fi";

const STORAGE_KEY = "portfolio_visitor_seen";

/**
 * Reads (or creates) a "have we already counted this browser" flag in
 * localStorage. Returns whether this is the first time this browser has
 * ever loaded the page, so we only increment the counter once per visitor,
 * not once per page reload.
 */
function isFirstVisitOnThisBrowser(): boolean {
  try {
    if (window.localStorage.getItem(STORAGE_KEY)) return false;
    window.localStorage.setItem(STORAGE_KEY, "1");
    return true;
  } catch {
    // localStorage unavailable (private browsing, disabled storage, etc.) —
    // fall back to just displaying the count without incrementing, so we
    // never risk over-counting when we can't track uniqueness.
    return false;
  }
}

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    // Guard against React StrictMode's intentional double-invoke of effects
    // in development, which would otherwise double-count a single visit.
    if (hasRun.current) return;
    hasRun.current = true;

    const shouldIncrement = isFirstVisitOnThisBrowser();

    (async () => {
      try {
        const res = await fetch("/api/visitor-count", {
          method: shouldIncrement ? "POST" : "GET",
        });
        if (!res.ok) return;
        const data = (await res.json()) as { count: number };
        setCount(data.count);
      } catch {
        // Counter is decorative — fail silently rather than disrupt the page.
      }
    })();
  }, []);

  return (
    <span
      className="inline-flex items-center gap-1.5 text-[12px] text-faint"
      aria-live="polite"
      aria-label="Site visitor count"
    >
      <FiEye className="h-3.5 w-3.5" aria-hidden="true" />
      {count === null ? "Loading visitors…" : `${count.toLocaleString()} visitors`}
    </span>
  );
}
