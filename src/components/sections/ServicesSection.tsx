"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0B1224] to-[#0A0A0A] opacity-50" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Our Services"
          subtitle="Comprehensive cybersecurity solutions tailored to protect your business from evolving digital threats. Each service is delivered by certified experts using cutting-edge methodologies."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
                {/* Icon */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(212,175,55,0.18)] transition-all duration-300 group-hover:border-[rgba(212,175,55,0.4)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                    style={{
                      background: `${service.color}10`,
                    }}
                  >
                    <service.icon
                      className="h-6 w-6 transition-all duration-300 group-hover:text-[#FFD700]"
                      style={{ color: service.color }}
                    />
                  </div>
                  <div
                    className="h-1 flex-1 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                    style={{ background: service.color }}
                  />
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#FFD700] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-[#A8B2C5] leading-relaxed mb-4 flex-1">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, fi) => (
                    <li
                      key={fi}
                      className="flex items-center gap-2 text-xs text-[#A8B2C5]"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full flex-shrink-0 bg-[#D4AF37]"
                        style={{ background: service.color }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn More */}
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37] transition-all duration-300 group/link hover:gap-3"
                  style={{ color: service.color }}
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
