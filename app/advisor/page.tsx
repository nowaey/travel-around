"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { TravelFormat, TravelRecommendation, QuestionnaireAnswers } from "@/lib/types";
import { TRAVEL_FORMATS } from "@/lib/travel-formats";
import QuestionnaireForm from "@/components/questionnaire/QuestionnaireForm";
import RecommendationCard from "@/components/results/RecommendationCard";
import ChecklistSection from "@/components/results/ChecklistSection";
import ResourceLinks from "@/components/results/ResourceLinks";

// Rotating background photos
const BG_PHOTOS = [
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400&auto=format&fit=crop&q=80",
];

type PageState = "form" | "loading" | "result" | "error";

export default function AdvisorPage() {
  const router = useRouter();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [bgIdx, setBgIdx] = useState(0);

  const [format, setFormat] = useState<TravelFormat | null>(null);
  const [pageState, setPageState] = useState<PageState>("form");
  const [recommendation, setRecommendation] = useState<TravelRecommendation | null>(null);
  const [closingText, setClosingText] = useState("");
  const [streamText, setStreamText] = useState("");

  // Slowly rotate background photo
  useEffect(() => {
    const t = setInterval(() => setBgIdx((i) => (i + 1) % BG_PHOTOS.length), 8000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("travelFormat") as TravelFormat | null;
    if (!stored) { router.replace("/"); return; }
    setFormat(stored);
  }, [router]);

  useEffect(() => {
    if (pageState === "result") {
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
    }
  }, [pageState]);

  const handleSubmit = async (answers: QuestionnaireAnswers) => {
    if (!format) return;
    setPageState("loading");
    setStreamText("");

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, format }),
      });

      if (!response.ok || !response.body) throw new Error("API error");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const event = JSON.parse(line.slice(6));
            if (event.type === "chunk") setStreamText((p) => p + event.content);
            else if (event.type === "done" && event.isComplete) {
              setRecommendation(event.recommendation);
              setClosingText(event.closingText ?? "");
              setPageState("result");
            } else if (event.type === "error") setPageState("error");
          } catch { /* skip */ }
        }
      }
    } catch {
      setPageState("error");
    }
  };

  const handleRestart = () => {
    setPageState("form");
    setRecommendation(null);
    setStreamText("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatLabel = format ? TRAVEL_FORMATS.find((f) => f.id === format)?.title ?? "" : "";

  if (!format) return null;

  return (
    <div className="min-h-screen bg-stone-900">
      {/* ── Fixed background photo ──────────────────────────────────── */}
      <div className="fixed inset-0 z-0">
        {BG_PHOTOS.map((url, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: i === bgIdx ? 1 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[1px]" />
      </div>

      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-5">
        <Link href="/">
          <Logo variant="dark" size="sm" />
        </Link>

        <div className="flex items-center gap-3">
          {/* Format badge */}
          <span className="hidden sm:inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            {formatLabel}
          </span>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:block">Zurück</span>
          </Link>
        </div>
      </div>

      {/* ── Main: Questionnaire card ──────────────────────────────────── */}
      {(pageState === "form" || pageState === "loading") && (
        <div className="relative z-10 min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-warm-lg p-7 sm:p-9">
            {pageState === "form" && (
              <QuestionnaireForm onSubmit={handleSubmit} isLoading={false} />
            )}

            {pageState === "loading" && (
              <div className="flex flex-col items-center justify-center py-12 gap-6 text-center">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-teal-100 rounded-full" />
                  <div className="absolute inset-0 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
                  <div className="absolute inset-2 bg-teal-50 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-teal-600" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-stone-800 text-lg">Finn denkt nach…</p>
                  <p className="text-sm text-stone-500 mt-1">Deine Empfehlung wird erstellt</p>
                </div>
                {streamText && (
                  <div className="w-full bg-stone-50 rounded-xl p-4 max-h-28 overflow-hidden relative text-left">
                    <p className="text-xs text-stone-400 leading-relaxed">{streamText}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-stone-50" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Error ────────────────────────────────────────────────────── */}
      {pageState === "error" && (
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-warm-lg p-10 text-center max-w-sm w-full">
            <p className="text-4xl mb-4">😕</p>
            <p className="font-semibold text-stone-800 text-lg">Da ist was schiefgelaufen</p>
            <p className="text-sm text-stone-500 mt-1 mb-6">Bitte versuche es nochmal.</p>
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 mx-auto bg-teal-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-teal-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Nochmal
            </button>
          </div>
        </div>
      )}

      {/* ── Results ──────────────────────────────────────────────────── */}
      {pageState === "result" && recommendation && (
        <div ref={resultsRef} className="relative z-10 px-4 sm:px-6 pb-16 pt-4">
          <div className="max-w-2xl mx-auto space-y-5 animate-fade-in">
            <RecommendationCard recommendation={recommendation} closingText={closingText} />
            <ChecklistSection items={recommendation.checklist} />
            {recommendation.resources.length > 0 && <ResourceLinks links={recommendation.resources} />}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="flex-1 flex items-center justify-center gap-2 bg-white/90 backdrop-blur-sm border border-stone-200 text-stone-700 py-3 rounded-xl font-medium hover:bg-white transition-all text-sm shadow-sm"
              >
                <RotateCcw className="w-4 h-4" /> Andere Antworten
              </button>
              <Link
                href="/"
                className="flex-1 flex items-center justify-center gap-2 bg-teal-700 text-white py-3 rounded-xl font-medium hover:bg-teal-800 transition-all text-sm"
              >
                Anderes Format
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
