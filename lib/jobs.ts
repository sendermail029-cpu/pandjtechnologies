import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";

/**
 * Job posts and applications, stored as JSON files in /data (git-ignored).
 * This works on a normal Node server (VPS, Render, Railway, `next start`).
 * Serverless hosts such as Vercel have a read-only, short-lived filesystem — move these
 * functions to a database there; nothing else in the app needs to change.
 */

export type Job = {
  id: string;
  title: string;
  location: string;
  type: string; // Full-time, Internship, ...
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  skills?: string[]; // required skills, shown as tags
  niceToHave?: string[]; // good-to-have skills
  qualification?: string; // e.g. B.Tech / MCA / any graduate
  salary?: string; // e.g. ₹3–5 LPA; left out means not disclosed
  openings?: number;
  closesAt?: string; // last date to apply, YYYY-MM-DD (India time); after it the job stops taking applications
  massHiring?: boolean; // announced on the careers page as a mass hiring drive
  open: boolean;
  postedAt: string; // ISO date
};

export type Application = {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  link: string; // LinkedIn / portfolio
  salary?: string; // expected salary range (older applications may not have it)
  message: string;
  resume: { file: string; name: string; type: string } | null;
  createdAt: string;
};

const DATA = path.join(process.cwd(), "data");
const JOBS = path.join(DATA, "jobs.json");
const APPS = path.join(DATA, "applications.json");
export const RESUMES = path.join(DATA, "resumes");

