import { ResourceLink } from "@/lib/types";
import { ExternalLink, Globe, Users, Wrench, Sparkles } from "lucide-react";
import { clsx } from "clsx";

interface ResourceLinksProps { links: ResourceLink[]; }

const TYPE_META: Record<string, { label: string; icon: React.ElementType; bg: string; text: string; border: string }> = {
  official:    { label: "Offiziell",   icon: Globe,    bg: "bg-blue-50",   text: "text-blue-600",   border: "border-blue-100" },
  community:   { label: "Community",   icon: Users,    bg: "bg-amber-50",  text: "text-amber-600",  border: "border-amber-100" },
  tool:        { label: "Tool",        icon: Wrench,   bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
  inspiration: { label: "Inspiration", icon: Sparkles, bg: "bg-teal-50",   text: "text-teal-600",   border: "border-teal-100" },
};

const FALLBACK = TYPE_META["inspiration"];

export default function ResourceLinks({ links }: ResourceLinksProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-warm border border-stone-100">
      <div className="px-6 py-4 border-b border-stone-100">
        <h3 className="font-bold text-stone-900 text-lg">Hilfreiche Links</h3>
      </div>

      {/* Horizontal scroll row */}
      <div className="flex gap-3 overflow-x-auto scrollbar-none px-6 py-4">
        {links.map((link, idx) => {
          const meta = TYPE_META[link.type] ?? FALLBACK;
          const Icon = meta.icon;
          return (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex flex-col gap-3 w-44 p-4 rounded-xl border border-stone-100 hover:border-teal-200 hover:shadow-md transition-all group bg-white"
            >
              <div className={clsx("w-9 h-9 rounded-lg border flex items-center justify-center", meta.bg, meta.border)}>
                <Icon className={clsx("w-4 h-4", meta.text)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-stone-800 text-sm leading-snug group-hover:text-teal-700 transition-colors line-clamp-2">
                  {link.title}
                </p>
                <p className={clsx("text-xs mt-1 font-medium", meta.text)}>{meta.label}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-stone-400 group-hover:text-teal-500 transition-colors">
                <ExternalLink className="w-3 h-3" />
                <span>Öffnen</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
