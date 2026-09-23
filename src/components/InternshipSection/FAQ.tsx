import React from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal";

const faqs: Array<{ q: string; a: string }> = [
  {
    q: "Who is this internship for?",
    a: "Students, researchers and PhD scholars, working professionals and creators — anyone who wants to move from using AI casually to using it with real skill.",
  },
  {
    q: "Do I need a technical or coding background?",
    a: "No. No coding knowledge or prior experience is required. The programme starts from the fundamentals and builds up from there.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes, a certificate of completion is awarded. Issuing details will be shared with the final programme information.",
  },
  {
    q: "What will I actually build?",
    a: "Hands-on projects across apps, research workflows, AI agents and creative tools — guided by BSERC mentors.",
  },
  {
    q: "When does it start and how much does it cost?",
    a: "Dates, format and fees are being finalised and will be announced soon. Reach out and we'll notify you first.",
  },
  {
    q: "Is this the same as the Def-Space Autumn Internship?",
    a: "No. This is a separate BSERC programme focused entirely on Generative AI and AI Agents.",
  },
];

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="relative w-full py-14 sm:py-20 px-4 bg-black">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif text-center mb-10">
            Questions, answered plainly.
          </h2>
        </Reveal>
        <div className="border-t border-white/10">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-white/10 py-5">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                <span className="text-gray-100 font-semibold text-base sm:text-lg">
                  {f.q}
                </span>
                <ChevronDown className="h-5 w-5 text-orange-500 flex-shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-gray-400 text-sm sm:text-base leading-relaxed">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
