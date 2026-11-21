// Tech Defenders IT - Complete IT & Technology Company Data Source

export interface ITServiceDomain {
  id: string;
  code: string;
  title: string;
  tagline: string;
  category: string;
  desc: string;
  capabilities: string[];
  icon: string;
}

export const IT_SERVICES: ITServiceDomain[] = [
  {
    id: "software-development",
    code: "01",
    title: "Software Development",
    category: "Engineering",
    tagline: "Custom Enterprise & SaaS Ecosystems",
    desc: "We engineer scalable, high-performance custom software, enterprise applications, ERP/CRM platforms, and internal business tools tailored to streamline complex operations.",
    capabilities: [
      "Custom Enterprise Software",
      "SaaS Platform Development",
      "ERP & CRM System Solutions",
      "Internal Business Tools & Dashboards",
      "Scalable REST & GraphQL APIs",
      "Legacy System Modernization",
    ],
    icon: "code",
  },
  {
    id: "website-development",
    code: "02",
    title: "Website Development",
    category: "Web Platforms",
    tagline: "Modern, High-Speed Web Experiences",
    desc: "From corporate digital flagships to high-conversion e-commerce platforms, we build lightning-fast, SEO-optimized, responsive websites powered by modern frameworks like Next.js.",
    capabilities: [
      "Corporate & Business Websites",
      "High-Performance E-commerce",
      "Custom Web Applications",
      "Next.js & React Frameworks",
      "Interactive Digital Experiences",
      "SEO & Speed Optimization",
    ],
    icon: "globe",
  },
  {
    id: "mobile-development",
    code: "03",
    title: "Mobile App Development",
    category: "Mobile",
    tagline: "Native & Cross-Platform Mobile Apps",
    desc: "Building intuitive, high-engagement iOS and Android applications using React Native and native technologies to deliver seamless mobile user experiences.",
    capabilities: [
      "Android Application Engineering",
      "iOS Application Development",
      "Cross-Platform Apps (React Native)",
      "Customer-Facing Mobile Portals",
      "Enterprise Mobility Solutions",
      "App Store Deployment & Optimization",
    ],
    icon: "smartphone",
  },
  {
    id: "ai-automation",
    code: "04",
    title: "AI & Business Automation",
    category: "Intelligence",
    tagline: "Intelligent Workflows & Machine Learning",
    desc: "Empowering businesses with intelligent automation, AI API integrations, automated business workflows, and smart digital assistants that reduce costs and drive efficiency.",
    capabilities: [
      "AI API & LLM Integrations",
      "Business Workflow Automation",
      "Intelligent Process Automation (IPA)",
      "Automated Data Processing",
      "Smart Customer Assistants",
      "Predictive Analytics Pipelines",
    ],
    icon: "cpu",
  },
  {
    id: "ui-ux-design",
    code: "05",
    title: "UI/UX & Digital Design",
    category: "Design",
    tagline: "Human-Centered Spatial & Digital Design",
    desc: "Designing intuitive, visually arresting user interfaces, interactive prototypes, and unified design systems that transform user interactions into seamless brand journeys.",
    capabilities: [
      "User Experience (UX) Architecture",
      "Modern Web & App Interface (UI)",
      "Interactive Prototyping & Wireframing",
      "Design Systems & Brand Toolkits",
      "Usability Audits & Optimization",
      "Motion & Micro-Interaction Design",
    ],
    icon: "palette",
  },
  {
    id: "it-consulting",
    code: "06",
    title: "IT Solutions & Consulting",
    category: "Strategy",
    tagline: "Strategic Digital Transformation",
    desc: "Strategic technology planning, digital transformation roadmaps, infrastructure modernization, and reliable ongoing IT advisory to accelerate business growth.",
    capabilities: [
      "Strategic IT Consulting & Planning",
      "Digital Transformation Roadmaps",
      "Business IT Solutions Architecture",
      "24/7 Managed IT Support",
      "Technology Stack Auditing",
      "Vendor & System Integration",
    ],
    icon: "briefcase",
  },
  {
    id: "cloud-infrastructure",
    code: "07",
    title: "Cloud & Infrastructure",
    category: "Infrastructure",
    tagline: "Scalable Cloud Architecture & DevOps",
    desc: "Architecting, deploying, and managing scalable cloud environments across AWS, Azure, and Google Cloud with robust CI/CD deployment pipelines and 99.9% uptime reliability.",
    capabilities: [
      "Cloud Solutions & Migration",
      "AWS, Azure & GCP Deployments",
      "DevOps & CI/CD Pipelines",
      "Containerization (Docker & Kubernetes)",
      "Serverless & Microservices",
      "Infrastructure Monitoring & Scaling",
    ],
    icon: "cloud",
  },
  {
    id: "cybersecurity",
    code: "08",
    title: "Cybersecurity & Defense",
    category: "Security",
    tagline: "Multi-Layered Cyber Protection",
    desc: "Defending your digital ecosystem with rigorous penetration testing, vulnerability assessments, OWASP web application hardening, and network security audits.",
    capabilities: [
      "Penetration Testing (Web, Network, Mobile)",
      "Vulnerability Assessment & Mitigation",
      "Web Application Security (OWASP Top 10)",
      "API Security & Authentication Hardening",
      "Network Infrastructure Defense",
      "Continuous Security Posture Audits",
    ],
    icon: "shield",
  },
];

