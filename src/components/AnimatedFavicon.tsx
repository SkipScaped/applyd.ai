import { useEffect } from "react";
import { SERVICE_COLORS, TOKENS } from "../data/glyphs";
import { useMotion } from "./MotionContext";

// 8x9 bold crisp bitmap "A" monogram for 16x16 favicon grid
const MONOGRAM_A = [
  "..####..",
  ".##..##.",
  "##....##",
  "##....##",
  "########",
  "##....##",
  "##....##",
  "##....##",
  "##....##",
];

function routeAccentColor(route: string): string {
  if (route.includes("physical-ai")) return TOKENS.pink;
  if (route.includes("video-ai") || route.includes("chatbots")) return TOKENS.green;
  if (route.includes("ot-cybersecurity") || route.includes("consulting")) return TOKENS.lavender;
  if (route.includes("generative-ai")) return TOKENS.coral;
  if (route.includes("platform") || route.includes("agent")) return TOKENS.blue;
  return TOKENS.sodium;
}

export function AnimatedFavicon({ currentRoute }: { currentRoute: string }) {
  const { motionOn } = useMotion();

  useEffect(() => {
    const size = 32;
    const grid = 16;
    const cell = size / grid; // 2px per logical pixel

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    let link = document.querySelector<HTMLLinkElement>("link#dynamic-favicon");
    if (!link) {
      // Remove any static fallback icon elements once dynamic controller mounts
      document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]').forEach((el) => {
        if (el.id !== "dynamic-favicon") el.remove();
      });
      link = document.createElement("link");
      link.id = "dynamic-favicon";
      link.rel = "icon";
      link.type = "image/png";
      document.head.appendChild(link);
    }

    let frame = 0;
    const accentOverride = routeAccentColor(currentRoute);

    const drawFrame = (f: number) => {
      // Dark ink plate
      ctx.fillStyle = TOKENS.ink;
      ctx.fillRect(0, 0, size, size);

      // Stepped corner notch / perimeter pixels in sodium
      ctx.fillStyle = TOKENS.sodium;
      // Top-left & bottom-right crisp corner brackets (2x2 pixel blocks)
      ctx.fillRect(0, 0, cell * 3, cell);
      ctx.fillRect(0, 0, cell, cell * 3);
      ctx.fillRect(size - cell * 3, size - cell, cell * 3, cell);
      ctx.fillRect(size - cell, size - cell * 3, cell, cell * 3);

      // Active service pixel indicator at top-right (pulsing position/color every frame)
      const activeColor =
        f % 6 === 0 ? accentOverride : SERVICE_COLORS[f % SERVICE_COLORS.length];
      ctx.fillStyle = activeColor;
      ctx.fillRect(size - cell * 3, cell, cell * 2, cell * 2);

      // Sweeping horizontal scan row (y from 2 to 11) across the "A" glyph
      const scanRow = f % 12;

      // Render 8x9 crisp "A" centered at x=4, y=3
      for (let r = 0; r < MONOGRAM_A.length; r++) {
        const isScanHit = motionOn && r === scanRow;
        for (let c = 0; c < MONOGRAM_A[r].length; c++) {
          if (MONOGRAM_A[r][c] === "#") {
            ctx.fillStyle = isScanHit ? activeColor : TOKENS.paper;
            ctx.fillRect((4 + c) * cell, (3 + r) * cell, cell, cell);
          }
        }
      }

      // Signature bottom 4-color pixel staircase marching horizontally
      const shift = motionOn ? f % 5 : 0;
      for (let x = 2; x < 14; x++) {
        const colorIdx = (Math.floor((x + shift) / 2)) % SERVICE_COLORS.length;
        ctx.fillStyle = SERVICE_COLORS[colorIdx];
        ctx.fillRect(x * cell, 14 * cell, cell, cell);
      }

      link!.href = canvas.toDataURL("image/png");
    };

    // Draw frame 0 immediately
    drawFrame(0);

    if (!motionOn) {
      return;
    }

    const tick = () => {
      if (document.hidden) return;
      frame = (frame + 1) % 60;
      drawFrame(frame);
    };

    const intervalId = window.setInterval(tick, 280);
    const onVisibility = () => {
      if (!document.hidden) drawFrame(frame);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [motionOn, currentRoute]);

  return null;
}
