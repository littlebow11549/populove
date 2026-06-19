import { DEFAULTS } from "@/lib/data/defaults";
import { STORAGE_KEYS, type DataKey, type DataSchema } from "@/lib/data/keys";

import { getDefaultBackend, type StorageBackend } from "./backend";
import { readValue, writeValue } from "./storage";

export type { StorageBackend } from "./backend";
export { createMemoryBackend } from "./backend";
export { mergeByTimestamp, readTimestamp } from "./storage";

/** 以 DataSchema 視角檢視預設值，讓泛型索引取得精確型別。 */
const schemaDefaults: DataSchema = DEFAULTS;

/** 讀取某個資料區塊（無資料時回退預設值）。 */
export function load<K extends DataKey>(
  key: K,
  backend: StorageBackend = getDefaultBackend(),
): DataSchema[K] {
  return readValue<DataSchema[K]>(
    STORAGE_KEYS[key],
    schemaDefaults[key],
    backend,
  );
}

/** 儲存某個資料區塊（同時記錄更新時間）。 */
export function save<K extends DataKey>(
  key: K,
  value: DataSchema[K],
  backend: StorageBackend = getDefaultBackend(),
): void {
  writeValue(STORAGE_KEYS[key], value, backend);
}
