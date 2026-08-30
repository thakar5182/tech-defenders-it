"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { CursorGlow } from "@/components/ui/CursorGlow";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LoadingScreen />
      <ParticleBackground />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
