import { describe, expect, it } from "vitest";

import { createMemoryBackend } from "./backend";
import {
  mergeByTimestamp,
  readTimestamp,
  readValue,
  writeValue,
} from "./storage";

describe("storage：時間戳鍵值讀寫", () => {
  it("陣列可正確寫入並讀回", () => {
    const backend = createMemoryBackend();
    writeValue("k", [1, 2, 3], backend);
    expect(readValue<number[]>("k", [], backend)).toEqual([1, 2, 3]);
  });

  it("無資料時回退 fallback", () => {
    const backend = createMemoryBackend();
    expect(readValue("missing", "fallback", backend)).toBe("fallback");
  });

  it("物件以 fallback 為底補齊缺漏欄位", () => {
    const backend = createMemoryBackend({ s: JSON.stringify({ a: 1 }) });
    expect(readValue("s", { a: 0, b: 9 }, backend)).toEqual({ a: 1, b: 9 });
  });

  it("壞掉的 JSON 不會丟錯，改回退 fallback", () => {
    const backend = createMemoryBackend({ bad: "{not json" });
    expect(readValue("bad", [], backend)).toEqual([]);
  });

  it("寫入會記錄更新時間", () => {
    const backend = createMemoryBackend();
    writeValue("k", 1, backend, 1234);
    expect(readTimestamp("k", backend)).toBe(1234);
  });
});

describe("storage：last-write-wins", () => {
  it("更新時間較新者勝出", () => {
    expect(
      mergeByTimestamp(
        { value: "舊", updatedAt: 100 },
        { value: "新", updatedAt: 200 },
      ),
    ).toBe("新");
  });

  it("較舊的遠端不會覆蓋較新的本地", () => {
    expect(
      mergeByTimestamp(
        { value: "本地新", updatedAt: 300 },
        { value: "遠端舊", updatedAt: 200 },
      ),
    ).toBe("本地新");
  });
});
