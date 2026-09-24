import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "./Reveal";
import CircledWord from "./CircledWord";
import { INTERNSHIP, REGISTER } from "@/data/internship";

const FinalCTA: React.FC = () => {
  return (
    <section
      id="join"
      className="relative overflow-hidden w-full px-4 pt-16 pb-44 sm:pt-24 sm:pb-60 bg-gradient-to-br from-[#1a0f05] via-black to-[#031014] border-y border-white/10"
    >
      {/* Closing bookend — a glimpse of Earth from orbit at the bottom edge. */}
      <div className="absolute inset-x-0 bottom-0 h-40 sm:h-56" aria-hidden="true">
        <Image
          src="/images/space/earth-orbit.jpg"
          alt=""
          fill
          unoptimized
          className="object-cover object-bottom opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-20">
        <Reveal>
          <h2 className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif leading-tight mb-5">
            Make AI a skill people know you for.
          </h2>
          <p className="text-lg sm:text-xl font-extrabold text-white">
            Join the Gen AI &amp; AI Agents <CircledWord>Internship</CircledWord>.
          </p>
          <p className="mt-5 max-w-xl text-base sm:text-lg text-gray-300">
            Start with understanding. Build through practice. Apply it where it
            matters to you.
          </p>
          <p className="mt-5 text-sm sm:text-base font-extrabold text-white">
            {INTERNSHIP.formatLine}
          </p>
          <Link
            href={REGISTER.href}
            {...REGISTER.linkProps}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-sm font-bold text-black transition hover:bg-orange-400 active:scale-95"
          >
            {REGISTER.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div
          aria-hidden="true"
          className="hidden h-52 w-52 items-center justify-center rounded-full border-4 border-orange-300/70 bg-orange-500 shadow-[0_0_60px_10px_rgba(249,115,22,0.25)] lg:flex"
        >
          <Check className="h-24 w-24 text-black" strokeWidth={3} />
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
