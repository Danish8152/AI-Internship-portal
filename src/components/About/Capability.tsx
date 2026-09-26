import React from "react";
import { Check } from "lucide-react";
import Reveal from "@/components/InternshipSection/Reveal";
import Highlight from "@/components/InternshipSection/Highlight";

const abilities = [
  "Break a vague request into a clear task with useful context.",
  "Choose a suitable way to use AI or an agent for that task.",
  "Create a small artifact or workflow and improve it through testing.",
  "Explain what the result does, what supports it and what still needs checking.",
];

const Capability: React.FC = () => {
  return (
    <section className="relative w-full py-10 sm:py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif leading-tight">
            Build the confidence to say, &ldquo;I can figure out an{" "}
            <Highlight>AI approach.</Highlight>&rdquo;
          </h2>
        </Reveal>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {abilities.map((item, i) => (
            <Reveal as="li" key={item} delay={i * 80}>
              <div className="flex h-full items-start gap-4 rounded-xl border border-white/10 bg-gray-900/50 p-5 sm:p-6 transition-all duration-300 hover:border-cyan-400/30 hover:bg-gray-900/70">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-orange-400/50 bg-orange-500/15 text-orange-300">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm sm:text-base leading-relaxed text-gray-300">
                  {item}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 text-center text-base sm:text-lg font-bold text-orange-400">
          A useful next step towards becoming the AI person in your class,
          project team or workplace.
        </p>
      </div>
    </section>
  );
};

export default Capability;
