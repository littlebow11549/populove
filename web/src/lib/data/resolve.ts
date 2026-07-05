import { DEFAULTS } from "./defaults";
import { STORAGE_KEYS, type DataKey, type DataSchema } from "./keys";
import { SEED } from "./seed";

// 新站的圖片都放在 web/public 下這些公開資料夾，對外以 /<dir>/... 提供。
const PUBLIC_DIRS = ["banners", "products", "brand", "placeholders", "icons"];

/**
 * 正規化單一圖片路徑，修正歷史遺留的舊路徑：
 * - 舊靜態站的 `assets/xxx.png`：圖檔現在都搬到 `/banners/`，改指過去。
 * - 缺開頭斜線的公開資料夾路徑（如 `banners/x.png`）補上 `/`。
 * - 外部連結、data/blob URL、已是絕對路徑者不動。
 */
function normalizeImagePath(src: unknown): unknown {
  if (typeof src !== "string" || !src) return src;
  if (/^(https?:|data:|blob:)/i.test(src) || src.startsWith("/")) return src;
  if (src.startsWith("assets/")) return "/banners/" + src.slice("assets/".length);
  const dir = src.split("/")[0];
  if (PUBLIC_DIRS.includes(dir)) return "/" + src;
  return src;
}

/** 把某個區塊裡每個項目的 image 欄位正規化（區塊為陣列時）。 */
function normalizeImageList(value: unknown): unknown {
  if (!Array.isArray(value)) return value;
  return value.map((item) =>
    item && typeof item === "object" && "image" in item
      ? { ...(item as Record<string, unknown>), image: normalizeImagePath((item as Record<string, unknown>).image) }
      : item,
  );
}

/** 把單一物件的 image 欄位正規化（區塊為物件時，如 smileEntry）。 */
function normalizeImageObject(value: unknown): unknown {
  if (value && typeof value === "object" && "image" in value) {
    return {
      ...(value as Record<string, unknown>),
      image: normalizeImagePath((value as Record<string, unknown>).image),
    };
  }
  return value;
}

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
  // 修正歷史遺留的圖片路徑，避免舊 assets/ 路徑造成破圖。
  result.banners = normalizeImageList(result.banners);
  result.products = normalizeImageList(result.products);
  result.smileEntry = normalizeImageObject(result.smileEntry);
  return result as unknown as DataSchema;
}
