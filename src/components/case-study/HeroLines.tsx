import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero "metro map" backdrop of the Bob Noorda page, built from the two Figma
 * compositions as live vectors:
 *  - desktop: 1440 x 398 canvas, six lines weaving around the centred title;
 *  - compact: 402 x 270 canvas (phones, tablets, small laptops), lines above
 *    the title and below the tags only.
 *
 * Each composition is a list of waypoints in its Figma canvas. To fit any
 * width, a waypoint in the left half stays glued to the left edge and one in
 * the right half to the right edge, so the middle stretches and the ends keep
 * their corners (desktop squeezes the two sides instead when the title leaves
 * them too little room). Vertically, waypoints above the content are glued to
 * the top and the ones below it to the bottom. The compact composition is
 * scaled up with the width (title included) until it matches the desktop type
 * size, and the page switches to the desktop one as soon as the measured title
 * leaves enough room on both sides.
 */

type Waypoint = { x: number; y: number; r?: number };
type Line = { key: string; color: string; points: Waypoint[] };

const p = (x: number, y: number, r?: number): Waypoint => ({ x, y, r });

/** Figma desktop canvas: 1440 x 398. Painted in this order (last on top). */
const DESKTOP_LINES: Line[] = [
  {
    key: "red",
    color: "#dc1619",
    points: [p(94, 0), p(94, 77.35, 40), p(1114, 77.35, 40), p(1114, 264, 40), p(1442, 264)],
  },
  {
    key: "yellow",
    color: "#edb404",
    points: [p(0, 37), p(175, 37, 40), p(175, 144.5, 40), p(349.5, 144.5, 40), p(349.5, 341, 40), p(1442.5, 341)],
  },
  {
    key: "blue",
    color: "#015099",
    points: [p(1442, 63.5), p(1327.5, 63.5, 40), p(1327.5, 305.5, 40), p(158.5, 305.5, 40), p(158.5, 190, 40), p(0, 190)],
  },
  {
    key: "black-west",
    color: "#000000",
    points: [p(0, 365), p(279.5, 365, 40), p(279.5, 0)],
  },
  {
    key: "purple",
    color: "#c99cc6",
    points: [p(1444.5, 136.5), p(1058.5, 136.5, 40), p(1058.5, 32.5, 40), p(338.5, 32.5, 31.5), p(338.5, 0)],
  },
  {
    key: "black-east",
    color: "#000000",
    points: [p(1442, 204), p(1372.5, 204, 40), p(1372.5, 398, 40), p(1442, 398)],
  },
];
const DESKTOP = { w: 1440, h: 398, stroke: 8, titleTop: 99, ySplit: 270 };

/** Figma compact canvas: 402 x 270 (the off-canvas "Vector 108" is left out). */
const COMPACT_LINES: Line[] = [
  {
    key: "red",
    color: "#dc1619",
    points: [p(45.5, 0), p(45.5, 38.27, 19.8), p(300.5, 38.27, 16.4), p(300.5, 71, 16.4), p(406, 71)],
  },
  {
    key: "yellow",
    color: "#edb404",
    points: [p(0, 18), p(97.94, 18, 19.5), p(97.94, 57, 19.5), p(406, 57)],
  },
  {
    key: "blue",
    color: "#015099",
    points: [p(406.5, 206.32), p(78.43, 206.32, 17.4), p(78.43, 241.2, 17.4), p(0, 241.2)],
  },
  {
    key: "black",
    color: "#000000",
    points: [p(406, 187), p(374, 187, 12.8), p(374, 251, 12.8), p(406, 251)],
  },
  {
    key: "purple",
    color: "#c99cc6",
    points: [p(403, 46), p(318, 46, 17.65), p(318, 10.69, 17.65), p(166, 10.69, 10.69), p(166, 0)],
  },
];
const COMPACT = { w: 402, h: 270, stroke: 3.958, titleTop: 88, ySplit: 135, maxScale: 1.85 };
// Height of title (2 lines) + gap + pills row in the compact Figma frame.
const COMPACT_CONTENT_H = 94.2;

