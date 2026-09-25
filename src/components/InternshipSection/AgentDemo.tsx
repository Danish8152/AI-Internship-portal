"use client";

import { useEffect, useState } from "react";
import { Bot, Check, Loader2 } from "lucide-react";

interface PreviewProps {
  steps: number;
  done: boolean;
}

const Spinner = () => <Loader2 className="h-4 w-4 animate-spin" />;

function AppPreview({ steps, done }: PreviewProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-bold text-gray-100">Bill splitter</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-cyan-400/40 px-3 py-2 text-sm font-semibold text-cyan-200">
          <span className="block text-[10px] font-medium text-gray-500">Total</span>
          ₹ 2,400
        </div>
        <div className="rounded-lg border border-cyan-400/40 px-3 py-2 text-sm font-semibold text-cyan-200">
          <span className="block text-[10px] font-medium text-gray-500">People</span>
          4
        </div>
      </div>
      <div className="rounded-lg bg-orange-500 py-2 text-center text-xs font-bold text-black">
        Split it
      </div>
      {steps >= 3 && (
        <div className="flex items-center justify-between rounded-lg border border-orange-400/40 bg-orange-500/10 px-3 py-2.5">
          <span className="text-sm font-bold text-orange-200">₹ 600 each</span>
          <span className={done ? "text-cyan-300" : "text-gray-500"}>
            {done ? <Check className="h-4 w-4" strokeWidth={3} /> : <Spinner />}
          </span>
        </div>
      )}
    </div>
  );
}

const EVIDENCE = [
  { src: "[1] Paper A", note: "Claim supported", ok: true },
  { src: "[2] Report B", note: "Claim supported", ok: true },
  { src: "[3] Blog C", note: "No source found", ok: false },
];

