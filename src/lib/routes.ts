/**
 * Pages split out of the main bundle and loaded on demand. Keyed by route
 * path so a link can prefetch its own destination without knowing which
 * page component that is.
 */
const CASE_STUDY_LOADERS = {
  "/fuori-corso": () => import("../pages/FuoriCorsoPage"),
  "/bob-noorda": () => import("../pages/BobNoordaPage"),
} as const;

const PAGE_LOADERS = {
  ...CASE_STUDY_LOADERS,
  "/about": () => import("../pages/AboutPage"),
} as const;

export const loadFuoriCorsoPage = CASE_STUDY_LOADERS["/fuori-corso"];
export const loadBobNoordaPage = CASE_STUDY_LOADERS["/bob-noorda"];
export const loadAboutPage = PAGE_LOADERS["/about"];

/** Case studies have their own "Indietro" button instead of the main navbar. */
export function isCaseStudyRoute(pathname: string) {
  return pathname in CASE_STUDY_LOADERS;
}

/** Starts loading the chunk for `to`, if it's a known lazy route. */
export function prefetchPage(to?: string) {
  if (to && to in PAGE_LOADERS) {
    void PAGE_LOADERS[to as keyof typeof PAGE_LOADERS]();
  }
}

/** Same as `prefetchPage`; kept under its original name for the project cards. */
export const prefetchCaseStudy = prefetchPage;
