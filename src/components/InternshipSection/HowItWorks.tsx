import React from "react";
import { MonitorPlay, LayoutGrid, PenLine, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

const steps: Array<{ icon: React.ElementType; title: string; body: string; tone: string }> = [
  {
    icon: MonitorPlay,
    title: "Live demonstration",
    body: "Watch a task go from start to finish.",
    tone: "border-cyan-400/40 bg-cyan-400/10 text-cyan-300",
  },
  {
    icon: LayoutGrid,
    title: "Guided build",
    body: "Build alongside, with help close by.",
    tone: "border-orange-400/40 bg-orange-500/10 text-orange-300",
  },
  {
    icon: PenLine,
    title: "Independent assignment",
    body: "Apply the same ideas to a small problem of your own.",
    tone: "border-cyan-400/40 bg-cyan-400/10 text-cyan-300",
  },
  {
    icon: CheckCircle2,
    title: "Check and improve",
    body: "Test, correct and document what you made.",
    tone: "border-orange-400/40 bg-orange-500/10 text-orange-300",
  },
];

const milestones = [
  { title: "A better AI task brief", body: "Define the goal, context and what a good result looks like." },
  { title: "A small useful build", body: "Create or adapt an app, study resource, research table or workflow." },
  { title: "An improved result you can explain", body: "Test, correct and document what you made." },
];

const HowItWorks: React.FC = () => {
  return (
    <section
      id="how"
      className="relative w-full py-14 sm:py-20 px-4 bg-gradient-to-br from-[#0b1a33] via-[#0a0c16] to-[#2a1710] border-y border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif leading-tight">
            Watch it happen. Try it yourself. Bring it back stronger.
          </h2>
        </Reveal>

        <ol
          aria-label="How each session and assignment fit together"
          className="mt-12 grid gap-8 md:grid-cols-4 md:gap-0"
        >
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal as="li" key={s.title} delay={i * 100} className="relative md:pr-7">
                <div className="flex items-start gap-4 md:block">
                  <span
                    className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border ${s.tone}`}
                  >
                    <Icon className="h-8 w-8" />
                  </span>
                  <div>
                    <strong className="block text-lg font-bold text-white md:mt-5 sm:text-xl">
                      {s.title}
                    </strong>
                    <span className="mt-1 block text-sm text-gray-400 sm:text-base">
                      {s.body}
                    </span>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[5.5rem] right-3 top-8 hidden border-t-2 border-dashed border-white/25 md:block"
                  />
                )}
              </Reveal>
            );
          })}
        </ol>

        <p className="mt-14 max-w-2xl text-base sm:text-lg leading-relaxed text-gray-200">
          The live sessions show how a task is approached and completed. Between
          sessions, use an assignment to apply the same ideas to a small problem
          of your own. Keep the output, the instructions you used and the checks
          you performed.
        </p>

        <ol
          aria-label="Three assignment milestones"
          className="mt-10 grid border-t border-white/25 md:grid-cols-3"
        >
          {milestones.map((m, i) => (
            <li
              key={m.title}
              className={`grid grid-cols-[44px_1fr] items-start gap-x-3 gap-y-1 py-6 ${
                i > 0 ? "border-t border-white/15 md:border-l md:border-t-0 md:pl-8" : ""
              } ${i < milestones.length - 1 ? "md:pr-8" : ""}`}
            >
              <span
                aria-hidden="true"
                className="row-span-2 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-lg font-extrabold tabular-nums text-black"
              >
                {i + 1}
              </span>
              <strong className="text-lg font-bold leading-snug text-white">{m.title}</strong>
              <span className="text-sm text-gray-400 sm:text-base">{m.body}</span>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-sm font-semibold text-gray-400">
          Workload, deadlines and feedback arrangements will be shared with the
          final schedule.
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;
