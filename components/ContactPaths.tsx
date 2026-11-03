"use client";

import { company, joinList, testingPartners } from "@/lib/site";

const paths = [
  {
    tag: "Digital solutions",
    title: "Build something digital",
    text: "Websites, apps, CRM, ERP, custom software and ads — by one team.",
    points: ["Discovery call", "Fixed-price proposal", "Post-launch support"],
    cta: "Start a project",
    href: "/contact#enquiry",
    accent: "from-cobalt to-sky",
    panel: "from-[#dfe8ff] to-[#eef3ff]",
    tone: "bg-[#e6edff] text-cobalt",
    d: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
  },
  {
    tag: "Exams & testing",
    title: "Take an exam with us",
    text: `Authorized test center for ${joinList(testingPartners)} in Vijayawada.`,
    points: ["Proctored exams", "Booking help", "Exam-day guidance"],
    cta: "Test center details",
    href: "/test-center",
    accent: "from-saffron to-[#f97316]",
    panel: "from-[#ffe8cc] to-[#fff4e6]",
    tone: "bg-[#fff1dc] text-[#c2620a]",
    d: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5",
  },
  {
    tag: "Testing partnerships",
    title: "Collaborate on testing",
    text: "For schools, colleges, institutes and certification bodies.",
    points: ["Host your exams", "Partner-standard proctoring", "Long-term programmes"],
    cta: "Partner with us",
    href: `mailto:${company.email}?subject=${encodeURIComponent("Testing partnership enquiry")}`,
    accent: "from-[#14b8c4] to-[#10b981]",
    panel: "from-[#d4f4f2] to-[#ecfbfa]",
    tone: "bg-[#dff7f8] text-[#0e9aa6]",
    d: "M8 11l3 3 5-5M7 20H5a2 2 0 0 1-2-2v-3l4-4 3 3M17 20h2a2 2 0 0 0 2-2v-3l-4-4-3 3",
  },
];

// Home: three ways to reach us, as one short row of cards
export function ContactPaths() {
  return (
    <section className="bg-[#f5f7fc] px-6 py-14 sm:py-16">
      <div className="mx-auto max-w-[83rem]">
        <h2 data-aos="fade-up" className="text-center text-[clamp(1.7rem,3vw,2.4rem)] font-medium tracking-[-0.035em] text-ink">
          Whatever you need,{" "}
          <span className="bg-gradient-to-r from-cobalt via-[#3b82f6] to-sky bg-clip-text font-semibold text-transparent">let&apos;s talk.</span>
        </h2>
        <ul className="mt-8 grid gap-3 md:grid-cols-3">
          {paths.map((p, k) => (
            <li key={p.title} data-aos="fade-up" data-aos-delay={k * 80}>
              <a
                href={p.href}
                className={`group flex h-full items-center gap-4 rounded-2xl bg-gradient-to-br ${p.panel} p-4 ring-1 ring-black/[0.04] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10 sm:p-5`}
              >
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white shadow-sm ${p.tone.split(" ").pop()}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={p.d} />
                  </svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[16.5px] font-semibold tracking-tight text-ink">{p.title}</span>
                  <span className="mt-0.5 block text-[13.5px] leading-snug text-slate">{p.text}</span>
                </span>
                <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-white transition duration-300 group-hover:translate-x-1 group-hover:bg-cobalt">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
