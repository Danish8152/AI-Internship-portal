import React from "react";
import { INTERNSHIP } from "@/data/internship";

interface InfoBoxProps {
  title: string;
  content: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, content }) => (
  <div className="rounded-lg bg-black/40 p-4 sm:p-5 border border-white/5 hover:border-cyan-500/30 transition duration-300">
    <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">
      {title}
    </h4>
    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
      {content}
    </p>
  </div>
);

const AboutProgramme: React.FC = () => {
  return (
    <section className="relative overflow-hidden w-full py-10 px-4 bg-black">
      <div className="relative max-w-6xl mx-auto">
        <h2 className="text-center text-3xl md:text-5xl font-bold text-white pb-8 leading-tight font-serif">
          About the Programme
        </h2>

        <div className="rounded-xl shadow-2xl bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)] p-6 sm:p-8 lg:p-10">
          <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              <span className="text-white font-semibold">
                {INTERNSHIP.fullName}
              </span>{" "}
              is a practical Gen AI and AI agents internship taught live by{" "}
              {INTERNSHIP.instructor}: six live sessions of two hours each over
              two weekends. Start from zero, learn the fundamentals, then build
              apps, research, content and agentic AI workflows.
            </p>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Understand how AI works, then use it to build apps and games,
              strengthen your research, create content and automate useful
              tasks. Learn through live demonstrations and assignments you can
              connect to your studies, projects and work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <InfoBox title="Duration" content="About two weeks" />
            <InfoBox
              title="Live sessions"
              content="Six live sessions of two hours each: 12 live hours in total"
            />
            <InfoBox
              title="Schedule"
              content="Friday, Saturday and Sunday on both weekends. Exact dates will be announced."
            />
            <InfoBox
              title="Format"
              content="Live demonstrations, guided practice and assignments between live sessions"
            />
            <InfoBox
              title="Eligibility"
              content="No coding knowledge or prior experience needed. Curiosity is the only requirement."
            />
            <InfoBox title="Certificate" content="Certificate of completion" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProgramme;
