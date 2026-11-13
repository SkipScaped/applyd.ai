import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  hashStr,
  layoutGlyphLines,
  makeRng,
  SERVICE_BITMAPS,
  SERVICE_COLORS,
  TOKENS,
} from "../data/glyphs";
import { HERO_CYCLE } from "../data/siteData";
import { useMotion } from "./MotionContext";

export function PixelIcon({
  name,
  size = 14,
  className = "",
}: {
  name: "plus" | "minus" | "check" | "arrow-right" | "arrow-ur" | "play" | "pause" | "reset";
  size?: number;
  className?: string;
}) {
  const grids: Record<string, string[]> = {
    plus: ["..#..", "..#..", "#####", "..#..", "..#.."],
    minus: [".....", ".....", "#####", ".....", "....."],
    check: ["....#", "...#.", "#.#..", ".#...", "....."],
    "arrow-right": ["..#..", "...#.", "#####", "...#.", "..#.."],
    "arrow-ur": [".####", "...##", "..#.#", ".#..#", "#...."],
    play: ["#....", "###..", "#####", "###..", "#...."],
    pause: [".#.#.", ".#.#.", ".#.#.", ".#.#.", ".#.#."],
    reset: [".###.", "#...#", "#..##", "#....", ".###."],
  };
  const g = grids[name] || grids.plus;
  const rects: React.ReactNode[] = [];
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      if (g[y][x] === "#") {
        rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
      }
    }
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 5 5"
      shapeRendering="crispEdges"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      {rects}
    </svg>
  );
}

export function BitmapSvgText({
  text,
  cellH = 3,
  fill = "currentColor",
  bold = false,
  fluid = false,
  jitterOnHover = false,
  className = "",
}: {
  text: string | string[];
  cellH?: number;
  fill?: string;
  bold?: boolean;
  fluid?: boolean;
  jitterOnHover?: boolean;
  className?: string;
}) {
  const { motionOn } = useMotion();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const lines = Array.isArray(text) ? text : [text];
  const layout = layoutGlyphLines(lines, 2, bold);
  const vbW = Math.max(1, layout.cols * 5);
  const vbH = Math.max(1, layout.rows * 4);

  const handleMouseEnter = () => {
    if (!jitterOnHover || !motionOn || !svgRef.current) return;
    const rects = svgRef.current.querySelectorAll("rect");
    const tl = gsap.timeline();
    tl.to(rects, {
      x: () => (Math.random() > 0.5 ? 5 : -5),
      y: () => (Math.random() > 0.5 ? 4 : -4),
      duration: 0.06,
      stagger: { amount: 0.08, from: "random" },
      ease: "steps(1)",
    }).to(rects, {
      x: 0,
      y: 0,
      duration: 0.08,
      stagger: { amount: 0.08, from: "start" },
      ease: "steps(1)",
    });
  };

  return (
    <svg
      ref={svgRef}
      onMouseEnter={handleMouseEnter}
      className={className}
      viewBox={`0 0 ${vbW} ${vbH}`}
      width={fluid ? "100%" : layout.cols * cellH * 1.25}
      height={fluid ? undefined : layout.rows * cellH}
      shapeRendering="crispEdges"
      fill={fill}
      aria-hidden="true"
    >
      {layout.cells.map((c, idx) => (
        <rect key={idx} x={c.x * 5} y={c.y * 4} width="5.05" height="4.05" />
      ))}
    </svg>
  );
}

export function ServicePixelArt({
  serviceId,
  bg,
  fg,
}: {
  serviceId: string;
  bg: string;
  fg: string;
}) {
  const { motionOn } = useMotion();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const grid = SERVICE_BITMAPS[serviceId] || SERVICE_BITMAPS["ai-agents"];

  const handleHover = () => {
    if (!motionOn || !svgRef.current) return;
    const cells = svgRef.current.querySelectorAll("rect[data-cell]");
    gsap.fromTo(
      cells,
      { opacity: 0.2, scale: 0.7, transformOrigin: "center" },
      {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        stagger: { amount: 0.18, from: "center" },
        ease: "steps(3)",
      }
    );
  };

  const rects: React.ReactNode[] = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "#") {
        rects.push(
          <rect
            key={`${x}-${y}`}
            data-cell="1"
            x={x * 10}
            y={y * 10}
            width="10"
            height="10"
            fill={fg}
          />
        );
      }
    }
  }

  return (
    <div
      onMouseEnter={handleHover}
      className="w-full border-b border-[var(--ink)] flex items-center justify-center p-4"
      style={{ backgroundColor: bg }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 150 150"
        className="w-24 h-24 md:w-28 md:h-28 pixel-crisp"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        {rects}
      </svg>
    </div>
  );
}

