import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Outline pill used for meta tags, problem tags, etc. across case studies. */
export const OUTLINE_PILL =
  "inline-flex items-center justify-center rounded-full border px-3.5 py-1 text-base leading-[normal] tracking-[-0.32px]";

/**
 * Full-width band with the 1px divider; content is centred in a 1040px column
 * and fades/rises in the first time it scrolls into view.
 */
export function CaseSection({
  children,
  className = "",
  bordered = true,
  id,
}: {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  id?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <section
      id={id}
      className={`w-full ${bordered ? "border-b border-[#e0e0e0]" : ""}`}
    >
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: "some", margin: "0px 0px -60px 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto w-full max-w-[1040px] px-6 py-12 sm:px-10 md:py-[60px] xl:px-0 ${className}`}
      >
        {children}
      </motion.div>
    </section>
  );
}

/** Grey section title ("Problemi", "Obiettivi", …). */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-lg font-normal leading-[normal] tracking-[-0.36px] text-[#6b6b6b]">
      {children}
    </h2>
  );
}

/** Body copy used across the page (Medium 16px, 65% ink). */
export function Body({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-base font-medium leading-[normal] tracking-[-0.32px] text-[rgba(20,20,20,0.65)] ${className}`}
    >
      {children}
    </p>
  );
}

/** Emphasised words inside body copy. */
export function Em({ children }: { children: ReactNode }) {
  return <span className="text-[#141414]">{children}</span>;
}

/** Soft grey tag used as a card header ("Colori", "Font", …). */
export function TagPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center justify-center rounded-full bg-[rgba(26,26,26,0.12)] px-3.5 py-1.5 text-base leading-[normal] tracking-[-0.32px] text-black">
      {children}
    </span>
  );
}

/** Fade + rise when scrolled into view. Runs once. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
