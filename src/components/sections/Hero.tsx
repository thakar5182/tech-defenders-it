"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0B1224] to-[#0A0A0A] opacity-50" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[rgba(212,175,55,0.03)] rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[rgba(201,162,39,0.03)] rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-[rgba(212,175,55,0.2)]"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.15)] bg-[rgba(212,175,55,0.03)] px-4 py-1.5 text-sm text-[#D4AF37] mb-8"
          >
            <Shield className="h-4 w-4" />
            <span className="font-medium">Trusted by 500+ Enterprises Worldwide</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Protecting{" "}
            <span className="text-gradient">Businesses</span>
            .<br />
            <span className="text-gradient">Securing</span> Tomorrow.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-2xl text-lg text-[#A8B2C5] leading-relaxed"
          >
            Enterprise-grade cybersecurity solutions powered by world-class
            experts. We defend your digital assets against evolving threats with
            cutting-edge technology and proven methodologies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.05)] px-8 py-4 text-base font-semibold text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)] hover:border-[rgba(212,175,55,0.5)] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.15)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative flex items-center gap-2">
                Get Free Consultation
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <Play className="h-5 w-5" />
              Explore Services
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-white/5"
          >
            <p className="text-sm text-[#A8B2C5] mb-6">
              Trusted by security teams at
            </p>
            <div className="flex flex-wrap gap-8 items-center">
              {["Fortune 500 Companies", "Government Agencies", "Financial Institutions", "Healthcare Providers"].map(
                (text, i) => (
                  <span
                    key={i}
                    className="text-[#A8B2C5] text-sm font-medium tracking-wide opacity-80"
                  >
                    {text}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
