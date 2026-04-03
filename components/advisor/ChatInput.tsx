"use client";

import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-3 items-end bg-white border border-stone-200 rounded-2xl p-3 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition-all">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Schreibe deine Antwort..."
        rows={1}
        className="flex-1 resize-none bg-transparent text-stone-900 placeholder-stone-400 text-sm leading-relaxed outline-none disabled:opacity-50 max-h-32 overflow-y-auto"
        style={{ height: "auto" }}
        onInput={(e) => {
          const target = e.currentTarget;
          target.style.height = "auto";
          target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
        }}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className="flex-shrink-0 w-9 h-9 bg-teal-700 hover:bg-teal-800 disabled:bg-stone-200 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
}
