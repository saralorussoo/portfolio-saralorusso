import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import CaseNavbar from "../components/case-study/CaseNavbar";
import CaseStudyButton from "../components/CaseStudyButton";
import {
  Body,
  CaseSection,
  Em,
  OUTLINE_PILL,
  Reveal,
  SectionLabel,
  TagPill,
} from "../components/case-study/primitives";
import { setReturnTarget } from "../lib/returnTarget";
import { prefetchCaseStudy } from "../lib/routes";
import suiteLogo from "../assets/head-spa/suite11-logo.svg";
import lightbulb from "../assets/head-spa/lightbulb.svg";
import anatomy from "../assets/head-spa/anatomy.jpg";
import pageCover from "../assets/head-spa/page-01-cover.jpg";
import pageIntro from "../assets/head-spa/page-02-03-intro.jpg";
import pageRitual1 from "../assets/head-spa/page-04-05-ritual-1.jpg";
import pageRitual2 from "../assets/head-spa/page-06-07-ritual-2.jpg";
import pageRitual3 from "../assets/head-spa/page-08-09-ritual-3.jpg";
import pageRitual4 from "../assets/head-spa/page-10-11-ritual-4.jpg";
import pageBack from "../assets/head-spa/page-12-back.jpg";
import affinityIcon from "../assets/bob-noorda/affinity-icon.png";
import spreadMilano from "../assets/bob-noorda/spread-milano.jpg";
import spreadNewYork from "../assets/bob-noorda/spread-newyork.jpg";
import spreadSaoPaulo from "../assets/bob-noorda/spread-saopaulo.jpg";
import spreadIdentita from "../assets/bob-noorda/spread-identita.jpg";

/* ---------------------------------- data --------------------------------- */

const META = ["Ott 2026", "Editorial & Print Design", "Affinity"];

/** Warm palette of the catalogue: gold → brown, plus the slate and sky accents. */
const GOLD = "#cca164";
const BROWN = "#665132";

const ROLE_DONE = [
  "Concept e art direction (The Art of Japanese Wellbeing)",
  "Scrittura dei testi dei rituali",
  "Impaginazione e preparazione del file di stampa (Affinity)",
];
const ROLE_NOT = "Non di mia competenza: logo e fotografie (forniti dal cliente)";

const PROBLEMS = [
  {
    tag: "Atmosfera vs informazione",
    text: "Durata, fasi e prezzo dovevano essere trovati a colpo d'occhio, senza rompere il tono rilassato e raffinato del catalogo.",
  },
  {
    tag: "Immagini vincolate",
    text: "Le fotografie erano fornite dal cliente e non era possibile averne altre: il layout doveva valorizzarle così com'erano.",
  },
];

const GOALS = [
  {
    tag: "Esclusività",
    color: GOLD,
    bg: "rgba(204,161,100,0.3)",
    pillText: "text-black",
    text: "Comunicare il valore dei trattamenti a una clientela selezionata, con un linguaggio premium ma misurato.",
  },
  {
    tag: "Chiarezza",
    color: BROWN,
    bg: "rgba(102,81,50,0.2)",
    pillText: "text-white",
    text: "Organizzare le informazioni di ogni rituale in una struttura sempre uguale, facile da consultare.",
  },
  {
    tag: "Stampa",
    color: "#626f77",
    bg: "rgba(98,111,119,0.3)",
    pillText: "text-white",
    text: "Realizzare un prodotto editoriale curato e pronto per la tipografia.",
  },
  {
    tag: "Atmosfera",
    color: "#64a4cc",
    bg: "rgba(100,164,204,0.5)",
    pillText: "text-black",
    text: "Trasmettere un senso di benessere attraverso spazio bianco, colore e tipografia.",
  },
];

