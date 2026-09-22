import type { Metadata } from "next";
import "./globals.css";
import NavBanner from "@/components/layout/NavBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Def-Space Autumn Internship | BSERC",
  description:
    "Def-Space Autumn Internship — a flagship initiative by Bharat Space Education Research Centre (BSERC) in Defence, Space Science, and Emerging Technologies.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <NavBanner />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
