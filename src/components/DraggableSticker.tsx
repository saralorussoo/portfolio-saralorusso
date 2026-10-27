import { useState, useRef, type ReactNode, type RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";

let topZ = 10;

type DraggableStickerProps = {
  children: ReactNode;
  constraintsRef: RefObject<HTMLElement>;
  /** Resting tilt in degrees — gives the scattered, non-aligned sticker feel. */
  rotate?: number;
  /** Must include the sticker's position (e.g. "left-[8%] top-[8%] sm:left-[24%] sm:top-[17%]"). */
  className?: string;
  /** Extra rotation added while the sticker is being grabbed. */
  grabTilt?: number;
  /** Stagger delay for the entrance animation, in seconds. */
  enterDelay?: number;
  /**
   * Below this viewport width (px) the sticker is pinned in place: not
   * draggable, no grab cursor, and it leaves touch scrolling alone.
   */
  fixedBelow?: number;
};

export default function DraggableSticker({
  children,
  constraintsRef,
  rotate = 0,
  className = "",
  grabTilt = 6,
  enterDelay = 0,
  fixedBelow,
}: DraggableStickerProps) {
  const [zIndex, setZIndex] = useState(6);
  const [isGrabbed, setIsGrabbed] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const dragStartTilt = useRef(grabTilt);
  // "not all" never matches, so stickers without `fixedBelow` are always draggable.
  const pinned = useMediaQuery(fixedBelow ? `(max-width: ${fixedBelow - 1}px)` : "not all");

  const bringToFront = () => {
    topZ += 1;
    setZIndex(topZ);
  };

  return (
    <motion.div
      className={`absolute select-none ${
        pinned ? "" : `touch-none ${isGrabbed ? "cursor-grabbing" : "cursor-grab"}`
      } ${className}`}
      style={{ zIndex }}
      drag={!pinned}
      dragConstraints={constraintsRef}
      dragElastic={0.2}
      dragMomentum={!shouldReduceMotion}
      dragTransition={{
        power: 0.3,
        timeConstant: 220,
        bounceStiffness: 320,
        bounceDamping: 24,
      }}
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.7, rotate: rotate - 8 }
      }
      animate={
        shouldReduceMotion
          ? { opacity: 1, rotate }
          : {
              opacity: 1,
              scale: 1,
              rotate: isGrabbed ? rotate + dragStartTilt.current : rotate,
            }
      }
      whileHover={shouldReduceMotion || pinned ? undefined : { scale: 1.03 }}
      transition={
        shouldReduceMotion
          ? { duration: 0.4, delay: enterDelay, ease: "easeOut" }
          : {
              opacity: { delay: enterDelay, duration: 0.5, ease: "easeOut" },
              scale: {
                delay: enterDelay,
                type: "spring",
                stiffness: 260,
                damping: 20,
              },
              default: {
                type: "spring",
                stiffness: 320,
                damping: 22,
                mass: 0.6,
              },
            }
      }
      onPointerDown={() => {
        if (pinned) return;
        dragStartTilt.current = Math.random() > 0.5 ? grabTilt : -grabTilt;
        bringToFront();
      }}
      onDragStart={() => setIsGrabbed(true)}
      onDragEnd={() => setIsGrabbed(false)}
      whileDrag={{
        scale: 1.08,
        boxShadow: "0px 18px 30px rgba(0,0,0,0.28)",
        transition: { duration: 0.15 },
      }}
      whileTap={shouldReduceMotion || pinned ? undefined : { scale: 0.97 }}
    >
      {children}
    </motion.div>
  );
}
