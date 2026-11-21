"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/utils/audio";

interface ApproachChapterProps {
  onNavigate: (index: number) => void;
}

const STEPS = [
  {
    step: "01",
    title: "DISCOVER",
    subtitle: "Context & Threat Assessment",
    desc: "Understand the client's business, goals, risks, compliance mandates, and operational requirements.",
    detail: "Architecture interviews and digital asset mapping to establish an exhaustive threat model.",
  },
  {
    step: "02",
    title: "ANALYZE",
    subtitle: "Vulnerability & Posture Audit",
    desc: "Evaluate systems, workflows, security posture, configuration integrity, and architectural opportunities.",
    detail: "Automated vulnerability scans combined with hands-on manual attack simulation.",
  },
  {
    step: "03",
    title: "STRATEGIZE",
    subtitle: "Security & Tech Roadmap",
    desc: "Design the appropriate technology and security roadmap prioritized by real business risk and impact.",
    detail: "Delivering an actionable blueprint with prioritized remediation milestones.",
  },
  {
    step: "04",
    title: "BUILD",
    subtitle: "Hardened Implementation",
    desc: "Develop and implement solutions using appropriate modern technologies and secure engineering practices.",
    detail: "From custom web architectures to API firewalls, we implement defense-grade code.",
  },
  {
    step: "05",
    title: "PROTECT",
    subtitle: "Verification & Defense Lock",
    desc: "Apply security-first practices and verify implementation through stringent validation and re-testing.",
    detail: "Comprehensive re-testing ensures all identified vulnerabilities are eliminated.",
  },
  {
    step: "06",
    title: "EVOLVE",
    subtitle: "Continuous Optimization",
    desc: "Maintain, optimize, and improve as business conditions and external cyber threats evolve.",
    detail: "Ongoing advisory, proactive threat intelligence feeds, and periodic reviews.",
  },
];

export default function ApproachChapter({ onNavigate }: ApproachChapterProps) {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (idx: number) => {
    soundManager.playClick();
    setActiveStep(idx);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-20 pb-20 select-none z-10">
      <div className="w-full max-w-4xl">
        {/* Chapter Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-cyan tracking-[0.2em] mb-1.5 uppercase">
            <span className="w-1.5 h-1.5 bg-cyan" />
            <span>CHAPTER 03 // OUR APPROACH</span>
          </div>
          <h2 className="text-[clamp(24px,3.2vw,44px)] font-bold tracking-tight text-ink mb-1">
            THE 6-STEP DEFENSE LIFECYCLE.
          </h2>
          <p className="text-xs text-ink-dim max-w-lg">
            A proven methodology ensuring comprehensive protection from initial discovery to continuous evolution.
          </p>
        </div>

        {/* 6 Step Stepper */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mb-4">
          {STEPS.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={s.step}
                onClick={() => handleStepClick(idx)}
                onMouseEnter={() => soundManager.playHover()}
                className={`p-2.5 text-left border transition-all ${
                  isActive
                    ? "border-cyan bg-cyan/15 text-cyan shadow-[0_0_12px_rgba(53,230,196,0.15)]"
                    : "border-white/10 bg-black/50 hover:border-cyan/40 text-ink-dim hover:text-ink"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] font-bold text-cyan">
                    [{s.step}]
                  </span>
                  <span
                    className={`w-1 h-1 rounded-full ${
                      isActive ? "bg-cyan" : "bg-white/20"
                    }`}
                  />
                </div>
                <div className="font-mono text-[11px] font-bold tracking-wider">
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Step Spotlight Card */}
        <div className="p-4 md:p-6 border border-cyan/40 bg-black/60 backdrop-blur-xl cyber-corner mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-baseline justify-between border-b border-white/10 pb-2.5 mb-3">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-xl md:text-2xl font-bold text-cyan">
                    STEP {STEPS[activeStep].step}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-ink-dim uppercase">
                    // {STEPS[activeStep].subtitle}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-cyan">STAGE VERIFIED</span>
              </div>

              <h3 className="text-base md:text-lg font-bold text-ink mb-1.5">
                {STEPS[activeStep].title}
              </h3>
              <p className="text-xs md:text-sm text-ink-dim leading-relaxed mb-3">
                {STEPS[activeStep].desc}
              </p>
              <div className="p-2.5 border-l-2 border-cyan bg-cyan/5 text-xs text-ink-dim font-mono">
                <span className="text-cyan font-bold mr-2">EXECUTION:</span>
                {STEPS[activeStep].detail}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Chapter Link */}
        <button
          onClick={() => {
            soundManager.playClick();
            onNavigate(4);
          }}
          className="inline-flex items-center gap-2 font-mono text-[11px] text-cyan hover:text-white tracking-widest uppercase transition-colors"
        >
          <span>NEXT: TECHNOLOGY & TRUSTED CLIENTS</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
