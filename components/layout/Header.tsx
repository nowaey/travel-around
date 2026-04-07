"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import Logo from "@/components/ui/Logo";

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 40);
      setVisible(y < lastY.current || y < 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/#how-it-works", label: "Wie es funktioniert" },
    { href: "/advisor", label: "Selbsttest starten" },
  ];

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          visible ? "translate-y-0" : "-translate-y-full",
          atTop ? "bg-transparent" : "bg-white/95 backdrop-blur-md border-b border-stone-200/60 shadow-sm"
        )}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/">
            <Logo variant={atTop ? "dark" : "light"} size="md" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-sm font-medium transition-colors",
                  atTop ? "text-white/80 hover:text-white" : "text-stone-600 hover:text-stone-900"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/advisor"
              className={clsx(
                "text-sm font-semibold px-4 py-2 rounded-xl transition-all",
                atTop
                  ? "bg-white/15 hover:bg-white/25 text-white border border-white/20"
                  : "bg-cyan-600 hover:bg-cyan-700 text-white"
              )}
            >
              Jetzt starten
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-2 rounded-lg"
            onClick={() => setMenuOpen(true)}
            aria-label="Menü öffnen"
          >
            <Menu className={clsx("w-5 h-5", atTop ? "text-white" : "text-stone-800")} />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/97 backdrop-blur-md flex flex-col items-center justify-center gap-10">
          <button className="absolute top-5 right-5 p-2" onClick={() => setMenuOpen(false)}>
            <X className="w-6 h-6 text-white" />
          </button>

          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Logo variant="dark" size="lg" />
          </Link>

          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/75 hover:text-white text-2xl font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/advisor"
            onClick={() => setMenuOpen(false)}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-lg px-8 py-3 rounded-2xl transition-colors"
          >
            Jetzt starten
          </Link>
        </div>
      )}
    </>
  );
}
