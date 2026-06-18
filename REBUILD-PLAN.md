# POPULOVE 重構計畫（REBUILD-PLAN）

> 目的：把現有「持續累加」出來的程式碼，以資深全端工程師的角度重構成**乾淨、模組化、可交付給其他前後端工程師接手**的版本，並順勢解決跨平台同步與圖片管理。
>
> 原則：**舊站全程不停機**，逐階段在分支 + 預覽部署驗證，確認 OK 才併 `main`。每階段獨立可上線、可回退。

---

## 1. 現況診斷（重構動機）

| 指標 | 數值 | 問題 |
|---|---|---|
| `styles.css` | 5,175 行 | 單一巨檔，最大維護痛點 |
| `!important` | 146 個 | 補丁疊補丁，改一處牽動全身 |
| `@media` 區塊 | 58 個 | 同元件的 RWD 散落各處 |
| 重複選擇器 | `.reaction-grid`×34、`.smile-float`×16、`.promo-float`×11… | 同元件被反覆覆寫 |
| JS 壓縮程度 | `admin.js` 單行最長 1,774 字元 | 一行塞一個功能，難讀難改 |
| `site-data.js` | 440KB | base64 圖片塞在資料裡，肥大 |
| 架構 | 無建置工具、無模組；`script.js`/`admin.js`/`smile.js` 各自重複一套 `read/save/escapeHtml` | 邏輯重複、無法共用 |

功能正常，但**結構是累加出來的**，需要重整骨架。

---

## 2. 重構目標
- 導入建置工具（Vite/Next）＋ ES 模組化，三檔共用一套核心（資料層、工具、icon）。
- CSS 改成**設計變數（tokens）＋ 元件化**，消滅 146 個 `!important` 與散落的 @media。
- 圖片從 base64 拆成**獨立資產**（靜態進 repo、上傳圖進物件儲存），瘦身資料檔。
- **行為不變、外觀不變**，只換骨架，逐階段切換。

---

## 3. 技術棧（交付/接手導向）

選型標準：主流、人才庫大、前後端同一套、TypeScript、有官方慣例。

| 層級 | 選擇 | 理由 |
|---|---|---|
| 框架 | **Next.js（App Router）+ React** | 業界最標準全端框架，前後端同一 repo，人才庫最大 |
| 語言 | **TypeScript** | 型別即文件，降低接手門檻 |
| 樣式 | **Tailwind CSS** | 工具類寫法，從根本杜絕 `!important` 疊加；慣例統一 |
| 後端/資料 | **Supabase**（Postgres + Auth + Storage） | 一次解決同步、登入安全、圖片儲存 |
| 部署 | **Netlify**（沿用）或 Vercel | Next.js 在 Netlify 可正常運行，不必搬家 |
| 工具 | ESLint + Prettier + pnpm | 規範自動化，多人協作一致 |

**替代方案**：想更輕、更貼近現有靜態站 → **Astro + TypeScript**（互動處用 React island），後端一樣接 Supabase。
**不建議**：SvelteKit/Vue（人才庫較小）、純 vanilla 重寫（無框架慣例，最不利交接）。

Supabase 對應三大需求：
- **跨平台同步** → Postgres，每個設定區塊用 `updated_at` 做 last-write-wins。
- **後台登入安全** → Supabase Auth 取代「純前端密碼比對」（不可拿來授權雲端寫入）。
- **圖片** → Supabase Storage 存圖，取代 base64。

---

## 4. 圖片 / 資產策略（獨立管理）

圖片依性質分兩類，**一律不存 base64**：

| 類別 | 例子 | 位置 | 理由 |
|---|---|---|---|
| 靜態設計資產 | logo、icon、預設佔位圖 | repo `public/` | 跟程式版控，建置時最佳化 |
| 後台上傳內容圖 | 商品圖、Banner、自創圖 | Supabase Storage 專屬 bucket | 物件儲存適合動態檔；DB 只存 URL |

**repo 靜態資產結構**
```
public/
  brand/        logo、populove-bear-icon.svg
  icons/        UI 圖示
  placeholders/ 預設商品圖、預設 banner
```
搭配 `next/image` 自動最佳化（尺寸/WebP）。

**Supabase Storage**
```
bucket: media   （public 讀取、需登入才可寫入）
  products/{productId}.webp
  banners/{bannerId}.webp
  memes/{memeId}.webp
```
- 資料表只存路徑（如 `products.image_url = "products/abc.webp"`）。
- 上傳時就壓縮/轉 WebP（沿用後台裁切功能）→ 上傳 Storage → 存回 URL。

