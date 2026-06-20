"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

// ── HIER ECHTE NUMMER EINTRAGEN ──────────────
const PHONE_DISPLAY = "0176 62584987";
const PHONE_LINK = "+4917662584987";
// ─────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Arbeit", href: "#galerie" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Kontakt", href: "#kontakt" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-slate-200 bg-white/95 shadow-sm backdrop-blur"
          : "border-transparent bg-white"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="#" className="flex items-center" aria-label="Team Besenrein Startseite">
          <Image
            src="/logo/besenrein-logo.svg"
            alt="Team Besenrein"
            width={180}
            height={48}
            priority
            className="h-11 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-700 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Phone CTA (Desktop) */}
        <Link
          href={`tel:${PHONE_LINK}`}
          className="btn-primary hidden gap-2 !px-6 !py-2.5 lg:inline-flex"
        >
          <Phone className="h-4 w-4" />
          {PHONE_DISPLAY}
        </Link>

        {/* Mobile: Phone-Icon + Burger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href={`tel:${PHONE_LINK}`}
            aria-label="Anrufen"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-md"
          >
            <Phone className="h-5 w-5" />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menü öffnen"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`tel:${PHONE_LINK}`}
              className="btn-primary mt-3 gap-2"
              onClick={() => setOpen(false)}
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}