export default function ContactSticker() {
  return (
    <div className="flex items-center gap-1.5 rounded-xl border-4 border-white bg-[#ffc9f1] px-4 py-2.5 shadow-sticker-sm sm:gap-2 sm:px-5 sm:py-3">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-[19px] w-[19px] shrink-0 sm:h-[22px] sm:w-[22px]"
      >
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m4 7 8 6 8-6" />
      </svg>
      <div className="flex flex-col items-start text-[14px] leading-tight tracking-[-0.32px] sm:text-[16px]">
        <span className="text-black">Parliamo!</span>
        <a
          href="mailto:lorussosara5@gmail.com"
          draggable={false}
          className="sticker-link text-black/70 outline-none transition-colors hover:text-black focus-visible:ring-2 focus-visible:ring-black/40"
        >
          lorussosara5@gmail.com
        </a>
      </div>
    </div>
  );
}
