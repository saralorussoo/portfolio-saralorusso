import { useEffect, useLayoutEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import CaseNavbar from "../components/case-study/CaseNavbar";
import OtherProjects from "../components/case-study/OtherProjects";
import {
  Body,
  CaseSection,
  Em,
  OUTLINE_PILL,
  Reveal,
  SectionLabel,
  TagPill,
} from "../components/case-study/primitives";
import figmaLogo from "../assets/nattbad/figma.png";
import wordpressLogo from "../assets/nattbad/wordpress.png";
import elementorLogo from "../assets/nattbad/elementor.svg";
import wireframes from "../assets/nattbad/wireframe.jpg";
import moodboard from "../assets/nattbad/moodboard.jpg";
import figmaCanvas from "../assets/nattbad/figma-canvas.jpg";
import elementorBlocks from "../assets/nattbad/elementor-blocks.jpg";
import desktopShot from "../assets/nattbad/desktop.jpg";
import mobile1 from "../assets/nattbad/mobile-1.jpg";
import mobile2 from "../assets/nattbad/mobile-2.jpg";
import mobile3 from "../assets/nattbad/mobile-3.jpg";
import mobile4 from "../assets/nattbad/mobile-4.jpg";
import mobile5 from "../assets/nattbad/mobile-5.jpg";
import mobile6 from "../assets/nattbad/mobile-6.jpg";
import tablet1 from "../assets/nattbad/tablet-1.jpg";
import tablet2 from "../assets/nattbad/tablet-2.jpg";

/* ---------------------------------- data --------------------------------- */

const META = ["Feb – Giu 2026", "Progetto universitario", "UX/UI & Web Development", "Figma & WordPress"];

const YELLOW = "#e1c76b";
const ROSE = "#d2ae99";
const RED = "#7d0f13";

const ROLE_DONE = [
  "Mockup in Figma: 6 pagine × 3 formati",
  "Design system (colori, font, bottoni, griglia a 12 colonne)",
  "Sviluppo completo in WordPress ed Elementor",
  "HTML e CSS personalizzati",
  "Plugin e migrazione sull'hosting",
];
const ROLE_NOT = "Non di mia competenza: moodboard, personas e relazione di progetto";

const BRIEF = [
  {
    tag: "6 Pagine",
    color: YELLOW,
    bg: "rgba(225,199,107,0.3)",
    pillText: "text-black",
    text: "Home, Prodotto, Promo, News, Contatti e una a tema libero: Playlist.",
  },
  {
    tag: "Responsive",
    color: ROSE,
    bg: "rgba(210,174,153,0.2)",
    pillText: "text-black",
    text: "Ogni pagina progettata e sviluppata per desktop, tablet e mobile.",
  },
  {
    tag: "Wordpress + Elementor",
    color: "#1a1a1a",
    bg: "rgba(26,26,26,0.3)",
    pillText: "text-white",
    text: "Strumenti obbligatori per lo sviluppo, dal locale fino alla pubblicazione online.",
  },
  {
    tag: "SEO e Sicurezza",
    color: RED,
    bg: "rgba(125,15,19,0.3)",
    pillText: "text-white",
    text: "Due plugin richiesti: Yoast SEO e Wordfence, entrambi configurati.",
  },
];

const PERSONAS = [
  {
    name: "Gian, 24 | Content creator",
    need: "Cerca un oggetto da mostrare nei video.",
    choice: "Reel dei creator",
  },
  {
    name: "Elena, 35 | Business analyst",
    need: "Vuole un prodotto semplice e sicuro per la famiglia.",
    choice: "Recensioni e “Come funziona”",
  },
  {
    name: "Alex, 30 | Video editor",
    need: "Odia i siti caotici e la navigazione lenta.",
    choice: "Layout essenziale, senza pop-up",
  },
];

const SWATCHES = ["#FAFAFA", "#1A1A1A", "#E1C76B", "#D2AE99"];

const CODE_EXAMPLES = [
  "Sezione “Design Look” | Home",
  "Carosello #NATTBADSTYLE | Home",
  "Sezione “Controlli” | Prodotto",
  "Sezione “Motivo del contatto” | Contatti",
];

const PROBLEMS = [
  {
    tag: "Tempi di caricamento",
    text: "Il sito risultava lento: ogni pacchetto di widget pesava sulle prestazioni, insieme alle immagini ad alta risoluzione.",
    lesson: "Ogni plugin ha un costo: pochi strumenti, immagini ottimizzate prima del caricamento.",
  },
  {
    tag: "Migrazione",
    text: "Il passaggio con Duplicator dal locale all'hosting del docente ha dato malfunzionamenti: più volte ho dovuto eseguire questi passaggio.",
    lesson: "La migrazione va pianificata e provata in anticipo, non lasciata alla fine.",
  },
];

const MOBILE_SHOTS = [
  { src: mobile1, alt: "NATTBAD su mobile: pagina Prodotto con la sezione “Come funziona”" },
  { src: mobile2, alt: "NATTBAD su mobile: pagina Home" },
  { src: mobile3, alt: "NATTBAD su mobile: pagina Playlist" },
  { src: mobile4, alt: "NATTBAD su mobile: pagina News" },
  { src: mobile5, alt: "NATTBAD su mobile: pagina Contatti" },
  { src: mobile6, alt: "NATTBAD su mobile: pagina Promo" },
];

const TABLET_SHOTS = [
  { src: tablet1, alt: "NATTBAD su tablet: sezioni “Perché scegliere NATTBAD” e Sconto Esclusivo" },
  { src: tablet2, alt: "NATTBAD su tablet: sezione Spotify Tap e footer" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------- helpers --------------------------------- */

/**
 * The "D" of the NATTBAD logo: a dome with two dots. Drawn once, rotated 90°,
 * and the dots light up in the product colours like a speaker's LEDs.
 */
function LogoD({ reduce }: { reduce: boolean | null }) {
  const led = (from: string, to: string, delay: number) =>
    reduce
      ? undefined
      : {
          fill: ["#ffffff", from, to, "#ffffff"],
          transition: { duration: 4.2, ease: "easeInOut" as const, times: [0, 0.2, 0.55, 1], repeat: Infinity, delay },
        };
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 70.9457 73.8132"
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.55, rotate: -24 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 190, damping: 15, delay: 0.75 }}
      className="ml-[0.01em] block h-[0.7285em] w-[0.7em] shrink-0 overflow-visible"
    >
      <g transform="translate(70.9457 0) rotate(90)" fill="#000">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 70.9457H73.8119L73.8127 36.906C73.8127 57.4865 59.781 25.8218 38.0928 27.8485C17.7102 27.8485 0.000636731 57.4865 0.000636731 36.906L0 70.9457ZM58.763 47.6555C61.7313 47.6555 64.1377 45.3294 64.1377 42.46C64.1377 39.5906 61.7313 37.2645 58.763 37.2645C55.7947 37.2645 53.3883 39.5906 53.3883 42.46C53.3883 45.3294 55.7947 47.6555 58.763 47.6555ZM58.763 61.6296C61.7313 61.6296 64.1377 59.3035 64.1377 56.4341C64.1377 53.5647 61.7313 51.2386 58.763 51.2386C55.7947 51.2386 53.3883 53.5647 53.3883 56.4341C53.3883 59.3035 55.7947 61.6296 58.763 61.6296Z"
        />
        <path d="M73.8127 36.906H0.000636731C0.000636731 57.4865 17.7102 27.8485 38.0928 27.8485C59.781 25.8218 73.8127 57.4865 73.8127 36.906Z" />
        <path d="M0.000636731 36.906H73.8127C73.6222 16.4905 57.1709 0 36.9067 0C16.6424 0 0.191092 16.4905 0.000636731 36.906Z" />
        <motion.circle cx="58.763" cy="42.46" r="5.2" fill="#fff" animate={led(YELLOW, "#f3e3a2", 0)} />
        <motion.circle cx="58.763" cy="56.43" r="5.2" fill="#fff" animate={led(ROSE, "#ecd4c6", 1.4)} />
      </g>
    </motion.svg>
  );
}

