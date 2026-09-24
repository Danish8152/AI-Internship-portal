import React from "react";
import { Check } from "lucide-react";
import Reveal from "./Reveal";
import Highlight from "./Highlight";

const capabilities = [
  "Break a vague request into a clear task with useful context.",
  "Choose a suitable way to use AI or an agent for that task.",
  "Create a small artifact or workflow and improve it through testing.",
  "Explain what the result does, what supports it and what still needs checking.",
];

const programmeHighlights = [
  "No coding or prior experience needed. Curiosity is enough.",
  "Even the advanced topics are taught so they feel simple.",
  "Live demonstrations and assignments you can connect to your studies, projects and work.",
  "Six live sessions of two hours each: 12 live hours in total.",
  "Assignments between live sessions.",
  "Certificate of completion.",
];

const plainWords = [
  { word: "AI agents", meaning: "AI that plans and does several steps for you, and checks its own work as it goes." },
  { word: "RAG", meaning: "The AI looks things up in your own documents before it answers." },
  { word: "Harness", meaning: "The tools, memory and rules built around an AI so it can do real work." },
  { word: "Sub-agents", meaning: "A team of AI helpers, each given one small job, whose results you combine." },
  { word: "APIs", meaning: "A way for one piece of software to ask another service for something." },
  { word: "Prompt injection", meaning: "Sneaky text hidden in a file or page that tries to tell the AI what to do." },
];

const InternshipHighlights = () => {
  return (
    <section id="highlights" className="relative w-full py-14 sm:py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight font-serif">
            AI Internship Highlights
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Build the confidence to say, &ldquo;I can figure out an{" "}
            <Highlight>AI approach.</Highlight>&rdquo;
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Reveal>
            <div className="h-full rounded-xl border border-white/10 bg-[#0f1e33] p-6 sm:p-7 flex flex-col">
              <p className="text-sm sm:text-base font-semibold text-cyan-400 mb-4">
                What you&apos;ll be able to do
              </p>
              <ul className="text-gray-300 text-sm sm:text-base space-y-3">
                {capabilities.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-orange-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-5 text-sm font-semibold text-orange-300">
                A useful next step towards becoming the AI person in your
                class, project team or workplace.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full rounded-xl border border-white/10 bg-[#2a1710] p-6 sm:p-7">
              <p className="text-sm sm:text-base font-semibold text-orange-400 mb-4">
                Key Programme Highlights
              </p>
              <ul className="text-gray-300 text-sm sm:text-base space-y-3">
                {programmeHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-cyan-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="h-full rounded-xl border border-white/10 bg-[#141C2E] p-6 sm:p-7 flex flex-col">
              <p className="text-sm sm:text-base font-semibold text-cyan-400 mb-4">
                AI, in Plain Words
              </p>
              <dl className="space-y-2.5">
                {plainWords.map((t) => (
                  <div key={t.word} className="text-sm sm:text-base">
                    <dt className="inline font-semibold text-gray-100">{t.word}: </dt>
                    <dd className="inline text-gray-400">{t.meaning}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-auto pt-5 text-sm font-semibold text-orange-300">
                You never have to know a term before you arrive. Each one is
                explained first, then shown, then practised.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default InternshipHighlights;
