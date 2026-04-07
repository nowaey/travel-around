"use client";

import { useState } from "react";
import { TravelRecommendation } from "@/lib/types";
import { MapPin, Wallet, CalendarDays, Copy, Check, Info, Luggage } from "lucide-react";

interface Props {
  recommendation: TravelRecommendation;
  index?: number;
}

// Verified Unsplash photo IDs per country (German & English names)
const COUNTRY_PHOTOS: Record<string, string> = {
  "japan":          "photo-1540959733332-eab4deabeeaf",
  "island":         "photo-1531366936337-7c912a4589a7",
  "iceland":        "photo-1531366936337-7c912a4589a7",
  "australien":     "photo-1523482580672-f109ba8cb9be",
  "australia":      "photo-1523482580672-f109ba8cb9be",
  "griechenland":   "photo-1533105079780-92b9be482077",
  "greece":         "photo-1533105079780-92b9be482077",
  "thailand":       "photo-1552465011-b4e21bf6e79a",
  "neuseeland":     "photo-1469521669194-babb45599def",
  "new zealand":    "photo-1469521669194-babb45599def",
  "kanada":         "photo-1501854140801-50d01698950b",
  "canada":         "photo-1501854140801-50d01698950b",
  "usa":            "photo-1501594907352-04cda38ebc29",
  "vereinigte staaten": "photo-1501594907352-04cda38ebc29",
  "kolumbien":      "photo-1610977071647-8e2ffa7fbb80",
  "colombia":       "photo-1610977071647-8e2ffa7fbb80",
  "spanien":        "photo-1543783207-ec64e4d3f61f",
  "spain":          "photo-1543783207-ec64e4d3f61f",
  "portugal":       "photo-1555881400-74d7acaacd8b",
  "italien":        "photo-1516483638261-f4dbaf036963",
  "italy":          "photo-1516483638261-f4dbaf036963",
  "frankreich":     "photo-1502602898657-3e91760cbb34",
  "france":         "photo-1502602898657-3e91760cbb34",
  "peru":           "photo-1526392060635-9d6019884377",
  "vietnam":        "photo-1528360983277-13d401cdc186",
  "indonesien":     "photo-1537996194471-e657df975ab4",
  "indonesia":      "photo-1537996194471-e657df975ab4",
  "bali":           "photo-1537996194471-e657df975ab4",
  "costa rica":     "photo-1518182170546-07661fd94144",
  "norwegen":       "photo-1513519245088-0e12902e35ca",
  "norway":         "photo-1513519245088-0e12902e35ca",
  "irland":         "photo-1549880338-65ddcdfd017b",
  "ireland":        "photo-1549880338-65ddcdfd017b",
  "südafrika":      "photo-1580060839134-75a5edca2e99",
  "south africa":   "photo-1580060839134-75a5edca2e99",
  "indien":         "photo-1524492412937-b28074a5d7da",
  "india":          "photo-1524492412937-b28074a5d7da",
  "mexiko":         "photo-1518638150340-f706e86654de",
  "mexico":         "photo-1518638150340-f706e86654de",
  "argentinien":    "photo-1536649029785-b4f4b7e8fe2f",
  "argentina":      "photo-1536649029785-b4f4b7e8fe2f",
  "uk":             "photo-1513635269975-59663e0ac1ad",
  "england":        "photo-1513635269975-59663e0ac1ad",
  "schweiz":        "photo-1506905925346-21bda4d32df4",
  "switzerland":    "photo-1506905925346-21bda4d32df4",
  "europa":         "photo-1467269204594-f104a5c2d9a1",
  "europe":         "photo-1467269204594-f104a5c2d9a1",
};

// Fallback pool when country not found
const FALLBACK_POOL = [
  "photo-1476514525535-07fb3b4ae5f1",
  "photo-1464822759023-fed622ff2c3b",
  "photo-1501854140801-50d01698950b",
  "photo-1488085061387-422e29b40080",
  "photo-1506905925346-21bda4d32df4",
];

