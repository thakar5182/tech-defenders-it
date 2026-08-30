"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${centered ? "text-center" : ""}`}
    >
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${
          light ? "text-white" : "text-white"
        }`}
      >
        {title}
      </h2>
      <div
        className={`mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] ${
          centered ? "mx-auto" : ""
        }`}
      />
      {subtitle && (
        <p
          className={`mt-6 max-w-2xl text-lg leading-relaxed ${
            centered ? "mx-auto" : ""
          } ${light ? "text-gray-300" : "text-[#A8B2C5]"}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
