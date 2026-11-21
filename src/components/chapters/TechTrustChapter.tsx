"use client";
import React from "react";
import { soundManager } from "@/utils/audio";

interface TechTrustChapterProps {
  onNavigate: (index: number) => void;
}

const TECH_DOMAINS = [
  {
    domain: "Cybersecurity Core",
    items: ["Penetration Testing", "OWASP Top 10", "Vulnerability Research", "SIEM Architecture", "Zero Trust"],
  },
  {
    domain: "Web & Custom Platforms",
    items: ["Next.js & React", "TypeScript", "Node.js", "High-Performance APIs", "Tailwind CSS"],
  },
  {
    domain: "Cloud & Infrastructure",
    items: ["AWS & Azure", "Cloudflare Security", "Linux Hardening", "Docker & Containers", "IAM Governance"],
  },
  {
    domain: "Automation & Operations",
    items: ["Business Workflows", "Automated Security Scans", "Threat Intelligence", "Proactive IT Support"],
  },
];

const CLIENT_SHOWCASE = [
  {
    name: "M&M Innovation",
    tagline: "Enterprise Technology & Engineering",
    scope: "Security Assessment & Web Architecture",
  },
  {
    name: "Ananta Industries",
    tagline: "Industrial & Manufacturing Solutions",
    scope: "Digital Infrastructure & Cyber Defense",
  },
  {
    name: "Aakash Electronics",
    tagline: "Consumer Electronics & Retail",
    scope: "E-Commerce Protection & Web Security",
  },
];

export default function TechTrustChapter({ onNavigate }: TechTrustChapterProps) {
  return (
    <div className="relative w-full h-full flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-20 pb-20 select-none z-10">
      <div className="w-full max-w-4xl">
        {/* Chapter Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-cyan tracking-[0.2em] mb-1.5 uppercase">
            <span className="w-1.5 h-1.5 bg-cyan" />
            <span>CHAPTER 04 // TECHNOLOGY & PROVEN TRUST</span>
          </div>
          <h2 className="text-[clamp(24px,3.2vw,44px)] font-bold tracking-tight text-ink mb-1">
            INTELLIGENT TECH. PROVEN TRUST.
          </h2>
          <p className="text-xs text-ink-dim max-w-xl">
            Empowering modern enterprises with battle-tested cybersecurity frameworks, advanced web technologies, and strategic digital transformation.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Left: Technology Capabilities */}
          <div className="p-4 border border-white/10 bg-black/50 backdrop-blur-md cyber-corner">
            <div className="font-mono text-[11px] text-cyan tracking-[0.18em] uppercase mb-3 flex items-center justify-between">
              <span>CORE TECHNOLOGY DOMAINS</span>
              <span className="text-[9px] text-ink-muted">ENTERPRISE STACK</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {TECH_DOMAINS.map((td, i) => (
                <div key={i} className="p-2 border border-white/5 bg-black/40">
                  <div className="text-[11px] font-bold text-cyan mb-1.5">
                    {td.domain}
                  </div>
                  <ul className="flex flex-col gap-1 text-[10px] text-ink-dim font-mono">
                    {td.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-1">
                        <span className="text-cyan/60">—</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Authentic Client Showcase */}
          <div className="p-4 border border-cyan/40 bg-black/50 backdrop-blur-md cyber-corner flex flex-col justify-between">
            <div>
              <div className="font-mono text-[11px] text-cyan tracking-[0.18em] uppercase mb-3 flex items-center justify-between">
                <span>VERIFIED CLIENT PARTNERS</span>
                <span className="text-[9px] text-ink-muted">AUTHENTIC ENGAGEMENTS</span>
              </div>

              <div className="flex flex-col gap-2">
                {CLIENT_SHOWCASE.map((client, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => soundManager.playHover()}
                    className="p-2.5 border border-white/10 hover:border-cyan/50 bg-black/40 transition-all group"
                  >
                    <div className="flex items-baseline justify-between mb-0.5">
                      <span className="font-bold text-xs md:text-sm text-ink group-hover:text-cyan transition-colors">
                        {client.name}
                      </span>
                      <span className="font-mono text-[9px] text-cyan">VERIFIED</span>
                    </div>
                    <div className="text-[11px] text-ink-dim">
                      {client.tagline}
                    </div>
                    <div className="font-mono text-[9px] text-ink-muted mt-0.5">
                      Scope: {client.scope}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-white/10 text-[10px] font-mono text-ink-muted flex items-center justify-between">
              <span>ZERO FABRICATED METRICS</span>
              <span>100% REAL ENGAGEMENTS</span>
            </div>
          </div>
        </div>

        {/* Next Chapter Link */}
        <button
          onClick={() => {
            soundManager.playClick();
            onNavigate(5);
          }}
          className="inline-flex items-center gap-2 font-mono text-[11px] text-cyan hover:text-white tracking-widest uppercase transition-colors"
        >
          <span>NEXT: INITIATE CONTACT // SECURE YOUR BUSINESS</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
