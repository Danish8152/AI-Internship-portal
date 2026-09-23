import React from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import Highlight from "./Highlight";

const FinalCTA: React.FC = () => {
  return (
    <section className="relative w-full py-16 sm:py-24 px-4 bg-gradient-to-br from-[#1a0f05] via-black to-[#031014] border-y border-white/10 text-center">
      <Reveal className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif mb-4">
          Be the <Highlight color="cyan">AI person</Highlight> people
          turn to.
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mb-8">
          Start with understanding. Build through practice. Apply it where
          it matters to you.
        </p>
        <a
          href="#format"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-sm font-bold text-black transition hover:bg-orange-400 active:scale-95"
        >
          Explore the AI Internship
          <ArrowRight className="h-4 w-4" />
        </a>
      </Reveal>
    </section>
  );
};

export default FinalCTA;
