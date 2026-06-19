import { describe, expect, it } from "vitest";

import { categoryIcon, normalizeIcon } from "./icons";

describe("normalizeIcon", () => {
  it("合法圖示原樣保留", () => {
    expect(normalizeIcon("i-shirt")).toBe("i-shirt");
  });

  it("非法圖示回退預設", () => {
    expect(normalizeIcon("不存在")).toBe("i-message");
    expect(normalizeIcon("", "i-bag")).toBe("i-bag");
  });
});

describe("categoryIcon", () => {
  it("依名稱關鍵字推測", () => {
    expect(categoryIcon({ label: "短袖POLO衫" })).toBe("i-polo");
    expect(categoryIcon({ label: "兒童專區" })).toBe("i-kids");
  });

  it("明確指定（非預設 i-shirt）優先沿用", () => {
    expect(categoryIcon({ label: "外套", icon: "i-cup" })).toBe("i-cup");
  });

  it("無法判斷時回退 i-shirt", () => {
    expect(categoryIcon({ label: "未知分類" })).toBe("i-shirt");
  });
});
