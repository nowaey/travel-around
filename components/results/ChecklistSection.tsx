"use client";

import { useState } from "react";
import { ChecklistItem } from "@/lib/types";
import { clsx } from "clsx";
import { FileText, Shield, CalendarCheck, Heart, Backpack, ClipboardList } from "lucide-react";

interface ChecklistSectionProps { items: ChecklistItem[]; }

const CAT: Record<string, { label: string; Icon: React.ElementType; color: string }> = {
  visa:      { label: "Visum",        Icon: FileText,      color: "text-blue-500" },
  insurance: { label: "Versicherung", Icon: Shield,        color: "text-purple-500" },
  bookings:  { label: "Buchungen",    Icon: CalendarCheck, color: "text-amber-500" },
  health:    { label: "Gesundheit",   Icon: Heart,         color: "text-rose-500" },
  gear:      { label: "Ausrüstung",   Icon: Backpack,      color: "text-green-500" },
  admin:     { label: "Organisation", Icon: ClipboardList, color: "text-stone-400" },
};

const PRIO_DOT: Record<ChecklistItem["priority"], string> = {
  must: "bg-rose-400", recommended: "bg-amber-400", optional: "bg-stone-300",
};
const PRIO_LABEL: Record<ChecklistItem["priority"], string> = {
  must: "Pflicht", recommended: "Empfohlen", optional: "Optional",
};

export default function ChecklistSection({ items }: ChecklistSectionProps) {
  const [activeTab, setActiveTab] = useState("all");

  const sorted = [...items].sort(
    (a, b) => ({ must: 0, recommended: 1, optional: 2 }[a.priority] ?? 0) - ({ must: 0, recommended: 1, optional: 2 }[b.priority] ?? 0)
  );
  const categories = Array.from(new Set(sorted.map((i) => i.category)));
  const visible = activeTab === "all" ? sorted : sorted.filter((i) => i.category === activeTab);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-stone-100">
      {/* Header */}
      <div className="px-5 pt-4 pb-0">
        <h3 className="font-bold text-stone-800 text-base mb-3">Checkliste</h3>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          <Tab label="Alle" count={sorted.length} active={activeTab === "all"} onClick={() => setActiveTab("all")} />
          {categories.map((cat) => (
            <Tab
              key={cat}
              label={CAT[cat]?.label ?? cat}
              count={sorted.filter((i) => i.category === cat).length}
              active={activeTab === cat}
              onClick={() => setActiveTab(cat)}
            />
          ))}
        </div>
        <div className="h-px bg-stone-100 mt-0" />
      </div>

      {/* Items */}
      <div className="divide-y divide-stone-50 px-5">
        {visible.map((item, idx) => {
          const meta = CAT[item.category] ?? CAT["admin"];
          const Icon = meta.Icon;
          return (
            <div key={idx} className="flex items-start gap-3 py-2.5">
              <span className={clsx("w-2 h-2 rounded-full flex-shrink-0 mt-1.5", PRIO_DOT[item.priority])} />
              <div className="flex-1 min-w-0">
                <p className="text-stone-700 text-sm leading-snug">{item.task}</p>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="text-xs text-stone-400">{PRIO_LABEL[item.priority]}</span>
                  {activeTab === "all" && (
                    <span className={clsx("flex items-center gap-0.5 text-xs", meta.color)}>
                      <Icon className="w-3 h-3" />{meta.label}
                    </span>
                  )}
                  {item.timeframe && <span className="text-xs text-stone-300">· {item.timeframe}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-5 py-2.5 border-t border-stone-100 bg-stone-50/40">
        {(["must", "recommended", "optional"] as const).map((p) => (
          <div key={p} className="flex items-center gap-1.5 text-xs text-stone-400">
            <span className={clsx("w-2 h-2 rounded-full flex-shrink-0", PRIO_DOT[p])} />
            {PRIO_LABEL[p]}
          </div>
        ))}
      </div>
    </div>
  );
}

function Tab({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center gap-1 px-3 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-all",
        active ? "border-teal-600 text-teal-700" : "border-transparent text-stone-400 hover:text-stone-600"
      )}
    >
      {label}
      <span className={clsx("rounded-full px-1.5 py-0.5 text-xs font-bold", active ? "bg-teal-100 text-teal-700" : "bg-stone-100 text-stone-400")}>
        {count}
      </span>
    </button>
  );
}
