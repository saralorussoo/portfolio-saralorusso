import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CaseStudyButton from "./CaseStudyButton";
import { setReturnTarget } from "../lib/returnTarget";
import { prefetchCaseStudy } from "../lib/routes";

export type Project = {
  /** Anchor id: lets the case-study page bring the visitor back to this card. */
  id?: string;
  /** Route of the case-study page. Only projects that have one get a link. */
  to?: string;
  period: string;
  title: string[];
  description: string;
  image?: string;
  imageAlt?: string;
  /** Four pages shown as a 2x2 grid inside the card (instead of one `image`). */
  gallery?: { src: string; alt: string }[];
  cardClassName: string;
  /** Border, background and text colour of the "Apri case study" button. */
  buttonTone?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  const { id, to } = project;
  const rememberCard = () => {
    if (id) setReturnTarget(id);
  };
  const prefetch = () => prefetchCaseStudy(to);

  const card = (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`flex h-[280px] w-full max-w-[687px] items-center justify-center overflow-hidden rounded-[20px] shadow-card sm:h-[360px] lg:h-[420px] ${project.cardClassName}`}
    >
      {project.image && (
        <img
          src={project.image}
          alt={project.imageAlt ?? ""}
          className="h-full w-full object-contain p-6"
          loading="lazy"
        />
      )}
      {project.gallery && (
        <div className="grid w-[88%] grid-cols-2 gap-3 sm:w-[76%] sm:gap-4 lg:gap-[20.6px]">
          {project.gallery.map((page) => (
            <img
              key={page.src}
              src={page.src}
              alt={page.alt}
              className="aspect-[1191/842] w-full border-[1.5px] border-[#f0f0f0] object-cover lg:border-[2.4px]"
              loading="lazy"
            />
          ))}
        </div>
      )}
    </motion.div>
  );

  return (
    <motion.article
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:gap-8"
    >
      <div className="flex w-full max-w-[420px] flex-col items-start gap-4 lg:w-[333px]">
        <div className="flex flex-col items-start gap-3">
          <span className="rounded-full border border-black/30 px-3.5 py-1 text-sm tracking-[-0.32px] text-black/50 lg:text-base">
            {project.period}
          </span>
          <h3 className="text-[28px] font-medium leading-normal tracking-[-0.02em] text-black lg:text-[32px] lg:leading-[35px]">
            {project.title.map((line) => (
              <span key={line} className="block lg:whitespace-nowrap">
                {line}
              </span>
            ))}
          </h3>
        </div>
        <p className="text-[18px] leading-normal tracking-[-0.02em] text-black lg:text-[20px] lg:leading-[26px]">
          {project.description}
        </p>
        <CaseStudyButton
          large
          tone={project.buttonTone}
          to={to}
          onNavigate={rememberCard}
          onPrefetch={to ? prefetch : undefined}
        >
          Apri case study
        </CaseStudyButton>
      </div>

      {to ? (
        // The button is the accessible link; the image is a second, mouse-only target.
        <Link
          to={to}
          tabIndex={-1}
          aria-hidden="true"
          onClick={rememberCard}
          onMouseEnter={prefetch}
          className="block w-full max-w-[687px] rounded-[20px] outline-none"
        >
          {card}
        </Link>
      ) : (
        card
      )}
    </motion.article>
  );
}
