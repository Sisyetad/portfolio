"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

// Isolated from the main bundle: nothing here loads on any other route.
const TearPlayground = dynamic(() => import("@/components/TearPlayground"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto flex aspect-[4/5] w-full max-w-lg items-center justify-center rounded-2xl border border-line bg-surface text-[13px] text-faint">
      loading…
    </div>
  ),
});

export default function PlayPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
      <p className="text-center font-mono text-[13px] text-signal">
        You found the experimental corner.
      </p>
      <h1 className="mt-4 text-center font-display text-2xl text-ink md:text-3xl">
        This page does nothing professional.
      </h1>
      <p className="mx-auto mt-3 max-w-sm text-center text-[14px] text-muted">
        No case studies here — just something to poke at.
      </p>

      <div className="mt-12">
        <TearPlayground />
      </div>

      <div className="mt-14 text-center">
        <Link
          href="/"
          data-cursor="link"
          className="text-[13.5px] text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          ← back to the professional version
        </Link>
      </div>
    </div>
  );
}