// Neulis title at 60px is ~657px wide in Figma; the desktop composition needs
// this much clear room on each side of the (measured) title.
const DESKTOP_SIDE_ROOM = 260;
// Title width in the Figma desktop canvas; the lines are drawn for the room it leaves.
const FIGMA_TITLE_W = 657.5;
// Pills never get smaller than this (the compact Figma frame draws them at 8.6px).
const MIN_TAG_PX = 11;
// How far a line runs past the edge, so its butt cap never shows.
const BLEED = 4;
const FALLBACK_TITLE_AT_60 = 657;

type Layout = { mode: "desktop"; s: number } | { mode: "compact"; g: number };

type Metrics = {
  layout: Layout;
  titlePx: number;
  tagPx: number;
  gap: number;
  padTop: number;
  padBottom: number;
  minHeight: number;
  stroke: number;
};

function computeMetrics(W: number, titleAt60: number): Metrics {
  if (W >= titleAt60 + 2 * DESKTOP_SIDE_ROOM) {
    // 1 at the Figma width and wider; below it the two sides close in on the
    // title. A little extra squeeze keeps the vertical that runs closest to the
    // title (the purple one, ~6px away in Figma) from touching it.
    const extra = 14 * Math.min(1, Math.max(0, (DESKTOP.w - W) / 260));
    const s = Math.min(1, (W - Math.min(titleAt60, FIGMA_TITLE_W) - extra) / (DESKTOP.w - FIGMA_TITLE_W));
    return {
      layout: { mode: "desktop", s },
      titlePx: 60,
      tagPx: 16,
      gap: 20,
      padTop: DESKTOP.titleTop,
      padBottom: 0,
      minHeight: DESKTOP.h,
      stroke: DESKTOP.stroke,
    };
  }
  const g = Math.min(COMPACT.maxScale, W / COMPACT.w);
  return {
    layout: { mode: "compact", g },
    titlePx: 32.43 * g,
    tagPx: Math.max(MIN_TAG_PX, 8.648 * g),
    gap: 10.81 * g,
    padTop: COMPACT.titleTop * g,
    padBottom: (COMPACT.h - COMPACT.titleTop - COMPACT_CONTENT_H) * g,
    minHeight: 0,
    stroke: Math.min(DESKTOP.stroke, COMPACT.stroke * g),
  };
}

/** Places a waypoint of a Figma canvas on the real `W` x `H` hero. */
function place(pt: Waypoint, W: number, H: number, layout: Layout): { x: number; y: number } {
  const canvas = layout.mode === "desktop" ? DESKTOP : COMPACT;
  const kx = layout.mode === "desktop" ? layout.s : layout.g;
  const ky = layout.mode === "desktop" ? 1 : layout.g;

  let x: number;
  if (pt.x <= 2) x = -BLEED;
  else if (pt.x < canvas.w / 2) x = pt.x * kx;
  else x = W - (canvas.w - pt.x) * kx;
  if (pt.x >= canvas.w - 2) x = Math.max(x, W + BLEED);

  let y: number;
  if (pt.y <= 1) y = -BLEED;
  else if (pt.y < canvas.ySplit) y = pt.y * ky;
  else y = H - (canvas.h - pt.y) * ky;
  return { x, y };
}

/**
 * Straight segments joined by circular arcs: each interior waypoint is a 90°
 * turn rounded with its own radius (scaled by `rk`). A radius never exceeds
 * what its neighbours leave: half a segment when the other end is a rounded
 * corner too, the whole segment when the other end is a loose end.
 */
