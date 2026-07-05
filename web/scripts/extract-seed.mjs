/**
 * 一次性種子搬移腳本（P2.4）。
 *
 * 從舊站 `site-data.js` 取出實際內容，產出：
 *  - web/public/products/*.jpg   （把 base64 商品圖解碼成檔案）
 *  - web/public/banners/*        （複製 Banner 圖）
 *  - web/public/brand/*          （品牌圖示）
 *  - web/src/lib/data/seed.json  （型別化種子內容，圖片改為公開路徑）
 *
 * 用法：node scripts/extract-seed.mjs
 * 註：這是搬移用的一次性腳本；切換完成後舊站資料移除即可停用。
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../../"); // repo 根目錄（舊站）
const webRoot = resolve(here, ".."); // web/
const publicDir = resolve(webRoot, "public");

function readSiteData() {
  const text = readFileSync(resolve(root, "site-data.js"), "utf8");
  const json = text
    .replace(/^﻿?\s*window\.POPULOVE_SITE_DATA\s*=\s*/, "")
    .replace(/;\s*$/, "");
  return JSON.parse(json);
}

const data = readSiteData();

for (const dir of ["products", "banners", "brand"]) {
  mkdirSync(resolve(publicDir, dir), { recursive: true });
}

// 1) 商品：base64 → 檔案
const products = (data.populoveProducts ?? []).map((product) => {
  const match = String(product.image ?? "").match(
    /^data:image\/(\w+);base64,(.*)$/s,
  );
  if (!match) return product;
  const ext = match[1] === "jpeg" ? "jpg" : match[1];
  const file = `${product.id}.${ext}`;
  writeFileSync(
    resolve(publicDir, "products", file),
    Buffer.from(match[2], "base64"),
  );
  return { ...product, image: `/products/${file}` };
});

// 2) Banner：複製圖檔，路徑改為 /banners/
const banners = (data.populoveBanners ?? []).map((banner) => {
  const src = String(banner.image ?? "");
  const base = src.split("/").pop();
  if (!src.startsWith("assets/") || !base) return banner;
  copyFileSync(
    resolve(root, "assets", base),
    resolve(publicDir, "banners", base),
  );
  return { ...banner, image: `/banners/${base}` };
});

// 3) 品牌圖示
copyFileSync(
  resolve(root, "assets/populove-bear-icon.svg"),
  resolve(publicDir, "brand/populove-bear.svg"),
);
copyFileSync(
  resolve(root, "assets/populove-logo.svg"),
  resolve(publicDir, "brand/populove-logo.svg"),
);

// 4) 笑一下入口（路由改 /smile、圖示改公開路徑）
const smile = data.populoveSmileEntry ?? {};
const smileEntry = {
  label: smile.label || "進來\n笑一下",
  href: "/smile",
  image: "/brand/populove-bear.svg",
  giphyKey: smile.giphyKey || "",
  enabled: true,
};

// 5) 舊推廣連結 → 新懸浮按鈕
const floatColors = ["#ff8a1f", "#7a5cff"];
const floatButtons = (data.populovePromoLinks ?? [])
  .slice(0, 2)
  .map((promo, index) => ({
    id: `fb${index + 1}`,
    text: promo.title || "",
    href: promo.href || "",
    color: floatColors[index] || "#ffb12a",
    hidden: false,
    enabled: true,
  }));

const seed = {
  products,
  banners,
  contact: data.populoveContactInfo,
  contactCards: data.populoveContactCards,
  flow: data.populoveOrderFlow,
  smileEntry,
  floatButtons,
};

writeFileSync(
  resolve(webRoot, "src/lib/data/seed.json"),
  `${JSON.stringify(seed, null, 2)}\n`,
);

console.log("種子已產出：", {
  products: products.length,
  banners: banners.length,
  contactCards: seed.contactCards?.length ?? 0,
  flow: seed.flow?.length ?? 0,
  floatButtons: floatButtons.length,
});
