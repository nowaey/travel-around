import { clsx } from "clsx";

interface ChatMessageType {
  id: string;
  role: "assistant" | "user";
  content: string;
}

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={clsx(
        "flex gap-3 animate-fade-in",
        isAssistant ? "justify-start" : "justify-end"
      )}
    >
      {/* Avatar for Martha */}
      {isAssistant && (
        <div className="flex-shrink-0 w-9 h-9 bg-teal-700 rounded-full flex items-center justify-center text-white font-semibold text-sm mt-0.5">
          M
        </div>
      )}

      <div
        className={clsx(
          "max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
          isAssistant
            ? "bg-stone-100 text-stone-800 rounded-tl-sm"
            : "bg-teal-700 text-white rounded-tr-sm"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