const BENCHMARK = [
  {
    element: "Tipografia",
    pattern: "Serif eleganti per i titoli, sans-serif sottili per i testi",
    applied: "TAN - PEARL per i titoli, Manrope per i testi",
  },
  {
    element: "Colore",
    pattern: "Palette neutre e calde, pochi accenti",
    applied: "Avorio e antracite come unici colori principali",
  },
  {
    element: "Spazio",
    pattern: "Molto bianco, pochi elementi per pagina",
    applied: "Margini ampi, un rituale per doppia pagina",
  },
  {
    element: "Immagini",
    pattern: "Foto morbide, luce naturale, protagoniste della pagina",
    applied: "Una pagina per rituale dedicata quasi solo alla fotografia",
  },
];

const PRINCIPLES = [
  {
    title: "Minimalismo",
    text: "Solo gli elementi necessari: niente decorazioni, linee semplici in continuità con il logo.",
  },
  {
    title: "Equilibrio",
    text: "Alternanza costante tra pagina di testo e pagina visiva, stessa struttura per ogni rituale.",
  },
  {
    title: "Raffinatezza",
    text: "Tipografia editoriale, palette calda, ritmo lento nella lettura.",
  },
];

const COLORS = ["#F6F1E7", "#2B2926"];

/**
 * The 12 pages of the catalogue. `ratio` is the width/height of the artwork
 * (a single page or a spread): the thumbnails are sized from it so every page
 * of a row shares the same height, as in the Figma.
 */
const SINGLE = 1190 / 840;
const SPREAD = 2382 / 840;
const PAGES_ROW_1 = [
  { src: pageCover, label: "1 Copertina", ratio: SINGLE },
  { src: pageIntro, label: "2-3 Japanese Wellbeing", ratio: SPREAD },
  { src: pageRitual1, label: "4-5 Rituale 1", ratio: SPREAD },
  { src: pageRitual2, label: "6-7 Rituale 2", ratio: SPREAD },
];
const PAGES_ROW_2 = [
  { src: pageRitual3, label: "8-9 Rituale 3", ratio: SPREAD },
  { src: pageRitual4, label: "10-11 Rituale 4", ratio: SPREAD },
  { src: pageBack, label: "12 Retro", ratio: SINGLE },
];

const ANATOMY = [
  "Nome del rituale",
  "Descrizione",
  "Fotografie",
  "Durata e prezzo",
  "Fasi del trattamento",
];

const LESSONS = [
  "Definire fin dall'inizio tempistiche e scadenze di approvazione con il cliente.",
  "Prevedere margini per revisioni e imprevisti.",
  "Coinvolgere tempestivamente i fornitori nel processo.",
  "Considerare la fase di produzione come parte integrante della progettazione.",
];

