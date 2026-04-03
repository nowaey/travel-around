"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&auto=format&fit=crop&q=80",
    label: "Berge & Natur",
    sub: "Alpen · Patagonien · Norwegen",
  },
  {
    url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&auto=format&fit=crop&q=80",
    label: "Tropische Strände",
    sub: "Bali · Thailand · Malediven",
  },
  {
    url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&auto=format&fit=crop&q=80",
    label: "Großstädte",
    sub: "Tokyo · New York · Barcelona",
  },
  {
    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&auto=format&fit=crop&q=80",
    label: "Wüste & Abenteuer",
    sub: "Sahara · Utah · Australien",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const touchStart = useRef(0);

  const goTo = (idx: number) => {
    if (idx === current || fading) return;
    setFading(true);
    setPrev(current);
    setCurrent(idx);
    setTimeout(() => { setFading(false); setPrev(null); }, 900);
  };

  const next = () => goTo((current + 1) % SLIDES.length);
  const prev_ = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timerRef.current = setTimeout(next, 6000);
    return () => clearTimeout(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  // Touch/swipe support
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev_();
  };

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Background photos ──────────────────────────────────────── */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
          style={{ opacity: i === current ? 1 : i === prev ? 0 : 0, zIndex: i === current ? 1 : i === prev ? 0 : -1 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.url}
            alt={slide.label}
            className={`w-full h-full object-cover ${i === current ? "slide-img" : ""}`}
          />
        </div>
      ))}

      {/* ── Gradient overlays ──────────────────────────────────────── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-stone-900/55 via-stone-900/30 to-stone-900/75" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-stone-900/30 to-transparent" />

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-5 sm:px-8 text-center pt-20 pb-32">
        {/* Slide label badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 animate-fade-in">
          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          {SLIDES[current].label} · {SLIDES[current].sub}
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-5 animate-fade-in max-w-4xl">
          Deine nächste Reise{" "}
          <span className="text-amber-400">wartet auf dich.</span>
        </h1>

        {/* Sub */}
        <p className="text-white/70 text-lg sm:text-xl max-w-xl leading-relaxed mb-10 animate-fade-in">
          Beantworte ein paar Fragen — unser KI-Berater Finn findet dein
          perfektes Reiseziel mit persönlichem Plan.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 animate-fade-in">
          <a
            href="#reiseformate"
            className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Reise entdecken
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all"
          >
            Wie funktioniert es?
          </a>
        </div>
      </div>

      {/* ── Slide dots ─────────────────────────────────────────────── */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-8 h-2 bg-amber-400"
                : "w-2 h-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Scroll arrow ───────────────────────────────────────────── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 text-white/50 animate-bounce">
        <ArrowDown className="w-5 h-5" />
      </div>

      {/* Preload next image */}
      <link rel="preload" as="image" href={SLIDES[(current + 1) % SLIDES.length].url} />
    </section>
  );
}
