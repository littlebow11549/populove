import { getDefaultBackend, type StorageBackend } from "./backend";

/** 時間戳鍵名後綴：每個資料鍵都會額外存一個 `${key}UpdatedAt`。 */
const UPDATED_AT_SUFFIX = "UpdatedAt";

function parseJson<T>(raw: string | null): T | null {
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/** 讀取某鍵的最後更新時間（毫秒）；無紀錄時為 0。 */
export function readTimestamp(
  key: string,
  backend: StorageBackend = getDefaultBackend(),
): number {
  return Number(backend.getItem(`${key}${UPDATED_AT_SUFFIX}`) ?? 0) || 0;
}

/**
 * 讀取某鍵的值；沒有有效儲存值時回退 `fallback`。
 * 物件型別會以 fallback 為底補齊缺漏欄位，避免新增欄位時舊資料缺欄。
 */
export function readValue<T>(
  key: string,
  fallback: T,
  backend: StorageBackend = getDefaultBackend(),
): T {
  const stored = parseJson<T>(backend.getItem(key));
  if (stored === null) return fallback;

  if (Array.isArray(fallback)) {
    return Array.isArray(stored) ? stored : fallback;
  }
  if (isPlainObject(fallback)) {
    return isPlainObject(stored) ? ({ ...fallback, ...stored } as T) : fallback;
  }
  return stored;
}

/** 寫入某鍵的值，並記錄更新時間（預設為現在）。 */
export function writeValue<T>(
  key: string,
  value: T,
  backend: StorageBackend = getDefaultBackend(),
  now: number = Date.now(),
): void {
  backend.setItem(key, JSON.stringify(value));
  backend.setItem(`${key}${UPDATED_AT_SUFFIX}`, String(now));
}

export interface TimestampedValue<T> {
  value: T;
  updatedAt: number;
}

/** Last-write-wins：更新時間較新的一方勝出。 */
export function mergeByTimestamp<T>(
  local: TimestampedValue<T>,
  remote: TimestampedValue<T>,
): T {
  return remote.updatedAt > local.updatedAt ? remote.value : local.value;
}
