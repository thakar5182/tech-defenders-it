"use client";
import React from "react";
import { motion } from "framer-motion";
import { soundManager } from "@/utils/audio";
import { ScrambleText } from "@/components/ScrambleText";

interface AboutChapterProps {
  onNavigate: (index: number) => void;
}

const PILLARS = [
  {
    title: "Practical Innovation",
    desc: "We focus on real business outcomes, engineering software and systems that solve immediate operational challenges.",
  },
  {
    title: "Full-Stack Mastery",
    desc: "Unifying modern web platforms, mobile engineering, cloud deployments, automation, and cybersecurity under one roof.",
  },
  {
    title: "Long-Term Reliability",
    desc: "Building enduring partnerships through clean architectures, ongoing maintenance, and transparent communication.",
  },
];

export default function AboutChapter({ onNavigate }: AboutChapterProps) {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 select-none z-10">
      <div className="w-full max-w-xl lg:max-w-2xl my-auto">
        {/* Pre-header */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] md:text-xs text-cyan tracking-[0.18em] sm:tracking-[0.2em] mb-1.5 uppercase font-semibold"
        >
          <span className="w-1.5 h-1.5 bg-cyan rounded-full" />
          <span>CHAPTER 05 // ABOUT TECH DEFENDERS</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[clamp(22px,4.5vw,46px)] font-bold tracking-tight leading-tight text-ink mb-2"
        >
          <span className="block">
            <ScrambleText text="WE ARE TECH DEFENDERS." />
          </span>
          <span className="block text-cyan">
            <ScrambleText text="WE TURN IDEAS INTO TECHNOLOGY." />
          </span>
        </motion.h2>

        {/* Copy */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xs sm:text-sm text-ink-dim max-w-xl leading-relaxed mb-3 sm:mb-4"
        >
          Tech Defenders is an IT and technology company focused on helping businesses
          build, grow, secure, and modernize their digital operations. We create practical
          technology solutions across software development, web and mobile applications,
          IT systems, automation, design, and cybersecurity. Our mission is to make
          technology more useful, accessible, intelligent, and reliable for businesses.
        </motion.p>

        {/* 3 Pillars (Stacked on mobile, 3 cols on sm+) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 mb-3 sm:mb-4"
        >
          {PILLARS.map((p, i) => (
            <div
              key={i}
              onMouseEnter={() => soundManager.playHover()}
              className="p-2.5 sm:p-3 border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-cyan/50 bg-black/50 dark:bg-black/50 light:bg-white/80 backdrop-blur-md transition-all group cyber-corner rounded-sm"
            >
              <h3 className="text-xs font-bold text-ink mb-1 group-hover:text-cyan transition-colors">
                {p.title}
              </h3>
              <p className="text-[11px] text-ink-dim leading-snug">
                {p.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Next Link */}
        <div className="flex items-center justify-between pt-1 border-t border-white/10 light:border-slate-300 font-mono text-[11px]">
          <span className="text-ink-muted">05 / 07 CHOREOGRAPHY</span>
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate(6);
            }}
            className="text-cyan hover:text-ink font-semibold flex items-center gap-1.5 transition-colors min-h-[44px]"
          >
            <span>NEXT: PROVEN CLIENTS & STACK</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
