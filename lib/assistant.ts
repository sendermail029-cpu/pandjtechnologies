import { company, faqCategories, partnersText, services } from "@/lib/site";

// Everything the website assistant knows, built from the same data the pages use.
// It never changes between requests, so the API can cache it.
export const assistantSystemPrompt = [
  `You are the website assistant for ${company.name}, a technology company in Vijayawada, Andhra Pradesh, India.`,
  "You chat with visitors who are curious about building a website, mobile app, CRM, ERP, SaaS product, AI agent or ad campaign, or who want to take an exam at our authorized test center.",
  "",
  "How to reply:",
  "- Keep replies short and friendly: two to four sentences, plain text, no markdown headings or tables. A short list is fine when it helps.",
  "- Answer only from the facts below. If something isn't covered (exact prices, delivery dates, exam slot availability, a client's private details), say the team will confirm it and suggest getting in touch.",
  "- Never invent prices, discounts, guarantees, client names, reviews or results.",
  "- When a visitor is interested in a project, ask one useful question about what they need, then suggest the contact page (/contact) or WhatsApp so the team can send a proposal.",
  "- For exams, explain that candidates book on the exam provider's own website and choose our center; for anything about their booking, they should contact the provider or us.",
  "- If asked about something unrelated to our services, politely bring the conversation back to how we can help.",
  "- Reply in the language the visitor writes in.",
  "",
  "Company:",
  `- Address: ${company.address.join(", ")}`,
  `- Hours: ${company.hours}`,
  `- Email: ${company.email}`,
  ...company.phones.map((p) => `- ${p.label}: ${p.number}`),
  `- WhatsApp: +${company.whatsapp}`,
  `- Authorized test center for ${partnersText}.`,
  "",
  "Services (each has its own page on the website):",
  ...services.map((s) => `- ${s.name} (/services/${s.slug}): ${s.summary} Typical outcomes: ${s.outcomes.join("; ")}.`),
  "- Test center (/test-center): secure, proctored computer-based exams in Vijayawada.",
  "",
  "Frequently asked questions:",
  ...faqCategories.flatMap((c) => c.items.map((f) => `Q: ${f.q}\nA: ${f.a}`)),
].join("\n");

// quick starting points shown in the chat
export const assistantTopics = [
  { t: "Website", q: "I want a website for my business." },
  { t: "Mobile app", q: "I'm planning a mobile app." },
  { t: "CRM / ERP", q: "I need CRM or ERP software for my business." },
  { t: "SaaS & AI", q: "I want to build a SaaS product or an AI agent." },
  { t: "Digital marketing", q: "I want to run Meta or Google Ads." },
  { t: "Book an exam", q: "How do I book a Pearson VUE, PSI or Meazure Learning exam at your center?" },
];

// answers used when the AI isn't configured, so the chat still helps
export const assistantFallback: Record<string, string> = {
  Website:
    "We design fast, mobile-first websites that are ready for Google, with domain, hosting and business email handled for you. Tell us about your business on the contact page or WhatsApp, and we'll send a written proposal with a fixed price.",
  "Mobile app":
    "We build Android and iOS apps with payments, notifications and an admin panel. Share your idea through the contact page or WhatsApp and we'll come back with a scope and price.",
  "CRM / ERP":
    "Our CRM keeps every lead, follow-up and quote in one place, and our ERP runs stock, GST billing, purchase and accounts. Tell us how your business works today and we'll plan the right modules.",
  "SaaS & AI":
    "We build SaaS products, AI agents that answer and follow up with customers, and software that connects with hardware. Share your idea and we'll map out a plan with you.",
  "Digital marketing":
    "We run Meta and Google Ads measured on enquiries, with WhatsApp automation and AI calling to follow up every lead. Tell us your business and budget and we'll suggest where to start.",
  "Book an exam": `We're an authorized test center for ${partnersText} in Vijayawada. Book on the exam provider's own website, choose P & J Technologies, Vijayawada as your center, then pick a date and time. For help, call ${company.phones[0].number}.`,
};

/* ---------- free mode: answer typed questions from the site's own content, no AI needed ---------- */

const STOP = new Set(
  "a an the is are am be to of in on for and or with my our your you we i me do does did can could would should how what when where which who why it this that there their them at by from as about want need get have has please tell know".split(" "),
);
const words = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map((w) => w.replace(/(ing|es|s)$/, ""));

// topic words that point straight to one of the quick answers
const topicHints: [string, string[]][] = [
  ["Book an exam", ["exam", "pearson", "vue", "psi", "meazure", "test", "certification", "slot", "candidate", "proctor"]],
  ["Website", ["website", "site", "web", "domain", "hosting", "seo", "landing", "wordpress"]],
  ["Mobile app", ["app", "android", "ios", "mobile", "playstore", "flutter"]],
  ["CRM / ERP", ["crm", "erp", "lead", "inventory", "stock", "billing", "gst", "invoice", "payroll", "tally"]],
  ["SaaS & AI", ["saas", "ai", "agent", "chatbot", "automation", "iot", "hardware", "custom", "software"]],
  ["Digital marketing", ["ad", "ads", "marketing", "meta", "google", "facebook", "instagram", "whatsapp", "campaign", "calling"]],
];

const faqIndex = faqCategories.flatMap((c) => c.items.map((f) => ({ ...f, keys: new Set(words(`${f.q} ${c.title}`)) })));

// best answer for a typed question: a matching FAQ if one fits well, else the closest topic, else null
export function localAnswer(question: string): string | null {
  const q = words(question);
  if (!q.length) return null;
  if (/^(hi|hello|hey|namaste|good (morning|afternoon|evening))\b/i.test(question.trim()))
    return "Hello! 👋 Tell me what you're planning (a website, app, CRM, ERP, marketing) or if you'd like to book an exam, and I'll point you the right way.";
  if (/\b(prices?|costs?|charges?|fees?|quotes?|quotation|budget|rates?|how much)\b/i.test(question))
    return "Every project is priced to its scope: you get a written proposal with a fixed price before any work starts. Share a few details on the contact page or WhatsApp and the team will send one.";
  if (/\b(address|location|where|office|visit|timing|hours|open)\b/i.test(question))
    return `We're at ${company.address.join(", ")}. Hours: ${company.hours}. Call ${company.phones[0].number} before visiting if you like.`;
  if (/\b(jobs?|careers?|hiring|vacanc(y|ies)|internships?|walk ?-?ins?|openings?)\b/i.test(question))
    return "See our open roles and walk-in drives on the Careers page (/careers). You can apply online there and set up job alerts.";

  let best: { score: number; a: string } | null = null;
  for (const f of faqIndex) {
    const score = q.filter((w) => f.keys.has(w)).length / Math.max(3, f.keys.size * 0.6);
    if (!best || score > best.score) best = { score, a: f.a };
  }
  if (best && best.score >= 0.45) return best.a;

  for (const [topic, hints] of topicHints) if (q.some((w) => hints.includes(w))) return assistantFallback[topic];
  return null;
}
