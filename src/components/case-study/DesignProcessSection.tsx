import { motion } from "framer-motion";
import heroLogo from "../../assets/fuori-corso/hero-logo.png";
import titleFuoriCorso from "../../assets/fuori-corso/title-fuori-corso.svg";
import titleDate from "../../assets/fuori-corso/title-date.svg";
import fontSample from "../../assets/fuori-corso/font-sample.svg";
import fallWinterScript from "../../assets/fuori-corso/fall-winter-script.png";
import profileScreenshot from "../../assets/fuori-corso/profile-screenshot.jpg";
import { Body, CaseSection, SectionLabel, TagPill } from "./primitives";

const HEX = "text-[rgba(22,18,16,0.35)] leading-[17.778px]";

const BASE_COLORS = [
  { hex: "#861826", label: "#861826" },
  { hex: "#ffffff", label: "#FFFFFF" },
  { hex: "#000000", label: "#000000" },
];

const LOCATIONS = [
  { hex: "#861826", label: "#861826", name: "Chiappini & Giugni" },
  { hex: "#44baae", label: "#44BAAE", name: "Club House" },
  { hex: "#278b00", label: "#278B00", name: "Parco EX Seminario" },
];

const CARD = "flex flex-col rounded-xl border border-black/30 p-5";

function Divider() {
  return <div aria-hidden="true" className="h-px w-full bg-black/10" />;
}

