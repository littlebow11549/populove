/**
 * 一次性：把種子內容（seed.json）推上 Supabase 的 site_data 表。
 * 用法：從 web/ 載入 .env.local 後執行 node scripts/push-seed-to-cloud.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const seed = JSON.parse(
  readFileSync(resolve(here, "../src/lib/data/seed.json"), "utf8"),
);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;
if (!url || !secret) {
  console.error("缺少 NEXT_PUBLIC_SUPABASE_URL 或 SUPABASE_SECRET_KEY");
  process.exit(1);
}

const now = new Date().toISOString();
const rows = Object.entries(seed).map(([key, value]) => ({
  key,
  value,
  updated_at: now,
}));

const res = await fetch(`${url}/rest/v1/site_data?on_conflict=key`, {
  method: "POST",
  headers: {
    apikey: secret,
    Authorization: `Bearer ${secret}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=minimal",
  },
  body: JSON.stringify(rows),
});

console.log("HTTP", res.status);
console.log("推送鍵:", rows.map((row) => row.key).join(", "));
if (!res.ok) console.log("錯誤:", await res.text());
