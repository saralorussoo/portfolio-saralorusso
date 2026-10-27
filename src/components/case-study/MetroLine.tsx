import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ROOMS = [
  { room: "Sala 1", name: "Metro di Milano", hex: "#C4171A" },
  { room: "Sala 2", name: "Metro di New York", hex: "#000000" },
  { room: "Sala 3", name: "Metro di São Paulo", hex: "#015099" },
  { room: "Sala 4", name: "Identità visiva", hex: "#EDB404" },
  { room: "Sala 5", name: "Eredità", hex: "#C99CC6" },
];

const STEP = 0.18; // seconds between each "build" beat
const dotDelay = (i: number) => i * STEP * 2;
const segmentDelay = (i: number) => dotDelay(i) + STEP; // segment i connects dot i → dot i+1

/**
 * The five-room "metro line" from the exhibition concept, redrawn as a real
 * vertical timeline (not a screenshot) and animated to compose itself top to
 * bottom the first time it scrolls into view: each station pops in, then the
 * coloured segment grows down to the next one, in its own room colour —
 * exactly like the five-colour line in the Figma source.
 */
export default function MetroLine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const play = inView && !reduce;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Linea della mostra con le cinque sale: ${ROOMS.map((r) => `${r.room}, ${r.name}`).join("; ")}.`}
      className="flex w-full max-w-[520px] flex-col"
    >
      {ROOMS.map((r, i) => (
        <div key={r.room} className="flex items-stretch gap-4 sm:gap-6">
          {/* Dot + connecting segments, in their own fixed-width gutter. */}
          <div className="flex w-4 shrink-0 flex-col items-center">
            <motion.div
              aria-hidden="true"
              className="w-[3px] flex-1 origin-top"
              style={{ backgroundColor: i === 0 ? "transparent" : ROOMS[i - 1].hex }}
              initial={{ scaleY: reduce ? 1 : 0 }}
              animate={play ? { scaleY: 1 } : reduce ? { scaleY: 1 } : undefined}
              transition={{ duration: 0.3, ease: "easeOut", delay: segmentDelay(i - 1) }}
            />
            <motion.span
              aria-hidden="true"
              className="my-1 size-3.5 shrink-0 rounded-full border-[3px] bg-white"
              style={{ borderColor: r.hex }}
              initial={{ scale: reduce ? 1 : 0 }}
              animate={play ? { scale: 1 } : reduce ? { scale: 1 } : undefined}
              transition={{ type: "spring", stiffness: 420, damping: 20, delay: dotDelay(i) }}
            />
            <motion.div
              aria-hidden="true"
              className="w-[3px] flex-1 origin-top"
              style={{ backgroundColor: i === ROOMS.length - 1 ? "transparent" : r.hex }}
              initial={{ scaleY: reduce ? 1 : 0 }}
              animate={play ? { scaleY: 1 } : reduce ? { scaleY: 1 } : undefined}
              transition={{ duration: 0.3, ease: "easeOut", delay: segmentDelay(i) }}
            />
          </div>

          <motion.div
            initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -8 }}
            animate={play ? { opacity: 1, x: 0 } : reduce ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.35, ease: "easeOut", delay: dotDelay(i) + 0.05 }}
            className="flex flex-1 flex-wrap items-baseline gap-x-4 gap-y-0.5 py-2"
          >
            <span
              className="w-[62px] shrink-0 text-[18px] font-bold leading-[normal] tracking-[-0.36px]"
              style={{ color: r.hex === "#000000" ? "#000000" : r.hex }}
            >
              {r.room}
            </span>
            <span className="min-w-[130px] flex-1 text-[16px] font-medium leading-[normal] tracking-[-0.32px] text-[#141414]">
              {r.name}
            </span>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
