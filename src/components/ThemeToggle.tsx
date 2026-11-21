"use client";
import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { soundManager } from "@/utils/audio";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  const isDark = theme === "dark";

  const handleToggle = () => {
    soundManager.playClick();
    toggleTheme();
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={handleToggle}
        onMouseEnter={() => {
          soundManager.playHover();
          setShowTooltip(true);
        }}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        className={`group relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-md border border-white/10 dark:border-white/10 light:border-slate-300 bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-100 hover:border-cyan transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-cyan ${className}`}
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
        ) : (
          <Moon className="w-4 h-4 text-blue-600 group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
        )}
      </button>

      {/* Floating Glass Tooltip */}
      {showTooltip && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-[1000] px-2.5 py-1 rounded bg-[#030508]/90 dark:bg-[#030508]/95 light:bg-white border border-white/10 light:border-slate-200 text-[10px] font-mono tracking-wider text-ink shadow-xl pointer-events-none whitespace-nowrap animate-fade-in">
          {isDark ? "LIGHT MODE" : "DARK MODE"}
        </div>
      )}
    </div>
  );
}
