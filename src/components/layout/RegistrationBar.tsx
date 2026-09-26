"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INTERNSHIP, REGISTER } from "@/data/internship";

const SHOW_AFTER_PX = 200;

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const getSnapshot = () => window.scrollY > SHOW_AFTER_PX;
const getServerSnapshot = () => false;

export default function RegistrationBar() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div
      inert={!visible}
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-50 bg-black/95 border-t border-white/10 backdrop-blur-md transition-transform duration-300 ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <p className="flex items-center gap-3 text-sm sm:text-base text-gray-100 min-w-0">
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
          </span>
          <span className="truncate">
            <strong className="font-extrabold">Registrations are open</strong>
            <span className="hidden md:inline text-gray-400 font-semibold">
              {" "}
              &middot; {INTERNSHIP.shortName} &middot; {INTERNSHIP.sessionsLine}
            </span>
          </span>
        </p>
        <Link
          href={REGISTER.href}
          {...REGISTER.linkProps}
          className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-orange-400 active:scale-95"
        >
          Register Now
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
