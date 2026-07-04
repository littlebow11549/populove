# POPULOVE 專案交接文件（完整擁有權移轉）

這份文件給「接手這個網站的新帳號／新負責人」。照著把下面 6 個服務的存取權
拿到手，就能跟前一位一樣：改內容、改程式、部署上正式站、管 SEO。

> 開發／部署的實際指令與規則另見 `CLAUDE.md`。

---

## 這個網站用到的東西（總覽）
- **程式碼**：GitHub 儲存庫 `littlebow11549/populove`，正式站程式在 `web/`（Next.js 16）。
- **主機／網域／部署**：Netlify，站台 `populove`（site id `6aedbfa9-27a8-42cc-8414-fbba0176f331`），網域 `populove.org`（Netlify 管 DNS）。
- **內容資料庫**：Supabase（`https://spcqahagbvctezbwdyxg.supabase.co`）。
- **迷因 GIF**：GIPHY API。
- **SEO**：Google Search Console。
- **網域註冊**：你當初買 `populove.org` 的註冊商。

---

## 交接清單（每項只有原帳號能操作，做完打勾）

### 1) GitHub（程式碼）
- Repo → **Settings → Danger Zone → Transfer ownership** 轉給新帳號，
  或 **Settings → Collaborators** 邀請新帳號共同維護。

### 2) Netlify（部署 / 網域 / DNS）
- **Team settings → Members → 邀請新帳號**（Owner），或把站台移到新帳號的 Team。
- 站台的環境變數（見下方「機密金鑰」）會跟著站台一起帶走。
- 網域 `populove.org` 與 DNS 都在這個 Netlify 團隊。

### 3) Supabase（內容資料庫）
- 專案 → **Settings → Team / Members → 邀請新帳號**（Owner/Admin）。

### 4) GIPHY（GIF 服務）
- 分享 GIPHY 帳號，或新帳號自己申請一把金鑰，貼到
  **後台 → 快捷按鈕設定 → Giphy API Key** 存檔即可。
- （申請正式金鑰的說明也見下方。）

### 5) Google Search Console（SEO）
- **Settings → 使用者和權限 → 新增使用者**，把新帳號加為 **擁有者（Owner）**。

### 6) 網域註冊商
- 到你買 `populove.org` 的註冊商後台，把**網域移轉**給新帳號，或分享登入。
  （DNS 由 Netlify 管，這步是「網域所有權」本身。）

---

## 機密金鑰（新帳號要能開發／部署，一定要拿到）
這些**故意不放進 GitHub**（安全）。值存在兩個地方：
1. `web/.env.local`（本機檔案，已 gitignore）
2. Netlify 站台的 **環境變數**（Site configuration → Environment variables）

需要的變數（值請從上面兩個地方複製，勿提交進版控）：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`（機密）
- `ADMIN_SESSION_SECRET`（機密）

另外：
- **後台登入帳密**：改內容用（`https://populove.org/admin`）。原帳號私下交給新帳號。
- **Netlify 個人存取權杖**：部署用。新帳號到
  `https://app.netlify.com/user/applications#personal-access-tokens` 自己開一把。

---

## 新帳號如何「用 Claude 繼續開發」（做到跟現在一樣）
1. 取得 **GitHub repo 存取權**（上面第 1 項）。
2. 拿到一份 **`web/.env.local`**（上面「機密金鑰」）。
3. 在 Claude（claude.ai/code）連上這個 repo。
4. 開發／部署照 `CLAUDE.md`：
   - 進 `web/`，改完跑 `pnpm lint`、`pnpm build`。
   - 部署（本機 build＋上傳，**不要用 Netlify 雲端 build，會產出壞版本**）：
     ```bash
     NETLIFY_AUTH_TOKEN=<新帳號的token> netlify deploy --build --prod \
       --site 6aedbfa9-27a8-42cc-8414-fbba0176f331
     ```

---

## 只想「改內容」不碰程式的人
完全不用碰上面任何服務——只要 **後台網址＋帳密**：
`https://populove.org/admin` → 登入 → 改 banner／商品／聯絡資訊等 → 存檔即時生效。

---

## 出事時如何回復舊版
- 舊靜態站程式：分支 `backup/production-20260620`。
- Netlify 站台的部署紀錄可一鍵 rollback。
