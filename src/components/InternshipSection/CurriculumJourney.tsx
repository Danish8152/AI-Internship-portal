import React from "react";
import Reveal from "./Reveal";
import Highlight from "./Highlight";

interface Topic {
  label: string;
  live?: boolean;
}

interface Family {
  title: string;
  desc: string;
  topics: Topic[];
}

const families: Family[] = [
  {
    title: "Understand AI",
    desc: "Know what is happening behind every answer.",
    topics: [
      { label: "Models, tokens and context" },
      { label: "Why AI gets things wrong" },
      { label: "Model, app and agent" },
      { label: "The harness around an agent" },
      { label: "Projects and files, kept organised" },
    ],
  },
  {
    title: "Ground it in your sources",
    desc: "Get answers you can trace back.",
    topics: [
      { label: "Prompts and instructions" },
      { label: "Context engineering" },
      { label: "Embeddings and RAG" },
      { label: "Source-grounded study briefs" },
      { label: "Documents, sheets and slides" },
      { label: "Diagrams and charts" },
      { label: "Ask AI what to do next" },
      { label: "Connect your apps (plugins)", live: true },
    ],
  },
  {
    title: "Build and share",
    desc: "Turn an idea into something people can use.",
    topics: [
      { label: "Web apps" },
      { label: "Games" },
      { label: "Interactive learning pages" },
      { label: "Visual feedback on your build" },
      { label: "Testing in a browser" },
      { label: "Hosting and sharing", live: true },
      { label: "Prototype to live app", live: true },
      { label: "Desktop and phone app examples", live: true },
      { label: "3D objects", live: true },
    ],
  },
  {
    title: "Guide AI agents",
    desc: "Multi-step work, with checks along the way.",
    topics: [
      { label: "Plan, act, check" },
      { label: "Email and message drafts" },
      { label: "Side tasks while AI builds", live: true },
      { label: "Scheduled tasks", live: true },
      { label: "Sub-agents: a team of AI helpers", live: true },
      { label: "Computer use", live: true },
      { label: "Voice and phone control", live: true },
    ],
  },
  {
    title: "Create and communicate",
    desc: "Career material, content and visuals.",
    topics: [
      { label: "Resume and LinkedIn drafts" },
      { label: "Presentations" },
      { label: "Creating and editing images", live: true },
      { label: "Analysing video", live: true },
      { label: "AI-assisted video editing", live: true },
      { label: "Repurposing content", live: true },
    ],
  },
  {
    title: "Reuse it and make it reliable",
    desc: "Turn a method that worked into something repeatable.",
    topics: [
      { label: "Reusable skills" },
      { label: "Prompt injection and sycophancy" },
      { label: "Evaluation and recovery" },
      { label: "An end-to-end project" },
      { label: "Record and replay a workflow", live: true },
      { label: "Connecting to services (APIs)", live: true },
    ],
  },
];

const CurriculumJourney: React.FC = () => {
  return (
    <section className="relative w-full py-14 sm:py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif mb-4">
            Here is everything you&apos;ll get to <Highlight>explore.</Highlight>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            From your first working app to AI agents that work across your
            tools. Each topic is either something you practise yourself or
            something you see done live, so you always know which is which.
          </p>
        </Reveal>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-8 mb-2 text-sm font-semibold">
          <span className="flex items-center gap-2 text-gray-300">
            <span className="h-3 w-3 rounded-full bg-orange-500" aria-hidden="true" />
            You practise it
          </span>
          <span className="flex items-center gap-2 text-gray-300">
            <span className="h-3 w-3 rounded-full border border-white/40" aria-hidden="true" />
            You see it done live
          </span>
        </div>

        <div className="border-t border-white/10">
          {families.map((fam, i) => (
            <Reveal key={fam.title} delay={i * 60}>
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-3 lg:gap-10 py-7 border-b border-white/10">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-100 font-serif">
                    {fam.title}
                  </h3>
                  <p className="mt-1.5 text-gray-400 text-sm">{fam.desc}</p>
                </div>
                <div className="flex flex-wrap content-start gap-2.5">
                  {fam.topics.map((t) => (
                    <span
                      key={t.label}
                      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold ${
                        t.live
                          ? "border border-dashed border-white/25 text-gray-300"
                          : "border border-white/15 bg-white/5 text-gray-200"
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${
                          t.live ? "border border-white/40" : "bg-orange-500"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="sr-only">{t.live ? "See it live: " : "You practise: "}</span>
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-gray-400 text-sm sm:text-base font-semibold">
          Some topics are practised, others are demonstrated. Either way,
          each one is explained from the basics first.
        </p>
      </div>
    </section>
  );
};

export default CurriculumJourney;
