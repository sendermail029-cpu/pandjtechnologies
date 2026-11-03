import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplyDialog } from "@/components/ApplyDialog";
import { getJob } from "@/lib/jobs";
import { RibbonBackdrop } from "@/components/HeroKit";
import { accents } from "@/lib/accents";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) return {};
  return { title: `${job.title} — Careers`, description: job.summary };
}

// pre-built, refreshed every 5 minutes (so closing dates take effect) and right after an admin change
export const revalidate = 300;

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) notFound();

  const posted = new Date(job.postedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const facts = [
    { k: "Location", v: job.location, d: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" },
    { k: "Job type", v: job.type, d: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2" },
    { k: "Experience", v: job.experience, d: "M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" },
    { k: "Posted", v: posted, d: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" },
  ].filter((f) => f.v);

  const Icon = ({ d }: { d: string }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );

  const List = ({ title, items, tone, check }: { title: string; items: string[]; tone: string; check?: boolean }) =>
    items.length > 0 ? (
      <div data-aos="fade-up" className="rounded-3xl border border-line bg-white p-7 sm:p-8">
        <h2 className="flex items-center gap-3 text-[21px] font-semibold tracking-tight">
          <span aria-hidden className={`h-6 w-1.5 rounded-full bg-gradient-to-b ${tone}`} />
          {title}
        </h2>
        <ol className="mt-5 space-y-3.5">
          {items.map((r, i) => (
            <li key={r} className="flex gap-4 text-[16px] leading-relaxed text-slate">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#e6edff] text-[12.5px] font-semibold text-cobalt">
                {check ? (
                  <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden>
                    <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span className="pt-0.5">{r}</span>
            </li>
          ))}
        </ol>
      </div>
    ) : null;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#f7f8ff] px-6 pb-12 pt-10 sm:pb-16 sm:pt-14">
        <RibbonBackdrop />
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" data-aos="fade-up" className="flex items-center gap-2 text-[14px] text-slate">
              <Link href="/careers" className="inline-flex items-center gap-1.5 rounded-full border border-white bg-white/80 px-3.5 py-1.5 font-medium text-ink-2 shadow-sm backdrop-blur hover:text-cobalt">
                <span aria-hidden>←</span> All careers
              </Link>
              <span aria-hidden>/</span>
              <span>Open position</span>
            </nav>
            <h1 data-aos="fade-up" data-aos-delay="100" className="mt-6 max-w-[20ch] text-[clamp(2.1rem,4.2vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
              {job.title}
            </h1>
            <p data-aos="fade-up" data-aos-delay="200" className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-slate">{job.summary}</p>
            {!job.open && (
              <p className="mt-6 inline-flex rounded-full bg-ink px-4 py-2 text-[13.5px] font-medium text-white">Applications closed</p>
            )}
            {job.open && (
              <div data-aos="fade-up" data-aos-delay="300" className="mt-8">
                <ApplyDialog jobId={job.id} jobTitle={job.title} className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-footer-from to-footer-to px-8 text-[15.5px] font-semibold text-white shadow-xl shadow-ink/25 transition hover:-translate-y-0.5 hover:brightness-125 sm:w-auto" />
              </div>
            )}
          </div>

          {/* at a glance */}
          <div data-aos="fade-left" data-aos-delay="200" className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-6 shadow-2xl shadow-ink/10 backdrop-blur-md">
            <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-cobalt via-[#8b5cf6] to-saffron" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate">At a glance</p>
            <dl className="mt-4 divide-y divide-line">
              {facts.map((f, i) => (
                <div key={f.k} className="flex items-center gap-3.5 py-3">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${accents[i].tag}`}>
                    <Icon d={f.d} />
                  </span>
                  <div>
                    <dt className="text-[12.5px] text-slate">{f.k}</dt>
                    <dd className="text-[15px] font-semibold text-ink">{f.v}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-paper px-6 pb-24 pt-6 sm:pt-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <List title="What you&apos;ll do" items={job.responsibilities} tone="from-cobalt to-sky" />
            <List title="What we&apos;re looking for" items={job.requirements} tone="from-saffron to-[#f97316]" check />
          </div>

          <div data-aos="fade-up" className="relative mt-8 flex flex-col gap-5 overflow-hidden rounded-3xl bg-[#060d18] p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cobalt/40 blur-3xl" />
            <div className="relative">
              <p className="text-[22px] font-semibold tracking-tight">{job.open ? "Ready to apply?" : "Applications closed"}</p>
              <p className="mt-1.5 text-[15px] text-white/65">
                {job.open ? "It takes about two minutes. We read every application." : "This position is no longer accepting applications."}
              </p>
            </div>
            {job.open ? (
              <ApplyDialog
                jobId={job.id}
                jobTitle={job.title}
                className="relative inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-white px-8 text-[15.5px] font-semibold text-ink shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:bg-[#e0f2fe]"
              />
            ) : (
              <Link href="/careers#openings" className="relative inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-[15.5px] font-semibold text-ink">
                See current openings
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
