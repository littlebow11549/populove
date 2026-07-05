import "server-only";

/**
 * 伺服器端 Supabase 存取（用 secret 金鑰，可繞過 RLS 寫入）。
 * 只在伺服器元件與 API route 使用，secret 金鑰不會進到前端。
 */

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SECRET = process.env.SUPABASE_SECRET_KEY ?? "";

export const serverSupabaseReady = Boolean(URL && SECRET);

function headers() {
  return {
    apikey: SECRET,
    Authorization: `Bearer ${SECRET}`,
  };
}

/** 讀取雲端所有內容區塊（key → value）。未設定或失敗時回傳空物件。 */
export async function fetchAllSiteData(): Promise<Record<string, unknown>> {
  if (!serverSupabaseReady) return {};
  try {
    const res = await fetch(`${URL}/rest/v1/site_data?select=key,value`, {
      headers: headers(),
      cache: "no-store",
    });
    if (!res.ok) return {};
    const rows = (await res.json()) as { key: string; value: unknown }[];
    const out: Record<string, unknown> = {};
    for (const row of rows) out[row.key] = row.value;
    return out;
  } catch {
    return {};
  }
}

/** 健康檢查：金鑰有設定、且實際讀得到資料表才算健康。 */
export async function pingCloud(): Promise<boolean> {
  if (!serverSupabaseReady) return false;
  try {
    const res = await fetch(`${URL}/rest/v1/site_data?select=key&limit=1`, {
      headers: headers(),
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** 讀取單一 key 的 value（targeted，不會把整張表拉回來）。 */
export async function fetchSiteValue<T>(key: string): Promise<T | null> {
  if (!serverSupabaseReady) return null;
  try {
    const res = await fetch(
      `${URL}/rest/v1/site_data?key=eq.${encodeURIComponent(key)}&select=value`,
      { headers: headers(), cache: "no-store" },
    );
    if (!res.ok) return null;
    const rows = (await res.json()) as { value: unknown }[];
    return (rows[0]?.value as T) ?? null;
  } catch {
    return null;
  }
}

/** 寫入（upsert）一個內容區塊，並記錄更新時間。 */
export async function upsertSiteData(
  key: string,
  value: unknown,
): Promise<boolean> {
  if (!serverSupabaseReady) return false;
  try {
    const res = await fetch(`${URL}/rest/v1/site_data?on_conflict=key`, {
      method: "POST",
      headers: {
        ...headers(),
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify([
        { key, value, updated_at: new Date().toISOString() },
      ]),
    });
    return res.ok;
  } catch {
    return false;
  }
}
