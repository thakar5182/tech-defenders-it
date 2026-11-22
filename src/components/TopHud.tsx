"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/utils/audio";
import ThemeToggle from "./ThemeToggle";

interface TopHudProps {
  currentChapter: number;
  onNavigateChapter: (index: number) => void;
  chapterTitles: string[];
}

export default function TopHud({
  currentChapter,
  onNavigateChapter,
  chapterTitles,
}: TopHudProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [audioMuted, setAudioMuted] = useState(true);

  useEffect(() => {
    setAudioMuted(soundManager.getMuted());

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // Lock body scroll when fullscreen index menu is open on mobile
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (menuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [menuOpen]);

  const toggleSound = () => {
    const nextMuted = soundManager.toggleMute();
    setAudioMuted(nextMuted);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  };

  const handleChapterClick = (idx: number) => {
    soundManager.playClick();
    onNavigateChapter(idx);
    closeMenu();
  };

  const directPortals = [
    {
      title: "About Tech Defenders IT",
      sub: "Enterprise Heritage, Global Mission & Technological Leadership",
      href: "/about",
      tag: "CORE MISSION",
    },
    {
      title: "All Services Directory",
      sub: "Custom Software, AI Automation, SOC Monitoring & Cloud",
      href: "/services",
      tag: "SOLUTIONS",
    },
    {
      title: "Leadership & Team",
      sub: "Senior Engineers, Architects & Cybersecurity Specialists",
      href: "/team",
      tag: "TALENT",
    },
    {
      title: "Cybersecurity & Tech Insights",
      sub: "Threat Intelligence, Research Whitepapers & Industry Updates",
      href: "/blog",
      tag: "INTELLIGENCE",
    },
    {
      title: "Dedicated Contact Desk",
      sub: "Direct Client Inquiries, Security Audits & Project Quotes",
      href: "/contact",
      tag: "GET IN TOUCH",
    },
  ];

  return (
    <>
      {/* Top HUD Fixed Bar with responsive padding & glass backdrop */}
      <header
        style={{ zIndex: 9999 }}
        className="fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 px-3 sm:px-6 md:px-10 flex items-center justify-between border-b border-line bg-bg/85 dark:bg-[#030610]/85 light:bg-white/85 backdrop-blur-xl pointer-events-auto transition-colors duration-300"
      >
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleChapterClick(0);
            }}
            className="flex items-center gap-2 sm:gap-3.5 text-left group cursor-pointer"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Tech Defenders"
                width={64}
                height={64}
                unoptimized
                priority
                className="w-full h-full object-contain filter drop-shadow-[0_0_16px_rgba(0,120,255,0.7)] group-hover:scale-105 group-hover:drop-shadow-[0_0_24px_rgba(0,180,255,0.95)] transition-all duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs sm:text-base md:text-lg font-black tracking-[0.12em] sm:tracking-[0.15em] text-ink group-hover:text-cyan transition-colors leading-tight">
                TECH DEFENDERS
              </span>
              <span className="font-mono text-[8px] sm:text-[10px] md:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] text-cyan flex items-center gap-1 font-semibold mt-0.5">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_#35e6c4]" />
                DEFENSE ONLINE
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Minimal Current Chapter Telemetry (Tablet & Desktop) */}
        <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-ink-muted tracking-[0.2em] uppercase">
          <span className="text-cyan font-bold">
            [{String(currentChapter).padStart(2, "0")}]
          </span>
          <span className="text-ink-dim">// {chapterTitles[currentChapter]}</span>
        </div>

        {/* Right: Theme Toggle, Audio Toggle, Quick CTA, Index Button */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3">
          {/* Light / Dark Mode Toggle */}
          <ThemeToggle />

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle Audio"
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 border border-white/10 light:border-slate-300 hover:border-cyan/50 bg-white/[0.02] light:bg-slate-100 text-ink-dim hover:text-cyan text-xs font-mono transition-colors rounded-sm min-h-[36px]"
          >
            <div className="flex items-end gap-0.5 h-3">
              <span
                className={`w-0.5 bg-cyan transition-all duration-300 ${
                  audioMuted ? "h-1" : "h-3 animate-pulse"
                }`}
              />
              <span
                className={`w-0.5 bg-cyan transition-all duration-300 ${
                  audioMuted ? "h-1" : "h-2 animate-pulse"
                }`}
              />
              <span
                className={`w-0.5 bg-cyan transition-all duration-300 ${
                  audioMuted ? "h-1" : "h-3.5 animate-pulse"
                }`}
              />
            </div>
            <span className="hidden sm:inline tracking-wider text-[11px]">
              {audioMuted ? "AUDIO: OFF" : "AUDIO: ON"}
            </span>
          </button>

          {/* Quick Action CTA (Tablet / Desktop) */}
          <button
            onClick={() => handleChapterClick(7)}
            className="hidden sm:inline-flex items-center px-3.5 md:px-4 py-1.5 border border-cyan/50 hover:border-cyan bg-cyan/10 hover:bg-cyan/20 text-cyan text-xs font-mono tracking-wider transition-all rounded-sm min-h-[36px]"
          >
            [ BUILD A PROJECT ]
          </button>

          {/* Fullscreen Overlay Menu Trigger */}
          <button
            onClick={() => {
              soundManager.playClick();
              setMenuOpen(!menuOpen);
            }}
            aria-label="Toggle Navigation Index"
            className="px-2.5 sm:px-3.5 py-1.5 border border-white/10 light:border-slate-300 hover:border-cyan/50 bg-white/[0.02] light:bg-slate-100 text-ink hover:text-cyan text-xs font-mono tracking-wider flex items-center gap-1.5 sm:gap-2 transition-colors rounded-sm min-h-[36px]"
          >
            <div className="flex flex-col gap-1 w-3.5">
              <span
                className={`h-0.5 bg-current transition-transform duration-300 ${
                  menuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`h-0.5 bg-current transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 bg-current transition-transform duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
            <span className="font-semibold text-[11px] sm:text-xs">INDEX</span>
          </button>
        </div>
      </header>

      {/* Fullscreen Navigation Index Overlay (Luxury Frosted Glass UI with Heavy Blur) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            style={{ zIndex: 10000 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#030610]/75 dark:bg-[#030610]/75 light:bg-[#030610]/85 backdrop-blur-2xl text-white flex flex-col justify-between p-4 sm:p-6 md:p-10 overflow-y-auto transition-colors duration-300"
          >
            {/* Ambient Volumetric Blue Radial Glow shining through frosted glass */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_65%_48%,rgba(0,140,255,0.2)_0%,rgba(0,212,255,0.08)_35%,transparent_68%)]" />

            {/* Overlay Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 sm:pb-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Tech Defenders Logo"
                    width={64}
                    height={64}
                    unoptimized
                    className="w-full h-full object-contain filter drop-shadow-[0_0_18px_rgba(0,140,255,0.85)]"
                  />
                </div>
                <div>
                  <div className="font-mono text-xs sm:text-sm md:text-base font-bold text-white tracking-[0.12em] sm:tracking-[0.15em]">
                    TECH DEFENDERS
                  </div>
                  <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.22em] text-cyan font-semibold flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_#35e6c4]" />
                    SYSTEM NAVIGATION MATRIX
                  </div>
                </div>
              </div>

              {/* Close Button (min 44x44px tap target on mobile) */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  setMenuOpen(false);
                }}
                className="min-h-[44px] min-w-[44px] px-3.5 sm:px-4 py-2 border border-white/20 hover:border-cyan bg-white/[0.04] hover:bg-cyan/15 text-white hover:text-cyan font-mono text-xs tracking-wider transition-all duration-200 rounded-sm flex items-center justify-center"
              >
                [ CLOSE ESC × ]
              </button>
            </div>

            {/* Overlay Body Grid (Glass Card Matrix Model matching screenshot) */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 sm:gap-8 lg:gap-12 py-4 sm:py-6 my-auto max-w-7xl w-full mx-auto">
              {/* Left Column: Cinematic Chapters */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 font-mono text-xs sm:text-sm tracking-[0.22em] sm:tracking-[0.25em] text-cyan font-bold mb-3 sm:mb-4 uppercase">
                  <span className="w-2 h-2 bg-cyan rounded-full shadow-[0_0_8px_#35e6c4]" />
                  [ 01 // CINEMATIC CHAPTERS ]
                </div>

                <div className="flex flex-col gap-2 sm:gap-2.5">
                  {chapterTitles.map((title, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChapterClick(idx)}
                      onMouseEnter={() => soundManager.playHover()}
                      className={`group w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded border text-left transition-all duration-200 min-h-[44px] ${
                        currentChapter === idx
                          ? "bg-cyan/15 border-cyan text-cyan shadow-[0_0_16px_rgba(0,212,255,0.25)] translate-x-1 sm:translate-x-2"
                          : "bg-[#0b1329]/60 hover:bg-cyan/[0.1] border-white/10 hover:border-cyan/50 text-white hover:translate-x-1 sm:hover:translate-x-2 backdrop-blur-sm"
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className="font-mono text-xs font-bold text-cyan bg-[#0a1428] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded border border-cyan/30 group-hover:bg-cyan group-hover:text-black transition-colors">
                          [{String(idx).padStart(2, "0")}]
                        </span>
                        <span className="text-sm sm:text-base md:text-lg font-bold tracking-wide group-hover:text-cyan transition-colors">
                          {title}
                        </span>
                      </div>

                      {currentChapter === idx && (
                        <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#030508] bg-cyan font-bold px-2 sm:px-2.5 py-0.5 rounded shadow-[0_0_8px_#35e6c4] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#030508] animate-ping" />
                          ACTIVE
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Direct Company Portals & Emergency Desk */}
              <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-cyan/20 pt-6 lg:pt-0 lg:pl-8 sm:lg:pl-10">
                {/* Direct Portals Cards */}
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs sm:text-sm tracking-[0.22em] sm:tracking-[0.25em] text-cyan font-bold mb-3 sm:mb-4 uppercase">
                    <span className="w-2 h-2 bg-cyan rounded-full shadow-[0_0_8px_#35e6c4]" />
                    [ 02 // DIRECT COMPANY PORTALS ]
                  </div>

                  <div className="flex flex-col gap-2.5 sm:gap-3">
                    {directPortals.map((portal) => (
                      <Link
                        key={portal.href}
                        href={portal.href}
                        onClick={closeMenu}
                        onMouseEnter={() => soundManager.playHover()}
                        className="group block p-3 sm:p-3.5 bg-[#0b1329]/70 hover:bg-cyan/[0.12] border border-cyan/30 hover:border-cyan rounded transition-all duration-200 shadow-md backdrop-blur-md min-h-[44px]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-bold text-xs sm:text-sm md:text-base group-hover:text-cyan transition-colors flex items-center gap-2">
                            <span className="text-cyan font-mono text-xs">&gt;</span>
                            {portal.title}
                          </span>
                          <span className="text-cyan text-sm font-bold group-hover:translate-x-1.5 transition-transform duration-200">
                            →
                          </span>
                        </div>
                        <div className="text-slate-300 text-[11px] sm:text-xs mt-1 font-sans pl-4 leading-relaxed">
                          {portal.sub}
                        </div>
                        <div className="pl-4 mt-2">
                          <span className="text-[9px] sm:text-[10px] font-mono text-cyan bg-cyan/15 px-2 py-0.5 rounded border border-cyan/30 inline-block font-semibold">
                            {portal.tag}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Direct Rapid Emergency Hotline */}
                <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-gradient-to-br from-[#0c1a3a]/80 to-[#061024]/80 border border-cyan/40 rounded shadow-[0_0_20px_rgba(0,212,255,0.15)] backdrop-blur-md">
                  <div className="flex items-center gap-2 text-cyan font-mono text-xs font-bold tracking-wider mb-2">
                    <span className="text-base">⚡</span>
                    <span>DIRECT RAPID RESPONSE HOTLINE</span>
                  </div>

                  <div className="space-y-1 font-mono">
                    <a
                      href="tel:+917600426578"
                      className="text-base sm:text-lg font-extrabold text-white hover:text-cyan block tracking-wider transition-colors min-h-[36px] flex items-center"
                    >
                      📞 +91 7600426578
                    </a>
                    <a
                      href="mailto:techdefenderss@gmail.com"
                      className="text-xs sm:text-sm font-semibold text-cyan/90 hover:text-white block transition-colors min-h-[36px] flex items-center"
                    >
                      ✉️ techdefenderss@gmail.com
                    </a>
                  </div>

                  <div className="mt-2.5 pt-2.5 border-t border-cyan/20 text-slate-300 text-[11px] font-mono flex items-center justify-between">
                    <span>Ahmedabad, Gujarat, India</span>
                    <span className="text-cyan font-semibold">// 24/7 ACTIVE DESK</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlay Footer */}
            <div className="relative z-10 border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs font-mono text-slate-400 gap-2">
              <div>TECH DEFENDERS IT // IMMERSIVE 3D EXPERIENCE</div>
              <div className="text-cyan font-semibold">PRESS [ESC] TO CLOSE</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
