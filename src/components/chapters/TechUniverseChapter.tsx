"use client";
import React from "react";
import { motion } from "framer-motion";
import { soundManager } from "@/utils/audio";
import { ScrambleText } from "@/components/ScrambleText";

interface TechUniverseChapterProps {
  onNavigate: (index: number) => void;
}

const DIMENSIONS = [
  {
    code: "01",
    title: "Software & SaaS Architecture",
    desc: "Bespoke enterprise applications, scalable ERP/CRM systems, and custom internal business workflows.",
  },
  {
    code: "02",
    title: "Web & Mobile Platforms",
    desc: "Lightning-fast Next.js web applications and intuitive React Native cross-platform mobile apps.",
  },
  {
    code: "03",
    title: "AI & Intelligent Automation",
    desc: "Streamlining business operations through automated data pipelines, AI integrations, and smart tools.",
  },
  {
    code: "04",
    title: "Cloud & Cyber Resilience",
    desc: "High-uptime AWS/Azure cloud infrastructure fortified with OWASP cybersecurity and continuous audits.",
  },
];

export default function TechUniverseChapter({ onNavigate }: TechUniverseChapterProps) {
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
          <span>CHAPTER 01 // THE TECHNOLOGY ECOSYSTEM</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[clamp(24px,5vw,50px)] font-bold tracking-tight leading-tight text-ink mb-2"
        >
          <span className="block">
            <ScrambleText text="ENTER THE FUTURE" />
          </span>
          <span className="block text-cyan">
            <ScrambleText text="OF TECHNOLOGY." />
          </span>
        </motion.h2>

        {/* Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xs sm:text-sm text-ink-dim max-w-xl leading-relaxed mb-3 sm:mb-4"
        >
          Tech Defenders is an international-grade IT and software engineering company.
          We architect comprehensive digital solutions spanning modern software, intelligent
          business automation, web platforms, and defense-grade infrastructure.
        </motion.p>

        {/* 4 Pillars Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mb-3 sm:mb-4"
        >
          {DIMENSIONS.map((dim, i) => (
            <div
              key={i}
              onMouseEnter={() => soundManager.playHover()}
              className="p-2.5 sm:p-3 border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-cyan/50 bg-black/50 dark:bg-black/50 light:bg-white/80 backdrop-blur-md transition-all group cyber-corner rounded-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[9px] sm:text-[10px] text-cyan font-bold">
                  [{dim.code}]
                </span>
                <span className="w-1 h-1 rounded-full bg-cyan/40 group-hover:bg-cyan transition-colors" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-ink mb-1 group-hover:text-cyan transition-colors">
                {dim.title}
              </h3>
              <p className="text-[11px] text-ink-dim leading-snug">
                {dim.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Footer Jump CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-between pt-2 border-t border-white/10 light:border-slate-300 font-mono text-[11px]"
        >
          <span className="text-ink-muted">01 / 07 CHOREOGRAPHY</span>
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate(2);
            }}
            className="text-cyan hover:text-ink font-semibold flex items-center gap-1.5 transition-colors min-h-[44px] flex items-center"
          >
            <span>NEXT: COMPLETE SERVICES</span>
            <span>→</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