const OTHER_PROJECTS = [
  {
    id: "bob-noorda",
    to: "/bob-noorda",
    title: ["Progetto universitario:", "Mostra su Bob Noorda"],
    cardClassName:
      "rounded-[14.265px] border border-[rgba(247,193,1,0.3)] bg-[rgba(247,193,1,0.1)]",
    buttonTone: "border-white bg-[#f7c101] text-black",
    gallery: [
      { src: spreadMilano, alt: "Doppia pagina del catalogo dedicata alla metropolitana di Milano" },
      { src: spreadNewYork, alt: "Doppia pagina del catalogo dedicata alla New York City Subway" },
      { src: spreadSaoPaulo, alt: "Doppia pagina del catalogo dedicata al Metrô de São Paulo" },
      { src: spreadIdentita, alt: "Doppia pagina del catalogo dedicata all'identità visiva" },
    ],
  },
  {
    id: "wordpress",
    title: ["Progetto universitario:", "Sito web in Wordpress"],
    cardClassName: "rounded-[20px] bg-[#ffc9f1]",
    buttonTone: "border-white bg-[#ffc9f1] text-black",
    gallery: undefined,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** How much a catalogue page grows on hover (desktop). */
const ZOOM = 2.7;

/* -------------------------------- helpers --------------------------------- */

/** Suite11 monogram + hairline + "HEAD SPA", drawn in on load. */
function SuiteMark() {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-[125.264px] w-[91px] shrink-0" aria-hidden="true">
      <motion.img
        src={suiteLogo}
        alt=""
        width={91}
        height={87.213}
        draggable={false}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className="absolute left-0 top-0 block h-[87.213px] w-[91px] max-w-none"
      />
      <motion.span
        initial={reduce ? { opacity: 0 } : { opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
        style={{ transformOrigin: "left center" }}
        className="absolute left-0 top-[98px] block h-px w-[90.85px] bg-[linear-gradient(90deg,#cca164,#665132)]"
      />
      <motion.p
        initial={reduce ? { opacity: 0 } : { opacity: 0, letterSpacing: "0.45em" }}
        animate={{ opacity: 1, letterSpacing: "0.15em" }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.6 }}
        style={{
          backgroundImage: "linear-gradient(24.877deg, rgb(204,161,100) 2.2%, rgb(102,81,50) 100.9%)",
        }}
        className="absolute left-0 top-[102px] whitespace-nowrap bg-clip-text font-manrope text-[16.566px] font-extralight uppercase leading-[23px] text-transparent"
      >
        Head Spa
      </motion.p>
    </div>
  );
}

/** True on a wide screen with a real mouse: where the pages can be enlarged on hover. */
function useDesktopPointer() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

/** Round index badge ("1" … "5") used by the page anatomy list. */
function IndexDot({ children }: { children: string }) {
  return (
    <span className="flex size-[26px] shrink-0 items-center justify-center rounded-full border border-[#c2b189] bg-[#e8e2d3] text-lg leading-[normal] tracking-[-0.36px] text-black transition-colors duration-200 group-hover:bg-[#d9cdb0]">
      {children}
    </span>
  );
}

/** One catalogue page / spread: fades in with its row, lifts on hover. */
function PageThumb({
  src,
  label,
  ratio,
  index,
}: {
  src: string;
  label: string;
  ratio: number;
  index: number;
}) {
  const reduce = useReducedMotion();
  const desktop = useDesktopPointer();
  const figureRef = useRef<HTMLElement>(null);
  const intent = useRef<number>();
  const [zoom, setZoom] = useState<{ x: number; y: number; scale: number } | null>(null);

  useEffect(() => () => window.clearTimeout(intent.current), []);

  /**
   * On desktop the page grows to ~2.7x for reading. It scales from its own
   * centre, then is nudged so it never leaves the viewport (or slips under
   * the sticky bar). Measured from the figure, which never moves.
   */
  const open = () => {
    const fig = figureRef.current;
    if (!fig) return;
    const rect = fig.getBoundingClientRect();
    const w = rect.width;
    const h = w / ratio;
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const marginX = 24;
    const top = 96; // below the sticky case-study bar
    const bottom = 20;
    const scale = Math.min(ZOOM, (vw - 2 * marginX) / w, (vh - top - bottom) / h);
    const cx = rect.left + w / 2;
    const cy = rect.top + h / 2;
    const sw = w * scale;
    const sh = h * scale;
    const left = Math.min(Math.max(cx - sw / 2, marginX), vw - marginX - sw);
    const topEdge = Math.min(Math.max(cy - sh / 2, top), vh - bottom - sh);
    setZoom({ x: left + sw / 2 - cx, y: topEdge + sh / 2 - cy, scale });
  };

  const onEnter = (e: React.PointerEvent) => {
    if (!desktop || e.pointerType !== "mouse") return;
    window.clearTimeout(intent.current);
    intent.current = window.setTimeout(open, 110); // ignore a mouse just passing over
  };
  const onLeave = () => {
    window.clearTimeout(intent.current);
    setZoom(null);
  };

  return (
    <motion.figure
      ref={figureRef}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.07 }}
      style={{ flexGrow: ratio, flexBasis: 0, zIndex: zoom ? 30 : undefined }}
      className="relative flex min-w-0 flex-col gap-[5px]"
    >
      <motion.img
        src={src}
        alt={`Catalogo Head Spa, pagine ${label}`}
        loading="lazy"
        draggable={false}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        animate={zoom ?? { x: 0, y: 0, scale: 1 }}
        whileHover={reduce || desktop ? undefined : { y: -4, scale: 1.02 }}
        transition={
          reduce ? { duration: 0.15 } : { type: "spring", stiffness: 240, damping: 26, mass: 0.9 }
        }
        style={{ aspectRatio: ratio }}
        className={`w-full cursor-zoom-in border border-black/10 bg-white object-cover transition-shadow duration-300 ${
          zoom ? "shadow-[0_28px_70px_rgba(0,0,0,0.3)]" : ""
        }`}
      />
      <figcaption className="text-[10px] font-medium leading-[normal] tracking-[-0.2px] text-black">
        {label}
      </figcaption>
    </motion.figure>
  );
}

