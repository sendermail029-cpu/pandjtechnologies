import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";

/** Newsletter subscribers from the footer form, stored as JSON in /data and listed in the admin panel. */

export type Subscriber = { email: string; createdAt: string };

const DATA = path.join(process.cwd(), "data");
const FILE = path.join(DATA, "newsletter.json");

export async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const list = JSON.parse(await fs.readFile(FILE, "utf8")) as Subscriber[];
    return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

async function write(list: Subscriber[]) {
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

// returns false when the email is already subscribed
export async function addSubscriber(email: string) {
  const list = await getSubscribers();
  if (list.some((s) => s.email.toLowerCase() === email.toLowerCase())) return false;
  await write([...list, { email, createdAt: new Date().toISOString() }]);
  return true;
}

export async function removeSubscriber(email: string) {
  await write((await getSubscribers()).filter((s) => s.email !== email));
}
