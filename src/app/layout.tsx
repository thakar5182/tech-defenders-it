import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const SKETRICGEN_AGENT_ID = "skflow_84691519-e0fc-409a-b963-3bf7285bbc54";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech Defenders IT | Enterprise Cybersecurity Solutions",
  description:
    "Protecting businesses and securing tomorrow. Enterprise-grade cybersecurity solutions including penetration testing, vulnerability assessment, SOC monitoring, and incident response. Trusted by 500+ enterprises worldwide.",
  keywords:
    "cybersecurity, penetration testing, vulnerability assessment, SOC monitoring, incident response, cloud security, network security, IT security",
  openGraph: {
    title: "Tech Defenders IT | Enterprise Cybersecurity Solutions",
    description:
      "Protecting businesses and securing tomorrow with enterprise-grade cybersecurity solutions.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#050816] text-[#F8FAFC] antialiased" suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
      <Script
        id="sketricgen-tech-defenders-agent"
        src="https://jswidget.sketricgen.ai/widget-embed.js"
        data-agent-id={SKETRICGEN_AGENT_ID}
        strategy="afterInteractive"
      />
    </html>
  );
}
