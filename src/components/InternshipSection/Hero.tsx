import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import CircledWord from "./CircledWord";
import HeroBackground from "./HeroBackground";
import AgentDemo from "./AgentDemo";
import { INTERNSHIP, REGISTER } from "@/data/internship";

const relevance = [
  "No coding or prior experience needed. Curiosity is enough.",
  "Even the advanced topics are taught so they feel simple.",
  "For students and professionals ready to put AI into practice.",
];

const [durationValue, durationUnit] = INTERNSHIP.duration.split(" ");

const stats = [
  { value: INTERNSHIP.sessionCount, label: "live sessions" },
  { value: INTERNSHIP.hoursEach, label: "hours each" },
  { value: INTERNSHIP.totalHours, label: "live hours" },
  { value: durationValue, label: durationUnit },
];

const floatingChips = [
  { text: "Prompts", pos: "-left-4 top-6", tone: "border-cyan-400/40 text-cyan-200", delay: "0s" },
  { text: "RAG", pos: "-right-4 top-24", tone: "border-orange-400/40 text-orange-200", delay: "1.2s" },
  { text: "Agents", pos: "-left-6 bottom-24", tone: "border-orange-400/40 text-orange-200", delay: "2.1s" },
  { text: "APIs", pos: "-right-3 -bottom-4", tone: "border-cyan-400/40 text-cyan-200", delay: "0.6s" },
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
      <HeroBackground />

      <div className="relative z-10 mx-auto max-w-[1480px] px-4 pb-10 pt-14 sm:px-6 sm:pt-20 lg:px-14">
        {/* Copy on the left, live workspace on the right from xl up; stacked below. */}
        <div className="grid gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(0,630px)] 2xl:grid-cols-[minmax(0,1fr)_minmax(0,720px)] xl:items-center xl:gap-10">
        {/* Headline block */}
        <div className="mx-auto max-w-4xl text-center xl:mx-0 xl:max-w-none xl:text-left">
          <p className="mb-7 inline-flex flex-col items-center gap-1.5 xl:items-start rounded-xl border border-white/20 bg-black/60 px-5 py-3 backdrop-blur-md">
            <strong className="text-xl font-extrabold leading-tight tracking-tight text-orange-400">
              {INTERNSHIP.name}
            </strong>
            <span className="text-base font-bold leading-snug text-gray-300">
              The Gen AI &amp; AI Agents <CircledWord>Internship</CircledWord>
            </span>
          </p>

          <h1 className="text-balance font-serif text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-6xl">
            Be the{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-orange-400 bg-clip-text text-transparent">
              AI person
            </span>{" "}
            people turn to.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg xl:mx-0">
            Understand how AI works, then use it to build apps and games,
            strengthen your research, create content and automate useful tasks.
            Learn through live demonstrations and assignments you can connect to
            your studies, projects and work.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 xl:items-stretch xl:justify-start">
            <Link
              href={REGISTER.href}
              {...REGISTER.linkProps}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-4 text-sm font-bold text-black shadow-[0_0_34px_-4px_rgba(249,115,22,0.6)] transition-all hover:bg-orange-400 active:scale-95"
            >
              {REGISTER.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#build"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-4 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/10 active:scale-95"
            >
              See what you&apos;ll build
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-300 xl:flex-col xl:flex-nowrap xl:items-start xl:justify-start">
            {relevance.map((text) => (
              <li key={text} className="flex items-center gap-2">
                <Check className="h-4 w-4 flex-shrink-0 text-cyan-400" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Live agent workspace */}
        <div className="relative mx-auto w-full max-w-5xl xl:mx-0 xl:max-w-none">
          {floatingChips.map((c) => (
            <span
              key={c.text}
              aria-hidden="true"
              style={{ animationDelay: c.delay }}
              className={`absolute z-20 hidden animate-[hero-float_6s_ease-in-out_infinite] rounded-full border bg-black/70 px-3.5 py-1.5 text-xs font-bold backdrop-blur-md motion-reduce:animate-none md:inline-flex ${c.pos} ${c.tone}`}
            >
              {c.text}
            </span>
          ))}
          <AgentDemo />
          <p className="sr-only">
            Illustration: an AI agent plans, does and checks a task, such as
            building a small app, verifying claims against sources or turning
            a spreadsheet into a report.
          </p>
        </div>
        </div>

        {/* Format at a glance */}
        <dl className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col-reverse items-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-center backdrop-blur"
            >
              <dt className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {s.label}
              </dt>
              <dd className="bg-gradient-to-r from-cyan-300 to-orange-400 bg-clip-text font-serif text-3xl font-extrabold text-transparent sm:text-4xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Partner / initiative logos, looping continuously right to left. The
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
