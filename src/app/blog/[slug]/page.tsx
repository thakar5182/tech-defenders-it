import { INSIGHTS } from "@/data";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import Link from "next/link";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = INSIGHTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-28 pb-24 min-h-screen relative select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-hero-grid bg-[48px_48px] opacity-15 mask-hero" />
        <div className="absolute inset-0 bg-scanlines opacity-10" />
      </div>

      <div className="container w-[min(880px,92%)] mx-auto relative z-10">
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs text-cyan hover:text-white transition-colors mb-8"
          >
            <span>←</span>
            <span>BACK TO INSIGHTS DIRECTORY</span>
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="p-8 md:p-12 border border-white/10 bg-black/70 backdrop-blur-xl cyber-corner mb-12">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <span className="font-mono text-xs text-cyan tracking-[0.2em] uppercase font-bold">
                // {post.tag}
              </span>
              <span className="font-mono text-xs text-ink-muted">
                {post.read} READ
              </span>
            </div>

            <h1 className="text-[clamp(26px,4vw,48px)] font-bold tracking-tight text-ink leading-[1.1] mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 pb-6 border-b border-white/10 mb-8 font-mono text-xs text-ink-dim">
              <div className="w-10 h-10 border border-cyan/40 bg-cyan/10 flex items-center justify-center text-cyan font-bold">
                TD
              </div>
              <div>
                <div className="font-bold text-ink">{post.author}</div>
                <div className="text-[11px] text-ink-muted">{post.date} • Published Engineering Article</div>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex flex-col gap-6 text-sm md:text-base text-ink-dim leading-relaxed">
              <p className="text-base md:text-lg text-ink font-medium leading-relaxed">
                {post.desc}
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-ink mt-4">
                1. Architectural Foundations
              </h2>
              <p>
                In today&apos;s hyper-competitive digital landscape, building scalable software requires decoupling monolithic architectures into reactive, modular microservices. By leveraging frameworks like Next.js for server-rendered interfaces alongside distributed Node.js/Python backends, enterprises ensure sub-second latency and seamless horizontal scaling.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-ink mt-4">
                2. Embedded Security & Zero-Trust
              </h2>
              <p>
                Security cannot be bolted on as an afterthought. From input sanitization and token-based RBAC authentication to continuous automated vulnerability scanning, defense-first engineering guarantees that modern digital platforms remain resilient against evolving threat vectors.
              </p>

              <div className="p-4 border-l-2 border-cyan bg-cyan/5 font-mono text-xs text-ink-dim my-2">
                <span className="text-cyan font-bold mr-2">CORE TAKEAWAY:</span>
                Clean code, robust automated testing pipelines, and proactive zero-trust enforcement are the hallmarks of modern high-performing digital systems.
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-ink mt-4">
                3. Conclusion & Strategic Action
              </h2>
              <p>
                As business demands evolve, organizations that invest in clean, secure, and automated technology foundations will continue to lead their industries. Tech Defenders IT specializes in architecting and implementing these high-standard solutions.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Bottom CTA Block */}
        <Reveal delay={0.2}>
          <div className="p-8 border border-cyan/40 bg-black/60 backdrop-blur-xl cyber-corner text-center">
            <h3 className="text-xl md:text-2xl font-bold text-ink mb-2">
              Ready to implement these technology standards?
            </h3>
            <p className="text-xs md:text-sm text-ink-dim max-w-lg mx-auto mb-6">
              Connect with our senior engineering leads to discuss your software architecture or digital project.
            </p>
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-cyan hover:bg-cyan/90 text-[#030508] font-mono text-xs font-bold tracking-wider transition-all inline-block"
            >
              [ START A PROJECT ]
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
