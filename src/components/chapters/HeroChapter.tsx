"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/utils/audio";
import { ScrambleText } from "@/components/ScrambleText";

interface HeroChapterProps {
  onNavigate: (index: number) => void;
}

const ACTION_PHRASES = [
  "WE DESIGN.",
  "WE DEVELOP.",
  "WE INNOVATE.",
  "WE TRANSFORM.",
];

export default function HeroChapter({ onNavigate }: HeroChapterProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % ACTION_PHRASES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const verifiedClients = ["M&M Innovation", "Ananta Industries", "Aakash Electronics"];

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24 select-none z-10">
      {/* Left Column Constrained Box */}
      <div className="w-full max-w-xl lg:max-w-2xl my-auto">
        {/* Animated Sub-Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 border border-cyan/30 bg-panel/80 dark:bg-black/60 light:bg-white/80 backdrop-blur-md mb-2 sm:mb-3 rounded-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse shadow-[0_0_6px_#35e6c4]" />
          <div className="h-4 overflow-hidden font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.16em] sm:tracking-[0.18em] text-cyan uppercase font-semibold">
            <AnimatePresence mode="wait">
              <motion.span
                key={phraseIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="inline-block"
              >
                {ACTION_PHRASES[phraseIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Main Headline with Responsive Fluid Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[clamp(26px,5.8vw,62px)] font-bold tracking-tight leading-[1.04] mb-2 sm:mb-3 text-ink"
        >
          <span className="block">
            <ScrambleText text="TECHNOLOGY." />
          </span>
          <span className="block text-transparent stroke-text">
            <ScrambleText text="BUILT FOR WHAT'S NEXT." />
          </span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-xs sm:text-sm md:text-base text-ink-dim max-w-lg leading-relaxed mb-4 sm:mb-5"
        >
          We empower businesses with intelligent IT solutions, innovative software,
          modern digital experiences, automation, and technology that moves business forward.
        </motion.p>

        {/* Action CTAs (Touch-friendly minimum 44px target) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5 max-w-md sm:max-w-none"
        >
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate(1);
            }}
            className="group relative min-h-[44px] px-5 sm:px-6 py-2.5 bg-cyan text-[#030508] font-mono text-xs font-bold tracking-[0.12em] sm:tracking-[0.14em] overflow-hidden transition-all hover:scale-[1.01] active:scale-[0.98] shadow-[0_0_16px_rgba(53,230,196,0.25)] rounded-sm flex items-center justify-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              [ EXPLORE OUR TECHNOLOGY ]
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate(7);
            }}
            className="min-h-[44px] px-5 sm:px-6 py-2.5 border border-line hover:border-cyan text-ink hover:text-cyan font-mono text-xs font-semibold tracking-[0.12em] sm:tracking-[0.14em] transition-all bg-panel/60 dark:bg-black/40 light:bg-white/70 backdrop-blur-md rounded-sm flex items-center justify-center"
          >
            [ BUILD YOUR PROJECT ]
          </button>
        </motion.div>

        {/* Verified Enterprise Partners Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="border-t border-white/10 light:border-slate-300 pt-2.5 sm:pt-3"
        >
          <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.18em] text-ink-muted uppercase mb-1">
            TRUSTED BY VISIONARY BUSINESSES
          </div>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {verifiedClients.map((client, i) => (
              <span
                key={i}
                className="font-mono text-[11px] sm:text-xs text-ink-dim hover:text-cyan transition-colors"
              >
                // {client}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
