import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our comprehensive IT solutions including Penetration Testing, SOC Monitoring, UI/UX Design, and Web Application Security.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

