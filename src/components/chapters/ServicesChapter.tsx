"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/utils/audio";
import { IT_SERVICES } from "@/data";

interface ServicesChapterProps {
  onNavigate: (index: number) => void;
}

export default function ServicesChapter({ onNavigate }: ServicesChapterProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeService = IT_SERVICES[activeIdx];

  const handleSelectService = (idx: number) => {
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
            <span>CHAPTER 02 // COMPLETE IT SERVICES</span>
          </div>
          <h2 className="text-[clamp(20px,4vw,38px)] font-bold tracking-tight text-ink">
            FULL-SPECTRUM IT CAPABILITIES.
          </h2>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.3fr] gap-3 sm:gap-3.5 items-stretch">
          {/* Left: 8 Service Selector Tabs (Scrollable on small mobile) */}
          <div className="flex flex-col gap-1 max-h-[160px] sm:max-h-[220px] md:max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
            {IT_SERVICES.map((s, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelectService(idx)}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`flex items-center justify-between px-2.5 sm:px-3 py-2 text-left border transition-all rounded-sm min-h-[38px] ${
                    isSelected
                      ? "border-cyan bg-cyan/15 text-cyan translate-x-1 shadow-[0_0_12px_rgba(53,230,196,0.15)]"
                      : "border-white/10 dark:border-white/10 light:border-slate-200 bg-black/50 dark:bg-black/50 light:bg-white/70 hover:border-cyan/40 text-ink-dim hover:text-ink"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] sm:text-[10px] font-bold text-cyan">
                      [{s.code}]
                    </span>
                    <span className="text-xs font-semibold tracking-wide">
                      {s.title}
                    </span>
                  </div>
                  <span className="font-mono text-[8px] sm:text-[9px] text-ink-muted">
                    {s.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Active Service Card */}
          <div className="p-3.5 sm:p-4 border border-cyan/40 bg-black/60 dark:bg-black/60 light:bg-white/85 backdrop-blur-xl cyber-corner rounded-sm flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between border-b border-white/10 light:border-slate-200 pb-2 mb-2">
                  <div>
                    <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.16em] text-cyan uppercase block font-semibold">
                      {activeService.tagline}
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-ink">
                      {activeService.title}
                    </h3>
                  </div>
                  <span className="font-mono text-base md:text-lg font-bold text-cyan/40">
                    {activeService.code}
                  </span>
                </div>

                <p className="text-[11px] md:text-xs text-ink-dim leading-relaxed mb-2.5">
                  {activeService.desc}
                </p>

                <div className="mb-2.5">
                  <div className="font-mono text-[8px] sm:text-[9px] tracking-wider text-ink-muted uppercase mb-1">
                    CORE CAPABILITIES
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {activeService.capabilities.map((cap, i) => (
                      <div
                        key={i}
                        className="font-mono text-[10px] text-ink-dim flex items-center gap-1.5 py-0.5"
                      >
                        <span className="text-cyan text-xs">▸</span>
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between pt-2.5 border-t border-white/10 light:border-slate-200">
              <span className="font-mono text-[10px] text-ink-muted">
                DELIVERY GUARANTEE: ACTIVE
              </span>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onNavigate(7);
                }}
                className="font-mono text-[11px] text-cyan hover:text-ink font-semibold flex items-center gap-1 min-h-[38px] transition-colors"
              >
                <span>REQUEST THIS SERVICE</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
