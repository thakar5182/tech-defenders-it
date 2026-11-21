"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { soundManager } from "@/utils/audio";
import { COMPANY_CONTACT } from "@/data";

export default function Footer() {
  return (
    <footer className="border-t border-line pt-16 bg-bg relative overflow-hidden text-ink select-none transition-colors duration-400">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-hero-grid bg-[48px_48px] opacity-15 mask-hero pointer-events-none" />

      {/* Marquee Banner */}
      <div className="overflow-hidden mb-12 border-y border-line py-3 bg-panel/50">
        <div className="flex gap-8 w-max animate-marquee">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-8 items-center font-mono text-xs tracking-[0.25em] text-ink-muted uppercase">
              <span>SOFTWARE DEVELOPMENT</span>
              <span className="text-cyan">•</span>
              <span>WEB ARCHITECTURE</span>
              <span className="text-cyan">•</span>
              <span>MOBILE APPLICATIONS</span>
              <span className="text-cyan">•</span>
              <span>AI AUTOMATION</span>
              <span className="text-cyan">•</span>
              <span>CLOUD INFRASTRUCTURE</span>
              <span className="text-cyan">•</span>
              <span>CYBERSECURITY</span>
              <span className="text-cyan">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="container w-[min(1200px,92%)] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-10 pb-12 relative z-10">
        {/* Col 1: Brand Narrative */}
        <div>
          <Link
            href="/"
            onClick={() => soundManager.playClick()}
            className="flex items-center gap-3.5 w-max mb-4 group"
          >
            <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Tech Defenders"
                width={64}
                height={64}
                unoptimized
                className="w-full h-full object-contain filter drop-shadow-[0_0_16px_rgba(0,102,255,0.7)] group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-lg md:text-xl font-extrabold tracking-[0.14em] text-ink uppercase group-hover:text-cyan transition-colors leading-tight">
                TECH DEFENDERS
              </span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-cyan uppercase font-semibold">
                IT & ENTERPRISE TECHNOLOGY
              </span>
            </div>
          </Link>
          <p className="text-ink-dim text-xs leading-relaxed max-w-sm mb-4">
            A modern IT and technology company engineering high-performance software, custom web applications, mobile platforms, intelligent automation, and defense-grade infrastructure.
          </p>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-cyan/30 bg-cyan/5 text-cyan font-mono text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            ENTERPRISE TECHNOLOGY SOLUTIONS
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h5 className="font-mono text-xs tracking-[0.18em] text-cyan uppercase mb-4">
            Navigation
          </h5>
          <div className="flex flex-col gap-2 font-mono text-xs text-ink-dim">
            <Link href="/" className="hover:text-cyan transition-colors w-max">
              Home Experience →
            </Link>
            <Link href="/services" className="hover:text-cyan transition-colors w-max">
              IT Services Suite →
            </Link>
            <Link href="/about" className="hover:text-cyan transition-colors w-max">
              Company & Vision →
            </Link>
            <Link href="/team" className="hover:text-cyan transition-colors w-max">
              Leadership Team →
            </Link>
            <Link href="/blog" className="hover:text-cyan transition-colors w-max">
              Tech Insights →
            </Link>
            <Link href="/contact" className="hover:text-cyan transition-colors w-max">
              Contact Desk →
            </Link>
          </div>
        </div>

        {/* Col 3: Core Technology Domains */}
        <div>
          <h5 className="font-mono text-xs tracking-[0.18em] text-cyan uppercase mb-4">
            Core Domains
          </h5>
          <div className="flex flex-col gap-2 font-mono text-xs text-ink-dim">
            <Link href="/services" className="hover:text-cyan transition-colors w-max">
              Custom Software Dev
            </Link>
            <Link href="/services" className="hover:text-cyan transition-colors w-max">
              Web & E-Commerce
            </Link>
            <Link href="/services" className="hover:text-cyan transition-colors w-max">
              Mobile App Platforms
            </Link>
            <Link href="/services" className="hover:text-cyan transition-colors w-max">
              AI & Automation
            </Link>
            <Link href="/services" className="hover:text-cyan transition-colors w-max">
              Cloud & DevOps
            </Link>
            <Link href="/services" className="hover:text-cyan transition-colors w-max">
              Cybersecurity Layer
            </Link>
          </div>
        </div>

        {/* Col 4: Direct Dispatch & Contact */}
        <div>
          <h5 className="font-mono text-xs tracking-[0.18em] text-cyan uppercase mb-4">
            Direct Dispatch
          </h5>
          <div className="flex flex-col gap-2 text-xs font-mono text-ink-dim mb-4">
            <div>
              <span className="text-ink-muted block text-[10px]">PHONE</span>
              <a href={`tel:${COMPANY_CONTACT.phone}`} className="text-ink hover:text-cyan">
                {COMPANY_CONTACT.phone}
              </a>
            </div>
            <div>
              <span className="text-ink-muted block text-[10px]">EMAIL</span>
              <a href={`mailto:${COMPANY_CONTACT.email}`} className="text-ink hover:text-cyan">
                {COMPANY_CONTACT.email}
              </a>
            </div>
            <div>
              <span className="text-ink-muted block text-[10px]">LOCATION</span>
              <span className="text-ink text-[11px] leading-snug block">
                {COMPANY_CONTACT.address}
              </span>
            </div>
          </div>

          <a
            href={COMPANY_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-mono text-xs tracking-wider transition-colors hover:bg-emerald-500/20 rounded-sm min-h-[44px]"
          >
            <span>WHATSAPP DISPATCH</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* Copyright Ticker */}
      <div className="container w-[min(1200px,92%)] mx-auto flex justify-between flex-wrap gap-4 py-5 border-t border-white/10 text-[11px] font-mono text-ink-muted relative z-10">
        <span>© 2026 TECH DEFENDERS IT. ALL RIGHTS RESERVED.</span>
        <span>ENTERPRISE IT • SOFTWARE • CYBER DEFENSE</span>
      </div>
    </footer>
  );
}
