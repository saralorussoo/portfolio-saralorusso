import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// An "at the easel" loop: an energetic brush flourish (tilt + hop + a
// pulse of scale on each stroke) on one continuous cycle so it never jerks.
const PAINTING = {
  animate: {
    rotate: [0, -22, 14, -18, 10, -6, 0, 0],
    x: [0, -1.5, 1.5, -1, 1, 0, 0, 0],
    y: [0, -2, 0, -2, 0, -1, 0, 0],
    scale: [1, 1.1, 0.95, 1.08, 0.96, 1.02, 1, 1],
  },
  transition: {
    duration: 3.2,
    times: [0, 0.12, 0.24, 0.36, 0.48, 0.6, 0.8, 1],
    ease: "easeInOut" as const,
    repeat: Infinity,
  },
};

/**
 * Single invented chat bubble under "1 · La carriera di Noorda" — a painter
 * emoji avatar with an animated brush-stroke flourish. On mobile the avatar
 * sits top-left and the bubble runs full-width below it (more room for the
 * long message); from `sm` up it matches Figma: avatar bottom-aligned
 * beside the bubble.
 */
export default function CareerChat({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const shown = inView ? "show" : "hidden";

  return (
    <div ref={ref} className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-end">
      <motion.div
        variants={{
          hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4 },
          show: { opacity: 1, scale: 1 },
        }}
        initial="hidden"
        animate={shown}
        transition={{ type: "spring", stiffness: 380, damping: 18 }}
        role="img"
        aria-label="Emoji di un pittore"
        className="grid size-9 shrink-0 place-items-center rounded-full border-[0.818px] border-[#c4171a] bg-[rgba(196,23,26,0.2)]"
      >
        <motion.span
          aria-hidden="true"
          className="inline-block text-[16.364px] leading-none"
          animate={inView && !reduce ? PAINTING.animate : undefined}
          transition={PAINTING.transition}
        >
          👨🏻‍🎨
        </motion.span>
      </motion.div>

      <motion.div
        variants={{
          hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 },
          show: { opacity: 1, scale: 1, y: 0 },
        }}
        initial="hidden"
        animate={shown}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.12 }}
        style={{ transformOrigin: "top left" }}
        className="w-full min-w-0 rounded-[12px] rounded-tl-[4px] border border-[#e0e0e0] bg-[#f0f0f0] p-5 text-[18px] leading-[26px] tracking-[-0.36px] text-[#141414] sm:w-auto sm:flex-1 sm:rounded-tl-[12px] sm:rounded-bl-[4px]"
      >
        {children}
      </motion.div>
    </div>
  );
}
