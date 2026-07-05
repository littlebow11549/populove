/**
 * 最小化的鍵值儲存後端介面。
 * 抽成介面是為了：(1) 測試時可替換成記憶體後端；
 * (2) 伺服器端沒有 localStorage 時可安全退回；
 * (3) 日後接 Supabase 等遠端來源時沿用同一套讀寫邏輯。
 */
export interface StorageBackend {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

/** 記憶體後端（測試與 SSR 後備用）。 */
export function createMemoryBackend(
  seed?: Record<string, string>,
): StorageBackend {
  const map = new Map<string, string>(Object.entries(seed ?? {}));
  return {
    getItem(key) {
      const value = map.get(key);
      return value === undefined ? null : value;
    },
    setItem(key, value) {
      map.set(key, value);
    },
    removeItem(key) {
      map.delete(key);
    },
  };
}

let ssrFallback: StorageBackend | null = null;

/** 取得預設後端：瀏覽器用 localStorage，伺服器端用共用記憶體後端。 */
export function getDefaultBackend(): StorageBackend {
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage;
  }
  ssrFallback ??= createMemoryBackend();
  return ssrFallback;
}
