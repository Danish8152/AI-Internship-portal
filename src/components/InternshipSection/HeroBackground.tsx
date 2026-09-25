import React from "react";

// Deterministic pseudo-random points so the server and client render the exact
// same constellation (no Math.random, no hydration mismatch).
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const rand = seeded(20260925);
const POINTS = Array.from({ length: 38 }, () => ({
  x: Math.round(rand() * 1000),
  y: Math.round(rand() * 600),
  r: 1.6 + rand() * 1.8,
}));

const EDGES: Array<[number, number]> = [];
for (let i = 0; i < POINTS.length; i++) {
  for (let j = i + 1; j < POINTS.length; j++) {
    const dx = POINTS[i].x - POINTS[j].x;
    const dy = POINTS[i].y - POINTS[j].y;
    if (Math.hypot(dx, dy) < 175) EDGES.push([i, j]);
  }
}

const GRID = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
  backgroundSize: "44px 44px",
  maskImage: "radial-gradient(ellipse at 50% 30%, black 15%, transparent 72%)",
  WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 15%, transparent 72%)",
} as const;

export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-500/15 blur-[130px]" />
      <div className="absolute -right-32 top-1/3 h-[480px] w-[480px] rounded-full bg-orange-500/15 blur-[130px]" />
      <div className="absolute inset-0 opacity-[0.06]" style={GRID} />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {EDGES.map(([i, j]) => (
          <line
            key={`${i}-${j}`}
            x1={POINTS[i].x}
            y1={POINTS[i].y}
            x2={POINTS[j].x}
            y2={POINTS[j].y}
            stroke="#22D3EE"
            strokeOpacity="0.13"
            strokeWidth="1"
          />
        ))}
        {POINTS.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={i % 5 === 0 ? "#F97316" : "#22D3EE"}
            fillOpacity={i % 5 === 0 ? 0.7 : 0.55}
            className={i % 3 === 0 ? "animate-pulse motion-reduce:animate-none" : undefined}
            style={i % 3 === 0 ? { animationDelay: `${(i % 7) * 0.45}s` } : undefined}
          />
        ))}
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_28%,rgba(0,0,0,0.6),transparent_65%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
