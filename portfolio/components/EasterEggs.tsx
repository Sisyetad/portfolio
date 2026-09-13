"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function EasterEggs() {
  const router = useRouter();
  const buffer = useRef("");

  useEffect(() => {
    console.log(
      "%cLooking at the source? Good instinct.",
      "color:#4FD1C5; font-family: monospace; font-size: 13px;"
    );
    console.log(
      "%cType 'play' anywhere on the page for the experimental corner.",
      "color:#8A95A3; font-family: monospace; font-size: 12px;"
    );

    function onKeyDown(e: KeyboardEvent) {
      // Ignore typing while a form field is focused.
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key.length === 1) {
        buffer.current = (buffer.current + e.key.toLowerCase()).slice(-4);
        if (buffer.current === "play") {
          buffer.current = "";
          router.push("/play");
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return null;
}
