/**
 * POPULOVE 全站資料型別（單一來源）。
 *
 * 這些型別對應後台可編輯的每一種內容。命名與舊版欄位保持一致，
 * 方便日後從現有 localStorage / site-data.js 直接搬移。
 *
 * 註：版本回復（versionHistory）屬於後台內部機制，將於 P4（後台）處理，
 * 不納入此核心資料層。
 */

/** 商品標籤等級（空字串＝無標籤）。 */
export type TagLevel = "" | "1" | "2" | "3";

export interface Product {
  id: string;
  name: string;
  image: string;
  price?: string;
  href?: string;
  tagLevel?: TagLevel;
  tagText?: string;
}

export interface Category {
  id: string;
  label: string;
  href: string;
  icon: string;
  description?: string;
}

export interface Banner {
  id: string;
  image: string;
  label: string;
  title: string;
  title2?: string;
  text: string;
  /** 主標字級（px）；空字串＝自動。 */
  titleSize?: number | "";
  /** 副標字級（px）；空字串＝自動。 */
  textSize?: number | "";
  primary?: boolean;
}

export interface ContactInfo {
  line: string;
  phone: string;
  email: string;
  hours: string;
}

export interface ContactCard {
  id: string;
  icon: string;
  title: string;
  text: string;
  href: string;
}

export interface FlowStep {
  id: string;
  icon: string;
  title: string;
  text: string;
  href: string;
  link: string;
}

/** 首頁「進來笑一下」懸浮入口設定。 */
export interface SmileEntry {
  label: string;
  href: string;
  image: string;
  giphyKey: string;
  /** 關閉時首頁不顯示笑一下入口。 */
  enabled: boolean;
}

/** 首頁自訂懸浮按鈕（取代舊版推廣按鈕，最多 2 個）。 */
export interface FloatButton {
  id: string;
  /** 連結資訊（顯示文字）。 */
  text: string;
  /** 超連結。 */
  href: string;
  /** 按鈕顏色（hex）。 */
  color: string;
  /** 是否隱藏（不顯示）。 */
  hidden: boolean;
  /** 是否作用（可點擊）。 */
  enabled: boolean;
}

export interface SmileTag {
  id: string;
  label: string;
  query: string;
  sort?: number;
}

export interface SmileDisplay {
  showHotTag: boolean;
  showPopuloveReaction: boolean;
  showCoinBadge: boolean;
}

export interface ReactionSettings {
  /** 反應名稱 → 是否顯示。 */
  visible: Record<string, boolean>;
}

export interface CoinSettings {
  initialCoins: number;
}

export interface CustomMeme {
  id: string;
  tag: string;
  title: string;
  src: string;
  ownerId?: string;
  createdAt?: number;
}
