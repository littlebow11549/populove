"use client";

import { STORAGE_KEYS, type DataKey } from "@/lib/data/keys";

import { getDefaultBackend } from "./backend";
import { readTimestamp, writeValue } from "./storage";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

export const cloudConfigured = Boolean(URL && KEY);

interface CloudRow {
  key: string;
  value: unknown;
  updated_at: string;
}

/**
 * 從雲端把最新內容拉進本機快取（localStorage）。
 * 採 last-write-wins：只有雲端更新時間較新時才覆蓋本機。
 */
export async function hydrateFromCloud(): Promise<void> {
  if (!cloudConfigured) return;
  try {
    const res = await fetch(
      `${URL}/rest/v1/site_data?select=key,value,updated_at`,
      { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } },
    );
    if (!res.ok) return;
    const rows = (await res.json()) as CloudRow[];
    const backend = getDefaultBackend();
    for (const row of rows) {
      const storageKey = STORAGE_KEYS[row.key as DataKey];
      if (!storageKey) continue;
      const cloudTime = Date.parse(row.updated_at) || 0;
      if (cloudTime > readTimestamp(storageKey, backend)) {
        writeValue(storageKey, row.value, backend, cloudTime);
      }
    }
  } catch {
    /* 離線或失敗時沿用本機資料 */
  }
}

/** 後台存檔時把單一區塊推上雲端（透過受保護的 API route）。 */
export async function pushToCloud(
  key: DataKey,
  value: unknown,
): Promise<boolean> {
  if (!cloudConfigured) return false;
  try {
    const res = await fetch("/api/site-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