/** "NATTBA" + the D: letters rise one after the other, then the D pops in. */
function Wordmark() {
  const reduce = useReducedMotion();
  return (
    <p
      role="img"
      aria-label="NATTBAD"
      className="flex items-baseline justify-center font-montserrat text-[clamp(40px,16.2vw,101.324px)] font-medium leading-[0.8] text-black"
    >
      {"NATTBA".split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: "0.28em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.07 }}
        >
          {ch}
        </motion.span>
      ))}
      <LogoD reduce={reduce} />
    </p>
  );
}

function ArrowRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-5 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
      fill="none"
      stroke={RED}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.33333 10H16.6667M10.8333 15.8333L16.6667 10L10.8333 4.16667" />
    </svg>
  );
}

/** Square tile with a tool's logo (Figma, WordPress, Elementor). */
function LogoTile({ src, imgClassName = "size-full object-cover" }: { src: string; imgClassName?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      whileHover={reduce ? undefined : { rotate: -6, scale: 1.06 }}
      transition={{ type: "spring", stiffness: 300, damping: 14 }}
      className="flex size-[60px] shrink-0 items-center justify-center overflow-hidden rounded-[4.364px] border border-[#d7d7d7] bg-white"
    >
      <img src={src} alt="" aria-hidden="true" draggable={false} className={imgClassName} />
    </motion.span>
  );
}

