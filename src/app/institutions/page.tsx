"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Building2,
  GraduationCap,
  MapPin,
  Search,
  Users,
  Globe,
  Loader2,
  ArrowRight,
  Rocket,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Institution {
  id: number;
  institute_name: string;
  board: string;
  city: string;
  state: string;
  country: string;
  student_count: string;
  payment_status: string;
  created_at: string;
}

// ── Board config ──────────────────────────────────────────────────────────────

interface BoardStyle {
  label: string;
  color: string;
  bg: string;
  // Solid, opaque banner gradient (no photo, no category icon — real photos
  // implied these were the institution's own imagery, which they weren't;
  // a plain icon read as "neon" before. A colored band keeps the type
  // color-coding without claiming to depict the actual institution.)
  banner: string;
  hoverBorder: string;
}

const BOARD_CONFIG: Record<string, BoardStyle> = {
  university: {
    label: "University", color: "text-violet-400", bg: "bg-[#211a38] border-[#3d2f63]",
    banner: "bg-gradient-to-br from-[#241c3f] to-[#151024]",
    hoverBorder: "group-hover:border-violet-600",
  },
  college: {
    label: "College", color: "text-sky-400", bg: "bg-[#122334] border-[#1f3d57]",
    banner: "bg-gradient-to-br from-[#14283e] to-[#0f1a28]",
    hoverBorder: "group-hover:border-sky-600",
  },
  "autonomous college": {
    label: "Autonomous", color: "text-cyan-400", bg: "bg-[#0f2a2e] border-[#1d494f]",
    banner: "bg-gradient-to-br from-[#113034] to-[#0d1e21]",
    hoverBorder: "group-hover:border-cyan-600",
  },
  school: {
    label: "School", color: "text-emerald-400", bg: "bg-[#10271e] border-[#1e4433]",
    banner: "bg-gradient-to-br from-[#122b21] to-[#0d1c16]",
    hoverBorder: "group-hover:border-emerald-600",
  },
  company: {
    label: "Company", color: "text-orange-400", bg: "bg-[#2a1c10] border-[#4a331e]",
    banner: "bg-gradient-to-br from-[#2e2013] to-[#1d140c]",
    hoverBorder: "group-hover:border-orange-600",
  },
  startup: {
    label: "Startup", color: "text-amber-400", bg: "bg-[#29210e] border-[#483b1a]",
    banner: "bg-gradient-to-br from-[#2d2410] to-[#1c170a]",
    hoverBorder: "group-hover:border-amber-600",
  },
  organization: {
    label: "Organisation", color: "text-rose-400", bg: "bg-[#291119] border-[#481e2d]",
    banner: "bg-gradient-to-br from-[#2d1420] to-[#1c0d14]",
    hoverBorder: "group-hover:border-rose-600",
  },
  other: {
    label: "Other", color: "text-zinc-300", bg: "bg-[#1c1c22] border-[#33333c]",
    banner: "bg-gradient-to-br from-[#1e1e24] to-[#131316]",
    hoverBorder: "group-hover:border-zinc-600",
  },
};

function getBoard(board: string) {
  return BOARD_CONFIG[board?.toLowerCase()] ?? BOARD_CONFIG.other;
}

// Letter-mark fallback logo — like Slack/Notion/GitHub avatars, derived from
// the institution's own name (not a stock image or a generic category icon),
// so it can never be mistaken for the institution's real branding.
function getInitial(name: string): string {
  const trimmed = name.trim();
  return trimmed ? trimmed[0].toUpperCase() : "?";
}

// ── Institution Card ──────────────────────────────────────────────────────────

