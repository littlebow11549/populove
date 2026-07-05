"use client";

import type { DataKey, DataSchema } from "@/lib/data/keys";

import { pushToCloud } from "./cloud-client";
import { save } from "./index";

/** 每次雲端儲存的結果都會以此事件廣播，供狀態指示燈與失敗警示使用。 */
export const CLOUD_SAVE_EVENT = "populove:cloud-save";

export interface CloudSaveDetail {
  key: DataKey;
  ok: boolean;
}

/**
 * 後台儲存內容：先寫本機快取，再推上雲端（背景進行）。
 * 推雲端會經過受保護的 API route，需後台登入的 cookie 才會成功。
 * 推送結果（成功／失敗）一律廣播 CLOUD_SAVE_EVENT——失敗絕不沉默，
 * 後台會跳出明顯警示（2026-07-05 事故教訓：靜默失敗讓問題潛伏兩週）。
 */
export function saveContent<K extends DataKey>(
  key: K,
  value: DataSchema[K],
): void {
  save(key, value);
  void pushToCloud(key, value).then((ok) => {
    window.dispatchEvent(
      new CustomEvent<CloudSaveDetail>(CLOUD_SAVE_EVENT, {
        detail: { key, ok },
      }),
    );
  });
}