// L1 Hero Interactive Particle Matrix Canvas (GSAP-timed cycling + cursor repel physics)
export function HeroPixelCanvas({
  activeIdx,
  onSelectCycle,
}: {
  activeIdx: number;
  onSelectCycle: (nextIdx: number) => void;
}) {
  const { motionOn } = useMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const particlesRef = useRef<
    Array<{
      sx: number;
      sy: number;
      tx: number;
      ty: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      delay: number;
      color: string;
    }>
  >([]);
  const morphStartRef = useRef<number>(performance.now());
  const isAssemblingRef = useRef<boolean>(true);
  const [caption, setCaption] = useState(HERO_CYCLE[0].caption);

  useEffect(() => {
    setCaption(HERO_CYCLE[activeIdx % HERO_CYCLE.length].caption);
  }, [activeIdx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const item = HERO_CYCLE[activeIdx % HERO_CYCLE.length];
    const lines = isMobile ? item.mobile : [item.desktop];
    const layout = layoutGlyphLines(lines, 2, true);
    const totalCols = isMobile ? 24 : 44;
    const totalRows = isMobile ? 20 : 9;

    // Center horizontally in canvas grid
    const padX = Math.max(0, Math.floor((totalCols - layout.cols) / 2));
    const targetCells = layout.cells.map((c) => ({ x: c.x + padX, y: c.y }));

    const rng = makeRng(hashStr(`hero-${activeIdx}`));
    const oldParticles = particlesRef.current;
    const nextParticles: typeof oldParticles = [];

    if (oldParticles.length === 0) {
      isAssemblingRef.current = true;
      for (let i = 0; i < targetCells.length; i++) {
        const tc = targetCells[i];
        nextParticles.push({
          sx: rng() * totalCols,
          sy: rng() * totalRows,
          tx: tc.x,
          ty: tc.y,
          x: tc.x,
          y: tc.y,
          vx: 0,
          vy: 0,
          delay: rng() * 350,
          color: rng() < 0.08 ? SERVICE_COLORS[Math.floor(rng() * SERVICE_COLORS.length)] : TOKENS.ink,
        });
      }
    } else {
      isAssemblingRef.current = false;
      const count = Math.max(oldParticles.length, targetCells.length);
      for (let i = 0; i < count; i++) {
        const src = oldParticles[i % oldParticles.length];
        const dst = targetCells[i % targetCells.length];
        const isSparkle = rng() < 0.14;
        nextParticles.push({
          sx: src.x,
          sy: src.y,
          tx: dst.x,
          ty: dst.y,
          x: src.x,
          y: src.y,
          vx: 0,
          vy: 0,
          delay: (dst.x / totalCols) * 280,
          color: isSparkle ? SERVICE_COLORS[Math.floor(rng() * SERVICE_COLORS.length)] : TOKENS.ink,
        });
      }
    }

    particlesRef.current = nextParticles;
    morphStartRef.current = performance.now();

    let cssW = 0;
    let cssH = 0;
    let dpr = 1;

    const sizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      cssW = rect.width;
      cssH = rect.height;
      if (cssW <= 0 || cssH <= 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeCanvas();

    const ro = new ResizeObserver(sizeCanvas);
    ro.observe(canvas);

    const drawTick = () => {
      if (cssW <= 0 || cssH <= 0) return;
      const cellW = cssW / totalCols;
      const cellH = cssH / totalRows;

      ctx.fillStyle = TOKENS.sodium;
      ctx.fillRect(0, 0, cssW, cssH);

      if (!motionOn) {
        ctx.fillStyle = TOKENS.ink;
        for (let i = 0; i < targetCells.length; i++) {
          const c = targetCells[i];
          ctx.fillRect(
            Math.floor(c.x * cellW),
            Math.floor(c.y * cellH),
            Math.ceil(cellW),
            Math.ceil(cellH)
          );
        }
        return;
      }

      const now = performance.now();
      const elapsed = now - morphStartRef.current;
      const duration = isAssemblingRef.current ? 850 : 700;
      const repelRadius = cellW * 3.4;
      const pxPtr = pointerRef.current.x;
      const pyPtr = pointerRef.current.y;

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        const rawT = Math.min(1, Math.max(0, (elapsed - p.delay) / duration));
        // Cubic ease out
        const e = 1 - Math.pow(1 - rawT, 3);
        const baseX = p.sx + (p.tx - p.sx) * e;
        const baseY = p.sy + (p.ty - p.sy) * e;

        let targetDx = 0;
        let targetDy = 0;
        if (pxPtr > -5000) {
          const cx = (baseX + 0.5) * cellW;
          const cy = (baseY + 0.5) * cellH;
          const dx = cx - pxPtr;
          const dy = cy - pyPtr;
          const dist = Math.hypot(dx, dy);
          if (dist > 0.01 && dist < repelRadius) {
            const push = (1 - dist / repelRadius) * 1.4;
            targetDx = (dx / dist) * push;
            targetDy = (dy / dist) * push;
          }
        }

        const fx = baseX + targetDx - p.x;
        const fy = baseY + targetDy - p.y;
        p.vx = (p.vx + fx * 0.25) * 0.72;
        p.vy = (p.vy + fy * 0.25) * 0.72;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = rawT > 0.92 && p.color !== TOKENS.ink && Math.random() < 0.015 ? TOKENS.ink : p.color;
        ctx.fillRect(
          Math.round(p.x * cellW),
          Math.round(p.y * cellH),
          Math.max(2, Math.ceil(cellW)),
          Math.max(2, Math.ceil(cellH))
        );
      }
    };

    gsap.ticker.add(drawTick);
    return () => {
      gsap.ticker.remove(drawTick);
      ro.disconnect();
    };
  }, [activeIdx, motionOn]);

  return (
    <figure className="w-full">
      <div className="relative w-full">
        <canvas
          ref={canvasRef}
          onClick={() => onSelectCycle((activeIdx + 1) % HERO_CYCLE.length)}
          onPointerMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
          }}
          onPointerLeave={() => {
            pointerRef.current = { x: -9999, y: -9999 };
          }}
          className="block w-full aspect-[24/11] md:aspect-[44/9] cursor-pointer"
          aria-label={`Interactive pixel matrix wordmark: ${HERO_CYCLE[activeIdx].desktop}. Click to cycle pillars.`}
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-2 border-t border-[var(--ink)]">
        <figcaption className="t-micro font-mono-tech">{caption}</figcaption>
        <div className="flex flex-wrap items-center gap-1">
          {HERO_CYCLE.map((item, i) => (
            <button
              key={item.desktop}
              type="button"
              onClick={() => onSelectCycle(i)}
              aria-pressed={activeIdx === i}
              className={`px-2 py-1 text-xs font-mono-tech border border-[var(--ink)] transition-colors ${
                activeIdx === i
                  ? "bg-[var(--ink)] text-[var(--sodium)]"
                  : "bg-transparent text-[var(--ink)] hover:bg-[var(--paper)]"
              }`}
            >
              0{i + 1}
            </button>
          ))}
        </div>
      </div>
    </figure>
  );
}

