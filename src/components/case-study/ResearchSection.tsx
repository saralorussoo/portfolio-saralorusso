import type { ReactNode } from "react";
import starOutline from "../../assets/fuori-corso/star-outline.svg";
import { Body, CaseSection, Reveal, SectionLabel } from "./primitives";

function Step({
  n,
  badge,
  title,
  intro,
  children,
}: {
  n: number;
  badge: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full items-start gap-3">
      <span
        style={{ backgroundColor: badge }}
        className="flex w-[26px] shrink-0 items-center justify-center rounded-[5px] text-lg leading-[normal] tracking-[-0.36px] text-black"
      >
        {n}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-col">
          <h3 className="text-lg font-normal leading-[normal] tracking-[-0.36px] text-black">
            {title}
          </h3>
          <Body>{intro}</Body>
        </div>
        {children}
      </div>
    </div>
  );
}

const CARD =
  "flex min-w-0 flex-1 flex-col gap-[15px] rounded-xl border border-black/30 bg-black/[0.02] p-5";

const BENCHMARK = [
  ["Font", "Sans-serif bold/condensed, alta leggibilità", "Titolo evento maiuscolo, bold, dominante"],
  ["Info block", "Data, luogo, orario raggruppati e fissi", "Blocco informativo coerente su ogni locandina"],
  ["Elemento firma", "Logo o simbolo fisso e riconoscibile", "Logo tondo Fuori Corso / scritta"],
  ["Tocco informale", "Elementi manoscritti per claim/payoff", "Scritta corsivo per il tono di voce"],
];

const AUDIENCE = [
  { value: "64,3%", label: "18 - 24 anni" },
  { value: "26,4%", label: "25 - 34 anni" },
  { value: "2,2%", label: "13 - 17 anni" },
];

export default function ResearchSection() {
  return (
    <CaseSection>
      <div className="flex flex-col gap-3">
        <SectionLabel>Ricerca</SectionLabel>

        <div className="flex flex-col gap-[50px]">
          <Step
            n={1}
            badge="#f1bfcd"
            title="Audit del sistema esistente"
            intro={`Cosa mantenere e cosa far evolvere dalle stagioni precedenti, per accogliere il concept "album".`}
          >
            <div className="flex flex-col gap-3 md:flex-row">
              <div className={CARD}>
                <p className="flex items-center gap-2 text-[#e17000]">
                  <span aria-hidden="true" className="font-mono text-sm leading-5">
                    ✓
                  </span>
                  <span className="text-lg font-medium leading-[normal] tracking-[-0.36px]">
                    Mantenuto
                  </span>
                </p>
                <Body>
                  Palette rosso #861826, logo tondo, font condensed bold per i titoli.
                </Body>
              </div>
              <div className={CARD}>
                <p className="flex items-center gap-2 text-[#06743c]">
                  <img
                    src={starOutline}
                    alt=""
                    aria-hidden="true"
                    className="size-5"
                    draggable={false}
                  />
                  <span className="text-lg font-medium leading-[normal] tracking-[-0.36px]">
                    Evoluto
                  </span>
                </p>
                <Body>
                  {`Caratteri tondeggianti, vicini all'hand-drawn, con piccole illustrazioni di corredo (giradischi, stelle, bicchieri, macchina fotografica) coerenti con l'immaginario "musica + serata".`}
                </Body>
              </div>
            </div>
          </Step>

          <Step
            n={2}
            badge="#ffe99a"
            title="Benchmark"
            intro="Osservazione di pagine Instagram di eventi per giovani, locali e nazionali."
          >
            {/* Same table on every screen. Below md it keeps a 640px minimum width and
                the wrapper scrolls sideways; from md up nothing changes. */}
            <div
              role="region"
              aria-label="Tabella benchmark, scorri in orizzontale per vedere tutte le colonne"
              tabIndex={0}
              className="w-full overflow-x-auto overscroll-x-contain rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-black/40"
            >
              <div
                role="table"
                className="flex min-w-[640px] flex-col text-base tracking-[-0.32px] md:min-w-0"
              >
                <div
                  role="row"
                  className="grid grid-cols-3 gap-4 border-b border-[#e0e0e0] py-5 font-bold leading-[normal] text-[rgba(20,20,20,0.65)]"
                >
                  <span role="columnheader">Elemento</span>
                  <span role="columnheader">Pattern nel settore</span>
                  <span role="columnheader">Applicazione a Fuori Corso</span>
                </div>
                {BENCHMARK.map(([element, pattern, application], i) => (
                  <div
                    key={element}
                    role="row"
                    className={`grid grid-cols-3 gap-4 py-5 font-medium leading-[normal] ${
                      i < BENCHMARK.length - 1 ? "border-b border-[#e0e0e0]" : ""
                    }`}
                  >
                    <span role="cell" className="text-[#141414]">
                      {element}
                    </span>
                    <span role="cell" className="text-[rgba(20,20,20,0.65)]">
                      {pattern}
                    </span>
                    <span role="cell" className="text-[#141414]">
                      {application}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Step>

          <Step
            n={3}
            badge="#bfe4f1"
            title="Analisi del target"
            intro="Dai dati del profilo, il pubblico è fortemente concentrato nella fascia 18–24 anni."
          >
            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
              {AUDIENCE.map((a, i) => (
                <Reveal key={a.label} delay={i * 0.08} y={16}>
                  <div className="flex h-full flex-col items-center gap-2 rounded-xl border border-[#bfe4f1] bg-[rgba(191,228,241,0.1)] p-5 transition-transform duration-200 ease-out hover:-translate-y-1">
                    <span className="text-xl font-bold leading-[normal] tracking-[-0.4px] text-[#60aeca]">
                      {a.value}
                    </span>
                    <span className="text-base font-medium leading-[normal] tracking-[-0.32px] text-[rgba(20,20,20,0.65)]">
                      {a.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </Step>
        </div>
      </div>
    </CaseSection>
  );
}
