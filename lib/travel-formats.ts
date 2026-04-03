import { TravelFormat } from "./types";

export interface TravelFormatDef {
  id: TravelFormat;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export const TRAVEL_FORMATS: TravelFormatDef[] = [
  {
    id: "work-travel",
    title: "Work & Travel",
    description: "Arbeiten und die Welt entdecken — ideal für 18–30 Jährige",
    icon: "Briefcase",
    tags: ["6–24 Monate", "Visum erforderlich", "Abenteuer"],
  },
  {
    id: "backpacking",
    title: "Backpacking",
    description: "Die Welt mit dem Rucksack erkunden — flexibel und günstig",
    icon: "Backpack",
    tags: ["2 Wochen – 1 Jahr", "Budget-freundlich", "Freiheit"],
  },
  {
    id: "sabbatical",
    title: "Sabbatical",
    description: "Eine bewusste Auszeit vom Alltag — Zeit für dich selbst",
    icon: "Sunset",
    tags: ["1–12 Monate", "Selbstreflexion", "Erholung"],
  },
  {
    id: "city-trip",
    title: "City Trip",
    description: "Städte intensiv erleben — Kultur, Essen, Nightlife",
    icon: "Building2",
    tags: ["3–7 Tage", "Kompakt", "Kulturell"],
  },
  {
    id: "adventure",
    title: "Adventure Travel",
    description: "Raus aus der Komfortzone — Trekking, Surfen, Klettern",
    icon: "Mountain",
    tags: ["1–4 Wochen", "Aktiv", "Unvergesslich"],
  },
  {
    id: "family",
    title: "Familienreise",
    description: "Gemeinsam die Welt entdecken — für jedes Alter geeignet",
    icon: "Heart",
    tags: ["1–4 Wochen", "Kinderfreundlich", "Sicher"],
  },
];
