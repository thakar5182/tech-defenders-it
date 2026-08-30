import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="relative bg-[#050816]">
      <div className="fixed inset-0 bg-gradient-to-b from-[#0B1224] via-transparent to-[#050816] pointer-events-none z-0" />
      <div className="relative z-10">
        <Hero />
        <AboutSection />
        <StatsSection />
        <ServicesSection />
        <ProcessSection />
        <IndustriesSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
      </div>
    </div>
  );
}
