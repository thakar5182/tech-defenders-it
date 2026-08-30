export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "CISO",
    company: "FinSecure Bank",
    content:
      "Tech Defenders IT transformed our security posture completely. Their penetration testing team identified critical vulnerabilities that our internal team had missed. The professionalism and depth of their analysis is outstanding.",
    rating: 5,
  },
  {
    id: 2,
    name: "James Rodriguez",
    role: "CTO",
    company: "HealthBridge Systems",
    content:
      "Working with Tech Defenders IT was a game-changer for our healthcare platform. They helped us achieve HIPAA compliance while implementing robust security measures that protect our patients' sensitive data.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "VP of Engineering",
    company: "CloudScale Technologies",
    content:
      "The SOC monitoring service from Tech Defenders IT has been invaluable. Their 24/7 monitoring team detected and mitigated a sophisticated attack within minutes. Their response time is exceptional.",
    rating: 5,
  },
  {
    id: 4,
    name: "Michael Thompson",
    role: "IT Director",
    company: "EduPrime University",
    content:
      "We engaged Tech Defenders IT for a comprehensive security assessment across our campus network. Their team was thorough, professional, and delivered actionable recommendations that significantly improved our security.",
    rating: 5,
  },
  {
    id: 5,
    name: "Priya Patel",
    role: "CEO",
    company: "NexGen Manufacturing",
    content:
      "Tech Defenders IT helped us secure our industrial control systems and protect our intellectual property. Their understanding of both IT and OT security is impressive. Highly recommended for manufacturing companies.",
    rating: 5,
  },
];