import { MessageSquare, Sparkles, CheckSquare } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const STEPS = [
  {
    icon: MessageSquare,
    title: "Format wählen",
    description: "Wähle dein Reiseformat — Work & Travel, Backpacking, Sabbatical oder mehr.",
    color: "bg-teal-50 border-teal-100",
    iconColor: "text-teal-700",
  },
  {
    icon: Sparkles,
    title: "Fragebogen ausfüllen",
    description: "Klicke dich durch 10 kurze Fragen zu Budget, Dauer, Interessen und Komfortzone.",
    color: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: CheckSquare,
    title: "Deinen Plan erhalten",
    description: "Du bekommst eine persönliche Empfehlung mit Checkliste und hilfreichen Links.",
    color: "bg-stone-100 border-stone-200",
    iconColor: "text-stone-600",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-5 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-3">So einfach geht's</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4 tracking-tight">
            In 3 Schritten zum Plan
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Keine langen Formulare, kein Wartezeit — in wenigen Minuten fertig.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeIn key={i} delay={(i + 1) as 1 | 2 | 3}>
                <div className="flex flex-col items-center text-center">
                  <div className={`relative w-20 h-20 border-2 rounded-2xl flex items-center justify-center mb-5 ${step.color}`}>
                    <Icon className={`w-8 h-8 ${step.iconColor}`} />
                    <span className="absolute -top-3 -right-3 w-7 h-7 bg-stone-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-stone-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed max-w-xs">{step.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <FadeIn delay={4} className="text-center mt-14">
          <a
            href="#reiseformate"
            className="inline-flex items-center gap-2 bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-teal-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Jetzt Reise finden
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
