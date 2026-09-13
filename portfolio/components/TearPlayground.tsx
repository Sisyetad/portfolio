"use client";

import { useEffect, useRef, useState } from "react";
import { profileImageUrl } from "@/lib/data";

const PROFILE_SRC = profileImageUrl || "/images/profile.jpg";
const FALLBACK_SRC = "/images/profile-placeholder.svg";

const GRID_COLS = 14;
const GRID_ROWS = 18;
const SPRING = 0.09;
const DAMPING = 0.82;
const INFLUENCE_RADIUS = 90;

interface Cell {
  ox: number; // origin x/y within the drawn image
  oy: number;
  dx: number; // current spring offset
  dy: number;
  vx: number;
  vy: number;
}

export default function TearPlayground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const meshCanvasRef = useRef<HTMLCanvasElement>(null);
  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const cellsRef = useRef<Cell[]>([]);
  const rafRef = useRef<number>();
  const drawSizeRef = useRef({ w: 0, h: 0, cw: 0, ch: 0 });

  const pointerDown = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0, t: 0 });

  const [usingFallback, setUsingFallback] = useState(false);
  const [phase, setPhase] = useState<"mesh" | "tearing" | "torn">("mesh");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);

  // ---- load image, build grid, size canvases -----------------------------
  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setReady(true);
    };
    img.onerror = () => {
      if (img.src !== window.location.origin + FALLBACK_SRC && !img.src.endsWith(FALLBACK_SRC)) {
        setUsingFallback(true);
        img.src = FALLBACK_SRC;
      }
    };
    img.src = PROFILE_SRC;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const wrap = wrapRef.current;
    const canvas = meshCanvasRef.current;
    const img = imgRef.current;
    if (!wrap || !canvas || !img) return;

    function layout() {
      const rect = wrap!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const cw = rect.width;
      const ch = rect.height;

      [meshCanvasRef, leftCanvasRef, rightCanvasRef].forEach((ref) => {
        const c = ref.current;
        if (!c) return;
        c.width = cw * dpr;
        c.height = ch * dpr;
        c.style.width = `${cw}px`;
        c.style.height = `${ch}px`;
      });

      // cover-fit the image into cw/ch
      const imgRatio = img!.naturalWidth / img!.naturalHeight;
      const boxRatio = cw / ch;
      let drawW: number, drawH: number;
      if (imgRatio > boxRatio) {
        drawH = ch;
        drawW = ch * imgRatio;
      } else {
        drawW = cw;
        drawH = cw / imgRatio;
      }
      drawSizeRef.current = { w: drawW, h: drawH, cw, ch };

      const cells: Cell[] = [];
      for (let r = 0; r <= GRID_ROWS; r++) {
        for (let c2 = 0; c2 <= GRID_COLS; c2++) {
          cells.push({
            ox: (c2 / GRID_COLS) * drawW,
            oy: (r / GRID_ROWS) * drawH,
            dx: 0,
            dy: 0,
            vx: 0,
            vy: 0,
          });
        }
      }
      cellsRef.current = cells;
    }

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [ready]);

  // ---- animation loop (mesh warp) -----------------------------------------
  useEffect(() => {
    if (!ready || phase !== "mesh") return;
    const canvas = meshCanvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function step() {
      const dpr = canvas!.width / drawSizeRef.current.cw || 1;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, drawSizeRef.current.cw, drawSizeRef.current.ch);

      const { w: drawW, h: drawH, cw, ch } = drawSizeRef.current;
      const offX = (cw - drawW) / 2;
      const offY = (ch - drawH) / 2;
      const tileW = drawW / GRID_COLS;
      const tileH = drawH / GRID_ROWS;
      const sx = img!.naturalWidth / drawW;
      const sy = img!.naturalHeight / drawH;

      const cells = cellsRef.current;
      const active = !reducedMotion;

      for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
          const cell = cells[r * (GRID_COLS + 1) + c];
          if (active) {
            const ax = -SPRING * cell.dx;
            const ay = -SPRING * cell.dy;
            cell.vx = (cell.vx + ax) * DAMPING;
            cell.vy = (cell.vy + ay) * DAMPING;
            cell.dx += cell.vx;
            cell.dy += cell.vy;
          }

          const destX = offX + cell.ox + cell.dx - 1;
          const destY = offY + cell.oy + cell.dy - 1;

          ctx!.drawImage(
            img!,
            cell.ox * sx,
            cell.oy * sy,
            tileW * sx + 2,
            tileH * sy + 2,
            destX,
            destY,
            tileW + 2,
            tileH + 2
          );
        }
      }

      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready, phase, reducedMotion]);

  // ---- pointer interaction -------------------------------------------------
  function toLocal(e: React.PointerEvent) {
    const rect = wrapRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function onPointerDown(e: React.PointerEvent) {
    if (phase !== "mesh") return;
    (e.target as Element).setPointerCapture(e.pointerId);
    pointerDown.current = true;
    const p = toLocal(e);
    lastPointer.current = p;
    dragStart.current = { x: p.x, y: p.y, t: performance.now() };
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!pointerDown.current || phase !== "mesh") return;
    const p = toLocal(e);
    const delta = { x: p.x - lastPointer.current.x, y: p.y - lastPointer.current.y };
    lastPointer.current = p;

    if (!reducedMotion) {
      const cells = cellsRef.current;
      for (const cell of cells) {
        const cx = cell.ox + cell.dx;
        const cy = cell.oy + cell.dy;
        const dist = Math.hypot(p.x - cx, p.y - cy);
        if (dist < INFLUENCE_RADIUS) {
          const falloff = 1 - dist / INFLUENCE_RADIUS;
          cell.vx += delta.x * falloff * 0.55;
          cell.vy += delta.y * falloff * 0.55;
        }
      }
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!pointerDown.current) return;
    pointerDown.current = false;
    const p = toLocal(e);
    const totalDX = p.x - dragStart.current.x;
    const elapsed = performance.now() - dragStart.current.t;

    const isSwipe = Math.abs(totalDX) > 130 && elapsed < 1400;
    if (isSwipe) {
      triggerTear(dragStart.current.x);
    }
  }

  function triggerTear(splitX: number) {
    const img = imgRef.current;
    const left = leftCanvasRef.current;
    const right = rightCanvasRef.current;
    if (!img || !left || !right) return;

    const { w: drawW, h: drawH, cw, ch } = drawSizeRef.current;
    const offX = (cw - drawW) / 2;
    const offY = (ch - drawH) / 2;
    const dpr = left.width / cw || 1;

    [left, right].forEach((canvas) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);
    });

    const leftCtx = left.getContext("2d")!;
    leftCtx.save();
    leftCtx.beginPath();
    leftCtx.rect(0, 0, splitX, ch);
    leftCtx.clip();
    leftCtx.drawImage(img, offX, offY, drawW, drawH);
    leftCtx.restore();

    const rightCtx = right.getContext("2d")!;
    rightCtx.save();
    rightCtx.beginPath();
    rightCtx.rect(splitX, 0, cw - splitX, ch);
    rightCtx.clip();
    rightCtx.drawImage(img, offX, offY, drawW, drawH);
    rightCtx.restore();

    setPhase("tearing");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("torn"));
    });
  }

  function restore() {
    // reset mesh cells so the image doesn't "snap" from a distorted state
    cellsRef.current.forEach((c) => {
      c.dx = 0;
      c.dy = 0;
      c.vx = 0;
      c.vy = 0;
    });
    setPhase("mesh");
  }

  const torn = phase === "tearing" || phase === "torn";
  const settled = phase === "torn";

  return (
    <div className="mx-auto max-w-lg">
      <div
        ref={wrapRef}
        className="relative aspect-[4/5] w-full select-none overflow-hidden rounded-2xl border border-line bg-surface"
        style={{ touchAction: "none" }}
      >
        <canvas
          ref={meshCanvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          data-cursor="drag"
          className="absolute inset-0 h-full w-full transition-opacity duration-300"
          style={{ opacity: torn ? 0 : 1, cursor: reducedMotion ? "pointer" : undefined }}
          onClick={reducedMotion ? () => triggerTear(200) : undefined}
        />
        <canvas
          ref={leftCanvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-out"
          style={{
            opacity: torn ? 1 : 0,
            transform: settled
              ? "translate(-22px, 10px) rotate(-5deg)"
              : "translate(0,0) rotate(0deg)",
            transitionProperty: reducedMotion ? "opacity" : "opacity, transform",
          }}
        />
        <canvas
          ref={rightCanvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-out"
          style={{
            opacity: torn ? 1 : 0,
            transform: settled
              ? "translate(22px, -8px) rotate(5deg)"
              : "translate(0,0) rotate(0deg)",
            transitionProperty: reducedMotion ? "opacity" : "opacity, transform",
          }}
        />

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center text-[13px] text-faint">
            loading…
          </div>
        )}

        {settled && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-bg/70 backdrop-blur-sm">
            <p className="font-display text-lg text-ink">Still building.</p>
            <button
              type="button"
              onClick={restore}
              data-cursor="link"
              className="rounded-full border border-line px-4 py-2 text-[12.5px] text-muted transition-colors hover:border-signal hover:text-signal"
            >
              Restore
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-[12.5px] text-faint">
        {phase === "mesh"
          ? reducedMotion
            ? "Tap the image."
            : "Drag to warp it. Swipe hard to tear it."
          : null}
      </p>

      {usingFallback && (
        <p className="mt-2 text-center text-[11.5px] text-faint">
          Showing a placeholder — the photo at{" "}
          <code className="font-mono">profileImageUrl</code> (in{" "}
          <code className="font-mono">lib/data.ts</code>) didn&rsquo;t load.
        </p>
      )}
    </div>
  );
}
