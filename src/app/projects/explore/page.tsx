"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  ExternalLink,
  Github,
  Loader2,
  Search,
  Users,
  Zap,
} from "lucide-react";
import type { ProjectListing, ProjectListingListResponse } from "@/types/project-listing";

// ── Theme & Level maps ────────────────────────────────────────────────────────

const THEME_LABELS: Record<string, string> = {
  "defence-space": "Defence Space",
  "ai-ml": "AI / ML",
  aerospace: "Aerospace",
  "drone-uav": "Drone / UAV",
  "remote-sensing": "Remote Sensing",
  robotics: "Robotics",
  satellite: "Satellite",
  other: "Other",
};

const THEME_COLORS: Record<string, string> = {
  "defence-space": "bg-rose-500/15 text-rose-300 border-rose-500/30",
  "ai-ml": "bg-violet-500/15 text-violet-300 border-violet-500/30",
  aerospace: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  "drone-uav": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "remote-sensing": "bg-teal-500/15 text-teal-300 border-teal-500/30",
  robotics: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  satellite: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  other: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30",
};

const LEVEL_LABELS: Record<string, string> = {
  concept: "Concept",
  proposal: "Proposal",
  ongoing: "Ongoing",
  completed: "Completed",
};

const LEVEL_COLORS: Record<string, string> = {
  concept: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  proposal: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  ongoing: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  completed: "bg-orange-500/15 text-orange-300 border-orange-500/30",
};

const PAGE_SIZE = 12;

// ── Helpers ───────────────────────────────────────────────────────────────────

function getThemeLabel(theme: string) {
  return THEME_LABELS[theme] ?? theme;
}

function getThemeColor(theme: string) {
  return THEME_COLORS[theme] ?? "bg-zinc-500/15 text-zinc-300 border-zinc-500/30";
}

function getLevelLabel(level: string) {
  return LEVEL_LABELS[level] ?? level;
}

function getLevelColor(level: string) {
  return LEVEL_COLORS[level] ?? "bg-zinc-500/15 text-zinc-300 border-zinc-500/30";
}

