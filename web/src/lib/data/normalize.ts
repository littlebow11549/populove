import { id } from "@/lib/utils/id";

import { DEFAULTS } from "./defaults";
import type {
  FloatButton,
  ReactionSettings,
  SmileDisplay,
  SmileEntry,
  SmileTag,
} from "./types";

const LEGACY_SMILE_IMAGE = "media.giphy.com/media/111ebonMs90YLu";
const LEGACY_SMILE_LABELS = [
  "笑一下",
  "你今天\\nPopulove\\n了沒?",
  "你今天\nPopulove\n了沒?",
];

/** 補齊笑一下入口的缺漏欄位，並汰換舊版預設圖／文字。 */
export function normalizeSmileEntry(entry: Partial<SmileEntry>): SmileEntry {
  const image =
    !entry.image || entry.image.includes(LEGACY_SMILE_IMAGE)
      ? DEFAULTS.smileEntry.image
      : entry.image;
  const label =
    !entry.label || LEGACY_SMILE_LABELS.includes(entry.label)
      ? DEFAULTS.smileEntry.label
      : entry.label;
  return {
    ...DEFAULTS.smileEntry,
    ...entry,
    label,
    image,
    enabled: entry.enabled !== false,
  };
}

/** 正規化懸浮按鈕：最多 2 個，補齊顏色／隱藏／作用等欄位。 */
export function normalizeFloatButtons(items: unknown): FloatButton[] {
  const list = Array.isArray(items) ? items : [];
  return list.slice(0, 2).map((raw, index) => {
    const item = (raw ?? {}) as Partial<FloatButton>;
    const rawColor = String(item.color ?? "").trim();
    const color = /^#?[0-9a-fA-F]{3,8}$/.test(rawColor)
      ? rawColor.startsWith("#")
        ? rawColor
        : `#${rawColor}`
      : "#ffb12a";
    return {
      id: item.id || `fb-${index + 1}`,
      text: String(item.text ?? "").trim(),
      href: String(item.href ?? "").trim(),
      color,
      hidden: Boolean(item.hidden),
      enabled: item.enabled !== false,
    };
  });
}

/** 依背景色亮度挑選可讀的文字顏色（深底用淺字、淺底用深字）。 */
export function pickTextColor(color: string): string {
  let hex = String(color ?? "")
    .replace("#", "")
    .trim();
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }
  if (hex.length < 6) return "#17110a";
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62 ? "#17110a" : "#fffaf2";
}

/** 過濾沒有名稱的笑一下類別，並重新編號排序。 */
export function normalizeSmileTags(items: unknown): SmileTag[] {
  const list = Array.isArray(items) ? items : [];
  return list
    .map((raw) => (raw ?? {}) as Partial<SmileTag>)
    .filter((item) => Boolean(item.label))
    .map((item, index) => ({
      id: item.id || id("smile-tag"),
      label: String(item.label).trim(),
      query: String(item.query ?? "").trim(),
      sort: index,
    }));
}

/** 補齊笑一下顯示開關的缺漏欄位。 */
export function normalizeSmileDisplay(
  data: Partial<SmileDisplay> | null | undefined,
): SmileDisplay {
  return { ...DEFAULTS.smileDisplay, ...(data ?? {}) };
}

/** 補齊反應顯示設定；「Populove!!!」永遠顯示。 */
export function normalizeReactionSettings(
  data: Partial<ReactionSettings> | null | undefined,
): ReactionSettings {
  const visible = {
    ...DEFAULTS.reactionSettings.visible,
    ...(data?.visible ?? {}),
  };
  visible["Populove!!!"] = true;
  return { visible };
}
