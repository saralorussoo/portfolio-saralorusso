import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../components/about/Reveal";
import ToolsPlayground from "../components/about/ToolsPlayground";
import avatar from "../assets/about/avatar.png";
import avatarStar from "../assets/about/avatar-star.svg";
import bicoccaLogo from "../assets/about/bicocca.png";
import unimiLogo from "../assets/about/unimi.png";
import mailIcon from "../assets/about/mail.png";

const MUTED = "text-[rgba(20,20,20,0.65)]";
const SECTION = "border-b border-[#e0e0e0] px-6 py-12 sm:px-10 md:py-[60px] lg:px-[200px]";
const INNER = "mx-auto w-full max-w-[1040px]";

const DESIGN = ["UX/UI Design", "Web Design", "User Research", "User Testing", "Prototyping", "Graphic Design"];
const SKILLS = ["Time Management", "Stakeholder Communication", "Problem Solving", "Teamwork"];

const EXPERIENCES = [
  { company: "Freelance", role: "Web Designer • Graphic Designer", period: "Lug 2024 - Presente", place: "Saronno (VA)" },
  { company: "Bubble", role: "UX Researcher", period: "Gen 2025 - Ago 2025", place: "Full remote" },
  { company: "Efebia", role: "UX/UI Designer", period: "Mar 2023 - Lug 2024", place: "Full remote" },
  { company: "Altre attività", role: "Ripetizioni • Commessa • Cassiera", period: "2019 - Presente", place: "Saronno (VA)" },
];

function Label({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full bg-[rgba(26,26,26,0.12)] px-3.5 py-1.5 text-base leading-[19px] tracking-[-0.32px] text-black">
      {children}
    </span>
  );
}

