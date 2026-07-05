import type {
  Banner,
  Category,
  CoinSettings,
  ContactCard,
  ContactInfo,
  CustomMeme,
  FloatButton,
  FlowStep,
  Product,
  ReactionSettings,
  SmileDisplay,
  SmileEntry,
  SmileTag,
} from "./types";

/**
 * 各資料區塊對應的 localStorage 鍵名。
 *
 * 刻意沿用舊版 `populove*` 鍵名，讓既有瀏覽器資料能無痛沿用，
 * 日後接 Supabase 時也用同一組邏輯鍵。
 */
export const STORAGE_KEYS = {
  products: "populoveProducts",
  categories: "populoveProductCategories",
  banners: "populoveBanners",
  contact: "populoveContactInfo",
  contactCards: "populoveContactCards",
  flow: "populoveOrderFlow",
  smileEntry: "populoveSmileEntry",
  floatButtons: "populoveFloatButtons",
  smileTags: "populoveSmileTags",
  smileDisplay: "populoveSmileDisplaySettings",
  reactionSettings: "populoveSmileReactionSettings",
  coinSettings: "populoveCoinSettings",
  customMemes: "populoveCustomMemes",
} as const;

/** 邏輯資料鍵（如 `products`、`banners`）。 */
export type DataKey = keyof typeof STORAGE_KEYS;

/** 每個資料鍵對應的值型別。 */
export interface DataSchema {
  products: Product[];
  categories: Category[];
  banners: Banner[];
  contact: ContactInfo;
  contactCards: ContactCard[];
  flow: FlowStep[];
  smileEntry: SmileEntry;
  floatButtons: FloatButton[];
  smileTags: SmileTag[];
  smileDisplay: SmileDisplay;
  reactionSettings: ReactionSettings;
  coinSettings: CoinSettings;
  customMemes: CustomMeme[];
}
