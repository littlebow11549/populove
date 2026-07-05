/** 全站可用的圖示代碼（沿用舊版 SVG symbol id）。 */
export const ICON_CHOICES = new Set<string>([
  "i-home",
  "i-grid",
  "i-calculator",
  "i-wrench",
  "i-info",
  "i-message",
  "i-phone",
  "i-mail",
  "i-clock",
  "i-shirt",
  "i-polo",
  "i-hoodie",
  "i-jacket",
  "i-sweatshirt",
  "i-apron",
  "i-collar",
  "i-pants",
  "i-cap",
  "i-vest",
  "i-kids",
  "i-bag",
  "i-cup",
  "i-search",
  "i-clipboard",
  "i-settings",
  "i-card",
  "i-truck",
  "i-layers",
  "i-spark",
  "i-flame",
  "i-needle",
  "i-hash",
  "i-user",
  "i-note",
  "i-arrow",
]);

/** 將任意輸入正規化成合法圖示代碼，不合法時回退預設。 */
export function normalizeIcon(
  value: string | undefined | null,
  fallback = "i-message",
): string {
  const icon = String(value ?? "").trim();
  return ICON_CHOICES.has(icon) ? icon : fallback;
}

const CATEGORY_ICON_RULES: ReadonlyArray<readonly [RegExp, string]> = [
  [/POLO/i, "i-polo"],
  [/連帽|帽 T|帽T/i, "i-hoodie"],
  [/外套/i, "i-jacket"],
  [/大學T|大學 T/i, "i-sweatshirt"],
  [/圍裙/i, "i-apron"],
  [/襯衫/i, "i-collar"],
  [/褲/i, "i-pants"],
  [/帽/i, "i-cap"],
  [/背心/i, "i-vest"],
  [/兒童|童/i, "i-kids"],
  [/袋|包/i, "i-bag"],
  [/杯/i, "i-cup"],
  [/T恤|T 恤|tee/i, "i-shirt"],
];

/**
 * 依分類名稱推測圖示：
 * 已明確指定（且非預設 i-shirt）就沿用；否則用名稱關鍵字比對，最後回退 i-shirt。
 */
export function categoryIcon(category: {
  label?: string;
  icon?: string;
}): string {
  const label = String(category.label ?? "");
  const explicit = String(category.icon ?? "").trim();
  if (explicit && explicit !== "i-shirt") return explicit;
  return (
    CATEGORY_ICON_RULES.find(([pattern]) => pattern.test(label))?.[1] ||
    explicit ||
    "i-shirt"
  );
}
