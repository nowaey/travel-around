"use client";

import { clsx } from "clsx";
import { Check } from "lucide-react";

interface OptionCardProps {
  label: string;
  description?: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
}

export default function OptionCard({ label, description, icon, selected, onClick, multi = false }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "relative w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-150 cursor-pointer group",
        selected
          ? "border-teal-600 bg-teal-50/80 shadow-sm"
          : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm"
      )}
    >
      {/* Amber accent line on top when selected */}
      {selected && (
        <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-amber-400 to-teal-500 rounded-full" />
      )}

      <div className="flex items-center gap-4">
        {icon && (
          <span className="text-2xl flex-shrink-0 leading-none">{icon}</span>
        )}

        <div className="flex-1 min-w-0">
          <p className={clsx("font-semibold text-sm leading-snug", selected ? "text-teal-900" : "text-stone-800")}>
            {label}
          </p>
          {description && (
            <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{description}</p>
          )}
        </div>

        {/* Indicator */}
        <div className={clsx(
          "flex-shrink-0 w-5 h-5 flex items-center justify-center transition-all border-2",
          multi ? "rounded-md" : "rounded-full",
          selected ? "border-teal-600 bg-teal-600" : "border-stone-300 bg-white"
        )}>
          {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
        </div>
      </div>
    </button>
  );
}
