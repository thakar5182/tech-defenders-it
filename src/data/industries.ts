import {
  Building2,
  Heart,
  GraduationCap,
  Landmark,
  Factory,
  ShoppingBag,
  Rocket,
  LucideIcon,
} from "lucide-react";

export interface Industry {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const industries: Industry[] = [
  {
    id: 1,
    title: "Banking & Finance",
    description:
      "Protect sensitive financial data, ensure regulatory compliance, and defend against sophisticated cyber attacks targeting the financial sector.",
    icon: Building2,
  },
  {
    id: 2,
    title: "Healthcare",
    description:
      "Safeguard patient records, maintain HIPAA compliance, and secure medical devices against emerging cyber threats in the healthcare industry.",
    icon: Heart,
  },
  {
    id: 3,
    title: "Education",
    description:
      "Secure campus networks, protect student data, and defend educational institutions from ransomware and data breach incidents.",
    icon: GraduationCap,
  },
  {
    id: 4,
    title: "Government",
    description:
      "Provide enterprise-grade security solutions for government agencies, ensuring national security and protecting critical infrastructure.",
    icon: Landmark,
  },
  {
    id: 5,
    title: "Manufacturing",
    description:
      "Protect industrial control systems, secure supply chains, and defend manufacturing operations from cyber-physical threats.",
    icon: Factory,
  },
  {
    id: 6,
    title: "Retail & E-commerce",
    description:
      "Secure payment systems, protect customer data, and maintain trust in your e-commerce platform with comprehensive security solutions.",
    icon: ShoppingBag,
  },
  {
    id: 7,
    title: "Startups & Tech",
    description:
      "Build security into your products from day one. We help startups establish robust security practices without slowing down innovation.",
    icon: Rocket,
  },
];