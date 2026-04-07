export type TravelFormat =
  | "work-travel"
  | "backpacking"
  | "sabbatical"
  | "city-trip"
  | "adventure"
  | "family";

// ── Legacy (unused) ──────────────────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
}

// ── Questionnaire ────────────────────────────────────────────────────────────

export interface QuestionnaireAnswers {
  age: string;
  travelCompanion: string;   // "solo" | "duo" | "group" | "family"
  continents: string[];
  destinationInMind: string; // "" = nein, sonst Zielname
  organization: string;      // "self" | "agency"
  budget: number;            // 200-20000 €
  duration: string;
  languages: string[];
  otherLanguage: string;
  languageToImprove: string; // "" = nein
  interests: string[];
  housing: string[];
  biggestConcern: string;
}

export const defaultAnswers: QuestionnaireAnswers = {
  age: "",
  travelCompanion: "",
  continents: [],
  destinationInMind: "",
  organization: "",
  budget: 3000,
  duration: "",
  languages: [],
  otherLanguage: "",
  languageToImprove: "",
  interests: [],
  housing: [],
  biggestConcern: "",
};

// ── Results ──────────────────────────────────────────────────────────────────

export interface TravelRecommendation {
  travelType: string;          // z.B. "Au pair", "Work & Travel"
  formatExplanation: string;   // 2 Sätze: Was ist dieser Reisetyp?
  destination: string;
  country: string;
  imageKeyword: string;        // z.B. "tokyo japan skyline night" für Unsplash-Suche
  tagline: string;
  explanation: string;
  checklist: ChecklistItem[];
  resources: ResourceLink[];
  packingList?: string[];      // kopierbare Packliste
  estimatedBudget?: string;
  bestTimeToVisit?: string;
}

export interface ChecklistItem {
  category: "visa" | "insurance" | "bookings" | "health" | "gear" | "admin";
  task: string;
  priority: "must" | "recommended" | "optional";
  timeframe?: string;
}

export interface ResourceLink {
  title: string;
  url: string;
  type: "official" | "community" | "tool" | "inspiration";
}

// ── API ──────────────────────────────────────────────────────────────────────

export interface RecommendRequest {
  answers: QuestionnaireAnswers;
}
