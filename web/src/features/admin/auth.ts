/**
 * 後台登入驗證。
 *
 * 注意：這是「前端比對雜湊」的暫行做法，沿用舊站的帳密雜湊讓現有帳號可登入。
 * 它只擋 UI，不具真正安全性；正式的伺服器端驗證會在 P7（接 Supabase Auth）導入。
 */

const ADMIN_EMAIL_HASH =
  "48644a4a6bd69a8d0562fb1ecead56b9542142aa51ece9a384421d8553cf0448";
const ADMIN_PASSWORD_HASH =
  "246dc3cede600d1f53ac8c9ec791092824b64674d56056397adc87594609b6a5";

const SESSION_KEY = "populoveAdminSession";

/** 計算字串的 SHA-256 十六進位雜湊。 */
export async function sha256(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/** 驗證帳號密碼是否正確。 */
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

/** 讀取登入狀態（存在 sessionStorage，關閉分頁即失效）。 */
export function getSession(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "active";
  } catch {
    return false;
  }
}

export function setSession(active: boolean): void {
  try {
    if (active) sessionStorage.setItem(SESSION_KEY, "active");
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* sessionStorage 不可用時忽略 */
  }
}
