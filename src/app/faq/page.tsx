import type { Metadata } from "next";
import FAQ from "@/components/InternshipSection/FAQ";

export const metadata: Metadata = {
  title: "FAQs | Gen AI & AI Agents Internship | BSERC",
  description:
    "Answers to common questions about the BSERC Gen AI & AI Agents Internship — who it's for, format, certificate and more.",
};

export default function FAQPage() {
  return (
    <div className="bg-black">
      <FAQ />
    </div>
  );
}
