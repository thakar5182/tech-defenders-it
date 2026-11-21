"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import { usePathname } from "next/navigation";
import Loader from "./Loader";
import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "@/context/ThemeContext";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [subpageLoading, setSubpageLoading] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [progress, setProgress] = useState(0);

  // Reset scroll and unlock body on every route change
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    if (isHomePage) return;

    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0) {
        setProgress((window.scrollY / h) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, pathname]);

  // If on homepage: render full-screen immersive experience directly
  if (isHomePage) {
    return (
      <ThemeProvider>
        <CustomCursor />
        {children}
      </ThemeProvider>
    );
  }

  // On inner pages: render with standard Lenis smooth scrolling, top bar, and footer
  return (
    <ThemeProvider>
      <AnimatePresence>
        {subpageLoading && <Loader onComplete={() => setSubpageLoading(false)} />}
      </AnimatePresence>

      <div
        className="fixed top-0 left-0 h-[2px] bg-cyan z-[1000] transition-all duration-75"
        style={{ width: `${progress}%` }}
      />

      <CustomCursor />

      <ReactLenis root options={{ lerp: 0.1, duration: 1.1, smoothWheel: true, syncTouch: false }}>
        <Navbar />

        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            id="top"
          >
            {children}
          </motion.main>
        </AnimatePresence>

        <Footer />
      </ReactLenis>
    </ThemeProvider>
  );
}
