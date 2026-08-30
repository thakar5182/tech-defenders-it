"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import SectionHeader from "@/components/ui/SectionHeader";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  const testimonial = testimonials[current];

  return (
    <section id="testimonials" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="What Our Clients Say"
          subtitle="Hear from the organizations we've helped protect and secure."
        />

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-2xl p-8 lg:p-12 relative overflow-hidden"
            >
              {/* Quote icon */}
              <Quote className="h-10 w-10 text-[rgba(212,175,55,0.2)] mb-6" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-[#D4AF37] text-[#D4AF37]"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-lg text-white leading-relaxed mb-8">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[rgba(212,175,55,0.3)] bg-gradient-to-br from-[#D4AF37] to-[#FFD700] text-[#050816] font-bold text-lg shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[#A8B2C5]">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(212,175,55,0.18)] text-[#A8B2C5] hover:text-[#D4AF37] hover:border-[rgba(212,175,55,0.4)] transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-gradient-to-r from-[#D4AF37] to-[#FFD700]"
                      : "w-2 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)]"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(212,175,55,0.18)] text-[#A8B2C5] hover:text-[#D4AF37] hover:border-[rgba(212,175,55,0.4)] transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
