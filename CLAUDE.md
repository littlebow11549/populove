# 專案部署規則（重要）

## 上線規則
- **預設只推到工作分支**，更新預覽網址，**絕不自動部署到正式站**。
- **只有當使用者明確說「上正式」「上線」「更新正式」時**，才可以把改動合併進 `main` 並 push（`main` 會自動部署到正式站 populove.org）。
- 沒有明確指令前，不得合併到 `main`、不得更新 populove.org。

## 分支與網址
- 工作分支：`claude/fervent-einstein-niwj1m`
- 預覽網址：https://claude-fervent-einstein-niwj1m--populove.netlify.app
- 正式站：https://populove.org（Netlify 接 GitHub `main`，push 後自動部署）

## 內容資料 vs 程式
- 程式/版型改動：合併進 `main` 即生效。
- 後台輸入的內容（banner 文字、字級、商品等）存在使用者瀏覽器 localStorage，需透過後台「下載最新 site-data.js」並更新到正式站才會對所有人生效。
