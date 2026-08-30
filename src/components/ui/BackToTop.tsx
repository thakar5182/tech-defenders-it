"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-5 left-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(10,10,10,0.88)] text-[#D4AF37] shadow-[0_8px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:border-[rgba(212,175,55,0.55)] hover:bg-[rgba(212,175,55,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] sm:bottom-8 sm:left-8 sm:h-12 sm:w-12"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
