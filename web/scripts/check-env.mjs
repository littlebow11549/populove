// 建置前檢查必要環境變數。
// 背景：正式站曾因 Netlify 漏設 SUPABASE_SECRET_KEY，部署出一個
// 讀不到雲端內容、後台儲存靜默失敗的「半殘」網站（2026-07-05 事故）。
// 正式建置（Netlify CLI / CI，NETLIFY=true）缺任何一個變數就直接中止；
// 本機開發只警告，不擋 build。
const REQUIRED = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "SUPABASE_SECRET_KEY",
];

const missing = REQUIRED.filter((key) => !process.env[key]);
if (missing.length === 0) {
  console.log("check-env: 必要環境變數齊全 ✓");
  process.exit(0);
}

const strict = process.env.NETLIFY === "true" || process.env.CONTEXT === "production";
const message = `缺少環境變數：${missing.join("、")}`;
if (strict) {
  console.error(`check-env: ${message} — 正式部署必須齊全，拒絕建置。`);
  console.error("check-env: 請到 Netlify 後台（或 netlify env:set）補上後重試。");
  process.exit(1);
}
console.warn(`check-env: 警告 — ${message}（本機開發可忽略；正式部署會強制檢查）`);
