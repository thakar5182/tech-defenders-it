import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | Tech Defenders IT",
  description:
    "Get in touch with Tech Defenders IT for a free consultation. Our team of cybersecurity experts is ready to protect your business.",
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="relative py-16 lg:py-20 text-center">
        <div className="absolute inset-0 grid-pattern" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Get In{" "}
            <span className="text-gradient">Touch</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Ready to strengthen your security posture? Contact our team for a
            free consultation.
          </p>
        </div>
      </div>
      <ContactSection />
    </div>
  );
}