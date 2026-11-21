"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/utils/audio";
import { CheckCircle2, AlertCircle, Send, Loader2 } from "lucide-react";

const SERVICE_OPTIONS = [
  "Website Development",
  "Software Development",
  "Mobile App Development",
  "AI & Automation",
  "UI/UX Design",
  "IT Solutions",
  "Cloud & Infrastructure",
  "Cybersecurity",
  "E-commerce Development",
  "Other",
];

const BUDGET_OPTIONS = [
  "Not Decided / Flexible",
  "< $1,000 (Under ₹1 Lakh)",
  "$1,000 – $5,000 (₹1L – ₹4L)",
  "$5,000 – $15,000 (₹4L – ₹12L)",
  "$15,000+ (Enterprise Scale)",
];

interface ContactFormProps {
  initialService?: string;
  className?: string;
}

export default function ContactForm({
  initialService = "",
  className = "",
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: initialService && SERVICE_OPTIONS.includes(initialService) ? initialService : SERVICE_OPTIONS[0],
    budget: BUDGET_OPTIONS[0],
    message: "",
    bot_check_field_123: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    soundManager.playClick();
    setLoading(true);
    setStatus({ type: null, message: "" });

    // Client-side validation check
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields (Name, Email, Service, and Message).",
      });
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus({
        type: "error",
        message: "Please provide a valid email address.",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        soundManager.playScanSuccess();
        setStatus({
          type: "success",
          message:
            result.message ||
            "Your inquiry has been submitted successfully. We will get back to you as soon as possible.",
        });
      } else {
        setStatus({
          type: "error",
          message:
            result.error ||
            "Message delivery failed. Please try again or contact us directly at techdefenderss@gmail.com.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message:
          "Network transmission error. Please try again or reach us directly at techdefenderss@gmail.com.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    soundManager.playClick();
    setStatus({ type: null, message: "" });
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: SERVICE_OPTIONS[0],
      budget: BUDGET_OPTIONS[0],
      message: "",
      bot_check_field_123: "",
    });
  };

  return (
    <div
      className={`p-4 sm:p-6 md:p-8 border border-cyan/40 bg-black/75 dark:bg-black/75 light:bg-white/95 backdrop-blur-2xl cyber-corner rounded-sm shadow-[0_0_30px_rgba(53,230,196,0.08)] ${className}`}
    >
      {/* Console Top Bar Header */}
      <div className="flex items-center justify-between border-b border-white/10 light:border-slate-200 pb-3 mb-5 sm:mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_#35e6c4]" />
          <span className="font-mono text-xs sm:text-sm text-cyan tracking-[0.16em] uppercase font-bold">
            // SECURE PROJECT TRANSMISSION CONSOLE
          </span>
        </div>
        <span className="font-mono text-[9px] sm:text-[10px] text-ink-muted uppercase tracking-wider hidden xs:inline">
          TLS 1.3 • AES-256
        </span>
      </div>

      <AnimatePresence mode="wait">
        {status.type === "success" ? (
          /* Animated Success State */
          <motion.div
            key="success-state"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="py-8 sm:py-12 flex flex-col items-center text-center px-4"
          >
            <div className="relative mb-5 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-cyan/50 bg-cyan/10 flex items-center justify-center shadow-[0_0_30px_rgba(53,230,196,0.4)]">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-cyan animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-full border border-cyan/30 animate-ping pointer-events-none" />
            </div>

            <div className="font-mono text-xs text-cyan tracking-[0.25em] uppercase mb-2 font-bold">
              [ TRANSMISSION CONFIRMED ]
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-ink tracking-tight mb-3">
              MESSAGE TRANSMITTED SUCCESSFULLY
            </h3>

            <p className="text-xs sm:text-sm text-ink-dim max-w-md leading-relaxed mb-8">
              Thank you for contacting Tech Defenders. Your inquiry has been submitted successfully.
              Our senior engineering leads will review your requirements and get back to you as soon as possible.
            </p>

            <button
              onClick={handleReset}
              onMouseEnter={() => soundManager.playHover()}
              className="px-6 py-2.5 border border-cyan/60 hover:border-cyan bg-cyan/15 hover:bg-cyan/25 text-cyan font-mono text-xs tracking-wider transition-all rounded-sm flex items-center gap-2 min-h-[44px]"
            >
              <span>[ TRANSMIT ANOTHER INQUIRY ]</span>
              <span>→</span>
            </button>
          </motion.div>
        ) : (
          /* Main Interactive Form */
          <motion.form
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {/* Anti-spam Bot Honeypot (Hidden) */}
            <input
              type="text"
              name="bot_check_field_123"
              value={formData.bot_check_field_123}
              onChange={handleChange}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="new-password"
            />

            {/* Error Banner */}
            {status.type === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 border border-rose-500/50 bg-rose-500/10 text-rose-400 rounded-sm text-xs font-mono flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-bold tracking-wider mb-0.5">MESSAGE DELIVERY FAILED</div>
                  <div className="text-[11px] text-rose-300 leading-relaxed">
                    {status.message}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Row 1: Full Name & Email Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="font-mono text-[10px] sm:text-[11px] text-ink-dim block mb-1 tracking-wider uppercase">
                  FULL NAME <span className="text-cyan font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  placeholder="e.g. Alex Morgan"
                  disabled={loading}
                  className="w-full bg-black/60 dark:bg-black/60 light:bg-slate-50 border border-white/15 dark:border-white/15 light:border-slate-300 focus:border-cyan focus:ring-1 focus:ring-cyan text-ink text-xs sm:text-sm px-3.5 py-2.5 outline-none transition-all rounded-sm placeholder:text-ink-muted/50 min-h-[44px]"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] sm:text-[11px] text-ink-dim block mb-1 tracking-wider uppercase">
                  EMAIL ADDRESS <span className="text-cyan font-bold">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  placeholder="name@company.com"
                  disabled={loading}
                  className="w-full bg-black/60 dark:bg-black/60 light:bg-slate-50 border border-white/15 dark:border-white/15 light:border-slate-300 focus:border-cyan focus:ring-1 focus:ring-cyan text-ink text-xs sm:text-sm px-3.5 py-2.5 outline-none transition-all rounded-sm placeholder:text-ink-muted/50 min-h-[44px]"
                />
              </div>
            </div>

            {/* Row 2: Phone Number & Company Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="font-mono text-[10px] sm:text-[11px] text-ink-dim block mb-1 tracking-wider uppercase">
                  PHONE NUMBER <span className="text-ink-muted text-[10px]">(OPTIONAL)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={40}
                  placeholder="+91 98765 43210"
                  disabled={loading}
                  className="w-full bg-black/60 dark:bg-black/60 light:bg-slate-50 border border-white/15 dark:border-white/15 light:border-slate-300 focus:border-cyan focus:ring-1 focus:ring-cyan text-ink text-xs sm:text-sm px-3.5 py-2.5 outline-none transition-all rounded-sm placeholder:text-ink-muted/50 min-h-[44px]"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] sm:text-[11px] text-ink-dim block mb-1 tracking-wider uppercase">
                  COMPANY NAME <span className="text-ink-muted text-[10px]">(OPTIONAL)</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  maxLength={100}
                  placeholder="e.g. Acme Innovations Ltd."
                  disabled={loading}
                  className="w-full bg-black/60 dark:bg-black/60 light:bg-slate-50 border border-white/15 dark:border-white/15 light:border-slate-300 focus:border-cyan focus:ring-1 focus:ring-cyan text-ink text-xs sm:text-sm px-3.5 py-2.5 outline-none transition-all rounded-sm placeholder:text-ink-muted/50 min-h-[44px]"
                />
              </div>
            </div>

            {/* Row 3: Subject / Service Required & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="font-mono text-[10px] sm:text-[11px] text-ink-dim block mb-1 tracking-wider uppercase">
                  SUBJECT / SERVICE REQUIRED <span className="text-cyan font-bold">*</span>
                </label>
                <div className="relative">
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full bg-black/60 dark:bg-black/60 light:bg-slate-50 border border-white/15 dark:border-white/15 light:border-slate-300 focus:border-cyan focus:ring-1 focus:ring-cyan text-ink text-xs sm:text-sm px-3.5 py-2.5 outline-none transition-all rounded-sm appearance-none cursor-pointer min-h-[44px]"
                  >
                    {SERVICE_OPTIONS.map((svc) => (
                      <option
                        key={svc}
                        value={svc}
                        className="bg-[#050814] text-white py-1"
                      >
                        {svc}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-cyan text-xs">
                    ▼
                  </div>
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] sm:text-[11px] text-ink-dim block mb-1 tracking-wider uppercase">
                  PROJECT BUDGET <span className="text-ink-muted text-[10px]">(OPTIONAL)</span>
                </label>
                <div className="relative">
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full bg-black/60 dark:bg-black/60 light:bg-slate-50 border border-white/15 dark:border-white/15 light:border-slate-300 focus:border-cyan focus:ring-1 focus:ring-cyan text-ink text-xs sm:text-sm px-3.5 py-2.5 outline-none transition-all rounded-sm appearance-none cursor-pointer min-h-[44px]"
                  >
                    {BUDGET_OPTIONS.map((b) => (
                      <option
                        key={b}
                        value={b}
                        className="bg-[#050814] text-white py-1"
                      >
                        {b}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-cyan text-xs">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4: Message / Project Details */}
            <div>
              <label className="font-mono text-[10px] sm:text-[11px] text-ink-dim block mb-1 tracking-wider uppercase">
                MESSAGE / PROJECT DETAILS <span className="text-cyan font-bold">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                maxLength={3000}
                placeholder="Describe your technical vision, requirements, timeline, or current challenges..."
                disabled={loading}
                className="w-full bg-black/60 dark:bg-black/60 light:bg-slate-50 border border-white/15 dark:border-white/15 light:border-slate-300 focus:border-cyan focus:ring-1 focus:ring-cyan text-ink text-xs sm:text-sm px-3.5 py-2.5 outline-none transition-all rounded-sm placeholder:text-ink-muted/50 resize-y min-h-[96px]"
              />
            </div>

            {/* Row 5: Animated Send Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                onMouseEnter={() => soundManager.playHover()}
                className={`group relative w-full sm:w-auto min-h-[46px] px-8 py-3 bg-cyan text-[#030508] font-mono text-xs sm:text-sm font-bold tracking-[0.14em] uppercase transition-all rounded-sm flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(53,230,196,0.25)] hover:shadow-[0_0_30px_rgba(53,230,196,0.5)] ${
                  loading
                    ? "opacity-80 cursor-wait bg-cyan/80"
                    : "hover:bg-cyan/95 active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#030508]" />
                    <span>TRANSMITTING INQUIRY...</span>
                  </>
                ) : (
                  <>
                    <span>[ SEND MESSAGE ]</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
