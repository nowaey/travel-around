"use client";

import { useState, useCallback } from "react";
import { ChatMessage, TravelFormat, TravelRecommendation } from "@/lib/types";
import { buildOpeningMessage } from "@/lib/prompts";

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

interface UseAdvisorChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  isComplete: boolean;
  recommendation: TravelRecommendation | null;
  sendMessage: (content: string) => Promise<void>;
  initialize: (format: TravelFormat) => void;
  restart: () => void;
}

export function useAdvisorChat(): UseAdvisorChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [recommendation, setRecommendation] =
    useState<TravelRecommendation | null>(null);
  const [format, setFormat] = useState<TravelFormat | null>(null);

  const initialize = useCallback((selectedFormat: TravelFormat) => {
    setFormat(selectedFormat);
    setIsComplete(false);
    setRecommendation(null);
    setMessages([
      {
        id: generateId(),
        role: "assistant",
        content: buildOpeningMessage(selectedFormat),
      },
    ]);
  }, []);

  const restart = useCallback(() => {
    if (format) {
      initialize(format);
    }
  }, [format, initialize]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!format || isLoading) return;

      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        content,
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsLoading(true);

      // Placeholder for the AI response
      const assistantId = generateId();
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      try {
        const response = await fetch("/api/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            format,
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!response.ok || !response.body) {
          throw new Error("API request failed");
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
            const jsonStr = line.slice(6);
            try {
              const event = JSON.parse(jsonStr);

              if (event.type === "chunk") {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? { ...m, content: m.content + event.content }
                      : m
                  )
                );
              } else if (event.type === "done") {
                if (event.isComplete && event.recommendation) {
                  // Replace streaming content with clean text (no JSON block)
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId
                        ? { ...m, content: event.cleanText ?? m.content }
                        : m
                    )
                  );
                  setRecommendation(event.recommendation);
                  setIsComplete(true);
                }
              } else if (event.type === "error") {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? {
                          ...m,
                          content:
                            "Entschuldigung, da ist etwas schiefgelaufen. Bitte versuche es nochmal.",
                        }
                      : m
                  )
                );
              }
            } catch {
              // Skip malformed events
            }
          }
        }
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    "Entschuldigung, da ist etwas schiefgelaufen. Bitte versuche es nochmal.",
                }
              : m
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [format, messages, isLoading]
  );

  return {
    messages,
    isLoading,
    isComplete,
    recommendation,
    sendMessage,
    initialize,
    restart,
  };
}
