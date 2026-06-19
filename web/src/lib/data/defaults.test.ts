import { describe, expect, it } from "vitest";

import { DEFAULTS } from "./defaults";
import { STORAGE_KEYS, type DataKey } from "./keys";

describe("資料預設值（DEFAULTS）", () => {
  it("每個資料鍵都有對應預設值", () => {
    for (const key of Object.keys(STORAGE_KEYS) as DataKey[]) {
      expect(DEFAULTS[key]).toBeDefined();
    }
  });

  it("商品預設為 10 筆，且都有 id 與名稱", () => {
    expect(DEFAULTS.products).toHaveLength(10);
    for (const product of DEFAULTS.products) {
      expect(product.id).toBeTruthy();
      expect(product.name).toBeTruthy();
    }
  });

  it("懸浮按鈕最多 2 個，且笑一下入口預設啟用", () => {
    expect(DEFAULTS.floatButtons.length).toBeLessThanOrEqual(2);
    expect(DEFAULTS.smileEntry.enabled).toBe(true);
  });
});
