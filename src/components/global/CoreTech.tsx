"use client";
import React from "react";
import Image from "next/image";
import { Plane, Send, Brain, Fan } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
  accent: "blue" | "orange";
};

// Exactly the 4 technology domains taught this cohort (matches the Weeks 1-3
// breakdown in ProgrammeTimeline.tsx) — not a general list of BSERC's wider
// expertise areas.
const features: Feature[] = [
  {
    title: "Generative Artificial Intelligence (AI)",
    description:
      "Foundations and applications of generative models, large language models and diffusion models.",
    icon: Brain,
    accent: "blue",
  },
  {
    title: "Advanced Drone Technology (Air Taxi & Defence Drone)",
    description: "Air taxi systems, defence UAV architectures and autonomy for next-gen drones.",
    icon: Send,
    accent: "orange",
  },
  {
    title: "Helicopter Technology",
    description: "Rotor aerodynamics, vertical-lift systems and rotorcraft design fundamentals.",
    icon: Fan,
    accent: "blue",
  },
  {
    title: "Aircraft Design Technology",
    description: "Aerodynamics, CFD simulation, structural design and systems integration for aircraft.",
    icon: Plane,
    accent: "orange",
  },
];

export const CoreTech: React.FC = () => {
  return (
    <section className="relative overflow-hidden w-full py-12 sm:py-16 px-4 bg-black">
      {/* Real nebula photo as a faint, colorful backdrop — deep-space texture
          that ties this "technology domains" section back to the Hero. */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/space/nebula.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}

        <div className="flex flex-col gap-3 justify-center items-center">
          <h3 className="text-4xl md:text-4xl text-center font-bold font-serif text-white  leading-tightlg:text-4xl ">
            Core Technology Domains
          </h3>

          <p className="text-center pb-5 text-gray-400  text-sm sm:text-base max-w-2xl mx-auto">
            Master cutting-edge technologies across core engineering domains
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isBlue = feature.accent === "blue";

            return (
              <div
                key={i}
                className={`relative rounded-xl p-6 border-l-4 transition-all duration-300 hover:scale-[1.02]
                ${
                  isBlue
                    ? "border-blue-500 bg-[#0f1b2e]"
                    : "border-orange-500 bg-[#241a10]"
                }`}
              >
                {/* Icon */}
                <div
                  className={`mb-4 ${
                    isBlue ? "text-blue-400" : "text-orange-400"
                  }`}
                >
                  <Icon className="w-10 h-10" />
                </div>

                {/* Title */}
                <h4 className="text-white font-semibold text-lg mb-2">
                  {feature.title}
                </h4>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
