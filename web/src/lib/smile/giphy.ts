/**
 * Giphy 線上迷因抓取與快取。
 * 後台填了 Giphy API Key 才會啟用；抓到的圖快取一小時，失敗則回退內建圖。
 */
import { readValue, writeValue } from "@/lib/store/storage";

import type { Meme } from "./state";

const CACHE_KEY = "populoveGiphyMemeCache";
const CACHE_DURATION = 60 * 60 * 1000;
const DEFAULT_QUERIES: ReadonlyArray<{ tag: string; q: string }> = [
  { tag: "funny", q: "popular funny reaction meme" },
  { tag: "funny", q: "funny meme reaction" },
];

interface GiphyImage {
  url?: string;
}
interface GiphyItem {
  id: string;
  title?: string;
  images?: {
    fixed_height?: GiphyImage;
    downsized_medium?: GiphyImage;
    original?: GiphyImage;
  };
}
interface GiphyResponse {
  data?: GiphyItem[];
}
interface MemeCache {
  updatedAt: number;
  items: Meme[];
}

function normalizeGif(item: GiphyItem, tag: string): Meme | null {
  const url =
    item.images?.fixed_height?.url ??
    item.images?.downsized_medium?.url ??
    item.images?.original?.url;
  if (!url) return null;
  return {
    id: `${tag}-${item.id}`,
    tag,
    title: item.title || "今天也 Populove 一下",
    src: url,
  };
}

function dedupe(memes: Meme[]): Meme[] {
  const seen = new Set<string>();
  const out: Meme[] = [];
  for (const meme of memes) {
    if (!seen.has(meme.id)) {
      seen.add(meme.id);
      out.push(meme);
    }
  }
  return out;
}

/** 讀取仍在有效期內的快取迷因；過期或無快取回傳 null。 */
export function readGiphyCache(): Meme[] | null {
  const cache = readValue<MemeCache | null>(CACHE_KEY, null);
  if (cache?.items?.length && Date.now() - cache.updatedAt < CACHE_DURATION) {
    return cache.items;
  }
  return null;
}

export function writeGiphyCache(items: Meme[]): void {
  writeValue(CACHE_KEY, { updatedAt: Date.now(), items });
}

/** 向 Giphy 抓一批迷因（含後台自訂類別的搜尋字）。 */
export async function fetchGiphyMemes(
  apiKey: string,
  extra: ReadonlyArray<{ tag: string; q: string }>,
): Promise<Meme[]> {
  const queries = [...DEFAULT_QUERIES, ...extra];
  const batches = await Promise.all(
    queries.map(async (query) => {
      const offset = Math.floor(Math.random() * 450);
      const params = new URLSearchParams({
        api_key: apiKey,
        q: query.q,
        limit: "50",
        offset: String(offset),
        rating: "pg",
        lang: "zh-TW",
      });
      const res = await fetch(`https://api.giphy.com/v1/gifs/search?${params}`);
      if (!res.ok) throw new Error("Giphy request failed");
      const json = (await res.json()) as GiphyResponse;
      return (json.data ?? [])
        .map((item) => normalizeGif(item, query.tag))
        .filter((meme): meme is Meme => meme !== null);
    }),
  );
  return dedupe(batches.flat()).slice(0, 140);
}
