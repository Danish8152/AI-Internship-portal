import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import StarField from "./StarField";

const InternshipHighlights = () => {
  return (
    <section className="relative overflow-hidden h-full w-full pt-16 md:pt-20 pb-56 sm:pb-72 px-4 bg-black">
      {/* Closing bookend to the Hero's rocket launch — a glimpse of Earth
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
      <StarField opacityClassName="opacity-30" />

      <div
        className="relative z-10 overflow-hidden max-w-6xl mx-auto rounded-xl border border-white/10
        bg-gradient-to-br from-[#0f1e33] to-[#2a1710] p-6 sm:p-8"
      >
        <div className="relative">
        {/* Heading */}
        <h2 className="text-2xl text-center sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight font-serif">
          Def-Space Autumn Internship Highlights
        </h2>

        {/* Subheading */}
        <p className="  text-sm sm:text-base font-semibold text-blue-400 mb-2 py-2">
          Dedicated modules on career prospects in Defence & Space Science,
          Computing, and Advanced Technologies, covering:
        </p>

        {/* List */}
        <ul className="text-gray-400 text-sm sm:text-base space-y-3 mb-6">
          {[

            "Pathways in ISRO, DRDO, HAL, private space enterprises, and Defence Public Sector Undertakings",
            "Emerging roles in Defence Technology, Space Exploration, Unmanned Aerial Vehicles (UAVs), and AI-driven systems",
            "Interactive sessions with industry experts and mentors",
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Play className="text-orange-500 h-4 w-4 mt-1" fill="currentColor" />
              <span>{item}</span>
            </li>
          ))}
        </ul>


        <p className="  text-sm sm:text-base font-semibold text-blue-400 mb-2 py-2">
         Key Programme Highlights

        </p>

        <ul className="text-gray-400 text-sm sm:text-base space-y-3 mb-6">
          {[

            "Comprehensive technical curriculum tailored for undergraduates , post graduate , research scholar, faculty & officials",
            "Hands-on, project-based learning with industry-standard tools and simulations",
            " access to recorded sessions for flexible, self-paced review",
            "Emphasis on foundational skills for careers in Defence, Space, and Advanced Technology sectors",
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Play className="text-orange-500 h-4 w-4 mt-1" fill="currentColor" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  );
};

export default InternshipHighlights;