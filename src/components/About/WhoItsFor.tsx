import React from "react";
import Reveal from "@/components/InternshipSection/Reveal";

const audiences = [
  {
    title: "Students",
    body: "Build projects, improve your study workflow, explore research and create work you can explain and show.",
  },
  {
    title: "Early-career and working professionals",
    body: "Apply AI to research, reports, presentations, career material and repetitive tasks in your working day.",
  },
  {
    title: "Teachers and researchers",
    body: "Adapt the same approach to learning resources, evidence and knowledge work.",
  },
];

const WhoItsFor: React.FC = () => {
  return (
    <section className="relative w-full py-10 sm:py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-serif text-center mb-10">
            Bring a task from your world.
          </h2>
        </Reveal>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {audiences.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 100}>
              <div className="h-full rounded-xl border border-white/10 bg-gray-900/50 p-6 sm:p-8 transition-all duration-300 hover:border-purple-400/30 hover:bg-gray-900/70">
                <h3 className="mb-3 font-serif text-lg sm:text-xl font-bold text-orange-400">
                  {a.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-gray-300">
                  {a.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhoItsFor;
