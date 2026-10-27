import { useEffect, useLayoutEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import CaseNavbar from "../components/case-study/CaseNavbar";
import CaseStudyButton from "../components/CaseStudyButton";
import CareerChat from "../components/case-study/CareerChat";
import MetroLine from "../components/case-study/MetroLine";
import HeroLines from "../components/case-study/HeroLines";
import {
  Body,
  CaseSection,
  Em,
  OUTLINE_PILL,
  Reveal,
  SectionLabel,
  TagPill,
} from "../components/case-study/primitives";
import affinityIcon from "../assets/bob-noorda/affinity-icon.png";
import figmaIcon from "../assets/bob-noorda/figma-icon.png";
import frameTireCatalogue from "../assets/bob-noorda/frame2.jpg";
import framePoster from "../assets/bob-noorda/frame1.jpg";
import spreadMilano from "../assets/bob-noorda/spread-milano.jpg";
import spreadNewYork from "../assets/bob-noorda/spread-newyork.jpg";
import spreadSaoPaulo from "../assets/bob-noorda/spread-saopaulo.jpg";
import spreadIdentita from "../assets/bob-noorda/spread-identita.jpg";
import posterColor from "../assets/bob-noorda/poster1.jpg";
import posterLineArt from "../assets/bob-noorda/poster2.jpg";
import posterIndice from "../assets/bob-noorda/poster3.jpg";

/* ---------------------------------- data --------------------------------- */

const META = ["Apr – Giu 2026", "Progetto universitario", "Graphic Design", "Figma & Affinity"];

const ROLE_DONE = [
  "Ricerca e definizione del concept (in team)",
  "Catalogo 60%",
  "2 post Instagram",
  "1 storia Instagram",
];
const ROLE_NOT = "Locandina, invito, adattamento della locandina per il sito web e banner Facebook";

const PROBLEMS = [
  {
    tag: "Riconoscibilità",
    text: "Una griglia troppo rigida rischiava di risultare fredda; uno stile troppo libero avrebbe perso la coerenza sistemica tipica di Noorda.",
  },
  {
    tag: "Informazione vs sintesi",
    text: "Il lavoro di Noorda copre sei decadi e ambiti molto diversi (metropolitane, identità aziendali, comunicazione industriale): serviva selezionare senza banalizzare.",
  },
  {
    tag: "Coerenza",
    text: "Cinque sale, cinque temi, un solo linguaggio visivo riconoscibile: il rischio era imitare letteralmente lo stile storico di Noorda invece di tradurne i principi.",
  },
];

const GOALS = [
  {
    tag: "Chiarezza",
    color: "#015099",
    bg: "rgba(1,80,153,0.3)",
    pillText: "text-white",
    text: "Ridurre il rumore visivo, rendere le informazioni immediatamente comprensibili.",
  },
  {
    tag: "Sistema",
    color: "#edb404",
    bg: "rgba(237,180,4,0.2)",
    pillText: "text-black",
    text: "Costruire regole replicabili invece di progettare ogni elemento singolarmente.",
  },
  {
    tag: "Orientamento",
    color: "#c99cc6",
    bg: "rgba(201,156,198,0.3)",
    pillText: "text-black",
    text: "Usare colore, tipografia, gerarchie e modularità per guidare chi visita la mostra.",
  },
  {
    tag: "Coerenza",
    color: "#c4171a",
    bg: "rgba(196,23,26,0.2)",
    pillText: "text-white",
    text: "Mantenere lo stesso linguaggio su catalogo, locandina, invito e contenuti digitali, pur cambiando formato e supporto.",
  },
];

const COLORS = [
  { hex: "#C4171A" },
  { hex: "#000000" },
  { hex: "#015099" },
  { hex: "#EDB404" },
  { hex: "#C99CC6" },
];

const OTHER_PROJECTS = [
  ["Progetto universitario", "Sito web in Wordpress"],
  ["Sito web palestra", "Kalos Studio"],
];

/* -------------------------------- helpers --------------------------------- */

function TechCard({
  icon,
  iconRounded,
  borderColor,
  title,
  rest,
  children,
}: {
  icon: string;
  iconRounded?: boolean;
  borderColor: string;
  title: string;
  rest: string;
  children: string;
}) {
  return (
    <div
      style={{ borderColor }}
      className="flex w-full flex-col gap-3 rounded-lg border-2 p-5"
    >
      <div className="flex items-center gap-3">
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          width={60}
          height={60}
          draggable={false}
          className={`size-[60px] shrink-0 object-cover ${iconRounded ? "rounded-[4px] border border-[#d7d7d7]" : ""}`}
        />
        <p className="text-base font-medium leading-[normal] tracking-[-0.32px] text-[rgba(20,20,20,0.65)]">
          <Em>{title}</Em> {rest}
        </p>
      </div>
      <Body>{children}</Body>
    </div>
  );
}

/* ---------------------------------- page --------------------------------- */

export default function BobNoordaPage() {
  const reduce = useReducedMotion();
  const from = (y: number) => (reduce ? { opacity: 0 } : { opacity: 0, y });

  // Arrive at the top, whatever the scroll position of the previous page was.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const previous = document.title;
    document.title = "Mostra su Bob Noorda — Sara Lo Russo";
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
      <CaseNavbar title="Bob Noorda Project" returnTarget="bob-noorda" sticker={false} />

      <main>
        {/* Hero — real title/tags in flow over the Figma "metro map" lines. HeroLines
            picks the desktop or the compact composition from the measured title
            and sets the type sizes through --hero-title / --hero-tag / --hero-gap.
            The section has no side padding so the lines run edge to edge. */}
        <section className="relative overflow-hidden">
          <HeroLines>
            <h1
              style={{ fontSize: "var(--hero-title)" }}
              className="w-max text-center font-neulis font-normal leading-none tracking-[-0.02em] text-black"
            >
              {["Progetto universitario", "Mostra su Bob Noorda"].map((line, i) => (
                <motion.span
                  key={line}
                  className="block whitespace-nowrap"
                  initial={from(24)}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <ul
              style={{ fontSize: "var(--hero-tag)" }}
              className="flex w-fit flex-wrap items-center justify-center gap-[0.75em]"
            >
              {META.map((m, i) => (
                <motion.li
                  key={m}
                  initial={from(12)}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 + i * 0.08 }}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-black/30 px-[0.875em] py-[0.25em] leading-[normal] tracking-[-0.02em] text-black/50"
                >
                  {m}
                </motion.li>
              ))}
            </ul>
          </HeroLines>
        </section>

        {/* Background / Problema / Approccio */}
        <CaseSection className="mt-4 md:mt-0">
          <div className="flex flex-col text-base leading-[normal] tracking-[-0.32px]">
            {[
              {
                label: "Background",
                body: (
                  <>
                    Design Orienting è un progetto di identità visiva e comunicazione editoriale sviluppato per il corso di Graphic Design dell&apos;Università degli Studi di Milano-Bicocca, dedicato a Bob Noorda: designer olandese naturalizzato italiano, tra le figure più influenti del graphic design del Novecento.
                  </>
                ),
              },
              {
                label: "Problema",
                body: (
                  <>
                    La difficoltà iniziale era evitare una rappresentazione puramente celebrativa o cronologica di Noorda. Il suo lavoro comprende identità visive, sistemi di segnaletica, tipografia, comunicazione industriale e progettazione dello spazio: raccontare questa varietà attraverso un&apos;unica identità visiva rischiava di generare un sistema troppo complesso o decorativo.
                  </>
                ),
              },
              {
                label: "Approccio",
                body: (
                  <>
                    Progettare un&apos;identità capace di comunicare il metodo progettuale di Noorda attraverso la propria forma: un linguaggio essenziale, rigoroso e orientato alla chiarezza comunicativa.
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
            <div className="flex flex-col gap-4">
              <Body>
                <Em>Progetto sviluppato in gruppo</Em>. Ricerca, concept e revisione del sistema visivo sono stati condivisi e discussi collettivamente in ogni fase; la produzione dei singoli elaborati è stata invece suddivisa tra i tre.
              </Body>
              <Body>
                {`Dalla ricerca su Noorda emerge una costante: non progettava segni, progettava `}
                <Em>relazioni tra segni</Em>
                . Colore, tipografia, spazio, gerarchia e ripetizione diventavano strumenti per aiutare le persone a capire dove si trovavano e cosa fare dopo.
              </Body>
              <Body>
                {`Da qui il concept della mostra: `}
                <Em>Design Orienting</Em>
                {`, organizzata in cinque sale, ciascuna rappresentata come una linea di metropolitana con un colore identificativo, la palette diventa così uno `}
                <Em>strumento di navigazione</Em>
                {` all'interno della mostra stessa.`}
              </Body>
            </div>
          </div>

          <div aria-hidden="true" className="hidden w-px self-stretch bg-black/20 lg:block" />

          <div className="flex flex-col gap-3 lg:w-[403px] lg:shrink-0">
            <SectionLabel>Il mio ruolo</SectionLabel>
            <ul className="flex flex-col gap-1">
              {ROLE_DONE.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden="true" className="w-3 pt-0.5 font-mono text-sm leading-5 text-[#3d8f32]">
                    ✓
                  </span>
                  <span className="text-base font-medium leading-[normal] tracking-[-0.32px] text-black">
                    {item}
                  </span>
                </li>
              ))}
              <li className="mt-2 flex items-start gap-3">
                <span aria-hidden="true" className="w-2.5 pt-0.5 font-mono text-sm leading-5 text-black/20">
                  ✗
                </span>
                <span className="text-base font-medium leading-[normal] tracking-[-0.32px] text-black/65">
                  <span className="sr-only">Non di mia competenza: </span>
                  {ROLE_NOT}
                </span>
              </li>
            </ul>
          </div>
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
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
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
              <div className="flex w-full items-start gap-3">
                <span className="flex w-[26px] shrink-0 items-center justify-center rounded-[5px] bg-[#c4171a] text-lg leading-[normal] tracking-[-0.36px] text-white">
                  1
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <h3 className="text-lg font-normal leading-[normal] tracking-[-0.36px] text-black">
                    La carriera di Noorda
                  </h3>
                  <CareerChat>
                    {`Nato ad Amsterdam nel 1927, Noorda si trasferisce a Milano nel 1954 e collabora con Olivetti e Pirelli. Nel 1964, con Franco Albini e Franca Helg, definisce l'identità visiva della `}
                    <span className="font-bold">Metropolitana Milanese</span>
                    {` (premiata con il Compasso d'Oro); nel 1965 fonda `}
                    <span className="font-bold">Unimark International</span>
                    {` con Massimo Vignelli. L'esperienza nella segnaletica si estende poi alle `}
                    <span className="font-bold">metropolitane di New York</span>
                    {` (Graphics Standards Manual, 1970) e `}
                    <span className="font-bold">San Paolo</span>
                    {`, oltre a marchi come `}
                    <span className="font-bold">Agip, Coop, Mondadori e Feltrinelli</span>.
                  </CareerChat>
                </div>
              </div>

              <div className="flex w-full items-start gap-3">
                <span className="flex w-[26px] shrink-0 items-center justify-center rounded-[5px] bg-[#edb404] text-lg leading-[normal] tracking-[-0.36px] text-black">
                  2
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-normal leading-[normal] tracking-[-0.36px] text-black">
                      Concept della mostra
                    </h3>
                    <Body>
                      Dalla ricerca su Noorda emerge una costante: non progettava segni, progettava relazioni tra segni. Colore, tipografia, spazio, gerarchia e ripetizione diventavano strumenti per aiutare le persone a capire dove si trovavano e cosa fare dopo.
                    </Body>
                    <Body>
                      {`Da qui il concept della mostra: `}
                      <Em>Design Orienting</Em>
                      {`, organizzata in `}
                      <Em>cinque sale</Em>
                      {`, ciascuna rappresentata come una linea di metropolitana con un colore identificativo, la palette diventa così uno strumento di navigazione all'interno della mostra stessa.`}
                    </Body>
                  </div>
                  <MetroLine />
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
              Titoli in un sans-serif bold e condensato, geometrico ed essenziale; corpo del testo in un sans-serif neutro, per privilegiare la leggibilità. Cinque colori campionati dalla locandina ufficiale, ciascuno corrispondente a una sala della mostra.
            </Body>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:items-start">
            <div className="flex flex-col gap-5">
              <TagPill>Colori</TagPill>
              <div className="flex items-center gap-2.5 sm:gap-7">
                {COLORS.map((c) => (
                  <div key={c.hex} className="flex flex-col items-center gap-1.5 sm:gap-2">
                    <span
                      style={{ backgroundColor: c.hex }}
                      className="block size-9 rounded-full border-[1.5px] border-[rgba(22,18,16,0.1)] sm:size-[53px]"
                    />
                    <span className="text-[10px] leading-[14px] text-[rgba(22,18,16,0.35)] sm:text-[12px] sm:leading-[18px]">
                      {c.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div aria-hidden="true" className="hidden h-[126px] w-px self-center bg-black/10 sm:block" />

            <div className="flex flex-col gap-5">
              <TagPill>Font</TagPill>
              <div className="flex flex-col gap-2">
                <p className="text-[28px] leading-[normal] text-[#1a1a1a]">Helvetica</p>
                <p className="text-lg font-medium leading-[normal] tracking-[-0.36px] text-[rgba(20,20,20,0.65)]">
                  Titoli / Testo
                </p>
              </div>
            </div>
          </div>
        </CaseSection>

        {/* Realizzazione tecnica */}
        <CaseSection className="flex flex-col gap-3">
          <SectionLabel>Realizzazione tecnica</SectionLabel>
          <Body>
            Per la produzione degli elaborati ho lavorato con due software diversi, a seconda della destinazione finale del file:
          </Body>
          <div className="flex flex-col gap-3">
            <TechCard
              icon={affinityIcon}
              borderColor="#a7f175"
              title="Affinity (Publisher e Designer)"
              rest="per tutti i materiali da stampa"
            >
              {`Questo progetto è stata l'occasione per imparare a impostare correttamente un documento da stampa: il formato finale di locandina, invito e catalogo, la risoluzione a 300 dpi per tutte le immagini, lo spazio colore CMYK (invece di RGB) per una resa cromatica fedele una volta stampato, e l'abbondanza (bleed) di qualche millimetro oltre il bordo di taglio, per evitare margini bianchi indesiderati dopo la rifilatura.`}
            </TechCard>
            <TechCard
              icon={figmaIcon}
              iconRounded
              borderColor="#00b6ff"
              title="Figma"
              rest="per i contenuti digitali"
            >
              {`Per l'adattamento della locandina al sito web, i post e le storie Instagram e il banner per l'evento Facebook è stato scelto Figma, con frame dedicati a ogni formato e componenti condivisi per mantenere coerenza con il sistema visivo del progetto.`}
            </TechCard>
          </div>
        </CaseSection>

        {/* Elaborati */}
        <CaseSection className="flex flex-col items-center gap-6">
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <img
              src={posterColor}
              alt="Locandina Design Orienting a colori, con il titolo disegnato come linee di metropolitana"
              loading="lazy"
              className="h-auto w-full rounded border-2 border-[#f0f0f0] sm:w-1/3"
            />
            <img
              src={posterLineArt}
              alt="Variante della locandina Design Orienting con le sole linee colorate, senza fondo"
              loading="lazy"
              className="h-auto w-full rounded border-2 border-[#f0f0f0] sm:w-1/3"
            />
            <img
              src={posterIndice}
              alt="Pagina indice del catalogo, con le cinque sale numerate lungo la linea di metropolitana"
              loading="lazy"
              className="h-auto w-full rounded sm:w-1/3"
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            <img
              src={spreadMilano}
              alt="Doppia pagina del catalogo dedicata alla metropolitana di Milano, 1963–1964"
              loading="lazy"
              className="aspect-[1191/842] w-full rounded border-2 border-[#f0f0f0] object-cover"
            />
            <img
              src={spreadNewYork}
              alt="Doppia pagina del catalogo dedicata alla New York City Subway, 1966–1970"
              loading="lazy"
              className="aspect-[1191/842] w-full rounded border-2 border-[#f0f0f0] object-cover"
            />
            <img
              src={spreadSaoPaulo}
              alt="Doppia pagina del catalogo dedicata al Metrô de São Paulo, 1972–1975"
              loading="lazy"
              className="aspect-[1191/842] w-full rounded border-2 border-[#f0f0f0] object-cover"
            />
            <img
              src={spreadIdentita}
              alt="Doppia pagina del catalogo dedicata all'identità visiva firmata da Noorda per grandi aziende italiane, 1964–2006"
              loading="lazy"
              className="aspect-[1191/842] w-full rounded border-2 border-[#f0f0f0] object-cover"
            />
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <img
              src={framePoster}
              alt="Locandina Bob Noorda Design Orienting, con il titolo composto come una linea di metropolitana"
              loading="lazy"
              className="h-auto w-full rounded border border-[#f0f0f0] sm:w-1/2"
            />
            <img
              src={frameTireCatalogue}
              alt="Doppia pagina del catalogo dedicata al progetto Bob Noorda per Pirelli"
              loading="lazy"
              className="h-auto w-full rounded border border-[#f0f0f0] sm:w-1/2"
            />
          </div>
        </CaseSection>

        {/* Riflessioni */}
        <CaseSection className="flex flex-col gap-3">
          <SectionLabel>Riflessioni</SectionLabel>
          <div className="flex items-start">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-[15px] rounded-xl border border-[#c99cc6] bg-[rgba(201,156,198,0.2)] px-6 py-6">
              <span className="inline-flex w-fit items-center justify-center rounded-full bg-[rgba(201,156,198,0.8)] px-3.5 py-1.5 text-base leading-[normal] tracking-[-0.32px] text-black">
                Dal segno al sistema
              </span>
              <Body>
                {`Questo progetto ha spostato il focus dalla progettazione di singoli artefatti alla progettazione di `}
                <Em>sistemi visivi</Em>
                {`. La lezione più importante è stata capire che una buona identità non deve necessariamente essere riconoscibile perché contiene un elemento distintivo: può esserlo perché tutte le sue parti seguono la `}
                <Em>stessa logica</Em>
                {`, un principio vicino anche all'interesse per lo UX/UI design, dove progettare un sistema significa progettare non solo ciò che l'utente vede, ma come lo interpreta e cosa riesce a fare con esso.`}
              </Body>
            </div>
          </div>
        </CaseSection>

        <CaseSection>
          <Body>
            Questo progetto è stato realizzato come progetto universitario per il corso di Graphic Design, Laurea magistrale in Teorie e Tecnologie per la Comunicazione, Università degli Studi di Milano-Bicocca.
          </Body>
        </CaseSection>

        {/* Altri progetti */}
        <CaseSection bordered={false} className="flex flex-col gap-10 md:!py-24 lg:!py-[200px]">
          <SectionLabel>Altri progetti</SectionLabel>
          <div className="flex flex-col gap-10 md:flex-row md:gap-[60px]">
            {OTHER_PROJECTS.map(([kind, title]) => (
              <div key={title} className="flex min-w-0 flex-1 flex-col gap-6">
                <motion.div
                  whileHover={reduce ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="aspect-[687/420] w-full rounded-[20px] bg-[#ffc9f1] shadow-card"
                />
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="min-w-[180px] flex-1 text-xl font-medium leading-[normal] tracking-[-0.4px] text-black">
                    <span className="block">{kind}</span>
                    <span className="block">{title}</span>
                  </h3>
                  <CaseStudyButton>Apri case study</CaseStudyButton>
                </div>
              </div>
            ))}
          </div>
        </CaseSection>
      </main>
    </motion.div>
  );
}