function EvidencePreview({ steps }: PreviewProps) {
  const checked = steps >= 3;
  return (
    <div className="space-y-2.5">
      <p className="text-sm font-bold text-gray-100">Evidence table</p>
      {EVIDENCE.slice(0, checked ? 3 : 2).map((r) => (
        <div
          key={r.src}
          className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2"
        >
          <span>
            <span className="block text-xs font-bold text-gray-100">{r.src}</span>
            <span className="text-[11px] text-gray-500">{r.note}</span>
          </span>
          {!checked ? (
            <span className="text-gray-500">
              <Spinner />
            </span>
          ) : r.ok ? (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-black">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
          ) : (
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-orange-400/60 text-xs font-bold text-orange-300">
              ?
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

const BARS = [
  { m: "Jan", h: 36, hot: false },
  { m: "Feb", h: 56, hot: true },
  { m: "Mar", h: 52, hot: false },
];

function ReportPreview({ steps, done }: PreviewProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-bold text-gray-100">Sales report</p>
      <div className="flex h-[96px] items-end gap-3 rounded-lg border border-white/10 px-4 pb-2 pt-3">
        {BARS.map((b) => (
          <div key={b.m} className="flex flex-1 flex-col items-center justify-end gap-1">
            <div
              className={`w-full rounded-t ${b.hot ? "bg-orange-500" : "bg-cyan-400/60"}`}
              style={{ height: b.h }}
            />
            <span className="text-[10px] text-gray-500">{b.m}</span>
          </div>
        ))}
      </div>
      {steps >= 3 && (
        <div className="flex items-center justify-between rounded-lg border border-orange-400/40 bg-orange-500/10 px-3 py-2.5">
          <span className="text-sm font-bold text-orange-200">Total 12,480</span>
          <span className={done ? "text-cyan-300" : "text-gray-500"}>
            {done ? <Check className="h-4 w-4" strokeWidth={3} /> : <Spinner />}
          </span>
        </div>
      )}
    </div>
  );
}

interface Scenario {
  prompt: string;
  steps: Array<{ label: string; detail: string }>;
  doneMessage: string;
  file: string;
  checked: string;
  Preview: React.FC<PreviewProps>;
}

const SCENARIOS: Scenario[] = [
  {
    prompt: "Build me a small app that splits a ₹2,400 bill between 4 friends.",
    steps: [
      { label: "Plan", detail: "Break the task into three small steps." },
      { label: "Act", detail: "Build the app: inputs, a split button and a result." },
      { label: "Check", detail: "Test the split against the numbers you gave." },
    ],
    doneMessage: "Done. Each person pays ₹600, and I checked the total against your numbers.",
    file: "bill-splitter.html",
    checked: "✓ Checked against your numbers",
    Preview: AppPreview,
  },
  {
    prompt: "Read these 3 sources and tell me which claims are actually backed up.",
    steps: [
      { label: "Plan", detail: "List the claims and the sources to check." },
      { label: "Act", detail: "Match each claim to a passage in a source." },
      { label: "Check", detail: "Flag any claim the sources don't support." },
    ],
    doneMessage: "Done. Two claims are backed by a source; one needs verifying before you use it.",
    file: "evidence-table.html",
    checked: "✓ Every claim traced to a source",
    Preview: EvidencePreview,
  },
  {
    prompt: "Clean this sales spreadsheet and turn it into a one-page report.",
    steps: [
      { label: "Plan", detail: "Decide what the report should show." },
      { label: "Act", detail: "Clean the data and build a chart." },
      { label: "Check", detail: "Re-add the totals to make sure they match." },
    ],
    doneMessage: "Done. The report is ready, and its total of 12,480 matches the source sheet.",
    file: "sales-report.html",
    checked: "✓ Total matches the source",
    Preview: ReportPreview,
  },
];

const TYPE_MS = 32;
const STEP_MS = 1150;
const HOLD_MS = 4500;

export default function AgentDemo() {
  const [run, setRun] = useState(0);
  const [typed, setTyped] = useState(0);
  const [steps, setSteps] = useState(0);
  const [done, setDone] = useState(false);

  const active = run % SCENARIOS.length;
  const scenario = SCENARIOS[active];
  const Preview = scenario.Preview;

  useEffect(() => {
    const current = SCENARIOS[run % SCENARIOS.length];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };
    const cleanup = () => timers.forEach((t) => window.clearTimeout(t));

    if (reduce) {
      at(0, () => {
        setTyped(current.prompt.length);
        setSteps(current.steps.length);
        setDone(true);
      });
      return cleanup;
    }

    at(0, () => {
      setTyped(0);
      setSteps(0);
      setDone(false);
    });
    for (let i = 1; i <= current.prompt.length; i++) {
      at(700 + i * TYPE_MS, () => setTyped(i));
    }
    const t0 = 700 + current.prompt.length * TYPE_MS + 500;
    current.steps.forEach((_, i) => at(t0 + i * STEP_MS, () => setSteps(i + 1)));
    const tDone = t0 + current.steps.length * STEP_MS + 200;
    at(tDone, () => setDone(true));
    at(tDone + HOLD_MS, () => setRun((r) => r + 1));

    return cleanup;
  }, [run]);

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0b0f1a]/90 text-left shadow-[0_30px_80px_-20px_rgba(34,211,238,0.28)] backdrop-blur-xl"
    >
      {/* Window bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-orange-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <p className="ml-3 text-xs font-semibold text-gray-400">agent-workspace</p>
        <span className="ml-3 flex items-center gap-1.5">
          {SCENARIOS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-4 bg-cyan-300" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[11px] font-bold text-cyan-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
          live
        </span>
      </div>

      <div className="grid md:grid-cols-[1.1fr_0.9fr]">
        {/* Chat */}
        <div className="min-h-[420px] space-y-4 p-4 sm:p-6 md:min-h-[360px] xl:min-h-[420px]">
          <div className="ml-auto min-h-[2.75rem] max-w-[88%] rounded-2xl rounded-br-md border border-orange-400/30 bg-orange-500/10 px-4 py-2.5 text-sm leading-relaxed text-gray-100">
            {scenario.prompt.slice(0, typed)}
            {typed < scenario.prompt.length && (
              <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-orange-300" />
            )}
          </div>

          {steps > 0 && (
            <div className="max-w-[94%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3">
              <p className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-cyan-300">
                <Bot className="h-4 w-4" />
                Agent
              </p>
              <ul className="space-y-2.5">
                {scenario.steps.slice(0, steps).map((s, i) => {
                  const complete = done || i < steps - 1;
                  return (
                    <li key={s.label} className="flex items-start gap-2.5 text-sm">
                      <span
                        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                          complete
                            ? "bg-cyan-400 text-black"
                            : "border border-orange-400/60 text-orange-300"
                        }`}
                      >
                        {complete ? (
                          <Check className="h-3 w-3" strokeWidth={3} />
                        ) : (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        )}
                      </span>
                      <span>
                        <strong className="text-gray-100">{s.label}</strong>
                        <span className="text-gray-400"> — {s.detail}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              {done && (
                <p className="mt-3 border-t border-white/10 pt-3 text-sm text-gray-200">
                  {scenario.doneMessage}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Live preview */}
        <div className="border-t border-white/10 bg-black/40 p-4 sm:p-6 md:border-l md:border-t-0">
          <p className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-gray-500">
            Preview
            <span className="normal-case tracking-normal text-gray-600">
              {steps >= 2 ? scenario.file : "…"}
            </span>
          </p>
          <div className="min-h-[230px] rounded-xl border border-white/10 bg-[#0f1424] p-4">
            {steps === 0 && (
              <div className="flex h-[196px] items-center justify-center rounded-lg border border-dashed border-white/15 text-xs text-gray-500">
                <span className="animate-pulse">Waiting for a task…</span>
              </div>
            )}
            {steps === 1 && (
              <div className="space-y-3 pt-1">
                <div className="h-3 w-1/3 animate-pulse rounded bg-white/10" />
                <div className="h-9 w-full animate-pulse rounded-lg bg-white/[0.07]" />
                <div className="h-9 w-full animate-pulse rounded-lg bg-white/[0.07]" />
                <div className="h-9 w-2/3 animate-pulse rounded-lg bg-white/[0.07]" />
              </div>
            )}
            {steps >= 2 && <Preview steps={steps} done={done} />}
          </div>
          <p className="mt-3 h-4 text-[11px] font-semibold text-cyan-300">
            {done ? scenario.checked : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
