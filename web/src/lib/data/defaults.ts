import type { DataSchema } from "./keys";

/**
 * 各資料區塊的預設值（當瀏覽器尚無資料時使用）。
 *
 * 內容沿用舊版預設。圖片暫用 public/placeholders 佔位路徑；
 * 正式內容與圖片會在 P2.4（種子資料搬移）從現有站台導入。
 */

const PRODUCT_PLACEHOLDER = "/placeholders/product.png";
const BANNER_PLACEHOLDER = "/placeholders/banner.png";
const SMILE_ICON = "/brand/populove-bear.svg";

export const DEFAULTS = {
  products: [
    { id: "p1", name: "頂級柔棉成人 T 恤", image: PRODUCT_PLACEHOLDER },
    { id: "p2", name: "寬版落肩 T 恤", image: PRODUCT_PLACEHOLDER },
    { id: "p3", name: "重磅口袋 T 恤", image: PRODUCT_PLACEHOLDER },
    { id: "p4", name: "抗 UV 機能 T 恤", image: PRODUCT_PLACEHOLDER },
    { id: "p5", name: "精梳棉短袖 POLO 衫", image: PRODUCT_PLACEHOLDER },
    { id: "p6", name: "刷毛帽 T", image: PRODUCT_PLACEHOLDER },
    { id: "p7", name: "連帽拉鍊外套", image: PRODUCT_PLACEHOLDER },
    { id: "p8", name: "掛脖帆布工作圍裙", image: PRODUCT_PLACEHOLDER },
    { id: "p9", name: "棉質老帽", image: PRODUCT_PLACEHOLDER },
    { id: "p10", name: "帆布托特包", image: PRODUCT_PLACEHOLDER },
  ],
  categories: [
    {
      id: "cat-tee",
      label: "T恤",
      href: "#products",
      icon: "i-shirt",
      description: "短袖、重磅、機能款",
    },
    {
      id: "cat-polo-short",
      label: "短袖POLO衫",
      href: "#products",
      icon: "i-polo",
      description: "企業制服與活動服",
    },
    {
      id: "cat-polo-long",
      label: "長袖POLO衫",
      href: "#products",
      icon: "i-polo",
      description: "長袖工作與團體款",
    },
    {
      id: "cat-hoodie",
      label: "連帽上衣",
      href: "#products",
      icon: "i-hoodie",
      description: "帽 T、刷毛款",
    },
    {
      id: "cat-jacket",
      label: "外套",
      href: "#products",
      icon: "i-jacket",
      description: "拉鍊外套與薄外套",
    },
    {
      id: "cat-sweatshirt",
      label: "大學T",
      href: "#products",
      icon: "i-sweatshirt",
      description: "秋冬團體服",
    },
    {
      id: "cat-apron",
      label: "圍裙",
      href: "#products",
      icon: "i-apron",
      description: "餐飲與工作圍裙",
    },
    {
      id: "cat-shirt",
      label: "襯衫",
      href: "#products",
      icon: "i-collar",
      description: "制服與正式款",
    },
    {
      id: "cat-pants",
      label: "褲子",
      href: "#products",
      icon: "i-pants",
      description: "團體褲款",
    },
    {
      id: "cat-cap",
      label: "帽子",
      href: "#products",
      icon: "i-cap",
      description: "老帽與活動帽",
    },
    {
      id: "cat-vest",
      label: "背心",
      href: "#products",
      icon: "i-vest",
      description: "活動背心",
    },
    {
      id: "cat-kids",
      label: "兒童專區",
      href: "#products",
      icon: "i-kids",
      description: "兒童尺寸與班服",
    },
    {
      id: "cat-bag",
      label: "袋子",
      href: "#products",
      icon: "i-bag",
      description: "托特包與周邊袋",
    },
    {
      id: "cat-cup",
      label: "杯子",
      href: "#products",
      icon: "i-cup",
      description: "杯款與品牌周邊",
    },
  ],
  banners: [
    {
      id: "b1",
      image: BANNER_PLACEHOLDER,
      label: "客製化團體服專門店",
      title: "把團隊的樣子，做成每個人都想穿的衣服。",
      text: "企業制服、班服、活動服、品牌周邊，一對一整理款式與報價。",
      primary: true,
    },
    {
      id: "b2",
      image: BANNER_PLACEHOLDER,
      label: "Fashion Teamwear",
      title: "多色團體服，讓每個團隊都有自己的色號。",
      text: "T 恤、POLO、帽 T、外套與周邊品項，依照用途挑選最適合的款式。",
    },
    {
      id: "b3",
      image: BANNER_PLACEHOLDER,
      label: "Corporate Uniform",
      title: "專業制服生產，讓品牌形象更一致。",
      text: "企業 POLO、門市制服、展場工作服，印刷、刺繡與配色一次整理。",
    },
    {
      id: "b4",
      image: BANNER_PLACEHOLDER,
      label: "Event & Class Shirts",
      title: "一件也能開始，少量客製更簡單。",
      text: "來圖訂製、少量印刷、活動快閃商品，協助你把想法做成可穿的成品。",
    },
  ],
  contact: {
    line: "derrick00",
    phone: "02-8953-0680",
    email: "derrick.populove@gmail.com",
    hours: "週一至週五 10:00-18:00",
  },
  contactCards: [
    {
      id: "c1",
      icon: "i-message",
      title: "LINE 線上諮詢",
      text: "derrick00",
      href: "https://line.me/ti/p/~derrick00",
    },
    {
      id: "c2",
      icon: "i-phone",
      title: "專人專線",
      text: "02-8953-0680\n週一至週五 10:00-18:00",
      href: "tel:0289530680",
    },
    {
      id: "c3",
      icon: "i-mail",
      title: "客服信箱",
      text: "derrick.populove@gmail.com\n週一至週五 10:00-18:00",
      href: "mailto:derrick.populove@gmail.com",
    },
  ],
  flow: [
    {
      id: "f1",
      icon: "i-search",
      title: "挑選產品",
      text: "確認款式、尺寸、顏色、布料與穿著情境。",
      href: "#products",
      link: "商品一覽",
    },
    {
      id: "f2",
      icon: "i-message",
      title: "討論細節",
      text: "整理印刷位置、圖稿尺寸、加工方式與交期。",
      href: "#process-detail",
      link: "加工說明",
    },
    {
      id: "f3",
      icon: "i-clipboard",
      title: "確認訂單",
      text: "提供示意圖與明細，確認後安排製作。",
      href: "#estimate",
      link: "填寫需求",
    },
    {
      id: "f4",
      icon: "i-card",
      title: "支付款項",
      text: "確認訂金或尾款方式，保留生產排程。",
      href: "#estimate",
      link: "費用估算",
    },
    {
      id: "f5",
      icon: "i-truck",
      title: "製作出貨",
      text: "完成品檢後寄出，也可依需求預約取件。",
      href: "#contact",
      link: "訂單查詢",
    },
  ],
  // href 採新版路由 /smile；舊資料的 smile.html 會在 P2.4 搬移時對應。
  smileEntry: {
    label: "進來\n笑一下",
    href: "/smile",
    image: SMILE_ICON,
    giphyKey: "",
    enabled: true,
  },
  floatButtons: [
    {
      id: "fb1",
      text: "奇幻角色生成器",
      href: "https://character-prompt-generator.netlify.app/",
      color: "#ff8a1f",
      hidden: false,
      enabled: true,
    },
    {
      id: "fb2",
      text: "翊軒酒莊",
      href: "https://godenwine.com/",
      color: "#7a5cff",
      hidden: false,
      enabled: true,
    },
  ],
  smileTags: [],
  smileDisplay: {
    showHotTag: true,
    showPopuloveReaction: true,
    showCoinBadge: true,
  },
  reactionSettings: {
    visible: {
      加油: true,
      還行: true,
      "好~~~": true,
      太強了: true,
      "Populove!!!": true,
    },
  },
  coinSettings: { initialCoins: 100 },
  customMemes: [],
} satisfies DataSchema;