function TagBox({ tags }: { tags: string[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-black/30 bg-white p-5">
      {tags.map((tag, i) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ type: "spring", stiffness: 380, damping: 22, delay: 0.1 + i * 0.07 }}
          whileHover={reduce ? undefined : { y: -2 }}
          className="cursor-default rounded-full border border-black/30 px-3.5 py-1 text-base leading-6 tracking-[-0.32px] text-black/50 transition-colors duration-200 hover:border-black/60 hover:text-black/80"
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );
}

function Study({
  logo,
  logoClass,
  title,
  meta,
  description,
}: {
  logo: string;
  logoClass: string;
  title: string;
  meta: string;
  description: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3">
      <div className="flex items-center gap-3">
        <img src={logo} alt="" draggable={false} className={`shrink-0 object-contain ${logoClass}`} />
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-lg font-medium leading-[26px] tracking-[-0.36px] text-black">{title}</p>
          <p className={`text-base leading-6 tracking-[-0.32px] ${MUTED}`}>{meta}</p>
        </div>
      </div>
      <p className={`text-base font-medium leading-6 tracking-[-0.32px] ${MUTED}`}>{description}</p>
    </div>
  );
}

function ContactCard({
  href,
  external,
  className,
  children,
  label,
}: {
  href: string;
  external?: boolean;
  className: string;
  children: ReactNode;
  label: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      whileHover={reduce ? undefined : { y: -4, rotate: -1 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`flex items-center rounded-xl border-4 border-white shadow-sticker-sm outline-none transition-shadow duration-200 hover:shadow-sticker focus-visible:ring-2 focus-visible:ring-black/40 ${className}`}
    >
      {children}
    </motion.a>
  );
}

export default function AboutPage() {
  const reduce = useReducedMotion();

  useEffect(() => {
    document.title = "About — Sara Lo Russo";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-white pb-[90px] pt-[79px]">
      <main>
        {/* Title */}
        <section className="flex flex-col items-center px-6 pt-10 md:pt-[60px]">
          {/* The avatar group is taller than the row (as in Figma), so it overflows it. */}
          <div className="flex h-[110px] items-center justify-center gap-1 sm:h-[143px] sm:gap-0">
            <motion.div
              initial={{ opacity: 0, scale: reduce ? 1 : 0.6, rotate: reduce ? 0 : -14 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
              whileHover={reduce ? undefined : { scale: 1.06, rotate: [0, -6, 6, -4, 0] }}
              className="relative size-[clamp(96px,29vw,132px)] shrink-0 sm:size-[173px]"
            >
              <motion.img
                src={avatarStar}
                alt=""
                aria-hidden="true"
                draggable={false}
                initial={{ rotate: -6.75 }}
                animate={reduce ? undefined : { rotate: [-6.75, 4, -6.75] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[8.53%] top-[8.53%] h-[81.5%] w-[85.6%] max-w-none"
              />
              <img
                src={avatar}
                alt="Sara, in versione emoji, che saluta"
                draggable={false}
                className="absolute left-[17.16%] top-[17.16%] size-[65.44%] max-w-none rounded-[14%] object-cover"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: reduce ? 0 : -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="whitespace-nowrap font-neulis text-[clamp(32px,10.5vw,44px)] leading-[1.15] tracking-[-0.02em] text-black sm:text-[60px] sm:leading-[60px]"
            >
              About me
            </motion.h1>
          </div>
        </section>

        {/* Bio */}
        <section className={`${SECTION} pt-8 md:pt-[60px]`}>
          <Reveal className={`${INNER} flex flex-col gap-6 text-base font-medium leading-6 tracking-[-0.32px] ${MUTED}`}>
            <p>
              Sono una <span className="text-[#141414]">UX/UI Designer</span> appassionata di progettazione di esperienze
              digitali intuitive, accessibili e centrate sulle persone. Grazie a una formazione che unisce{" "}
              <span className="text-[#141414]">informatica</span> e <span className="text-[#141414]">design</span>,
              affronto ogni progetto con un approccio che combina pensiero analitico, sensibilità visiva e attenzione ai
              bisogni degli utenti.
            </p>
            <p>
              Il mio interesse per il design nasce dalla volontà di rendere la tecnologia più comprensibile e vicina alle
              persone, trasformando problemi complessi in soluzioni semplici e significative. Credo in un processo
              progettuale che mette al centro la ricerca, l'ascolto e la sperimentazione, trovando un equilibrio tra
              usabilità, estetica e funzionalità.
            </p>
            <p>
              Attualmente sto completando la mia formazione magistrale in Teorie e Tecnologie della Comunicazione
              all'Università degli Studi di Milano-Bicocca e sono alla ricerca di nuove opportunità per crescere come
              designer, contribuendo alla progettazione di prodotti digitali innovativi e accessibili, anche attraverso
              le potenzialità dell'intelligenza artificiale.
            </p>
          </Reveal>
        </section>

        {/* Education */}
        <section className={SECTION}>
          <Reveal className={`${INNER} flex flex-col gap-10 md:flex-row`}>
            <Study
              logo={bicoccaLogo}
              logoClass="h-[72px] w-[66px]"
              title="Laurea Magistrale in Teorie e Tecnologie per la Comunicazione"
              meta="2025 - In corso | Università degli Studi di Milano-Bicocca"
              description="Percorso interdisciplinare focalizzato su user experience, progettazione digitale, ricerca utenti, innovazione e trasformazione digitale."
            />
            <div aria-hidden="true" className="h-px w-full bg-[#e0e0e0] md:h-[140px] md:w-px md:shrink-0" />
            <Study
              logo={unimiLogo}
              logoClass="size-[72px]"
              title="Laurea Triennale in Informatica"
              meta="2020 - 2023 | Università degli Studi di Milano"
              description="Percorso orientato a sviluppo software, progettazione digitale e Human-Computer Interaction."
            />
          </Reveal>
        </section>

        {/* Tools */}
        <section className={SECTION}>
          <div className={`${INNER} flex flex-col gap-5`}>
            <Reveal>
              <Label>Tools</Label>
            </Reveal>
            <ToolsPlayground />
          </div>
        </section>

        {/* Design + Skills */}
        <section className={SECTION}>
          <div className={`${INNER} flex flex-col gap-10 md:flex-row`}>
            <Reveal className="flex min-w-0 flex-1 flex-col gap-5">
              <Label>Design</Label>
              <TagBox tags={DESIGN} />
            </Reveal>
            <div aria-hidden="true" className="h-px w-full bg-[#e0e0e0] md:h-[190px] md:w-px md:shrink-0" />
            <Reveal delay={0.1} className="flex min-w-0 flex-1 flex-col gap-5">
              <Label>Skills</Label>
              <TagBox tags={SKILLS} />
            </Reveal>
          </div>
        </section>

        {/* Experience */}
        <section className={SECTION}>
          <div className={`${INNER} flex flex-col gap-3 text-lg leading-[26px] tracking-[-0.36px]`}>
            <Reveal>
              <p className="text-[#6b6b6b]">Esperienze</p>
            </Reveal>
            <div>
              {EXPERIENCES.map((job, i) => (
                <Reveal
                  key={job.company}
                  delay={i * 0.06}
                  y={16}
                  className={`flex flex-col gap-3 py-5 transition-colors duration-200 hover:bg-black/[0.02] md:flex-row md:items-center md:justify-between md:gap-0 ${
                    i > 0 ? "border-t border-[#e0e0e0]" : ""
                  }`}
                >
                  <div className="flex flex-col md:w-[320px]">
                    <p className="text-black">{job.company}</p>
                    <p className="text-[#6b6b6b]">{job.role}</p>
                  </div>
                  <p className="text-[#6b6b6b] md:whitespace-nowrap">{job.period}</p>
                  <p className="text-[#6b6b6b] md:w-[220px] md:text-right">{job.place}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contacts */}
        <section className="px-6 py-12 sm:px-10 md:py-[60px] lg:px-[200px]">
          <Reveal className={`${INNER} flex flex-wrap items-start justify-center gap-5 sm:gap-10`}>
            <ContactCard
              href="https://www.linkedin.com/in/sara-lo-russo"
              external
              label="Apri il profilo LinkedIn di Sara Lo Russo"
              className="h-[90px] gap-3 bg-[#0b67c4] p-4"
            >
              <span className="text-lg font-bold tracking-[-0.36px] text-white">in</span>
              <span className="flex flex-col items-start font-medium">
                <span className="text-lg leading-[26px] tracking-[-0.36px] text-white">Linkedin</span>
                <span className="text-base leading-6 tracking-[-0.32px] text-white/70">/in/sara-lo-russo</span>
              </span>
            </ContactCard>
            <ContactCard
              href="mailto:lorussosara5@gmail.com"
              label="Scrivi a Sara Lo Russo via email"
              className="h-[90px] gap-2 bg-[#ffc9f1] px-4 py-2"
            >
              <img src={mailIcon} alt="" draggable={false} className="h-[18px] w-[26px] shrink-0 object-contain" />
              <span className="flex flex-col items-start text-base font-medium leading-6 tracking-[-0.32px]">
                <span className="text-black">Parliamo!</span>
                <span className="text-black/70">lorussosara5@gmail.com</span>
              </span>
            </ContactCard>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
