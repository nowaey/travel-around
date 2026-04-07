"use client";

import { useEffect, useRef, useState } from "react";
import { X, MessageCircle, Send } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hallo! Ich bin Martha, deine Gap-Year-Beraterin. 🌍 Wie kann ich dir helfen?",
};

export default function MarthaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, [messages, isLoading, isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const assistantId = (Date.now() + 1).toString();
    const assistantMsg: Message = { id: assistantId, role: "assistant", content: "" };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setIsLoading(true);
    setError(null);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const event = JSON.parse(line.slice(6));
            if (event.type === "chunk") {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: m.content + event.content } : m
                )
              );
            } else if (event.type === "error") {
              setError("Fehler: " + event.message);
            }
          } catch {
            /* skip malformed lines */
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verbindungsfehler");
      // Remove the empty assistant message on failure
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      {isOpen && (
        <div
          className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden"
          style={{ height: "32rem" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-800 to-teal-700 px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-tight">Martha</p>
              <p className="text-teal-200 text-xs">Gap Year Beraterin</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 bg-teal-700 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-0.5">
                    M
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-teal-700 text-white rounded-tr-sm"
                      : "bg-stone-100 text-stone-800 rounded-tl-sm"
                  }`}
                >
                  {msg.content || (
                    <span className="flex items-center gap-1.5">
                      <span className="typing-dot w-2 h-2 bg-stone-400 rounded-full inline-block" />
                      <span className="typing-dot w-2 h-2 bg-stone-400 rounded-full inline-block" />
                      <span className="typing-dot w-2 h-2 bg-stone-400 rounded-full inline-block" />
                    </span>
                  )}
                </div>
              </div>
            ))}

            {error && (
              <p className="text-xs text-red-500 text-center">⚠️ {error}</p>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 pb-3 pt-2 border-t border-stone-100 flex-shrink-0">
            <div className="flex gap-2 items-end bg-white border border-stone-200 rounded-2xl px-3 py-2 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition-all">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                onInput={(e) => {
                  const t = e.currentTarget;
                  t.style.height = "auto";
                  t.style.height = `${Math.min(t.scrollHeight, 96)}px`;
                }}
                placeholder="Frag Martha..."
                rows={1}
                disabled={isLoading}
                className="flex-1 resize-none bg-transparent text-stone-900 placeholder-stone-400 text-sm outline-none disabled:opacity-50 max-h-24 overflow-y-auto"
                style={{ height: "auto" }}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="flex-shrink-0 w-8 h-8 bg-teal-700 hover:bg-teal-800 disabled:bg-stone-200 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="w-14 h-14 bg-teal-700 hover:bg-teal-800 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
        aria-label="Martha fragen"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
