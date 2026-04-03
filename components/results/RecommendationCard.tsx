import { TravelRecommendation } from "@/lib/types";
import { MapPin, Wallet, CalendarDays } from "lucide-react";

interface RecommendationCardProps {
  recommendation: TravelRecommendation;
  closingText?: string;
}

export default function RecommendationCard({ recommendation, closingText }: RecommendationCardProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-warm border border-stone-100">
      {/* Hero banner */}
      <div className="relative bg-gradient-to-br from-stone-900 via-teal-900 to-teal-800 px-6 pt-8 pb-6 text-white overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-8 left-0 w-32 h-32 bg-teal-400/10 rounded-full blur-xl" />

        {/* Label */}
        <div className="relative flex items-center gap-2 mb-5">
          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          <span className="text-teal-300 text-xs font-semibold uppercase tracking-widest">
            Finns Empfehlung
          </span>
        </div>

        {/* Destination */}
        <div className="relative">
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold leading-none">{recommendation.destination}</h2>
              <p className="text-teal-300 text-sm mt-1 font-medium">{recommendation.country}</p>
            </div>
          </div>

          <p className="text-white/80 font-medium mt-5 text-base leading-snug italic border-l-2 border-amber-400/60 pl-3">
            &ldquo;{recommendation.tagline}&rdquo;
          </p>
        </div>

        {/* Meta pills */}
        {(recommendation.estimatedBudget || recommendation.bestTimeToVisit) && (
          <div className="relative flex flex-wrap gap-2 mt-5">
            {recommendation.estimatedBudget && (
              <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1.5">
                <Wallet className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-xs font-medium text-white/90">{recommendation.estimatedBudget}</span>
              </div>
            )}
            {recommendation.bestTimeToVisit && (
              <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-teal-300" />
                <span className="text-xs font-medium text-white/90">{recommendation.bestTimeToVisit}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="px-6 py-5 border-b border-stone-100">
        <p className="text-stone-700 leading-relaxed text-sm">{recommendation.explanation}</p>
      </div>

      {/* Finn's personal note */}
      {closingText && (
        <div className="flex gap-3 px-6 py-4 bg-stone-50">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-teal-700 to-teal-800 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
            F
          </div>
          <p className="text-stone-600 text-sm leading-relaxed italic pt-1">{closingText}</p>
        </div>
      )}
    </div>
  );
}
