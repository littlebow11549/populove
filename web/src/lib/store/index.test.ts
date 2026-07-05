import { describe, expect, it } from "vitest";

import { DEFAULTS } from "@/lib/data/defaults";

import { createMemoryBackend } from "./backend";
import { load, save } from "./index";

describe("store facade：load / save", () => {
  it("無資料時 load 回傳預設值", () => {
    const backend = createMemoryBackend();
    expect(load("floatButtons", backend)).toEqual(DEFAULTS.floatButtons);
  });

  it("save 後 load 取回相同資料", () => {
    const backend = createMemoryBackend();
    const next = [
      {
        id: "fb1",
        text: "測試",
        href: "https://example.com",
        color: "#ffffff",
        hidden: false,
        enabled: true,
      },
    ];
    save("floatButtons", next, backend);
    expect(load("floatButtons", backend)).toEqual(next);
  });

  it("設定型物件會以預設補齊缺漏欄位", () => {
    const backend = createMemoryBackend();
    save("smileDisplay", { showHotTag: false } as never, backend);
    expect(load("smileDisplay", backend)).toEqual({
      showHotTag: false,
      showPopuloveReaction: true,
      showCoinBadge: true,
    });
  });
});
