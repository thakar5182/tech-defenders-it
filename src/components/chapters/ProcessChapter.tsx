"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/utils/audio";
import { BUILD_PROCESS } from "@/data";

interface ProcessChapterProps {
  onNavigate: (index: number) => void;
}

export default function ProcessChapter({ onNavigate }: ProcessChapterProps) {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = BUILD_PROCESS[activeStep];

  const handleStepClick = (idx: number) => {
    soundManager.playClick();
    setActiveStep(idx);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 select-none z-10">
      <div className="w-full max-w-4xl my-auto">
        {/* Chapter Header */}
        <div className="mb-2 sm:mb-3">
          <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] md:text-xs text-cyan tracking-[0.18em] sm:tracking-[0.2em] mb-1 uppercase font-semibold">
            <span className="w-1.5 h-1.5 bg-cyan rounded-full" />
            <span>CHAPTER 04 // HOW WE BUILD</span>
          </div>
          <h2 className="text-[clamp(20px,4vw,38px)] font-bold tracking-tight text-ink mb-0.5">
            THE 7-STEP ENGINEERING JOURNEY.
          </h2>
          <p className="text-xs text-ink-dim max-w-lg">
            A disciplined development lifecycle turning complex business concepts into robust digital reality.
          </p>
        </div>

        {/* 7-Step Navigation Row (Responsive Grid: 4 cols on mobile, 7 cols on sm+) */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1 sm:gap-1.5 mb-2.5 sm:mb-3">
          {BUILD_PROCESS.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={s.step}
                onClick={() => handleStepClick(idx)}
                onMouseEnter={() => soundManager.playHover()}
                className={`p-1.5 sm:p-2 text-left border transition-all rounded-sm min-h-[44px] flex flex-col justify-between ${
                  isActive
                    ? "border-cyan bg-cyan/15 text-cyan shadow-[0_0_12px_rgba(53,230,196,0.15)]"
                    : "border-white/10 dark:border-white/10 light:border-slate-200 bg-black/50 dark:bg-black/50 light:bg-white/70 hover:border-cyan/40 text-ink-dim hover:text-ink"
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold text-cyan">
                    [{s.step}]
                  </span>
                  <span
                    className={`w-1 h-1 rounded-full ${
                      isActive ? "bg-cyan" : "bg-white/20"
                    }`}
                  />
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] font-bold tracking-wider truncate">
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Card */}
        <div className="p-3.5 sm:p-5 border border-cyan/40 bg-black/60 dark:bg-black/60 light:bg-white/85 backdrop-blur-xl cyber-corner mb-2.5 sm:mb-3 rounded-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-baseline justify-between border-b border-white/10 light:border-slate-200 pb-2 mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg md:text-xl font-bold text-cyan">
                    PHASE {currentStep.step}
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-ink-dim uppercase">
                    // {currentStep.subtitle}
                  </span>
                </div>
                <span className="font-mono text-[9px] sm:text-[10px] text-cyan">METHODOLOGY VERIFIED</span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-ink mb-1.5">
                {currentStep.title}
              </h3>
              <p className="text-xs sm:text-sm text-ink-dim leading-relaxed mb-3">
                {currentStep.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation Link */}
        <div className="flex items-center justify-between pt-1 font-mono text-[11px]">
          <span className="text-ink-muted">04 / 07 CHOREOGRAPHY</span>
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate(5);
            }}
            className="text-cyan hover:text-ink font-semibold flex items-center gap-1.5 transition-colors min-h-[44px]"
          >
            <span>NEXT: ABOUT TECH DEFENDERS</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
