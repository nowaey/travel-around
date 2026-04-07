import Link from "next/link";
import { MessageSquare, Map, BookOpen, ListChecks, Sparkles } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const STEPS = [
  {
    icon: MessageSquare,
    title: "Fragen beantworten",
    description: "Klicke dich durch kurze Fragen zu Budget, Dauer, Interessen und deiner Komfortzone.",
    color: "bg-teal-50 border-teal-100",
    iconColor: "text-teal-700",
  },
  {
    icon: Sparkles,
    title: "Individuellen Plan erhalten",
    description: "Unsere KI-Beraterin Martha erstellt dir einen persönlichen Gap-Year-Plan.",
    color: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: Map,
    title: "Möglichkeiten anschauen",
    description: "Martha schlägt dir drei verschiedene Gap-Year-Optionen vor — von Au pair bis Work & Travel.",
    color: "bg-teal-50 border-teal-100",
    iconColor: "text-teal-700",
  },
  {
    icon: BookOpen,
    title: "Informieren",
    description: "Zu jeder Empfehlung gibt es weiterführende Links, Landesinfos und hilfreiche Ressourcen.",
    color: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: ListChecks,
    title: "Checkliste beachten",
    description: "Eine persönliche Planungs- und Packliste hilft dir, nichts Wichtiges zu vergessen.",
    color: "bg-stone-100 border-stone-200",
    iconColor: "text-stone-600",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-5 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-3">So funktioniert es</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4 tracking-tight">
            In 5 Schritten zum Gap Year
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Martha begleitet dich vom ersten Gedanken bis zur fertigen Packliste.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeIn key={i} delay={Math.min(i + 1, 4) as 0 | 1 | 2 | 3 | 4}>
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
          <Link
            href="/advisor"
            className="inline-flex items-center gap-2 bg-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-cyan-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Selbsttest starten
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
