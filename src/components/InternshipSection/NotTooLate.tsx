import React from "react";
import { Check } from "lucide-react";
import Reveal from "./Reveal";
import Highlight from "./Highlight";

const points = [
  { title: "Start from zero.", body: "No coding knowledge and no prior experience needed." },
  { title: "Bring curiosity.", body: "That is the only requirement." },
  {
    title: "Advanced, without the overwhelm.",
    body: "Even the advanced topics are taught so they feel easy, one at a time.",
  },
];

const NotTooLate: React.FC = () => {
  return (
    <section id="start" className="relative w-full py-14 sm:py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[6fr_5fr] lg:gap-16 lg:items-start">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif leading-tight mb-5">
            Feeling behind on GenAI? It&apos;s{" "}
            <Highlight>not too late.</Highlight>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl">
            Everyone seems to be talking about AI agents. If it all sounds like
            too much, start here. The internship begins with the basics and
            builds up one idea at a time, until it clicks.
          </p>
          <p className="mt-6 text-base sm:text-lg font-bold text-orange-400 max-w-md">
            By the end, you&apos;ll know where to start, what to ask and how to
            check the result.
          </p>
        </Reveal>

        <ul className="border-t border-white/15">
          {points.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 100}>
              <div className="grid grid-cols-[40px_1fr] gap-x-4 gap-y-1 border-b border-white/10 py-5">
                <span className="row-span-2 flex h-10 w-10 items-center justify-center rounded-full border border-orange-400/50 bg-orange-500/15 text-orange-300">
                  <Check className="h-5 w-5" />
                </span>
                <strong className="text-lg font-bold text-gray-100">{p.title}</strong>
                <span className="text-sm sm:text-base text-gray-400">{p.body}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NotTooLate;
