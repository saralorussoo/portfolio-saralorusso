import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import figmaIcon from "../../assets/about/figma.svg";
import htmlIcon from "../../assets/about/html.png";
import analyticsIcon from "../../assets/about/analytics.png";
import miroIcon from "../../assets/about/miro.svg";
import javascriptIcon from "../../assets/about/javascript.png";
import notionIcon from "../../assets/about/notion.svg";
import reactIcon from "../../assets/about/react.svg";
import affinityIcon from "../../assets/about/affinity.svg";
import framerIcon from "../../assets/about/framer.png";
import wordpressIcon from "../../assets/about/wordpress.svg";
import { ToolWorld, type ToolSpec } from "./toolWorld";

type Tool = ToolSpec & {
  name: string;
  bg: string;
  fg: string;
  icon: string;
  /** Icon size in em (width, height); chips are sized in em so they scale as a whole. */
  iconSize: [number, number];
};

// Resting centres are the Figma offsets (1038 x 299 inner box); `mobile` is a
// separate arrangement for phones (x in % of the box, y in px).
const TOOLS: Tool[] = [
  { name: "Figma", bg: "#a259ff", fg: "#faf5ff", icon: figmaIcon, iconSize: [1.334, 1.334], rot: 2.12, desktop: [86.9, 90.9], mobile: [73, 46] },
  { name: "HTML/CSS", bg: "#ff6900", fg: "#fff7ed", icon: htmlIcon, iconSize: [1.444, 1.444], rot: 0, desktop: [112.1, 192.7], mobile: [34, 184] },
  { name: "Google Analytics", bg: "#e57301", fg: "#fff7ed", icon: analyticsIcon, iconSize: [1.333, 1.444], rot: 0, desktop: [913, 207.8], mobile: [50, 246] },
  { name: "Miro", bg: "#000000", fg: "#fff7ed", icon: miroIcon, iconSize: [1.334, 1.334], rot: 20.58, desktop: [304.5, 174], mobile: [76, 118] },
  { name: "Javascript", bg: "#e4a126", fg: "#fff7ed", icon: javascriptIcon, iconSize: [1.108, 1.615], rot: 0, desktop: [486.3, 95.5], mobile: [30, 116] },
  { name: "Notion", bg: "#62748e", fg: "#f8fafc", icon: notionIcon, iconSize: [1.334, 1.334], rot: -20.34, desktop: [275.3, 50.5], mobile: [27, 46] },
  { name: "React", bg: "#00b8db", fg: "#ecfeff", icon: reactIcon, iconSize: [1.334, 1.334], rot: 0.28, desktop: [487, 190.2], mobile: [76, 184] },
  { name: "Affinity", bg: "#a7f175", fg: "#000000", icon: affinityIcon, iconSize: [1.334, 1.334], rot: 0.28, desktop: [721.3, 234.8], mobile: [50, 350] },
  { name: "Framer", bg: "#0162ff", fg: "#f5f3ff", icon: framerIcon, iconSize: [1.333, 1.333], rot: 0, desktop: [248.9, 258.7], mobile: [27, 306] },
  { name: "Wordpress", bg: "#21759b", fg: "#f5f3ff", icon: wordpressIcon, iconSize: [1.333, 1.333], rot: 0, desktop: [941.6, 126.2], mobile: [71, 306] },
];

/**
 * The "Tools" box: the chips fall in from the top edge the first time it
 * scrolls into view, then can be picked up and thrown around like the Home
 * stickers — with real collisions, see `toolWorld.ts`. Chip size follows the
 * box width (see `.tool-field` in index.css).
 */
export default function ToolsPlayground() {
  const boxRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const worldRef = useRef<ToolWorld | null>(null);
  const inView = useInView(boxRef, { once: true, amount: 0.4 });
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    const box = boxRef.current;
    const els = chipRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (!box || els.length !== TOOLS.length) return;

    if (reduce) els.forEach((el) => (el.style.opacity = "0"));
    const world = new ToolWorld(box, els, TOOLS, reduce);
    worldRef.current = world;

    // Box width changes (window resize) and web fonts arriving both change chip sizes.
    const observer = new ResizeObserver(() => world.resize());
    observer.observe(box);
    els.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      world.destroy();
      worldRef.current = null;
    };
  }, [reduce]);

  useEffect(() => {
    if (inView) worldRef.current?.drop();
  }, [inView, reduce]);

  return (
    <div
      ref={boxRef}
      className="tool-field relative h-[390px] overflow-hidden rounded-xl border border-black/30 bg-white sm:aspect-[1040/301] sm:h-auto"
    >
      {TOOLS.map((tool, i) => (
        <div
          key={tool.name}
          ref={(el) => {
            chipRefs.current[i] = el;
          }}
          className="tool-chip"
          onPointerDown={(e) => {
            if (e.button !== 0 && e.pointerType === "mouse") return;
            if (worldRef.current?.grab(i, e.clientX, e.clientY)) {
              e.currentTarget.setPointerCapture(e.pointerId);
              e.preventDefault();
            }
          }}
          onPointerMove={(e) => worldRef.current?.moveTo(e.clientX, e.clientY)}
          onPointerUp={() => worldRef.current?.letGo()}
          onPointerCancel={() => worldRef.current?.letGo()}
        >
          <div
            className="tool-chip-body inline-flex items-center gap-[0.2218em] rounded-[0.6667em] p-[0.2222em]"
            style={{ backgroundColor: tool.bg }}
          >
            <span className="grid size-[1.7779em] shrink-0 place-items-center rounded-[0.4444em] bg-[#fcfdfc]">
              <img
                src={tool.icon}
                alt=""
                draggable={false}
                className="max-w-none object-contain"
                style={{ width: `${tool.iconSize[0]}em`, height: `${tool.iconSize[1]}em` }}
              />
            </span>
            <span
              className="whitespace-nowrap pr-[0.4em] font-medium leading-[1.7] tracking-[-0.03em]"
              style={{ color: tool.fg }}
            >
              {tool.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
