export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Rising Threat of Ransomware: How to Protect Your Organization in 2026",
    excerpt:
      "Ransomware attacks have evolved dramatically. Learn about the latest tactics threat actors are using and how to build a resilient defense strategy.",
    category: "Threat Intelligence",
    author: "Alex Turner",
    date: "July 15, 2026",
    readTime: "8 min read",
    image: "/images/blog-ransomware.jpg",
    slug: "rising-threat-ransomware-2026",
  },
  {
    id: 2,
    title: "Zero Trust Architecture: A Practical Implementation Guide",
    excerpt:
      "Moving beyond traditional perimeter-based security. Discover how to implement a zero trust architecture that protects your modern workforce.",
    category: "Security Architecture",
    author: "Dr. Lisa Wang",
    date: "July 10, 2026",
    readTime: "12 min read",
    image: "/images/blog-zero-trust.jpg",
    slug: "zero-trust-architecture-guide",
  },
  {
    id: 3,
    title: "Cloud Security Best Practices for 2026",
    excerpt:
      "As organizations continue their cloud migration journey, understanding the latest security best practices is crucial for protecting your digital assets.",
    category: "Cloud Security",
    author: "Marcus Johnson",
    date: "July 5, 2026",
    readTime: "10 min read",
    image: "/images/blog-cloud-security.jpg",
    slug: "cloud-security-best-practices-2026",
  },
  {
    id: 4,
    title: "The Human Factor: Building a Security-Conscious Culture",
    excerpt:
      "Technology alone cannot protect your organization. Learn how to build a security-first culture that empowers employees to be your first line of defense.",
    category: "Security Awareness",
    author: "Sarah Mitchell",
    date: "June 28, 2026",
    readTime: "6 min read",
    image: "/images/blog-human-factor.jpg",
    slug: "building-security-conscious-culture",
  },
  {
    id: 5,
    title: "API Security: Protecting Your Digital Supply Chain",
    excerpt:
      "APIs are the backbone of modern applications. Understand the critical security considerations and best practices for securing your API ecosystem.",
    category: "Application Security",
    author: "David Park",
    date: "June 20, 2026",
    readTime: "9 min read",
    image: "/images/blog-api-security.jpg",
    slug: "api-security-digital-supply-chain",
  },
  {
    id: 6,
    title: "Incident Response Planning: Are You Ready for the Inevitable?",
    excerpt:
      "Every organization will face a security incident. The question is not if, but when. Learn how to build an effective incident response plan.",
    category: "Incident Response",
    author: "Emily Chen",
    date: "June 15, 2026",
    readTime: "7 min read",
    image: "/images/blog-incident-response.jpg",
    slug: "incident-response-planning-guide",
  },
];