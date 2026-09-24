import React from "react";
import { Check, ChevronDown } from "lucide-react";
import Reveal from "./Reveal";
import Highlight from "./Highlight";
import CircledWord from "./CircledWord";
import { INTERNSHIP } from "@/data/internship";

interface Session {
  n: number;
  title: string;
  timetableTitle: string;
  outcome: string;
  body: string;
  gloss: Array<[string, string]>;
  live: string;
  practise: string;
}

const sessions: Session[] = [
  {
    n: 1,
    title: "Understand the system",
    timetableTitle: "Understand the system",
    outcome: "Know what is happening behind the answer, and what lets AI do real work.",
    body: "Generative AI and models, tokens, context windows, temperature and hallucinations, the model versus the app versus the agent, and the harness of tools and boundaries around it.",
    gloss: [
      ["Generative AI", "Software that creates new text, images or code from what you ask it."],
      ["Token", "A small piece of text a model reads and writes."],
      ["Context window", "How much the model can keep in view at once."],
      ["Temperature", "A setting for how much variety the answers have."],
      ["Hallucination", "A confident answer that is not supported by facts or sources."],
    ],
    live: "the same task asked vaguely and then well, plus an unsupported answer caught and checked.",
    practise: "write a clear task brief, compare two outputs and spot one unsupported claim.",
  },
  {
    n: 2,
    title: "Ground your work in sources",
    timetableTitle: "Ground your work in sources",
    outcome: "Get useful help from your own material, with sources you can check.",
    body: "Prompts, instructions, examples and constraints, context engineering, embeddings in plain language, retrieval-augmented generation (RAG), NotebookLM-style grounded work and source checks.",
    gloss: [
      ["Context engineering", "Choosing what the AI sees, so its answer fits your task."],
      ["Embeddings", "Numbers that capture meaning, so related ideas sit close together."],
      ["Grounded", "Based on sources you can point to, not on guesswork."],
    ],
    live: "a research brief built from supplied documents, spreadsheets and slides made from your material, and information from several connected apps pulled into one brief.",
    practise: "build a source-backed brief or evidence table, and check where each claim comes from.",
  },
  {
    n: 3,
    title: "Build, test and share",
    timetableTitle: "Build, test and share",
    outcome: "Turn a clear idea into something interactive, then check that it works.",
    body: "A simple build specification, thinking in HTML, small web apps, games and interactive learning pages, then giving visual feedback and testing what you built.",
    gloss: [
      ["Multimodal", "AI that works with more than text, such as images and files."],
      ["Build specification", "A short, plain description of what you want built and how you will know it works."],
      ["Thinking in HTML", "Seeing how a web page is put together, so you can guide AI to build one."],
    ],
    live: "a useful app and a small game, then hosting and sharing them, how a prototype becomes a live app, and desktop and phone apps as examples of where this can go.",
    practise: "adapt one scoped build, give it visual feedback and test it with a simple checklist.",
  },
  {
    n: 4,
    title: "Work with agents across tools",
    timetableTitle: "Work with agents across tools",
    outcome: "Guide multi-step work and check the result.",
    body: "The agent's act-and-check loop, choosing a model and a place to work, tools, file and spreadsheet workflows, and drafting emails and messages (draft first, send only with your say-so), with evaluation and recovery where they matter.",
    gloss: [
      ["Evaluation", "Checking whether the result is actually good."],
      ["Recovery", "What to do when a step goes wrong."],
    ],
    live: "side tasks running while AI builds, a scheduled task, sub-agents on a research job, computer use and voice or phone control, with checks along the way.",
    practise: "map a workflow, run it once and find where it could fail.",
  },
  {
    n: 5,
    title: "Create and communicate",
    timetableTitle: "Create and communicate",
    outcome: "Apply AI to career and content tasks.",
    body: "Resume and LinkedIn draft workflows grounded in your actual experience, presentations, and AI-assisted video editing with clips, arrangement and captions.",
    gloss: [
      ["Career evidence", "Real examples of what you have done, gathered so drafts stay truthful."],
      ["Repurposing", "Turning one piece of content into other formats, such as a short clip or a summary."],
      ["Timestamped checks", "Notes that point to the exact moment in a video, so you can verify them."],
    ],
    live: "selected career and content examples, image creation and edits, and a short video analysis. Not every task becomes a full project.",
    practise: "revise one career or content piece and note what you checked.",
  },
  {
    n: 6,
    title: "Make your work reusable and reliable",
    timetableTitle: "Reusable and reliable",
    outcome: "Explain, check and improve what you build.",
    body: "Reusable skills, Teach-style learning workflows, Grill Me-style critical questioning, sycophancy, prompt injection, evaluation, failure recovery and an end-to-end workflow.",
    gloss: [
      ["Skill", "A saved set of instructions you can reuse."],
      ["Sycophancy", "When an AI agrees with you instead of telling you what is accurate."],
    ],
    live: "an end-to-end workflow, a recorded task turned into repeatable steps, and an API in action.",
    practise: "turn a method that worked into a reusable workflow and test it on a new input.",
  },
];

