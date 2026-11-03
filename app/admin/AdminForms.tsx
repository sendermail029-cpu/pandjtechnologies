"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { createClient, createJob, createReview, createWalkIn, login, type FormState } from "./actions";

const input =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] outline-none transition focus:border-cobalt focus:ring-4 focus:ring-cobalt/10";
const label = "mb-1.5 block text-[14px] font-semibold text-ink-2";

function Message({ state }: { state: FormState }) {
  if (!state) return null;
  return state.error ? (
    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[14px] font-medium text-red-700">{state.error}</p>
  ) : state.ok ? (
    <p role="status" className="rounded-xl bg-emerald-50 px-4 py-3 text-[14px] font-medium text-emerald-700">{state.ok}</p>
  ) : null;
}

// a submit button that asks first, for deletes
export function ConfirmButton({ message, children }: { message: string; children: ReactNode }) {
  return (
    <button
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
      className="rounded-full border border-red-200 px-3.5 py-1.5 text-[13px] font-semibold text-red-700 hover:bg-red-50"
    >
      {children}
    </button>
  );
}

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="password" className={label}>Password</label>
        <input id="password" name="password" type="password" required autoFocus autoComplete="current-password" className={input} />
      </div>
      <Message state={state} />
      <button disabled={pending} className="w-full rounded-full bg-ink px-6 py-3.5 font-semibold text-white transition hover:bg-ink-2 disabled:opacity-60">
        {pending ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}

export function JobForm() {
  const [state, action, pending] = useActionState(createJob, undefined);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state?.ok) form.current?.reset();
  }, [state]);

  return (
    <form ref={form} action={action} className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="title" className={label}>Job title *</label>
        <input id="title" name="title" required placeholder="e.g. Digital Marketing Executive" className={input} />
      </div>
      <div>
        <label htmlFor="location" className={label}>Location *</label>
        <input id="location" name="location" required placeholder="Vijayawada / Hyderabad / Remote" className={input} />
      </div>
      <div>
        <label htmlFor="type" className={label}>Job type *</label>
        <select id="type" name="type" required className={input} defaultValue="Full-time">
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Contract</option>
        </select>
      </div>
      <div>
        <label htmlFor="experience" className={label}>Experience</label>
        <input id="experience" name="experience" placeholder="e.g. 1–3 years, or Freshers welcome" className={input} />
      </div>
      <div>
        <label htmlFor="qualification" className={label}>Qualification</label>
        <input id="qualification" name="qualification" placeholder="e.g. B.Tech / MCA / Any graduate" className={input} />
      </div>
      <div>
        <label htmlFor="salary" className={label}>Salary</label>
        <input id="salary" name="salary" placeholder="e.g. ₹3–5 LPA (leave empty if not disclosed)" className={input} />
      </div>
      <div>
        <label htmlFor="openings" className={label}>Number of openings</label>
        <input id="openings" name="openings" type="number" min={1} defaultValue={1} className={input} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="closesAt" className={label}>Hiring closes on</label>
        <input id="closesAt" name="closesAt" type="date" className={input} />
        <p className="mt-1.5 text-[12.5px] text-slate">The job stops taking applications after this date. Leave empty to keep it open until you close it.</p>
      </div>
      {/* mass hiring: announced in a banner at the top of the job list */}
      <label htmlFor="massHiring" className="flex cursor-pointer items-start gap-3 rounded-2xl border border-saffron/40 bg-[#fff6ea] p-4 sm:col-span-2">
        <input id="massHiring" name="massHiring" type="checkbox" className="mt-1 h-4 w-4 accent-[#c2620a]" />
        <span>
          <span className="block text-[14.5px] font-semibold text-ink">Mass hiring drive</span>
          <span className="mt-0.5 block text-[13px] text-slate">Shows a &ldquo;Mass hiring&rdquo; announcement on the careers page with the number of openings and closing date.</span>
        </span>
      </label>
      <div className="sm:col-span-2">
        <label htmlFor="skills" className={label}>Required skills</label>
        <input id="skills" name="skills" placeholder="Comma separated, e.g. React, Next.js, Tailwind CSS" className={input} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="niceToHave" className={label}>Good to have</label>
        <input id="niceToHave" name="niceToHave" placeholder="Comma separated, e.g. TypeScript, SEO" className={input} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="summary" className={label}>Short summary *</label>
        <textarea id="summary" name="summary" required rows={3} placeholder="Two or three lines about the role" className={input} />
      </div>
      <div>
        <label htmlFor="responsibilities" className={label}>Key responsibilities</label>
        <textarea id="responsibilities" name="responsibilities" rows={5} placeholder={"One per line"} className={input} />
      </div>
      <div>
        <label htmlFor="requirements" className={label}>Requirements / eligibility</label>
        <textarea id="requirements" name="requirements" rows={5} placeholder={"One per line"} className={input} />
      </div>
      <div className="space-y-3 sm:col-span-2">
        <Message state={state} />
        <button disabled={pending} className="rounded-full bg-cobalt px-7 py-3.5 font-semibold text-white transition hover:bg-cobalt-dark disabled:opacity-60">
          {pending ? "Posting…" : "Post job"}
        </button>
      </div>
    </form>
  );
}

