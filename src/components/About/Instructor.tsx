import React from "react";
import Reveal from "@/components/InternshipSection/Reveal";
import Highlight from "@/components/InternshipSection/Highlight";
import { INTERNSHIP } from "@/data/internship";

const nameParts = INTERNSHIP.instructor.split(/\s+/);
const firstName = nameParts[0];
const initials = nameParts
  .map((word) => word.charAt(0))
  .join("")
  .slice(0, 2)
  .toUpperCase();

const Instructor: React.FC = () => {
  return (
    <section className="relative w-full py-10 sm:py-16 px-4 bg-black">
      <Reveal className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-8 rounded-xl border border-white/10 bg-gradient-to-br from-[#0c1a2e] to-[#26140a] p-6 sm:p-8 md:flex-row md:gap-12 lg:p-10">
          <div
            className="flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/40 sm:h-40 sm:w-40"
            aria-hidden="true"
          >
            <span className="bg-gradient-to-r from-[#1E90FF] to-[#FF6B35] bg-clip-text font-serif text-5xl font-extrabold text-transparent sm:text-6xl">
              {initials}
            </span>
          </div>

          <div className="text-center md:text-left">
            <h2 className="mb-4 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              Learn with <Highlight>{INTERNSHIP.instructor}.</Highlight>
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
              {firstName}&apos;s teaching starts with clear explanations of the
              fundamentals, then connects them to demonstrations and practical
              tasks. The focus is helping you understand the approach, guide the
              work and check the result.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Instructor;
