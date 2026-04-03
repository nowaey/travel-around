import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white py-12 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div>
            <Logo variant="dark" size="md" className="mb-3" />
            <p className="text-stone-400 text-sm">Dein persönlicher KI-Reiseberater.</p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-stone-500 text-xs">Powered by Groq · Llama 3.3 70B</p>
            <p className="text-stone-600 text-xs mt-1">© {new Date().getFullYear()} travel around</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-stone-800 text-center">
          <p className="text-stone-600 text-xs">
            Fotos von{" "}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors">
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