// Pointer pixel trail (sodium & paper surfaces only, powered by GSAP ticker)
export function TrailCanvas() {
  const { motionOn } = useMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!motionOn || !window.matchMedia?.("(pointer: fine)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cells: Array<{ gx: number; gy: number; born: number; color: string }> = [];
    let colorIdx = 0;
    let lastKey = "";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMove = (e: PointerEvent) => {
      if (document.documentElement.classList.contains("menu-open")) return;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const surfEl = el?.closest?.("[data-surface]");
      if (surfEl?.getAttribute("data-surface") === "ink") return;
      const gx = Math.floor(e.clientX / 16);
      const gy = Math.floor(e.clientY / 16);
      const key = `${gx},${gy}`;
      if (key === lastKey) return;
      lastKey = key;
      cells.push({
        gx,
        gy,
        born: performance.now(),
        color: SERVICE_COLORS[colorIdx % SERVICE_COLORS.length],
      });
      colorIdx++;
      if (cells.length > 14) cells.shift();
    };

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (cells.length === 0) return;
      const now = performance.now();
      const alive: typeof cells = [];
      for (const c of cells) {
        const age = now - c.born;
        if (age >= 400) continue;
        alive.push(c);
        ctx.fillStyle = c.color;
        if (age < 130) ctx.fillRect(c.gx * 16, c.gy * 16, 16, 16);
        else if (age < 260) ctx.fillRect(c.gx * 16 + 4, c.gy * 16 + 4, 8, 8);
        else ctx.fillRect(c.gx * 16 + 6, c.gy * 16 + 6, 4, 4);
      }
      cells = alive;
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      gsap.ticker.remove(tick);
    };
  }, [motionOn]);

  if (!motionOn) return null;
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-30"
      aria-hidden="true"
    />
  );
}

// GSAP-driven multi-color pixel wipe overlay on route changes
export function WipeOverlay({
  triggerKey,
  onMidpoint,
}: {
  triggerKey: number;
  onMidpoint: () => void;
}) {
  const { motionOn } = useMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (triggerKey === 0) return;
    if (!motionOn) {
      onMidpoint();
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) {
      onMidpoint();
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      onMidpoint();
      return;
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvas.style.display = "block";

    const cell = w >= 768 ? 48 : 32;
    const cols = Math.ceil(w / cell);
    const rows = Math.ceil(h / cell);
    const maxDiag = cols + rows - 2 || 1;

    const proxy = { p: 0 };
    let swapped = false;

    const drawPhase = (phase: "in" | "out") => {
      ctx.clearRect(0, 0, w, h);
      const limit = proxy.p * (maxDiag + 1);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cond = phase === "in" ? c + r <= limit : c + r > limit;
          if (cond) {
            ctx.fillStyle = SERVICE_COLORS[(c + r) % 4];
            ctx.fillRect(c * cell, r * cell, cell, cell);
          }
        }
      }
    };

    const tl = gsap.timeline({
      onComplete: () => {
        canvas.style.display = "none";
      },
    });

    tl.to(proxy, {
      p: 1,
      duration: 0.22,
      ease: "none",
      onUpdate: () => drawPhase("in"),
      onComplete: () => {
        if (!swapped) {
          swapped = true;
          onMidpoint();
        }
        proxy.p = 0;
      },
    }).to(proxy, {
      p: 1,
      duration: 0.24,
      ease: "none",
      onUpdate: () => drawPhase("out"),
    });

    return () => {
      tl.kill();
      canvas.style.display = "none";
    };
  }, [triggerKey]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[120] hidden"
      aria-hidden="true"
    />
  );
}
