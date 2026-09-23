import Link from "next/link";

export default function RegistrationBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-black/95 border-t border-white/10 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <p className="flex items-center gap-3 text-sm font-semibold text-gray-100 min-w-0">
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
          </span>
          <span className="truncate">
            <span className="hidden sm:inline">Registrations opening soon &middot; </span>
            Gen AI &amp; AI Agents Internship
          </span>
        </p>
        <Link
          href="#format"
          className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-orange-400 active:scale-95"
        >
          Notify Me
        </Link>
      </div>
    </div>
  );
}
