"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Shield } from "lucide-react";
import { navLinks } from "@/data/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050816]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="h-10 w-10 rounded-lg border border-[rgba(212,175,55,0.3)] bg-[#050816] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                <img
                  src="/images/td_new_logo.PNG"
                  alt="Tech Defenders Logo"
                  className="h-6 w-6 object-contain"
                />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold text-white group-hover:text-[#FFD700] transition-colors duration-300">
                Tech Defenders
              </span>
              <span className="block text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase font-medium">
                IT Security
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-[#A8B2C5] hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#FFD700] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.05)] px-6 py-2.5 text-sm font-semibold text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)] hover:border-[rgba(212,175,55,0.5)] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300"
            >
              Get Started
              <span className="text-lg group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#A8B2C5] hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-white/5 bg-[#050816]/95 backdrop-blur-xl"
          >
            <div className="mx-auto max-w-7xl px-4 py-6 space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-[#A8B2C5] hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block mt-4 px-4 py-3 text-center rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.05)] text-[#D4AF37] font-semibold hover:bg-[rgba(212,175,55,0.1)] hover:border-[rgba(212,175,55,0.5)] transition-all duration-200"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
