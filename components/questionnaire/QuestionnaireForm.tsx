"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { QuestionnaireAnswers, defaultAnswers } from "@/lib/types";
import OptionCard from "./OptionCard";
import BudgetSlider from "./BudgetSlider";
import { clsx } from "clsx";

// ── Data ──────────────────────────────────────────────────────────────────────

const TRAVEL_COMPANIONS = [
  { label: "Solo", icon: "🧳", description: "Ich reise allein" },
  { label: "Zu zweit", icon: "👫", description: "Mit Partner / bester Freund" },
  { label: "Mit Freunden", icon: "👯", description: "Kleine Gruppe" },
  { label: "Mit Familie", icon: "👨‍👩‍👧", description: "Mit Kindern oder Eltern" },
];

const CONTINENTS = [
  { label: "Europa", icon: "🏰" },
  { label: "Asien", icon: "🏯" },
  { label: "Nordamerika", icon: "🗽" },
  { label: "Südamerika", icon: "🌿" },
  { label: "Afrika", icon: "🦁" },
  { label: "Australien & Ozeanien", icon: "🦘" },
  { label: "Überrasch mich!", icon: "🎲" },
];

const DURATIONS = [
  { label: "Ein paar Wochen", icon: "📅" },
  { label: "1–3 Monate", icon: "🗓️" },
  { label: "3–6 Monate", icon: "✈️" },
  { label: "6–12 Monate", icon: "🌍" },
  { label: "Länger als ein Jahr", icon: "🏡" },
];

const LANGUAGES = ["Deutsch", "Englisch", "Französisch", "Spanisch", "Portugiesisch"];

const INTERESTS = [
  { label: "Outdoor & Natur", icon: "🏕️" },
  { label: "Städte & Kultur", icon: "🏛️" },
  { label: "Essen & Kochen", icon: "🍳" },
  { label: "Sport & Abenteuer", icon: "🧗" },
  { label: "Sprache lernen", icon: "🎓" },
  { label: "Musik & Kunst", icon: "🎨" },
  { label: "Wildlife & Tiere", icon: "🦋" },
  { label: "Strände & Inseln", icon: "🏖️" },
  { label: "Tempel & Geschichte", icon: "🏯" },
  { label: "Workation / Remote", icon: "💻" },
  { label: "Freiwilligenarbeit", icon: "🤝" },
  { label: "Farmarbeit", icon: "🌾" },
  { label: "Roadtrips", icon: "🚗" },
  { label: "Fotografie", icon: "📸" },
];

const HOUSING = [
  { label: "Gastfamilie", icon: "🏠", description: "Authentisch & kulturell nah" },
  { label: "Farm / Camp", icon: "🌾", description: "Natur pur, oft kostenlos" },
  { label: "Hostel / Airbnb / Hotel", icon: "🏨", description: "Flexibel & komfortabel" },
  { label: "Wohngemeinschaft", icon: "🏢", description: "Günstig, sozial, langfristig" },
  { label: "Immer neue Orte", icon: "🎒", description: "Maximal Freiheit" },
  { label: "Fester Wohnsitz", icon: "📍", description: "Basis für Ausflüge" },
];

const CONCERNS = [
  { label: "Sicherheit", icon: "🛡️", description: "Ist die Region sicher für mich?" },
  { label: "Kosten", icon: "💸", description: "Reicht mein Budget wirklich aus?" },
  { label: "Einsamkeit", icon: "🫂", description: "Werde ich Anschluss finden?" },
  { label: "Sprachbarriere", icon: "💬", description: "Was wenn ich die Sprache nicht kann?" },
  { label: "Visum & Bürokratie", icon: "📋", description: "Zu viel Papierkram & Unklarheit" },
];

// ── Step index constants ──────────────────────────────────────────────────────
const STEP_AGE = 0;
const STEP_COMPANION = 1;
const STEP_CONTINENTS = 2;
const STEP_DESTINATION = 3;
const STEP_ORGANIZATION = 4;
const STEP_BUDGET = 5;
const STEP_DURATION = 6;
const STEP_LANGUAGES = 7;
const STEP_LANG_IMPROVE = 8;
const STEP_INTERESTS = 9;
const STEP_HOUSING = 10;
const STEP_CONCERN = 11;

