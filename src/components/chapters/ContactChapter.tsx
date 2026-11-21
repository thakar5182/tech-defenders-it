"use client";
import React from "react";
import Link from "next/link";
import { COMPANY_CONTACT } from "@/data";
import ContactForm from "@/components/ContactForm";

interface ContactChapterProps {
  onNavigate?: (index: number) => void;
}

export default function ContactChapter({}: ContactChapterProps) {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 select-none z-10">
      <div className="w-full max-w-4xl my-auto">
        {/* Chapter Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] md:text-xs text-cyan tracking-[0.18em] sm:tracking-[0.2em] mb-1.5 uppercase font-semibold">
            <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-pulse shadow-[0_0_6px_#35e6c4]" />
            <span>CHAPTER 07 // INITIATE YOUR PROJECT</span>
          </div>
          <h2 className="text-[clamp(22px,4vw,38px)] font-bold tracking-tight text-ink mb-1.5 leading-tight">
            HAVE AN IDEA? LET&apos;S BUILD IT.
          </h2>
          <p className="text-xs sm:text-sm text-ink-dim max-w-2xl leading-relaxed">
            From modern web applications and bespoke software to mobile apps, AI automation,
            cloud architecture, and cybersecurity — let&apos;s engineer your vision into an exceptional digital product.
          </p>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-4 sm:gap-6 items-start">
          {/* Left: Interactive Contact Form */}
          <ContactForm />

          {/* Right: Direct Hotline & Location Info */}
          <div className="p-5 sm:p-6 border border-white/10 dark:border-white/10 light:border-slate-300 bg-black/65 dark:bg-black/65 light:bg-white/90 backdrop-blur-xl cyber-corner rounded-sm flex flex-col justify-between h-full shadow-[0_0_25px_rgba(0,180,255,0.06)]">
            <div>
              <div className="font-mono text-xs text-cyan tracking-wider uppercase mb-5 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                <span>// DIRECT COMMUNICATIONS MATRIX</span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-ink-muted uppercase block tracking-wider mb-1">
                    PRIMARY HOTLINE
                  </span>
                  <a
                    href="tel:+917600426578"
                    className="text-base sm:text-lg font-bold text-ink hover:text-cyan block transition-colors"
                  >
                    +91 7600426578
                  </a>
                </div>

                <div>
                  <span className="text-[10px] text-ink-muted uppercase block tracking-wider mb-1">
                    DIRECT EMAIL
                  </span>
                  <a
                    href="mailto:techdefenderss@gmail.com"
                    className="text-xs sm:text-sm text-ink hover:text-cyan block transition-colors"
                  >
                    techdefenderss@gmail.com
                  </a>
                </div>

                <div>
                  <span className="text-[10px] text-ink-muted uppercase block tracking-wider mb-1">
                    HEADQUARTERS
                  </span>
                  <div className="text-xs text-ink-dim leading-relaxed">
                    {COMPANY_CONTACT.address}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-ink-muted uppercase block tracking-wider mb-1">
                    GLOBAL CAPABILITY
                  </span>
                  <div className="text-xs text-cyan">
                    Remote Engineering &amp; Global Client Delivery
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 light:border-slate-200 mt-6 flex flex-col gap-2.5">
              <a
                href={COMPANY_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 border border-emerald-500/50 hover:border-emerald-400 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-semibold tracking-wider transition-colors rounded-sm min-h-[40px]"
              >
                <span>WHATSAPP RAPID DISPATCH</span>
                <span>↗</span>
              </a>
              <Link
                href="/about"
                className="font-mono text-[11px] text-cyan hover:text-ink font-semibold flex items-center justify-between transition-colors pt-1"
              >
                <span>EXPLORE TECH DEFENDERS LEADERSHIP</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
