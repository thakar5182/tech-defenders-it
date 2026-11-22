import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { ClientLayout } from "@/components/ClientLayout";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.techdefenderss.com'),
  title: {
    default: "Tech Defenders IT | Cybersecurity & Web Solutions",
    template: "%s | Tech Defenders IT"
  },
  description: "Protecting businesses and securing tomorrow. Leading IT and Cybersecurity company providing penetration testing, web development, SOC monitoring, and enterprise tech solutions.",
  keywords: ["Tech", "Tech Defenders", "Tech Defenders IT", "Cybersecurity", "Web Development", "IT Solutions Ahmedabad", "Penetration Testing", "Web Application Security", "IT Company"],
  authors: [{ name: "Tech Defenders IT" }],
  creator: "Tech Defenders IT",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.techdefenderss.com",
    title: "Tech Defenders IT | Cybersecurity & Web Solutions",
    description: "Enterprise-grade IT and cybersecurity solutions to protect your business and digital presence.",
    siteName: "Tech Defenders IT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Defenders IT | Cybersecurity & Web Solutions",
    description: "Enterprise-grade IT and cybersecurity solutions to protect your business.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-bg text-ink min-h-screen overflow-x-hidden">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
