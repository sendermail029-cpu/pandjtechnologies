import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";

/**
 * Client reviews for the Clients page, added from the admin panel.
 * Only publish reviews a client has actually written or approved, with their permission.
 * Stored as JSON in /data, like the job posts and clients.
 */

export type Review = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  service: string; // e.g. Website, Mobile app, CRM, Digital marketing
  rating: number; // 1–5
  country?: string;
  // drafts are shown only in the admin panel, until the client approves the wording
  status?: "draft" | "published";
  addedAt: string;
};

const DATA = path.join(process.cwd(), "data");
const FILE = path.join(DATA, "reviews.json");

async function write(list: Review[]) {
  await fs.mkdir(DATA, { recursive: true });
  const tmp = `${FILE}.${randomBytes(4).toString("hex")}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(list, null, 2));
  for (let attempt = 0; ; attempt++) {
    try {
      await fs.rename(tmp, FILE);
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

export async function getReviews(): Promise<Review[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Review[];
  } catch {
    return [];
  }
}

export async function addReview(input: Omit<Review, "id" | "addedAt">) {
  const list = await getReviews();
  list.unshift({ ...input, id: randomBytes(6).toString("hex"), addedAt: new Date().toISOString() });
  await write(list);
}

// reviews visitors see on the Clients page
export async function getPublishedReviews(): Promise<Review[]> {
  return (await getReviews()).filter((r) => r.status !== "draft");
}

export async function publishReview(id: string) {
  await write((await getReviews()).map((r) => (r.id === id ? { ...r, status: "published" as const } : r)));
}

export async function deleteReview(id: string) {
  await write((await getReviews()).filter((r) => r.id !== id));
}
