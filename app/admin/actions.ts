"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, endSession, isAdmin, isConfigured, startSession } from "@/lib/admin-auth";
import { addClient, deleteClient, saveLogo, setClientLogo } from "@/lib/clients";
import { addReview, deleteReview, publishReview } from "@/lib/reviews";
import { addJob, addWalkIn, deleteApplication, deleteJob, deleteWalkIn, removeAlertSignup, setJobOpen } from "@/lib/jobs";

export type FormState = { error?: string; ok?: string } | undefined;

// one line per item, blank lines ignored
const lines = (v: FormDataEntryValue | null) =>
  String(v ?? "")
    .split(/\r?\n/)
    .map((l) => l.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);

const text = (v: FormDataEntryValue | null) => String(v ?? "").trim();
// comma- or line-separated list, e.g. skills
const tags = (v: FormDataEntryValue | null) =>
  String(v ?? "")
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin");
}

function refresh() {
  revalidatePath("/admin");
  revalidatePath("/careers", "layout");
}

export async function login(_: FormState, form: FormData): Promise<FormState> {
  if (!isConfigured()) return { error: "Admin password is not set on the server (ADMIN_PASSWORD)." };
  // a short pause makes password guessing slow
  await new Promise((r) => setTimeout(r, 600));
  if (!checkPassword(text(form.get("password")))) return { error: "Incorrect password." };
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin");
}

export async function createJob(_: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const job = {
    title: text(form.get("title")),
    location: text(form.get("location")),
    type: text(form.get("type")),
    experience: text(form.get("experience")),
    summary: text(form.get("summary")),
    responsibilities: lines(form.get("responsibilities")),
    requirements: lines(form.get("requirements")),
    skills: tags(form.get("skills")),
    niceToHave: tags(form.get("niceToHave")),
    qualification: text(form.get("qualification")),
    salary: text(form.get("salary")),
    openings: Math.max(1, Number(text(form.get("openings"))) || 1),
    closesAt: /^\d{4}-\d{2}-\d{2}$/.test(text(form.get("closesAt"))) ? text(form.get("closesAt")) : undefined,
    massHiring: form.get("massHiring") === "on",
  };
  if (!job.title || !job.location || !job.type || !job.summary) {
    return { error: "Add a title, location, job type and short summary." };
  }
  await addJob(job);
  refresh();
  return { ok: `"${job.title}" is now live on the careers page.` };
}

export async function toggleJob(form: FormData) {
  await requireAdmin();
  await setJobOpen(text(form.get("id")), form.get("open") === "true");
  refresh();
}

export async function removeJob(form: FormData) {
  await requireAdmin();
  await deleteJob(text(form.get("id")));
  refresh();
}

export async function removeApplication(form: FormData) {
  await requireAdmin();
  await deleteApplication(text(form.get("id")));
  refresh();
}

export async function createWalkIn(_: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const walkIn = {
    title: text(form.get("title")),
    date: text(form.get("date")),
    time: text(form.get("time")),
    venue: text(form.get("venue")),
    roles: text(form.get("roles")),
    details: text(form.get("details")),
  };
  if (!walkIn.title || !/^\d{4}-\d{2}-\d{2}$/.test(walkIn.date) || !walkIn.time || !walkIn.venue) {
    return { error: "Add a title, date, time and venue." };
  }
  await addWalkIn(walkIn);
  refresh();
  return { ok: `"${walkIn.title}" is now on the careers page.` };
}

export async function removeWalkIn(form: FormData) {
  await requireAdmin();
  await deleteWalkIn(text(form.get("id")));
  refresh();
}

export async function removeAlert(form: FormData) {
  await requireAdmin();
  await removeAlertSignup(text(form.get("email")));
  refresh();
}

// ---- clients (Clients page) ----

function refreshClients() {
  revalidatePath("/admin");
  revalidatePath("/clients");
}

export async function createClient(_: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const name = text(form.get("name")).slice(0, 80);
  const sector = text(form.get("sector")).slice(0, 60);
  if (!name || !sector) return { error: "Add the client's name and sector." };
  const logo = await saveLogo(form.get("logo") as File | null);
  if (logo.error) return { error: logo.error };
  await addClient({ name, sector, logo: logo.name });
  refreshClients();
  return { ok: `"${name}" is now on the Clients page.` };
}

export async function changeClientLogo(form: FormData) {
  await requireAdmin();
  const logo = await saveLogo(form.get("logo") as File | null);
  if (logo.name) await setClientLogo(text(form.get("id")), logo.name);
  refreshClients();
}

export async function removeClient(form: FormData) {
  await requireAdmin();
  await deleteClient(text(form.get("id")));
  refreshClients();
}

// ---- client reviews (Clients page) ----

export async function createReview(_: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const review = {
    quote: text(form.get("quote")).slice(0, 600),
    name: text(form.get("name")).slice(0, 80),
    role: text(form.get("role")).slice(0, 80),
    company: text(form.get("company")).slice(0, 80),
    service: text(form.get("service")).slice(0, 40),
    rating: Math.min(5, Math.max(1, Number(text(form.get("rating"))) || 5)),
    country: text(form.get("country")).slice(0, 40),
  };
  if (!review.quote || !review.name || !review.company) return { error: "Add the review, the person's name and their company." };
  if (form.get("consent") !== "on") return { error: "Confirm the client wrote or approved this review and agreed to it being shown." };
  await addReview(review);
  refreshClients();
  return { ok: `Review from ${review.name} is now on the Clients page.` };
}

export async function removeReview(form: FormData) {
  await requireAdmin();
  await deleteReview(text(form.get("id")));
  refreshClients();
}

export async function approveReview(form: FormData) {
  await requireAdmin();
  await publishReview(text(form.get("id")));
  refreshClients();
}
