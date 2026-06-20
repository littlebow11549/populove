import { DEFAULTS } from "./defaults";
import { STORAGE_KEYS, type DataKey, type DataSchema } from "./keys";
import { SEED } from "./seed";

/**
 * 把雲端內容合併成完整的型別化資料。
 * 來源優先序：雲端 → 種子 SEED → 程式預設 DEFAULTS。
 */
export function resolveSiteData(cloud: Record<string, unknown>): DataSchema {
  const seed = SEED as Record<string, unknown>;
  const defaults = DEFAULTS as Record<string, unknown>;
  const result = {} as Record<string, unknown>;
  for (const key of Object.keys(STORAGE_KEYS) as DataKey[]) {
    result[key] = cloud[key] ?? seed[key] ?? defaults[key];
  }
  return result as unknown as DataSchema;
}
