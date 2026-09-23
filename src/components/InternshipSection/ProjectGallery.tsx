"use client";

import React, { useState } from "react";
import Reveal from "./Reveal";

type Category = "all" | "build" | "research" | "career";

const T_LABEL = { fontFamily: "inherit", fontWeight: 700 } as const;
const T_MUTED = { fontFamily: "inherit", fontWeight: 600 } as const;

function AppIllustration() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-auto">
      <rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="#ffffff2e" strokeWidth="2" />
      <path d="M10 44h300" stroke="#ffffff2e" strokeWidth="2" />
      <text x="22" y="31" fontSize="13" fill="#e5e7eb" style={T_LABEL}>AI Study Planner</text>
      <circle cx="284" cy="27" r="5" fill="#22D3EE" />
      <circle cx="266" cy="27" r="5" fill="#F97316" />
      <rect x="26" y="64" width="120" height="28" rx="6" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <text x="36" y="82" fontSize="11" fill="#67e8f9" style={T_MUTED}>Subject</text>
      <rect x="174" y="64" width="120" height="28" rx="6" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <text x="184" y="82" fontSize="11" fill="#67e8f9" style={T_MUTED}>Hours / week</text>
      <rect x="26" y="106" width="120" height="34" rx="8" fill="#F97316" />
      <text x="86" y="128" fontSize="12" textAnchor="middle" fill="#0a0c16" style={T_LABEL}>Generate Plan</text>
      <rect x="174" y="106" width="120" height="34" rx="8" fill="none" stroke="#ffffff33" strokeWidth="2" />
      <text x="234" y="128" fontSize="12" textAnchor="middle" fill="#ffffffaa" style={T_LABEL}>Save Draft</text>
      <rect x="26" y="152" width="268" height="30" rx="8" fill="#F9731622" stroke="#F97316" strokeWidth="1.5" />
      <text x="38" y="172" fontSize="12" fill="#fdba74" style={T_MUTED}>4 sessions planned this week</text>
    </svg>
  );
}

function GameIllustration() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-auto">
      <rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="#ffffff2e" strokeWidth="2" />
      <text x="22" y="26" fontSize="13" fill="#e5e7eb" style={T_LABEL}>Memory Match</text>
      <text x="298" y="26" fontSize="11" textAnchor="end" fill="#94a3b8" style={T_MUTED}>2 of 3 pairs</text>
      <rect x="30" y="34" width="76" height="56" rx="8" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <rect x="122" y="34" width="76" height="56" rx="8" fill="#F97316" />
      <path d="M150 62l6 6 12-12" stroke="#0a0c16" strokeWidth="2.5" fill="none" />
      <rect x="214" y="34" width="76" height="56" rx="8" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <rect x="30" y="106" width="76" height="56" rx="8" fill="#F97316" />
      <path d="M58 134l6 6 12-12" stroke="#0a0c16" strokeWidth="2.5" fill="none" />
      <rect x="122" y="106" width="76" height="56" rx="8" fill="none" stroke="#ffffff33" strokeWidth="2" />
      <rect x="214" y="106" width="76" height="56" rx="8" fill="none" stroke="#22D3EE" strokeWidth="2" />
    </svg>
  );
}

function ResearchIllustration() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-auto">
      <rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="#ffffff2e" strokeWidth="2" />
      <text x="22" y="26" fontSize="11" fill="#94a3b8" style={T_MUTED}>Source</text>
      <text x="298" y="26" fontSize="11" textAnchor="end" fill="#94a3b8" style={T_MUTED}>Checked</text>
      <text x="22" y="52" fontSize="12" fill="#e5e7eb" style={T_LABEL}>[1] Paper A</text>
      <path d="M110 48h70" stroke="#ffffff33" strokeWidth="2" />
      <circle cx="270" cy="54" r="16" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <path d="M262 54l6 6 12-13" stroke="#22D3EE" strokeWidth="2" fill="none" />
      <text x="22" y="102" fontSize="12" fill="#e5e7eb" style={T_LABEL}>[2] Report B</text>
      <path d="M126 98h90" stroke="#ffffff33" strokeWidth="2" />
      <circle cx="270" cy="104" r="16" fill="#F97316" />
      <path d="M262 104l6 6 12-13" stroke="#0a0c16" strokeWidth="2" fill="none" />
      <text x="22" y="152" fontSize="12" fill="#e5e7eb" style={T_LABEL}>[3] Blog C</text>
      <path d="M104 148h60" stroke="#ffffff33" strokeWidth="2" />
      <circle cx="270" cy="154" r="16" fill="none" stroke="#ffffff44" strokeWidth="2" />
      <text x="270" y="158" fontSize="13" textAnchor="middle" fill="#ffffff77" style={T_LABEL}>?</text>
    </svg>
  );
}

