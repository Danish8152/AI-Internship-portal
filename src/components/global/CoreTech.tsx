import React from "react";
import { Brain, Cpu, Search, Database, MessageSquare, Bot, LayoutGrid, Code2, Zap } from "lucide-react";
import Reveal from "@/components/InternshipSection/Reveal";

interface Node {
  label: string;
  icon: React.ElementType;
}

const leftNodes: Node[] = [
  { label: "LLMs", icon: Cpu },
  { label: "RAG", icon: Search },
  { label: "Vector Databases", icon: Database },
  { label: "Prompt Engineering", icon: MessageSquare },
];

const rightNodes: Node[] = [
  { label: "AI Agents", icon: Bot },
  { label: "AI Applications", icon: LayoutGrid },
  { label: "APIs", icon: Code2 },
  { label: "Automation", icon: Zap },
];

// 4 items spread with justify-evenly across a full-height column land at
// 1/8, 3/8, 5/8, 7/8 of the column (12.5%, 37.5%, 62.5%, 87.5%) — used here
// so the SVG connector lines (in percentage viewBox space) line up with the
// evenly-spaced node pills regardless of container size.
const NODE_Y = [12.5, 37.5, 62.5, 87.5];
// Glow-dot positions along each line at t=0.55 from hub toward node,
// computed in plain container-percentage space (not the SVG's stretched
// viewBox) so a fixed-size circular dot stays perfectly round.
const DOT_Y = NODE_Y.map((y) => 50 + (y - 50) * 0.55);

const STAR_FIELD: React.CSSProperties = {
  backgroundImage: `
    radial-gradient(1.6px 1.6px at 10% 15%, #fff, transparent),
    radial-gradient(1px 1px at 25% 45%, #fff, transparent),
    radial-gradient(1.4px 1.4px at 40% 10%, #fff, transparent),
    radial-gradient(1px 1px at 55% 60%, #fff, transparent),
    radial-gradient(1.8px 1.8px at 70% 25%, #fff, transparent),
    radial-gradient(1px 1px at 85% 50%, #fff, transparent),
    radial-gradient(1.2px 1.2px at 15% 75%, #fff, transparent),
    radial-gradient(1px 1px at 90% 80%, #fff, transparent),
    radial-gradient(1.5px 1.5px at 50% 90%, #fff, transparent),
    radial-gradient(1px 1px at 65% 5%, #fff, transparent)
  `,
  backgroundRepeat: "repeat",
  backgroundSize: "220px 220px",
};

export const CoreTech: React.FC = () => {
  return (
    <section className="relative overflow-hidden w-full py-12 sm:py-16 px-4 bg-black">
      <div className="absolute inset-0 opacity-40" style={STAR_FIELD} aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Reveal className="mb-10 sm:mb-14">
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Core Technology Domains
          </h3>
          <p className="mt-2 text-gray-400 text-sm sm:text-base max-w-xl">
            Explore the modern AI stack and the tools that power intelligent
            systems.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative h-[420px] sm:h-[460px] lg:h-[480px]">
            {/* Ambient glow behind the whole diagram */}
            <div
              className="absolute left-1/2 top-1/2 h-[420px] w-[420px] sm:h-[480px] sm:w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[90px]"
              aria-hidden="true"
            />
            <div
              className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[80px]"
              aria-hidden="true"
            />

            {/* Connector lines, drawn from the hub outward to each node's
                anchor point. Percentage viewBox + non-scaling stroke keeps
                this correct at any container size. */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {NODE_Y.map((y) => (
                <line
                  key={`l-${y}`}
                  x1="50"
                  y1="50"
                  x2="34"
                  y2={y}
                  stroke="#22D3EE"
                  strokeOpacity="0.4"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              {NODE_Y.map((y) => (
                <line
                  key={`r-${y}`}
                  x1="50"
                  y1="50"
                  x2="66"
                  y2={y}
                  stroke="#F97316"
                  strokeOpacity="0.4"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>

            {/* Glowing pulse-dots riding the connector lines. Plain HTML
                dots (not SVG geometry) so they stay perfectly round even
                though the SVG above is non-uniformly stretched. */}
            {DOT_Y.map((y, i) => (
              <span
                key={`ld-${i}`}
                className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_8px_2px_rgba(34,211,238,0.7)]"
                style={{ left: "41%", top: `${y}%`, animationDelay: `${i * 0.25}s` }}
                aria-hidden="true"
              />
            ))}
            {DOT_Y.map((y, i) => (
              <span
                key={`rd-${i}`}
                className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300 animate-pulse shadow-[0_0_8px_2px_rgba(249,115,22,0.7)]"
                style={{ left: "59%", top: `${y}%`, animationDelay: `${i * 0.25 + 0.4}s` }}
                aria-hidden="true"
              />
            ))}

            {/* Orbit rings */}
            <div
              className="absolute left-1/2 top-1/2 h-80 w-80 sm:h-96 sm:w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400/10 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute left-1/2 top-1/2 h-60 w-60 sm:h-72 sm:w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-cyan-400/25 pointer-events-none animate-[spin_30s_linear_infinite]"
              aria-hidden="true"
            />
            <div
              className="absolute left-1/2 top-1/2 h-44 w-44 sm:h-52 sm:w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20 pointer-events-none"
              aria-hidden="true"
            />

            {/* Hub */}
            <div className="absolute left-1/2 top-1/2 flex h-32 w-32 sm:h-40 sm:w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-cyan-400 bg-[radial-gradient(circle,rgba(34,211,238,0.22),rgba(10,12,22,0.94)_75%)] text-center shadow-[0_0_50px_10px_rgba(34,211,238,0.3)]">
              <div className="absolute inset-1.5 rounded-full border border-white/10" aria-hidden="true" />
              <Brain className="h-7 w-7 sm:h-9 sm:w-9 text-cyan-300 mb-1.5 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
              <p className="text-[11px] sm:text-sm font-extrabold tracking-wide text-white leading-tight">
                <span className="block">GENERATIVE</span>
                <span className="block">AI</span>
              </p>
            </div>

            {/* Left nodes */}
            <div className="absolute left-0 top-0 h-full w-[36%] flex flex-col justify-evenly items-start">
              {leftNodes.map((n) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.label}
                    className="group flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/5 py-1.5 pl-1.5 pr-3 sm:py-2 sm:pl-2 sm:pr-3.5 text-[11px] sm:text-sm font-semibold text-cyan-100 shadow-[0_0_14px_-4px_rgba(34,211,238,0.4)] transition-all duration-300 hover:scale-[1.04] hover:border-cyan-400/60 hover:bg-cyan-500/10"
                  >
                    <span className="flex h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 items-center justify-center rounded-full bg-cyan-400/15">
                      <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-cyan-300" />
                    </span>
                    {n.label}
                  </div>
                );
              })}
            </div>

            {/* Right nodes */}
            <div className="absolute right-0 top-0 h-full w-[36%] flex flex-col justify-evenly items-end">
              {rightNodes.map((n) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.label}
                    className="group flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/5 py-1.5 pl-3 pr-1.5 sm:py-2 sm:pl-3.5 sm:pr-2 text-[11px] sm:text-sm font-semibold text-orange-100 shadow-[0_0_14px_-4px_rgba(249,115,22,0.4)] transition-all duration-300 hover:scale-[1.04] hover:border-orange-400/60 hover:bg-orange-500/10"
                  >
                    {n.label}
                    <span className="flex h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 items-center justify-center rounded-full bg-orange-400/15">
                      <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-orange-300" />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
