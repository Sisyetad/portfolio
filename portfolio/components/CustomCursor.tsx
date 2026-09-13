"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "link" | "project" | "expand" | "drag" | "image";

const RING_SIZE: Record<CursorMode, number> = {
  default: 28,
  link: 44,
  project: 68,
  expand: 40,
  drag: 52,
  image: 60,
};

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number>();

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const wantsReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isCoarsePointer || wantsReducedMotion) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    function onMove(e: MouseEvent) {
      target.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    }

    function resolveMode(el: Element | null): { mode: CursorMode; label: string | null } {
      const node = el?.closest<HTMLElement>("[data-cursor]");
      if (!node) return { mode: "default", label: null };
      const m = (node.getAttribute("data-cursor") as CursorMode) || "default";
      const l = node.getAttribute("data-cursor-label");
      return { mode: m, label: l };
    }

    function onOver(e: MouseEvent) {
      const { mode: m, label: l } = resolveMode(e.target as Element);
      setMode(m);
      setLabel(l);
    }

    function onDown() {
      setPressed(true);
    }
    function onUp() {
      setPressed(false);
    }
    function onLeaveWindow() {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    }
    function onEnterWindow() {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    function tick() {
      // Ring lags slightly behind the dot for a soft, weighted feel.
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      if (raf.current) cancelAnimationFrame(raf.current);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  const size = RING_SIZE[mode];
  const showLabel = mode === "project" && label;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-signal transition-opacity duration-150"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border transition-[width,height,border-color,background-color] duration-200 ease-out"
        style={{
          width: size,
          height: size,
          willChange: "transform",
          borderColor: mode === "default" ? "rgba(79,209,197,0.5)" : "rgba(79,209,197,0.9)",
          backgroundColor:
            mode === "project" || mode === "drag" || mode === "image"
              ? "rgba(79,209,197,0.08)"
              : "transparent",
          transform: pressed ? undefined : undefined,
          scale: pressed ? "0.85" : "1",
        }}
      >
        {showLabel && (
          <span className="font-mono text-[10px] uppercase tracking-wide text-signal">
            {label}
          </span>
        )}
        {mode === "expand" && (
          <span className="font-mono text-[13px] text-signal">+</span>
        )}
        {mode === "drag" && (
          <span className="font-mono text-[9px] uppercase tracking-wide text-signal">
            drag
          </span>
        )}
      </div>
    </>
  );
}
