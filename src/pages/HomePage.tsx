import { useEffect, useMemo } from "react";
import Hero from "../components/Hero";
import ProjectsSection from "../components/ProjectsSection";
import { clearReturnTarget, peekReturnTarget } from "../lib/returnTarget";

/**
 * Scrolls so `el` sits in the middle of the viewport. Uses offsetTop (layout
 * position) rather than getBoundingClientRect, so the card's entrance
 * translate doesn't skew the result.
 */
function centerInViewport(el: HTMLElement) {
  let top = 0;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) {
    top += node.offsetTop;
  }
  window.scrollTo(0, Math.max(0, top - (window.innerHeight - el.offsetHeight) / 2));
}

export default function HomePage() {
  // Set when the visitor comes back from a case study: centre that project.
  const returnTarget = useMemo(() => peekReturnTarget(), []);

  useEffect(() => {
    document.title = "Sara Lo Russo — UX/UI Designer";
    const el = returnTarget ? document.getElementById(returnTarget) : null;
    if (el) {
      centerInViewport(el);
      clearReturnTarget();
    } else {
      window.scrollTo(0, 0);
    }
  }, [returnTarget]);

  return (
    <div className="min-h-screen w-full bg-white">
      <main>
        <Hero />
        <ProjectsSection />
      </main>
    </div>
  );
}
