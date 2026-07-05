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

/** 一次性清理標記：見 cleanupLegacyLocalData。 */
const LEGACY_CLEANUP_KEY = "populoveLegacyCleanup";

/**
 * 一次性清理退役舊靜態站殘留的 localStorage。
 * 舊站與新站共用相同的資料鍵名，且舊站寫入時會蓋上較新的時間戳，
 * 導致 last-write-wins 讓雲端的正確內容蓋不回來。
 * 這裡把所有內容鍵的時間戳歸零一次，讓下一次雲端同步必定勝出；
 * 本機值仍保留作為雲端缺鍵時的備援。
 */
function cleanupLegacyLocalData(): void {
  const backend = getDefaultBackend();
  if (backend.getItem(LEGACY_CLEANUP_KEY) === "v1") return;
  for (const key of Object.values(STORAGE_KEYS)) {
    if (backend.getItem(`${key}UpdatedAt`) !== null) {
      backend.setItem(`${key}UpdatedAt`, "0");
    }
  }
  backend.setItem(LEGACY_CLEANUP_KEY, "v1");
}

/**
 * 從雲端把最新內容拉進本機快取（localStorage）。
 * 採 last-write-wins：只有雲端更新時間較新時才覆蓋本機。
 */
export async function hydrateFromCloud(): Promise<void> {
  if (!cloudConfigured) return;
  cleanupLegacyLocalData();
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

type MemeReactionCounts = Record<string, Record<string, number>>;

/** 讀取雲端共享的迷因反應計數（所有訪客累計）。 */
export async function fetchMemeReactions(): Promise<MemeReactionCounts> {
  if (!cloudConfigured) return {};
  try {
    const res = await fetch(
      `${URL}/rest/v1/site_data?key=eq.memeReactions&select=value`,
      { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } },
    );
    if (!res.ok) return {};
    const rows = (await res.json()) as { value: MemeReactionCounts }[];
    return rows[0]?.value ?? {};
  } catch {
    return {};
  }
}

/** 把某張圖的某個反應 +1，回傳該圖最新計數（失敗回 null）。 */
export async function pushReaction(
  memeId: string,
  reaction: string,
): Promise<Record<string, number> | null> {
  try {
    const res = await fetch("/api/react", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memeId, reaction }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { counts?: Record<string, number> };
    return data.counts ?? null;
  } catch {
    return null;
  }
}
