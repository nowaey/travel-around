import { TravelFormat, QuestionnaireAnswers } from "./types";

// System prompt — Finn gives ONE concise recommendation based on the profile
export const SYSTEM_PROMPT = `Du bist "Finn", ein erfahrener Reiseberater. Du bekommst ein ausgefülltes Reiseprofil und gibst darauf basierend EINE präzise, persönliche Empfehlung.

STIL:
- Kurz, klar, motivierend — kein langer Text
- Erklärung max. 3 Sätze
- Checkliste: nur die wichtigsten 5-7 Punkte
- 3-4 hilfreiche Links
- Keine generischen Ratschläge

AUSGABE: JSON zwischen <<<RECOMMENDATION_START>>> und <<<RECOMMENDATION_END>>>:

<<<RECOMMENDATION_START>>>
{
  "destination": "Medellín",
  "country": "Kolumbien",
  "tagline": "Sommer das ganze Jahr — perfekt für deinen Neustart",
  "explanation": "Mit deinem Budget von 2.000€/Monat lebst du in Medellín königlich. Die Stadt ist Lateinamerikas Nomaden-Hotspot: günstiger als Europa, sicher, english-friendly und mit direktem Zugang zur Natur.",
  "checklist": [
    { "category": "visa", "task": "Kein Visum nötig — 90 Tage visumfrei für Deutsche", "priority": "must", "timeframe": "Vor Abflug prüfen" },
    { "category": "insurance", "task": "Auslandskrankenversicherung abschließen (z.B. HanseMerkur)", "priority": "must", "timeframe": "4 Wochen vorher" },
    { "category": "health", "task": "Tropenmediziner aufsuchen — Hepatitis A/B prüfen", "priority": "must", "timeframe": "6 Wochen vorher" },
    { "category": "bookings", "task": "Erste 2 Wochen Unterkunft vorbuchen (Airbnb empfohlen)", "priority": "recommended", "timeframe": "4 Wochen vorher" },
    { "category": "admin", "task": "Reisepass prüfen — min. 6 Monate über Rückreise gültig", "priority": "must", "timeframe": "Sofort" }
  ],
  "resources": [
    { "title": "Auswärtiges Amt Kolumbien", "url": "https://www.auswaertiges-amt.de/de/service/laender/kolumbien-node", "type": "official" },
    { "title": "Nomad List — Medellín", "url": "https://nomadlist.com/medellin", "type": "tool" },
    { "title": "r/solotravel", "url": "https://www.reddit.com/r/solotravel", "type": "community" }
  ],
  "estimatedBudget": "ca. 1.200–1.800€/Monat",
  "bestTimeToVisit": "Ganzjährig — Trockenzeit: Dez–Feb"
}
<<<RECOMMENDATION_END>>>

Schreibe nach dem JSON-Block 1-2 persönliche, motivierende Sätze.`;

// Builds the user message from questionnaire answers
export function buildQuestionnairePrompt(
  answers: QuestionnaireAnswers,
  format: TravelFormat
): string {
  const formatLabels: Record<TravelFormat, string> = {
    "work-travel": "Work & Travel",
    backpacking: "Backpacking",
    sabbatical: "Sabbatical",
    "city-trip": "City Trip",
    adventure: "Adventure Travel",
    family: "Familienreise",
  };

  const lines = [
    `Reiseformat: ${formatLabels[format]}`,
    `Alter: ${answers.age}`,
    `Reisebegleitung: ${answers.travelCompanion || "keine Angabe"}`,
    `Kontinente: ${answers.continents.join(", ") || "offen"}`,
    `Destination im Kopf: ${answers.destinationInMind || "Nein, offen"}`,
    `Organisation: ${answers.organization === "self" ? "Selbst organisieren" : "Agentur / alles gebucht"}`,
    `Budget: ${answers.budget.toLocaleString("de-DE")}€ gesamt`,
    `Reisedauer: ${answers.duration}`,
    `Sprachen: ${[...answers.languages, answers.otherLanguage].filter(Boolean).join(", ")}`,
    `Sprache verbessern: ${answers.languageToImprove || "Nein"}`,
    `Interessen: ${answers.interests.join(", ") || "keine Angabe"}`,
    `Wohnen: ${answers.housing.join(", ") || "keine Angabe"}`,
    `Größte Sorge: ${answers.biggestConcern || "keine Angabe"}`,
  ];

  return `Hier ist das Reiseprofil des Nutzers:\n\n${lines.join("\n")}\n\nBitte gib deine Empfehlung.`;
}

// Opening messages per format (for reference, no longer used in chat)
export function buildOpeningMessage(format: TravelFormat): string {
  const greetings: Record<TravelFormat, string> = {
    "work-travel": "Work & Travel — tolle Wahl! 🌍",
    backpacking: "Backpacking — die echte Freiheit! 🎒",
    sabbatical: "Ein Sabbatical — Zeit für dich! 🌿",
    "city-trip": "City Trip — kurz und intensiv! 🏙️",
    adventure: "Adventure — raus aus der Komfortzone! 🏔️",
    family: "Familienreise — gemeinsam Erinnerungen schaffen! 👨‍👩‍👧‍👦",
  };
  return greetings[format];
}