function NotesIllustration() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-auto">
      <rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="#ffffff2e" strokeWidth="2" />
      <text x="101" y="24" fontSize="11" textAnchor="middle" fill="#94a3b8" style={T_MUTED}>Notes</text>
      <rect x="26" y="30" width="150" height="140" rx="6" fill="none" stroke="#ffffff33" strokeWidth="2" />
      <path d="M40 56h122M40 76h90M40 96h110M40 116h70M40 136h100" stroke="#ffffff44" strokeWidth="2" />
      <text x="243" y="24" fontSize="11" textAnchor="middle" fill="#94a3b8" style={T_MUTED}>Checklist</text>
      <rect x="192" y="30" width="102" height="140" rx="6" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <rect x="206" y="48" width="16" height="16" rx="3" fill="none" stroke="#F97316" strokeWidth="2" />
      <path d="M209 56l4 4 7-8" stroke="#F97316" strokeWidth="2" fill="none" />
      <text x="232" y="60" fontSize="10" fill="#e5e7eb" style={T_MUTED}>Quiz 1</text>
      <rect x="206" y="82" width="16" height="16" rx="3" fill="#F97316" />
      <path d="M209 90l4 4 7-8" stroke="#0a0c16" strokeWidth="2" fill="none" />
      <text x="232" y="94" fontSize="10" fill="#e5e7eb" style={T_MUTED}>Quiz 2</text>
      <rect x="206" y="116" width="16" height="16" rx="3" fill="none" stroke="#ffffff44" strokeWidth="2" />
      <text x="232" y="128" fontSize="10" fill="#94a3b8" style={T_MUTED}>Quiz 3</text>
    </svg>
  );
}

function AgentIllustration() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-auto">
      <rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="#ffffff2e" strokeWidth="2" />
      <text x="22" y="26" fontSize="11" fill="#94a3b8" style={T_MUTED}>Task: sort files &amp; check totals</text>
      <rect x="26" y="80" width="56" height="48" rx="8" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <text x="54" y="108" fontSize="10" textAnchor="middle" fill="#67e8f9" style={T_LABEL}>Input</text>
      <rect x="102" y="80" width="56" height="48" rx="8" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <text x="130" y="108" fontSize="10" textAnchor="middle" fill="#67e8f9" style={T_LABEL}>Plan</text>
      <rect x="178" y="80" width="56" height="48" rx="8" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <text x="206" y="108" fontSize="10" textAnchor="middle" fill="#67e8f9" style={T_LABEL}>Act</text>
      <rect x="254" y="80" width="56" height="48" rx="8" fill="#F97316" />
      <text x="282" y="108" fontSize="10" textAnchor="middle" fill="#0a0c16" style={T_LABEL}>Check</text>
      <path d="M82 104h16m-6-6l6 6-6 6" stroke="#ffffff55" strokeWidth="2" fill="none" />
      <path d="M158 104h16m-6-6l6 6-6 6" stroke="#ffffff55" strokeWidth="2" fill="none" />
      <path d="M234 104h16m-6-6l6 6-6 6" stroke="#ffffff55" strokeWidth="2" fill="none" />
      <path d="M282 128v18q0 8-8 8H130q-8 0-8-8v-18" stroke="#ffffff33" strokeWidth="2" strokeDasharray="5 5" fill="none" />
      <path d="M117 134l5-6 5 6" stroke="#ffffff33" strokeWidth="2" fill="none" />
      <text x="198" y="160" fontSize="10" textAnchor="middle" fill="#94a3b8" style={T_MUTED}>revise if a check fails</text>
    </svg>
  );
}

