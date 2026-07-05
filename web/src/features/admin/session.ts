import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * 後台 session（伺服器端授權雲端寫入用）。
 * 沿用舊站帳密雜湊在伺服器端驗證，通過後簽一個有期限的 cookie。
 */

const SECRET = process.env.ADMIN_SESSION_SECRET ?? "populove-dev-secret";
const ADMIN_EMAIL_HASH =
  "48644a4a6bd69a8d0562fb1ecead56b9542142aa51ece9a384421d8553cf0448";
const ADMIN_PASSWORD_HASH =
  "246dc3cede600d1f53ac8c9ec791092824b64674d56056397adc87594609b6a5";

export const COOKIE_NAME = "populove_admin";
export const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;

async function sha256(text: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyCredentials(
  email: string,
  password: string,
): Promise<boolean> {
  const [emailHash, passwordHash] = await Promise.all([
    sha256(email.trim().toLowerCase()),
    sha256(password),
  ]);
  return emailHash === ADMIN_EMAIL_HASH && passwordHash === ADMIN_PASSWORD_HASH;
}

/** 簽出一個 `exp.簽章` 格式的 session token。 */
export function signSession(): string {
  const exp = Date.now() + SESSION_TTL_SECONDS * 1000;
  const sig = createHmac("sha256", SECRET).update(String(exp)).digest("hex");
  return `${exp}.${sig}`;
}

export function verifySession(token: string | undefined): boolean {
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  if (!expStr || !sig) return false;
  const exp = Number(expStr);
  if (!exp || exp < Date.now()) return false;
  const expected = createHmac("sha256", SECRET).update(expStr).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}