function InstitutionCard({ inst }: { inst: Institution }) {
  const cfg = getBoard(inst.board);

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#111118] shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.6)] ${cfg.hoverBorder}`}
    >
      {/* Tinted header band — solid color per institution type, no photo and
          no icon (real photos misleadingly implied the institution's own
          imagery; a generic icon read as decoration, not identity). */}
      <div className={`h-20 w-full ${cfg.banner}`} />

      <div className="flex flex-1 flex-col px-5 pb-5">
        {/* Letter-mark avatar, overlapping the header/content boundary.
            `relative z-10` keeps it reliably above the banner in every
            state — see the stacking-context note this earned earlier: a
            `position: relative` sibling paints above non-positioned ones
            regardless of DOM order, independent of any transform/hover. */}
        <div
          className={`relative z-10 -mt-7 mb-3 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border ring-4 ring-[#111118] transition-transform duration-300 group-hover:scale-105 ${cfg.bg}`}
        >
          <span className={`text-2xl font-bold ${cfg.color}`}>
            {getInitial(inst.institute_name)}
          </span>
        </div>

        {/* Badges */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold ${cfg.bg} ${cfg.color}`}>
            {cfg.label}
          </span>
          {inst.country !== "India" && (
            <span className="inline-flex items-center gap-1 rounded-full border border-[#481e2d] bg-[#291119] px-2.5 py-1 text-[10px] font-semibold text-rose-400">
              <Globe className="h-2.5 w-2.5" /> Intl.
            </span>
          )}
        </div>

        {/* Name */}
        <h2 className="mb-4 line-clamp-2 text-base font-bold leading-snug text-white transition-colors duration-300 group-hover:text-zinc-50">
          {inst.institute_name}
        </h2>

        {/* Meta */}
        <div className="mt-auto space-y-2 border-t border-zinc-800/80 pt-4">
          <div className="flex items-center gap-2.5 text-[11px] text-zinc-400">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-zinc-800/70">
              <MapPin className="h-3 w-3 text-zinc-500" />
            </span>
            <span className="truncate">{[inst.city, inst.state, inst.country].filter(Boolean).join(", ")}</span>
          </div>
          {inst.student_count && (
            <div className="flex items-center gap-2.5 text-[11px] text-zinc-400">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-zinc-800/70">
                <Users className="h-3 w-3 text-zinc-500" />
              </span>
              <span>{inst.student_count} students</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function InstitutionsPage() {
  const [all, setAll] = useState<Institution[]>([]);
  const [filtered, setFiltered] = useState<Institution[]>([]);
  const [search, setSearch] = useState("");
  const [boardFilter, setBoardFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/institutional-registration", { cache: "no-store" });
      const json = await res.json() as { success?: boolean; data?: Institution[]; message?: string };
      if (!res.ok) throw new Error(json.message ?? "Failed to load institutions.");
      setAll(json.data ?? []);
      setFiltered(json.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load institutions.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  useEffect(() => {
    const q = search.toLowerCase().trim();
    setFiltered(
      all.filter((inst) => {
        const matchSearch =
          !q ||
          inst.institute_name.toLowerCase().includes(q) ||
          inst.city?.toLowerCase().includes(q) ||
          inst.state?.toLowerCase().includes(q);
        const matchBoard =
          !boardFilter || inst.board?.toLowerCase() === boardFilter.toLowerCase();
        return matchSearch && matchBoard;
      })
    );
  }, [search, boardFilter, all]);

  const uniqueBoards = [...new Set(all.map((i) => i.board?.toLowerCase()).filter(Boolean))];
  const countryCount = [...new Set(all.map((i) => i.country).filter(Boolean))].length;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-300">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/3 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-10 md:pt-16 md:pb-12">
          {/* Label */}
          <div className="flex items-center gap-3 mb-5">
            <Rocket className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-orange-500 text-[10px] font-bold tracking-[0.2em] uppercase">
              Def-Space Programme
            </span>
            <div className="h-px w-10 bg-orange-500/50" />
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-3 leading-tight">
            Partner{" "}
            <span className="text-orange-500">Institutions</span>
          </h1>
          <p className="text-zinc-500 text-sm max-w-2xl leading-relaxed mb-7">
            Universities, colleges, schools and organisations that have partnered with BSERC under the Def-Space Programme.
          </p>

          {/* Stats + CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {!isLoading && all.length > 0 && (
                <>
                  <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3.5 py-1.5 text-xs text-zinc-400">
                    <Building2 className="w-3.5 h-3.5 text-orange-400" />
                    <span><span className="text-white font-semibold">{all.length}</span> institutions</span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3.5 py-1.5 text-xs text-zinc-400">
                    <Globe className="w-3.5 h-3.5 text-orange-400" />
                    <span><span className="text-white font-semibold">{countryCount}</span> {countryCount === 1 ? "country" : "countries"}</span>
                  </div>
                </>
              )}
            </div>
            <Link
              href="/institutional-registration"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-bold text-sm transition-all active:scale-95 shadow-lg shadow-orange-500/20 whitespace-nowrap"
            >
              Register Institution
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="sticky top-0 z-20 bg-[#0a0a0f]/95 backdrop-blur-sm border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, city, state…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/20 transition-colors"
            />
          </div>
          <select
            value={boardFilter}
            onChange={(e) => setBoardFilter(e.target.value)}
            className="sm:w-48 px-3 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-sm text-zinc-300 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/20 transition-colors appearance-none"
          >
            <option value="">All Types</option>
            {uniqueBoards.map((b) => (
              <option key={b} value={b}>{getBoard(b).label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <p className="text-zinc-600 text-sm">Loading institutions…</p>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-900/30 bg-red-950/20 px-6 py-8 text-center">
            <p className="text-red-300 text-sm">{error}</p>
            <button onClick={() => void load()} className="mt-4 text-xs text-orange-400 hover:text-orange-300 underline underline-offset-2">
              Try again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <GraduationCap className="w-12 h-12 text-zinc-800" />
            <p className="text-zinc-600 text-sm">
              {all.length === 0 ? "No partner institutions yet." : "No institutions match your filters."}
            </p>
            {(search || boardFilter) && (
              <button onClick={() => { setSearch(""); setBoardFilter(""); }} className="text-xs text-orange-400 hover:text-orange-300 underline underline-offset-2">
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            {(search || boardFilter) && (
              <p className="text-xs text-zinc-600 mb-5">
                Showing <span className="text-zinc-300 font-semibold">{filtered.length}</span> of {all.length} institutions
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((inst) => (
                <InstitutionCard key={inst.id} inst={inst} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
