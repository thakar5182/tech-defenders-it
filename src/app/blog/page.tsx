import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog | Tech Defenders IT",
  description:
    "Stay informed with the latest cybersecurity trends, threat intelligence, and best practices from the experts at Tech Defenders IT.",
};

export default function BlogPage() {
  return (
    <div className="pt-20">
      <div className="relative py-16 lg:py-20 text-center">
        <div className="absolute inset-0 grid-pattern" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Latest{" "}
            <span className="text-gradient">Insights</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Stay informed with the latest cybersecurity trends, threat
            intelligence, and best practices from our expert team.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <article key={post.id} className="group">
              <Link href={`/blog/${post.slug}`}>
                <div className="glass-card rounded-2xl overflow-hidden h-full">
                  <div className="relative h-48 bg-gradient-to-br from-[#00D9FF]/10 to-[#7C3AED]/10 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🛡️</div>
                        <span className="text-xs text-gray-500 font-mono">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60" />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#00D9FF]/10 text-[#00D9FF] mb-3">
                      {post.category}
                    </span>
                    <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00D9FF] transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
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
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}