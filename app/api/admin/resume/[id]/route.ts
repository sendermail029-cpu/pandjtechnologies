import { promises as fs } from "fs";
import path from "path";
import { isAdmin } from "@/lib/admin-auth";
import { getApplications, RESUMES } from "@/lib/jobs";

// Admin-only CV download
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return new Response("Not found", { status: 404 });
  const { id } = await params;
  const app = (await getApplications()).find((a) => a.id === id);
  if (!app?.resume) return new Response("Not found", { status: 404 });

  try {
    const data = await fs.readFile(path.join(RESUMES, path.basename(app.resume.file)));
    return new Response(data, {
      headers: {
        "Content-Type": app.resume.type,
        "Content-Disposition": `attachment; filename="${app.resume.name.replace(/"/g, "")}"`,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
