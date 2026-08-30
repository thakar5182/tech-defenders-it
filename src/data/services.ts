import {
  Shield,
  Search,
  Globe,
  Key,
  Network,
  Cloud,
  Eye,
  AlertTriangle,
  Fingerprint,
  Users,
  Monitor,
  Cpu,
  LucideIcon,
} from "lucide-react";

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: 1,
    title: "Penetration Testing",
    description:
      "Simulate real-world cyber attacks to identify vulnerabilities in your systems, networks, and applications before malicious actors exploit them.",
    icon: Shield,
    color: "#FFD700",
    features: [
      "Network penetration testing",
      "Web application testing",
      "Mobile app security testing",
      "Social engineering simulations",
      "Red team exercises",
    ],
  },
  {
    id: 2,
    title: "Vulnerability Assessment",
    description:
      "Comprehensive scanning and analysis of your digital infrastructure to identify, classify, and prioritize security weaknesses.",
    icon: Search,
    color: "#D4AF37",
    features: [
      "Automated vulnerability scanning",
      "Manual verification",
      "Risk prioritization",
      "Remediation guidance",
      "Continuous monitoring",
    ],
  },
  {
    id: 3,
    title: "Web Application Security",
    description:
      "Protect your web applications from OWASP Top 10 threats, SQL injection, XSS, and other critical vulnerabilities with our expert security assessments.",
    icon: Globe,
    color: "#FFD700",
    features: [
      "OWASP Top 10 assessment",
      "Code review and analysis",
      "API security testing",
      "Authentication testing",
      "Session management review",
    ],
  },
  {
    id: 4,
    title: "API Security Testing",
    description:
      "Secure your APIs against unauthorized access, data breaches, and injection attacks with specialized security testing and validation.",
    icon: Key,
    color: "#D4AF37",
    features: [
      "REST and GraphQL testing",
      "Authentication bypass testing",
      "Rate limiting assessment",
      "Data exposure analysis",
      "Token security validation",
    ],
  },
  {
    id: 5,
    title: "Network Security",
    description:
      "Defend your network infrastructure with comprehensive security assessments, firewall audits, and intrusion detection implementations.",
    icon: Network,
    color: "#FFD700",
    features: [
      "Firewall configuration audit",
      "Network segmentation review",
      "IDS/IPS implementation",
      "VPN security assessment",
      "Wireless network security",
    ],
  },
  {
    id: 6,
    title: "Cloud Security",
    description:
      "Secure your cloud environments across AWS, Azure, and GCP with best-practice configurations, compliance checks, and threat monitoring.",
    icon: Cloud,
    color: "#D4AF37",
    features: [
      "Cloud configuration review",
      "IAM policy assessment",
      "Compliance validation",
      "Data encryption audit",
      "Cloud threat detection",
    ],
  },
  {
    id: 7,
    title: "SOC Monitoring",
    description:
      "24/7 Security Operations Center monitoring, threat detection, and incident response to keep your business protected around the clock.",
    icon: Eye,
    color: "#FFD700",
    features: [
      "24/7 security monitoring",
      "Threat intelligence feeds",
      "SIEM management",
      "Real-time alerting",
      "Incident triage",
    ],
  },
  {
    id: 8,
    title: "Incident Response",
    description:
      "Rapid and effective incident response services to contain, eradicate, and recover from security breaches with minimal business impact.",
    icon: AlertTriangle,
    color: "#D4AF37",
    features: [
      "Incident containment",
      "Forensic investigation",
      "Malware analysis",
      "Recovery planning",
      "Post-incident review",
    ],
  },
  {
    id: 9,
    title: "Digital Forensics",
    description:
      "Expert forensic investigation services to uncover digital evidence, analyze security incidents, and support legal proceedings.",
    icon: Fingerprint,
    color: "#FFD700",
    features: [
      "Disk and memory forensics",
      "Network forensics",
      "Mobile device forensics",
      "Cloud forensics",
      "Expert witness testimony",
    ],
  },
  {
    id: 10,
    title: "Security Awareness Training",
    description:
      "Empower your employees with the knowledge and skills to identify and prevent cyber threats through comprehensive training programs.",
    icon: Users,
    color: "#D4AF37",
    features: [
      "Phishing simulations",
      "Interactive training modules",
      "Compliance training",
      "Security best practices",
      "Progress tracking",
    ],
  },
  {
    id: 11,
    title: "Managed IT Services",
    description:
      "Comprehensive IT management services including proactive maintenance, help desk support, and strategic technology planning.",
    icon: Monitor,
    color: "#FFD700",
    features: [
      "24/7 help desk support",
      "Proactive maintenance",
      "Patch management",
      "Backup and disaster recovery",
      "IT strategy consulting",
    ],
  },
  {
    id: 12,
    title: "IT Infrastructure Solutions",
    description:
      "Design, implement, and manage robust IT infrastructure that scales with your business while maintaining security and performance.",
    icon: Cpu,
    color: "#D4AF37",
    features: [
      "Infrastructure design",
      "Server and storage solutions",
      "Virtualization",
      "Disaster recovery planning",
      "Performance optimization",
    ],
  },
];
