import React from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { INTERNSHIP, REGISTRATION_URL } from "@/data/internship";

const facts: Array<React.ReactNode> = [
  "About two weeks.",
  "Six live sessions of two hours each: 12 live hours in total.",
  "Friday, Saturday and Sunday on both weekends. Exact dates will be announced.",
  "Assignments between live sessions.",
  "Certificate of completion.",
  <>Led by {INTERNSHIP.instructor}.</>,
];

const FormatAndJoining: React.FC = () => {
  return (
    <section id="format" className="relative w-full py-14 sm:py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-14 items-start">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif leading-tight mb-8">
            Your next step starts with a practical plan.
          </h2>
          <ul className="border-t border-white/15">
            {facts.map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-3 border-b border-white/10 py-4 text-base sm:text-lg font-semibold text-gray-200"
              >
                <Check className="mt-1 h-5 w-5 flex-shrink-0 text-orange-500" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150} className="lg:sticky lg:top-24">
          <div
            className="rounded-2xl border border-white/15 bg-[#141C2E] p-6 sm:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif mb-5">
              Joining details
            </h3>
            <p className="flex items-center gap-3 text-lg font-extrabold text-white mb-4">
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
              </span>
              Registrations are open.
            </p>
            <p className="text-lg font-extrabold leading-snug text-gray-100 max-w-sm">
              Dates, fees and joining details will be announced.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              {REGISTRATION_URL && (
                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-orange-400"
                >
                  Register Now
                </a>
              )}
              <Link
                href="mailto:info@bserc.org"
                className="group inline-flex items-center gap-2 text-sm font-bold text-white underline decoration-orange-500 decoration-2 underline-offset-[6px] transition hover:decoration-orange-300"
              >
                Ask about the programme
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FormatAndJoining;
