import { promises as fs } from "fs";
import path from "path";
import { LOGOS } from "@/lib/clients";

const TYPES: Record<string, string> = { png: "image/png", jpg: "image/jpeg", webp: "image/webp", svg: "image/svg+xml" };

// Public: serves an uploaded client logo
export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const name = path.basename((await params).file);
  const type = TYPES[name.split(".").pop() ?? ""];
  if (!type) return new Response("Not found", { status: 404 });
  try {
    const data = await fs.readFile(path.join(LOGOS, name));
    return new Response(data, {
      headers: {
        "Content-Type": type,
        "X-Content-Type-Options": "nosniff",
        // SVGs can't run scripts when served with this policy
        "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'",
        // browsers keep logos for a week and Vercel's network serves them without re-running this route
        "Cache-Control": "public, max-age=604800, s-maxage=31536000, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
