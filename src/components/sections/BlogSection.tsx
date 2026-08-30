"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { blogPosts } from "@/data/blog";
import SectionHeader from "@/components/ui/SectionHeader";

export default function BlogSection() {
  const featured = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0B1224] to-[#0A0A0A] opacity-50" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Latest Insights"
          subtitle="Stay informed with the latest cybersecurity trends, threat intelligence, and best practices from our expert team."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="glass-card rounded-2xl overflow-hidden h-full">
                  {/* Image placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-[rgba(212,175,55,0.05)] to-transparent overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🛡️</div>
                        <span className="text-xs text-[#A8B2C5] font-mono">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60" />
                  </div>

                  <div className="p-6">
                    {/* Category badge */}
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[rgba(212,175,55,0.05)] text-[#D4AF37] mb-3">
                      {post.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#FFD700] transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-[#A8B2C5] mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-[#A8B2C5]">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.05)] px-8 py-3 text-sm font-medium text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)] hover:border-[rgba(212,175,55,0.5)] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300"
          >
            View All Articles
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
