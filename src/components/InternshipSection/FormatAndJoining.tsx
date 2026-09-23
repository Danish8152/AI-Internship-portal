import React from "react";
import { CheckCircle2, CalendarClock, Users2, Wallet, Award } from "lucide-react";
import Reveal from "./Reveal";

const facts: Array<{ icon: React.ElementType; text: string }> = [
  { icon: CheckCircle2, text: "Live, cohort-based format" },
  { icon: CalendarClock, text: "Dates to be announced" },
  { icon: Users2, text: "Open to students, researchers, professionals and creators" },
  { icon: Wallet, text: "Registration fee to be announced" },
  { icon: Award, text: "Certificate on completion" },
];

const FormatAndJoining: React.FC = () => {
  return (
    <section id="format" className="relative w-full py-14 sm:py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif mb-8">
            Your next step starts here.
          </h2>
          <ul className="space-y-5 border-t border-white/10 pt-6">
            {facts.map((f) => {
              const Icon = f.icon;
              return (
                <li
                  key={f.text}
                  className="flex items-start gap-3 text-gray-300 text-sm sm:text-base"
                >
                  <Icon className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  {f.text}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={150} className="lg:sticky lg:top-24">
          <div
            id="contact"
            className="rounded-2xl border border-white/10 bg-[#141C2E] p-6 sm:p-7 scroll-mt-24"
          >
            <h3 className="text-xl font-bold text-white font-serif mb-4">
              Joining Details
            </h3>
            <p className="flex items-center gap-2 text-sm font-semibold text-gray-100 mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
              </span>
              Registrations opening soon
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Dates, fees and joining details will be announced. Reach out
              and we&apos;ll notify you first.
            </p>
            <a
              href="mailto:info@bserc.org"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-bold text-black transition hover:bg-orange-400"
            >
              Notify Me
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FormatAndJoining;
