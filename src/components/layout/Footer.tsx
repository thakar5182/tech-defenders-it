"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageCircle,
  Code2,
  Video,
  ArrowRight,
} from "lucide-react";
import { services } from "@/data/services";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  services: services.slice(0, 6).map((s) => ({
    label: s.title,
    href: `/services#${s.title.toLowerCase().replace(/\s+/g, "-")}`,
  })),
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050816] border-t border-[rgba(212,175,55,0.18)]">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1224] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <div className="h-10 w-10 rounded-lg border border-[rgba(212,175,55,0.3)] bg-[#050816] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300">
                <Shield className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <div>
                <span className="text-lg font-bold text-white group-hover:text-[#FFD700] transition-colors duration-300 block">Tech Defenders</span>
                <span className="block text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase font-medium">IT Security</span>
              </div>
            </Link>
            <p className="text-[#A8B2C5] text-sm leading-relaxed mb-6">
              Protecting businesses and securing tomorrow with enterprise-grade
              cybersecurity solutions trusted by industry leaders worldwide.
            </p>
               <div className="space-y-3 text-sm text-[#A8B2C5]">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[#D4AF37]" />
                  <span>techdefenderss@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[#D4AF37]" />
                  <span>+91 7600426578</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[#D4AF37]" />
                  <span>1/9 Bhaktinagar Society Bapunagar Ahamedabad, 380024</span>
                </div>
              </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#A8B2C5] hover:text-[#D4AF37] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-[#D4AF37]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#A8B2C5] hover:text-[#D4AF37] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-[#D4AF37]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-white font-semibold mb-6">Stay Updated</h3>
            <p className="text-[#A8B2C5] text-sm mb-4">
              Subscribe to our newsletter for the latest cybersecurity insights
              and threat intelligence.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2 mb-6"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-[#A8B2C5] focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.05)] text-[#D4AF37] font-medium hover:bg-[rgba(212,175,55,0.1)] hover:border-[rgba(212,175,55,0.5)] transition-all duration-300"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <div className="flex gap-3">
              {[
                { icon: Globe, href: "#", label: "LinkedIn" },
                { icon: MessageCircle, href: "#", label: "Twitter" },
                { icon: Code2, href: "#", label: "GitHub" },
                { icon: Video, href: "#", label: "YouTube" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(212,175,55,0.18)] bg-white/5 text-[#A8B2C5] hover:text-[#D4AF37] hover:border-[rgba(212,175,55,0.4)] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#A8B2C5] text-sm">
            &copy; {currentYear} Tech Defenders IT. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-[#A8B2C5]">
            <Link href="#" className="hover:text-[#D4AF37] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[#D4AF37] transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-[#D4AF37] transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
