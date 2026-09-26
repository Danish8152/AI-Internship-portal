"use client";

import React, { useState } from "react";
import Reveal from "./Reveal";
import Highlight from "./Highlight";
import {
  AppIllustration,
  GameIllustration,
  NotesIllustration,
  ResearchIllustration,
  CareerIllustration,
  VideoIllustration,
  DataIllustration,
  AgentIllustration,
} from "./ProjectIllustrations";

type Category = "all" | "build" | "study" | "career";

const CATEGORY_LABEL: Record<Exclude<Category, "all">, string> = {
  build: "Create & build",
  study: "Study & research",
  career: "Career & work",
};

interface Project {
  id: string;
  cat: Exclude<Category, "all">;
  title: string;
  desc: string;
  skills: string[];
  Illustration: React.FC;
}

const projects: Project[] = [
  {
    id: "app",
    cat: "build",
    title: "Build your first useful app",
    desc: "Turn an idea into a small web app, such as a planner or expense splitter, then test how it behaves.",
    skills: ["Prompting", "Iteration"],
    Illustration: AppIllustration,
  },
  {
    id: "game",
    cat: "build",
    title: "Make a game you can play",
    desc: "Use AI to create a small browser game or quiz, add scoring and improve it by testing.",
    skills: ["Prompting", "Testing"],
    Illustration: GameIllustration,
  },
  {
    id: "study",
    cat: "study",
    title: "Create your study system",
    desc: "Turn notes and course files into revision plans, practice questions and a source-grounded study resource.",
    skills: ["Context engineering", "Evaluation"],
    Illustration: NotesIllustration,
  },
  {
    id: "research",
    cat: "study",
    title: "Make research easier to navigate",
    desc: "Organise papers, compare findings and build an evidence table with traceable sources.",
    skills: ["RAG", "Source-checking"],
    Illustration: ResearchIllustration,
  },
  {
    id: "career",
    cat: "career",
    title: "Strengthen your career toolkit",
    desc: "Improve a LinkedIn profile draft and resume using your actual experience; organise evidence and application tasks.",
    skills: ["Grounded drafting", "Career evidence"],
    Illustration: CareerIllustration,
  },
  {
    id: "video",
    cat: "build",
    title: "Edit and repurpose video",
    desc: "Explore AI-assisted workflows for selecting clips, arranging a short edit and adding captions.",
    skills: ["AI-assisted editing", "Captions"],
    Illustration: VideoIllustration,
  },
  {
    id: "data",
    cat: "career",
    title: "Turn data into a useful story",
    desc: "Clean a spreadsheet, check totals and turn the result into a dashboard, report or presentation.",
    skills: ["Data checking", "Reporting"],
    Illustration: DataIllustration,
  },
  {
    id: "agent",
    cat: "career",
    title: "Put an agent to work",
    desc: "Guide an AI agent through a multi-step task involving files, research or a repeatable workflow, with checks along the way.",
    skills: ["AI agents", "Plan → act → check"],
    Illustration: AgentIllustration,
  },
];

const filters: Array<{ id: Category; label: string }> = [
  { id: "all", label: "All projects" },
  { id: "build", label: CATEGORY_LABEL.build },
  { id: "study", label: CATEGORY_LABEL.study },
  { id: "career", label: CATEGORY_LABEL.career },
];

const ProjectGallery: React.FC = () => {
  const [active, setActive] = useState<Category>("all");
  const shown = active === "all" ? projects : projects.filter((p) => p.cat === active);
  const status =
    active === "all"
      ? `Showing all ${shown.length} projects`
      : `Showing ${shown.length} of ${projects.length} projects: ${CATEGORY_LABEL[active]}`;

  return (
    <section className="relative w-full py-14 sm:py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif mb-4">
            Give your new skills something to{" "}
            <Highlight>show for them.</Highlight>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Explore projects for college, careers and everyday work. Watch
            complete demonstrations, then practise with selected builds and
            assignments.
          </p>
        </Reveal>

        <div
          role="group"
          aria-label="Filter projects by type"
          className="flex flex-wrap justify-center gap-2"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              aria-pressed={active === f.id}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                active === f.id
                  ? "bg-orange-500 text-black"
                  : "border border-white/15 text-gray-300 hover:border-white/30"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p
          role="status"
          aria-live="polite"
          className="mt-4 mb-8 min-h-[1.5em] text-center text-sm font-semibold text-gray-400"
        >
          {status}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shown.map((p, i) => {
            const Illustration = p.Illustration;
            return (
              <Reveal key={p.id} delay={i * 80}>
                <div className="rounded-xl border border-white/10 bg-[#12141c] overflow-hidden hover:border-white/20 transition duration-300 h-full flex flex-col">
                  <div className="bg-black/40 p-3">
                    <Illustration />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-white font-semibold text-base mb-1.5">
                      {p.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {p.desc}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center gap-1.5">
                      {p.skills.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-400/5 px-2.5 py-1 text-[11px] font-semibold text-cyan-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 pt-3 border-t border-white/10 text-[11px] font-bold uppercase tracking-wide text-orange-400">
                      {CATEGORY_LABEL[p.cat]}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-10 pt-4 border-t border-white/10 text-sm font-semibold text-gray-400">
          The final live demonstrations and assignments will be shared with
          your cohort.
        </p>
      </div>
    </section>
  );
};

export default ProjectGallery;
