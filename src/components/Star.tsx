import { motion, useReducedMotion } from "framer-motion";

type StarProps = {
  src: string;
  /** Side of the square box the star is drawn in (px, at the Figma size). */
  box: number;
  /** Side of the rotated star itself inside that box. */
  size: number;
  rotate: number;
  /** Figma insets of the exported art around the star: top right bottom left, in %. */
  inset: [number, number, number, number];
  /** Position classes (the star is `absolute`). */
  className: string;
  /** Stagger for the pop-in and the idle drift, in seconds. */
  delay?: number;
};

/**
 * Decorative pink star. It pops in with the stickers, then drifts and
 * turns very slowly; with reduced motion it just sits there.
 */
export default function Star({ src, box, size, rotate, inset, className, delay = 0 }: StarProps) {
  const reduce = useReducedMotion();
  const [top, right, bottom, left] = inset;
  return (
    // The outer box takes the position and the per-breakpoint scale classes; the
    // inner one is animated (framer writes `transform`, which would override them).
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-[1] origin-center ${className}`}
      style={{ width: box, height: box }}
    >
      <motion.div
        className="flex size-full items-center justify-center"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.3 }}
        animate={
          reduce
            ? { opacity: 1 }
            : {
                opacity: 1,
                scale: 1,
                y: [0, -7, 0],
                rotate: [0, 7, 0],
              }
        }
        transition={
          reduce
            ? { duration: 0.4, delay }
            : {
                opacity: { duration: 0.4, delay },
                scale: { type: "spring", stiffness: 200, damping: 12, delay },
                y: { duration: 5 + (delay % 2), repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 },
                rotate: { duration: 6 + (delay % 3), repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 },
              }
        }
      >
        <div className="flex-none" style={{ width: size, height: size, transform: `rotate(${rotate}deg)` }}>
          <div className="relative size-full">
            <div
              className="absolute"
              style={{ top: `${top}%`, right: `${right}%`, bottom: `${bottom}%`, left: `${left}%` }}
            >
              <img src={src} alt="" draggable={false} className="block size-full max-w-none" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