/** Small grey monospace label used on the "Codice aggiuntivo" cards. */
function CodeChip({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center justify-center rounded bg-[#b9b9b9] p-1 font-mono text-sm font-medium leading-[normal] tracking-[-0.28px] text-black">
      {children}
    </span>
  );
}

/** Small grey label above a group of screenshots (Wireframe, Desktop, Mobile…). */
function ShotLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex w-fit items-center justify-center rounded-full bg-[rgba(26,26,26,0.12)] px-3 py-2 text-sm leading-[normal] tracking-[-0.28px] text-black">
      {children}
    </span>
  );
}

/** A screenshot of the site: fades in and rises as it scrolls into view. No hover effects. */
function ShotImage({
  src,
  alt,
  width,
  height,
  delay = 0,
  plain = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  delay?: number;
  /** Skip the fade-in of the box (the caller reveals the image another way). */
  plain?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={plain ? false : reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
      whileInView={plain ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        draggable={false}
        style={{ aspectRatio: `${width} / ${height}` }}
        className="block h-auto w-full border-2 border-[#f0f0f0] bg-white object-cover"
      />
    </motion.div>
  );
}

/**
 * The full-page desktop capture. From md up it is shown whole, revealed from
 * the top by a white curtain that drops away; on phones it starts clipped (it
 * is very tall) and can be expanded.
 */
function DesktopCapture() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-stretch gap-3">
      <div
        className={`relative transition-[max-height] duration-700 ease-out motion-reduce:transition-none max-md:overflow-hidden md:max-h-none ${
          open ? "max-h-[1400px]" : "max-h-[520px]"
        }`}
      >
        <ShotImage
          src={desktopShot}
          alt="Pagina Home di NATTBAD su desktop, a tutta lunghezza: hero con la cassa, sezioni Design Look, Prodotto, Spotify Tap e footer"
          width={1144}
          height={4096}
          plain
        />
        {/* Curtain: covers the capture, then shrinks upward to uncover it. */}
        <motion.span
          aria-hidden="true"
          initial={reduce ? { opacity: 1 } : { scaleY: 1 }}
          whileInView={reduce ? { opacity: 0 } : { scaleY: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: reduce ? 0.5 : 1.6, ease: EASE, delay: 0.1 }}
          style={{ transformOrigin: "top" }}
          className="pointer-events-none absolute inset-0 z-[1] bg-white"
        />
        {!open && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-28 bg-gradient-to-t from-white to-transparent md:hidden"
          />
        )}
      </div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="self-center rounded-full border border-black/30 px-4 py-1.5 text-base leading-[normal] tracking-[-0.32px] text-black/70 outline-none transition-colors hover:border-black/60 hover:text-black focus-visible:ring-2 focus-visible:ring-black/40 md:hidden"
      >
        {open ? "Comprimi" : "Mostra la pagina intera"}
      </button>
    </div>
  );
}

