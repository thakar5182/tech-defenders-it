"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { soundManager } from "@/utils/audio";

interface CinematicIntroProps {
  onComplete: () => void;
}

const STAGES = [
  "BUILDING DIGITAL FUTURES",
  "ENGINEERING INNOVATION",
  "CONNECTING TECHNOLOGY",
  "SYSTEM ONLINE",
];

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [audioMuted, setAudioMuted] = useState(true);

  const handleFinish = useCallback(() => {
    soundManager.playScanSuccess();
    if (typeof window !== "undefined") {
      sessionStorage.setItem("td_intro_completed", "true");
    }
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    setAudioMuted(soundManager.getMuted());

    let current = 0;
    const interval = setInterval(() => {
      const inc = current < 35 ? 5 : current < 70 ? 8 : current < 95 ? 6 : 3;
      current = Math.min(100, current + inc);
      setProgress(current);

      if (current < 28) {
        setStageIndex(0);
      } else if (current < 58) {
        setStageIndex(1);
      } else if (current < 88) {
        setStageIndex(2);
      } else {
        setStageIndex(3);
      }

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(handleFinish, 500);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [handleFinish]);

  const toggleSound = () => {
    const nextMuted = soundManager.toggleMute();
    setAudioMuted(nextMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: "blur(6px)",
        transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-[9999] bg-[#030508] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Background Matrix & Grid */}
      <div className="absolute inset-0 bg-hero-grid bg-[48px_48px] opacity-20 mask-hero" />
      <div className="absolute inset-0 bg-scanlines opacity-15 pointer-events-none" />

      {/* Top Controls: Sound & Skip */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_#35e6c4]" />
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-ink-dim uppercase">
            TECH DEFENDERS // IT COMMAND
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className="flex items-center gap-2 px-3 py-1.5 border border-white/10 hover:border-cyan text-ink-dim hover:text-cyan text-[11px] font-mono tracking-wider transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan/70" />
            AUDIO: {audioMuted ? "MUTED" : "ACTIVE"}
          </button>

          <button
            onClick={handleFinish}
            className="px-3.5 py-1.5 border border-cyan/40 hover:border-cyan bg-cyan/10 hover:bg-cyan/20 text-cyan text-[11px] font-mono tracking-[0.14em] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            [ SKIP INTRO ]
          </button>
        </div>
      </div>

      {/* Center Digital Assembly Scene */}
      <div className="relative z-10 flex flex-col items-center max-w-[480px] w-full px-6">
        {/* Holographic Assembly Rings & Logo */}
        <div className="relative w-44 h-44 md:w-56 md:h-56 flex items-center justify-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-cyan/35 rounded-full border-dashed"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 border border-blue-500/40 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.35, 0.75, 0.35] }}
            transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-6 border border-cyan/60 rounded-full"
          />

          {/* Central Logo Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{
              opacity: progress > 12 ? 1 : 0.2,
              scale: progress > 12 ? 1 : 0.8,
            }}
            transition={{ duration: 0.5 }}
            className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center"
          >
            <Image
              src="/logo.png"
              alt="Tech Defenders"
              width={144}
              height={144}
              unoptimized
              className="w-full h-full object-contain filter drop-shadow-[0_0_24px_rgba(0,120,255,0.7)]"
              priority
            />
          </motion.div>
        </div>

        {/* Progress Numeric Readout */}
        <div className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-ink mb-2.5 tabular-nums flex items-baseline">
          <span>{String(progress).padStart(2, "0")}</span>
          <span className="text-lg text-cyan ml-1">%</span>
        </div>

        {/* Progress Bar with Laser Head */}
        <div className="w-full max-w-[320px] h-[2px] bg-white/10 relative overflow-hidden mb-5">
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-cyan/40 via-cyan to-white shadow-[0_0_10px_#35e6c4]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.08 }}
          />
        </div>

        {/* Dynamic Status Text */}
        <div className="h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={stageIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.18 }}
              className="font-mono text-xs tracking-[0.22em] text-cyan uppercase flex items-center gap-2"
            >
              <span className="inline-block w-1 h-3 bg-cyan animate-pulse" />
              {STAGES[stageIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] font-mono text-ink-muted">
        <div>TECH DEFENDERS IT // ENTERPRISE TECHNOLOGY</div>
        <div className="hidden sm:block">SOFTWARE • WEB • MOBILE • AI • CLOUD • SECURITY</div>
        <div>INITIALIZATION COMPLETE</div>
      </div>
    </motion.div>
  );
}
