import React from "react";
import Reveal from "./Reveal";

const reasons = [
  {
    title: "Understand the why.",
    body: "Models, prompts, context and the reasons AI can get things wrong.",
    accent: "text-orange-400",
  },
  {
    title: "See the how.",
    body: "Live demonstrations that show the full path from a task to a working result.",
    accent: "text-cyan-400",
  },
  {
    title: "Build your own.",
    body: "Assignments that help you practise, adapt and check what you create.",
    accent: "text-orange-400",
  },
];

const WhyUnderstanding: React.FC = () => {
  return (
    <section id="why" className="relative w-full py-14 sm:py-20 px-4 bg-gradient-to-b from-black via-[#0a0f1e] to-black border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif leading-tight mb-4">
            Tools change. Your understanding should travel.
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Learn what models can do, what context they need and how to check
            their work. Then apply those ideas across apps, agents and everyday
            tasks.
          </p>
        </Reveal>

        <ol className="mt-10 grid border-t border-white/15 md:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 100}>
              <div
                className={`h-full py-6 md:px-8 ${i === 0 ? "md:pl-0" : ""} ${
                  i === reasons.length - 1 ? "md:pr-0" : ""
                } ${i > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : ""}`}
              >
                <strong className={`block text-xl sm:text-2xl font-bold font-serif mb-2 ${r.accent}`}>
                  {r.title}
                </strong>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <p className="mt-8 max-w-2xl text-sm sm:text-base font-semibold text-gray-300">
          The focus is transferable understanding and practical building—not
          memorising prompt bundles or collecting tool lists.
        </p>
      </div>
    </section>
  );
};

export default WhyUnderstanding;