---

## 5. 資料模型（Supabase / Postgres 草案）

以「設定區塊」為單位，每塊帶 `updated_at` 供 last-write-wins：

```
settings        (key text primary key, value jsonb, updated_at timestamptz)
products        (id, name, price, href, tag_level, tag_text, image_url, sort, updated_at)
categories      (id, label, href, icon, description, sort, updated_at)
banners         (id, label, title, title2, text, title_size, text_size, image_url, sort, updated_at)
contact         (singleton: line, phone, email, hours, updated_at)
contact_cards   (id, icon, title, text, href, sort, updated_at)
order_flow      (id, icon, title, text, link, href, sort, updated_at)
float_buttons   (id, text, href, color, hidden, enabled, sort, updated_at)   -- 取代舊推廣按鈕
smile_entry     (singleton: label, href, image_url, giphy_key, enabled, updated_at)
smile_tags / coin_settings / reaction_settings / smile_display ... (依現有設定對應)
memes           (id, tag, title, src_url, owner_id, created_at)
```
- 公開讀、登入才可寫（Row Level Security policy）。
- 前端載入抓最新；本地 localStorage 退化為離線快取。

---

## 6. 建議資料夾結構（Next.js）

```
src/
  app/
    (site)/            前台：首頁、笑一下頁
    admin/             後台（受保護路由 + Supabase Auth）
    api/               需要伺服器端的 endpoint
  components/          React 元件（依區塊：hero、products、floats…）
  features/
    products/  banners/  smile/  admin/   各功能的邏輯與 hook
  lib/
    supabase/          client、queries
    store/             讀寫 + 時間戳 + 離線快取（取代三檔重複的 read/save）
    utils/             escapeHtml、icon、normalizers
  styles/              tokens + 全域樣式（其餘走 Tailwind）
public/                靜態資產（見第 4 節）
```

---

## 7. 分階段計畫（可分段執行）

| 階段 | 內容 | 量級 | 可獨立上線 | 風險 |
|---|---|---|---|---|
| **P0 地基** | 建專案結構、ESLint/Prettier、預覽部署；**圖片分流**（靜態進 `public/`、內容圖上傳 Storage、改存 URL）、瘦身/退場 `site-data.js` | M | ✅ | 低 |
| **P1 CSS 重構** ⭐ | 建 tokens + 元件樣式，逐區塊重寫，消滅 `!important` 與重複選擇器 | **L** | ✅（分區塊） | 中（視覺回歸） |
| **P2 核心抽象層** | 抽出共用 `store/utils/icon`（同步後端的基礎） | M | ✅ | 低 |
| **P3 首頁** | `script.js` → render 模組/元件，展開壓縮行、正名 | M | ✅ | 低～中 |
| **P4 後台** ⭐ | `admin.js` 拆：各區塊表單／版本系統／圖片裁切／資料寫入 | **L** | ✅ | 中～高 |
| **P5 笑一下頁** | `smile.js` 拆：迷因/Giphy、P coin、反應、上傳裁切、推薦連結 | M | ✅ | 中 |
| **P6 收尾切換** | 跨裝置/瀏覽器測試、與舊站視覺比對、刪死碼、README、正式切換 | M | — | 中 |
| **P7 雲端同步**（選配） | 後台存檔即寫 Supabase、全裝置即時同步、移除手動 site-data.js 流程 | M | ✅ | 中 |

⭐ = 高價值高工時（CSS 與後台）。
**總量級：約 6～9 個專注工作天**；建議每階段用一段新鮮額度執行，不要一次做完。

---

## 8. 風險控管原則
- **舊站不停機**：每階段分支 + 預覽部署驗證，OK 才併 `main`。
- **平行重建 CSS**：P1 不直接改舊檔，新樣式建好逐區塊對照舊站視覺。
- **後台最謹慎**：P4 動到資料儲存/版本回復，需對照測試清單。
- **每階段獨立可回退**，中途停下不壞站。

---

## 9. 待你決定
1. 框架：**Next.js**（推薦，最利交接）還是 **Astro**（更輕、貼近現有靜態站）？
2. 樣式：**Tailwind**（推薦）還是 CSS Modules（較保守）？
3. **P7 雲端同步**是否納入這次（建議納入，做完 P2 後接最划算）？
4. 執行節奏：是否照 P0 → P1 → … 逐階段，等額度充足再動工？

---

_本文件為規劃藍圖，尚未動工。實作時每階段會再附該階段的詳細工項與測試清單。_
