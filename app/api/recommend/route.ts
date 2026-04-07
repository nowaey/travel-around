import { NextRequest } from "next/server";
import { getGroqClient } from "@/lib/claude";
import { SYSTEM_PROMPT, buildQuestionnairePrompt } from "@/lib/prompts";
import { RecommendRequest, TravelRecommendation } from "@/lib/types";

export const runtime = "nodejs";

const RECOMMENDATION_START = "<<<RECOMMENDATION_START>>>";
const RECOMMENDATION_END = "<<<RECOMMENDATION_END>>>";

function parseRecommendations(text: string): TravelRecommendation[] | null {
  const startIdx = text.indexOf(RECOMMENDATION_START);
  const endIdx = text.indexOf(RECOMMENDATION_END);
  if (startIdx === -1 || endIdx === -1) return null;
  const jsonStr = text.slice(startIdx + RECOMMENDATION_START.length, endIdx).trim();
  try {
    const parsed = JSON.parse(jsonStr);
    if (Array.isArray(parsed.recommendations)) {
      return parsed.recommendations as TravelRecommendation[];
    }
    return null;
  } catch {
    return null;
  }
}

function stripRecommendationBlock(text: string): string {
  const startIdx = text.indexOf(RECOMMENDATION_START);
  const endIdx = text.indexOf(RECOMMENDATION_END);
  if (startIdx === -1 || endIdx === -1) return text;
  return (
    text.slice(0, startIdx).trimEnd() +
    "\n\n" +
    text.slice(endIdx + RECOMMENDATION_END.length).trimStart()
  ).trim();
}

export async function POST(request: NextRequest) {
  try {
    const body: RecommendRequest = await request.json();
    const { answers } = body;

    if (!answers) {
      return new Response(JSON.stringify({ error: "Missing answers" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userMessage = buildQuestionnairePrompt(answers);
    const client = getGroqClient();
    const encoder = new TextEncoder();
    let fullText = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const groqStream = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            max_tokens: 3500,
            stream: true,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              { role: "user", content: userMessage },
            ],
          });

          for await (const chunk of groqStream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (!text) continue;
            fullText += text;
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: "chunk", content: text })}\n\n`)
            );
          }

          const recommendations = parseRecommendations(fullText);
          if (recommendations) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  type: "done",
                  isComplete: true,
                  recommendations,
                  closingText: stripRecommendationBlock(fullText),
                })}\n\n`
              )
            );
          } else {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: "done", isComplete: false })}\n\n`)
            );
          }

          controller.close();
        } catch (error) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "error",
                message: error instanceof Error ? error.message : "Unknown error",
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
