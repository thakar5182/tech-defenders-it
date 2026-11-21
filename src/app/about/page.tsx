"use client";
import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { BUILD_PROCESS, CLIENT_REFERENCES, COMPANY_CONTACT } from "@/data";
import { soundManager } from "@/utils/audio";

export default function AboutPage() {
  const values = [
    { num: "01", title: "Engineering Excellence", desc: "We adhere to clean architecture, modern standards, and scalable code that stands the test of time." },
    { num: "02", title: "Business Alignment", desc: "Every line of code and architectural decision is guided by measurable commercial outcomes for our clients." },
    { num: "03", title: "Proactive Security", desc: "Cyber defense is not an afterthought; we embed zero-trust and OWASP hardening directly into every product we build." },
    { num: "04", title: "Transparent Partnership", desc: "We build long-term relationships through open communication, reliable delivery timelines, and enduring support." },
  ];

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
                ABOUT TECH DEFENDERS IT
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-[clamp(32px,4.5vw,60px)] font-bold tracking-tight text-ink leading-[1.05] mb-4">
              WE TURN IDEAS INTO RELIABLE TECHNOLOGY.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-sm md:text-base text-ink-dim leading-relaxed">
              Tech Defenders is an IT and technology company focused on helping businesses build, grow,
              secure, and modernize their digital operations. We engineer practical solutions across
              custom software, web and mobile platforms, automation, and cybersecurity.
            </p>
          </Reveal>
        </div>

        {/* Narrative & Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Reveal>
            <div className="p-6 md:p-8 border border-white/10 bg-black/60 backdrop-blur-xl cyber-corner h-full">
              <div className="font-mono text-xs text-cyan tracking-[0.18em] uppercase mb-4">
                // COMPANY PROFILE & CAPABILITIES
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-ink mb-4">
                Full-Spectrum Technology Engineering
              </h3>
              <p className="text-xs md:text-sm text-ink-dim leading-relaxed mb-4">
                Tech Defenders IT is dedicated to helping businesses establish, scale, and secure their digital presence.
                We specialize in creating high-performance websites, custom web applications, mobile platforms,
                e-commerce solutions, UI/UX design, business automation, and comprehensive cybersecurity services tailored to each client&apos;s unique goals.
              </p>
              <p className="text-xs md:text-sm text-ink-dim leading-relaxed">
                We combine creative product thinking, cutting-edge technologies (Next.js, React, Node.js, Python, AWS),
                and industry best practices to build products that are visually impressive, fast, responsive, and reliable.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal delay={0.1}>
              <div className="p-6 border border-cyan/40 bg-black/60 backdrop-blur-xl cyber-corner">
                <div className="font-mono text-[10px] text-cyan tracking-widest uppercase mb-2">
                  OUR MISSION
                </div>
                <h4 className="text-lg font-bold text-ink mb-2">
                  Useful, Accessible & Reliable Technology
                </h4>
                <p className="text-xs text-ink-dim leading-relaxed">
                  To provide secure, scalable, and high-quality technology solutions that empower startups, growing enterprises,
                  and established organizations to succeed in today&apos;s digital era while building lasting relationships through trust and innovation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="p-6 border border-white/10 bg-black/60 backdrop-blur-xl cyber-corner">
                <div className="font-mono text-[10px] text-cyan tracking-widest uppercase mb-2">
                  OUR VISION
                </div>
                <h4 className="text-lg font-bold text-ink mb-2">
                  Building International Digital Standards
                </h4>
                <p className="text-xs text-ink-dim leading-relaxed">
                  To be an internationally recognized technology partner, delivering transformative digital solutions,
                  intuitive software architectures, and defense-grade cybersecurity that drive commercial confidence.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <Reveal>
            <div className="font-mono text-xs text-cyan tracking-[0.2em] uppercase mb-2">
              FOUNDATIONAL PILLARS
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-6">
              Our Guiding Principles
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <Reveal key={v.num} delay={i * 0.1}>
                <div
                  onMouseEnter={() => soundManager.playHover()}
                  className="p-5 border border-white/10 hover:border-cyan/50 bg-black/50 backdrop-blur-md transition-all group cyber-corner h-full"
                >
                  <span className="font-mono text-cyan text-xl font-bold block mb-2">
                    [{v.num}]
                  </span>
                  <h4 className="text-sm font-bold text-ink mb-2 group-hover:text-cyan transition-colors">
                    {v.title}
                  </h4>
                  <p className="text-xs text-ink-dim leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 7-Step Engineering Methodology */}
        <div className="mb-16">
          <Reveal>
            <div className="font-mono text-xs text-cyan tracking-[0.2em] uppercase mb-2">
              SYSTEMATIC EXECUTION
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-6">
              The 7-Step Build Lifecycle
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {BUILD_PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.06}>
                <div className="p-4 border border-white/10 bg-black/60 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-cyan">
                      PHASE {p.step}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-ink mb-1">{p.title}</h4>
                  <div className="text-[10px] font-mono text-cyan/70 uppercase mb-2">
                    {p.subtitle}
                  </div>
                  <p className="text-xs text-ink-dim leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Verified Client Engagements */}
        <div className="mb-16">
          <Reveal>
            <div className="font-mono text-xs text-cyan tracking-[0.2em] uppercase mb-2">
              VERIFIED ENGAGEMENTS
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-6">
              Trusted by Industry Partners
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CLIENT_REFERENCES.map((c, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-5 border border-white/10 hover:border-cyan/50 bg-black/60 backdrop-blur-xl cyber-corner transition-all">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-base font-bold text-ink">{c.name}</h3>
                    <span className="font-mono text-[9px] text-cyan">VERIFIED</span>
                  </div>
                  <p className="text-xs text-ink-dim mb-2">{c.tagline}</p>
                  <div className="font-mono text-[10px] text-ink-muted">
                    Scope: {c.scope}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom CTA Block */}
        <Reveal>
          <div className="p-8 md:p-12 border border-cyan/40 bg-black/70 backdrop-blur-xl cyber-corner text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-3">
              Ready to collaborate on your next digital platform?
            </h2>
            <p className="text-xs md:text-sm text-ink-dim max-w-xl mx-auto mb-6">
              Contact our engineering team to discover how Tech Defenders IT can elevate your enterprise technology.
            </p>
            <Link
              href="/contact"
              onClick={() => soundManager.playClick()}
              className="px-6 py-2.5 bg-cyan hover:bg-cyan/90 text-[#030508] font-mono text-xs font-bold tracking-wider transition-all inline-block"
            >
              [ GET IN TOUCH WITH US ]
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