/* ---------------------------------- page --------------------------------- */

export default function NattbadPage() {
  const reduce = useReducedMotion();
  const from = (y: number) => (reduce ? { opacity: 0 } : { opacity: 0, y });

  // Arrive at the top, whatever the scroll position of the previous page was.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const previous = document.title;
    document.title = "Sito web NATTBAD — Sara Lo Russo";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="min-h-dvh w-full bg-white"
    >
      <CaseNavbar title="NATTBAD Project" returnTarget="nattbad" sticker={false} />

      <main>
        {/* Hero — logotype + title + chips. */}
        <section className="relative overflow-hidden">
          <div className="relative mx-auto flex max-w-[1040px] flex-col items-center gap-5 px-6 pb-4 pt-14 sm:px-10 md:pb-0 md:pt-[100px]">
            <div className="flex flex-col items-center gap-6">
              <Wordmark />
              <h1 className="text-center font-neulis text-[clamp(26px,7.4vw,60px)] font-normal leading-[1] tracking-[-0.02em] text-black md:text-[60px]">
                {["Progetto universitario", "Sito web NATTBAD"].map((line, i) => (
                  <motion.span
                    key={line}
                    className="block whitespace-nowrap"
                    initial={from(24)}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.55 + i * 0.12 }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>
            </div>

            <ul className="flex flex-wrap items-center justify-center gap-3">
              {META.map((m, i) => (
                <motion.li
                  key={m}
                  initial={from(12)}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.85 + i * 0.08 }}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-black/30 px-3.5 py-1 text-base leading-[normal] tracking-[-0.32px] text-black/50"
                >
                  {m}
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* Background / Problema / Approccio */}
        <CaseSection className="mt-4 md:mt-0">
          <div className="flex flex-col text-base leading-[normal] tracking-[-0.32px]">
            {[
              {
                label: "Background",
                body: "NATTBAD è il sito vetrina della cassa Bluetooth IKEA NATTBAD: sei pagine progettate in Figma e sviluppate in WordPress per raccontare un oggetto che unisce estetica retrò e funzioni moderne.",
              },
              {
                label: "Problema",
                body: "Costruire attorno a un prodotto IKEA un sito di massimo sei pagine, dalla ricerca alla pubblicazione. NATTBAD si compra anche per come sta in una stanza, non solo per come suona: il sito doveva vendere un oggetto d'arredo prima che un dispositivo audio.",
              },
              {
                label: "Approccio",
                body: "Un minimalismo scandinavo scaldato dai colori del prodotto, uno schema di pagina ripetuto e un responsive pensato già dai wireframe, poi portato in WordPress pagina per pagina.",
              },
            ].map((row, i) => (
              <div
                key={row.label}
                className={`flex flex-col gap-1 py-5 md:flex-row md:gap-[75px] ${
                  i > 0 ? "border-t border-[#e0e0e0]" : ""
                }`}
              >
                <h2 className="w-[82px] shrink-0 font-normal text-[#6b6b6b]">{row.label}</h2>
                <p className="min-w-0 flex-1 font-medium text-[rgba(20,20,20,0.85)]">{row.body}</p>
              </div>
            ))}
          </div>
        </CaseSection>

        {/* Descrizione | Il mio ruolo */}
        <CaseSection className="flex flex-col gap-10 lg:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <SectionLabel>Descrizione</SectionLabel>
            <div className="flex flex-col gap-3">
              <Body>
                <Em>Progetto sviluppato in gruppo di tre</Em>
                {`. Le mie colleghe hanno curato ricerca e documentazione; io ho progettato i mockup con il loro supporto e sviluppato il sito su Wordpress.`}
              </Body>
              <Body>
                {`WordPress girava in locale, su un solo computer. Conoscendo l'HTML, mi sono occupata dell'implementazione: `}
                <Em>il design è passato dal mockup al sito</Em>
                {`.`}
              </Body>
            </div>
          </div>

          <div aria-hidden="true" className="hidden w-px self-stretch bg-[#e0e0e0] lg:block" />

          <div className="flex flex-col gap-3 lg:w-[440px] lg:shrink-0">
            <SectionLabel>Il mio ruolo</SectionLabel>
            <ul className="flex flex-col gap-1">
              {ROLE_DONE.map((item, i) => (
                <motion.li
                  key={item}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.45, ease: EASE, delay: i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <span aria-hidden="true" className="w-3 shrink-0 pt-0.5 font-mono text-sm leading-5 text-[#3d8f32]">
                    ✓
                  </span>
                  <span className="text-base font-medium leading-[normal] tracking-[-0.32px] text-black">
                    {item}
                  </span>
                </motion.li>
              ))}
              <li className="mt-2 flex items-start gap-3">
                <span aria-hidden="true" className="w-2.5 shrink-0 pt-0.5 font-mono text-sm leading-5 text-black/20">
                  ✗
                </span>
                <span className="text-base font-medium leading-[normal] tracking-[-0.32px] text-black/65">
                  {ROLE_NOT}
                </span>
              </li>
            </ul>
          </div>
        </CaseSection>

        {/* Il brief */}
        <CaseSection>
          <div className="flex flex-col gap-3">
            <SectionLabel>Il brief</SectionLabel>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {BRIEF.map((b, i) => (
                <Reveal key={b.tag} delay={(i % 4) * 0.07} y={16} className="h-full">
                  <motion.div
                    whileHover={reduce ? undefined : { y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    style={{ backgroundColor: b.bg, borderColor: b.color }}
                    className="flex h-full flex-col items-start gap-[15px] rounded-xl border p-5"
                  >
                    <span
                      style={{ backgroundColor: b.color }}
                      className={`inline-flex items-center justify-center rounded-full px-3.5 py-1 text-base leading-[normal] tracking-[-0.32px] ${b.pillText}`}
                    >
                      {b.tag}
                    </span>
                    <Body>{b.text}</Body>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </CaseSection>

        {/* Ricerca */}
        <CaseSection>
          <div className="flex flex-col gap-3">
            <SectionLabel>Ricerca</SectionLabel>
            <div className="flex flex-col gap-[50px]">
              {/* 1 — Il prodotto */}
              <div className="flex w-full items-start gap-3">
                <span
                  style={{ backgroundColor: YELLOW }}
                  className="flex w-[26px] shrink-0 items-center justify-center rounded-[5px] text-lg leading-[normal] tracking-[-0.36px] text-black"
                >
                  1
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="text-lg font-normal leading-[normal] tracking-[-0.36px] text-black">
                    Il prodotto
                  </h3>
                  <Body>
                    Tre colori (giallo, rosa, nero), pochi comandi fisici e il tasto Spotify Tap che avvia la musica con un gesto. Il punto di forza non era la scheda tecnica ma il design.
                  </Body>
                </div>
              </div>

              {/* 2 — Personas */}
              <div className="flex w-full items-start gap-3">
                <span
                  style={{ backgroundColor: ROSE }}
                  className="flex w-[26px] shrink-0 items-center justify-center rounded-[5px] text-lg leading-[normal] tracking-[-0.36px] text-black"
                >
                  2
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <h3 className="text-lg font-normal leading-[normal] tracking-[-0.36px] text-black">
                    Dalle personas alle scelte di design
                  </h3>
                  <div className="flex flex-col gap-3 md:flex-row">
                    {PERSONAS.map((p, i) => (
                      <Reveal key={p.name} delay={i * 0.08} y={16} className="min-w-0 flex-1">
                        <motion.div
                          whileHover={reduce ? undefined : { y: -4 }}
                          transition={{ type: "spring", stiffness: 300, damping: 22 }}
                          className="group flex h-full flex-col items-start gap-2 rounded-xl bg-[#f4f4f4] p-5"
                        >
                          <h4 className="text-base font-bold leading-[normal] tracking-[-0.32px] text-[#141414]">
                            {p.name}
                          </h4>
                          <Body>{p.need}</Body>
                          <p className="mt-auto flex items-start gap-2 pt-0 text-base font-bold leading-[normal] tracking-[-0.32px] text-[#7d0f13]">
                            <ArrowRight />
                            <span>{p.choice}</span>
                          </p>
                        </motion.div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CaseSection>

        {/* Sistema visivo */}
        <CaseSection className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <SectionLabel>Sistema visivo</SectionLabel>
            <Body>
              Fondo chiaro e testo scuro, con giallo e rosa presi dalle varianti della cassa. Il rosso è riservato solo alla Promo, per segnalare l&apos;urgenza.
            </Body>
          </div>

          <div className="flex flex-col gap-10 md:flex-row md:items-start">
            <div className="flex flex-col gap-5">
              <TagPill>Colori</TagPill>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-5">
                {SWATCHES.map((hex, i) => (
                  <motion.div
                    key={hex}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 + i * 0.1 }}
                    whileHover={reduce ? undefined : { y: -4, scale: 1.06 }}
                    className="flex flex-col items-center gap-[9px]"
                  >
                    <span
                      style={{ backgroundColor: hex }}
                      className="block size-[53px] rounded-full border-[1.5px] border-[rgba(22,18,16,0.1)]"
                    />
                    <span className="text-[12px] leading-[18px] text-[rgba(22,18,16,0.35)]">{hex}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div aria-hidden="true" className="hidden h-[135px] w-px bg-[#e0e0e0] md:block" />

            <div className="flex flex-col gap-5">
              <TagPill>Font</TagPill>
              <div className="flex flex-wrap gap-x-[60px] gap-y-6">
                <Reveal y={12}>
                  <div className="flex flex-col gap-2">
                    <p className="whitespace-nowrap font-bricolage text-[28px] leading-[normal] tracking-[-0.04em] text-[#1a1a1a]">
                      Bricolage Grotesque
                    </p>
                    <p className="text-lg font-medium leading-[normal] tracking-[-0.36px] text-[rgba(20,20,20,0.65)]">
                      Titoli
                    </p>
                  </div>
                </Reveal>
                <Reveal y={12} delay={0.1}>
                  <div className="flex h-[72px] flex-col justify-between">
                    <p className="font-montserrat text-[32px] font-normal leading-6 tracking-[-0.04em] text-[#1a1a1a]">
                      Montserrat
                    </p>
                    <p className="text-lg font-medium leading-[normal] tracking-[-0.36px] text-[rgba(20,20,20,0.65)]">
                      Testi
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </CaseSection>

        {/* Realizzazione tecnica */}
        <CaseSection className="flex flex-col gap-3">
          <SectionLabel>Realizzazione tecnica</SectionLabel>
          <Body>
            Due strumenti, due logiche diverse: il punto più delicato del progetto è stato il passaggio dall&apos;uno all&apos;altro.
          </Body>

          <Reveal y={16}>
            <div className="flex w-full flex-col gap-3 rounded-lg border border-[#00b6ff] p-5">
              <div className="flex items-center gap-3">
                <LogoTile src={figmaLogo} />
                <p className="text-base font-medium leading-[normal] tracking-[-0.32px] text-[#141414]">Figma</p>
              </div>
              <Body>Moodboard, personas, wireframe, mockup (desktop, tablet, mobile).</Body>
            </div>
          </Reveal>

          <Reveal y={16}>
            <div className="flex w-full flex-col gap-6 rounded-lg border-2 border-[#21759b] p-5">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <LogoTile src={wordpressLogo} imgClassName="h-[80%] w-[80%] object-contain" />
                  <LogoTile src={elementorLogo} imgClassName="size-12 object-contain" />
                  <p className="text-base font-medium leading-[normal] tracking-[-0.32px] text-[rgba(20,20,20,0.65)]">
                    <span className="text-[#141414]">WordPress + Elementor</span> per lo sviluppo
                  </p>
                </div>
                <Body>
                  Ho ricostruito pagina per pagina i mockup in locale, con il tema Phlox ed Elementor. Il problema: Figma è un canvas libero, Elementor un sistema a componenti. L&apos;implementazione è stata più lunga della progettazione.
                </Body>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
                {[
                  { src: figmaCanvas, caption: "In Figma posiziono tutto dove voglio", delay: 0 },
                  {
                    src: elementorBlocks,
                    caption: "In Elementor gli elementi sono fissi: sezioni > colonne > widget",
                    delay: 0.12,
                  },
                ].map((f) => (
                  <motion.figure
                    key={f.src}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: EASE, delay: f.delay }}
                    className="flex min-w-0 flex-col gap-2"
                  >
                    <figcaption className="text-base font-medium leading-[normal] tracking-[-0.32px] text-[#141414]">
                      {f.caption}
                    </figcaption>
                    <img
                      src={f.src}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      draggable={false}
                      className="block h-auto w-full max-w-[478px] rounded-[10px] object-cover"
                    />
                  </motion.figure>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-base font-medium leading-[normal] tracking-[-0.32px] text-[#141414]">
                  Codice aggiuntivo
                </h3>
                <div className="flex flex-col gap-3 md:flex-row">
                  <Reveal y={14} className="min-w-0 flex-1">
                    <div className="flex h-full flex-col gap-2 rounded-xl bg-[#f4f4f4] p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <CodeChip>HTML + CSS</CodeChip>
                        <span className="text-xs font-bold leading-[normal] tracking-[-0.24px] text-[rgba(20,20,20,0.7)]">
                          Alcuni esempi...
                        </span>
                      </div>
                      <ul className="ms-6 list-disc text-base font-bold leading-[normal] tracking-[-0.32px] text-[#141414]">
                        {CODE_EXAMPLES.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                  <Reveal y={14} delay={0.08} className="min-w-0 flex-1">
                    <div className="flex h-full flex-col items-start gap-2 rounded-xl bg-[#f4f4f4] p-5">
                      <CodeChip>@media</CodeChip>
                      <p className="text-base font-bold leading-[normal] tracking-[-0.32px] text-[#141414]">
                        CSS per mobile e tablet per rendere il sito responsive
                      </p>
                    </div>
                  </Reveal>
                  <Reveal y={14} delay={0.16} className="min-w-0 flex-1">
                    <div className="flex h-full flex-col items-start gap-2 rounded-xl bg-[#f4f4f4] p-5">
                      <CodeChip>embed</CodeChip>
                      <p className="text-base font-bold leading-[normal] tracking-[-0.32px] text-[#141414]">
                        Playlist incorporate con il codice di Spotify
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>

              <dl className="flex flex-col text-base font-medium leading-[normal] tracking-[-0.32px]">
                {[
                  ["Tema", "Phlox"],
                  ["Plugin obbligatori", "Yoast SEO, Wordfence, Contact Form 7, Duplicator"],
                ].map(([term, value], i) => (
                  <div
                    key={term}
                    className={`grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-4 border-b border-[#e0e0e0] py-5 md:grid-cols-2 ${
                      i === 0 ? "border-t" : ""
                    }`}
                  >
                    <dt className="text-[#141414]">{term}</dt>
                    <dd className="text-[rgba(20,20,20,0.65)]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </CaseSection>

        {/* Problemi */}
        <CaseSection>
          <div className="flex flex-col gap-3">
            <SectionLabel>Problemi</SectionLabel>
            <div className="flex flex-col gap-3 md:flex-row">
              {PROBLEMS.map((p, i) => (
                <Reveal key={p.tag} delay={i * 0.08} y={16} className="min-w-0 flex-1">
                  <div className="flex h-full flex-col items-start gap-[15px] rounded-xl border border-[rgba(196,24,38,0.3)] p-5">
                    <span className={`${OUTLINE_PILL} border-[rgba(196,24,38,0.3)] text-black`}>
                      {p.tag}
                    </span>
                    <Body>{p.text}</Body>
                    <motion.span
                      aria-hidden="true"
                      initial={reduce ? { opacity: 0 } : { scaleX: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.1 }}
                      style={{ transformOrigin: "left center" }}
                      className="block h-px w-full bg-black/20"
                    />
                    <p className="text-base font-medium leading-[normal] tracking-[-0.32px] text-[#141414]">
                      {p.lesson}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </CaseSection>

        {/* Wireframe, moodboard, then the site on desktop / mobile / tablet */}
        <CaseSection className="flex flex-col gap-10">
          <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-5">
            <div className="flex min-w-0 flex-col gap-3 md:flex-[673_1_0%]">
              <ShotLabel>Wireframe</ShotLabel>
              <motion.div initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.3 }}>
                <motion.img
                  src={wireframes}
                  alt="Wireframe desktop delle sei pagine: Homepage, Prodotto, News, Contatti, Promo e Playlist"
                  width={1800}
                  height={1138}
                  loading="lazy"
                  draggable={false}
                  variants={
                    reduce
                      ? { hidden: { opacity: 0 }, shown: { opacity: 1 } }
                      : {
                          hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
                          shown: { opacity: 1, clipPath: "inset(0 0% 0 0)" },
                        }
                  }
                  transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
                  className="block h-auto w-full"
                />
              </motion.div>
            </div>

            <div className="flex min-w-0 flex-col gap-3 md:flex-[346.5_1_0%]">
              <ShotLabel>Moodboard</ShotLabel>
              <motion.img
                src={moodboard}
                alt="Moodboard: palette gialla, rosa, nera e bianca, interni caldi e ambienti domestici, la cassa NATTBAD gialla e i font Bricolage Grotesque e Montserrat"
                width={1470}
                height={1837}
                loading="lazy"
                draggable={false}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
                className="block h-auto w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-10 md:flex-row md:gap-5">
            <div className="flex min-w-0 flex-col gap-3 md:flex-[449_1_0%]">
              <ShotLabel>Desktop</ShotLabel>
              <DesktopCapture />
            </div>

            <div
              style={{ containerType: "inline-size" }}
              className="flex min-w-0 flex-col gap-3 md:flex-[571_1_0%]"
            >
              <ShotLabel>Mobile</ShotLabel>
              <div className="grid grid-cols-3" style={{ gap: "3.378cqw" }}>
                {MOBILE_SHOTS.map((m, i) => (
                  <ShotImage key={m.src} {...m} width={582} height={1260} delay={(i % 3) * 0.08} />
                ))}
              </div>
              <ShotLabel>Tablet</ShotLabel>
              {TABLET_SHOTS.map((t, i) => (
                <ShotImage key={t.src} {...t} width={1128} height={i === 0 ? 767 : 712} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </CaseSection>

        {/* Riflessioni */}
        <CaseSection className="flex flex-col gap-3">
          <SectionLabel>Riflessioni</SectionLabel>
          <Reveal y={16}>
            <div className="flex flex-col items-start gap-[15px] rounded-xl border border-[#e1c76b] bg-[rgba(225,199,107,0.2)] p-6">
              <span className="inline-flex items-center justify-center rounded-full bg-[rgba(225,199,107,0.8)] px-3.5 py-1.5 text-base leading-[normal] tracking-[-0.32px] text-black">
                Dal design al prodotto
              </span>
              <Body>
                {`Seguire lo stesso progetto dal mockup fino alla pubblicazione mi ha fatto capire quali scelte di design reggono quando devono diventare codice. La lezione più importante: `}
                <Em>progettare tenendo conto di come una pagina verrà costruita</Em>
                {`, non solo di come apparirà.`}
              </Body>
            </div>
          </Reveal>
        </CaseSection>

        <CaseSection>
          <Body>
            Questo progetto è stato realizzato come progetto universitario per il corso di Tecnologie e Persona nel Web, Laurea magistrale in Teorie e Tecnologie per la Comunicazione, Università degli Studi di Milano-Bicocca.
          </Body>
        </CaseSection>

        {/* Altri progetti */}
        <OtherProjects ids={["kalos", "osteopata"]} />
      </main>
    </motion.div>
  );
}
