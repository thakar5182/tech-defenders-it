"use client";
import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { INSIGHTS } from "@/data";
import { soundManager } from "@/utils/audio";

export default function BlogPage() {
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
                TECH DEFENDERS RESEARCH & INSIGHTS
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-[clamp(32px,4.5vw,60px)] font-bold tracking-tight text-ink leading-[1.05] mb-4">
              PERSPECTIVES ON MODERN TECHNOLOGY.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-sm md:text-base text-ink-dim leading-relaxed">
              Explore deep dives into modern enterprise software architecture, intelligent business automation,
              scalable web engineering, and defense-grade cloud security from our engineering leads.
            </p>
          </Reveal>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {INSIGHTS.map((insight, i) => (
            <Reveal key={insight.slug} delay={i * 0.1}>
              <Link
                href={`/blog/${insight.slug}`}
                onClick={() => soundManager.playClick()}
                onMouseEnter={() => soundManager.playHover()}
                className="p-6 border border-white/10 hover:border-cyan/50 bg-black/60 backdrop-blur-xl cyber-corner h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <span className="font-mono text-[10px] text-cyan tracking-wider uppercase font-semibold">
                      // {insight.tag}
                    </span>
                    <span className="font-mono text-[10px] text-ink-muted">
                      {insight.read}
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-ink leading-snug mb-3 group-hover:text-cyan transition-colors">
                    {insight.title}
                  </h3>

                  <p className="text-xs text-ink-dim leading-relaxed mb-6">
                    {insight.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-ink-muted">
                  <span>{insight.author}</span>
                  <span>{insight.date}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA Block */}
        <Reveal>
          <div className="p-8 md:p-12 border border-white/10 bg-black/70 backdrop-blur-xl cyber-corner text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-3">
              Looking for tailored technical guidance?
            </h2>
            <p className="text-xs md:text-sm text-ink-dim max-w-xl mx-auto mb-6">
              Our engineering architects are available for technology evaluations, architecture design, and project planning.
            </p>
            <Link
              href="/contact"
              onClick={() => soundManager.playClick()}
              className="px-6 py-2.5 bg-cyan hover:bg-cyan/90 text-[#030508] font-mono text-xs font-bold tracking-wider transition-all inline-block"
            >
              [ SCHEDULE A CONSULTATION ]
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
