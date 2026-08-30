import type { Metadata } from "next";
import AboutSection from "@/components/sections/AboutSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export const metadata: Metadata = {
  title: "About Us | Tech Defenders IT",
  description:
    "Learn about Tech Defenders IT - our mission, vision, core values, and why we're the trusted cybersecurity partner for 500+ enterprises worldwide.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="relative py-16 lg:py-20 text-center">
        <div className="absolute inset-0 grid-pattern" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            About{" "}
            <span className="text-gradient">Us</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Learn about our mission, our team, and our commitment to securing
            your digital future.
          </p>
        </div>
      </div>
      <AboutSection />
      <ProcessSection />
      <TestimonialsSection />
    </div>
  );
}