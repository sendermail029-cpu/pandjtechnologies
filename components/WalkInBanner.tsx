import type { WalkIn } from "@/lib/jobs";

const icon = {
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",
  pin: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
};

function Icon({ d }: { d: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

// Walk-in drive announcements, posted from the admin panel; shown below the careers hero until the day ends
export function WalkInBanner({ walkIns }: { walkIns: WalkIn[] }) {
  if (walkIns.length === 0) return null;
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

  return (
    <section aria-labelledby="walkins-title" className="bg-paper px-6 pt-10">
      <div className="mx-auto max-w-[83rem]">
        <h2 id="walkins-title" className="sr-only">
          Walk-in drives
        </h2>
        <ul className="space-y-4">
          {walkIns.map((w) => {
            const date = new Date(w.date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
            const isToday = w.date === today;
            return (
              <li
                key={w.id}
                data-aos="fade-up"
                className="relative isolate overflow-hidden rounded-3xl bg-[#060d18] p-6 text-white shadow-xl shadow-ink/20 sm:p-8"
              >
                <div aria-hidden className="absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-cobalt/45 blur-3xl" />
                <div aria-hidden className="absolute -bottom-24 left-1/3 -z-10 h-56 w-56 rounded-full bg-sky/20 blur-3xl" />

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <p className="inline-flex items-center gap-2 rounded-full bg-saffron px-3 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-ink">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/60 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
                      </span>
                      {isToday ? "Walk-in today" : "Walk-in drive"}
                    </p>
                    <h3 className="mt-4 text-[clamp(1.35rem,2.4vw,1.9rem)] font-semibold leading-tight tracking-tight">{w.title}</h3>
                    {w.roles && <p className="mt-2 text-[15.5px] text-white/75">Roles: {w.roles}</p>}
                    {w.details && <p className="mt-2 max-w-[70ch] whitespace-pre-line text-[14.5px] leading-relaxed text-white/60">{w.details}</p>}
                  </div>

                  <dl className="grid shrink-0 gap-2.5 sm:grid-cols-3 lg:w-[460px] lg:grid-cols-1">
                    {[
                      { k: "Date", v: date, d: icon.calendar },
                      { k: "Time", v: w.time, d: icon.clock },
                      { k: "Venue", v: w.venue, d: icon.pin },
                    ].map((f) => (
                      <div key={f.k} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
                        <span className="mt-0.5 text-sky">
                          <Icon d={f.d} />
                        </span>
                        <div className="min-w-0">
                          <dt className="text-[12px] text-white/55">{f.k}</dt>
                          <dd className="text-[14.5px] font-medium">{f.v}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
