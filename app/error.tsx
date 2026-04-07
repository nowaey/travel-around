"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
      <div className="text-center max-w-sm">
        <p className="text-4xl mb-4">😕</p>
        <h1 className="text-xl font-bold text-white mb-2">Etwas ist schiefgelaufen</h1>
        <p className="text-white/40 text-sm mb-8">
          Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-glow"
        >
          Erneut versuchen
        </button>
      </div>
    </div>
  );
}
