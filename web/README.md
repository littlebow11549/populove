# POPULOVE Web（新版重構）

POPULOVE 客製化團體服網站的**新版前端**，採用可長期維護、易交接的架構。

> 狀態：**P0 — 基礎建設**。目前只有乾淨的專案骨架與開發規範，
> **尚未搬移任何現有功能**。舊版網站（位於 repo 根目錄的 `index.html` 等）
> 仍照常運作、由 Netlify 部署，本資料夾不影響正式站。

完整重構藍圖與分階段計畫請見根目錄的 [`REBUILD-PLAN.md`](../REBUILD-PLAN.md)。
協作規範與「可交付標準」請見 [`CONTRIBUTING.md`](./CONTRIBUTING.md)。

---

## 技術棧

| 層級     | 採用                                                      |
| -------- | --------------------------------------------------------- |
| 框架     | Next.js 16（App Router）                                  |
| 語言     | TypeScript（strict）                                      |
| 樣式     | Tailwind CSS v4（設計變數，集中於 `src/app/globals.css`） |
| 規範     | ESLint（eslint-config-next）+ Prettier                    |
| 套件管理 | pnpm                                                      |

後端（Supabase）將於後續階段接入，P0 尚未使用。

---

## 環境需求

- Node.js 20 以上（建議 22）
- pnpm 10 以上（`npm i -g pnpm`）

## 快速開始

```bash
cd web
pnpm install          # 安裝相依套件
cp .env.example .env.local   # 之後接後端時才需填值，P0 可留空
pnpm dev              # 啟動開發伺服器
```

開啟 http://localhost:3000 即可看到目前的基礎頁面。

## 常用指令

| 指令                | 說明                                                   |
| ------------------- | ------------------------------------------------------ |
| `pnpm dev`          | 啟動開發伺服器（熱重載）                               |
| `pnpm build`        | 產出正式版（驗證可否成功建置）                         |
| `pnpm start`        | 以正式版啟動                                           |
| `pnpm lint`         | ESLint 檢查                                            |
| `pnpm typecheck`    | TypeScript 型別檢查                                    |
| `pnpm format`       | Prettier 自動排版                                      |
| `pnpm format:check` | 檢查排版是否符合規範                                   |
| `pnpm check`        | 一次跑完 typecheck + lint + format:check（送出前必跑） |

---

## 資料夾結構

```
web/
├─ public/                靜態資產（隨程式版控）
│  ├─ brand/              logo、品牌圖
│  ├─ icons/              UI 圖示
│  └─ placeholders/       預設佔位圖
├─ src/
│  ├─ app/                Next.js App Router（頁面、版型、全域樣式）
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ globals.css      設計變數（顏色／字體 token）集中地
│  ├─ components/         可重用 UI 元件
│  ├─ features/           各功能模組（products、banners、smile、admin…）
│  └─ lib/
│     ├─ utils/           共用工具（如 cn()）
│     ├─ store/           資料存取層（後續階段）
│     └─ supabase/        後端用戶端（後續階段）
├─ .env.example           環境變數範本
└─ ...                    設定檔（tsconfig、eslint、prettier、tailwind via postcss）
```

> `components / features / lib/store / lib/supabase` 目前是空骨架（含 `.gitkeep`），
> 會在後續階段逐步填入。先把「家」蓋好，之後搬東西才有地方放。

---

## 設計原則（重點）

- **設計 token 單一來源**：顏色、字體都定義在 `globals.css` 的 `@theme`，
  元件不寫死色碼——這是為了根除舊版 `styles.css` 的 `!important` 疊加問題。
- **TypeScript 嚴格模式**：型別即文件，降低接手門檻。
- **格式自動化**：Prettier 統一排版，避免風格爭議。
- **舊站不受影響**：本資料夾與根目錄舊站完全獨立，切換前正式站照常運作。
