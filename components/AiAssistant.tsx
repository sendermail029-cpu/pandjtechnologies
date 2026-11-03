"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { assistantFallback, assistantTopics, localAnswer } from "@/lib/assistant";
import { company } from "@/lib/site";

type Msg = { role: "user" | "assistant"; content: string };

const greeting = "Hi! I'm the P & J assistant. Ask me about websites, apps, CRM, ERP, SaaS & AI, digital marketing or booking an exam.";

function Bot({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path d="M32 7v8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="6" r="4" fill="#67e8f9" />
      <rect x="10" y="15" width="44" height="34" rx="13" fill="#fff" />
      <rect x="16" y="23" width="32" height="17" rx="8.5" fill="#1e1b4b" />
      <rect x="22.5" y="28.5" width="6" height="6" rx="3" fill="#67e8f9" />
      <rect x="35.5" y="28.5" width="6" height="6" rx="3" fill="#67e8f9" />
    </svg>
  );
}

// A chat assistant in the corner of every page. Uses Claude through /api/chat; if that isn't set up,
// it answers the common topics itself and points people to the team.
export function AiAssistant() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [offline, setOffline] = useState(false);
  const list = useRef<HTMLDivElement>(null);

  // after a minute on the site, say hi once per visit: open on wider screens, a small bubble on phones
  const [nudge, setNudge] = useState(false);
  const openedRef = useRef(false);
  openedRef.current = open;
  useEffect(() => {
    const store = (k: string, v?: string) => {
      try {
        if (v === undefined) return sessionStorage.getItem(k);
        sessionStorage.setItem(k, v);
      } catch {}
      return null;
    };
    if (store("pj-assistant-greeted")) return;
    let start = Number(store("pj-assistant-start"));
    if (!start) {
      start = Date.now();
      store("pj-assistant-start", String(start));
    }
    const t = setTimeout(() => {
      if (openedRef.current) return;
      store("pj-assistant-greeted", "1");
      if (window.matchMedia("(min-width: 640px)").matches) setOpen(true);
      else setNudge(true);
    }, Math.max(0, 60_000 - (Date.now() - start)));
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!open) return;
    setNudge(false);
    try {
      sessionStorage.setItem("pj-assistant-greeted", "1");
    } catch {}
  }, [open]);

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [msgs, busy, reduce]);

  if (pathname.startsWith("/admin")) return null;

  const send = async (text: string, topic?: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs(next);
    setInput("");

    // no AI available: answer the topic from the built-in replies
    const offlineReply = () =>
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content:
            (topic && assistantFallback[topic]) ||
            localAnswer(q) ||
            `Thanks for your message! Our team will help with this. Reach us on WhatsApp, call ${company.phones[0].number}, or use the contact page.`,
        },
      ]);
    if (offline) return offlineReply();

    setBusy(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next }) });
      if (res.status === 503) {
        setOffline(true);
        offlineReply();
        return;
      }
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}));
        setMsgs((m) => [...m, { role: "assistant", content: err.error || "Sorry, something went wrong. Please try again." }]);
        return;
      }
      // stream the reply in as it arrives
      setMsgs((m) => [...m, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMsgs((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: copy[copy.length - 1].content + chunk };
          return copy;
        });
      }
    } catch {
      setMsgs((m) => [...m, { role: "assistant", content: "I couldn't connect just now. Please try again, or reach us on WhatsApp." }]);
    } finally {
      setBusy(false);
    }
  };

  const wa = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent("Hi P & J Technologies, I'd like to know more.")}`;

  return (
    <>
      {/* the hi bubble (phones, after a minute) */}
      <AnimatePresence>
        {nudge && !open && (
          <motion.div
            className="fixed bottom-[88px] right-5 z-[60] flex max-w-[260px] items-start gap-2 rounded-2xl rounded-br-sm bg-white p-3 pr-2 shadow-[0_20px_50px_-15px_rgba(15,29,51,0.45)] ring-1 ring-black/5"
            initial={reduce ? false : { opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "bottom right" }}
          >
            <button type="button" onClick={() => setOpen(true)} className="text-left text-[14px] leading-snug text-ink">
              <span className="font-semibold">Hi 👋</span> Need help choosing a service or booking an exam? Ask me.
            </button>
            <button type="button" onClick={() => setNudge(false)} aria-label="Dismiss" className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-slate hover:bg-[#f5f7fc]">
              <svg width="10" height="10" viewBox="0 0 16 16" aria-hidden>
                <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* the launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with our assistant"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#7c3aed] to-cobalt text-white shadow-[0_14px_34px_-8px_rgba(39,71,214,0.7)] transition hover:scale-105 sm:h-16 sm:w-16"
      >
        {!open && !reduce && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#7c3aed]/40 [animation-duration:2.5s]" />}
        {open ? (
          <svg width="20" height="20" viewBox="0 0 16 16" aria-hidden>
            <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <Bot className="relative h-8 w-8 sm:h-9 sm:w-9" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with the P & J assistant"
            className="fixed inset-x-3 bottom-24 z-[60] flex max-h-[min(620px,calc(100svh-120px))] flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_30px_80px_-20px_rgba(15,29,51,0.5)] ring-1 ring-black/5 sm:inset-x-auto sm:right-5 sm:w-[390px]"
            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "bottom right" }}
          >
            {/* header */}
            <div className="relative isolate flex items-center gap-3 overflow-hidden bg-[#060d18] px-4 py-3.5 text-white">
              <div aria-hidden className="absolute -right-10 -top-10 -z-10 h-32 w-32 rounded-full bg-[#7c3aed]/40 blur-2xl" />
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#7c3aed] to-cobalt">
                <Bot className="h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold">P &amp; J assistant</span>
                <span className="flex items-center gap-1.5 text-[12px] text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {offline ? "Quick answers · team replies on WhatsApp" : "AI assistant · usually replies instantly"}
                </span>
              </span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden>
                  <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* conversation */}
            <div ref={list} className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-[#f5f7fc] px-4 py-4" aria-live="polite">
              <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-[14px] leading-relaxed text-ink shadow-sm ring-1 ring-line">{greeting}</div>
              {msgs.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {assistantTopics.map((t) => (
                    <button
                      key={t.t}
                      type="button"
                      onClick={() => send(t.q, t.t)}
                      className="rounded-full border border-cobalt/25 bg-white px-3 py-1.5 text-[13px] font-medium text-cobalt transition hover:bg-cobalt hover:text-white"
                    >
                      {t.t}
                    </button>
                  ))}
                </div>
              )}
              {msgs.map((m, k) => (
                <div
                  key={k}
                  className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed ${
                    m.role === "user" ? "ml-auto rounded-tr-sm bg-gradient-to-br from-cobalt to-[#4f46e5] text-white" : "rounded-tl-sm bg-white text-ink shadow-sm ring-1 ring-line"
                  }`}
                >
                  {m.content || (
                    <span className="flex gap-1 py-1" aria-label="Typing">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate/60" style={{ animationDelay: `${d * 0.15}s` }} />
                      ))}
                    </span>
                  )}
                </div>
              ))}
              {busy && msgs[msgs.length - 1]?.role === "user" && (
                <div className="flex w-max gap-1 rounded-2xl rounded-tl-sm bg-white px-3.5 py-3 shadow-sm ring-1 ring-line" aria-label="Typing">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate/60" style={{ animationDelay: `${d * 0.15}s` }} />
                  ))}
                </div>
              )}
              {msgs.length > 0 && !busy && (
                <div className="flex flex-wrap gap-2 pt-1">
                  <Link href="/contact" onClick={() => setOpen(false)} className="rounded-full bg-ink px-3 py-1.5 text-[12.5px] font-semibold text-white">
                    Get a proposal →
                  </Link>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366]/15 px-3 py-1.5 text-[12.5px] font-semibold text-[#128c4a]">
                    WhatsApp us
                  </a>
                </div>
              )}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-line bg-white p-3"
            >
              <label htmlFor="assistant-input" className="sr-only">
                Your message
              </label>
              <input
                id="assistant-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={1500}
                autoComplete="off"
                placeholder="Type your question…"
                className="min-w-0 flex-1 rounded-full bg-[#f5f7fc] px-4 py-2.5 text-[16px] text-ink outline-none ring-1 ring-line focus:ring-cobalt/50 sm:text-[14.5px]"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cobalt text-white transition hover:bg-[#1f3ab8] disabled:opacity-40"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </form>
            <p className="bg-white px-4 pb-2.5 text-center text-[10.5px] text-slate">{offline ? "Quick answers from our website; the team confirms every detail." : "AI replies can be wrong; our team confirms every detail."}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
