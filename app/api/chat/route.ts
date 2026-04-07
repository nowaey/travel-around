import { NextRequest } from "next/server";
import { getGroqClient } from "@/lib/claude";

export const runtime = "nodejs";

const SYSTEM_PROMPT =
  "Du bist Martha, eine freundliche und erfahrene Reiseberaterin für junge Leute nach der Schule. Du hilfst beim Planen von Gap Years — Au pair, Work & Travel, Freiwilligenarbeit, Backpacking und mehr. Deine Antworten sind kurz, praktisch und motivierend. Du antwortest immer auf Deutsch.";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = getGroqClient();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const groqStream = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            max_tokens: 1024,
            stream: true,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages.map((m: { role: string; content: string }) => ({
                role: m.role as "user" | "assistant",
                content: m.content,
              })),
            ],
          });

          for await (const chunk of groqStream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (!text) continue;
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: "chunk", content: text })}\n\n`)
            );
          }

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`)
          );
          controller.close();
        } catch (error) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "error",
                message: error instanceof Error ? error.message : "Unbekannter Fehler",
              })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
