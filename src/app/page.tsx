"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { soundManager } from "@/utils/audio";
import CinematicIntro from "@/components/CinematicIntro";
import TopHud from "@/components/TopHud";
import ChapterNav from "@/components/ChapterNav";
import HeroChapter from "@/components/chapters/HeroChapter";
import TechUniverseChapter from "@/components/chapters/TechUniverseChapter";
import ServicesChapter from "@/components/chapters/ServicesChapter";
import SolutionsChapter from "@/components/chapters/SolutionsChapter";
import ProcessChapter from "@/components/chapters/ProcessChapter";
import AboutChapter from "@/components/chapters/AboutChapter";
import ProjectsChapter from "@/components/chapters/ProjectsChapter";
import ContactChapter from "@/components/chapters/ContactChapter";
import Footer from "@/components/Footer";

// Dynamically load WebGL Canvas with SSR false
const CyberScene = dynamic(() => import("@/components/3d/CyberScene"), {
  ssr: false,
});

const CHAPTER_TITLES = [
  "HOME",
  "TECHNOLOGY",
  "SERVICES",
  "SOLUTIONS",
  "PROCESS",
  "ABOUT",
  "PROJECTS",
  "CONTACT",
];

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(0);

  // Check if intro was already seen during this session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const completed = sessionStorage.getItem("td_intro_completed");
      if (completed === "true") {
        setShowIntro(false);
      }
    }
  }, []);

  // Smooth scroll to target chapter section
  const goToChapter = useCallback((index: number) => {
    soundManager.playTransition();
    setCurrentChapter(index);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("td-scroll-active"));
      const element = document.getElementById(`chapter-${index}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  // Natural scroll listener to update current active chapter & notify 3D robot
  useEffect(() => {
    if (showIntro) return;

    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      // Trigger robot running animation during scroll
      window.dispatchEvent(new CustomEvent("td-scroll-active"));

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollPos = window.scrollY + window.innerHeight * 0.45;
        for (let i = CHAPTER_TITLES.length - 1; i >= 0; i--) {
          const el = document.getElementById(`chapter-${i}`);
          if (el && el.offsetTop <= scrollPos) {
            setCurrentChapter((prev) => (prev !== i ? i : prev));
            break;
          }
        }
      }, 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showIntro]);

  return (
    <main className="relative min-h-screen bg-bg text-ink transition-colors duration-400">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ITUtility",
            name: "Tech Defenders IT",
            url: "https://www.techdefenderss.com",
            logo: "https://www.techdefenderss.com/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-7600426578",
              contactType: "customer service",
              email: "techdefenderss@gmail.com",
              areaServed: "IN",
              availableLanguage: ["English", "Hindi"],
            },
            sameAs: [
              "https://www.linkedin.com/company/tech-defenders-it",
            ],
            description:
              "Complete IT company specializing in custom software development, high-performance websites, mobile applications, AI automation, cloud infrastructure, and cybersecurity.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "1/9 Bhaktinagar Society, Bapunagar",
              addressLocality: "Ahmedabad",
              addressRegion: "Gujarat",
              postalCode: "380024",
              addressCountry: "IN",
            },
          }),
        }}
      />

      {/* Cinematic Intro Loading Sequence */}
      <AnimatePresence>
        {showIntro && (
          <CinematicIntro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Persistent 3D WebGL Canvas - Fixed in viewport background */}
      <CyberScene chapter={currentChapter} />

      {/* Top HUD Navigation Bar - Fixed at top of viewport */}
      <TopHud
        currentChapter={currentChapter}
        onNavigateChapter={goToChapter}
        chapterTitles={CHAPTER_TITLES}
      />

      {/* Right & Bottom Chapter Navigation Controls - Fixed in viewport */}
      <ChapterNav
        currentChapter={currentChapter}
        totalChapters={CHAPTER_TITLES.length}
        onNavigateChapter={goToChapter}
        chapterTitles={CHAPTER_TITLES}
      />

      {/* Continuous Naturally Scrollable Page Sections */}
      <div className="relative z-10 pointer-events-auto flex flex-col">
        {/* Chapter 00: Home / Hero */}
        <section id="chapter-0" className="min-h-screen w-full relative flex flex-col justify-center">
          <HeroChapter onNavigate={goToChapter} />
        </section>

        {/* Chapter 01: Technology Ecosystem */}
        <section id="chapter-1" className="min-h-screen w-full relative flex flex-col justify-center">
          <TechUniverseChapter onNavigate={goToChapter} />
        </section>

        {/* Chapter 02: Complete IT Services */}
        <section id="chapter-2" className="min-h-screen w-full relative flex flex-col justify-center">
          <ServicesChapter onNavigate={goToChapter} />
        </section>

        {/* Chapter 03: Business Solutions */}
        <section id="chapter-3" className="min-h-screen w-full relative flex flex-col justify-center">
          <SolutionsChapter onNavigate={goToChapter} />
        </section>

        {/* Chapter 04: Engineering Process */}
        <section id="chapter-4" className="min-h-screen w-full relative flex flex-col justify-center">
          <ProcessChapter onNavigate={goToChapter} />
        </section>

        {/* Chapter 05: About & Foundational Pillars */}
        <section id="chapter-5" className="min-h-screen w-full relative flex flex-col justify-center">
          <AboutChapter onNavigate={goToChapter} />
        </section>

        {/* Chapter 06: Projects & Tech Stack */}
        <section id="chapter-6" className="min-h-screen w-full relative flex flex-col justify-center">
          <ProjectsChapter onNavigate={goToChapter} />
        </section>

        {/* Chapter 07: Direct Contact & Inquiry */}
        <section id="chapter-7" className="min-h-screen w-full relative flex flex-col justify-center">
          <ContactChapter onNavigate={goToChapter} />
        </section>

        {/* Full Footer Access */}
        <Footer />
      </div>
    </main>
  );
}