function getPhotoUrl(country: string, index: number): string {
  const key = country.toLowerCase().trim();
  const id = COUNTRY_PHOTOS[key] ?? FALLBACK_POOL[index % FALLBACK_POOL.length];
  return `https://images.unsplash.com/${id}?w=800&auto=format&fit=crop&q=80`;
}

const TYPE_COLORS = [
  "bg-teal-500 text-white",
  "bg-amber-500 text-white",
  "bg-violet-500 text-white",
];

export default function RecommendationCard({ recommendation: rec, index = 0 }: Props) {
  const [copied, setCopied] = useState(false);
  const photoUrl = getPhotoUrl(rec.country, index);

  const copyPacking = () => {
    const text = (rec.packingList ?? []).map((i) => `• ${i}`).join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-stone-100">

      {/* ── Destination Photo Hero ───────────────────────────────────── */}
      <div className="relative h-52 sm:h-60 overflow-hidden bg-stone-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoUrl}
          alt={rec.destination}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

        {/* Top-left: number + travel type */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white text-xs font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${TYPE_COLORS[index % TYPE_COLORS.length]}`}>
            {rec.travelType}
          </span>
        </div>

        {/* Bottom: destination + country + budget */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-10">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-white/65 text-xs font-medium flex items-center gap-1 mb-1">
                <MapPin className="w-3 h-3" /> {rec.country}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-none tracking-tight drop-shadow-lg">
                {rec.destination}
              </h2>
            </div>
            {rec.estimatedBudget && (
              <div className="flex-shrink-0 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2">
                <Wallet className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                <span className="text-xs font-semibold text-white leading-tight">{rec.estimatedBudget}</span>
              </div>
            )}
          </div>
          <p className="text-white/70 text-sm italic mt-2 leading-snug">&ldquo;{rec.tagline}&rdquo;</p>
        </div>
      </div>

      {/* ── Best Time ───────────────────────────────────────────────── */}
      {rec.bestTimeToVisit && (
        <div className="flex items-center gap-2 px-5 py-2.5 bg-stone-50 border-b border-stone-100">
          <CalendarDays className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
          <span className="text-xs text-stone-500 font-medium">{rec.bestTimeToVisit}</span>
        </div>
      )}

      {/* ── Was ist [Reisetyp]? ──────────────────────────────────────── */}
      <div className="px-5 py-4 border-b border-stone-100">
        <div className="flex gap-2.5">
          <div className="flex-shrink-0 w-6 h-6 rounded-md bg-teal-50 border border-teal-100 flex items-center justify-center mt-0.5">
            <Info className="w-3.5 h-3.5 text-teal-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">Was ist {rec.travelType}?</p>
            <p className="text-stone-600 text-sm leading-relaxed">{rec.formatExplanation}</p>
          </div>
        </div>
      </div>

      {/* ── Warum passt das zu dir? ──────────────────────────────────── */}
      <div className="px-5 py-4 border-b border-stone-100">
        <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1.5">Warum das zu dir passt</p>
        <p className="text-stone-700 text-sm leading-relaxed">{rec.explanation}</p>
      </div>

      {/* ── Packliste ────────────────────────────────────────────────── */}
      {rec.packingList && rec.packingList.length > 0 && (
        <div className="px-5 py-4 border-b border-stone-100 bg-stone-50/40">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <Luggage className="w-3.5 h-3.5 text-stone-400" />
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Packliste</p>
            </div>
            <button
              onClick={copyPacking}
              className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-2 py-1 rounded-md transition-colors"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Kopiert" : "Kopieren"}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-y-1 gap-x-4">
            {rec.packingList.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-stone-600">
                <span className="w-1 h-1 bg-teal-400 rounded-full flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Martha footer ────────────────────────────────────────────── */}
      <div className="flex items-center gap-2.5 px-5 py-3">
        <div className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          M
        </div>
        <p className="text-stone-400 text-xs">Fragen? Martha hilft dir unten rechts weiter.</p>
      </div>
    </div>
  );
}
