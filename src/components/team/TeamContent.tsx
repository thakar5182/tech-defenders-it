"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { Globe, Mail, Shield, Users } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  color: string;
  image?: string;
  portfolio?: string;
  email?: string;
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

const teamMembers: TeamMember[] = [
  {
    name: "Jigar Thakar",
    role: "Founder & CEO",
    description:
      "Visionary leader with extensive experience in cybersecurity strategy and enterprise security architecture. Jigar founded Tech Defenders IT with a mission to make enterprise-grade security accessible to businesses of all sizes.",
    image: "/images/Jigarthakar_photo.PNG",
    portfolio: "https://jigar-thakar-portfolio.vercel.app/",
    email: "thakarjigar37@gmail.com",
    color: "#D4AF37",
  },
  {
    name: "Harshil Rajgor",
    role: "Co-Founder",
    description:
      "Technical expert specializing in penetration testing, vulnerability assessment, and security operations. Harshil leads the technical division, ensuring cutting-edge solutions and robust security implementations.",
    icon: Users,
    color: "#D4AF37",
  },
];

export default function TeamContent() {
  return (
    <div className="pt-20">
      <div className="relative py-16 lg:py-24">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Team"
            subtitle="Meet the visionaries behind Tech Defenders IT. Our leadership team brings decades of combined experience in cybersecurity, technology, and business strategy."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass-card rounded-2xl p-8 lg:p-10 relative overflow-hidden group"
              >
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: member.color }}
                />

                <div className="relative">
                  {member.image ? (
                    <div className="mb-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-20 w-20 rounded-2xl object-cover border border-[rgba(212,175,55,0.3)]"
                      />
                    </div>
                  ) : member.icon ? (
                    <div
                      className="h-20 w-20 rounded-2xl flex items-center justify-center mb-6 border border-[rgba(212,175,55,0.3)]"
                      style={{ background: `${member.color}15` }}
                    >
                      <member.icon
                        className="h-10 w-10"
                        style={{ color: member.color }}
                      />
                    </div>
                  ) : null}

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  <p
                    className="text-sm font-medium uppercase tracking-wider mb-6"
                    style={{ color: member.color }}
                  >
                    {member.role}
                  </p>

                  <p className="text-[#A8B2C5] leading-relaxed mb-8">
                    {member.description}
                  </p>

                  <div className="flex gap-4">
                    {member.portfolio && (
                      <a
                        href={member.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-[#A8B2C5] hover:text-[#D4AF37] hover:border-[rgba(212,175,55,0.4)] transition-all duration-200"
                        aria-label="Portfolio"
                      >
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-[#A8B2C5] hover:text-[#D4AF37] hover:border-[rgba(212,175,55,0.4)] transition-all duration-200"
                        aria-label="Email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 text-center"
          >
            <div className="glass-card rounded-2xl p-8 lg:p-12 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Join Our Team
              </h3>
              <p className="text-[#A8B2C5] leading-relaxed mb-8">
                We are always looking for talented cybersecurity professionals to join our growing team. If you are passionate about security and want to make a difference, we would love to hear from you.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.05)] px-8 py-4 text-base font-semibold text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)] hover:border-[rgba(212,175,55,0.5)] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
