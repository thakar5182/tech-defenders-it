"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { stats } from "@/data/stats";

export default function StatsSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0B1224] to-[#0A0A0A] opacity-50" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            By the{" "}
            <span className="text-gradient">Numbers</span>
          </h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] mx-auto" />
          <p className="mt-6 max-w-2xl mx-auto text-lg text-[#A8B2C5]">
            Our track record speaks for itself. We&apos;ve helped organizations
            across industries strengthen their security posture.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="glass-card rounded-2xl p-6">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
                <p className="mt-2 text-sm text-[#A8B2C5] font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
