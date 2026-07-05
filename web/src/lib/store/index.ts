import { DEFAULTS } from "@/lib/data/defaults";
import { SEED } from "@/lib/data/seed";
import { STORAGE_KEYS, type DataKey, type DataSchema } from "@/lib/data/keys";

import { getDefaultBackend, type StorageBackend } from "./backend";
import { readValue, writeValue } from "./storage";

export type { StorageBackend } from "./backend";
export { createMemoryBackend } from "./backend";
export { mergeByTimestamp, readTimestamp } from "./storage";

/** 以 DataSchema 視角檢視預設值，讓泛型索引取得精確型別。 */
const schemaDefaults: DataSchema = DEFAULTS;

/**
 * 讀取某個資料區塊。
 * 來源優先序：localStorage（最新）→ 種子 SEED（舊站實際內容）→ 程式預設 DEFAULTS。
 */
export function load<K extends DataKey>(
  key: K,
  backend: StorageBackend = getDefaultBackend(),
): DataSchema[K] {
  const fallback = (SEED[key] ?? schemaDefaults[key]) as DataSchema[K];
  return readValue<DataSchema[K]>(STORAGE_KEYS[key], fallback, backend);
}

/** 儲存某個資料區塊（同時記錄更新時間）。 */
export function save<K extends DataKey>(
  key: K,
  value: DataSchema[K],
  backend: StorageBackend = getDefaultBackend(),
): void {
  writeValue(STORAGE_KEYS[key], value, backend);
}
