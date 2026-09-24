"use client";

import { useEffect, useRef, useState } from "react";

export default function CircledWord({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
      setDrawn(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className="relative mx-[0.18em] inline-block whitespace-nowrap px-[0.12em] font-extrabold text-white"
    >
      {children}
      <svg
        viewBox="0 0 120 42"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute left-[-12%] top-[-24%] h-[150%] w-[124%] overflow-visible"
      >
        <path
          pathLength={1}
          d="M10 24C4 10 44 3 72 5c30 2 46 10 40 22-6 10-50 13-82 9C12 33 5 26 14 16"
          fill="none"
          stroke="#fb923c"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          style={{
            strokeDashoffset: drawn ? 0 : 1,
            transition: "stroke-dashoffset 1.1s cubic-bezier(.16,1,.3,1) .25s",
          }}
        />
      </svg>
    </span>
  );
}
