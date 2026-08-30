"use client";

import { motion } from "framer-motion";
import { industries } from "@/data/industries";
import SectionHeader from "@/components/ui/SectionHeader";

export default function IndustriesSection() {
  return (
    <section id="industries" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A1628] to-[#0A0A0A] opacity-50" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Industries We Serve"
          subtitle="Our cybersecurity expertise spans across multiple industries, each with unique security challenges and compliance requirements."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-6 text-center h-full">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00D9FF]/10 to-[#7C3AED]/10 group-hover:from-[#00D9FF]/20 group-hover:to-[#7C3AED]/20 transition-all duration-300">
                    <industry.icon className="h-8 w-8 text-[#00D9FF] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00D9FF] transition-colors duration-300">
                  {industry.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {industry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}