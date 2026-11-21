"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { soundManager } from "@/utils/audio";

export default function TeamPage() {
  const team = [
    {
      name: "Jigar Thakar",
      role: "Founder & Chief Executive Officer",
      tag: "LEADERSHIP & ARCHITECTURE",
      desc: "Visionary technology leader with extensive expertise in enterprise software systems, cybersecurity defense, high-performance web development, and digital transformation. Overseeing product strategy, client engineering engagements, and international technology partnerships.",
      image: "/jigar-thakar.jpg",
    },
  ];

  const engineeringCulture = [
    {
      code: "01",
      title: "First-Principles Engineering",
      desc: "We analyze technical challenges from their foundational roots, avoiding cookie-cutter templates to build purpose-built software architectures.",
    },
    {
      code: "02",
      title: "Proactive Security Rigor",
      desc: "Every engineer at Tech Defenders is trained in OWASP security principles, ensuring zero-trust defenses are coded into every interface and API.",
    },
    {
      code: "03",
      title: "Continuous Innovation",
      desc: "Constantly integrating the latest advancements in Next.js, AI integrations, cloud scalability, and business automation to give clients an unfair advantage.",
    },
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
                EXECUTIVE LEADERSHIP & MINDS
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-[clamp(32px,4.5vw,60px)] font-bold tracking-tight text-ink leading-[1.05] mb-4">
              THE MINDS BEHIND THE TECHNOLOGY.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-sm md:text-base text-ink-dim leading-relaxed">
              A multidisciplinary collective of senior software engineers, system architects,
              UI/UX designers, and certified cybersecurity specialists dedicated to delivering exceptional digital products.
            </p>
          </Reveal>
        </div>

        {/* Leadership Spotlight Card */}
        <div className="mb-16">
          {team.map((member, i) => (
            <Reveal key={i}>
              <div className="p-6 md:p-10 border border-cyan/40 bg-black/70 backdrop-blur-xl cyber-corner grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-center">
                {/* Photo Frame */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto border-2 border-cyan/40 bg-black/50 overflow-hidden shadow-[0_0_20px_rgba(53,230,196,0.2)]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Profile Narrative */}
                <div>
                  <div className="font-mono text-[10px] text-cyan tracking-[0.2em] uppercase mb-2">
                    // {member.tag}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-ink mb-1">
                    {member.name}
                  </h3>
                  <div className="font-mono text-xs text-cyan mb-4">
                    {member.role}
                  </div>
                  <p className="text-xs md:text-sm text-ink-dim leading-relaxed mb-6">
                    {member.desc}
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/contact"
                      onClick={() => soundManager.playClick()}
                      className="px-5 py-2 bg-cyan hover:bg-cyan/90 text-[#030508] font-mono text-xs font-bold tracking-wider transition-all"
                    >
                      [ CONNECT DIRECTLY ]
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Engineering Culture Pillars */}
        <div className="mb-16">
          <Reveal>
            <div className="font-mono text-xs text-cyan tracking-[0.2em] uppercase mb-2">
              OUR ENGINEERING ETHOS
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-6">
              How Our Team Operates
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {engineeringCulture.map((item, i) => (
              <Reveal key={item.code} delay={i * 0.1}>
                <div
                  onMouseEnter={() => soundManager.playHover()}
                  className="p-5 border border-white/10 hover:border-cyan/50 bg-black/60 backdrop-blur-xl cyber-corner h-full transition-all"
                >
                  <span className="font-mono text-cyan text-lg font-bold block mb-2">
                    [{item.code}]
                  </span>
                  <h4 className="text-sm font-bold text-ink mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-ink-dim leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom CTA Block */}
        <Reveal>
          <div className="p-8 md:p-12 border border-white/10 bg-black/70 backdrop-blur-xl cyber-corner text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-3">
              Want to build with Tech Defenders?
            </h2>
            <p className="text-xs md:text-sm text-ink-dim max-w-xl mx-auto mb-6">
              Whether you need to architect custom software, modernize your web presence, or fortify your infrastructure, our team is ready.
            </p>
            <Link
              href="/contact"
              onClick={() => soundManager.playClick()}
              className="px-6 py-2.5 bg-cyan hover:bg-cyan/90 text-[#030508] font-mono text-xs font-bold tracking-wider transition-all inline-block"
            >
              [ START A PROJECT WITH US ]
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