function CareerIllustration() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-auto">
      <rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="#ffffff2e" strokeWidth="2" />
      <rect x="70" y="28" width="180" height="144" rx="8" fill="none" stroke="#ffffff33" strokeWidth="2" />
      <text x="90" y="48" fontSize="12" fill="#e5e7eb" style={T_LABEL}>Resume Draft</text>
      <path d="M90 62h140M90 78h100" stroke="#ffffff33" strokeWidth="2" />
      <rect x="90" y="96" width="140" height="18" rx="4" fill="#F9731622" stroke="#F97316" strokeWidth="1.5" />
      <text x="98" y="109" fontSize="10" fill="#fdba74" style={T_MUTED}>AI-reviewed against your evidence</text>
      <path d="M90 130h140M90 146h90" stroke="#ffffff33" strokeWidth="2" />
      <circle cx="216" cy="40" r="14" fill="#22D3EE" />
      <path d="M209 40l5 5 9-10" stroke="#0a0c16" strokeWidth="2" fill="none" />
    </svg>
  );
}

interface Project {
  id: string;
  cat: Exclude<Category, "all">;
  catLabel: string;
  title: string;
  desc: string;
  skills: string[];
  Illustration: React.FC;
}

const projects: Project[] = [
  {
    id: "app",
    cat: "build",
    catLabel: "Create & Build",
    title: "Build an AI-powered app",
    desc: "Turn an idea into a small working app — like a study planner or tracker — guided by AI.",
    skills: ["Prompting", "Iteration"],
    Illustration: AppIllustration,
  },
  {
    id: "game",
    cat: "build",
    catLabel: "Create & Build",
    title: "Create a game with AI",
    desc: "Design and build a small browser game or quiz, then improve it by testing.",
    skills: ["Prompting", "Testing"],
    Illustration: GameIllustration,
  },
  {
    id: "research",
    cat: "research",
    catLabel: "Research & Study",
    title: "Build a research assistant",
    desc: "Organise sources, compare findings and build a traceable evidence table.",
    skills: ["RAG", "Source-checking"],
    Illustration: ResearchIllustration,
  },
  {
    id: "notes",
    cat: "research",
    catLabel: "Research & Study",
    title: "Create a study system",
    desc: "Turn notes into revision plans and practice questions you can trust.",
    skills: ["Context engineering", "Evaluation"],
    Illustration: NotesIllustration,
  },
  {
    id: "agent",
    cat: "career",
    catLabel: "Career & Agents",
    title: "Guide an AI agent",
    desc: "Direct an agent through a multi-step task, with checks along the way.",
    skills: ["AI agents", "Plan → act → check"],
    Illustration: AgentIllustration,
  },
  {
    id: "career",
    cat: "career",
    catLabel: "Career & Agents",
    title: "Strengthen your career toolkit",
    desc: "Build a resume and portfolio grounded in your real experience.",
    skills: ["Grounded drafting", "Career evidence"],
    Illustration: CareerIllustration,
  },
];

const filters: Array<{ id: Category; label: string }> = [
  { id: "all", label: "All projects" },
  { id: "build", label: "Build & Create" },
  { id: "research", label: "Research & Study" },
  { id: "career", label: "Career & Agents" },
];

const ProjectGallery: React.FC = () => {
  const [active, setActive] = useState<Category>("all");
  const shown = active === "all" ? projects : projects.filter((p) => p.cat === active);

  return (
    <section id="build" className="relative w-full py-14 sm:py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif mb-3">
            What You&apos;ll Build
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            A preview of the kinds of projects the live sessions and
            assignments build toward.
          </p>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      {p.catLabel}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;
