import type { Metadata } from "next";
import AboutProgramme from "@/components/About/AboutProgramme";
import { CoreTech } from "@/components/global/CoreTech";
import Capability from "@/components/About/Capability";
import WhoItsFor from "@/components/About/WhoItsFor";
import Instructor from "@/components/About/Instructor";
import JoiningDetails from "@/components/About/JoiningDetails";

export const metadata: Metadata = {
  title: "About | Gen AI & AI Agents Internship | BSERC",
  description:
    "About Finally Get It: The Gen AI & AI Agents Internship: six live sessions of two hours each over two weekends. Start from zero, learn the fundamentals, then build apps, research, content and agentic AI workflows.",
};

export default function AboutPage() {
  return (
    <div className="bg-black">
      <AboutProgramme />
      <CoreTech />
      <Capability />
      <WhoItsFor />
      <Instructor />
      <JoiningDetails />
    </div>
  );
}
