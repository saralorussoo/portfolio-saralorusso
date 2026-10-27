import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import CaseNavbar from "../components/case-study/CaseNavbar";
import CaseStudyButton from "../components/CaseStudyButton";
import CountUp from "../components/case-study/CountUp";
import DesignProcessSection from "../components/case-study/DesignProcessSection";
import ProblemChats from "../components/case-study/ProblemChats";
import ResearchSection from "../components/case-study/ResearchSection";
import { setReturnTarget } from "../lib/returnTarget";
import { prefetchCaseStudy } from "../lib/routes";
import {
  Body,
  CaseSection,
  Em,
  OUTLINE_PILL,
  Reveal,
  SectionLabel,
  TagPill,
} from "../components/case-study/primitives";
import heroLogo from "../assets/fuori-corso/hero-logo.png";
import postersGrid from "../assets/fuori-corso/posters-grid.jpg";
import lightbulb from "../assets/fuori-corso/lightbulb.svg";
import instagramIcon from "../assets/fuori-corso/instagram.svg";
import spreadMilano from "../assets/bob-noorda/spread-milano.jpg";
import spreadNewYork from "../assets/bob-noorda/spread-newyork.jpg";
import spreadSaoPaulo from "../assets/bob-noorda/spread-saopaulo.jpg";
import spreadIdentita from "../assets/bob-noorda/spread-identita.jpg";

/* ---------------------------------- data --------------------------------- */

const META = ["Ago 2026 – Presente", "Social Media Design", "Figma & Affinity"];

const INSTAGRAM_HANDLE = "@fuoricorso26";
const INSTAGRAM_URL =
  "https://www.instagram.com/fuoricorso26?utm_source=ig_web_button_share_sheet&srtk=ZDNlZDc0MzIxNw==";

const ROLE_DONE = [
  "Locandina e menu per ogni evento (Figma + Affinity)",
  "Sistema colore per segnalare le location",
  `Concept narrativo "album musicale" (tracklist, VOL. 2)`,
];
const ROLE_NOT = "Decisioni su contenuti ed eventi, location, DJ, orari (team)";

const PROBLEMS = [
  {
    tag: "Leggibilità ridotta",
    text: "Gerarchia tipografica poco chiara, con testi e informazioni difficili da individuare a colpo d'occhio.",
  },
  {
    tag: "Identità poco riconoscibile",
    text: "12 eventi in un'unica stagione, quasi uno a settimana, da produrre restando riconoscibili come un'unica serie.",
  },
  {
    tag: "Nuove location",
    text: `Oltre alla base storica Chiappini & Giugni, compaiono Club House e Parco del Santuario. Il cliente ha chiesto che il cambio di locale fosse "molto esplicito".`,
  },
];

const GOALS = [
  {
    tag: "Riconoscibilità",
    color: "#b1e0ff",
    bg: "rgba(177,224,255,0.3)",
    text: "Mantenere la riconoscibilità del brand Fuori Corso su tutti i 12 eventi, indipendentemente dalla location.",
  },
  {
    tag: "Distinzione per location",
    color: "#ffc9f1",
    bg: "rgba(255,201,241,0.2)",
    text: "Rendere immediatamente distinguibile il cambio di locale (Chiappini & Giugni / Club House / Parco del Santuario) tramite il colore.",
  },
  {
    tag: "Scalabilità",
    color: "#ffe9b5",
    bg: "rgba(255,249,235,0.5)",
    text: "Costruire un sistema di post scalabile: locandina + menu per ogni evento, producibile in tempi rapidi (~4h/evento).",
  },
  {
    tag: "Concept narrativo",
    color: "#b2f3f3",
    bg: "rgba(178,243,243,0.3)",
    text: `Introdurre il layer "album musicale", leggibile a colpo d'occhio senza appesantire le informazioni pratiche (data, luogo, orario).`,
  },
];

const AGES = [
  { label: "18 - 24", value: "64,3%", pct: 63.64, color: "#8bd1ff" },
  { label: "25 - 34", value: "26,4%", pct: 27.74, color: "#ffd87d" },
  { label: "13 - 17", value: "2,2%", pct: 4.56, color: "#ffb1ea" },
];

const NEXT_STEPS = [
  "Analisi e metriche Instagram: monitorare sistematicamente i dati di performance (engagement qualitativo, click e salvataggi) per prendere decisioni basate su evidenze concrete.",
  "Feedback loop con team e pubblico: raccogliere spunti, reazioni e commenti degli utenti e confrontarsi con il team per perfezionare la visual.",
  "Ottimizzazione continua: testare ed evolvere costantemente i contenuti per massimizzare impatto visivo e coinvolgimento.",
];

