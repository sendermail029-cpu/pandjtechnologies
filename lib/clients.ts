import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";
import sharp from "sharp";
import { clients as seed } from "@/lib/site";

/**
 * Client list for the Clients page, managed from the admin panel.
 * Stored like the job posts: a JSON file in /data, with uploaded logos in /data/client-logos
 * (served by /api/client-logo/[file]). Works on a normal Node server; see lib/jobs.ts for hosting notes.
 */

export type Client = { id: string; name: string; sector: string; logo?: string; addedAt: string };

const DATA = path.join(process.cwd(), "data");
const FILE = path.join(DATA, "clients.json");
export const LOGOS = path.join(DATA, "client-logos");

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);

async function write(list: Client[]) {
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

export async function getClients(): Promise<Client[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Client[];
  } catch {
    // first run: start from the list in lib/site.ts (Airpay with its logo, if the file is there)
    const now = new Date().toISOString();
    const hasAirpay = await fs
      .access(path.join(LOGOS, "airpay.webp"))
      .then(() => true)
      .catch(() => false);
    const list = seed.map((c) => ({
      id: slug(c.name),
      name: c.name,
      sector: c.sector,
      ...(c.name === "Airpay" && hasAirpay ? { logo: "airpay.webp" } : {}),
      addedAt: now,
    }));
    // hosts with a read-only disk (e.g. Vercel) can't save it: still show the list
    await write(list).catch(() => {});
    return list;
  }
}

// logo files: PNG, JPEG, WebP or SVG up to 1 MB, checked by their first bytes
const MAX = 1024 * 1024;
function logoType(buf: Buffer): string | null {
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.subarray(0, 4).toString("latin1") === "RIFF" && buf.subarray(8, 12).toString("latin1") === "WEBP") return "webp";
  const head = buf.subarray(0, 512).toString("utf8").trimStart().toLowerCase();
  if ((head.startsWith("<svg") || head.startsWith("<?xml")) && head.includes("<svg") && !/<script|on\w+\s*=|javascript:/i.test(buf.toString("utf8"))) return "svg";
  return null;
}

export async function saveLogo(file: File | null): Promise<{ name?: string; error?: string }> {
  if (!file || file.size === 0) return {};
  if (file.size > MAX) return { error: "The logo must be 1 MB or smaller." };
  const buf = Buffer.from(await file.arrayBuffer());
  const ext = logoType(buf);
  if (!ext) return { error: "Upload the logo as a PNG, JPG, WebP or SVG file." };
  // pictures are stored as small WebP files (at most 400×200, transparency kept) so pages load fast; SVGs are already tiny
  let out = buf;
  let saveAs = ext;
  if (ext !== "svg") {
    out = await sharp(buf).resize(400, 200, { fit: "inside", withoutEnlargement: true }).webp({ quality: 86, alphaQuality: 90 }).toBuffer();
    saveAs = "webp";
  }
  const name = `${randomBytes(8).toString("hex")}.${saveAs}`;
  await fs.mkdir(LOGOS, { recursive: true });
  await fs.writeFile(path.join(LOGOS, name), out);
  return { name };
}

async function removeLogoFile(name?: string) {
  if (name) await fs.rm(path.join(LOGOS, path.basename(name)), { force: true });
}

export async function addClient(input: { name: string; sector: string; logo?: string }) {
  const list = await getClients();
  list.push({ id: `${slug(input.name)}-${randomBytes(2).toString("hex")}`, ...input, addedAt: new Date().toISOString() });
  await write(list);
}

export async function setClientLogo(id: string, logo: string) {
  const list = await getClients();
  const c = list.find((x) => x.id === id);
  if (!c) return;
  await removeLogoFile(c.logo);
  c.logo = logo;
  await write(list);
}

export async function deleteClient(id: string) {
  const list = await getClients();
  const c = list.find((x) => x.id === id);
  await removeLogoFile(c?.logo);
  await write(list.filter((x) => x.id !== id));
}