export default function DesignProcessSection() {
  return (
    <CaseSection className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <SectionLabel>Processo di design</SectionLabel>
        <Body>
          {`Ogni locandina mantiene gli stessi ancoraggi, indipendentemente dall'evento: logo Fuori Corso in alto, titolo "FUORI CORSO" + data come elemento tipografico dominante, blocco giorno/orario/luogo/music-by, tag informativi in basso. Regola centrale del sistema: la struttura non cambia, il colore sì, ed è il colore a dire dove sei.`}
        </Body>
      </div>

      {/* Colori | Font */}
      <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="flex w-full flex-col gap-5 lg:w-[278px]">
          <TagPill>Colori</TagPill>
          <div className="flex items-center justify-between">
            {BASE_COLORS.map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-[8.9px]">
                <motion.span
                  whileHover={{ scale: 1.12 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  style={{ backgroundColor: c.hex }}
                  className="block size-[53px] rounded-full border-[1.5px] border-[rgba(22,18,16,0.1)]"
                />
                <span className={`text-[11.852px] ${HEX}`}>{c.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {LOCATIONS.map((c, i) => (
              <div key={c.name} className="flex flex-col gap-2">
                {i > 0 && <Divider />}
                <div className="flex items-center gap-[14px]">
                  <div className="flex w-11 shrink-0 flex-col items-center gap-1">
                    <span
                      style={{ backgroundColor: c.hex }}
                      className="block size-5 rounded-full border-[0.556px] border-[rgba(22,18,16,0.1)]"
                    />
                    <span className={`text-[10px] ${HEX}`}>{c.label}</span>
                  </div>
                  <span className="text-base font-medium leading-[normal] tracking-[-0.32px] text-[#141414]">
                    {c.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="hidden w-px self-stretch bg-black/20 lg:block" />

        <div className="flex flex-col gap-5">
          <TagPill>Font</TagPill>
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-[60px]">
            <div className="flex flex-col gap-2">
              <p className="whitespace-nowrap text-[28px] font-normal leading-[normal] tracking-[-1.12px] text-[#1a1a1a]">
                Helvetica Now Display
              </p>
              <p className="text-lg font-medium leading-[normal] tracking-[-0.36px] text-[rgba(20,20,20,0.65)]">
                Titoli / Testo
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex h-[41px] items-center">
                <img
                  src={fontSample}
                  alt="Helvetica Now Display Bold in maiuscolo, lavorata a mano"
                  className="h-auto w-full max-w-[328px]"
                  draggable={false}
                />
              </div>
              <p className="text-lg font-medium leading-[normal] tracking-[-0.36px] text-[rgba(20,20,20,0.65)]">
                Titoli / Testo – Modificato in stile hand-drawn
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[5px] pt-[30px]">
            <p className="font-aston text-[28px] leading-[36px] text-[#1a1a1a]">Aston</p>
            <p className="text-lg font-medium leading-[normal] tracking-[-0.36px] text-[rgba(20,20,20,0.65)]">
              Claim / payoff
            </p>
          </div>
        </div>
      </div>

      <Divider />

      {/* Impaginazione */}
      <div className="flex flex-col gap-5">
        <TagPill>Impaginazione</TagPill>

        {/* Instagram profile: the real page the layouts live on. */}
        <div className={`${CARD} items-center justify-center`}>
          <div className="relative aspect-[524/198] w-full max-w-[524px] overflow-hidden">
            <img
              src={profileScreenshot}
              alt="Profilo Instagram fuoricorso26: 36 post, 1853 follower, 3 seguiti. Organizzatore di eventi, Saronno (VA)"
              width={1056}
              height={448}
              loading="lazy"
              draggable={false}
              className="absolute left-0 top-[-2.41%] h-[112.48%] w-full max-w-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[200px_264px_1fr]">
          <div className={`${CARD} items-center justify-center gap-4`}>
            <img
              src={heroLogo}
              alt=""
              aria-hidden="true"
              width={100}
              height={100}
              loading="lazy"
              draggable={false}
              className="size-[100px] object-contain"
            />
            <Body>Logo Fuori Corso</Body>
          </div>

          <div className={`${CARD} items-center justify-center gap-3`}>
            <div
              role="img"
              aria-label="Titolo Fuori Corso con la data 05.09"
              className="relative h-[74px] w-[224px] max-w-full"
            >
              <img
                src={titleFuoriCorso}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="absolute left-0 top-0 h-[30.4px] w-[224px] max-w-none"
              />
              <img
                src={titleDate}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="absolute left-[33.1px] top-[24.9px] h-[48.8px] w-[144px] max-w-none"
              />
            </div>
            <Body className="text-center">
              Titolo + data come elemento tipografico dominante.
            </Body>
          </div>

          <div className={`${CARD} items-center justify-center gap-3 sm:col-span-2 lg:col-span-1`}>
            <img
              src={fallWinterScript}
              alt="Fall / Winter 2026"
              width={261}
              height={36}
              loading="lazy"
              draggable={false}
              className="h-9 w-[261px] max-w-full object-contain"
            />
            <div
              aria-hidden="true"
              className="flex max-w-full items-center gap-[10.323px] overflow-hidden whitespace-nowrap border-y-[0.515px] border-black py-[2.059px] text-[17.064px] font-medium uppercase leading-[normal] tracking-[-0.6826px] text-black opacity-40"
            >
              <span>FALL / Winter 2026</span>
              <span>{"//"}</span>
              <span>FALL / Winter 2026</span>
              <span>{"//"}</span>
              <span>FALL / Winter 2026</span>
            </div>
            <Body className="text-center">Tag relativo alla stagione.</Body>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className={`${CARD} gap-3`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[14px] font-extrabold leading-[normal] text-black">
              <span className="uppercase tracking-[-0.84px]">Chiappini &amp; Giugni</span>
              <span className="uppercase tracking-[-0.56px]">venerdì</span>
              <span className="uppercase tracking-[-0.56px]">19:30 - 00:00</span>
              <span className="whitespace-pre capitalize tracking-[-0.56px]">
                {"music by:   Luciano"}
              </span>
            </div>
            <Body>
              Blocco data/orario/luogo, con gerarchia coerente (giorno della settimana + data in evidenza, orario a seguire, indirizzo in corpo minore).
            </Body>
          </div>

          <div className={`${CARD} gap-3`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              {["track 3", "italian tech house", "vol . 2"].map((tag) => (
                <span
                  key={tag}
                  className="whitespace-nowrap rounded-full border-[0.975px] border-black px-[14.6px] py-[3.9px] text-[13.65px] font-bold uppercase leading-[normal] tracking-[-0.546px] text-black"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Body>
              Tag informativi in basso: numero traccia, genere musicale, volume della stagione.
            </Body>
          </div>
        </div>
      </div>
    </CaseSection>
  );
}
