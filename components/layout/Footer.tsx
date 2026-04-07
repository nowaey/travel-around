import Logo from "@/components/ui/Logo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white py-12 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div>
            <Logo variant="dark" size="md" className="mb-3" />
            <p className="text-stone-400 text-sm max-w-xs">
              Deine KI-Beraterin Martha hilft dir, das passende Gap Year zu finden.
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-2">
            <Link
              href="/advisor"
              className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              Selbsttest starten
            </Link>
            <p className="text-stone-500 text-xs mt-1">Powered by Google Gemini · Groq Llama</p>
            <p className="text-stone-600 text-xs">© {new Date().getFullYear()} travel around</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-stone-800 text-center">
          <p className="text-stone-600 text-xs">
            Fotos von{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-white transition-colors"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
