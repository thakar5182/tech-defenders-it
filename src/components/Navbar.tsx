"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { soundManager } from "@/utils/audio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [audioMuted, setAudioMuted] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setAudioMuted(soundManager.getMuted());
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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

  const closeMenu = () => {
    setMenuOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  };

  const toggleSound = () => {
    const nextMuted = soundManager.toggleMute();
    setAudioMuted(nextMuted);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/team", label: "Team" },
    { href: "/blog", label: "Insights" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header
        style={{ zIndex: 9999 }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 px-3 sm:px-6 md:px-10 flex items-center justify-between border-b transition-all duration-300 pointer-events-auto",
          scrolled
            ? "border-line bg-bg/95 backdrop-blur-xl shadow-lg"
            : "border-line bg-bg/85 backdrop-blur-md"
        )}
      >
        {/* Left: Brand Identity */}
        <Link
          href="/"
          onClick={() => soundManager.playClick()}
          className="flex items-center gap-2 sm:gap-3.5 group cursor-pointer"
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
              IT &amp; TECH ENTERPRISE
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => soundManager.playClick()}
                onMouseEnter={() => soundManager.playHover()}
                className={clsx(
                  "font-mono text-xs tracking-wider uppercase transition-colors relative py-1",
                  isActive ? "text-cyan font-bold" : "text-ink-dim hover:text-ink"
                )}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan shadow-[0_0_6px_#35e6c4]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Audio Toggle & Quick CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle Audio"
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 border border-white/10 hover:border-cyan/50 bg-white/[0.02] text-ink-dim hover:text-cyan text-xs font-mono transition-colors rounded-sm min-h-[36px]"
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

          {/* Quick Consultation CTA */}
          <Link
            href="/contact"
            onClick={() => soundManager.playClick()}
            className="hidden sm:inline-flex items-center px-3.5 md:px-4 py-1.5 border border-cyan/50 hover:border-cyan bg-cyan/10 hover:bg-cyan/20 text-cyan text-xs font-mono tracking-wider transition-all rounded-sm min-h-[36px]"
          >
            [ BUILD A PROJECT ]
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center gap-1 w-9 h-9 p-1.5 border border-white/10 hover:border-cyan rounded-sm"
            onClick={() => {
              soundManager.playClick();
              setMenuOpen(!menuOpen);
            }}
            aria-label="Toggle Menu"
          >
            <span
              className={clsx(
                "h-[1.5px] bg-ink w-5 transition-transform duration-300",
                menuOpen && "rotate-45 translate-y-[5.5px]"
              )}
            />
            <span
              className={clsx(
                "h-[1.5px] bg-ink w-5 transition-opacity duration-300",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={clsx(
                "h-[1.5px] bg-ink w-5 transition-transform duration-300",
                menuOpen && "-rotate-45 -translate-y-[5.5px]"
              )}
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-[490] bg-bg/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 pt-24 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-2">
          <div className="font-mono text-[10px] text-cyan tracking-[0.2em] uppercase mb-2">
            // NAVIGATION DIRECTORY
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-ink hover:text-cyan border-b border-line py-3 transition-colors flex items-center justify-between min-h-[44px]"
            >
              <span>{link.label}</span>
              <span className="text-cyan text-sm">→</span>
            </Link>
          ))}
        </div>

        <div className="font-mono text-xs text-ink-dim border-t border-line pt-4">
          <div className="text-cyan font-bold mb-1">TECH DEFENDERS IT</div>
          <div className="py-0.5">Phone: +91 7600426578</div>
          <div className="py-0.5">Email: techdefenderss@gmail.com</div>
        </div>
      </div>
    </>
  );
}
