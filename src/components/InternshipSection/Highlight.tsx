"use client";

import { useEffect, useRef, useState } from "react";

interface HighlightProps {
  children: React.ReactNode;
  color?: "orange" | "cyan";
}

export default function Highlight({ children, color = "orange" }: HighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const bar = color === "orange" ? "bg-orange-500/35" : "bg-cyan-400/35";

  return (
    <span ref={ref} className={`group relative inline-block ${inView ? "is-in" : ""}`}>
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute inset-x-0 bottom-0.5 h-[0.4em] origin-left scale-x-0 transition-transform duration-700 ease-out group-[.is-in]:scale-x-100 ${bar}`}
        aria-hidden="true"
      />
    </span>
  );
}