const ALL_STEPS = [
  STEP_AGE,
  STEP_COMPANION,
  STEP_CONTINENTS,
  STEP_DESTINATION,
  STEP_ORGANIZATION,
  STEP_BUDGET,
  STEP_DURATION,
  STEP_LANGUAGES,
  STEP_LANG_IMPROVE,
  STEP_INTERESTS,
  STEP_HOUSING,
  STEP_CONCERN,
];

// ── Props ─────────────────────────────────────────────────────────────────────

interface QuestionnaireFormProps {
  onSubmit: (answers: QuestionnaireAnswers) => void;
  isLoading: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function QuestionnaireForm({ onSubmit, isLoading }: QuestionnaireFormProps) {
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(defaultAnswers);
  const [step, setStep] = useState(0);
  const [destinationText, setDestinationText] = useState("");

  const visibleStep = ALL_STEPS.indexOf(step);
  const totalSteps = ALL_STEPS.length;

  const update = <K extends keyof QuestionnaireAnswers>(
    key: K,
    value: QuestionnaireAnswers[K]
  ) => setAnswers((prev) => ({ ...prev, [key]: value }));

  const toggleMulti = (key: keyof QuestionnaireAnswers, value: string) => {
    const current = answers[key] as string[];
    update(
      key,
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    );
  };

  const canProceed = (): boolean => {
    switch (step) {
      case STEP_AGE:          return answers.age !== "";
      case STEP_COMPANION:    return answers.travelCompanion !== "";
      case STEP_CONTINENTS:   return answers.continents.length > 0;
      case STEP_DESTINATION:  return true; // always valid (Nein = default empty)
      case STEP_ORGANIZATION: return answers.organization !== "";
      case STEP_BUDGET:       return true;
      case STEP_DURATION:     return answers.duration !== "";
      case STEP_LANGUAGES:    return answers.languages.length > 0;
      case STEP_LANG_IMPROVE: return answers.languageToImprove !== "";
      case STEP_INTERESTS:    return answers.interests.length > 0;
      case STEP_HOUSING:      return answers.housing.length > 0;
      case STEP_CONCERN:      return answers.biggestConcern !== "";
      default:                return true;
    }
  };

  const goNext = () => {
    if (!canProceed()) return;
    const idx = ALL_STEPS.indexOf(step);
    if (idx < ALL_STEPS.length - 1) {
      setStep(ALL_STEPS[idx + 1]);
    } else {
      onSubmit(answers);
    }
  };

  const goPrev = () => {
    const idx = ALL_STEPS.indexOf(step);
    if (idx > 0) setStep(ALL_STEPS[idx - 1]);
  };

  const isLastStep = ALL_STEPS.indexOf(step) === ALL_STEPS.length - 1;

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="mb-7">
        <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
          <span>Schritt {visibleStep + 1} von {totalSteps}</span>
          <span>{Math.round(((visibleStep + 1) / totalSteps) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${((visibleStep + 1) / totalSteps) * 100}%`,
              background: "linear-gradient(to right, #f59e0b, #0f766e)",
            }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="animate-fade-in">

        {/* Step 0: Age */}
        {step === STEP_AGE && (
          <StepWrapper stepNum={1} totalSteps={totalSteps} title="Wie alt bist du?">
            <input
              type="number"
              placeholder="Dein Alter eingeben..."
              value={answers.age}
              min={10}
              max={99}
              onChange={(e) => update("age", e.target.value)}
              className="w-full px-4 py-4 rounded-xl border-2 border-stone-200 focus:border-teal-500 outline-none text-lg font-semibold text-stone-800 transition-colors text-center"
              autoFocus
            />
          </StepWrapper>
        )}

        {/* Step 1: Travel companion */}
        {step === STEP_COMPANION && (
          <StepWrapper stepNum={2} totalSteps={totalSteps} title="Reist du allein oder mit anderen?">
            <div className="space-y-2">
              {TRAVEL_COMPANIONS.map((c) => (
                <OptionCard
                  key={c.label}
                  label={c.label}
                  description={c.description}
                  icon={c.icon}
                  selected={answers.travelCompanion === c.label}
                  onClick={() => update("travelCompanion", c.label)}
                />
              ))}
            </div>
          </StepWrapper>
        )}

        {/* Step 2: Continents */}
        {step === STEP_CONTINENTS && (
          <StepWrapper stepNum={3} totalSteps={totalSteps} title="Welche Kontinente interessieren dich?" subtitle="Mehrfachauswahl möglich">
            <div className="space-y-2">
              {CONTINENTS.map((c) => (
                <OptionCard
                  key={c.label}
                  label={c.label}
                  icon={c.icon}
                  selected={answers.continents.includes(c.label)}
                  onClick={() => toggleMulti("continents", c.label)}
                  multi
                />
              ))}
            </div>
          </StepWrapper>
        )}

        {/* Step 3: Destination in mind */}
        {step === STEP_DESTINATION && (
          <StepWrapper stepNum={4} totalSteps={totalSteps} title="Hast du schon ein Ziel im Kopf?">
            <div className="space-y-2">
              <OptionCard
                label="Nein — überrasch mich!"
                icon="🎲"
                description="Martha sucht das passende Gap Year für mich aus"
                selected={answers.destinationInMind === ""}
                onClick={() => {
                  update("destinationInMind", "");
                  setDestinationText("");
                }}
              />
              <OptionCard
                label="Ja, ich habe ein Ziel im Kopf"
                icon="📍"
                description="Ich nenne Martha mein Wunschziel"
                selected={answers.destinationInMind !== ""}
                onClick={() => {
                  if (answers.destinationInMind === "") {
                    update("destinationInMind", destinationText || " ");
                  }
                }}
              />
              {answers.destinationInMind !== "" && (
                <input
                  type="text"
                  placeholder="z.B. Bali, Neuseeland, Kanada..."
                  value={destinationText}
                  onChange={(e) => {
                    setDestinationText(e.target.value);
                    update("destinationInMind", e.target.value || " ");
                  }}
                  className="w-full px-4 py-3 rounded-xl border-2 border-teal-300 focus:border-teal-500 outline-none text-sm transition-colors bg-teal-50"
                  autoFocus
                />
              )}
            </div>
          </StepWrapper>
        )}

        {/* Step 4: Organization */}
        {step === STEP_ORGANIZATION && (
          <StepWrapper stepNum={5} totalSteps={totalSteps} title="Wie möchtest du deine Reise gestalten?">
            <div className="space-y-3">
              <OptionCard
                label="Ich organisiere alles selbst"
                description="Maximale Freiheit — du entscheidest alles selbst"
                icon="🧭"
                selected={answers.organization === "self"}
                onClick={() => update("organization", "self")}
              />
              <OptionCard
                label="Ich gebe die Organisation ab"
                description="Alles gebucht & organisiert — du lehnst dich zurück"
                icon="🏢"
                selected={answers.organization === "agency"}
                onClick={() => update("organization", "agency")}
              />
            </div>
          </StepWrapper>
        )}

        {/* Step 5: Budget */}
        {step === STEP_BUDGET && (
          <StepWrapper stepNum={6} totalSteps={totalSteps} title="Wie groß ist dein Budget?" subtitle="Gesamtbudget für die gesamte Reise">
            <BudgetSlider
              value={answers.budget}
              onChange={(v) => update("budget", v)}
            />
          </StepWrapper>
        )}

        {/* Step 6: Duration */}
        {step === STEP_DURATION && (
          <StepWrapper stepNum={7} totalSteps={totalSteps} title="Wie lange möchtest du reisen?">
            <div className="space-y-2">
              {DURATIONS.map((d) => (
                <OptionCard
                  key={d.label}
                  label={d.label}
                  icon={d.icon}
                  selected={answers.duration === d.label}
                  onClick={() => update("duration", d.label)}
                />
              ))}
            </div>
          </StepWrapper>
        )}

        {/* Step 7: Languages */}
        {step === STEP_LANGUAGES && (
          <StepWrapper stepNum={8} totalSteps={totalSteps} title="Welche Sprachen sprichst du?" subtitle="Mehrfachauswahl möglich">
            <div className="space-y-2">
              {LANGUAGES.map((lang) => (
                <OptionCard
                  key={lang}
                  label={lang}
                  selected={answers.languages.includes(lang)}
                  onClick={() => toggleMulti("languages", lang)}
                  multi
                />
              ))}
              <OptionCard
                label="Andere Sprache"
                icon="🌐"
                selected={answers.languages.includes("Andere")}
                onClick={() => toggleMulti("languages", "Andere")}
                multi
              />
              {answers.languages.includes("Andere") && (
                <input
                  type="text"
                  placeholder="Welche Sprache?"
                  value={answers.otherLanguage}
                  onChange={(e) => update("otherLanguage", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-teal-300 focus:border-teal-500 outline-none text-sm transition-colors bg-teal-50"
                  autoFocus
                />
              )}
            </div>
          </StepWrapper>
        )}

        {/* Step 8: Language to improve */}
        {step === STEP_LANG_IMPROVE && (
          <StepWrapper stepNum={9} totalSteps={totalSteps} title="Möchtest du auf deiner Reise eine Sprache verbessern?">
            <div className="space-y-2">
              <OptionCard
                label="Nein, mir reicht was ich kann"
                icon="👍"
                selected={answers.languageToImprove === "nein"}
                onClick={() => update("languageToImprove", "nein")}
              />
              {["Englisch", "Spanisch", "Französisch", "Portugiesisch", "Deutsch", "Andere"].map(
                (lang) => (
                  <OptionCard
                    key={lang}
                    label={`Ja — ${lang} verbessern`}
                    icon="📖"
                    selected={answers.languageToImprove === lang}
                    onClick={() => update("languageToImprove", lang)}
                  />
                )
              )}
            </div>
          </StepWrapper>
        )}

        {/* Step 9: Interests (icon-top grid) */}
        {step === STEP_INTERESTS && (
          <StepWrapper stepNum={10} totalSteps={totalSteps} title="Was sind deine Interessen?" subtitle="Mehrfachauswahl möglich">
            <div className="grid grid-cols-2 gap-2">
              {INTERESTS.map((interest) => (
                <button
                  key={interest.label}
                  type="button"
                  onClick={() => toggleMulti("interests", interest.label)}
                  className={clsx(
                    "flex flex-col items-center gap-1.5 px-3 py-3.5 rounded-xl border-2 text-center transition-all",
                    answers.interests.includes(interest.label)
                      ? "border-teal-600 bg-teal-50 text-teal-900"
                      : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:shadow-sm"
                  )}
                >
                  <span className="text-2xl leading-none">{interest.icon}</span>
                  <span className="font-medium text-xs leading-tight">{interest.label}</span>
                </button>
              ))}
            </div>
          </StepWrapper>
        )}

        {/* Step 10: Housing */}
        {step === STEP_HOUSING && (
          <StepWrapper stepNum={11} totalSteps={totalSteps} title="Wie möchtest du wohnen?" subtitle="Mehrfachauswahl möglich">
            <div className="space-y-2">
              {HOUSING.map((h) => (
                <OptionCard
                  key={h.label}
                  label={h.label}
                  description={h.description}
                  icon={h.icon}
                  selected={answers.housing.includes(h.label)}
                  onClick={() => toggleMulti("housing", h.label)}
                  multi
                />
              ))}
            </div>
          </StepWrapper>
        )}

        {/* Step 11: Biggest concern */}
        {step === STEP_CONCERN && (
          <StepWrapper stepNum={12} totalSteps={totalSteps} title="Was ist deine größte Sorge?">
            <div className="space-y-2">
              {CONCERNS.map((c) => (
                <OptionCard
                  key={c.label}
                  label={c.label}
                  description={c.description}
                  icon={c.icon}
                  selected={answers.biggestConcern === c.label}
                  onClick={() => update("biggestConcern", c.label)}
                />
              ))}
            </div>
          </StepWrapper>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {visibleStep > 0 && (
          <button
            type="button"
            onClick={goPrev}
            className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Zurück
          </button>
        )}

        <button
          type="button"
          onClick={goNext}
          disabled={!canProceed() || isLoading}
          className={clsx(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all",
            canProceed() && !isLoading
              ? "bg-teal-700 text-white hover:bg-teal-800 hover:shadow-md"
              : "bg-stone-100 text-stone-400 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Martha denkt nach...
            </>
          ) : isLastStep ? (
            <>
              <Sparkles className="w-4 h-4" />
              Empfehlung erhalten
            </>
          ) : (
            <>
              Weiter
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ── StepWrapper ───────────────────────────────────────────────────────────────

function StepWrapper({
  stepNum,
  totalSteps,
  title,
  subtitle,
  children,
}: {
  stepNum: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-2">
        Frage {stepNum} / {totalSteps}
      </p>
      <h2 className="text-xl font-bold text-stone-900 mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-stone-500 mb-6">{subtitle}</p>}
      {!subtitle && <div className="mb-6" />}
      <div>{children}</div>
    </div>
  );
}
