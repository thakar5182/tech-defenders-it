"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/utils/audio";
import { CLIENT_REFERENCES, TECH_STACK } from "@/data";

interface ProjectsChapterProps {
  onNavigate: (index: number) => void;
}

export default function ProjectsChapter({ onNavigate }: ProjectsChapterProps) {
  const [tab, setTab] = useState<"clients" | "stack">("clients");

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 select-none z-10">
      <div className="w-full max-w-4xl my-auto">
        {/* Chapter Header */}
        <div className="mb-2 sm:mb-3">
          <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] md:text-xs text-cyan tracking-[0.18em] sm:tracking-[0.2em] mb-1 uppercase font-semibold">
            <span className="w-1.5 h-1.5 bg-cyan rounded-full" />
            <span>CHAPTER 06 // CLIENTS & TECHNOLOGY STACK</span>
          </div>
          <h2 className="text-[clamp(20px,4vw,38px)] font-bold tracking-tight text-ink mb-0.5">
            PROVEN WORK & MODERN TOOLS.
          </h2>
          <p className="text-xs text-ink-dim max-w-lg">
            Authentic client engagements and battle-tested modern technology frameworks driving measurable business impact.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
          <button
            onClick={() => {
              soundManager.playClick();
              setTab("clients");
            }}
            className={`px-3 py-1.5 text-xs font-mono tracking-wider border transition-colors rounded-sm min-h-[38px] ${
              tab === "clients"
                ? "border-cyan bg-cyan/15 text-cyan"
                : "border-white/10 dark:border-white/10 light:border-slate-200 text-ink-dim hover:text-ink"
            }`}
          >
            [ CLIENT ENGAGEMENTS ]
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setTab("stack");
            }}
            className={`px-3 py-1.5 text-xs font-mono tracking-wider border transition-colors rounded-sm min-h-[38px] ${
              tab === "stack"
                ? "border-cyan bg-cyan/15 text-cyan"
                : "border-white/10 dark:border-white/10 light:border-slate-200 text-ink-dim hover:text-ink"
            }`}
          >
            [ TECHNOLOGY STACK ]
          </button>
        </div>

        {/* Content Pane */}
        <div className="p-3.5 sm:p-4 border border-cyan/40 bg-black/60 dark:bg-black/60 light:bg-white/85 backdrop-blur-xl cyber-corner mb-2.5 sm:mb-3 rounded-sm flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {tab === "clients" ? (
              <motion.div
                key="clients"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5"
              >
                {CLIENT_REFERENCES.map((client, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => soundManager.playHover()}
                    className="p-3 border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-cyan/50 bg-black/50 dark:bg-black/50 light:bg-white/70 transition-all group rounded-sm"
                  >
                    <div className="flex items-baseline justify-between mb-1">
                      <h4 className="font-bold text-xs md:text-sm text-ink group-hover:text-cyan transition-colors">
                        {client.name}
                      </h4>
                      <span className="font-mono text-[9px] text-cyan">VERIFIED</span>
                    </div>
                    <p className="text-[11px] text-ink-dim mb-1">
                      {client.tagline}
                    </p>
                    <div className="font-mono text-[9px] text-ink-muted">
                      Scope: {client.scope}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="stack"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"
              >
                {TECH_STACK.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 sm:p-2.5 border border-white/10 dark:border-white/10 light:border-slate-200 bg-black/40 dark:bg-black/40 light:bg-white/70 rounded-sm"
                  >
                    <span className="font-mono text-[9px] text-cyan block mb-1 font-semibold uppercase">
                      {item.category}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.items.map((sub, j) => (
                        <span
                          key={j}
                          className="font-mono text-[10px] text-ink bg-white/5 dark:bg-white/5 light:bg-slate-200 px-1.5 py-0.5 rounded"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation Link */}
        <div className="flex items-center justify-between pt-1 font-mono text-[11px]">
          <span className="text-ink-muted">06 / 07 CHOREOGRAPHY</span>
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate(7);
            }}
            className="text-cyan hover:text-ink font-semibold flex items-center gap-1.5 transition-colors min-h-[44px]"
          >
            <span>NEXT: INITIATE YOUR PROJECT</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
