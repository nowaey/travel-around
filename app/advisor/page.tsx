"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Sparkles, ChevronRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { TravelRecommendation, QuestionnaireAnswers } from "@/lib/types";
import QuestionnaireForm from "@/components/questionnaire/QuestionnaireForm";
import RecommendationCard from "@/components/results/RecommendationCard";
import ChecklistSection from "@/components/results/ChecklistSection";
import ResourceLinks from "@/components/results/ResourceLinks";

const BG_PHOTOS = [
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400&auto=format&fit=crop&q=80",
];

type PageState = "form" | "loading" | "result" | "error";

export default function AdvisorPage() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [bgIdx, setBgIdx] = useState(0);
  const [pageState, setPageState] = useState<PageState>("form");
  const [recommendations, setRecommendations] = useState<TravelRecommendation[]>([]);
  const [closingText, setClosingText] = useState("");
  const [streamText, setStreamText] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBgIdx((i) => (i + 1) % BG_PHOTOS.length), 8000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (pageState === "result") {
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
    }
  }, [pageState]);

  const handleSubmit = async (answers: QuestionnaireAnswers) => {
    setPageState("loading");
    setStreamText("");

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
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
              setRecommendations(event.recommendations ?? []);
              setClosingText(event.closingText ?? "");
              setActiveTab(0);
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
    setRecommendations([]);
    setStreamText("");
    setActiveTab(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeRec = recommendations[activeTab];

  return (
    <div className="min-h-screen bg-stone-900">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        {BG_PHOTOS.map((url, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out" style={{ opacity: i === bgIdx ? 1 : 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-stone-900/65 backdrop-blur-[1px]" />
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-5">
        <Link href="/"><Logo variant="dark" size="sm" /></Link>
        <Link href="/" className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:block">Zurück</span>
        </Link>
      </div>

      {/* Questionnaire */}
      {(pageState === "form" || pageState === "loading") && (
        <div className="relative z-10 min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-warm-lg p-7 sm:p-9">
            {pageState === "form" && <QuestionnaireForm onSubmit={handleSubmit} isLoading={false} />}
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
                  <p className="font-semibold text-stone-800 text-lg">Martha denkt nach…</p>
                  <p className="text-sm text-stone-500 mt-1">Deine Empfehlungen werden erstellt</p>
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

      {/* Error */}
      {pageState === "error" && (
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-warm-lg p-10 text-center max-w-sm w-full">
            <p className="text-4xl mb-4">😕</p>
            <p className="font-semibold text-stone-800 text-lg">Da ist was schiefgelaufen</p>
            <p className="text-sm text-stone-500 mt-1 mb-6">Bitte versuche es nochmal.</p>
            <button onClick={handleRestart} className="flex items-center gap-2 mx-auto bg-teal-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-teal-800 transition-colors">
              <RotateCcw className="w-4 h-4" /> Nochmal
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {pageState === "result" && recommendations.length > 0 && (
        <div ref={resultsRef} className="relative z-10 px-4 sm:px-6 pb-16 pt-2">
          <div className="max-w-2xl mx-auto animate-fade-in space-y-5">

            {/* Header */}
            <div className="text-center pt-4 pb-2">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-3 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                Marthas Empfehlungen
              </div>
              <p className="text-white text-xl sm:text-2xl font-bold leading-snug mb-1">
                Das könnte zu dir passen
              </p>
              <p className="text-white/60 text-sm">
                {closingText || "Wir haben 3 Gap-Year-Möglichkeiten für dich gefunden."}
              </p>
            </div>

            {/* Tab switcher */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-1.5 border border-white/15">
              <div className="grid grid-cols-3 gap-1">
                {recommendations.map((rec, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`relative flex flex-col items-center gap-1 px-3 py-3 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === i
                        ? "bg-white text-stone-900 shadow-sm"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-0.5 ${
                      activeTab === i ? "bg-teal-700 text-white" : "bg-white/20 text-white"
                    }`}>
                      {i + 1}
                    </span>
                    <span className="leading-tight text-center line-clamp-1">{rec.travelType}</span>
                    <span className={`text-xs font-normal leading-tight line-clamp-1 ${activeTab === i ? "text-stone-500" : "text-white/50"}`}>
                      {rec.destination}
                    </span>
                    {activeTab === i && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-teal-600 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Active recommendation */}
            {activeRec && (
              <div className="space-y-4">
                <RecommendationCard recommendation={activeRec} index={activeTab} />
                {activeRec.resources.length > 0 && <ResourceLinks links={activeRec.resources} />}
                {activeRec.checklist.length > 0 && <ChecklistSection items={activeRec.checklist} />}
              </div>
            )}

            {/* Next / Prev navigation */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveTab((t) => Math.max(0, t - 1))}
                disabled={activeTab === 0}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm px-4 py-2.5 rounded-xl font-medium transition-all backdrop-blur-sm border border-white/15"
              >
                <ArrowLeft className="w-4 h-4" />
                Vorherige
              </button>

              {activeTab < recommendations.length - 1 ? (
                <button
                  onClick={() => setActiveTab((t) => t + 1)}
                  className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm px-5 py-2.5 rounded-xl font-medium transition-all shadow"
                >
                  Nächste Empfehlung
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2.5 rounded-xl font-medium transition-all backdrop-blur-sm border border-white/15"
                >
                  <RotateCcw className="w-4 h-4" />
                  Neu starten
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
