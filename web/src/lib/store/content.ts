"use client";

import type { DataKey, DataSchema } from "@/lib/data/keys";

import { pushToCloud } from "./cloud-client";
import { save } from "./index";

/**
 * 後台儲存內容：先寫本機快取，再推上雲端（背景進行）。
 * 推雲端會經過受保護的 API route，需後台登入的 cookie 才會成功。
 */
export function saveContent<K extends DataKey>(
  key: K,
  value: DataSchema[K],
): void {
  save(key, value);
  void pushToCloud(key, value);
}
