const INTERESTS = [
  "fashion trends",
  "gym",
  "pasta lover",
  "watch anime",
  "watch k-drama",
  "music",
  "do my own nails",
  "AI",
];

export default function InterestsSticker() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-white bg-white p-1.5 shadow-sticker sm:p-2">
      <div className="flex w-[200px] flex-col items-start gap-2.5 rounded-md border border-black/10 bg-white p-4 sm:w-[275px] sm:gap-[15px] sm:p-5 lg:w-[347px]">
        <p className="text-sm tracking-[-0.36px] text-black sm:text-lg">
          Interessi
        </p>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {INTERESTS.map((interest) => (
            <span
              key={interest}
              className="whitespace-nowrap rounded-full border border-black/30 px-2.5 py-0.5 text-xs tracking-[-0.32px] text-black/50 sm:px-3.5 sm:py-1 sm:text-base"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
