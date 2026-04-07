import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
      <div className="text-center max-w-sm">
        <p className="text-6xl font-bold text-gradient mb-4">404</p>
        <h1 className="text-xl font-bold text-white mb-2">Seite nicht gefunden</h1>
        <p className="text-white/40 text-sm mb-8">
          Die Seite, die du suchst, existiert leider nicht.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-glow"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