function truncate(text: string, max: number) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ExploreProjectsPage() {
  const [projects, setProjects] = useState<ProjectListing[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [themeFilter, setThemeFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(PAGE_SIZE),
      });
      if (debouncedSearch) params.set("emailSearch", debouncedSearch);
      if (themeFilter) params.set("projectTheme", themeFilter);

      const res = await fetch(`/api/project-listing/list?${params.toString()}`, {
        cache: "no-store",
      });
      const json = (await res.json()) as ProjectListingListResponse & { message?: string; error?: string };

      if (!res.ok) throw new Error(json.message ?? json.error ?? "Failed to load projects.");

      setProjects(json.data ?? []);
      setTotal(json.pagination?.total ?? 0);
      setTotalPages(json.pagination?.totalPages ?? 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects.");
    } finally {
      setIsLoading(false);
    }
  }, [page, debouncedSearch, themeFilter]);

  useEffect(() => { void load(); }, [load]);

  const handleThemeChange = (t: string) => {
    setThemeFilter(t);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-300 selection:bg-orange-500 selection:text-black">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-zinc-800 bg-[#0d0d0d]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-orange-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Submit Project
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-orange-500 text-[10px] font-bold tracking-[0.2em] uppercase">
              Def-Space Programme
            </span>
            <div className="h-px w-12 bg-orange-500/60" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
            Explore{" "}
            <span className="text-orange-500">Projects</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
            Browse research projects submitted by innovators across Defence, Space, AI, Robotics and more.
            Connect and collaborate.
          </p>

          {/* Stats */}
          {!isLoading && total > 0 && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/60 px-4 py-1.5 text-xs text-zinc-400">
              <Zap className="w-3.5 h-3.5 text-orange-500" />
              <span><span className="text-white font-semibold">{total}</span> project{total !== 1 ? "s" : ""} listed</span>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-20 border-b border-zinc-800 bg-[#0d0d0d]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, institution, name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-orange-500/60 focus:outline-none focus:ring-1 focus:ring-orange-500/30 transition-colors"
            />
          </div>

          {/* Theme filter */}
          <select
            value={themeFilter}
            onChange={(e) => handleThemeChange(e.target.value)}
            className="sm:w-52 px-3 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-sm text-zinc-300 focus:border-orange-500/60 focus:outline-none focus:ring-1 focus:ring-orange-500/30 transition-colors appearance-none"
          >
            <option value="">All Themes</option>
            {Object.entries(THEME_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <p className="text-zinc-500 text-sm">Loading projects…</p>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-900/30 bg-red-950/20 px-6 py-8 text-center">
            <p className="text-red-300 text-sm">{error}</p>
            <button
              onClick={() => void load()}
              className="mt-4 text-xs text-orange-400 hover:text-orange-300 underline underline-offset-2"
            >
              Try again
            </button>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <BookOpen className="w-12 h-12 text-zinc-700" />
            <p className="text-zinc-500 text-sm">No projects found.</p>
            {(search || themeFilter) && (
              <button
                onClick={() => { setSearch(""); setThemeFilter(""); }}
                className="text-xs text-orange-400 hover:text-orange-300 underline underline-offset-2"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={page === 1}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900/60 text-sm text-zinc-400 hover:border-orange-500/40 hover:text-orange-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Prev
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    const p = totalPages <= 7 ? i + 1 : i + 1; // simplified for short lists
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                          page === p
                            ? "bg-orange-500 text-black border border-orange-500"
                            : "border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-orange-500/40 hover:text-orange-300"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={page === totalPages}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900/60 text-sm text-zinc-400 hover:border-orange-500/40 hover:text-orange-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────

function ProjectCard({ project: p }: { project: ProjectListing }) {
  const hasLinks = p.github_link || p.demo_link || p.synopsis_link || p.drive_link;

  return (
    <article className="flex flex-col rounded-2xl border border-zinc-800 bg-[#111111] hover:border-zinc-700 hover:shadow-[0_8px_32px_rgba(249,115,22,0.06)] transition-all duration-300 overflow-hidden group">
      {/* Top accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-orange-500/60 via-orange-400/20 to-transparent" />

      <div className="flex flex-col flex-1 p-5">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getThemeColor(p.project_theme)}`}>
            {getThemeLabel(p.project_theme)}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getLevelColor(p.project_level)}`}>
            {getLevelLabel(p.project_level)}
          </span>
          {p.seeking_collaborators && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border bg-orange-500/10 text-orange-300 border-orange-500/30">
              <Users className="w-2.5 h-2.5" /> Seeking Collab
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-base font-bold text-white leading-snug mb-3 group-hover:text-orange-100 transition-colors line-clamp-2">
          {p.project_title}
        </h2>

        {/* Objective */}
        <p className="text-zinc-400 text-xs leading-relaxed mb-4 line-clamp-3 flex-1">
          {truncate(p.project_objective, 200)}
        </p>

        {/* Meta */}
        <div className="mt-auto space-y-2 pt-4 border-t border-zinc-800">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Building2 className="w-3.5 h-3.5 flex-shrink-0 text-zinc-600" />
            <span className="truncate">{p.institution}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <BookOpen className="w-3.5 h-3.5 flex-shrink-0 text-zinc-600" />
            <span className="truncate">{p.department} · {p.full_name}</span>
          </div>

          {/* Links */}
          {hasLinks && (
            <div className="flex items-center gap-2 pt-1">
              {p.github_link && (
                <a
                  href={p.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-zinc-700 bg-zinc-900 text-[10px] text-zinc-400 hover:border-orange-500/50 hover:text-orange-300 transition-colors"
                >
                  <Github className="w-3 h-3" /> GitHub
                </a>
              )}
              {p.demo_link && (
                <a
                  href={p.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-zinc-700 bg-zinc-900 text-[10px] text-zinc-400 hover:border-orange-500/50 hover:text-orange-300 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" /> Demo
                </a>
              )}
              {p.synopsis_link && (
                <a
                  href={p.synopsis_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-zinc-700 bg-zinc-900 text-[10px] text-zinc-400 hover:border-orange-500/50 hover:text-orange-300 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" /> Synopsis
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
