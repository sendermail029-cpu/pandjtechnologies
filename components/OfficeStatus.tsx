"use client";

import { useEffect, useState } from "react";

// Mon–Sat, 9:30 am – 7:00 pm IST (matches company.hours)
const OPEN = 9 * 60 + 30;
const CLOSE = 19 * 60;

function statusNow() {
  const now = new Date();
  const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const day = ist.getDay(); // 0 = Sunday
  const mins = ist.getHours() * 60 + ist.getMinutes();
  const time = now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" });
  if (day !== 0 && mins >= OPEN && mins < CLOSE) return { open: true, time, text: "Open now" };
  const opensToday = day !== 0 && mins < OPEN;
  const nextDay = opensToday ? "today" : day === 6 || day === 0 ? "Monday" : "tomorrow";
  return { open: false, time, text: `Opens ${nextDay} 9:30 am` };
}

export function OfficeStatus({ light = false }: { light?: boolean }) {
  const [status, setStatus] = useState<ReturnType<typeof statusNow> | null>(null);

  useEffect(() => {
    setStatus(statusNow());
    const id = setInterval(() => setStatus(statusNow()), 30_000);
    return () => clearInterval(id);
  }, []);

  if (!status) return <span className="block h-9" aria-hidden />;
  return (
    <span
      className={`inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border px-4 py-2 text-[13px] font-medium backdrop-blur ${
        light ? "border-ink/10 bg-white/70 text-ink-2 shadow-sm" : "border-white/15 bg-white/5 text-white/80"
      }`}
    >
      <span className={light ? "text-slate" : "text-white/55"}>Vijayawada</span>
      <span className={`tabular-nums ${light ? "text-ink" : "text-white"}`}>{status.time} IST</span>
      <span aria-hidden className={`h-3 w-px ${light ? "bg-ink/15" : "bg-white/20"}`} />
      <span className="inline-flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          {status.open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
          <span className={`relative inline-flex h-2 w-2 rounded-full ${status.open ? "bg-emerald-400" : "bg-sky"}`} />
        </span>
        {status.text}
      </span>
    </span>
  );
}
