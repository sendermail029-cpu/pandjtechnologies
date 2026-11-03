import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

/**
 * Single-password admin login.
 *   ADMIN_PASSWORD        – the admin password (set in .env.local, never in code)
 *   ADMIN_SESSION_SECRET  – optional; signs the session cookie (defaults to a value derived from the password)
 * Changing either one signs everyone out.
 */
export const SESSION_COOKIE = "pj_admin";
const MAX_AGE = 60 * 60 * 8; // 8 hours

function secret() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return process.env.ADMIN_SESSION_SECRET || `pj-admin:${pw}`;
}

function sign(expires: number) {
  const key = secret();
  if (!key) return null;
  return `${expires}.${createHmac("sha256", key).update(String(expires)).digest("hex")}`;
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function isConfigured() {
  return !!process.env.ADMIN_PASSWORD;
}

export function checkPassword(input: string) {
  const pw = process.env.ADMIN_PASSWORD;
  return !!pw && safeEqual(input, pw);
}

export async function startSession() {
  const expires = Date.now() + MAX_AGE * 1000;
  const value = sign(expires);
  if (!value) return;
  (await cookies()).set(SESSION_COOKIE, value, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function isAdmin() {
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!value) return false;
  const expires = Number(value.split(".")[0]);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;
  const expected = sign(expires);
  return !!expected && safeEqual(value, expected);
}
