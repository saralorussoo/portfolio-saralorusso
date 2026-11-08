import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import CaseStudyButton from "../CaseStudyButton";
import { CaseSection, SectionLabel } from "./primitives";
import { setReturnTarget } from "../../lib/returnTarget";
import { prefetchCaseStudy } from "../../lib/routes";
import headSpaImg from "../../assets/images/project-headspa.webp";
import nattbadImg from "../../assets/images/project-nattbad.webp";
import spreadMilano from "../../assets/bob-noorda/spread-milano.jpg";
import spreadNewYork from "../../assets/bob-noorda/spread-newyork.jpg";
import spreadSaoPaulo from "../../assets/bob-noorda/spread-saopaulo.jpg";
import spreadIdentita from "../../assets/bob-noorda/spread-identita.jpg";

type OtherProject = {
  /** Also the Home card the visitor is taken back to (see lib/returnTarget). */
  id: string;
  /** Route of the case study; projects without one get an inert button. */
  to?: string;
  title: string[];
  cardClassName: string;
  buttonTone: string;
  /** One picture, centred in the card (same artwork as the Home card). */
  image?: { src: string; alt: string };
  /** Four pages shown as a 2x2 grid. */
  gallery?: { src: string; alt: string }[];
};

/** Every project that can appear under "Altri progetti", as drawn in the Figma. */
const PROJECTS = {
  "head-spa": {
    id: "head-spa",
    to: "/head-spa",
    title: ["Catalogo Head Spa Suite11"],
    cardClassName: "rounded-[14.265px] border border-[rgba(55,27,3,0.3)] bg-[rgba(55,27,3,0.1)]",
    buttonTone: "border-white bg-[#371b03] text-white",
    image: {
      src: headSpaImg,
      alt: "Catalogo Head Spa Suite11: copertina scura con il logo e una doppia pagina dedicata al rituale La Quintessenza",
    },
  },
  "bob-noorda": {
    id: "bob-noorda",
    to: "/bob-noorda",
    title: ["Progetto universitario", "Mostra su Bob Noorda"],
    cardClassName: "rounded-[14.265px] border border-[rgba(247,193,1,0.3)] bg-[rgba(247,193,1,0.1)]",
    buttonTone: "border-white bg-[#f7c101] text-black",
    gallery: [
      { src: spreadMilano, alt: "Doppia pagina del catalogo dedicata alla metropolitana di Milano" },
      { src: spreadNewYork, alt: "Doppia pagina del catalogo dedicata alla New York City Subway" },
      { src: spreadSaoPaulo, alt: "Doppia pagina del catalogo dedicata al Metrô de São Paulo" },
      { src: spreadIdentita, alt: "Doppia pagina del catalogo dedicata all'identità visiva" },
    ],
  },
  nattbad: {
    id: "nattbad",
    to: "/nattbad",
    title: ["Progetto universitario", "Sito web NATTBAD"],
    cardClassName: "rounded-[14.265px] border border-[rgba(234,206,190,0.3)] bg-[rgba(210,174,153,0.1)]",
    buttonTone: "border-white bg-[#eacebe] text-black",
    image: {
      src: nattbadImg,
      alt: "Il sito NATTBAD su desktop, mobile e tablet: pagine Home, Prodotto, Playlist, News, Contatti e Promo",
    },
  },
  kalos: {
    id: "kalos",
    title: ["Sito web palestra", "Kalos Studio"],
    cardClassName: "rounded-[20px] border border-[rgba(189,41,29,0.3)] bg-[rgba(189,41,29,0.1)]",
    buttonTone: "border-white bg-[#bd291d] text-white",
  },
  osteopata: {
    id: "osteopata",
    title: ["Sito web osteopata", "Mattia Bettini"],
    cardClassName: "rounded-[20px] bg-[#ffc9f1]",
    buttonTone: "border-white bg-[#ffc9f1] text-black",
  },
} satisfies Record<string, OtherProject>;

export type OtherProjectId = keyof typeof PROJECTS;

/**
 * "Altri progetti" band that closes a case study: two project cards, each with
 * its "Apri case study" button. Projects that have a page link to it; the
 * others show an inert card.
 */
export default function OtherProjects({ ids }: { ids: OtherProjectId[] }) {
  const reduce = useReducedMotion();
  const projects: OtherProject[] = ids.map((id) => PROJECTS[id]);

  return (
    <CaseSection bordered={false} className="flex flex-col gap-10 md:!py-24 lg:!py-[200px]">
      <SectionLabel>Altri progetti</SectionLabel>
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-[60px]">
        {projects.map(({ id, to, title, cardClassName, buttonTone, image, gallery }) => {
          const rememberCard = () => setReturnTarget(id);
          const card = (
            <motion.div
              whileHover={reduce ? undefined : { y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              style={{ containerType: "inline-size" }}
              className={`relative flex aspect-[687/420] w-full items-center justify-center overflow-hidden shadow-card ${cardClassName}`}
            >
              {image && (
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-contain"
                  style={{ padding: "5.1cqw" }}
                />
              )}
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
  );
}
