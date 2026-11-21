"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { COMPANY_CONTACT } from "@/data";
import ContactForm from "@/components/ContactForm";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "";

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
                DIRECT PROJECT DISPATCH &amp; INQUIRY
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-[clamp(32px,4.5vw,60px)] font-bold tracking-tight text-ink leading-[1.05] mb-4">
              HAVE AN IDEA? LET&apos;S BUILD IT.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-sm md:text-base text-ink-dim leading-relaxed">
              From high-performance corporate websites and bespoke software platforms to mobile applications,
              intelligent business automation, and cybersecurity — let&apos;s turn your vision into an exceptional digital product.
            </p>
          </Reveal>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 mb-16 items-start">
          {/* Left: Terminal Form */}
          <Reveal>
            <ContactForm initialService={initialService} />
          </Reveal>

          {/* Right: Direct Hotline Channels */}
          <Reveal delay={0.1}>
            <div className="p-6 md:p-8 border border-white/10 dark:border-white/10 light:border-slate-300 bg-black/60 dark:bg-black/60 light:bg-white/90 backdrop-blur-xl cyber-corner h-full flex flex-col justify-between rounded-sm">
              <div>
                <div className="font-mono text-xs text-cyan tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                  <span>// DIRECT DEFENSE &amp; IT HOTLINE</span>
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-ink-muted uppercase block mb-1">
                      DIRECT PHONE
                    </span>
                    <a
                      href={`tel:${COMPANY_CONTACT.phone}`}
                      className="text-xl font-bold text-ink hover:text-cyan transition-colors"
                    >
                      {COMPANY_CONTACT.phone}
                    </a>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-ink-muted uppercase block mb-1">
                      EMAIL DISPATCH
                    </span>
                    <div className="flex flex-col gap-1 text-sm font-mono">
                      <a
                        href={`mailto:${COMPANY_CONTACT.email}`}
                        className="text-ink hover:text-cyan transition-colors"
                      >
                        {COMPANY_CONTACT.email}
                      </a>
                      <a
                        href={`mailto:${COMPANY_CONTACT.altEmail}`}
                        className="text-ink-dim hover:text-cyan transition-colors"
                      >
                        {COMPANY_CONTACT.altEmail}
                      </a>
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-ink-muted uppercase block mb-1">
                      HEADQUARTERS
                    </span>
                    <p className="text-sm text-ink leading-relaxed">
                      {COMPANY_CONTACT.address}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-ink-muted uppercase block mb-1">
                      SERVICE HOURS
                    </span>
                    <p className="text-sm text-ink leading-relaxed">
                      Mon – Sat: 09:00 AM – 07:00 PM IST
                      <br />
                      24/7 Managed IT &amp; Security Incident Monitoring
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 light:border-slate-200 mt-6 flex flex-col gap-3">
                <div className="font-mono text-[11px] text-cyan block font-semibold">
                  TYPICAL RESPONSE TIME: &lt; 4 HOURS
                </div>
                <p className="text-xs text-ink-dim">
                  All inquiries receive direct evaluation by our senior engineering leads.
                </p>
                <a
                  href={COMPANY_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-emerald-500/50 hover:border-emerald-400 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-semibold tracking-wider transition-colors rounded-sm min-h-[44px]"
                >
                  <span>INSTANT WHATSAPP DISPATCH</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-28 text-center text-ink-dim font-mono text-xs">LOADING TRANSMISSION CONSOLE...</div>}>
      <ContactPageContent />
    </Suspense>
  );
}
