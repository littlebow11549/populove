import type { DataSchema } from "./keys";
import seedJson from "./seed.json";

/**
 * 從舊站 site-data.js 搬移過來的實際內容（由 scripts/extract-seed.mjs 產生）。
 *
 * 當瀏覽器尚無資料時，store 會以此為內容來源，優先於程式預設 DEFAULTS。
 * 種子未涵蓋的區塊（如產品分類）才會回退 DEFAULTS。
 */
export const SEED = seedJson as unknown as Partial<DataSchema>;
