import { describe, expect, it } from "vitest";

import {
  normalizeFloatButtons,
  normalizeReactionSettings,
  normalizeSmileEntry,
  normalizeSmileTags,
  pickTextColor,
} from "./normalize";

describe("normalizeFloatButtons", () => {
  it("最多保留 2 個", () => {
    const result = normalizeFloatButtons([{}, {}, {}]);
    expect(result).toHaveLength(2);
  });

  it("補上 # 前綴、非法顏色回退預設金色", () => {
    expect(normalizeFloatButtons([{ color: "abcdef" }])[0].color).toBe(
      "#abcdef",
    );
    expect(normalizeFloatButtons([{ color: "不是顏色" }])[0].color).toBe(
      "#ffb12a",
    );
  });

  it("enabled 預設為 true，明確 false 才關閉", () => {
    expect(normalizeFloatButtons([{}])[0].enabled).toBe(true);
    expect(normalizeFloatButtons([{ enabled: false }])[0].enabled).toBe(false);
  });

  it("非陣列輸入回傳空陣列", () => {
    expect(normalizeFloatButtons(null)).toEqual([]);
  });
});

describe("pickTextColor", () => {
  it("淺底用深字", () => {
    expect(pickTextColor("#ffffff")).toBe("#17110a");
  });

  it("深底用淺字", () => {
    expect(pickTextColor("#101014")).toBe("#fffaf2");
  });

  it("支援三碼縮寫", () => {
    expect(pickTextColor("#fff")).toBe("#17110a");
  });
});

describe("normalizeSmileEntry", () => {
  it("enabled 預設 true", () => {
    expect(normalizeSmileEntry({}).enabled).toBe(true);
  });

  it("舊版預設文字會被汰換成新版標籤", () => {
    expect(normalizeSmileEntry({ label: "笑一下" }).label).toBe("進來\n笑一下");
  });
});

describe("normalizeReactionSettings", () => {
  it("Populove!!! 永遠顯示", () => {
    const result = normalizeReactionSettings({
      visible: { "Populove!!!": false },
    });
    expect(result.visible["Populove!!!"]).toBe(true);
  });
});

describe("normalizeSmileTags", () => {
  it("過濾沒有名稱的類別並重新編號", () => {
    const result = normalizeSmileTags([
      { label: "梗圖", query: "meme" },
      { query: "無名稱" },
    ]);
    expect(result).toHaveLength(1);
    expect(result[0].sort).toBe(0);
  });
});
