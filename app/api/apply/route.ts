import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";
import { addApplication, getJob, isAccepting, RESUMES } from "@/lib/jobs";
import { salaryRanges } from "@/lib/salary";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

// file signatures, so a renamed file of another kind is rejected
function looksLike(ext: string, buf: Buffer) {
  if (ext === "pdf") return buf.subarray(0, 4).toString("latin1") === "%PDF";
  if (ext === "docx") return buf[0] === 0x50 && buf[1] === 0x4b; // zip
  if (ext === "doc") return buf.subarray(0, 4).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0]));
  return false;
}

const field = (form: FormData, key: string, max = 200) => String(form.get(key) ?? "").trim().slice(0, max);

/**
 * Job application handler: saves the application (and CV) for the admin panel, and emails it with the CV attached
 * through Resend (https://resend.com) when these are set in the environment:
 *   RESEND_API_KEY – Resend API key
 *   CAREERS_TO     – inbox that receives applications (with Resend's test sender this must be your Resend account email)
 *   CAREERS_FROM   – optional sender; defaults to Resend's test sender until your own domain is verified
 */
export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (form.get("website")) return NextResponse.json({ ok: true }); // honeypot filled → bot

  // "general" is a CV sent without a specific opening ("Don't see a role that fits?")
  const jobId = field(form, "jobId");
  const job = jobId === "general" ? { id: "general", title: "General application (no specific role)" } : await getJob(jobId);
  if (!job || ("open" in job && !isAccepting(job))) return NextResponse.json({ error: "This position is no longer open." }, { status: 404 });

  const name = field(form, "name", 100);
  const email = field(form, "email", 150);
  const phone = field(form, "phone", 30);
  const message = field(form, "message", 3000);
  const salary = field(form, "salary", 60);
  let link = field(form, "link", 300);
  if (!name || !email || !phone) return NextResponse.json({ error: "Add your name, email and phone number." }, { status: 400 });
  if (!salaryRanges.includes(salary)) return NextResponse.json({ error: "Choose your expected salary range." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (link && !/^https?:\/\//i.test(link)) link = `https://${link}`;
  if (link && !/^https?:\/\/[^\s]+$/i.test(link)) link = "";

  const file = form.get("resume");
  if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: "Attach your CV (PDF or Word)." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Your CV must be 5 MB or smaller." }, { status: 400 });
  const ext = ALLOWED[file.type] ?? file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!Object.values(ALLOWED).includes(ext)) return NextResponse.json({ error: "Upload your CV as a PDF, DOC or DOCX file." }, { status: 400 });
  const buf = Buffer.from(await file.arrayBuffer());
  if (!looksLike(ext, buf)) return NextResponse.json({ error: "That file doesn't look like a PDF or Word document." }, { status: 400 });

  const stored = `${randomBytes(12).toString("hex")}.${ext}`; // never trust the uploaded file name on disk
  await fs.mkdir(RESUMES, { recursive: true });
  await fs.writeFile(path.join(process.cwd(), "data", "resumes", stored), buf); // a fixed folder, so the build doesn't bundle the whole project

  const originalName = path.basename(file.name).replace(/[^\w.\- ]+/g, "_").slice(0, 120) || `cv.${ext}`;
  await addApplication({
    jobId: job.id,
    jobTitle: job.title,
    name,
    email,
    phone,
    link,
    message,
    salary,
    resume: { file: stored, name: originalName, type: file.type || "application/octet-stream" },
  });

  // email copy to the hiring inbox, with the CV attached
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CAREERS_TO;
  const from = process.env.CAREERS_FROM || "P & J Careers <onboarding@resend.dev>";
  if (key && to) {
    const rows: [string, string][] = [
      ["Role", job.title],
      ["Name", name],
      ["Email", email],
      ["Phone", phone],
      ["LinkedIn / portfolio", link || "-"],
      ["Expected salary", salary],
    ];
    const esc = (v: string) => v.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
    const cell = "padding:8px 12px;border:1px solid #e3e8f2";
    const html =
      `<div style="font-family:Arial,sans-serif;color:#0f1d33;max-width:560px">` +
      `<h2 style="margin:0 0 4px">New job application</h2><p style="margin:0 0 16px;color:#5b6b84">${esc(job.title)}</p>` +
      `<table style="border-collapse:collapse;width:100%">` +
      rows.map(([k, v]) => `<tr><td style="${cell};color:#5b6b84;width:40%">${esc(k)}</td><td style="${cell};font-weight:600">${esc(v)}</td></tr>`).join("") +
      `</table><h3 style="margin:20px 0 6px">Why this role</h3><p style="margin:0;white-space:pre-wrap">${esc(message || "(no message)")}</p>` +
      `<p style="margin:20px 0 0;color:#5b6b84;font-size:13px">CV attached: ${esc(originalName)}. Reply to this email to contact the candidate.</p></div>`;
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `Job application: ${job.title} — ${name}`,
        html,
        text: rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\n${message || "(no message)"}`,
        attachments: [{ filename: originalName, content: buf.toString("base64") }],
      }),
    }).catch(() => {}); // the application is already saved in the admin panel; the email is a copy
  }

  return NextResponse.json({ ok: true });
}
