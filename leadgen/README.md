# 每日自動獲客名單(團體製服)

每天台北時間 **09:23** 自動執行,從政府公司登記公開資料找出 **50 家**潛在客戶、
評估產業與製服需求、產出**攻略法**,並篩出**10 通重點電話**,
寄到 **derrickj.populove@gmail.com** 與 **derrick.populove@gmail.com**。

## 運作方式(零 AI token 成本)

| 步驟 | 說明 |
|---|---|
| 1. 抓名單 | 經濟部商工開放資料:「公司**設立**登記清冊」(新創)+「公司**變更**登記清冊」(資本額 800 萬~5 億的活躍中型企業) |
| 2. 每日輪動 | 依當天日期取不同片段(新創 70 + 中型 60),當月內不重複 |
| 3. 補電話 | 逐家到台灣公司網(twincn)查公開電話與「營業項目」 |
| 4. 評分 | 規則引擎:產業製服需求權重(保全 40、餐飲 38、工程 36…)+ 有電話 +15 + 新創 +12 |
| 5. 產出 | 50 家完整名單(CSV 附件)+ 10 家重點卡片(電話、需求品項、攻略話術) |

執行平台是 GitHub Actions(免費額度內,每天約 5 分鐘),**不經過任何 AI API**。

## 🔒 隱私保護(重要)

客戶名單屬營業資料,**workflow 內建安全鎖:偵測到 repo 是公開狀態時,
不會產生、也不會發佈任何名單**(Issue、Artifact、log 都不會有客戶資料)。
啟用整套系統前,請先把 repo 改成 Private:
**GitHub repo → Settings → 最下方 Danger Zone → Change visibility → Make private**。
改完後隔天起自動恢復正常運作,Netlify 部署不受影響。

## 報告怎麼收(免設定,已自動生效)

每天執行完會自動在 repo 開一則 **GitHub Issue**(標題:👔 每日獲客名單 YYYY-MM-DD)
並指派給 repo 擁有者,GitHub 會**自動發通知信**到你 GitHub 帳號的信箱,
手機 GitHub App 也會推播。完整 CSV 在 Actions 的 Artifact 可下載。

## (可選)直接寄 Email 到 derrickj.populove@gmail.com、derrick.populove@gmail.com

想要正式的 Email 報告(HTML 精美版 + CSV 附件直接進信箱),需要一組
Gmail 應用程式密碼——這一步涉及 Google 帳號登入,只能由本人操作:

1. 用 `littlebow11549@gmail.com`(或任何 Gmail)開啟兩步驟驗證:
   https://myaccount.google.com/security
2. 建立「應用程式密碼」:https://myaccount.google.com/apppasswords
   (名稱隨意,例如 `populove-leads`,會得到 16 碼密碼)
3. 到 GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**,新增兩個:
   - `MAIL_USERNAME`:你的 Gmail 地址
   - `MAIL_APP_PASSWORD`:剛才的 16 碼密碼
4. 到 **Actions → 每日獲客名單 → Run workflow** 手動跑一次確認收到信。

未設定 secrets 時,排程照常執行:Issue 通知 + Artifact 都有,只是不走 Email。

## 手動執行 / 本機測試

```bash
cd leadgen
python3 daily_leads.py          # 報告輸出到 leadgen/out/
```

## 注意事項

- **公司登記資料依法不含電話**:新創公司多數尚無公開電話,報告會附
  台灣公司網 / 商工登記 / Google 一鍵查詢連結;中型企業電話命中率較高。
- 收件人改在 `.github/workflows/daily-leads.yml` 的 `LEADS_TO_EMAIL`。
- GitHub 對超過 60 天沒有任何 commit 的 repo 會暫停排程,
  收到 GitHub 的停用通知信時到 Actions 頁按一下重新啟用即可。
- 調整產業關鍵字、需求品項、攻略話術:編輯 `leadgen/industry_rules.py`。
- 調整每日數量:`daily_leads.py` 開頭的 `NEW_PER_DAY / CHG_PER_DAY / FINAL_COUNT / TOP_COUNT`。
