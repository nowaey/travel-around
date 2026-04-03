import { TRAVEL_FORMATS } from "@/lib/travel-formats";
import FormatCard from "./FormatCard";
import FadeIn from "@/components/ui/FadeIn";

export default function FormatGrid() {
  return (
    <section id="reiseformate" className="py-24 px-5 sm:px-8 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-3">Reiseformate</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4 tracking-tight">
            Was planst du?
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Wähle dein Format — Finn stellt dir dann die richtigen Fragen und findet dein perfektes Ziel.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRAVEL_FORMATS.map((format, i) => (
            <FadeIn key={format.id} delay={(i % 3) as 0 | 1 | 2}>
              <FormatCard format={format} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