const days = ["Friday", "Saturday", "Sunday"];
const weekends = [
  { label: "Weekend 1", sessions: sessions.slice(0, 3) },
  { label: "Weekend 2", sessions: sessions.slice(3) },
];

const HoursPill: React.FC = () => (
  <span className="my-2 inline-block rounded-full border border-orange-300/60 bg-orange-500 px-3 py-0.5 text-xs font-extrabold leading-relaxed text-black">
    {INTERNSHIP.hoursEach} hours
  </span>
);

const Schedule: React.FC = () => {
  return (
    <section id="schedule" className="relative w-full py-14 sm:py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif leading-tight mb-4">
            Understand the system. Then <Highlight>put it to work.</Highlight>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            The concepts explain what you see in the demonstrations. The
            assignments help you apply them.
          </p>
          <p className="mt-4 text-gray-200 text-base sm:text-lg leading-relaxed">
            This <CircledWord>Internship</CircledWord> runs as six live
            sessions of two hours each. Every session follows the same rhythm:
            recap, concepts, live demonstration, guided practice, questions and
            the next assignment brief.
          </p>
        </Reveal>

        {/* Timetable — desktop */}
        <Reveal delay={100}>
          <div className="mt-10 hidden overflow-hidden rounded-2xl border-2 border-white/20 bg-black md:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Live session timetable: six sessions of two hours each across two weekends
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[150px] border-b border-r border-white/10 bg-white/5 p-5">
                    <span className="sr-only">Weekend</span>
                  </th>
                  {days.map((d, i) => (
                    <th
                      key={d}
                      scope="col"
                      className={`border-b border-white/10 bg-white/5 p-5 text-base font-bold text-gray-200 ${
                        i < days.length - 1 ? "border-r" : ""
                      }`}
                    >
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weekends.map((w, wi) => (
                  <tr key={w.label}>
                    <th
                      scope="row"
                      className={`whitespace-nowrap border-r border-white/10 bg-white/5 p-5 text-base font-bold text-gray-200 ${
                        wi < weekends.length - 1 ? "border-b" : ""
                      }`}
                    >
                      {w.label}
                    </th>
                    {w.sessions.map((s, si) => (
                      <td
                        key={s.n}
                        className={`border-white/10 p-5 align-top ${
                          si < w.sessions.length - 1 ? "border-r" : ""
                        } ${wi < weekends.length - 1 ? "border-b" : ""}`}
                      >
                        <b className="block text-xl font-bold leading-snug text-white">
                          Session {s.n}
                        </b>
                        <HoursPill />
                        <span className="block text-base text-gray-400">
                          {s.timetableTitle}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Timetable — mobile */}
          <div className="mt-10 space-y-5 md:hidden">
            {weekends.map((w) => (
              <div
                key={w.label}
                className="overflow-hidden rounded-2xl border-2 border-white/20"
              >
                <p className="bg-white/5 px-5 py-3 text-base font-bold text-gray-200">
                  {w.label}
                </p>
                <ul>
                  {w.sessions.map((s, si) => (
                    <li key={s.n} className="border-t border-white/10 p-5">
                      <span className="mb-0.5 block text-sm font-extrabold text-cyan-400">
                        {days[si]}
                      </span>
                      <b className="block text-xl font-bold text-white">
                        Session {s.n}
                      </b>
                      <HoursPill />
                      <span className="block text-gray-400">{s.timetableTitle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <p className="mt-5 max-w-2xl text-sm sm:text-base font-bold text-gray-200">
          Six live sessions of two hours each: 12 live hours in total. Exact
          dates will be announced.
        </p>

        {/* Session-by-session detail */}
        <div className="mt-12 border-t border-white/15">
          {sessions.map((s) => (
            <details
              key={s.n}
              id={`session-${s.n}`}
              className="group scroll-mt-24 border-b border-white/10"
            >
              <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 py-5 md:grid-cols-[auto_1fr_auto_auto] [&::-webkit-details-marker]:hidden">
                <span
                  aria-hidden="true"
                  className="min-w-[1.5em] font-serif text-3xl font-extrabold leading-none tabular-nums text-orange-500 sm:text-4xl"
                >
                  {String(s.n).padStart(2, "0")}
                </span>
                <span className="block">
                  <span className="relative inline-block font-serif text-lg font-bold text-gray-100 sm:text-xl">
                    <span className="relative z-10">{s.title}</span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-[-0.1em] bottom-0 h-[0.42em] origin-left scale-x-0 bg-cyan-400/35 transition-transform duration-500 group-open:scale-x-100"
                    />
                  </span>
                  <span className="mt-1.5 flex items-start gap-2 text-sm text-gray-400 sm:text-base">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-cyan-400" />
                    {s.outcome}
                  </span>
                  <span className="mt-1 block text-xs font-extrabold text-gray-500 md:hidden">
                    Session {s.n} · {INTERNSHIP.hoursEach} hours
                  </span>
                </span>
                <span className="hidden text-sm font-extrabold tabular-nums text-gray-400 md:block">
                  Session {s.n} · {INTERNSHIP.hoursEach} hours
                </span>
                <ChevronDown className="h-6 w-6 text-orange-500 transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="grid max-w-4xl gap-4 pb-8 md:pl-[4.5rem]">
                <p className="max-w-3xl text-base leading-relaxed text-gray-300">
                  {s.body}
                </p>
                <dl>
                  {s.gloss.map(([term, def]) => (
                    <div
                      key={term}
                      className="grid gap-x-5 gap-y-0.5 border-t border-white/10 py-2.5 sm:grid-cols-[200px_1fr]"
                    >
                      <dt className="font-bold text-gray-100">{term}</dt>
                      <dd className="text-sm text-gray-400 sm:text-base">{def}</dd>
                    </div>
                  ))}
                </dl>
                <p className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-gray-200 sm:text-base">
                  <strong className="font-extrabold text-cyan-300">Live demonstration:</strong>{" "}
                  {s.live}
                </p>
                <p className="rounded-lg border border-orange-400/20 bg-orange-500/10 px-4 py-3 text-sm text-gray-200 sm:text-base">
                  <strong className="font-extrabold text-orange-300">You practise:</strong>{" "}
                  {s.practise}
                </p>
              </div>
            </details>
          ))}
        </div>
        <p className="mt-6 text-sm sm:text-base font-semibold text-gray-400">
          Checking and safety start early and come back in the last session,
          so they are never an afterthought.
        </p>
      </div>
    </section>
  );
};

export default Schedule;
