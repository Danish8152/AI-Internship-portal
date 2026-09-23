import type { Metadata } from "next";
import "./globals.css";
import NavBanner from "@/components/layout/NavBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/Footer";
import RegistrationBar from "@/components/layout/RegistrationBar";

export const metadata: Metadata = {
  title: "Gen AI & AI Agents Internship | BSERC",
  description:
    "The Gen AI & AI Agents Internship — a practical, hands-on programme by Bharat Space Education Research Centre (BSERC) covering generative AI, AI agents and applied technology.",
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
