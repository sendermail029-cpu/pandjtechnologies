import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/newsletter";

// Footer newsletter sign-up: stores the email for the admin panel's subscriber list
export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot filled → bot
  const email = String(body.email ?? "").trim().slice(0, 150);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  const added = await addSubscriber(email);
  return NextResponse.json({ ok: true, already: !added });
}