function pathFor(points: Waypoint[], placed: { x: number; y: number }[], rk: number): string {
  const d: string[] = [`M${placed[0].x.toFixed(2)} ${placed[0].y.toFixed(2)}`];
  const last = placed.length - 1;
  for (let i = 1; i < last; i++) {
    const prev = placed[i - 1];
    const cur = placed[i];
    const next = placed[i + 1];
    const lenPrev = Math.hypot(cur.x - prev.x, cur.y - prev.y);
    const lenNext = Math.hypot(next.x - cur.x, next.y - cur.y);
    const r = Math.max(
      0,
      Math.min(
        (points[i].r ?? 0) * rk,
        i - 1 > 0 ? lenPrev / 2 : lenPrev,
        i + 1 < last ? lenNext / 2 : lenNext,
      ),
    );
    const ux = Math.sign(prev.x - cur.x);
    const uy = Math.sign(prev.y - cur.y);
    const vx = Math.sign(next.x - cur.x);
    const vy = Math.sign(next.y - cur.y);
    const sweep = ux * vy - uy * vx > 0 ? 0 : 1;
    d.push(`L${(cur.x + ux * r).toFixed(2)} ${(cur.y + uy * r).toFixed(2)}`);
    d.push(`A${r.toFixed(2)} ${r.toFixed(2)} 0 0 ${sweep} ${(cur.x + vx * r).toFixed(2)} ${(cur.y + vy * r).toFixed(2)}`);
  }
  d.push(`L${placed[last].x.toFixed(2)} ${placed[last].y.toFixed(2)}`);
  return d.join(" ");
}

type Geo = { w: number; h: number; titleAt60: number };

/**
 * Wraps the hero's title and tags. The title (an `<h1>` with `w-max`, one
 * nowrap line per row) and the pills read `--hero-title`, `--hero-tag` and
 * `--hero-gap` from here, so their size follows the composition in use.
 */
export default function HeroLines({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [geo, setGeo] = useState<Geo | null>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const title = canvas.querySelector("h1");

    const update = () => {
      const c = canvas.getBoundingClientRect();
      // `w-max` makes the title as wide as its longest line; scaling by the font
      // size gives its width at the desktop size, whichever composition is on.
      let titleAt60 = FALLBACK_TITLE_AT_60;
      if (title) {
        const px = parseFloat(getComputedStyle(title).fontSize);
        if (px > 0 && title.offsetWidth > 0) titleAt60 = (title.offsetWidth / px) * 60;
      }
      setGeo((prev) =>
        prev && prev.w === c.width && prev.h === c.height && Math.abs(prev.titleAt60 - titleAt60) < 0.5
          ? prev
          : { w: c.width, h: c.height, titleAt60 },
      );
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(canvas);
    if (title) ro.observe(title);
    return () => ro.disconnect();
  }, []);

  const metrics = geo ? computeMetrics(geo.w, geo.titleAt60) : computeMetrics(1440, FALLBACK_TITLE_AT_60);
  const { layout } = metrics;
  const lines = layout.mode === "desktop" ? DESKTOP_LINES : COMPACT_LINES;
  const radiusScale = layout.mode === "desktop" ? 1 : layout.g;

  const style = {
    paddingTop: metrics.padTop,
    paddingBottom: metrics.padBottom,
    minHeight: metrics.minHeight,
    "--hero-title": `${metrics.titlePx}px`,
    "--hero-tag": `${metrics.tagPx}px`,
    "--hero-gap": `${metrics.gap}px`,
  } as CSSProperties;

  return (
    <div ref={canvasRef} data-hero-mode={layout.mode} style={style} className="relative flex flex-col items-center">
      {geo && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
          viewBox={`0 0 ${geo.w} ${geo.h}`}
        >
          {lines.map((line, i) => {
            const placed = line.points.map((pt) => place(pt, geo.w, geo.h, layout));
            return (
              <motion.path
                key={`${layout.mode}-${line.key}`}
                d={pathFor(line.points, placed, radiusScale)}
                stroke={line.color}
                strokeWidth={metrics.stroke}
                fill="none"
                initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.1 + i * 0.1 }}
              />
            );
          })}
        </svg>
      )}
      <div className="relative z-10 flex flex-col items-center px-3.5" style={{ gap: "var(--hero-gap)" }}>
        {children}
      </div>
    </div>
  );
}
