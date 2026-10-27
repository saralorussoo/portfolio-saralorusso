import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import backArrow from "../../assets/fuori-corso/back-arrow.svg";
import starSvg from "../../assets/fuori-corso/star-nav.svg";
import { setReturnTarget } from "../../lib/returnTarget";

type Props = {
  /** Centre label, e.g. "Fuori Corso Project". */
  title: string;
  /** Home card id to scroll back to (see lib/returnTarget). */
  returnTarget: string;
  /** The decorative "parliamo!" star hanging below the bar (on by default). */
  sticker?: boolean;
};

/**
 * Sticky bar of a case-study page. "Indietro" goes back to the Home and
 * asks it to centre the project card this page was opened from.
 */
export default function CaseNavbar({ title, returnTarget, sticker = true }: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-black/40 bg-white/20 backdrop-blur-[4px]"
    >
      <nav
        aria-label="Navigazione case study"
        className="relative mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-1 py-5 sm:px-6 lg:px-[100px]"
      >
        <Link
          to="/"
          onClick={() => setReturnTarget(returnTarget)}
          className="group flex h-10 w-fit items-center gap-2 rounded-full px-3 text-lg leading-[normal] text-black/70 outline-none transition-colors hover:text-black focus-visible:ring-2 focus-visible:ring-black/40 sm:px-5"
        >
          <img
            src={backArrow}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="size-3 -scale-x-100 transition-transform duration-200 ease-out group-hover:-translate-x-1"
          />
          Indietro
        </Link>

        <p className="whitespace-nowrap text-[15px] font-medium leading-[normal] tracking-[-0.4px] text-black sm:text-xl">
          {title}
        </p>

        {/* Empty right column keeps the title centred. */}
        <div aria-hidden="true" />

        {sticker && (
          <>
            {/* "parliamo!" sticker: purely decorative for now — no link, no animation.
                It hangs below the bar, as in the Figma. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-2 top-[2px] grid size-[76px] select-none place-items-center sm:right-6 sm:top-[10px] lg:right-[77px] lg:top-[15px] lg:size-[107px]"
            >
              <img
                src={starSvg}
                alt=""
                draggable={false}
                className="absolute w-[64px] -rotate-[6.75deg] lg:w-[91px]"
              />
              <span className="relative rotate-[11.35deg] whitespace-nowrap font-neulis text-[15px] leading-[normal] tracking-[-0.36px] text-black lg:text-[18px]">
                parliamo!
              </span>
            </div>
          </>
        )}
      </nav>
    </motion.header>
  );
}
