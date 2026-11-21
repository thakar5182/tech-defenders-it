"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/utils/audio";
import { DIGITAL_SOLUTIONS } from "@/data";

interface SolutionsChapterProps {
  onNavigate: (index: number) => void;
}

export default function SolutionsChapter({ onNavigate }: SolutionsChapterProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeSol = DIGITAL_SOLUTIONS[activeIdx];

  const handleSelect = (idx: number) => {
    soundManager.playClick();
    setActiveIdx(idx);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 select-none z-10">
      <div className="w-full max-w-4xl my-auto">
        {/* Chapter Header */}
        <div className="mb-2 sm:mb-3">
          <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] md:text-xs text-cyan tracking-[0.18em] sm:tracking-[0.2em] mb-1 uppercase font-semibold">
            <span className="w-1.5 h-1.5 bg-cyan rounded-full" />
            <span>CHAPTER 03 // PRODUCTS & BUSINESS SOLUTIONS</span>
          </div>
          <h2 className="text-[clamp(20px,4vw,38px)] font-bold tracking-tight text-ink mb-0.5">
            ARCHITECTING BUSINESS ENGINES.
          </h2>
          <p className="text-xs text-ink-dim max-w-lg">
            Purpose-built platforms engineered to automate operations, accelerate commerce, and power modern enterprises.
          </p>
        </div>

        {/* 4 Solutions Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
          {DIGITAL_SOLUTIONS.map((sol, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={sol.id}
                onClick={() => handleSelect(idx)}
                onMouseEnter={() => soundManager.playHover()}
                className={`p-2 sm:p-2.5 text-left border transition-all rounded-sm min-h-[44px] flex flex-col justify-between ${
                  isSelected
                    ? "border-cyan bg-cyan/15 text-cyan shadow-[0_0_12px_rgba(53,230,196,0.15)]"
                    : "border-white/10 dark:border-white/10 light:border-slate-200 bg-black/50 dark:bg-black/50 light:bg-white/70 hover:border-cyan/40 text-ink-dim hover:text-ink"
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold text-cyan">
                    [{sol.code}]
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? "bg-cyan" : "bg-white/20"
                    }`}
                  />
                </div>
                <div className="font-mono text-[11px] sm:text-xs font-bold truncate">
                  {sol.title.split(" ")[0]} {sol.title.split(" ")[1] || ""}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Solution Spotlight Card */}
        <div className="p-3.5 sm:p-5 border border-cyan/40 bg-black/60 dark:bg-black/60 light:bg-white/85 backdrop-blur-xl cyber-corner mb-2.5 sm:mb-3 rounded-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-baseline justify-between border-b border-white/10 light:border-slate-200 pb-2 mb-2">
                <div>
                  <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-cyan uppercase block font-semibold">
                    {activeSol.tagline}
                  </span>
                  <h3 className="text-sm md:text-base font-bold text-ink">
                    {activeSol.title}
                  </h3>
                </div>
                <span className="font-mono text-[9px] sm:text-xs text-cyan">VERIFIED ARCHITECTURE</span>
              </div>

              <p className="text-[11px] sm:text-xs text-ink-dim leading-relaxed mb-2.5">
                {activeSol.desc}
              </p>

              <div className="mb-2">
                <div className="font-mono text-[8px] sm:text-[9px] tracking-wider text-ink-muted uppercase mb-1">
                  CORE PLATFORM ATTRIBUTES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {activeSol.features.map((feat, i) => (
                    <div
                      key={i}
                      className="font-mono text-[10px] sm:text-[11px] text-ink-dim flex items-center gap-1.5 py-0.5"
                    >
                      <span className="text-cyan text-xs">▸</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation Link */}
        <div className="flex items-center justify-between pt-1 font-mono text-[11px]">
          <span className="text-ink-muted">03 / 07 CHOREOGRAPHY</span>
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate(4);
            }}
            className="text-cyan hover:text-ink font-semibold flex items-center gap-1.5 transition-colors min-h-[44px]"
          >
            <span>NEXT: ENGINEERING LIFECYCLE</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
