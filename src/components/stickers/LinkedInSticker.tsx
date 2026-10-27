export default function LinkedInSticker() {
  return (
    <div className="flex items-center gap-2 rounded-xl border-4 border-white bg-[#0b67c4] p-4 shadow-sticker-sm sm:gap-3 sm:p-5">
      <span className="text-base font-bold tracking-[-0.36px] text-white sm:text-lg">
        in
      </span>
      <div className="flex flex-col items-start text-[14px] leading-tight tracking-[-0.32px] sm:text-[16px]">
        <span className="text-white">Linkedin</span>
        <a
          href="https://www.linkedin.com/in/sara-lo-russo"
          target="_blank"
          rel="noopener noreferrer"
          draggable={false}
          className="sticker-link text-white/70 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white"
        >
          /in/sara-lo-russo
        </a>
      </div>
    </div>
  );
}
