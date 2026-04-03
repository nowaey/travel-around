"use client";

import { useState } from "react";
import { ChecklistItem } from "@/lib/types";
import { clsx } from "clsx";
import { FileText, Shield, CalendarCheck, Heart, Backpack, ClipboardList } from "lucide-react";

interface ChecklistSectionProps { items: ChecklistItem[]; }

const CATEGORY_META: Record<string, { label: string; icon: React.ElementType; dot: string; text: string }> = {
  visa:      { label: "Visum",        icon: FileText,      dot: "bg-blue-400",   text: "text-blue-600" },
  insurance: { label: "Versicherung", icon: Shield,        dot: "bg-purple-400", text: "text-purple-600" },
  bookings:  { label: "Buchungen",    icon: CalendarCheck, dot: "bg-amber-400",  text: "text-amber-600" },
  health:    { label: "Gesundheit",   icon: Heart,         dot: "bg-red-400",    text: "text-red-600" },
  gear:      { label: "Ausrüstung",   icon: Backpack,      dot: "bg-green-400",  text: "text-green-600" },
  admin:     { label: "Organisation", icon: ClipboardList, dot: "bg-stone-400",  text: "text-stone-500" },
};

const PRIORITY_DOT: Record<ChecklistItem["priority"], string> = {
  must: "bg-red-400", recommended: "bg-amber-400", optional: "bg-stone-300",
};
const PRIORITY_LABEL: Record<ChecklistItem["priority"], string> = {
  must: "Pflicht", recommended: "Empfohlen", optional: "Optional",
};
const PRIORITY_TEXT: Record<ChecklistItem["priority"], string> = {
  must: "text-red-500", recommended: "text-amber-500", optional: "text-stone-400",
};

export default function ChecklistSection({ items }: ChecklistSectionProps) {
  const sorted = [...items].sort(
    (a, b) =>
      ({ must: 0, recommended: 1, optional: 2 }[a.priority] ?? 0) -
      ({ must: 0, recommended: 1, optional: 2 }[b.priority] ?? 0)
  );

  // Collect unique categories in order
  const presentCategories = Array.from(new Set(sorted.map((i) => i.category)));
  const [activeTab, setActiveTab] = useState<string>("all");

  const filtered = activeTab === "all" ? sorted : sorted.filter((i) => i.category === activeTab);

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-warm border border-stone-100">
      {/* Header */}
      <div className="px-6 pt-5 pb-0">
        <h3 className="font-bold text-stone-900 text-lg mb-4">Deine Checkliste</h3>

        {/* Tab bar */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-0 -mx-1 px-1">
          <TabButton
            label="Alle"
            active={activeTab === "all"}
            count={sorted.length}
            onClick={() => setActiveTab("all")}
          />
          {presentCategories.map((cat) => {
            const meta = CATEGORY_META[cat] ?? CATEGORY_META["admin"];
            return (
              <TabButton
                key={cat}
                label={meta.label}
                active={activeTab === cat}
                count={sorted.filter((i) => i.category === cat).length}
                onClick={() => setActiveTab(cat)}
              />
            );
          })}
        </div>

        {/* Tab underline */}
        <div className="h-px bg-stone-100 mt-0" />
      </div>

      {/* Items */}
      <div className="divide-y divide-stone-50">
        {filtered.map((item, idx) => {
          const meta = CATEGORY_META[item.category] ?? CATEGORY_META["admin"];
          const Icon = meta.icon;
          return (
            <div key={idx} className="flex gap-3 px-6 py-3.5">
              <div className="flex-shrink-0 mt-0.5">
                <span className={clsx("w-2 h-2 rounded-full block mt-1.5", PRIORITY_DOT[item.priority] ?? "bg-stone-300")} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-stone-700 text-sm leading-relaxed">{item.task}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className={clsx("text-xs font-medium", PRIORITY_TEXT[item.priority] ?? "text-stone-400")}>
                    {PRIORITY_LABEL[item.priority] ?? item.priority}
                  </span>
                  {activeTab === "all" && (
                    <span className={clsx("flex items-center gap-1 text-xs", meta.text)}>
                      <Icon className="w-3 h-3" />
                      {meta.label}
                    </span>
                  )}
                  {item.timeframe && (
                    <span className="text-xs text-stone-400">· {item.timeframe}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-6 py-3 border-t border-stone-100 bg-stone-50/50">
        {(["must", "recommended", "optional"] as const).map((p) => (
          <div key={p} className="flex items-center gap-1.5 text-xs text-stone-400">
            <span className={clsx("w-2 h-2 rounded-full", PRIORITY_DOT[p])} />
            {PRIORITY_LABEL[p]}
          </div>
        ))}
      </div>
    </div>
  );
}

function TabButton({
  label,
  active,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex items-center gap-1.5 px-3 py-2 text-xs font-semibold whitespace-nowrap rounded-t-lg border-b-2 transition-all",
        active
          ? "border-teal-600 text-teal-700 bg-teal-50/60"
          : "border-transparent text-stone-400 hover:text-stone-600"
      )}
    >
      {label}
      <span
        className={clsx(
          "rounded-full px-1.5 py-0.5 text-xs font-bold",
          active ? "bg-teal-100 text-teal-700" : "bg-stone-100 text-stone-400"
        )}
      >
        {count}
      </span>
    </button>
  );
}
