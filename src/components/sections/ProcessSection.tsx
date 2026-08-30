"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/data/process";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Our Process"
          subtitle="A proven methodology that ensures comprehensive security coverage from initial consultation to ongoing protection."
        />

        <div className="relative">
          {/* Timeline gold vertical line */}
          <div className="timeline-line" />

          <div className="space-y-12 lg:space-y-16">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-8 lg:gap-12`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? "lg:text-right" : ""}`}>
                  <div className="glass-card rounded-2xl p-6 lg:p-8 group hover:border-[rgba(212,175,55,0.35)] transition-all duration-300">
                    <span
                      className="text-[#D4AF37] text-sm font-mono mb-2 block font-medium"
                    >
                      Step {String(step.id).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-[#FFD700] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-[#A8B2C5] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#050816] shadow-[0_0_20px_rgba(212,175,55,0.15)] group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-5 w-5 text-[#D4AF37]" />
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
