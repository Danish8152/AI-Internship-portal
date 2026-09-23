import React from "react";
import Reveal from "./Reveal";

interface Stage {
  n: string;
  title: string;
  desc: string;
  color: "orange" | "cyan";
  list?: string[];
}

const stages: Stage[] = [
  {
    n: "01",
    title: "Understand AI",
    desc: "Core concepts, explained simply and shown live.",
    color: "orange",
    list: [
      "Models, tokens and context explained simply",
      "Prompting and clear task briefs",
      "Why AI gets things wrong, and how to check it",
      "Model vs. app vs. agent",
    ],
  },
  {
    n: "02",
    title: "Ground It in Sources",
    desc: "Get answers you can trace back, not guesswork.",
    color: "cyan",
    list: [
      "Context engineering",
      "Retrieval-augmented generation (RAG)",
      "Building a source-grounded evidence table",
    ],
  },
  {
    n: "03",
    title: "Build & Ship",
    desc: "Turn an idea into something you can actually show.",
    color: "orange",
    list: [
      "Apps, games and interactive builds",
      "Testing and giving your build feedback",
      "Hosting and sharing what you make",
    ],
  },
  {
    n: "04",
    title: "Agents & Automation",
    desc: "Multi-step work, with checks along the way.",
    color: "cyan",
    list: [
      "Guiding multi-step agents across tools",
      "Career and content workflows",
      "Reusable skills and reliability checks",
      "Final project submission and review",
    ],
  },
];

const CurriculumJourney: React.FC = () => {
  return (
    <section id="curriculum" className="relative w-full py-14 sm:py-20 px-4 bg-black">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif mb-3">
            Your Path Through the Internship
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Live, cohort-based &middot; Dates to be announced
          </p>
        </Reveal>

        <ol className="relative mt-12 border-l-2 border-white/10 pl-8 sm:pl-10 space-y-12">
          {stages.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 100} className="relative">
              <span
                className={`absolute -left-[41px] sm:-left-[49px] flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold font-serif ${
                  s.color === "orange"
                    ? "border-orange-500 bg-orange-500/10 text-orange-400"
                    : "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                }`}
              >
                {s.n}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-gray-100 font-serif mb-1">
                {s.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3">{s.desc}</p>
              {s.list && (
                <div className="flex flex-wrap gap-2">
                  {s.list.map((item) => (
                    <span
                      key={item}
                      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs sm:text-[13px] text-gray-300 ${
                        s.color === "orange"
                          ? "border-orange-500/25 bg-orange-500/5"
                          : "border-cyan-400/25 bg-cyan-400/5"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default CurriculumJourney;
