export default function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      {/* Finn avatar */}
      <div className="flex-shrink-0 w-9 h-9 bg-teal-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
        F
      </div>

      <div className="bg-stone-100 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
        <span className="typing-dot w-2 h-2 bg-stone-400 rounded-full inline-block" />
        <span className="typing-dot w-2 h-2 bg-stone-400 rounded-full inline-block" />
        <span className="typing-dot w-2 h-2 bg-stone-400 rounded-full inline-block" />
      </div>
    </div>
  );
}
