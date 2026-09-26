import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/InternshipSection/Reveal";
import { INTERNSHIP } from "@/data/internship";

const facts = [
  "About two weeks.",
  "Six live sessions of two hours each: 12 live hours in total.",
  "Friday, Saturday and Sunday on both weekends. Exact dates will be announced.",
  "Assignments between live sessions.",
  "Certificate of completion.",
  `Led by ${INTERNSHIP.instructor}.`,
];

const JoiningDetails: React.FC = () => {
  return (
    <section
      id="joining"
      className="relative w-full py-10 sm:py-16 px-4 bg-black"
    >
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[6fr_5fr] lg:gap-16 lg:items-start">
        <Reveal>
          <h2 className="mb-8 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
            Your next step starts with a practical plan.
          </h2>
          <ul className="border-t border-white/15">
            {facts.map((fact) => (
              <li
                key={fact}
                className="flex items-start gap-3 border-b border-white/10 py-4 text-sm font-medium leading-relaxed text-gray-200 sm:text-base"
              >
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-orange-400" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#0c1a2e] to-[#26140a] p-6 shadow-2xl sm:p-8">
            <h3 className="mb-4 font-serif text-xl font-bold text-white sm:text-2xl">
              Joining details
            </h3>
            <p className="mb-4 flex items-center gap-3 text-base font-bold text-white sm:text-lg">
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
              </span>
              Registrations are open.
            </p>
            <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
              Dates, fees and joining details will be announced.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">
              The issuing organisation and completion criteria for the
              certificate will be announced with the final programme details.
            </p>
            <Link
              href="/faq"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-400 underline decoration-cyan-400 decoration-2 underline-offset-4 transition hover:text-orange-300"
            >
              Questions, answered plainly.
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default JoiningDetails;