type OtherProject = {
  id: string;
  /** Route of the case study; projects without one get an inert button. */
  to?: string;
  title: string[];
  cardClassName: string;
  buttonTone: string;
  gallery?: { src: string; alt: string }[];
};

const OTHER_PROJECTS: OtherProject[] = [
  {
    id: "head-spa",
    title: ["Catalogo Head Spa Suite11"],
    cardClassName: "rounded-[20px] bg-[#ffc9f1]",
    buttonTone: "border-white bg-[#ffc9f1] text-black",
  },
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
];

/* -------------------------------- helpers -------------------------------- */

/**
 * "@fuoricorso26" link next to the hero chips. The arrow leaps up-right and a
 * second, heavier underline sweeps in from the left on hover/focus.
 */
function InstagramTag({ delay }: { delay: number }) {
  const reduce = useReducedMotion();
  const hover = reduce
    ? {}
    : {
        icon: { hover: { rotate: [0, -14, 10, -6, 0], scale: 1.12, transition: { duration: 0.55 } } },
        arrow: { hover: { x: 4, y: -4, transition: { type: "spring" as const, stiffness: 420, damping: 16 } } },
      };
  return (
    <motion.li
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      <motion.a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Apri il profilo Instagram ${INSTAGRAM_HANDLE} (si apre in una nuova scheda)`}
        initial="rest"
        whileHover="hover"
        whileFocus="hover"
        whileTap={reduce ? undefined : { scale: 0.97 }}
        className="group relative flex items-center gap-2 border-b border-black outline-none focus-visible:ring-2 focus-visible:ring-black/40"
      >
        <motion.span variants={hover.icon} className="relative block size-6 shrink-0">
          <img
            src={instagramIcon}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute inset-[12.5%_12.81%_12.81%_12.5%] size-auto max-w-none"
            style={{ width: "74.69%", height: "74.69%" }}
          />
        </motion.span>
        <span className="text-lg leading-[normal] tracking-[-0.36px] text-black">{INSTAGRAM_HANDLE}</span>
        <motion.span variants={hover.arrow} aria-hidden="true" className="grid size-[33.941px] shrink-0 place-items-center">
          <svg viewBox="0 0 24 24" className="size-6 -rotate-45" fill="none">
            <path d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z" fill="#1F1F1F" />
          </svg>
        </motion.span>
        <span
          aria-hidden="true"
          className="absolute -bottom-px left-0 h-[2px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </motion.a>
    </motion.li>
  );
}

function AgeBar({ label, value, pct, color, delay }: (typeof AGES)[number] & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  return (
    <div className="flex items-center gap-6">
      <span className="w-[52px] shrink-0 text-sm leading-[normal] tracking-[-0.28px] text-[#6b6b6b]">
        {label}
      </span>
      <div
        ref={ref}
        className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#ebebeb]"
        role="img"
        aria-label={`${label} anni: ${value}`}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className="w-[49px] shrink-0 text-right text-sm leading-[normal] tracking-[-0.28px] text-[#6b6b6b]">
        {value}
      </span>
    </div>
  );
}

function Stat({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="flex h-full flex-col items-center gap-2 rounded-xl border border-[#06743c] bg-[rgba(213,255,233,0.1)] p-5 text-center transition-transform duration-200 ease-out hover:-translate-y-1">
      <span className="text-xl font-bold leading-[normal] tracking-[-0.4px] text-[#06743c]">
        {children}
      </span>
      <span className="text-base font-medium leading-[normal] tracking-[-0.32px] text-[rgba(20,20,20,0.65)]">
        {label}
      </span>
    </div>
  );
}

/* ---------------------------------- page --------------------------------- */

export default function FuoriCorsoPage() {
  const reduce = useReducedMotion();
  const from = (y: number) => (reduce ? { opacity: 0 } : { opacity: 0, y });

  // Arrive at the top, whatever the scroll position of the previous page was.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const previous = document.title;
    document.title = "Fuori Corso Instagram — Sara Lo Russo";
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
      <CaseNavbar title="Fuori Corso Project" returnTarget="fuori-corso" sticker={false} />

      <main>
        {/* Hero */}
        <section className="flex flex-col items-center gap-5 px-6 pt-12 sm:pt-[100px]">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-[17px]">
            <motion.img
              src={heroLogo}
              alt=""
              aria-hidden="true"
              width={122}
              height={122}
              draggable={false}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: -18 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.1 }}
              whileHover={reduce ? undefined : { rotate: 12, scale: 1.06 }}
              className="size-[88px] shrink-0 object-contain sm:size-[122px]"
            />
            <h1 className="text-center font-neulis text-[44px] font-normal leading-[1.02] tracking-[-1.2px] text-black sm:text-[60px] sm:leading-[60px]">
              {["Fuori Corso", "Instagram"].map((line, i) => (
                <motion.span
                  key={line}
                  className="block"
                  initial={from(24)}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.12 }}
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
                className={`${OUTLINE_PILL} border-black/30 text-black/50`}
              >
                {m}
              </motion.li>
            ))}
            <InstagramTag delay={0.55 + META.length * 0.08} />
          </ul>
        </section>

        {/* Background / Problema / Approccio */}
        <CaseSection className="mt-4 md:mt-0">
          <div className="flex flex-col text-base leading-[normal] tracking-[-0.32px]">
            {[
              {
                label: "Background",
                body: (
                  <>
                    Fuori Corso è una pagina Instagram che organizza eventi serali per un pubblico giovane a Saronno (VA). Il primo post della stagione è uscito il 28 agosto 2026, ad aprire il programma Fall/Winter 2026 VOL. 2 (il &ldquo;VOL.1&rdquo; era la stagione estiva).
                  </>
                ),
              },
              {
                label: "Problema",
                body: (
                  <>
                    Le grafiche erano poco personalizzate: tipografia, palette e layout rendevano il feed poco riconoscibile.
                    <br />
                    La stagione introduce tre variabili nuove rispetto alla precedente: volume (12 eventi), nuove location (Club House, Parco EX Seminario) e un concept narrativo inedito da integrare senza frammentare il feed.
                  </>
                ),
              },
              {
                label: "Approccio",
                body: (
                  <>
                    Traduco ogni brief in un artefatto visivo coerente con il sistema Fuori Corso: locandina + menu per evento, lavorando in Figma per i contenuti digitali e in Affinity per l&apos;impaginazione di stampa dei menu.
                  </>
                ),
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
            <Body>
              {`La stagione conta 12 eventi, chiamati `}
              <Em>TRACKS</Em>
              {`: ogni evento ha una locandina e quasi sempre un menu abbinato (mostrato in storia e stampato fuori dal locale), più un post `}
              <Em>Tracklist</Em>
              {` mensile che riepiloga le date del mese (novembre e dicembre sono accorpati, per 3 tracklist totali sulla stagione). Rispetto alla stagione precedente, la novità è duplice: un layer narrativo "da album musicale" (tracce, tracklist, "VOL. 2") e due nuove location: Club House e Parco EX Seminario, accanto alla base storica Chiappini & Giugni.`}
            </Body>
          </div>

          <div aria-hidden="true" className="hidden w-px self-stretch bg-black/20 lg:block" />

          <div className="flex flex-col gap-3">
            <SectionLabel>Il mio ruolo</SectionLabel>
            <ul className="flex flex-col gap-1">
              {ROLE_DONE.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden="true" className="w-3 pt-0.5 font-mono text-sm leading-5 text-[#3d8f32]">
                    ✓
                  </span>
                  <span className="text-base font-medium leading-[normal] tracking-[-0.32px] text-black lg:whitespace-nowrap">
                    {item}
                  </span>
                </li>
              ))}
              <li className="mt-2 flex items-start gap-3">
                <span aria-hidden="true" className="w-3 pt-0.5 font-mono text-sm leading-5 text-black/20">
                  ✗
                </span>
                <span className="text-base font-medium leading-[normal] tracking-[-0.32px] text-black/65 lg:whitespace-nowrap">
                  <span className="sr-only">Non di mia competenza: </span>
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
          <ProblemChats />
        </CaseSection>

        {/* Obiettivi */}
        <CaseSection>
          <div className="flex flex-col gap-3">
            <SectionLabel>Obiettivi</SectionLabel>
            <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
              {GOALS.map((g, i) => (
                <Reveal key={g.tag} delay={(i % 2) * 0.08} y={16}>
                  <div
                    style={{ backgroundColor: g.bg, borderColor: g.color }}
                    className="flex flex-col items-start gap-[15px] rounded-xl border p-5"
                  >
                    <span
                      style={{ backgroundColor: g.color }}
                      className="inline-flex items-center justify-center rounded-full px-3.5 py-1 text-base leading-[normal] tracking-[-0.32px] text-black"
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

        <ResearchSection />
        <DesignProcessSection />

        {/* Locandine */}
        <CaseSection className="flex justify-center">
          <img
            src={postersGrid}
            width={2080}
            height={2600}
            loading="lazy"
            alt="Griglia delle nove locandine e menu della stagione Fall/Winter 2026: Club House 23 ottobre, Chiappini & Giugni 16 ottobre, Parco EX Seminario 2 ottobre, Tracklist di ottobre, Club House 26 settembre, 18 settembre, 12 settembre, 5 settembre e Tracklist di settembre"
            className="h-auto w-full max-w-[1040px]"
          />
        </CaseSection>

        {/* Dati */}
        <CaseSection className="flex flex-col gap-[50px]">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <SectionLabel>Dati</SectionLabel>
              <Body>
                {`Il progetto è ancora all'inizio della stagione (primo post il 28 agosto 2026), ma i primi numeri confermano la direzione presa.`}
              </Body>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Reveal y={16}>
                <Stat label="Nuovi follower (28 ago - 27 ott)">
                  <CountUp to={526} prefix="+" />
                </Stat>
              </Reveal>
              <Reveal y={16} delay={0.08}>
                <Stat label="Visualizzazioni (28 ago - 27 ott)">
                  <CountUp to={661106} />
                </Stat>
              </Reveal>
              <Reveal y={16} delay={0.16}>
                <Stat label="Interazioni">
                  <CountUp to={4700} />
                </Stat>
              </Reveal>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <SectionLabel>Età del pubblico</SectionLabel>
            {AGES.map((a, i) => (
              <AgeBar key={a.label} {...a} delay={i * 0.15} />
            ))}
          </div>

          <Body>
            {`Il post più performante finora è la `}
            <Em>Tracklist di Settembre</Em>
            {`, con una copertura quasi equamente divisa tra chi già segue la pagina (37,7%) e chi non la segue ancora (62,3%), segno che il formato tracklist, oltre a scandire la stagione per chi segue già Fuori Corso, funziona anche da porta d'ingresso per pubblico nuovo.`}
          </Body>
        </CaseSection>

        {/* Riflessioni */}
        <CaseSection className="flex flex-col gap-3">
          <SectionLabel>Riflessioni</SectionLabel>
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-[15px] rounded-xl border border-[#e0e0e0] bg-[rgba(240,240,240,0.6)] px-6 py-6">
              <TagPill>Sistema esistente</TagPill>
              <Body>
                {`Progettare dentro un `}
                <Em>sistema esistente</Em>
                {` è stato l’aspetto più formativo di questo progetto: gran parte del lavoro non è stata l’invenzione di qualcosa di nuovo, ma la `}
                <Em>costruzione di regole implicite</Em>
                {` in un sistema esplicito, `}
                <Em>replicabile</Em>
                {` e delegabile.`}
              </Body>
            </div>
            <div className="flex min-w-0 flex-1 flex-col items-start gap-[15px] rounded-xl border border-[#e0e0e0] bg-[rgba(240,240,240,0.6)] px-6 py-6">
              <TagPill>Collaborazioni</TagPill>
              <Body>
                {`Distinguere `}
                <Em>tre location</Em>
                {` senza disegnare tre sistemi diversi ha richiesto impegno, ogni volta che sembrava necessario un dettaglio nuovo, la prima domanda era "`}
                <Em>può bastare cambiare il colore?</Em>
                {`". Nella maggior parte dei casi la risposta era sì.`}
              </Body>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-xl bg-[rgba(226,195,0,0.1)] p-5 text-base leading-[normal] tracking-[-0.32px]">
            {/* Icon and title sit on one row; the black text starts right under the icon. */}
            <div className="flex items-center gap-3">
              <img
                src={lightbulb}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="size-6 shrink-0"
              />
              <h3 className="text-lg font-bold tracking-[-0.36px] text-[#d8ba00]">Prossimi passi</h3>
            </div>
            <div className="font-medium text-[#141414]">
              <p>
                {`Superata la prima fase di allineamento qualitativo, l'obiettivo futuro è l'iterazione costante attraverso metriche e ascolto:`}
              </p>
              {/* Numbers are drawn by hand (not list markers): they start flush with the icon, and the
                  text hangs under itself. Markers would also get tabular figures, which look mono here. */}
              <ol className="[counter-reset:step]">
                {NEXT_STEPS.map((step) => (
                  <li
                    key={step}
                    className="relative ps-6 [counter-increment:step] before:absolute before:left-0 before:content-[counter(step)'.']"
                  >
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </CaseSection>

        <CaseSection>
          <Body>
            Questo progetto è stato realizzato come collaborazione con il team Fuori Corso, con l’obiettivo di portare una regia visiva coerente alla comunicazione social della pagina.
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
