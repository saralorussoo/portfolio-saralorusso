import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Mood = "thinking" | "huffing";

const CHATS: { mood: Mood; emoji: string; label: string; text: string }[] = [
  {
    mood: "thinking",
    emoji: "🤔",
    label: "Emoji pensierosa",
    text: "Perché la maggior parte delle frasi sono in inglese?",
  },
  {
    mood: "huffing",
    emoji: "😤",
    label: "Emoji che sbuffa",
    text: "Le informazioni sono poco leggibili e non immediate",
  },
];

// One slow loop per mood, expressed with keyframe `times` so the burst and
// the pause share a single cycle (no repeatDelay drift between layers).
const THINKING = {
  animate: { rotate: [0, -14, 9, -6, 0, 0], y: [0, -1.5, 0, 0, 0, 0] },
  transition: {
    duration: 4,
    times: [0, 0.14, 0.28, 0.42, 0.56, 1],
    ease: "easeInOut" as const,
    repeat: Infinity,
  },
};
const HUFFING = {
  animate: { scale: [1, 1.22, 1, 1], x: [0, -1, 1, 0] },
  transition: {
    duration: 2.6,
    times: [0, 0.14, 0.32, 1],
    ease: "easeOut" as const,
    repeat: Infinity,
  },
};

/** Little steam puffs that leave the avatar in sync with the huff. */
function Steam({ side }: { side: "left" | "right" }) {
  const dir = side === "left" ? -1 : 1;
  return (
    <motion.span
      aria-hidden="true"
      className={`absolute top-0 size-1.5 rounded-full bg-white ring-1 ring-[#93adf1]/70 ${
        side === "left" ? "left-1" : "right-1"
      }`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0, 0.95, 0, 0],
        x: [0, 0, 5 * dir, 9 * dir, 9 * dir],
        y: [0, 0, -6, -12, -12],
        scale: [0.4, 0.4, 1, 1.6, 1.6],
      }}
      transition={{
        duration: 2.6,
        times: [0, 0.12, 0.3, 0.55, 1],
        ease: "easeOut",
        repeat: Infinity,
      }}
    />
  );
}

function ChatMessage({
  chat,
  delay,
}: {
  chat: (typeof CHATS)[number];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const loop = chat.mood === "thinking" ? THINKING : HUFFING;
  const shown = inView ? "show" : "hidden";

  return (
    <div ref={ref} className="flex min-w-0 items-end gap-2">
      <motion.div
        variants={{
          hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4 },
          show: { opacity: 1, scale: 1 },
        }}
        initial="hidden"
        animate={shown}
        transition={{ type: "spring", stiffness: 380, damping: 18, delay }}
        role="img"
        aria-label={chat.label}
        className="relative grid size-9 shrink-0 place-items-center rounded-full border-[0.818px] border-[#93adf1] bg-[#d2dcf7]"
      >
        <motion.span
          aria-hidden="true"
          className="inline-block text-[16.364px] leading-none"
          animate={inView && !reduce ? loop.animate : undefined}
          transition={loop.transition}
        >
          {chat.emoji}
        </motion.span>
        {chat.mood === "huffing" && inView && !reduce && (
          <>
            <Steam side="left" />
            <Steam side="right" />
          </>
        )}
      </motion.div>

      <motion.p
        variants={{
          hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 8 },
          show: { opacity: 1, scale: 1, y: 0 },
        }}
        initial="hidden"
        animate={shown}
        transition={{ type: "spring", stiffness: 300, damping: 22, delay: delay + 0.12 }}
        style={{ transformOrigin: "bottom left" }}
        className="min-w-0 rounded-[12px] rounded-bl-[4px] border border-[#e0e0e0] bg-[#f0f0f0] p-5 text-[18px] leading-[26px] tracking-[-0.36px] text-[#141414] xl:whitespace-nowrap"
      >
        {chat.text}
      </motion.p>
    </div>
  );
}

/** The two tiny invented chat messages under "Problemi". */
export default function ProblemChats() {
  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row lg:justify-between">
      {CHATS.map((chat, i) => (
        <ChatMessage key={chat.label} chat={chat} delay={i * 0.35} />
      ))}
    </div>
  );
}
