import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the experts behind Tech Defenders IT. Dedicated professionals in cybersecurity, web development, and enterprise IT.",
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

