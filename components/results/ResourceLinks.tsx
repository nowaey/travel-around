import { ResourceLink } from "@/lib/types";
import { ExternalLink, Globe, Users, Wrench, Sparkles } from "lucide-react";
import { clsx } from "clsx";

interface Props { links: ResourceLink[]; }

const TYPE: Record<string, { label: string; Icon: React.ElementType; pill: string }> = {
  official:    { label: "Offiziell",   Icon: Globe,    pill: "bg-blue-50 text-blue-600 border-blue-100" },
  community:   { label: "Community",   Icon: Users,    pill: "bg-amber-50 text-amber-600 border-amber-100" },
  tool:        { label: "Tool",        Icon: Wrench,   pill: "bg-purple-50 text-purple-600 border-purple-100" },
  inspiration: { label: "Inspiration", Icon: Sparkles, pill: "bg-teal-50 text-teal-600 border-teal-100" },
};

export default function ResourceLinks({ links }: Props) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-stone-100">
      <div className="px-5 py-3.5 border-b border-stone-100">
        <h3 className="font-bold text-stone-800 text-base">Hilfreiche Links</h3>
      </div>
      <div className="flex gap-2.5 overflow-x-auto scrollbar-none px-5 py-3.5">
        {links.map((link, idx) => {
          const meta = TYPE[link.type] ?? TYPE["inspiration"];
          const Icon = meta.Icon;
          return (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex flex-col gap-2 w-40 p-3 rounded-xl border border-stone-100 hover:border-teal-200 hover:shadow-md transition-all group bg-white"
            >
              <span className={clsx("inline-flex items-center gap-1 self-start border text-xs font-semibold px-2 py-0.5 rounded-full", meta.pill)}>
                <Icon className="w-3 h-3" />{meta.label}
              </span>
              <p className="font-semibold text-stone-800 text-xs leading-snug group-hover:text-teal-700 transition-colors line-clamp-2">
                {link.title}
              </p>
              <div className="flex items-center gap-1 text-xs text-stone-300 group-hover:text-teal-500 transition-colors mt-auto">
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
