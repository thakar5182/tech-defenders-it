import type { Metadata } from "next";
import TeamContent from "@/components/team/TeamContent";

export const metadata: Metadata = {
  title: "Our Team | Tech Defenders IT",
  description:
    "Meet the leadership team at Tech Defenders IT - Founder & CEO Jigar Thakar and Co-Founder Harshil Rajgor.",
};

export default function TeamPage() {
  return <TeamContent />;
}
