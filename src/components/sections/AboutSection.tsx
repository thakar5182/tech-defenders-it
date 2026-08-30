"use client";

import { motion } from "framer-motion";
import { Shield, Target, Eye, Heart, Award, Users } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We uphold the highest standards of honesty and transparency in every engagement, building trust through ethical practices.",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "We pursue excellence in every security solution we deliver, staying ahead of emerging threats through continuous innovation.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We work hand-in-hand with our clients, fostering strong partnerships that drive meaningful security outcomes.",
  },
  {
    icon: Award,
    title: "Expertise",
    description:
      "Our team comprises certified professionals with decades of combined experience in cybersecurity and IT infrastructure.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            About{" "}
            <span className="text-gradient">Tech Defenders IT</span>
          </h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] mx-auto" />
          <p className="mt-6 max-w-3xl mx-auto text-lg text-[#A8B2C5] leading-relaxed">
            Tech Defenders IT is a modern IT solutions company dedicated to helping
            businesses establish, grow, and secure their digital presence. We specialize
            in creating high-performance websites, custom web applications, e-commerce
            solutions, UI/UX design, cybersecurity services, and business automation
            tailored to each client&apos;s unique requirements.
          </p>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-[#A8B2C5] leading-relaxed">
            Our mission is to deliver innovative, secure, and scalable technology
            solutions that help startups, small businesses, and enterprises succeed in
            today&apos;s digital world. We combine creativity, cutting-edge technologies, and
            industry best practices to build products that are visually impressive, fast,
            responsive, and reliable.
          </p>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-[#A8B2C5] leading-relaxed">
            At Tech Defenders IT, we believe that every business deserves a powerful
            online identity. From designing stunning websites to implementing secure
            digital infrastructure, our experienced team focuses on quality,
            performance, and customer satisfaction at every stage of the project.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(212,175,55,0.1)]">
                <Eye className="h-6 w-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-white">Our Mission</h3>
            </div>
            <p className="text-[#A8B2C5] leading-relaxed">
              To provide secure, scalable, and high-quality technology solutions while building long-term relationships through trust, innovation, and exceptional customer service.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(212,175,55,0.1)]">
                <Target className="h-6 w-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-white">Our Vision</h3>
            </div>
            <p className="text-[#A8B2C5] leading-relaxed">
              To become one of the most trusted IT companies by delivering innovative digital solutions that empower businesses to grow confidently in the digital era.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            Our Core Values
          </h3>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center group"
            >
              <div className="flex justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[rgba(212,175,55,0.1)] to-[rgba(255,215,0,0.05)] group-hover:from-[rgba(212,175,55,0.2)] group-hover:to-[rgba(255,215,0,0.1)] transition-all duration-300">
                  <value.icon className="h-7 w-7 text-[#D4AF37]" />
                </div>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#FFD700] transition-colors duration-300">
                {value.title}
              </h4>
              <p className="text-sm text-[#A8B2C5] leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Why choose us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 glass-card rounded-2xl p-8 lg:p-12 text-center"
        >
          <Heart className="h-10 w-10 text-[#D4AF37] mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Why Choose Tech Defenders IT?
          </h3>
          <p className="max-w-3xl mx-auto text-[#A8B2C5] leading-relaxed">
            With a proven track record of protecting Fortune 500 companies, 
            government agencies, and critical infrastructure, Tech Defenders IT 
            brings unmatched expertise and dedication to every engagement. Our 
            certified professionals combine cutting-edge technology with decades 
            of hands-on experience to deliver security solutions that truly work. 
            We don&apos;t just identify vulnerabilities &mdash; we build resilient 
            security postures that stand the test of time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
