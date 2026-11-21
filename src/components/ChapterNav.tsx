"use client";
import React from "react";
import { soundManager } from "@/utils/audio";

interface ChapterNavProps {
  currentChapter: number;
  totalChapters: number;
  onNavigateChapter: (index: number) => void;
  chapterTitles: string[];
}

export default function ChapterNav({
  currentChapter,
  totalChapters,
  onNavigateChapter,
  chapterTitles,
}: ChapterNavProps) {
  const handleStep = (direction: "prev" | "next") => {
    soundManager.playClick();
    if (direction === "prev" && currentChapter > 0) {
      onNavigateChapter(currentChapter - 1);
    } else if (direction === "next" && currentChapter < totalChapters - 1) {
      onNavigateChapter(currentChapter + 1);
    }
  };

  return (
    <>
      {/* Right Side Minimal Chapter Indicator (Desktop only) */}
      <div className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-4 pointer-events-auto select-none">
        {chapterTitles.map((title, idx) => {
          const isActive = currentChapter === idx;
          return (
            <button
              key={idx}
              onClick={() => {
                soundManager.playClick();
                onNavigateChapter(idx);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="group flex items-center gap-2.5 py-1 cursor-pointer focus:outline-none"
              aria-label={`Jump to chapter ${idx} - ${title}`}
            >
              {/* Tooltip on hover */}
              <span
                className={`font-mono text-[10px] tracking-[0.16em] uppercase transition-all duration-200 pointer-events-none ${
                  isActive
                    ? "text-cyan opacity-100 translate-x-0"
                    : "text-ink-muted opacity-0 group-hover:opacity-100 group-hover:-translate-x-1"
                }`}
              >
                {title}
              </span>

              {/* Number and dash indicator */}
              <span
                className={`font-mono text-[10px] tabular-nums transition-colors ${
                  isActive ? "text-cyan font-bold" : "text-ink-muted/60 group-hover:text-ink-dim"
                }`}
              >
                {String(idx).padStart(2, "0")}
              </span>

              <div
                className={`transition-all duration-300 rounded-sm ${
                  isActive
                    ? "w-4 h-1 bg-cyan shadow-[0_0_8px_#35e6c4]"
                    : "w-1.5 h-1 bg-white/20 group-hover:bg-cyan/60 group-hover:w-2.5"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Bottom Floating Navigation Pill */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3 py-1.5 border border-line bg-bg-elev/90 backdrop-blur-xl rounded-full shadow-lg pointer-events-auto select-none transition-colors duration-300">
        {/* Prev Chapter */}
        <button
          onClick={() => handleStep("prev")}
          disabled={currentChapter === 0}
          className={`px-2.5 py-1 text-[11px] font-mono tracking-wider flex items-center gap-1 transition-colors ${
            currentChapter === 0
              ? "text-white/20 cursor-not-allowed"
              : "text-ink-dim hover:text-cyan"
          }`}
        >
          <span>↑</span>
          <span className="hidden sm:inline">PREV</span>
        </button>

        {/* Chapter Progress Readout */}
        <div className="flex items-center gap-1.5 px-2.5 border-x border-white/10">
          <span className="font-mono text-xs font-bold text-cyan tabular-nums">
            {String(currentChapter + 1).padStart(2, "0")}
          </span>
          <span className="text-white/30 text-[10px]">/</span>
          <span className="font-mono text-[11px] text-ink-muted tabular-nums">
            {String(totalChapters).padStart(2, "0")}
          </span>
        </div>

        {/* Next Chapter */}
        <button
          onClick={() => handleStep("next")}
          disabled={currentChapter === totalChapters - 1}
          className={`px-2.5 py-1 text-[11px] font-mono tracking-wider flex items-center gap-1 transition-colors ${
            currentChapter === totalChapters - 1
              ? "text-white/20 cursor-not-allowed"
              : "text-ink-dim hover:text-cyan"
          }`}
        >
          <span className="hidden sm:inline">NEXT</span>
          <span>↓</span>
        </button>
      </div>
    </>
  );
}
