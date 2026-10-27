import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import {
  isCaseStudyRoute,
  loadAboutPage,
  loadBobNoordaPage,
  loadFuoriCorsoPage,
} from "./lib/routes";

// Case-study pages and About are split out of the main bundle; they load on
// demand (and are prefetched when the visitor hovers/focuses the link).
const FuoriCorsoPage = lazy(loadFuoriCorsoPage);
const BobNoordaPage = lazy(loadBobNoordaPage);
const AboutPage = lazy(loadAboutPage);

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Each page positions itself on mount; don't let the browser fight it.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  return (
    <>
      {/* Lives above the routes so the active pill glides between Home and About. */}
      {!isCaseStudyRoute(pathname) && <Header />}
      <Suspense fallback={<div className="min-h-dvh w-full bg-white" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/fuori-corso" element={<FuoriCorsoPage />} />
          <Route path="/bob-noorda" element={<BobNoordaPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
