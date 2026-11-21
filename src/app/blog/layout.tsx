import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Blog",
  description: "Read the latest insights, news, and technical articles on cybersecurity, enterprise IT, and web development from Tech Defenders.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

