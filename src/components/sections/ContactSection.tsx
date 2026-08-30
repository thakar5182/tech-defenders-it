"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { services } from "@/data/services";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0B1224] to-[#0A0A0A] opacity-50" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Get In Touch"
          subtitle="Ready to strengthen your security posture? Contact our team for a free consultation and discover how Tech Defenders IT can protect your business."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-12 text-center"
              >
                <CheckCircle className="h-16 w-16 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-[#A8B2C5]">
                  Our team will get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#A8B2C5] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#A8B2C5] mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Company"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#A8B2C5] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#A8B2C5] mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#A8B2C5] mb-2">
                    Service Required *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  >
                    <option value="" className="bg-[#0A0A0A]">
                      Select a service
                    </option>
                    {services.map((service) => (
                      <option
                        key={service.id}
                        value={service.title}
                        className="bg-[#0A0A0A]"
                      >
                        {service.title}
                      </option>
                    ))}
                    <option value="other" className="bg-[#0A0A0A]">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#A8B2C5] mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your security needs..."
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.05)] px-8 py-4 text-base font-semibold text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)] hover:border-[rgba(212,175,55,0.5)] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Contact cards */}
            <div className="glass-card rounded-2xl p-6 flex items-center gap-4 group hover:border-[rgba(212,175,55,0.35)] transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.03)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300">
                <Mail className="h-6 w-6 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-sm text-[#A8B2C5]">Email Us</p>
                <p className="text-white font-medium">
                  techdefenderss@gmail.com
                </p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 flex items-center gap-4 group hover:border-[rgba(212,175,55,0.35)] transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.03)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300">
                <Phone className="h-6 w-6 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-sm text-[#A8B2C5]">Call Us</p>
                <p className="text-white font-medium">+91 7600426578</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 flex items-center gap-4 group hover:border-[rgba(212,175,55,0.35)] transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.03)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300">
                <MapPin className="h-6 w-6 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-sm text-[#A8B2C5]">Visit Us</p>
                <p className="text-white font-medium">
                  1/9 Bhaktinagar Society Bapunagar Ahamedabad, 380024
                </p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="glass-card rounded-2xl h-64 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[rgba(212,175,55,0.02)] to-transparent flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-10 w-10 text-[#D4AF37] mx-auto mb-2 opacity-50" />
                  <p className="text-sm text-[#A8B2C5]">
                    Interactive Map
                  </p>
                  <p className="text-xs text-[#A8B2C5]">
                    Google Maps integration coming soon
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