/* ---------------------------------- page --------------------------------- */

export default function HeadSpaPage() {
  const reduce = useReducedMotion();
  const from = (y: number) => (reduce ? { opacity: 0 } : { opacity: 0, y });

  // Arrive at the top, whatever the scroll position of the previous page was.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const previous = document.title;
    document.title = "Catalogo Head Spa Suite11 — Sara Lo Russo";
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
      <CaseNavbar title="Head Spa Project" returnTarget="head-spa" sticker={false} />

      <main>
        {/* Hero — Suite11 mark + title + chips, on a faint ivory glow. */}
        <section className="relative overflow-hidden">
          {/* Ivory glow behind the mark; fades out well inside the section, so nothing is clipped. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { opacity: [0, 1, 1], scale: [0.92, 1, 1.05] }}
              transition={
                reduce
                  ? { duration: 0.8 }
                  : { duration: 9, ease: "easeInOut", times: [0, 0.18, 1], repeat: Infinity, repeatType: "reverse" }
              }
              className="h-full w-[min(820px,150vw)] bg-[radial-gradient(closest-side,rgba(246,241,231,1),rgba(246,241,231,0))]"
            />
          </div>

          <div className="relative mx-auto flex max-w-[1040px] flex-col items-center gap-5 px-6 pb-4 pt-14 sm:px-10 md:pb-0 md:pt-[100px]">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
              <SuiteMark />
              <h1 className="font-neulis text-[clamp(32px,10.4vw,60px)] font-normal leading-[1] tracking-[-0.02em] text-black max-sm:text-center">
                {["Catalogo", "Head Spa Suite11"].map((line, i) => (
                  <motion.span
                    key={line}
                    className="block whitespace-nowrap"
                    initial={from(24)}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.12 }}
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
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.55 + i * 0.08 }}
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
                body: "Suite11 è un salone di bellezza a Saronno (VA) che propone trattamenti Head Spa ispirati alla tradizione giapponese. In occasione di un evento privato, il salone aveva bisogno di un catalogo cartaceo da consegnare a una clientela selezionata, per presentare i rituali e il loro valore.",
              },
              {
                label: "Problema",
                body: "Dieci giorni tra il primo contatto e l'evento, per concept, progettazione, approvazione e stampa. Dentro questi tempi, la sfida progettuale: presentare quattro rituali con nomi, durate, fasi e prezzi senza ridurli a un semplice listino, comunicando esclusività e cura del dettaglio e mantenendo le informazioni pratiche facili da trovare.",
              },
              {
                label: "Approccio",
                body: "Trattare il catalogo come un prodotto editoriale e non come un listino prezzi: ogni rituale ha il suo spazio, il suo ritmo e la sua immagine, dentro un sistema visivo unico e ripetibile.",
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
                {`Il catalogo è in formato `}
                <Em>A5 orizzontale</Em>
                {`, `}
                <Em>12 pagine</Em>
                {`: copertina con logo, una doppia pagina introduttiva, quattro doppie pagine dedicate ai rituali e il retro con le informazioni del salone.`}
              </Body>
              <Body>
                {`Dal concept `}
                <Em>The Art of Japanese Wellbeing</Em>
                {` nasce un linguaggio fatto di linee semplici, spazio bianco e una palette calda e neutra, coerente con il logo esistente del salone.`}
              </Body>
            </div>
          </div>

          <div aria-hidden="true" className="hidden w-px self-stretch bg-[#e0e0e0] lg:block" />

          <div className="flex flex-col gap-3 lg:w-[422px] lg:shrink-0">
            <SectionLabel>Il mio ruolo</SectionLabel>
            <ul className="flex flex-col gap-1">
              {ROLE_DONE.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden="true" className="w-3 shrink-0 pt-0.5 font-mono text-sm leading-5 text-[#3d8f32]">
                    ✓
                  </span>
                  <span className="text-base font-medium leading-[normal] tracking-[-0.32px] text-black">
                    {item}
                  </span>
                </li>
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

        {/* Problemi */}
        <CaseSection className="flex flex-col gap-10">
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
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Main problem — a chat-style bubble with a slowly turning hourglass. */}
          <Reveal y={16}>
            <div className="flex items-end gap-2">
              <motion.span
                aria-hidden="true"
                animate={reduce ? undefined : { rotate: [0, 0, 180, 180, 360] }}
                transition={
                  reduce
                    ? undefined
                    : { duration: 6, ease: "easeInOut", times: [0, 0.35, 0.5, 0.85, 1], repeat: Infinity }
                }
                className="grid size-9 shrink-0 place-items-center rounded-full border border-[#edbabe] bg-[#fff3f3] text-base"
              >
                ⏳
              </motion.span>
              <div className="flex min-w-0 flex-1 flex-col gap-2.5 rounded-xl rounded-bl-[4px] border border-[#edbabe] bg-[#fff3f3] p-5">
                <h3 className="text-lg font-normal leading-[26px] tracking-[-0.36px] text-[#141414]">
                  Problema principale: Le tempistiche
                </h3>
                <p className="text-base font-medium leading-[normal] tracking-[-0.32px] text-[rgba(20,20,20,0.75)]">
                  {`Il progetto è arrivato con una tempistica particolarmente ridotta: il cliente mi ha contattata appena `}
                  <Em>{`dieci giorni prima dell'evento`}</Em>
                  {`. Questo ha richiesto di concentrare in pochi giorni tutte le fasi di lavoro, dalla definizione del concept alla progettazione e impaginazione dell'intera brochure.`}
                </p>
                <p className="text-base font-medium leading-[normal] tracking-[-0.32px] text-[rgba(20,20,20,0.75)]">
                  Dopo una prima revisione, ho inviato al cliente una versione aggiornata del catalogo. L&apos;attesa di tre giorni per ricevere un riscontro ha ulteriormente ristretto i tempi disponibili per la stampa. Nel frattempo avevo già avviato il coordinamento con la tipografia, cercando di conciliare le esigenze del progetto con i tempi di produzione e gli altri lavori in programma.
                </p>
              </div>
            </div>
          </Reveal>
        </CaseSection>

        {/* Obiettivi */}
        <CaseSection>
          <div className="flex flex-col gap-3">
            <SectionLabel>Obiettivi</SectionLabel>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {GOALS.map((g, i) => (
                <Reveal key={g.tag} delay={(i % 2) * 0.08} y={16} className="h-full">
                  <div
                    style={{ backgroundColor: g.bg, borderColor: g.color }}
                    className="flex h-full flex-col items-start gap-[15px] rounded-xl border p-5"
                  >
                    <span
                      style={{ backgroundColor: g.color }}
                      className={`inline-flex items-center justify-center rounded-full px-3.5 py-1 text-base leading-[normal] tracking-[-0.32px] ${g.pillText}`}
                    >
                      {g.tag}
                    </span>
                    <Body>{g.text}</Body>
                  </div>
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
              {/* 1 — Benchmark */}
              <div className="flex w-full items-start gap-3">
                <span
                  style={{ backgroundColor: GOLD }}
                  className="flex w-[26px] shrink-0 items-center justify-center rounded-[5px] text-lg leading-[normal] tracking-[-0.36px] text-black"
                >
                  1
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-normal leading-[normal] tracking-[-0.36px] text-black">
                      Benchmark
                    </h3>
                    <Body>
                      Osservazione di cataloghi e materiali del luxury beauty, della skincare e dell&apos;editoria giapponese, per capire come il settore comunica un servizio premium.
                    </Body>
                  </div>

                  <div role="table" aria-label="Benchmark di settore" className="flex w-full flex-col text-base tracking-[-0.32px]">
                    <div
                      role="row"
                      className="hidden border-b border-[#e0e0e0] py-5 font-bold leading-[normal] text-[rgba(20,20,20,0.65)] md:grid md:grid-cols-3"
                    >
                      <span role="columnheader">Elemento</span>
                      <span role="columnheader">Pattern nel settore</span>
                      <span role="columnheader">Applicazione a Suite11</span>
                    </div>
                    {BENCHMARK.map((row, i) => (
                      <motion.div
                        key={row.element}
                        role="row"
                        initial={from(12)}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, ease: EASE, delay: (i % 2) * 0.05 }}
                        className={`grid grid-cols-1 gap-2 py-5 font-medium leading-[normal] md:grid-cols-3 md:gap-0 ${
                          i < BENCHMARK.length - 1 ? "border-b border-[#e0e0e0]" : ""
                        }`}
                      >
                        <span role="rowheader" className="text-[#141414]">
                          {row.element}
                        </span>
                        <span role="cell" className="text-[rgba(20,20,20,0.65)] md:pr-8">
                          <span className="block text-[13px] text-[#6b6b6b] md:hidden">Pattern nel settore</span>
                          {row.pattern}
                        </span>
                        <span role="cell" className="text-[#141414]">
                          <span className="block text-[13px] text-[#6b6b6b] md:hidden">Applicazione a Suite11</span>
                          {row.applied}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2 — Concept */}
              <div className="flex w-full items-start gap-3">
                <span
                  style={{ backgroundColor: BROWN }}
                  className="flex w-[26px] shrink-0 items-center justify-center rounded-[5px] text-lg leading-[normal] tracking-[-0.36px] text-white"
                >
                  2
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-normal leading-[normal] tracking-[-0.36px] text-black">
                      Concept
                    </h3>
                    <Body>
                      Dalla ricerca emergono tre principi guida, che diventano la base del concept The Art of Japanese Wellbeing: trasformare la presentazione dei trattamenti in un&apos;esperienza editoriale, non in un listino prezzi.
                    </Body>
                  </div>
                  <div className="flex flex-col gap-3 md:flex-row">
                    {PRINCIPLES.map((p, i) => (
                      <Reveal key={p.title} delay={i * 0.08} y={16} className="min-w-0 flex-1">
                        <div className="flex h-full flex-col gap-2 rounded-xl border border-[rgba(150,143,132,0.5)] bg-[rgba(102,81,50,0.1)] p-5">
                          <h4 className="text-xl font-bold leading-[normal] tracking-[-0.4px] text-[#665132]">
                            {p.title}
                          </h4>
                          <Body>{p.text}</Body>
                        </div>
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
              Una palette neutra e calda e due soli font: un sistema essenziale, che lascia spazio alle fotografie e accompagna il logo senza competere con lui.
            </Body>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:items-start">
            <div className="flex flex-col gap-5">
              <TagPill>Colori</TagPill>
              <div className="flex items-center gap-10">
                {COLORS.map((hex, i) => (
                  <motion.div
                    key={hex}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 + i * 0.12 }}
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

            <div aria-hidden="true" className="hidden h-[135px] w-px bg-[#e0e0e0] sm:block" />

            <div className="flex flex-col gap-5">
              <TagPill>Font</TagPill>
              <div className="flex flex-wrap gap-x-[60px] gap-y-6">
                <Reveal y={12}>
                  <div className="flex flex-col gap-2">
                    <p className="whitespace-nowrap font-tan text-[28px] leading-[normal] tracking-[-0.04em] text-[#1a1a1a]">
                      TAN PEARL
                    </p>
                    <p className="text-lg font-medium leading-[normal] tracking-[-0.36px] text-[rgba(20,20,20,0.65)]">
                      Titoli
                    </p>
                  </div>
                </Reveal>
                <Reveal y={12} delay={0.1}>
                  <div className="flex h-[72px] flex-col justify-between">
                    <p className="font-manrope text-[32px] font-normal leading-6 tracking-[-0.04em] text-[#1a1a1a]">
                      Manrope
                    </p>
                    <p className="text-lg font-medium leading-[normal] tracking-[-0.36px] text-[rgba(20,20,20,0.65)]">
                      Testi
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="h-px w-full bg-[#e0e0e0]" />

          <div className="flex flex-col gap-5">
            <TagPill>Impaginazione</TagPill>
            <Body>
              Formato A5 orizzontale, 12 pagine. La sequenza accompagna la lettura dall&apos;atmosfera ai trattamenti, fino alle informazioni pratiche.
            </Body>

            {/* On phones the two rows keep their size and scroll sideways. */}
            <div className="-mx-6 overflow-x-auto px-6 pb-2 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
              <div className="flex min-w-[720px] flex-col gap-5 sm:min-w-0">
                <div className="flex gap-[9.7px]">
                  {PAGES_ROW_1.map((p, i) => (
                    <PageThumb key={p.label} {...p} index={i} />
                  ))}
                </div>
                <div className="flex w-[72.2%] gap-[9.8px]">
                  {PAGES_ROW_2.map((p, i) => (
                    <PageThumb key={p.label} {...p} index={i + 4} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CaseSection>

        {/* Anatomia della doppia pagina */}
        <CaseSection className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <div className="flex flex-col gap-5 lg:w-[221px] lg:shrink-0">
            <SectionLabel>Anatomia della doppia pagina</SectionLabel>
            <ol className="flex flex-col gap-2">
              {ANATOMY.map((item, i) => (
                <motion.li
                  key={item}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                  className="group flex items-start gap-3"
                >
                  <IndexDot>{String(i + 1)}</IndexDot>
                  <span className="text-lg leading-[26px] tracking-[-0.36px] text-black">{item}</span>
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="-mx-6 min-w-0 flex-1 overflow-x-auto px-6 sm:mx-0 sm:px-0 lg:overflow-visible">
            {/* The wrapper is what scrolls into view; the image inside is wiped in left to right. */}
            <motion.div
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.25 }}
              className="w-full min-w-[640px] sm:min-w-0"
            >
              <motion.img
                src={anatomy}
                alt="Doppia pagina di un rituale con cinque punti numerati: nome del rituale, descrizione, fotografie, durata e prezzo, fasi del trattamento"
                width={1638}
                height={578}
                draggable={false}
                variants={
                  reduce
                    ? { hidden: { opacity: 0 }, shown: { opacity: 1 } }
                    : {
                        hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
                        shown: { opacity: 1, clipPath: "inset(0 0% 0 0)" },
                      }
                }
                transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
                className="block h-auto w-full"
              />
            </motion.div>
          </div>
        </CaseSection>

        {/* Realizzazione tecnica */}
        <CaseSection className="flex flex-col gap-3">
          <SectionLabel>Realizzazione tecnica</SectionLabel>
          <Body>Per la produzione degli elaborati ho lavorato con Affinity:</Body>
          <Reveal y={16}>
            <div className="flex w-full flex-col gap-3 rounded-lg border-2 border-[#a7f175] p-5">
              <div className="flex items-center gap-3">
                <img
                  src={affinityIcon}
                  alt=""
                  aria-hidden="true"
                  width={60}
                  height={60}
                  draggable={false}
                  className="size-[60px] shrink-0 object-cover"
                />
                <p className="text-base font-medium leading-[normal] tracking-[-0.32px] text-[#141414]">
                  Affinity (Publisher e Designer)
                </p>
              </div>
              <Body>
                Il catalogo è stato impaginato interamente in Affinity, partendo da una griglia comune a tutte le doppie pagine. Il file finale è stato preparato per la tipografia: formato A5, immagini a 300 dpi, spazio colore CMYK e abbondanza oltre il bordo di taglio.
              </Body>
            </div>
          </Reveal>
        </CaseSection>

        {/* Riflessioni */}
        <CaseSection className="flex flex-col gap-3">
          <SectionLabel>Riflessioni</SectionLabel>
          <div className="flex flex-col gap-3 md:flex-row">
            <Reveal y={16} className="min-w-0 flex-1">
              <div className="flex h-full flex-col items-start gap-[15px] rounded-xl border border-[#e0e0e0] bg-[rgba(240,240,240,0.6)] p-6">
                <TagPill>Stampa</TagPill>
                <Body>
                  {`In condizioni ideali, la produzione tipografica prevede `}
                  <Em>prove di stampa</Em>
                  {` per verificare colori, resa dei materiali e possibili correzioni. In questo caso le tempistiche non hanno permesso di effettuare questi controlli.`}
                </Body>
              </div>
            </Reveal>

            <Reveal y={16} delay={0.08} className="min-w-0 flex-1">
              <div className="flex h-full flex-col gap-3 rounded-xl bg-[rgba(226,195,0,0.1)] p-5">
                <div className="flex items-center gap-3">
                  <motion.img
                    src={lightbulb}
                    alt=""
                    aria-hidden="true"
                    width={24}
                    height={24}
                    draggable={false}
                    animate={
                      reduce
                        ? undefined
                        : {
                            filter: [
                              "drop-shadow(0 0 0px rgba(226,195,0,0))",
                              "drop-shadow(0 0 7px rgba(226,195,0,0.9))",
                              "drop-shadow(0 0 0px rgba(226,195,0,0))",
                            ],
                          }
                    }
                    transition={reduce ? undefined : { duration: 3.2, ease: "easeInOut", repeat: Infinity }}
                    className="size-6 shrink-0"
                  />
                  <h3 className="text-lg font-bold leading-[26px] tracking-[-0.36px] text-[#d8ba00]">
                    L&apos;esperienza mi ha insegnato
                  </h3>
                </div>
                <ol className="flex flex-col text-base font-medium leading-[normal] tracking-[-0.32px] text-[#141414]">
                  {LESSONS.map((lesson, i) => (
                    <li key={lesson} className="flex gap-1.5">
                      <span aria-hidden="true">{i + 1}.</span>
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </CaseSection>

        <CaseSection>
          <Body>
            Questo progetto è stato realizzato per Suite11, salone di bellezza a Saronno, in occasione di un evento privato dedicato ai trattamenti Head Spa.
          </Body>
        </CaseSection>

        {/* Altri progetti */}
        <CaseSection bordered={false} className="flex flex-col gap-10 md:!py-24 lg:!py-[200px]">
          <SectionLabel>Altri progetti</SectionLabel>
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-[60px]">
            {OTHER_PROJECTS.map(({ id, to, title, cardClassName, buttonTone, gallery }) => {
              const rememberCard = () => setReturnTarget(id);
              const card = (
                <motion.div
                  whileHover={reduce ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  style={{ containerType: "inline-size" }}
                  className={`relative flex aspect-[687/420] w-full items-center justify-center overflow-hidden shadow-card ${cardClassName}`}
                >
                  {gallery && (
                    <div className="grid w-[75.9%] grid-cols-2" style={{ gap: "3cqw" }}>
                      {gallery.map((page) => (
                        <img
                          key={page.src}
                          src={page.src}
                          alt={page.alt}
                          loading="lazy"
                          draggable={false}
                          className="aspect-[1191/842] w-full border-solid border-[#f0f0f0] object-cover"
                          style={{ borderWidth: "0.353cqw" }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              );
              return (
                <div key={id} className="flex min-w-0 flex-1 flex-col gap-6">
                  {to ? (
                    <Link
                      to={to}
                      tabIndex={-1}
                      aria-hidden="true"
                      onClick={rememberCard}
                      onMouseEnter={() => prefetchCaseStudy(to)}
                      className="block rounded-[20px] outline-none"
                    >
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="min-w-[180px] flex-1 text-xl font-medium leading-[normal] tracking-[-0.4px] text-black">
                      {title.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </h3>
                    <CaseStudyButton
                      large
                      tone={buttonTone}
                      to={to}
                      onNavigate={rememberCard}
                      onPrefetch={to ? () => prefetchCaseStudy(to) : undefined}
                    >
                      Apri case study
                    </CaseStudyButton>
                  </div>
                </div>
              );
            })}
          </div>
        </CaseSection>
      </main>
    </motion.div>
  );
}