export const DIGITAL_SOLUTIONS = [
  {
    id: "sol-erp",
    code: "01",
    title: "Enterprise ERP & CRM Systems",
    tagline: "Integrated Operations Management",
    desc: "Comprehensive business management platforms connecting inventory, customer relationships, sales pipelines, and operations into a single real-time dashboard.",
    features: ["Inventory & Supply Management", "Customer Relationship Tracking", "Automated Billing & Invoices", "Role-Based Access Control"],
  },
  {
    id: "sol-custom-web",
    code: "02",
    title: "Custom Web & Digital Platforms",
    tagline: "High-Traffic Business Engines",
    desc: "Scalable web platforms designed for high throughput, seamless payments, authenticated client portals, and bespoke workflow execution.",
    features: ["Next.js App Router Architecture", "Multi-Tenant Cloud Hosting", "Sub-Second Response Times", "Custom Admin Consoles"],
  },
  {
    id: "sol-automation",
    code: "03",
    title: "Intelligent Business Automation",
    tagline: "Eliminate Repetitive Workflows",
    desc: "Automated data synchronization, customer notification engines, and API integrations that connect disparate business tools seamlessly.",
    features: ["Multi-App Webhook Pipelines", "Automated Reporting & Alerts", "Document & Data Extraction", "Reduced Human Error by 90%"],
  },
  {
    id: "sol-security",
    code: "04",
    title: "Hardened Security Foundations",
    tagline: "Defense Built Into Every Layer",
    desc: "Every platform built by Tech Defenders incorporates proactive cybersecurity: zero-trust principles, sanitized data inputs, and encrypted communication.",
    features: ["End-to-End TLS Encryption", "OWASP Hardened Codebases", "Proactive Threat Scans", "Continuous Compliance Readiness"],
  },
];

export const BUILD_PROCESS = [
  {
    step: "01",
    title: "DISCOVER",
    subtitle: "Understanding Vision & Requirements",
    desc: "We analyze your business goals, target audience, technical challenges, and core operational requirements to establish a clear project scope.",
  },
  {
    step: "02",
    title: "STRATEGIZE",
    subtitle: "Architecture & Solution Roadmap",
    desc: "We formulate the technology roadmap, choosing the right modern tech stack, database architecture, and integration blueprints.",
  },
  {
    step: "03",
    title: "DESIGN",
    subtitle: "Intuitive UI/UX & Interactive Prototypes",
    desc: "Our design team crafts human-centered wireframes, interactive prototypes, and premium interfaces with meticulous attention to detail.",
  },
  {
    step: "04",
    title: "DEVELOP",
    subtitle: "Scalable, Clean & Robust Code",
    desc: "We engineer your software, website, or mobile application using modern frameworks, clean code practices, and scalable microservices.",
  },
  {
    step: "05",
    title: "TEST",
    subtitle: "Performance, Usability & Security Audits",
    desc: "Rigorous quality assurance testing: functional testing, cross-device responsiveness, performance benchmarks, and cybersecurity validation.",
  },
  {
    step: "06",
    title: "DEPLOY",
    subtitle: "Production Launch & Cloud Distribution",
    desc: "Seamless zero-downtime deployment to secure cloud infrastructure, domain configuration, database seeding, and global CDN caching.",
  },
  {
    step: "07",
    title: "EVOLVE",
    subtitle: "Continuous Optimization & Scaling",
    desc: "Ongoing maintenance, proactive monitoring, feature enhancements, and continuous upgrades as your business scales.",
  },
];