export function WalkInForm({ venues }: { venues: string[] }) {
  const [state, action, pending] = useActionState(createWalkIn, undefined);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state?.ok) form.current?.reset();
  }, [state]);

  return (
    <form ref={form} action={action} className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="w-title" className={label}>Headline *</label>
        <input id="w-title" name="title" required placeholder="e.g. Walk-in drive for web developers & interns" className={input} />
      </div>
      <div>
        <label htmlFor="w-date" className={label}>Date *</label>
        <input id="w-date" name="date" type="date" required className={input} />
      </div>
      <div>
        <label htmlFor="w-time" className={label}>Time *</label>
        <input id="w-time" name="time" required placeholder="e.g. 10:00 am – 4:00 pm" className={input} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="w-venue" className={label}>Venue *</label>
        <input id="w-venue" name="venue" required list="w-venues" placeholder="Office address" className={input} />
        <datalist id="w-venues">
          {venues.map((v) => (
            <option key={v} value={v} />
          ))}
        </datalist>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="w-roles" className={label}>Roles</label>
        <input id="w-roles" name="roles" placeholder="e.g. Web developer, Digital marketing executive, Interns" className={input} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="w-details" className={label}>Details</label>
        <textarea id="w-details" name="details" rows={3} placeholder="What to bring, eligibility, contact person…" className={input} />
      </div>
      <div className="space-y-3 sm:col-span-2">
        <Message state={state} />
        <button disabled={pending} className="rounded-full bg-cobalt px-7 py-3.5 font-semibold text-white transition hover:bg-cobalt-dark disabled:opacity-60">
          {pending ? "Posting…" : "Post walk-in"}
        </button>
      </div>
    </form>
  );
}

export function ClientForm() {
  const [state, action, pending] = useActionState(createClient, undefined);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state?.ok) form.current?.reset();
  }, [state]);

  return (
    <form ref={form} action={action} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="client-name" className={label}>Client name *</label>
        <input id="client-name" name="name" required placeholder="e.g. Airpay" className={input} />
      </div>
      <div>
        <label htmlFor="client-sector" className={label}>Sector *</label>
        <input id="client-sector" name="sector" required placeholder="e.g. Fintech · Payments" className={input} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="client-logo" className={label}>Logo</label>
        <input id="client-logo" name="logo" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className={`${input} file:mr-3 file:rounded-full file:border-0 file:bg-[#eef3ff] file:px-4 file:py-1.5 file:text-[13px] file:font-semibold file:text-cobalt`} />
        <p className="mt-1.5 text-[12.5px] text-slate">PNG, JPG, WebP or SVG, up to 1 MB. A wide logo on a transparent background looks best. Without a logo, the card shows the client&apos;s initials.</p>
      </div>
      <div className="space-y-3 sm:col-span-2">
        <Message state={state} />
        <button disabled={pending} className="rounded-full bg-cobalt px-7 py-3.5 font-semibold text-white transition hover:bg-cobalt-dark disabled:opacity-60">
          {pending ? "Adding…" : "Add client"}
        </button>
      </div>
    </form>
  );
}

export function ReviewForm({ companies }: { companies: string[] }) {
  const [state, action, pending] = useActionState(createReview, undefined);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state?.ok) form.current?.reset();
  }, [state]);

  return (
    <form ref={form} action={action} className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="review-quote" className={label}>Review *</label>
        <textarea id="review-quote" name="quote" required rows={4} placeholder="Paste the client's words exactly as they wrote or approved them" className={input} />
      </div>
      <div>
        <label htmlFor="review-name" className={label}>Name *</label>
        <input id="review-name" name="name" required placeholder="e.g. Ravi Kumar" className={input} />
      </div>
      <div>
        <label htmlFor="review-role" className={label}>Role</label>
        <input id="review-role" name="role" placeholder="e.g. Founder" className={input} />
      </div>
      <div>
        <label htmlFor="review-company" className={label}>Company *</label>
        <input id="review-company" name="company" required list="review-companies" placeholder="e.g. Sowers Ministry" className={input} />
        <datalist id="review-companies">
          {companies.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>
      <div>
        <label htmlFor="review-service" className={label}>Service</label>
        <select id="review-service" name="service" className={input} defaultValue="Website">
          <option>Website</option>
          <option>Mobile app</option>
          <option>CRM</option>
          <option>ERP</option>
          <option>Custom software</option>
          <option>Digital marketing</option>
          <option>Test center</option>
        </select>
      </div>
      <div>
        <label htmlFor="review-country" className={label}>Country</label>
        <select id="review-country" name="country" className={input} defaultValue="India">
          <option>India</option>
          <option>United States</option>
          <option>United Kingdom</option>
          <option>Singapore</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="review-rating" className={label}>Rating</label>
        <select id="review-rating" name="rating" className={input} defaultValue="5">
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {"★".repeat(n)} ({n})
            </option>
          ))}
        </select>
      </div>
      <label className="flex items-start gap-3 rounded-2xl border border-line bg-paper p-4 sm:col-span-2">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-[#2747d6]" />
        <span className="text-[13.5px] leading-relaxed text-ink-2">
          This client wrote or approved this review, and agreed to it being shown on our website with their name.
        </span>
      </label>
      <div className="space-y-3 sm:col-span-2">
        <Message state={state} />
        <button disabled={pending} className="rounded-full bg-cobalt px-7 py-3.5 font-semibold text-white transition hover:bg-cobalt-dark disabled:opacity-60">
          {pending ? "Adding…" : "Add review"}
        </button>
      </div>
    </form>
  );
}
