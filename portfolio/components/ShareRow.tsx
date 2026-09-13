"use client";

import { useState } from "react";

export default function ShareRow({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — the Telegram link below still works.
    }
  }

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(title)}`;

  return (
    <div className="mt-3 flex items-center gap-4 text-[12.5px]">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-signal hover:opacity-80"
      >
        Open on Telegram →
      </a>
      <a
        href={telegramShareUrl}
        target="_blank"
        rel="noreferrer"
        className="text-muted transition-colors hover:text-ink"
      >
        Share
      </a>
      <button type="button" onClick={handleCopy} className="text-muted transition-colors hover:text-ink">
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
