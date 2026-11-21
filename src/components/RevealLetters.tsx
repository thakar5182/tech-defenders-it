"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function RevealLetters({ text, className }: { text: string; className?: string }) {
  const [triggerKey, setTriggerKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTriggerKey(1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.span
      className={className}
      onMouseEnter={() => setTriggerKey((k) => k + 1)}
      style={{ display: "inline-flex", overflow: "hidden" }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${index}-${triggerKey}`}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            delay: index * 0.035,
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
