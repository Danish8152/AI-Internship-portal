import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";

const careerPathways = [
  "Pathways into AI/ML engineering, applied research, product and startup roles",
  "Emerging roles across Generative AI, AI Agents, and AI-driven software systems",
  "Interactive sessions with industry experts and mentors",
];

const programmeHighlights = [
  "Comprehensive curriculum tailored for undergraduates, postgraduates, research scholars, faculty & professionals",
  "Hands-on, project-based learning with industry-standard AI tools",
  "Access to recorded sessions for flexible, self-paced review",
  "Emphasis on foundational skills for careers in AI, Software, and Emerging Technology sectors",
];

const InternshipHighlights = () => {
  return (
    <section
      id="highlights"
      className="relative overflow-hidden h-full w-full pt-16 md:pt-20 pb-56 sm:pb-72 px-4 bg-black"
    >
      {/* Closing bookend to the Hero's nebula backdrop — a glimpse of Earth
          from orbit, anchored to the bottom edge of the final section. Extra
          bottom padding above reserves real, unobstructed room for it. */}
      <div className="absolute inset-x-0 bottom-0 h-56 sm:h-72" aria-hidden="true">
        <Image
          src="/images/space/earth-orbit.jpg"
          alt=""
          fill
          unoptimized
          className="object-cover object-bottom opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/55" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-2xl text-center sm:text-3xl lg:text-4xl font-bold text-white mb-10 leading-tight font-serif">
          AI Internship Highlights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 bg-[#0f1e33] p-6 sm:p-7">
            <p className="text-sm sm:text-base font-semibold text-cyan-400 mb-4">
              Career Pathways
            </p>
            <ul className="text-gray-400 text-sm sm:text-base space-y-3">
              {careerPathways.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Play className="text-orange-500 h-4 w-4 mt-1" fill="currentColor" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#2a1710] p-6 sm:p-7">
            <p className="text-sm sm:text-base font-semibold text-orange-400 mb-4">
              Key Programme Highlights
            </p>
            <ul className="text-gray-400 text-sm sm:text-base space-y-3">
              {programmeHighlights.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Play className="text-cyan-400 h-4 w-4 mt-1" fill="currentColor" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipHighlights;
