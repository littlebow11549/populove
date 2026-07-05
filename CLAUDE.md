# 專案部署規則（重要）

> 2026-06 起，正式站已換成全新 Next.js 版（原始碼在 `web/`）。
> 舊的純靜態站（repo 根目錄的 index.html / script.js / styles.css / site-data.js）
> 已退役，僅保留於備份分支 `backup/production-20260620` 供回復參考。

## 現在的架構
- 正式站程式：`web/`（Next.js 16 + TypeScript + Tailwind，SSR）。
- 內容資料：存在 **Supabase**（雲端），前台 SSR 直接讀、後台存檔即時寫。
  不再使用 localStorage / site-data.js。不論在哪台裝置更新，皆以最新時間為準同步。
- 工作分支：`claude/great-bohr-qvll4a`（日常開發都在這條，不需要合併回 `main`）。

## 上線規則（直接在正式站維護）
- **預設：改完直接上正式**——在 `web/` 改好後，用「本機 build＋上傳成品」的方式部署到正式站。
- 正式站 **不靠 git 自動建置**（Netlify 已設 `stop_builds`），所以**推到 `main` 不會自動部署**，
  也因此舊站不會被誤推回來。部署一律走下面的指令。
- 不另設預覽／測試站；如未來需要再臨時建立。
- 破壞性或大範圍改動仍建議先口頭確認。

## 部署方式（Netlify CLI，成品上傳）
- 為什麼不用雲端 build：此 pnpm 專案在 Netlify 雲端 build 會踩到 @netlify/plugin-nextjs
  的相依複製問題，因此改為在本機 build 好再上傳，穩定可靠。
- 需要 `NETLIFY_AUTH_TOKEN`（Netlify 個人存取權杖）。
- 正式站 site id：`6aedbfa9-27a8-42cc-8414-fbba0176f331`（網域 populove.org）。
- 在 `web/` 目錄執行：
  ```bash
  NETLIFY_AUTH_TOKEN=<token> netlify deploy --build --prod \
    --site 6aedbfa9-27a8-42cc-8414-fbba0176f331
  ```
- 正式站需設定的環境變數（Netlify 後台）：
  `NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`、
  `SUPABASE_SECRET_KEY`（密）、`ADMIN_SESSION_SECRET`（密）。
- 金鑰只放 `web/.env.local`（已 gitignore）與 Netlify 環境變數，切勿提交進版控。
- **部署後必做驗證**：`curl -s https://populove.org/api/health` 必須回 `{"ok":true,...}`。
  回 false 表示伺服器連不上雲端內容庫（多半是環境變數缺漏），視同部署失敗。
- 防呆機制（2026-07-05 事故後加入，勿移除）：
  - `web/scripts/check-env.mjs`：正式建置缺必要環境變數會直接中止。
  - `/api/health`：健康檢查端點；後台右上角的雲端狀態指示燈也讀這裡。
  - 後台存檔若未成功寫入雲端，畫面會跳紅色警示（絕不沉默失敗）。
  - Netlify 的 git 自動建置已停用（stop_builds），推 git 不會觸發部署，請勿重新開啟。

## 開發守則
- 進 `web/` 後，提交前需通過：`pnpm lint`、`pnpm build`（必要時 `pnpm check`）。
- 後台登入沿用既有帳密；登入後可在「網站設定後台」編輯內容，存檔即同步雲端。

## 回復舊站（萬一需要）
- 程式：備份分支 `backup/production-20260620`。
- 部署：Netlify 正式站的部署紀錄可一鍵 rollback 回切換前的舊版。
