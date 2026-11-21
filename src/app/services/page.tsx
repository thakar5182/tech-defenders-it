"use client";
import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { IT_SERVICES, COMPANY_CONTACT } from "@/data";
import { soundManager } from "@/utils/audio";

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen relative select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-hero-grid bg-[48px_48px] opacity-15 mask-hero" />
        <div className="absolute inset-0 bg-scanlines opacity-10" />
      </div>

      <div className="container w-[min(1240px,92%)] mx-auto relative z-10">
        {/* Intro Header */}
        <div className="max-w-3xl mb-14">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyan/30 bg-black/60 backdrop-blur-md mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-cyan uppercase">
                COMPLETE IT & TECHNOLOGY CAPABILITIES
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-[clamp(32px,4.5vw,60px)] font-bold tracking-tight text-ink leading-[1.05] mb-4">
              ENGINEERING DIGITAL EXCELLENCE.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-sm md:text-base text-ink-dim leading-relaxed">
              From enterprise software engineering and bespoke web platforms to intelligent automation,
              scalable cloud architecture, and multi-layered cybersecurity — we provide the end-to-end
              technology solutions that empower businesses to scale.
            </p>
          </Reveal>
        </div>

        {/* 8-Domain Services Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {IT_SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={(i % 4) * 0.08}>
              <div
                onMouseEnter={() => soundManager.playHover()}
                className="p-5 border border-white/10 hover:border-cyan/50 bg-black/60 backdrop-blur-xl transition-all duration-300 h-full flex flex-col justify-between group cyber-corner"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                    <span className="font-mono text-xs font-bold text-cyan">
                      [{service.code}]
                    </span>
                    <span className="font-mono text-[10px] tracking-widest text-ink-muted uppercase">
                      {service.category}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] tracking-wider text-cyan uppercase block mb-1">
                    {service.tagline}
                  </span>

                  <h3 className="text-base font-bold text-ink mb-2 group-hover:text-cyan transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-ink-dim leading-relaxed mb-4">
                    {service.desc}
                  </p>

                  <div className="border-t border-white/5 pt-3 mb-4">
                    <div className="font-mono text-[9px] tracking-wider text-ink-muted uppercase mb-2">
                      CAPABILITIES
                    </div>
                    <ul className="flex flex-col gap-1 text-[11px] text-ink-dim font-mono">
                      {service.capabilities.map((cap, j) => (
                        <li key={j} className="flex items-start gap-1.5">
                          <span className="text-cyan/70 shrink-0">—</span>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 mt-auto">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    onClick={() => soundManager.playClick()}
                    className="w-full inline-flex items-center justify-center py-2 px-3 border border-white/15 hover:border-cyan bg-white/[0.02] hover:bg-cyan/15 text-ink hover:text-cyan font-mono text-xs tracking-wider transition-all"
                  >
                    [ INITIATE SERVICE ]
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA Block */}
        <Reveal>
          <div className="p-8 md:p-12 border border-cyan/40 bg-black/70 backdrop-blur-xl cyber-corner text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="font-mono text-xs text-cyan tracking-[0.2em] uppercase block mb-2">
                HAVE A CUSTOM REQUIREMENT?
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-ink mb-3">
                LET&apos;S BUILD YOUR TECHNOLOGY SOLUTION.
              </h2>
              <p className="text-xs md:text-sm text-ink-dim leading-relaxed mb-6">
                Whether you need a dedicated enterprise engineering team, custom web platform,
                cloud migration, or cybersecurity assessment, we are ready to partner with you.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/contact"
                  onClick={() => soundManager.playClick()}
                  className="px-6 py-2.5 bg-cyan hover:bg-cyan/90 text-[#030508] font-mono text-xs font-bold tracking-wider transition-all"
                >
                  [ START A PROJECT ]
                </Link>
                <a
                  href={COMPANY_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 border border-emerald-500/50 hover:border-emerald-400 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-semibold tracking-wider transition-colors flex items-center gap-2"
                >
                  <span>WHATSAPP DISPATCH</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
