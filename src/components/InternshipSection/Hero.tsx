"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Satellite } from "lucide-react";
import Highlight from "./Highlight";
import CircledWord from "./CircledWord";
import {
  AppIllustration,
  GameIllustration,
  ResearchIllustration,
  AgentIllustration,
} from "./ProjectIllustrations";
import { INTERNSHIP, REGISTER } from "@/data/internship";

const relevance = [
  "No coding or prior experience needed. Curiosity is enough.",
  "Even the advanced topics are taught so they feel simple.",
  "For students and professionals ready to put AI into practice.",
];

const heroIllustrations = [
  AppIllustration,
  GameIllustration,
  ResearchIllustration,
  AgentIllustration,
];

// All entries confirmed genuinely transparent (checked pixel alpha directly —
// the SVG is inherently transparent by nature, no painted background rect).
const marqueeLogoSet = [
  { src: "/images/logos/viksit-bharat-abhiyan.png", alt: "Viksit Bharat Abhiyan — 1947 to 2047", width: 746, height: 334 },
  { src: "/images/logos/amritkaallogo-black.png", alt: "Amrit Kaal", width: 758, height: 389 },
  { src: "/images/logos/skill-india-big-logo.svg", alt: "Skill India", width: 202, height: 55 },
  { src: "/images/logos/amrit-kaal.png", alt: "Amrit Kaal", width: 220, height: 120 },
  { src: "/img/BSERC_new.png", alt: "BSERC", width: 2048, height: 2048 },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Background photo + gradient wash */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/space/nebula.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[65%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      {/* Satellite decoration */}
      <Satellite
        className="absolute right-8 top-10 hidden h-10 w-10 -rotate-12 text-white/20 sm:block lg:right-16"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_480px] lg:items-center lg:gap-12">
          {/* Left: copy */}
          <div className="max-w-2xl">
            <p className="mb-6 inline-flex flex-col gap-1.5 rounded-lg border border-white/25 bg-black/60 px-4 py-3 backdrop-blur-md">
              <strong className="text-xl font-extrabold leading-tight tracking-tight text-orange-400">
                {INTERNSHIP.name}
              </strong>
              <span className="text-base font-bold leading-snug text-gray-300">
                The Gen AI &amp; AI Agents <CircledWord>Internship</CircledWord>
              </span>
            </p>

            <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Be the <Highlight>AI person</Highlight> people turn to.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              Understand how AI works, then use it to build apps and games,
              strengthen your research, create content and automate useful
              tasks. Learn through live demonstrations and assignments you can
              connect to your studies, projects and work.
            </p>

            <p className="mt-5 text-sm font-extrabold text-white sm:text-base">
              {INTERNSHIP.formatLine}
            </p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
              <Link
                href={REGISTER.href}
                {...REGISTER.linkProps}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-bold text-black transition-all hover:bg-orange-400 active:scale-95"
              >
                {REGISTER.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#build"
                className="group inline-flex items-center gap-2 text-sm font-bold text-white underline decoration-orange-500 decoration-2 underline-offset-[6px] transition hover:decoration-orange-300"
              >
                See what you&apos;ll build
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <ul className="mt-6 grid gap-2 text-sm text-zinc-300">
              {relevance.map((text) => (
                <li key={text} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-400" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: project drawings */}
          <figure className="w-full max-w-[520px] lg:justify-self-end">
            <div
              role="img"
              aria-label="Project drawings: a small study-planner app, a memory-match game with a score, a research table with source markers, and an input, plan, action, check agent flow."
              className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-black/50 p-3 shadow-2xl backdrop-blur-md sm:p-4"
            >
              {heroIllustrations.map((Illustration, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-black/40 p-1.5 ring-1 ring-white/5"
                >
                  <Illustration />
                </div>
              ))}
            </div>
            <figcaption className="mt-3 text-sm font-semibold text-zinc-400">
              A few of the things you&apos;ll explore.
            </figcaption>
          </figure>
        </div>

        {/* Partner / initiative logos, looping continuously right to left. A
            single 6-logo pass isn't dense enough to fill the strip, so the
            visible set repeats several times, then that whole sequence is
            duplicated once more and animated by exactly -50% — since the
            second half is identical to the first, the loop point is
            invisible and it reads as one unbroken, endless strip. */}
        <div
          className="relative mt-12 overflow-hidden border-t border-white/10 pt-6 sm:mt-16"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee items-center gap-16">
            {Array.from({ length: 6 }).flatMap((_, setIndex) =>
              marqueeLogoSet.map((logo, logoIndex) =>
                // Next.js Image Optimization refuses SVGs unless
                // dangerouslyAllowSVG is set project-wide — not worth
                // enabling globally for one icon that gains nothing from
                // raster optimization anyway. Plain <img> for that one.
                logo.src.endsWith(".svg") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={`${setIndex}-${logoIndex}`}
                    src={logo.src}
                    alt={logo.alt}
                    className="h-14 w-auto flex-shrink-0 object-contain opacity-90 sm:h-16"
                  />
                ) : (
                  <Image
                    key={`${setIndex}-${logoIndex}`}
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="h-14 w-auto flex-shrink-0 object-contain opacity-90 sm:h-16"
                  />
                ),
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
