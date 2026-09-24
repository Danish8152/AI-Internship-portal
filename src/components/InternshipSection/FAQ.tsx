import React from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal";

const faqs: Array<{ q: string; a: string }> = [
  {
    q: "Who is this designed for?",
    a: "Students are the main audience, with examples that also apply to early-career and working professionals. Teachers and researchers can adapt the study and evidence workflows to their work.",
  },
  {
    q: "Do I need a technical background?",
    a: "No. You do not need any coding knowledge or prior experience, and starting from zero is fine. Curiosity is the only requirement. The teaching starts with the fundamentals and explains the reasoning behind each demonstration. The final device, account and setup checklist will be shared before enrolment.",
  },
  {
    q: "Is it too late to start learning Gen AI?",
    a: "No. The programme starts with the fundamentals, so it does not matter how much of the conversation you feel you have missed. You learn what is happening first, then build up step by step.",
  },
  {
    q: "Some of these topics sound advanced. Will I be lost?",
    a: "No. Every idea is explained in plain words first, then shown on a real task, and only then practised or demonstrated. Terms like agents, RAG or APIs sound complicated until you see them work, and that is what the live sessions are for. You never need to know a term in advance.",
  },
  {
    q: "How long are the sessions, and when do they run?",
    a: "There are six live sessions of two hours each, so twelve live hours in total, on Friday, Saturday and Sunday across two weekends. Exact dates will be announced, and assignments fill the time between sessions.",
  },
  {
    q: "Will we only learn prompting?",
    a: "Prompting and context are part of the foundation. The programme also explores apps, games, research, data, content workflows, agents, reusable skills and ways to check the output.",
  },
  {
    q: "Will I build every example on the page?",
    a: "The examples show the range of applications. The live programme will include selected demonstrations, guided builds and assignments; the final mix will be shared with the cohort.",
  },
  {
    q: "How do the assignments work?",
    a: "Assignments help you apply what you see in the live sessions. The workload, submission process and feedback arrangements will be shared with the final schedule.",
  },
  {
    q: "Which tools and subscriptions will I need?",
    a: "The tool and account checklist will be confirmed before enrolment, including any paid access needed for independent practice.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes, you will receive a certificate of completion. The issuing organisation and completion criteria will be announced with the final programme details.",
  },
  {
    q: "Is this an employment internship or a practical learning programme?",
    a: "The programme described here centres on live teaching, demonstrations and assignments. Any organisational internship terms will be stated in the official joining details.",
  },
];

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="relative w-full py-14 sm:py-20 px-4 bg-black">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif mb-3">
            Questions, answered plainly.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Short, honest answers. Anything still being confirmed says so.
          </p>
        </Reveal>
        <div className="border-t border-white/10">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-white/10 py-5">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
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
