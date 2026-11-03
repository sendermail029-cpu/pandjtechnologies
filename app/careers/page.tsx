import type { Metadata } from "next";
import { connection } from "next/server";
import { getOpenJobs, getUpcomingWalkIns } from "@/lib/jobs";
import { WalkInBanner } from "@/components/WalkInBanner";
import { JobAlerts } from "@/components/JobAlerts";
import { CareersHero } from "@/components/CareersHero";
import { JobCard } from "@/components/JobCard";
import { GeneralApply } from "@/components/GeneralApply";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build websites, apps, business software and digital campaigns with P & J Technologies in Vijayawada and Hyderabad. See open positions and apply online.",
};

// "today", "3 days ago", "2 weeks ago"
function postedAgo(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 14) return `${days} days ago`;
  if (days < 60) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

export default async function CareersPage() {
  await connection(); // job posts change from the admin panel, so read them on every request
  const [jobs, walkIns] = await Promise.all([getOpenJobs(), getUpcomingWalkIns()]);
  // mass hiring drives, announced above the job list
  const mass = jobs.filter((j) => j.massHiring);
  const massOpenings = mass.reduce((n, j) => n + (j.openings ?? 1), 0);
  const massCloses = mass.map((j) => j.closesAt).filter(Boolean).sort().at(-1);
  // CVs without a specific opening go through the on-page form
  const apply = "#send-cv";

  return (
    <>
      <CareersHero jobCount={jobs.length} apply={apply} />
      <WalkInBanner walkIns={walkIns} />

      <section id="openings" className="relative isolate scroll-mt-8 overflow-hidden bg-paper px-6 pt-16 sm:pt-20">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]">
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#14b8c4]/15 blur-3xl" />
          <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-saffron/15 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(rgb(39_71_214/0.08)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        </div>
        <div className="mx-auto max-w-7xl">
          <div data-aos="fade-up" className="mx-auto max-w-3xl text-center">
            <h2 className="text-[clamp(1.9rem,3.2vw,2.6rem)] font-semibold tracking-tight text-ink">We are hiring</h2>
            <p className="mx-auto mt-3 max-w-[56ch] text-[16.5px] leading-relaxed text-slate">
              Explore open roles at P &amp; J Technologies and apply online with your CV. Every application is reviewed by our hiring team.
            </p>
          </div>

          {mass.length > 0 && (
            <a
              href={`#job-card-${mass[0].id}`}
              data-aos="fade-up"
              className="group relative mt-10 flex flex-col gap-4 overflow-hidden rounded-3xl bg-[#060d18] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7"
            >
              <span aria-hidden className="absolute -left-16 -top-20 h-56 w-56 rounded-full bg-saffron/25 blur-3xl" />
              <span aria-hidden className="absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-cobalt/40 blur-3xl" />
              <span className="relative flex items-start gap-4">
                <span className="relative mt-1 flex h-3 w-3 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-saffron" />
                </span>
                <span>
                  <span className="block text-[12px] font-semibold uppercase tracking-[0.2em] text-saffron">Mass hiring</span>
                  <span className="mt-1 block text-[20px] font-semibold tracking-tight sm:text-[22px]">
                    {massOpenings} {massOpenings === 1 ? "position" : "positions"} open
                    {mass.length > 1 ? ` across ${mass.length} roles` : ` for ${mass[0].title}`}
                  </span>
                  {massCloses && (
                    <span className="mt-1 block text-[14px] text-white/65">
                      Apply by {new Date(massCloses + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                  )}
                </span>
              </span>
              <span className="relative inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-5 py-2.5 text-[14.5px] font-semibold text-ink transition group-hover:bg-[#e0f2fe] sm:self-center">
                View roles <span aria-hidden>↓</span>
              </span>
            </a>
          )}

          {jobs.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-line bg-paper p-10 text-center">
              <p className="text-[19px] font-semibold">No open positions right now</p>
              <p className="mt-2 text-[15.5px] text-slate">
                We hire as projects grow.{" "}
                Send your CV below and we&apos;ll keep it on file.
              </p>
            </div>
          ) : (
            <ul className="mt-10 space-y-4">
              {jobs.map((j, i) => (
                <li key={j.id} id={`job-card-${j.id}`} className="scroll-mt-8" data-aos="fade-up" data-aos-delay={Math.min(i, 3) * 80}>
                  <JobCard job={j} posted={postedAgo(j.postedAt)} />
                </li>
              ))}
            </ul>
          )}

          <GeneralApply />
        </div>
      </section>
      <JobAlerts latestRole={jobs[0]?.title} />

    </>
  );
}
