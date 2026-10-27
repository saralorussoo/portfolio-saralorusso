import type { ReactNode } from "react";
import { Link } from "react-router-dom";

function ArrowIcon({ large }: { large?: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-300 ease-out group-hover:translate-x-1 ${
        large ? "lg:size-6" : ""
      }`}
      aria-hidden="true"
    >
      <path
        d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z"
        fill="currentColor"
      />
    </svg>
  );
}

const BASE =
  "group flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border-4 py-2.5 pl-7 pr-6 leading-normal tracking-[-0.02em] shadow-sticker-sm outline-none transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-sticker focus-visible:ring-2 focus-visible:ring-black/40 active:translate-y-0 active:scale-[0.98]";
const DEFAULT_TONE = "border-white bg-[#ffc9f1] text-black";
const SIZE = "text-[16px]";
const SIZE_LARGE = "text-[16px] lg:text-[18px] lg:leading-9";

type Props = {
  children: ReactNode;
  /** When set the button is a real link to a case-study page. */
  to?: string;
  onNavigate?: () => void;
  onPrefetch?: () => void;
  /** Border, background and text colour classes. Defaults to the pink pill. */
  tone?: string;
  /** Home-page size: 18px label and 24px arrow from `lg` up. */
  large?: boolean;
};

/** The "Apri case study" pill. Renders a <button> until a page exists. */
export default function CaseStudyButton({
  children,
  to,
  onNavigate,
  onPrefetch,
  tone = DEFAULT_TONE,
  large,
}: Props) {
  const classes = `${BASE} ${large ? SIZE_LARGE : SIZE} ${tone}`;
  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        onClick={onNavigate}
        onMouseEnter={onPrefetch}
        onFocus={onPrefetch}
        onTouchStart={onPrefetch}
      >
        {children}
        <ArrowIcon large={large} />
      </Link>
    );
  }
  return (
    <button type="button" className={classes}>
      {children}
      <ArrowIcon large={large} />
    </button>
  );
}
