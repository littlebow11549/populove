# 協作規範（CONTRIBUTING）

本專案以「**可協作、可交付**」為最高原則：任何工程師都應能快速看懂、接手、
並安全地修改。請遵守以下規範。

## 分支與提交

- 不直接推送 `main`；在功能分支開發，經預覽驗收後再合併。
- 一個 PR 專注一件事，描述「改了什麼、為什麼、如何驗收」。
- Commit 訊息用中文、清楚描述意圖（例如：`商品卡片：補上缺貨標籤樣式`）。

## 程式風格

- 一律 **TypeScript**，避免 `any`；型別不確定時優先補型別而非略過。
- 命名清楚可讀；複雜流程加上簡短註解說明「為什麼」。
- 樣式只用 **Tailwind + 設計 token**（見 `globals.css`），
  **禁止 `!important` 疊加**、避免在元件硬寫色碼。
- 共用邏輯放 `src/lib`，UI 放 `src/components`，功能模組放 `src/features`。

## 送出前檢查（必跑）

```bash
pnpm check    # = typecheck + lint + format:check
pnpm build    # 確認可成功建置
```

三項全綠才送 PR。

---

## 可交付標準（Definition of Done）

每個階段／PR 都必須同時滿足，才算「完成」：

1. **跑得起來**：新人能照 `README.md` 在本機啟動，不需口頭補充。
2. **型別與規範**：`pnpm check` 全綠（typecheck + lint + format）。
3. **可建置**：`pnpm build` 成功。
4. **樣式乾淨**：只用 token / Tailwind，零 `!important` 疊加。
5. **可驗收**：能在預覽網址實際點開、由非工程師也能確認結果。
6. **文件同步**：若新增設定或流程，README／.env.example 一併更新。
7. **不破壞舊站**：切換完成前，正式站（populove.org）行為不受影響。
