import type { Metadata } from "next";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import IndustriesSection from "@/components/sections/IndustriesSection";

export const metadata: Metadata = {
  title: "Services | Tech Defenders IT",
  description:
    "Comprehensive cybersecurity services including penetration testing, vulnerability assessment, SOC monitoring, incident response, cloud security, and more.",
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <div className="relative py-16 lg:py-20 text-center">
        <div className="absolute inset-0 grid-pattern" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Our{" "}
            <span className="text-gradient">Services</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Enterprise-grade cybersecurity solutions tailored to protect your
            business from evolving digital threats.
          </p>
        </div>
      </div>
      <ServicesSection />
      <ProcessSection />
      <IndustriesSection />
    </div>
  );
}