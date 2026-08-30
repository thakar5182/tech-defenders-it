import {
  MessageSquare,
  Search,
  ClipboardList,
  Settings,
  Activity,
  HeadphonesIcon,
  LucideIcon,
} from "lucide-react";

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Consultation",
    description:
      "We begin with an in-depth consultation to understand your business objectives, security concerns, and compliance requirements. This foundational step ensures our solutions align perfectly with your needs.",
    icon: MessageSquare,
  },
  {
    id: 2,
    title: "Assessment",
    description:
      "Our experts conduct a thorough assessment of your current security posture, identifying vulnerabilities, gaps, and areas for improvement across your entire digital infrastructure.",
    icon: Search,
  },
  {
    id: 3,
    title: "Planning",
    description:
      "Based on our findings, we develop a comprehensive security strategy tailored to your organization. This roadmap outlines prioritized actions, timelines, and resource requirements.",
    icon: ClipboardList,
  },
  {
    id: 4,
    title: "Implementation",
    description:
      "Our certified professionals deploy security solutions, configure systems, and implement controls with minimal disruption to your operations. We follow industry best practices and standards.",
    icon: Settings,
  },
  {
    id: 5,
    title: "Monitoring",
    description:
      "We provide continuous monitoring and threat detection services, ensuring your defenses remain effective against evolving cyber threats. Real-time alerts keep you informed.",
    icon: Activity,
  },
  {
    id: 6,
    title: "Support",
    description:
      "Ongoing support and maintenance ensure your security infrastructure stays optimized. We provide regular updates, training, and 24/7 incident response when you need it most.",
    icon: HeadphonesIcon,
  },
];