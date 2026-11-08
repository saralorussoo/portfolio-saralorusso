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
      className="flex w-full max-w-[268px] flex-col pt-5"
    >
      {ROOMS.map((r, i) => {
        const last = i === ROOMS.length - 1;
        return (
          <div key={r.room} className="relative flex h-14 items-start gap-6 sm:gap-[60px]">
            {/* Station: a ring at the top of the row, with the line running down to the next one. */}
            <motion.div
              aria-hidden="true"
              className="absolute left-[5.8px] top-2 w-[5.65px] origin-top"
              style={{ backgroundColor: r.hex, height: last ? 48 : 56 }}
              initial={{ scaleY: reduce ? 1 : 0 }}
              animate={play ? { scaleY: 1 } : reduce ? { scaleY: 1 } : undefined}
              transition={{ duration: 0.3, ease: "easeOut", delay: segmentDelay(i) }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute left-0 top-0 size-[16.9px] rounded-full border-[3.53px] bg-white"
              style={{ borderColor: r.hex }}
              initial={{ scale: reduce ? 1 : 0 }}
              animate={play ? { scale: 1 } : reduce ? { scale: 1 } : undefined}
              transition={{ type: "spring", stiffness: 420, damping: 20, delay: dotDelay(i) }}
            />

            <motion.span
              initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -8 }}
              animate={play ? { opacity: 1, x: 0 } : reduce ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.35, ease: "easeOut", delay: dotDelay(i) + 0.05 }}
              className="ml-[29px] mt-[15px] w-[49px] shrink-0 whitespace-nowrap text-[18px] font-bold leading-[26px] tracking-[-0.36px]"
              style={{ color: r.hex }}
            >
              {r.room}
            </motion.span>
            <motion.span
              initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -8 }}
              animate={play ? { opacity: 1, x: 0 } : reduce ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.35, ease: "easeOut", delay: dotDelay(i) + 0.1 }}
              className="mt-4 min-w-0 flex-1 text-[16px] font-medium leading-6 tracking-[-0.32px] text-[#141414]"
            >
              {r.name}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}
