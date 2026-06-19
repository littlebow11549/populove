import { describe, expect, it } from "vitest";

import { sha256, verifyCredentials } from "./auth";

describe("sha256", () => {
  it("符合已知測試向量（abc）", async () => {
    expect(await sha256("abc")).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    );
  });
});

describe("verifyCredentials", () => {
  it("錯誤帳密回傳 false", async () => {
    expect(await verifyCredentials("wrong@example.com", "nope")).toBe(false);
  });
});
