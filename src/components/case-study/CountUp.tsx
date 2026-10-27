import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/** 261106 -> "261.106" (Italian thousands separator, also for 4 digits). */
const format = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Counts from 0 to `to` the first time it scrolls into view. */
export default function CountUp({
  to,
  prefix = "",
  className = "",
}: {
  to: number;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduce) {
      setValue(to);
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  const final = `${prefix}${format(to)}`;

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {/* Screen readers get the final figure right away, not the running count. */}
      <span className="sr-only">{final}</span>
      {/* The invisible final value reserves the width, so the counting never shifts the layout. */}
      <span aria-hidden="true" className="invisible">
        {final}
      </span>
      <span aria-hidden="true" className="absolute inset-0 text-center">
        {prefix}
        {format(value)}
      </span>
    </span>
  );
}
