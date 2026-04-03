"use client";

import { useRouter } from "next/navigation";
import {
  Briefcase, Sunset, Building2, Mountain, Heart, ArrowRight, LucideIcon,
} from "lucide-react";
import { TravelFormatDef } from "@/lib/travel-formats";
import { clsx } from "clsx";

const ICONS: Record<string, LucideIcon> = { Briefcase, Sunset, Building2, Mountain, Heart };

function BackpackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10z" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" />
    </svg>
  );
}

interface FormatCardProps { format: TravelFormatDef; }

export default function FormatCard({ format }: FormatCardProps) {
  const router = useRouter();

  const handleSelect = () => {
    sessionStorage.setItem("travelFormat", format.id);
    router.push("/advisor");
  };

  const Icon = format.icon === "Backpack" ? null : ICONS[format.icon];

  return (
    <button
      onClick={handleSelect}
      className={clsx(
        "group text-left p-6 bg-white border border-stone-200 rounded-2xl",
        "hover:border-amber-300 hover:shadow-warm-lg transition-all duration-250",
        "hover:-translate-y-1.5 cursor-pointer w-full"
      )}
    >
      {/* Icon */}
      <div className="w-11 h-11 bg-amber-50 group-hover:bg-amber-100 rounded-xl flex items-center justify-center mb-4 transition-colors">
        {format.icon === "Backpack"
          ? <BackpackIcon className="w-5 h-5 text-amber-600" />
          : Icon ? <Icon className="w-5 h-5 text-amber-600" /> : null
        }
      </div>

      <h3 className="font-semibold text-stone-900 text-base mb-1 group-hover:text-teal-800 transition-colors">
        {format.title}
      </h3>
      <p className="text-stone-500 text-sm leading-relaxed mb-4">{format.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {format.tags.map((tag) => (
          <span key={tag} className="text-xs bg-stone-100 text-stone-500 px-2.5 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-1 text-teal-700 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
        Jetzt starten <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </button>
  );
}
