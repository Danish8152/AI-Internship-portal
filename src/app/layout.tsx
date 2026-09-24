import type { Metadata } from "next";
import "./globals.css";
import NavBanner from "@/components/layout/NavBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/Footer";
import RegistrationBar from "@/components/layout/RegistrationBar";

export const metadata: Metadata = {
  title: "Finally Get It: The Gen AI & AI Agents Internship | BSERC",
  description:
    "A practical Gen AI and AI agents internship taught live by Karan Bagul: six live sessions of two hours each over two weekends. Start from zero, learn the fundamentals, then build apps, research, content and agentic AI workflows.",
  openGraph: {
    type: "website",
    title: "Finally Get It: The Gen AI & AI Agents Internship",
    description:
      "Start from zero. Learn the fundamentals, then build with Gen AI and AI agents through live demonstrations and assignments.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body id="top" className="min-h-full flex flex-col pb-[64px] sm:pb-[68px]">
        <NavBanner />
        <Navbar />
        {children}
        <Footer />
        <RegistrationBar />
      </body>
    </html>
  );
}
