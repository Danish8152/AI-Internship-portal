"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Registration", href: "/autumn-internship" },
  { label: "Institution", href: "/institutions" },
  { label: "REG.INSTITUTION", href: "/institutional-registration" },
];

const FLYER_PDF_PATH = "/flyer/def-space-autumn-internship-2026-flyer.pdf";
const BROCHURE_PDF_PATH = "/brochure/def-space-autumn-internship-2026-brochure.pdf";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [flyerOpen, setFlyerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow =
      mobileOpen || brochureOpen || flyerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, brochureOpen, flyerOpen]);

  const closeMenu = () => setMobileOpen(false);
  const openBrochure = () => setBrochureOpen(true);
  const closeBrochure = () => setBrochureOpen(false);
  const openFlyer = () => setFlyerOpen(true);
  const closeFlyer = () => setFlyerOpen(false);

  const handleBrochureClick = () => {
    closeMenu();
    openBrochure();
  };

  const handleFlyerClick = () => {
    closeMenu();
    openFlyer();
  };

  return (
    <>
      {/* Header */}
      <header className="overflow-hidden w-full bg-black border-b border-white/5 sticky top-0 z-[60] backdrop-blur-md">
        <nav className="relative z-10 max-w-8xl mx-auto flex items-center justify-evenly px-4 sm:px-6 h-[70px]">
          {/* Logo */}
          <Link
            href="/"
            prefetch={false}
            className="flex items-center gap-2"
            onClick={closeMenu}
          >
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/img/BSERC_new.png"
                alt="logo"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-white">
              BSERC
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className="hover:text-gray-400 uppercase transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={openBrochure}
              aria-haspopup="dialog"
              aria-expanded={brochureOpen}
              className="group flex items-center gap-2.5 rounded-xl border border-rose-300/40 bg-gradient-to-r from-rose-800 via-red-700 to-red-600 px-3.5 py-1.5 text-left transition hover:from-rose-900 hover:via-red-800 hover:to-red-700"
            >
              <span className="flex flex-col leading-tight">
                <span className="text-[11px] font-semibold text-white">BROCHURE</span>
                <span className="text-[10px] text-rose-100/85">
                  Def-Space info
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={openFlyer}
              aria-haspopup="dialog"
              aria-expanded={flyerOpen}
              className="group flex items-center gap-2.5 rounded-xl border border-amber-300/40 bg-gradient-to-r from-amber-700 via-orange-600 to-orange-500 px-3.5 py-1.5 text-left transition hover:from-amber-800 hover:via-orange-700 hover:to-orange-600"
            >
              <span className="flex flex-col leading-tight">
                <span className="text-[11px] font-semibold text-white">FLYER</span>
                <span className="text-[10px] text-amber-100/90">
                  Def-Space info
                </span>
              </span>
            </button>
            <Link
              href="/contact"
              prefetch={false}
              className="relative px-6 py-2 font-semibold text-white rounded-lg overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 opacity-80 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
              <span className="relative z-10">CONTACT US</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 z-[58]"
            onClick={closeMenu}
          />

          {/* Drawer */}
          <div className="fixed top-[102px] left-0 right-0 bottom-0 bg-[#0a0c16] z-[59] overflow-y-auto">
            <ul className="flex flex-col text-sm font-medium text-gray-300">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="border-b border-white/5">
                  <Link
                    href={item.href}
                    prefetch={false}
                    onClick={closeMenu}
                    className="block px-5 py-4 hover:text-white hover:bg-white/5 uppercase transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              {/* Brochure Button */}
              <li className="mt-4 px-4">
                <button
                  type="button"
                  onClick={handleBrochureClick}
                  className="w-full rounded-xl border border-rose-300/40 bg-gradient-to-r from-rose-800 via-red-700 to-red-600 px-4 py-3 text-left transition hover:from-rose-900 hover:via-red-800 hover:to-red-700"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex flex-col leading-tight">
                      <span className="text-[11px] font-semibold text-white">
                        BROCHURE
                      </span>
                      <span className="text-[10px] text-rose-100/85">
                        Def-Space info
                      </span>
                      <span className="mt-1 text-[10px] text-rose-100/70">
                        click to view Brochure
                      </span>
                    </div>
                  </div>
                </button>
              </li>

              {/* Flyer Button */}
              <li className="mt-3 px-4">
                <button
                  type="button"
                  onClick={handleFlyerClick}
                  className="w-full rounded-xl border border-amber-300/40 bg-gradient-to-r from-amber-700 via-orange-600 to-orange-500 px-4 py-3 text-left transition hover:from-amber-800 hover:via-orange-700 hover:to-orange-600"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex flex-col leading-tight">
                      <span className="text-[11px] font-semibold text-white">
                        FLYER
                      </span>
                      <span className="text-[10px] text-amber-100/90">
                        Def-Space info
                      </span>
                      <span className="mt-1 text-[10px] text-amber-100/80">
                        click to view Flyer
                      </span>
                    </div>
                  </div>
                </button>
              </li>

              {/* Contact Button */}
              <li className="mt-4 px-4">
                <Link
                  href="/contact"
                  prefetch={false}
                  onClick={closeMenu}
                  className="block text-center py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition"
                >
                  CONTACT US
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}


      {/* Brochure modal — same one-click, in-page pattern as the Flyer:
          renders the PDF inline via an iframe rather than a new tab. */}
      {brochureOpen && (
        <div
          className="fixed inset-0 z-[70] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Def-Space Autumn Internship Brochure"
        >
          <div
            className="absolute inset-0 bg-black/80"
            onClick={closeBrochure}
          />
          <div className="relative mx-auto my-4 sm:my-6 flex w-[95%] max-w-4xl flex-1 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0c16] shadow-xl">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
              <h2 className="text-base font-semibold text-white">
                Def-Space Autumn Internship 2026 — Brochure
              </h2>
              <div className="flex items-center gap-3">
                <a
                  href={BROCHURE_PDF_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-rose-300 hover:text-rose-200 transition"
                >
                  Open in new tab
                </a>
                <button
                  type="button"
                  onClick={closeBrochure}
                  className="text-gray-300 hover:text-white transition"
                  aria-label="Close brochure"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-[#1a1a1a]">
              <iframe
                src={BROCHURE_PDF_PATH}
                title="Def-Space Autumn Internship 2026 Brochure"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Flyer modal — renders the PDF inline in the site via an iframe, so
          it opens "in the website itself" rather than a new tab. */}
      {flyerOpen && (
        <div
          className="fixed inset-0 z-[70] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Def-Space Autumn Internship Flyer"
        >
          <div
            className="absolute inset-0 bg-black/80"
            onClick={closeFlyer}
          />
          <div className="relative mx-auto my-4 sm:my-6 flex w-[95%] max-w-4xl flex-1 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0c16] shadow-xl">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
              <h2 className="text-base font-semibold text-white">
                Def-Space Autumn Internship 2026 — Flyer
              </h2>
              <div className="flex items-center gap-3">
                <a
                  href={FLYER_PDF_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-amber-300 hover:text-amber-200 transition"
                >
                  Open in new tab
                </a>
                <button
                  type="button"
                  onClick={closeFlyer}
                  className="text-gray-300 hover:text-white transition"
                  aria-label="Close flyer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-[#1a1a1a]">
              <iframe
                src={FLYER_PDF_PATH}
                title="Def-Space Autumn Internship 2026 Flyer"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
