"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}

export default function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
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
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cls = `transition-opacity duration-700 ease-out ${
    inView ? "opacity-100" : "opacity-0"
  } ${className}`;
  const style = { transitionDelay: inView ? `${delay}ms` : "0ms" };

  if (as === "li") {
    return (
      <li ref={ref} style={style} className={cls}>
        {children}
      </li>
    );
  }

  return (
    <div ref={ref} style={style} className={cls}>
      {children}
    </div>
  );
}
