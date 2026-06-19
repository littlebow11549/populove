import { describe, expect, it } from "vitest";

import { createMemoryBackend } from "@/lib/store/backend";
import { load } from "@/lib/store/index";

import { SEED } from "./seed";

describe("種子內容（SEED）", () => {
  it("商品為 8 筆，且都用本地圖片路徑（已無 base64）", () => {
    expect(SEED.products).toHaveLength(8);
    for (const product of SEED.products ?? []) {
      expect(product.image.startsWith("/products/")).toBe(true);
    }
  });

  it("Banner 為 4 筆，且改用 /banners 路徑", () => {
    expect(SEED.banners).toHaveLength(4);
    for (const banner of SEED.banners ?? []) {
      expect(banner.image.startsWith("/banners/")).toBe(true);
    }
  });

  it("懸浮按鈕由舊推廣連結轉成，共 2 個", () => {
    expect(SEED.floatButtons).toHaveLength(2);
  });
});

describe("store 以種子為內容來源", () => {
  it("無資料時 load 商品回傳種子內容（非佔位預設）", () => {
    const backend = createMemoryBackend();
    expect(load("products", backend)).toEqual(SEED.products);
  });

  it("種子未涵蓋的區塊（產品分類）回退程式預設", () => {
    const backend = createMemoryBackend();
    expect(load("categories", backend).length).toBeGreaterThan(0);
  });
});