export const TECH_STACK = [
  {
    category: "Frontend & Web",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5 / CSS3", "Tailwind CSS"],
  },
  {
    category: "Backend & Systems",
    items: ["Node.js", "Python", "REST & GraphQL APIs", "PostgreSQL / MongoDB", "Microservices"],
  },
  {
    category: "Mobile Platforms",
    items: ["React Native", "Expo", "iOS Architecture", "Android SDK", "Cross-Platform UI"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS Cloud", "Azure", "Docker Containers", "CI/CD Pipelines", "Cloudflare CDN"],
  },
  {
    category: "AI & Automation",
    items: ["AI API Integrations", "Workflow Automation", "Intelligent Bots", "Data Extraction"],
  },
  {
    category: "Cybersecurity Layer",
    items: ["Penetration Testing", "OWASP Top 10", "Vulnerability Scans", "Zero-Trust Architecture"],
  },
];

export const CLIENT_REFERENCES = [
  {
    name: "M&M Innovation",
    tagline: "Enterprise Technology & Engineering",
    scope: "Technology Architecture & Security Assessment",
  },
  {
    name: "Ananta Industries",
    tagline: "Industrial & Manufacturing Solutions",
    scope: "Digital Infrastructure & Operations Modernization",
  },
  {
    name: "Aakash Electronics",
    tagline: "Consumer Electronics & Retail",
    scope: "E-Commerce Web Platform & Digital Presence",
  },
];

export const COMPANY_CONTACT = {
  name: "Tech Defenders IT",
  email: "techdefenderss@gmail.com",
  altEmail: "info@techdefenderss.com",
  phone: "+91 7600426578",
  whatsappUrl: "https://wa.me/917600426578?text=Hello%20Tech%20Defenders%2C%20I%20would%20like%20to%20discuss%20a%20project.",
  address: "1/9 Bhaktinagar Society, Bapunagar, Ahmedabad, Gujarat, India - 380024",
  website: "https://www.techdefenderss.com/",
};


// Backward compatibility exports for subpages
export const SERVICES = IT_SERVICES.map((s) => ({
  id: s.code,
  title: s.title,
  desc: s.desc,
  feats: s.capabilities.slice(0, 3),
}));

export const INSIGHTS = [
  {
    slug: "modern-enterprise-software-architecture",
    tag: "Software Engineering",
    title: "Building Modern Enterprise Software: Scalability, Microservices & High Reliability",
    desc: "Discover how modern businesses decouple monolithic legacy tools into high-throughput microservices and reactive interfaces.",
    author: "Tech Defenders Architecture Team",
    date: "Aug 15, 2026",
    read: "6 min",
  },
  {
    slug: "intelligent-business-automation",
    tag: "AI & Automation",
    title: "Intelligent Business Automation: Cutting Operational Friction in 2026",
    desc: "How automated webhook pipelines, intelligent assistants, and data integration engines eliminate 90% of manual repetitive tasks.",
    author: "Tech Defenders Automation Lab",
    date: "Aug 02, 2026",
    read: "8 min",
  },
  {
    slug: "zero-trust-cloud-infrastructure",
    tag: "Cloud & Cybersecurity",
    title: "Zero-Trust Cloud Deployments: Defense-Grade Security on AWS & Azure",
    desc: "Implementing zero-trust access, continuous IAM auditing, and automated vulnerability scanning across cloud infrastructure.",
    author: "Tech Defenders Security Team",
    date: "Jul 20, 2026",
    read: "10 min",
  },
];
