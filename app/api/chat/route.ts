import Anthropic from "@anthropic-ai/sdk";
import { assistantSystemPrompt } from "@/lib/assistant";

/**
 * Website assistant: streams Claude's reply as plain text.
 * Needs ANTHROPIC_API_KEY in the environment (.env.local / hosting settings). Without it the route answers 503
 * and the chat widget falls back to its built-in answers.
 */

const MAX_TURNS = 20; // messages kept from the conversation
const MAX_CHARS = 1500; // per message

// a light per-visitor limit so the endpoint can't be used to run up the bill
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 12;
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) return Response.json({ fallback: true }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (limited(ip)) return Response.json({ error: "Too many messages. Please wait a minute." }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // keep only well-formed user/assistant text turns, starting with the visitor
  const raw = Array.isArray((body as { messages?: unknown })?.messages) ? (body as { messages: unknown[] }).messages : [];
  const messages: Anthropic.Beta.BetaMessageParam[] = raw
    .filter(
      (m): m is { role: "user" | "assistant"; content: string } =>
        !!m &&
        typeof m === "object" &&
        ((m as { role?: unknown }).role === "user" || (m as { role?: unknown }).role === "assistant") &&
        typeof (m as { content?: unknown }).content === "string" &&
        (m as { content: string }).content.trim().length > 0,
    )
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "Send a message to start." }, { status: 400 });
  }

  const client = new Anthropic();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const reply = client.beta.messages.stream({
          model: "claude-opus-5-5",
          max_tokens: 16000,
          output_config: { effort: "low" }, // short chat answers
          // if a reply is declined by a safeguard, the API retries it on a suitable model
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
          system: [{ type: "text", text: assistantSystemPrompt, cache_control: { type: "ephemeral" } }],
          messages,
        });
        for await (const event of reply) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await reply.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(encoder.encode("Sorry, I can't help with that here. Our team is happy to talk on the contact page."));
        }
      } catch (error) {
        console.error("chat error", error instanceof Anthropic.APIError ? `${error.status} ${error.message}` : error);
        controller.enqueue(encoder.encode("\n\nSorry, I couldn't reply just now. Please try again, or reach us on the contact page."));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
