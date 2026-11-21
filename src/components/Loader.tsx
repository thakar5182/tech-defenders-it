"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(onComplete, 350);
      }
      setPct(current);
    }, 90);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-bg flex items-center justify-center"
    >
      <div className="text-center">
        <div className="font-mono text-[14px] tracking-[.3em] text-cyan mb-6">TD//</div>
        <div className="text-[clamp(48px,10vw,96px)] font-bold leading-none tabular-nums">
          {pct}%
        </div>
        <div className="w-[240px] h-[1px] bg-line my-6 mx-auto relative">
          <div
            className="absolute left-0 top-0 h-full bg-cyan transition-all duration-[90ms]"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="font-mono text-[11px] text-ink-dim tracking-[.05em] lowercase">
          initializing security protocols…
        </div>
      </div>
    </motion.div>
  );
}

