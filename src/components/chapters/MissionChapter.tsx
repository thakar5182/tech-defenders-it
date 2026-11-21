"use client";
import React from "react";
import { motion } from "framer-motion";
import { soundManager } from "@/utils/audio";
import { ScrambleText } from "@/components/ScrambleText";

interface MissionChapterProps {
  onNavigate: (index: number) => void;
}

const PILLARS = [
  {
    code: "01",
    title: "Offensive Security",
    desc: "Rigorous adversary simulation uncovering critical vulnerabilities before hostile exploitation.",
  },
  {
    code: "02",
    title: "Defensive Engineering",
    desc: "Architecting zero-trust digital infrastructure, cryptographic access gates, and hardened systems.",
  },
  {
    code: "03",
    title: "Intelligent Development",
    desc: "High-performance web applications, modern e-commerce, and robust custom software built to scale.",
  },
  {
    code: "04",
    title: "24/7 Resilience",
    desc: "Continuous proactive monitoring, rapid incident containment, and strategic threat mitigation.",
  },
];

export default function MissionChapter({ onNavigate }: MissionChapterProps) {
  return (
    <div className="relative w-full h-full flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-20 pb-20 select-none z-10">
      <div className="w-full max-w-xl lg:max-w-2xl">
        {/* Pre-header */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-cyan tracking-[0.2em] mb-2 uppercase"
        >
          <span className="w-1.5 h-1.5 bg-cyan" />
          <span>CHAPTER 01 // MISSION & COMMITMENT</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[clamp(26px,3.6vw,50px)] font-bold tracking-tight leading-tight text-ink mb-3"
        >
          <span className="block">
            <ScrambleText text="YOUR DIGITAL WORLD." />
          </span>
          <span className="block text-cyan">
            <ScrambleText text="OUR DEFENSE." />
          </span>
        </motion.h2>

        {/* Company Truth Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xs sm:text-sm text-ink-dim max-w-xl leading-relaxed mb-5"
        >
          Tech Defenders is a modern IT and cybersecurity company helping
          businesses establish, grow, and secure their digital presence. We
          combine advanced technology, creative thinking, cybersecurity
          expertise, and business-focused development to deliver reliable
          digital solutions.
        </motion.p>

        {/* 4 Pillars Grid (Compact, clean) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5"
        >
          {PILLARS.map((pillar, i) => (
            <div
              key={i}
              onMouseEnter={() => soundManager.playHover()}
              className="p-3 border border-white/10 hover:border-cyan/50 bg-black/50 backdrop-blur-md transition-all group cyber-corner"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] text-cyan font-bold">
                  [{pillar.code}]
                </span>
                <span className="w-1 h-1 rounded-full bg-cyan/40 group-hover:bg-cyan transition-colors" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-ink mb-1 group-hover:text-cyan transition-colors">
                {pillar.title}
              </h3>
              <p className="text-[11px] text-ink-dim leading-snug">
                {pillar.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Next Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate(2);
            }}
            className="inline-flex items-center gap-2 font-mono text-[11px] text-cyan hover:text-white tracking-widest uppercase transition-colors"
          >
            <span>NEXT: EXPLORE SERVICES MATRIX</span>
            <span>→</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
