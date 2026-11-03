import type { Metadata } from "next";
import Link from "next/link";
import { isAdmin, isConfigured } from "@/lib/admin-auth";
import { getAlertSignups, getApplications, getJobs, getWalkIns, isAccepting } from "@/lib/jobs";
import { company } from "@/lib/site";
import { getClients } from "@/lib/clients";
import { getReviews } from "@/lib/reviews";
import { changeClientLogo, logout, removeAlert, removeApplication, approveReview, removeClient, removeJob, removeReview, removeWalkIn, toggleJob } from "./actions";
import { ClientForm, ConfirmButton, JobForm, LoginForm, ReviewForm, WalkInForm } from "./AdminForms";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const date = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return (
      <section className="grid min-h-[70vh] place-items-center bg-[#e6edff] px-6 py-20">
        <div className="w-full max-w-sm rounded-3xl border border-white/70 bg-white/80 p-8 shadow-2xl shadow-ink/10 backdrop-blur">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-slate">P &amp; J Technologies</p>
          <h1 className="mt-2 text-[28px] font-semibold tracking-tight">Admin sign in</h1>
          <p className="mt-2 text-[15px] text-slate">Manage job posts and applications.</p>
          <div className="mt-7">
            {isConfigured() ? (
              <LoginForm />
            ) : (
              <p className="rounded-xl bg-amber-50 px-4 py-3 text-[14px] text-amber-800">
                Set <code>ADMIN_PASSWORD</code> in the server environment to enable the admin panel.
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  const [jobs, applications, walkIns, alerts, clientList, reviewList] = await Promise.all([getJobs(), getApplications(), getWalkIns(), getAlertSignups(), getClients(), getReviews()]);
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  const venues = company.offices.map((o) => [...o.lines].join(", "));
  const openCount = jobs.filter((j) => isAccepting(j, today)).length;
  const massCount = jobs.filter((j) => j.massHiring && isAccepting(j, today)).length;

  return (
    <section className="bg-paper px-6 pb-24 pt-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-slate">Admin</p>
            <h1 className="mt-1 text-[34px] font-semibold tracking-tight">Careers dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/careers" target="_blank" className="rounded-full border border-line bg-white px-5 py-2.5 text-[14px] font-semibold hover:border-ink">
              View careers page ↗
            </Link>
            <form action={logout}>
              <button className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-ink-2">Sign out</button>
            </form>
          </div>
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Open positions", v: openCount },
            { k: "Closed positions", v: jobs.length - openCount },
            { k: "Applications", v: applications.length },
            { k: "Mass hiring drives", v: massCount },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl border border-line bg-white p-6">
              <dt className="text-[14px] text-slate">{s.k}</dt>
              <dd className="mt-1 text-[32px] font-semibold tracking-tight">{s.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-line bg-white p-7">
            <h2 className="text-[22px] font-semibold tracking-tight">Post a new job</h2>
            <p className="mt-1 text-[14.5px] text-slate">It appears on the careers page as soon as you post it.</p>
            <div className="mt-6">
              <JobForm />
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-white p-7">
            <h2 className="text-[22px] font-semibold tracking-tight">Job posts</h2>
            {jobs.length === 0 && <p className="mt-4 text-[15px] text-slate">No jobs yet.</p>}
            <ul className="mt-4 divide-y divide-line">
              {jobs.map((j) => {
                const expired = j.open && !!j.closesAt && j.closesAt < today;
                const live = isAccepting(j, today);
                const count = applications.filter((a) => a.jobId === j.id).length;
                return (
                  <li key={j.id} className="py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link href={`/careers/${j.id}`} target="_blank" className="text-[16px] font-semibold hover:text-cobalt">
                          {j.title}
                        </Link>
                        <p className="mt-0.5 text-[13.5px] text-slate">
                          {j.location} · {j.type} · posted {date(j.postedAt)}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5 text-[12px] font-semibold">
                          {j.massHiring && <span className="rounded-full bg-[#fff1dc] px-2.5 py-1 text-[#c2620a]">Mass hiring</span>}
                          <span className="rounded-full bg-[#eef3ff] px-2.5 py-1 text-cobalt">
                            {j.openings ?? 1} {(j.openings ?? 1) === 1 ? "opening" : "openings"}
                          </span>
                          <span className="rounded-full bg-mist px-2.5 py-1 text-ink-2">
                            {j.closesAt ? `Closes ${date(j.closesAt + "T00:00:00")}` : "No closing date"}
                          </span>
                          <span className="rounded-full bg-mist px-2.5 py-1 text-ink-2">
                            {count} {count === 1 ? "application" : "applications"}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                          live ? "bg-emerald-50 text-emerald-700" : expired ? "bg-red-50 text-red-700" : "bg-mist text-slate"
                        }`}
                      >
                        {live ? "Open" : expired ? "Date passed" : "Closed"}
                      </span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <form action={toggleJob}>
                        <input type="hidden" name="id" value={j.id} />
                        <input type="hidden" name="open" value={String(!j.open)} />
                        <button className="rounded-full border border-line px-3.5 py-1.5 text-[13px] font-semibold hover:border-ink">
                          {j.open ? "Close job" : "Reopen"}
                        </button>
                      </form>
                      <form action={removeJob}>
                        <input type="hidden" name="id" value={j.id} />
                        <ConfirmButton message={`Delete "${j.title}"? This can't be undone.`}>Delete</ConfirmButton>
                      </form>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-line bg-white p-7">
            <h2 className="text-[22px] font-semibold tracking-tight">Post a walk-in</h2>
            <p className="mt-1 text-[14.5px] text-slate">Shows as an announcement below the careers hero until the end of that day.</p>
            <div className="mt-6">
              <WalkInForm venues={venues} />
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-white p-7">
            <h2 className="text-[22px] font-semibold tracking-tight">Walk-ins</h2>
            {walkIns.length === 0 && <p className="mt-4 text-[15px] text-slate">No walk-ins posted.</p>}
            <ul className="mt-4 divide-y divide-line">
              {walkIns.map((w) => {
                const past = w.date < today;
                return (
                  <li key={w.id} className="flex items-start justify-between gap-3 py-4">
                    <div>
                      <p className="text-[16px] font-semibold">{w.title}</p>
                      <p className="mt-0.5 text-[13.5px] text-slate">
                        {new Date(w.date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })} · {w.time}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${past ? "bg-mist text-slate" : "bg-emerald-50 text-emerald-700"}`}>
                        {past ? "Ended" : "Live"}
                      </span>
                      <form action={removeWalkIn}>
                        <input type="hidden" name="id" value={w.id} />
                        <ConfirmButton message={`Delete "${w.title}"?`}>Delete</ConfirmButton>
                      </form>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-white p-7">
          <h2 className="text-[22px] font-semibold tracking-tight">Applications</h2>
          {applications.length === 0 ? (
            <p className="mt-4 text-[15px] text-slate">No applications yet.</p>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-[14.5px]">
                <thead className="border-b border-line text-[13px] text-slate">
                  <tr>
                    <th className="py-3 pr-4 font-medium">Candidate</th>
                    <th className="py-3 pr-4 font-medium">Role</th>
                    <th className="py-3 pr-4 font-medium">Expected salary</th>
                    <th className="py-3 pr-4 font-medium">Message</th>
                    <th className="py-3 pr-4 font-medium">Received</th>
                    <th className="py-3 font-medium" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-line align-top">
                  {applications.map((a) => (
                    <tr key={a.id}>
                      <td className="py-4 pr-4">
                        <p className="font-semibold">{a.name}</p>
                        <a href={`mailto:${a.email}`} className="block text-cobalt hover:underline">{a.email}</a>
                        <a href={`tel:${a.phone}`} className="block text-slate">{a.phone}</a>
                        {a.link && (
                          <a href={a.link} target="_blank" rel="noopener noreferrer nofollow" className="block truncate text-cobalt hover:underline">
                            Profile ↗
                          </a>
                        )}
                      </td>
                      <td className="py-4 pr-4">{a.jobTitle}</td>
                      <td className="whitespace-nowrap py-4 pr-4 font-medium">{a.salary || "—"}</td>
                      <td className="max-w-[320px] whitespace-pre-line py-4 pr-4 text-slate">{a.message || "—"}</td>
                      <td className="whitespace-nowrap py-4 pr-4 text-slate">{date(a.createdAt)}</td>
                      <td className="py-4">
                        <div className="flex flex-col items-start gap-2">
                          {a.resume && (
                            <a
                              href={`/api/admin/resume/${a.id}`}
                              className="whitespace-nowrap rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-semibold text-white hover:bg-ink-2"
                            >
                              Download CV
                            </a>
                          )}
                          <form action={removeApplication}>
                            <input type="hidden" name="id" value={a.id} />
                            <ConfirmButton message={`Delete ${a.name}'s application and CV?`}>Delete</ConfirmButton>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* clients shown on the Clients page */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-line bg-white p-7">
            <h2 className="text-[22px] font-semibold tracking-tight">Add a client</h2>
            <p className="mt-1 text-[14.5px] text-slate">Appears on the Clients page straight away.</p>
            <div className="mt-6">
              <ClientForm />
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-white p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[22px] font-semibold tracking-tight">Clients ({clientList.length})</h2>
              <Link href="/clients" target="_blank" className="text-[14px] font-semibold text-cobalt hover:underline">
                View Clients page ↗
              </Link>
            </div>
            {clientList.length === 0 && <p className="mt-4 text-[15px] text-slate">No clients yet.</p>}
            <ul className="mt-4 divide-y divide-line">
              {clientList.map((c) => (
                <li key={c.id} className="flex flex-wrap items-center gap-4 py-4">
                  <span className="grid h-14 w-24 shrink-0 place-items-center rounded-xl border border-line bg-paper p-2">
                    {c.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/api/client-logo/${c.logo}`} alt="" className="max-h-full max-w-full object-contain" />
                    ) : (
                      <span className="text-[12px] text-slate">No logo</span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[16px] font-semibold">{c.name}</span>
                    <span className="block text-[13.5px] text-slate">{c.sector}</span>
                  </span>
                  <span className="flex flex-wrap items-center gap-2">
                    <form action={changeClientLogo} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={c.id} />
                      <label className="cursor-pointer rounded-full border border-line px-3.5 py-1.5 text-[13px] font-semibold hover:border-ink">
                        {c.logo ? "Change logo" : "Add logo"}
                        <input
                          type="file"
                          name="logo"
                          accept="image/png,image/jpeg,image/webp,image/svg+xml"
                          className="sr-only"
                        />
                      </label>
                      <button className="rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-semibold text-white hover:bg-ink-2">Save</button>
                    </form>
                    <form action={removeClient}>
                      <input type="hidden" name="id" value={c.id} />
                      <ConfirmButton message={`Remove "${c.name}" from the Clients page?`}>Delete</ConfirmButton>
                    </form>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* client reviews shown on the Clients page */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-line bg-white p-7">
            <h2 className="text-[22px] font-semibold tracking-tight">Add a client review</h2>
            <p className="mt-1 text-[14.5px] text-slate">Only reviews a client wrote or approved, with their permission to show it.</p>
            <div className="mt-6">
              <ReviewForm companies={clientList.map((c) => c.name)} />
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-white p-7">
            <h2 className="text-[22px] font-semibold tracking-tight">Reviews ({reviewList.length})</h2>
            {reviewList.length === 0 && <p className="mt-4 text-[15px] text-slate">No reviews yet. The Clients page invites clients to share one.</p>}
            <ul className="mt-4 divide-y divide-line">
              {reviewList.map((r) => (
                <li key={r.id} className="py-4">
                  {r.status === "draft" ? (
                    <span className="mb-2 inline-flex rounded-full bg-[#fff1dc] px-2.5 py-1 text-[12px] font-semibold text-[#c2620a]">
                      Draft: not on the website until the client approves
                    </span>
                  ) : (
                    <span className="mb-2 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-semibold text-emerald-700">Live on the Clients page</span>
                  )}
                  <p className="text-[14.5px] leading-relaxed text-ink-2">&ldquo;{r.quote}&rdquo;</p>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[13.5px] text-slate">
                      <b className="font-semibold text-ink">{r.name}</b>
                      {r.role ? `, ${r.role}` : ""} · {r.company} · {r.service} · {"★".repeat(r.rating)}
                    </span>
                    <span className="flex gap-2">
                      {r.status === "draft" && (
                        <form action={approveReview}>
                          <input type="hidden" name="id" value={r.id} />
                          <ConfirmButton message={`Has ${r.name} approved this exact wording and agreed to it being shown with their name? Edit nothing after publishing without asking them again.`}>
                            Publish (client approved)
                          </ConfirmButton>
                        </form>
                      )}
                      <form action={removeReview}>
                        <input type="hidden" name="id" value={r.id} />
                        <ConfirmButton message={`Remove the review from ${r.name}?`}>Delete</ConfirmButton>
                      </form>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-white p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[22px] font-semibold tracking-tight">Job alert subscribers ({alerts.length})</h2>
            {alerts.length > 0 && (
              <a
                href={`mailto:?bcc=${alerts.map((a) => a.email).join(",")}&subject=${encodeURIComponent("New role at P & J Technologies")}`}
                className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-ink-2"
              >
                Email all (BCC)
              </a>
            )}
          </div>
          {alerts.length === 0 ? (
            <p className="mt-4 text-[15px] text-slate">No sign-ups yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {alerts.map((a) => (
                <li key={a.email} className="flex items-center justify-between gap-3 py-3">
                  <span>
                    <a href={`mailto:${a.email}`} className="font-medium text-cobalt hover:underline">{a.email}</a>
                    <span className="ml-3 text-[13px] text-slate">{date(a.createdAt)}</span>
                  </span>
                  <form action={removeAlert}>
                    <input type="hidden" name="email" value={a.email} />
                    <ConfirmButton message={`Remove ${a.email}?`}>Remove</ConfirmButton>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
