"use client";

import Link from "next/link";
import Image from "next/image";
import Highlight from "./Highlight";
import {
  Sparkles,
  Satellite,
  Hammer,
  Users,
  Award,
  ClipboardCheck,
  GraduationCap,
  FolderKanban,
  ArrowRight,
} from "lucide-react";

const capabilities: Array<{
  icon: React.ElementType;
  text: string;
}> = [
  { icon: Sparkles, text: "No Coding Required" },
  { icon: Hammer, text: "Hands-On Projects" },
  { icon: Users, text: "Live Mentor Guidance" },
  { icon: Award, text: "Certificate Included" },
];

const highlights = [
  { icon: ClipboardCheck, label: "Register" },
  { icon: GraduationCap, label: "Training" },
  { icon: FolderKanban, label: "Project" },
];

// All entries confirmed genuinely transparent (checked pixel alpha directly —
// the SVG is inherently transparent by nature, no painted background rect).
const marqueeLogoSet = [
  { src: "/images/logos/viksit-bharat-abhiyan.png", alt: "Viksit Bharat Abhiyan — 1947 to 2047", width: 746, height: 334 },
  { src: "/images/logos/amritkaallogo-black.png", alt: "Amrit Kaal", width: 758, height: 389 },
  { src: "/images/logos/skill-india-big-logo.svg", alt: "Skill India", width: 202, height: 55 },
  { src: "/images/logos/isro.png", alt: "ISRO Space Tutor", width: 240, height: 120 },
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
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center lg:gap-12">
          {/* Left: copy */}
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <Sparkles className="h-3.5 w-3.5 text-orange-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">
                Building India&apos;s Future
              </span>
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Shaping Tomorrow with{" "}
              <span className="text-sky-400">Generative AI &amp;</span>{" "}
              <span className="text-orange-500">Autonomous Agents</span>
            </h1>

            <p className="mt-4 text-base font-semibold text-orange-400 sm:text-lg">
              Be the <Highlight>AI person</Highlight> people turn to.
            </p>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Understand how AI really works, then use it to build apps, guide
              agents through real tasks, strengthen your research and
              automate the busywork — through live, hands-on training with
              BSERC mentors.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="#curriculum"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-bold text-black transition-all hover:bg-orange-400 active:scale-95"
              >
                Explore the AI Internship
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#overview"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
              >
                See What You&apos;ll Build
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <span
                    key={item.label}
                    className="flex items-center gap-1.5 text-xs font-medium text-zinc-300"
                  >
                    <Icon className="h-3.5 w-3.5 text-orange-500" />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Right: capability panel */}
          <div className="rounded-2xl border border-white/10 bg-black/50 p-5 shadow-2xl backdrop-blur-md sm:p-6 lg:justify-self-end">
            <div className="space-y-5">
              {capabilities.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className={`flex items-center gap-3.5 ${
                      i > 0 ? "border-t border-white/10 pt-5" : ""
                    }`}
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="font-serif text-base font-bold leading-tight text-white sm:text-lg">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
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
