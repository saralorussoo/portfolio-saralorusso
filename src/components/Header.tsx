import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { prefetchPage } from "../lib/routes";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
];

export default function Header() {
  const { pathname } = useLocation();
  const active = pathname === "/about" ? "About" : "Home";

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-5 z-50 flex justify-center px-4"
    >
      <nav
        aria-label="Navigazione principale"
        className="flex items-center gap-1 rounded-full border border-[#dfe2e0] bg-[#eff1ef]/90 p-1 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl"
      >
        {LINKS.map((link) => {
          const isActive = link.label === active;
          return (
            <Link
              key={link.label}
              to={link.to}
              onClick={(event) => {
                // Already on this page: just bring the visitor back to the top.
                if (isActive) {
                  event.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              onMouseEnter={() => prefetchPage(link.to)}
              onFocus={() => prefetchPage(link.to)}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex h-10 min-w-[82px] items-center justify-center rounded-full px-4 text-sm tracking-[-0.28px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-black/40 ${
                isActive
                  ? "text-[#1a1a1a]"
                  : "text-[#606561] hover:text-[#1a1a1a]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="absolute inset-0 rounded-full bg-white shadow-[0_4px_4px_-2px_rgba(0,0,0,0.06)]"
                />
              )}
              <span className="relative">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </motion.header>
  );
}
