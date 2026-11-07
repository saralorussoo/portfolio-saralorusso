import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import playerSkip from "../../assets/home/player-next.svg";

// Figma state: 2:14 played, -1:13 left (3:27 in total), bar filled to 79%.
const START = 134;
const TOTAL = 207;
const START_PCT = 79;

const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/**
 * Music-player card. Sized in `em` (1em = 13.687px in Figma), so the whole card
 * scales with the font size set by the breakpoint. The play button works: the
 * bar and both clocks run until the end of the track, then reset.
 */
export default function MusicSticker() {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(START);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setElapsed((s) => {
        if (s + 1 >= TOTAL) {
          setPlaying(false);
          return START;
        }
        return s + 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [playing]);

  const pct = START_PCT + ((elapsed - START) / (TOTAL - START)) * (100 - START_PCT);

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-white bg-white p-[0.5845em] text-[10.5px] shadow-sticker sm:text-[12px] xl:text-[13.687px]">
      <div className="flex w-[22.65em] flex-col gap-[1em] rounded-[1em] border-[0.05em] border-black/10 bg-white p-[1.5em]">
        <div className="flex items-center gap-[1em]">
          <div aria-hidden="true" className="size-[5em] shrink-0 rounded-[0.6em] bg-[#ec0203]" />
          <div className="flex w-[13.1em] flex-col font-bold leading-[normal]">
            <p className="text-[1em] uppercase tracking-[-0.02em] text-black">quanto forte ti pensavo</p>
            <p className="text-[0.8em] tracking-[-0.02em] text-[#848484]">Madame</p>
          </div>
        </div>

        <div className="flex flex-col gap-[0.2em]">
          <div
            role="progressbar"
            aria-label="Avanzamento del brano"
            aria-valuemin={0}
            aria-valuemax={TOTAL}
            aria-valuenow={elapsed}
            className="h-[0.3em] overflow-hidden rounded-full bg-[#cecece]"
          >
            <div
              className="h-full rounded-full bg-[#151515]"
              style={{ width: `${pct}%`, transition: reduce ? "none" : "width 1s linear" }}
            />
          </div>
          <div className="flex justify-between text-[0.6em] font-medium leading-[normal] tracking-[-0.02em] text-[#626262]">
            <span>{clock(elapsed)}</span>
            <span>-{clock(TOTAL - elapsed)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-[2em]">
          <img
            src={playerSkip}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="h-[0.7em] w-[1.35em] max-w-none rotate-180"
          />
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pausa" : "Riproduci"}
            aria-pressed={playing}
            className="sticker-link grid size-[2.8em] cursor-pointer place-items-center rounded-full bg-[#151515] outline-none transition-transform duration-150 hover:scale-110 focus-visible:ring-2 focus-visible:ring-black/40 active:scale-95"
          >
            <svg viewBox="0 0 38.3223 38.3223" aria-hidden="true" className="size-full">
              {playing ? (
                <>
                  <rect x="12" y="10.5" width="5" height="17.3" rx="1" fill="white" />
                  <rect x="21.3" y="10.5" width="5" height="17.3" rx="1" fill="white" />
                </>
              ) : (
                <path d="M28.6204 19.1611L14.4315 27.3531L14.4315 10.9692L28.6204 19.1611Z" fill="white" />
              )}
            </svg>
          </button>
          <img
            src={playerSkip}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="h-[0.7em] w-[1.35em] max-w-none"
          />
        </div>
      </div>
    </div>
  );
}
