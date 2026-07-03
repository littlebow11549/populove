# 專案部署規則（重要）

## 操作代辦原則
- 使用者不熟技術操作：凡是需要「教使用者手動操作／設定」的事，一律由 Claude 直接代為執行到完成（用現有工具、API、自動化繞過手動步驟）。
- 只有涉及帳號登入、密碼、2FA 等本人才能做的事才請使用者操作，且要同時提供不需該步驟的替代方案。

## 上線規則
- **預設：改完直接上正式**——把改動合併進 `main` 並 push（`main` 會自動部署到正式站 populove.org）。
- **例外：只有當使用者明確說「先看測試頁」（或「先看預覽 / 先別上正式」）時**，才只推到工作分支、更新預覽網址，**不要**合併到 `main`。
- 破壞性或大範圍改動仍建議先口頭確認，但一般改動依預設直接上正式即可。

## 分支與網址
- 工作分支：`claude/fervent-einstein-niwj1m`
- 預覽網址：https://claude-fervent-einstein-niwj1m--populove.netlify.app
- 正式站：https://populove.org（Netlify 接 GitHub `main`，push 後自動部署）

## 內容資料 vs 程式
- 程式/版型改動：合併進 `main` 即生效。
- 後台輸入的內容（banner 文字、字級、商品等）存在使用者瀏覽器 localStorage，需透過後台「下載最新 site-data.js」並更新到正式站才會對所有人生效。
