import ProjectCard, { type Project } from "./ProjectCard";
import fuoriCorsoImg from "../assets/images/project-fuoricorso.jpg";
import headSpaImg from "../assets/images/project-headspa.webp";
import nattbadImg from "../assets/images/project-nattbad.webp";
import spreadMilano from "../assets/bob-noorda/spread-milano.jpg";
import spreadNewYork from "../assets/bob-noorda/spread-newyork.jpg";
import spreadSaoPaulo from "../assets/bob-noorda/spread-saopaulo.jpg";
import spreadIdentita from "../assets/bob-noorda/spread-identita.jpg";

const PINK_BUTTON = "border-white bg-[#ffc9f1] text-black";

const PROJECTS: Project[] = [
  {
    id: "fuori-corso",
    to: "/fuori-corso",
    period: "Ago 2026 – Presente",
    title: ["Fuori Corso", "Instagram"],
    description:
      "Direzione visiva per social media, grafiche per post e storie Instagram di una pagina eventi giovani a Saronno.",
    image: fuoriCorsoImg,
    imageAlt:
      "Griglia di locandine e menu del progetto Fuori Corso: tracklist, eventi al Club House e serate in Chiappini & Giugni",
    cardClassName: "border border-[rgba(157,28,32,0.3)] bg-[rgba(157,28,32,0.1)]",
    buttonTone: "border-white bg-[#99202f] text-white",
  },
  {
    id: "head-spa",
    to: "/head-spa",
    period: "Ott 2026",
    title: ["Catalogo Head Spa", "Suite11"],
    description:
      "Progettazione di un catalogo cartaceo dedicato ai trattamenti Head Spa per un salone di bellezza, sviluppato in Affinity.",
    image: headSpaImg,
    imageAlt:
      "Catalogo Head Spa Suite11: copertina scura con il logo e una doppia pagina dedicata al rituale La Quintessenza",
    imagePadding: "p-6 lg:p-[34.5px]",
    cardClassName: "border border-[rgba(55,27,3,0.3)] bg-[rgba(55,27,3,0.1)]",
    buttonTone: "border-white bg-[#371b03] text-white",
  },
  {
    id: "bob-noorda",
    to: "/bob-noorda",
    period: "Apr – Giu 2026",
    title: ["Progetto universitario", "Mostra su Bob Noorda"],
    description:
      "Identità visiva e materiali per la mostra: ideare il concept e i materiali di comunicazione (catalogo, invito, social...).",
    gallery: [
      { src: spreadMilano, alt: "Doppia pagina del catalogo dedicata alla metropolitana di Milano" },
      { src: spreadNewYork, alt: "Doppia pagina del catalogo dedicata alla New York City Subway" },
      { src: spreadSaoPaulo, alt: "Doppia pagina del catalogo dedicata al Metrô de São Paulo" },
      { src: spreadIdentita, alt: "Doppia pagina del catalogo dedicata all'identità visiva" },
    ],
    cardClassName: "border border-[rgba(247,193,1,0.3)] bg-[rgba(247,193,1,0.1)]",
    buttonTone: "border-white bg-[#f7c101] text-black",
  },
  {
    id: "nattbad",
    to: "/nattbad",
    period: "Feb – Giu 2026",
    title: ["Progetto universitario", "Sito web NATTBAD"],
    description:
      "Realizzazione di un sito responsive (desktop, mobile, tablet) e performante, sviluppato in WordPress.",
    image: nattbadImg,
    imageAlt:
      "Il sito NATTBAD su desktop, mobile e tablet: pagine Home, Prodotto, Playlist, News, Contatti e Promo",
    imagePadding: "p-6 lg:p-[34.5px]",
    cardClassName: "border border-[rgba(234,206,190,0.3)] bg-[rgba(210,174,153,0.1)]",
    buttonTone: "border-white bg-[#eacebe] text-black",
  },
  {
    period: "Ago – Ott 2025",
    title: ["Sito web palestra", "Kalos Studio"],
    description:
      "Realizzazione di un sito responsive, progettazione dell'interfaccia e dell'identità visiva, sviluppato in Framer.",
    cardClassName: "border border-[rgba(189,41,29,0.3)] bg-[rgba(189,41,29,0.1)]",
    buttonTone: "border-white bg-[#bd291d] text-white",
  },
  {
    period: "Lug – Sett 2024",
    title: ["Sito web osteopata", "Mattia Bettini"],
    description:
      "Realizzazione di un sito responsive, progettazione dell'interfaccia e dell'identità visiva, sviluppato in Framer.",
    cardClassName: "bg-[#ffc9f1]",
    buttonTone: PINK_BUTTON,
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="progetti"
      className="w-full bg-[#fafafa] px-6 py-20 sm:px-10 md:py-24 lg:px-[200px] lg:py-[100px]"
    >
      <div className="mx-auto flex max-w-[1040px] flex-col gap-16 lg:gap-[100px]">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title.join(" ")} project={project} />
        ))}
      </div>
    </section>
  );
}