const sampleJob: Job = {
  id: "web-developer-react-nextjs",
  title: "Web Developer (React / Next.js)",
  location: "Vijayawada (on-site)",
  type: "Full-time",
  experience: "0–2 years",
  summary:
    "Build fast, search-ready business websites and web apps for our clients, working alongside our design and marketing team.",
  responsibilities: [
    "Build responsive pages and features with React, Next.js and Tailwind CSS",
    "Connect forms, CMS content and third-party APIs",
    "Fix bugs and improve page speed on live client sites",
    "Take part in weekly reviews with senior developers",
  ],
  skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Git"],
  niceToHave: ["TypeScript", "REST APIs", "Basic SEO"],
  qualification: "B.Tech / B.Sc / MCA or equivalent",
  openings: 1,
  requirements: [
    "Good working knowledge of HTML, CSS and JavaScript",
    "Hands-on experience with React (projects or internships count)",
    "Comfortable with Git and reading documentation",
    "Clear written and spoken communication",
  ],
  open: true,
  postedAt: new Date().toISOString(),
};

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, data: unknown) {
  await fs.mkdir(DATA, { recursive: true });
  const tmp = `${file}.${randomBytes(4).toString("hex")}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2));
  // atomic replace, so a crash never leaves half a file; Windows briefly locks a file that's being read, so retry
  for (let attempt = 0; ; attempt++) {
    try {
      await fs.rename(tmp, file);
      return;
    } catch (err) {
      if (attempt >= 5) {
        await fs.rm(tmp, { force: true });
        throw err;
      }
      await new Promise((r) => setTimeout(r, 40 * (attempt + 1)));
    }
  }
}

export async function getJobs(): Promise<Job[]> {
  try {
    // first run: start with one example post ("wx" = only if the file doesn't exist yet, safe if pages race)
    await fs.mkdir(DATA, { recursive: true });
    await fs.writeFile(JOBS, JSON.stringify([sampleJob], null, 2), { flag: "wx" });
  } catch {
    // already there
  }
  const jobs = await readJson<Job[]>(JOBS, []);
  return jobs.sort((a, b) => b.postedAt.localeCompare(a.postedAt));
}

// today in India, as YYYY-MM-DD
export const todayIST = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

// open, and its closing date (if any) has not passed
export const isAccepting = (j: Job, today = todayIST()) => j.open && (!j.closesAt || j.closesAt >= today);

export async function getOpenJobs() {
  const today = todayIST();
  return (await getJobs()).filter((j) => isAccepting(j, today));
}

export async function getJob(id: string) {
  return (await getJobs()).find((j) => j.id === id) ?? null;
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "job";

export async function addJob(input: Omit<Job, "id" | "postedAt" | "open">) {
  const jobs = await getJobs();
  const job: Job = { ...input, id: `${slugify(input.title)}-${randomBytes(2).toString("hex")}`, open: true, postedAt: new Date().toISOString() };
  await writeJson(JOBS, [job, ...jobs]);
  return job;
}

export async function setJobOpen(id: string, open: boolean) {
  const jobs = await getJobs();
  await writeJson(JOBS, jobs.map((j) => (j.id === id ? { ...j, open } : j)));
}

export async function deleteJob(id: string) {
  const jobs = await getJobs();
  await writeJson(JOBS, jobs.filter((j) => j.id !== id));
}

export async function getApplications(): Promise<Application[]> {
  const apps = await readJson<Application[]>(APPS, []);
  return apps.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addApplication(input: Omit<Application, "id" | "createdAt">) {
  const apps = await readJson<Application[]>(APPS, []);
  const app: Application = { ...input, id: randomBytes(8).toString("hex"), createdAt: new Date().toISOString() };
  await writeJson(APPS, [app, ...apps]);
  return app;
}

export async function deleteApplication(id: string) {
  const apps = await readJson<Application[]>(APPS, []);
  const app = apps.find((a) => a.id === id);
  if (app?.resume) await fs.rm(path.join(RESUMES, app.resume.file), { force: true });
  await writeJson(APPS, apps.filter((a) => a.id !== id));
}

// ---- walk-in drives -------------------------------------------------------------------------------------------

export type WalkIn = {
  id: string;
  title: string; // e.g. "Walk-in drive: Web developers & interns"
  date: string; // YYYY-MM-DD (shown until the end of this day)
  time: string; // e.g. "10:00 am – 4:00 pm"
  venue: string;
  roles: string;
  details: string;
  postedAt: string;
};

const WALKINS = path.join(DATA, "walkins.json");

export async function getWalkIns(): Promise<WalkIn[]> {
  const list = await readJson<WalkIn[]>(WALKINS, []);
  return list.sort((a, b) => a.date.localeCompare(b.date));
}

// today's and future walk-ins, judged in India time
export async function getUpcomingWalkIns() {
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); // YYYY-MM-DD
  return (await getWalkIns()).filter((w) => w.date >= today);
}

export async function addWalkIn(input: Omit<WalkIn, "id" | "postedAt">) {
  const list = await readJson<WalkIn[]>(WALKINS, []);
  const item: WalkIn = { ...input, id: randomBytes(6).toString("hex"), postedAt: new Date().toISOString() };
  await writeJson(WALKINS, [...list, item]);
  return item;
}

export async function deleteWalkIn(id: string) {
  const list = await readJson<WalkIn[]>(WALKINS, []);
  await writeJson(WALKINS, list.filter((w) => w.id !== id));
}

// ---- job alert sign-ups -------------------------------------------------------------------------------------

export type AlertSignup = { email: string; createdAt: string };
const ALERTS = path.join(DATA, "job-alerts.json");

export async function getAlertSignups(): Promise<AlertSignup[]> {
  const list = await readJson<AlertSignup[]>(ALERTS, []);
  return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// returns false when the email was already signed up
export async function addAlertSignup(email: string) {
  const list = await readJson<AlertSignup[]>(ALERTS, []);
  if (list.some((s) => s.email.toLowerCase() === email.toLowerCase())) return false;
  await writeJson(ALERTS, [...list, { email, createdAt: new Date().toISOString() }]);
  return true;
}

export async function removeAlertSignup(email: string) {
  const list = await readJson<AlertSignup[]>(ALERTS, []);
  await writeJson(ALERTS, list.filter((s) => s.email !== email));
}
