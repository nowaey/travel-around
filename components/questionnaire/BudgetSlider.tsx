"use client";

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

// Fewer marks on mobile, use 4
const MARKS = [200, 1000, 3000, 6000, 10000, 15000, 20000];
const MARKS_MOBILE = [200, 3000, 10000, 20000];

function formatBudget(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k €`;
  return `${value} €`;
}

export default function BudgetSlider({ value, onChange, min = 200, max = 20000 }: BudgetSliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-6">
      {/* Value display */}
      <div className="text-center py-4">
        <span className="text-5xl font-bold text-teal-700 tabular-nums">
          {value.toLocaleString("de-DE")} €
        </span>
        <p className="text-sm text-stone-400 mt-2">Gesamtbudget für deine Reise</p>
      </div>

      {/* Slider */}
      <div className="px-2">
        <input
          type="range"
          min={min}
          max={max}
          step={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 appearance-none cursor-pointer rounded-full outline-none"
          style={{
            background: `linear-gradient(to right, #0f766e ${pct}%, #e7e5e4 ${pct}%)`,
          }}
        />
      </div>

      {/* Desktop marks */}
      <div className="hidden sm:flex justify-between text-xs text-stone-400 px-1">
        {MARKS.map((mark) => (
          <button key={mark} type="button" onClick={() => onChange(mark)}
            className={`transition-colors hover:text-teal-600 ${value === mark ? "text-teal-700 font-semibold" : ""}`}>
            {formatBudget(mark)}
          </button>
        ))}
      </div>

      {/* Mobile marks (fewer) */}
      <div className="flex sm:hidden justify-between text-xs text-stone-400 px-1">
        {MARKS_MOBILE.map((mark) => (
          <button key={mark} type="button" onClick={() => onChange(mark)}
            className={`transition-colors hover:text-teal-600 ${value === mark ? "text-teal-700 font-semibold" : ""}`}>
            {formatBudget(mark)}
          </button>
        ))}
      </div>
    </div>
  );
}
