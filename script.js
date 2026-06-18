const STORAGE = {
  products: "populoveProducts",
  banners: "populoveBanners",
  contact: "populoveContactInfo",
  contactCards: "populoveContactCards",
  flow: "populoveOrderFlow",
  smile: "populoveSmileEntry",
  promos: "populovePromoLinks",
  categories: "populoveProductCategories"
};
const PUBLISHED_VERSION_KEY = "populovePublishedVersionSite";
const slideDuration = 5200;
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const categoryToggle = document.querySelector("#categoryToggle");
const categoryMobileToggle = document.querySelector("#categoryMobileToggle");
const categoryPanel = document.querySelector("#categoryPanel");
const quoteForm = document.querySelector("#quoteForm");
const formResult = document.querySelector("#formResult");
const heroSlider = document.querySelector("#heroSlider");
const sliderControls = document.querySelector("#sliderControls");
const contactTopbar = document.querySelector("#contactTopbar");
const contactGrid = document.querySelector("#contactGrid");
const flowGrid = document.querySelector("#flowGrid");
const productCarousel = document.querySelector("#productCarousel");
const productPrev = document.querySelector("[data-product-prev]");
const productNext = document.querySelector("[data-product-next]");
const categoryStrip = document.querySelector(".category-strip");
let slides = [];
let slideButtons = [];
let currentSlide = 0;
let slideTimer;

const defaultProducts = [
  { id: "p1", name: "頂級柔棉成人 T 恤", image: "assets/product-blank-white-tshirt.png" },
  { id: "p2", name: "寬版落肩 T 恤", image: "assets/product-blank-white-tshirt.png" },
  { id: "p3", name: "重磅口袋 T 恤", image: "assets/product-blank-white-tshirt.png" },
  { id: "p4", name: "抗 UV 機能 T 恤", image: "assets/product-blank-white-tshirt.png" },
  { id: "p5", name: "精梳棉短袖 POLO 衫", image: "assets/product-blank-white-tshirt.png" },
  { id: "p6", name: "刷毛帽 T", image: "assets/product-blank-white-tshirt.png" },
  { id: "p7", name: "連帽拉鍊外套", image: "assets/product-blank-white-tshirt.png" },
  { id: "p8", name: "掛脖帆布工作圍裙", image: "assets/product-blank-white-tshirt.png" },
  { id: "p9", name: "棉質老帽", image: "assets/product-blank-white-tshirt.png" },
  { id: "p10", name: "帆布托特包", image: "assets/product-blank-white-tshirt.png" }
];
const defaultCategories = [
  { id: "cat-tee", label: "T恤", href: "#products", icon: "i-shirt", description: "短袖、重磅、機能款" },
  { id: "cat-polo-short", label: "短袖POLO衫", href: "#products", icon: "i-polo", description: "企業制服與活動服" },
  { id: "cat-polo-long", label: "長袖POLO衫", href: "#products", icon: "i-polo", description: "長袖工作與團體款" },
  { id: "cat-hoodie", label: "連帽上衣", href: "#products", icon: "i-hoodie", description: "帽 T、刷毛款" },
  { id: "cat-jacket", label: "外套", href: "#products", icon: "i-jacket", description: "拉鍊外套與薄外套" },
  { id: "cat-sweatshirt", label: "大學T", href: "#products", icon: "i-sweatshirt", description: "秋冬團體服" },
  { id: "cat-apron", label: "圍裙", href: "#products", icon: "i-apron", description: "餐飲與工作圍裙" },
  { id: "cat-shirt", label: "襯衫", href: "#products", icon: "i-collar", description: "制服與正式款" },
  { id: "cat-pants", label: "褲子", href: "#products", icon: "i-pants", description: "團體褲款" },
  { id: "cat-cap", label: "帽子", href: "#products", icon: "i-cap", description: "老帽與活動帽" },
  { id: "cat-vest", label: "背心", href: "#products", icon: "i-vest", description: "活動背心" },
  { id: "cat-kids", label: "兒童專區", href: "#products", icon: "i-kids", description: "兒童尺寸與班服" },
  { id: "cat-bag", label: "袋子", href: "#products", icon: "i-bag", description: "托特包與周邊袋" },
  { id: "cat-cup", label: "杯子", href: "#products", icon: "i-cup", description: "杯款與品牌周邊" }
];
const defaultBanners = [
  { id: "b1", image: "assets/hero-teamwear.png", label: "客製化團體服專門店", title: "把團隊的樣子，做成每個人都想穿的衣服。", text: "企業制服、班服、活動服、品牌周邊，一對一整理款式與報價。", primary: true },
  { id: "b2", image: "assets/banner-populove-fashion.png", label: "Fashion Teamwear", title: "多色團體服，讓每個團隊都有自己的色號。", text: "T 恤、POLO、帽 T、外套與周邊品項，依照用途挑選最適合的款式。" },
  { id: "b3", image: "assets/banner-corporate-uniform.png", label: "Corporate Uniform", title: "專業制服生產，讓品牌形象更一致。", text: "企業 POLO、門市制服、展場工作服，印刷、刺繡與配色一次整理。" },
  { id: "b4", image: "assets/banner-event-teamwear.png", label: "Event & Class Shirts", title: "一件也能開始，少量客製更簡單。", text: "來圖訂製、少量印刷、活動快閃商品，協助你把想法做成可穿的成品。" }
];
const defaultContact = { line: "derrick00", phone: "02-8953-0680", email: "derrick.populove@gmail.com", hours: "週一至週五 10:00-18:00" };
const defaultSmileEntry = { label: "進來\n笑一下", href: "smile.html", image: "assets/populove-bear-icon.svg" };
const defaultPromoLinks = [
  { title: "奇幻角色生成器", href: "https://character-prompt-generator.netlify.app/", enabled: true },
  { title: "翊軒酒莊", href: "https://godenwine.com/", enabled: true },
  { title: "", href: "", enabled: false }
];
const defaultContactCards = [
  { id: "c1", icon: "i-message", title: "LINE 線上諮詢", text: "derrick00", href: "https://line.me/ti/p/~derrick00" },
  { id: "c2", icon: "i-phone", title: "專人專線", text: "02-8953-0680\n週一至週五 10:00-18:00", href: "tel:0289530680" },
  { id: "c3", icon: "i-mail", title: "客服信箱", text: "derrick.populove@gmail.com\n週一至週五 10:00-18:00", href: "mailto:derrick.populove@gmail.com" }
];
const defaultFlow = [
  { id: "f1", icon: "i-search", title: "挑選產品", text: "確認款式、尺寸、顏色、布料與穿著情境。", href: "#products", link: "商品一覽" },
  { id: "f2", icon: "i-message", title: "討論細節", text: "整理印刷位置、圖稿尺寸、加工方式與交期。", href: "#process-detail", link: "加工說明" },
  { id: "f3", icon: "i-clipboard", title: "確認訂單", text: "提供示意圖與明細，確認後安排製作。", href: "#estimate", link: "填寫需求" },
  { id: "f4", icon: "i-card", title: "支付款項", text: "確認訂金或尾款方式，保留生產排程。", href: "#estimate", link: "費用估算" },
  { id: "f5", icon: "i-truck", title: "製作出貨", text: "完成品檢後寄出，也可依需求預約取件。", href: "#contact", link: "訂單查詢" }
];
const iconChoices = new Set(["i-home","i-grid","i-calculator","i-wrench","i-info","i-message","i-phone","i-mail","i-clock","i-shirt","i-polo","i-hoodie","i-jacket","i-sweatshirt","i-apron","i-collar","i-pants","i-cap","i-vest","i-kids","i-bag","i-cup","i-search","i-clipboard","i-settings","i-card","i-truck","i-layers","i-spark","i-flame","i-needle","i-hash","i-user","i-note","i-arrow"]);

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[char]));
}
function publishedTime(key) { return Number(window.POPULOVE_SITE_DATA?.__meta?.[key]?.updatedAt || 0); }
function localTime(key) { return Number(localStorage.getItem(`${key}UpdatedAt`) || 0); }
function publishedSiteVersion() {
  const meta = window.POPULOVE_SITE_DATA?.__meta || {};
  const times = Object.values(meta).map((item) => Number(item?.updatedAt || 0)).filter(Boolean);
  return Number(meta.siteVersion || Math.max(0, ...times));
}
function syncPublishedData(keys) {
  try {
    const version = publishedSiteVersion();
    if (!version || Number(localStorage.getItem(PUBLISHED_VERSION_KEY) || 0) >= version) return;
    keys.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(window.POPULOVE_SITE_DATA || {}, key)) {
        try {
          localStorage.setItem(key, JSON.stringify(window.POPULOVE_SITE_DATA[key]));
          localStorage.setItem(`${key}UpdatedAt`, String(publishedTime(key) || version));
        } catch (error) {}
      }
    });
    try { localStorage.setItem(PUBLISHED_VERSION_KEY, String(version)); } catch (error) {}
  } catch (error) {}
}
function readData(key, fallback) {
  let data = null;
  try { data = JSON.parse(localStorage.getItem(key) || "null"); } catch (error) {}
  const published = window.POPULOVE_SITE_DATA?.[key];
  if (published && publishedTime(key) > localTime(key)) {
    try { localStorage.setItem(key, JSON.stringify(published)); localStorage.setItem(`${key}UpdatedAt`, String(publishedTime(key))); } catch (error) {}
    return Array.isArray(fallback) ? published : { ...fallback, ...published };
  }
  if (Array.isArray(fallback) && Array.isArray(data)) return data;
  if (!Array.isArray(fallback) && data && typeof data === "object") return data;
  if (Array.isArray(fallback)) return Array.isArray(published) && published.length ? published : fallback;
  return published && typeof published === "object" ? published : fallback;
}
syncPublishedData(Object.values(STORAGE));
function lineUrl(line) { return `https://line.me/ti/p/~${encodeURIComponent(line || defaultContact.line)}`; }
function phoneHref(phone) { return `tel:${String(phone || "").replace(/[^0-9]/g, "")}`; }
function normalizeIcon(value, fallback = "i-message") {
  const icon = String(value || "").trim();
  return iconChoices.has(icon) ? icon : fallback;
}

function renderContactInfo() {
  const contact = readData(STORAGE.contact, defaultContact);
  if (contactTopbar) {
    contactTopbar.innerHTML = `
      <a href="${lineUrl(contact.line)}" target="_blank" rel="noopener"><svg class="icon"><use href="#i-message"></use></svg>LINE：${escapeHtml(contact.line)}</a>
      <span><svg class="icon"><use href="#i-clock"></use></svg>${escapeHtml(contact.hours)}</span>
      <a href="${phoneHref(contact.phone)}"><svg class="icon"><use href="#i-phone"></use></svg>${escapeHtml(contact.phone)}</a>
      <a href="mailto:${escapeHtml(contact.email)}"><svg class="icon"><use href="#i-mail"></use></svg>${escapeHtml(contact.email)}</a>`;
  }
  document.querySelectorAll('a[href^="https://line.me/ti/p/~"]').forEach((link) => link.href = lineUrl(contact.line));
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => { if (link.classList.contains("line-float")) return; link.href = `mailto:${contact.email}`; });
  const lineFloat = document.querySelector(".line-float");
  if (lineFloat) lineFloat.href = lineUrl(contact.line);
}

function bannerTitleHtml(title, title2) {
  const line1 = String(title || "");
  const line2 = String(title2 || "").trim();
  if (line2) {
    return `${escapeHtml(line1.trim())}<br>${escapeHtml(line2)}`;
  }
  if (/[|｜]/.test(line1)) {
    return line1.split(/[|｜]/).map((part) => escapeHtml(part.trim())).filter(Boolean).join("<br>");
  }
  return escapeHtml(line1).replace(/([，、；,])/, "$1<br>");
}
function renderBanners() {
  if (!heroSlider || !sliderControls) return;
  const banners = readData(STORAGE.banners, defaultBanners);
  heroSlider.querySelectorAll(".hero-slide").forEach((slide) => slide.remove());
  banners.forEach((banner, index) => {
    const article = document.createElement("article");
    article.className = `hero-slide${index === 0 ? " is-active" : ""}`;
    article.innerHTML = `
      <img src="${escapeHtml(banner.image)}" alt="${escapeHtml(`${banner.title || ""} ${banner.title2 || ""}`.replace(/[|｜]/g, " ").trim())}">
      <div class="slide-copy">
        <p>${escapeHtml(banner.label)}</p>
        <${index === 0 ? "h1" : "h2"}>${bannerTitleHtml(banner.title, banner.title2)}</${index === 0 ? "h1" : "h2"}>
        <span>${escapeHtml(banner.text)}</span>
        ${index === 0 ? `<div class="slide-actions"><a class="button primary" href="#estimate"><svg class="icon"><use href="#i-calculator"></use></svg>費用估算</a><a class="button light" href="${lineUrl(readData(STORAGE.contact, defaultContact).line)}" target="_blank" rel="noopener"><svg class="icon"><use href="#i-message"></use></svg>LINE 詢價</a></div>` : ""}
      </div>`;
    const copy = article.querySelector(".slide-copy");
    if (copy) {
      if (banner.titleSize) copy.style.setProperty("--hero-title-size", `${Number(banner.titleSize)}px`);
      if (banner.textSize) copy.style.setProperty("--hero-text-size", `${Number(banner.textSize)}px`);
    }
    heroSlider.insertBefore(article, sliderControls);
  });
  sliderControls.innerHTML = banners.map((banner, index) => `<button type="button" data-slide="${index}" class="${index === 0 ? "is-active" : ""}" aria-label="第 ${index + 1} 張 banner"><i></i></button>`).join("");
  slides = [...document.querySelectorAll(".hero-slide")];
  slideButtons = [...document.querySelectorAll("[data-slide]")];
  slideButtons.forEach((button) => button.addEventListener("click", () => { showSlide(Number(button.dataset.slide)); startSlider(); }));
  currentSlide = 0;
}

function renderFlow() {
  if (!flowGrid) return;
  const steps = readData(STORAGE.flow, defaultFlow);
  flowGrid.innerHTML = steps.map((step, index) => `
    <article>
      <span><svg class="icon"><use href="#${escapeHtml(normalizeIcon(step.icon, "i-search"))}"></use></svg>${String(index + 1).padStart(2, "0")}</span>
      <h3>${escapeHtml(step.title)}</h3>
      <p>${escapeHtml(step.text)}</p>
      <a href="${escapeHtml(step.href)}">${escapeHtml(step.link)}<svg class="icon"><use href="#i-arrow"></use></svg></a>
    </article>`).join("");
}

function renderContactCards() {
  if (!contactGrid) return;
  const cards = readData(STORAGE.contactCards, defaultContactCards);
  contactGrid.innerHTML = cards.map((card) => `
    <article>
      <a class="contact-card-link" href="${escapeHtml(card.href)}" ${String(card.href).startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>
        <svg class="card-icon"><use href="#${escapeHtml(normalizeIcon(card.icon, "i-message"))}"></use></svg>
        <strong>${escapeHtml(card.title)}</strong>
        <p>${escapeHtml(card.text).replace(/\n/g, "<br>")}</p>
      </a>
    </article>`).join("");
}


function normalizeSmileEntry(entry) {
  const image = !entry.image || entry.image.includes("media.giphy.com/media/111ebonMs90YLu") ? defaultSmileEntry.image : entry.image;
  const label = !entry.label || ["笑一下", "你今天\\nPopulove\\n了沒?", "你今天\nPopulove\n了沒?"].includes(entry.label) ? defaultSmileEntry.label : entry.label;
  return { ...entry, label, image };
}
function categoryIcon(category) {
  const label = String(category.label || "");
  const explicit = String(category.icon || "").trim();
  const rules = [
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
    [/T恤|T 恤|tee/i, "i-shirt"]
  ];
  if (explicit && explicit !== "i-shirt") return explicit;
  return rules.find(([pattern]) => pattern.test(label))?.[1] || explicit || "i-shirt";
}
function renderSmileEntry() {
  const entry = normalizeSmileEntry(readData(STORAGE.smile, defaultSmileEntry));
  const button = document.querySelector(".smile-float");
  if (!button) return;
  button.href = entry.href || "smile.html";
  button.setAttribute("aria-label", String(entry.label || "進來笑一下").replace(/\n/g, " "));
  button.innerHTML = `<img src="${escapeHtml(entry.image || defaultSmileEntry.image)}" alt="${escapeHtml(String(entry.label || "進來笑一下").replace(/\n/g, " "))}"><span>${escapeHtml(entry.label || "進來笑一下").replace(/\n/g, "")}</span>`;
}
function renderPromoFloat() {
  const button = document.querySelector("#promoFloat");
  const panel = document.querySelector("#promoFloatPanel");
  if (!button || !panel) return;
  const wrap = button.closest(".promo-float-wrap");
  const promos = readData(STORAGE.promos, defaultPromoLinks).slice(0, 3).filter((promo) => promo && promo.enabled !== false && promo.title && promo.href);
  if (!promos.length) {
    document.body.classList.add("is-promo-hidden");
    if (wrap) wrap.hidden = true;
    panel.hidden = true;
    panel.innerHTML = "";
    button.setAttribute("aria-expanded", "false");
    return;
  }
  document.body.classList.remove("is-promo-hidden");
  if (wrap) wrap.hidden = false;
  const linkIcon = `<svg class="promo-link-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/></svg>`;
  panel.innerHTML = promos.map((promo) => `<a href="${escapeHtml(promo.href)}" target="_blank" rel="noopener">${linkIcon}<span>${escapeHtml(promo.title)}</span></a>`).join("");
  if (button.dataset.promoBound === "true") return;
  button.dataset.promoBound = "true";
  button.addEventListener("click", () => {
    const open = panel.hidden;
    panel.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", (event) => {
    if (panel.hidden || event.target.closest(".promo-float-wrap")) return;
    panel.hidden = true;
    button.setAttribute("aria-expanded", "false");
  });
}
function renderProducts() {
  if (!productCarousel) return;
  const products = readData(STORAGE.products, defaultProducts);
  productCarousel.innerHTML = products.map((product) => { const label = product.tagText ? `<span class="product-edge-tag level-${escapeHtml(product.tagLevel || "1")}">${escapeHtml(product.tagText)}</span>` : ""; const price = product.price ? `<p class="product-price">${escapeHtml(product.price)}</p>` : ""; const body = `${label}<div class="product-art"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}"></div><h3>${escapeHtml(product.name)}</h3>${price}`; const href = String(product.href || "").trim(); return href ? `<article><a class="product-card-link" href="${escapeHtml(href)}"${href.startsWith("http") ? ` target="_blank" rel="noopener"` : ""}>${body}</a></article>` : `<article>${body}</article>`; }).join("");
  productCarousel.scrollLeft = 0;
  updateProductArrows();
}
function renderCategories() {
  if (!categoryStrip) return;
  const categories = readData(STORAGE.categories, defaultCategories);
  categoryStrip.innerHTML = categories.map((category) => {
    const href = String(category.href || "#products").trim() || "#products";
    const icon = categoryIcon(category);
    const title = category.description ? ` title="${escapeHtml(category.description)}"` : "";
    return `<a href="${escapeHtml(href)}"${href.startsWith("http") ? ` target="_blank" rel="noopener"` : ""}${title}><svg class="icon"><use href="#${escapeHtml(icon)}"></use></svg>${escapeHtml(category.label || "未命名分類")}</a>`;
  }).join("");
}

function showSlide(index) {
  if (!slides.length) return;
  currentSlide = index;
  slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === index));
  slideButtons.forEach((button, buttonIndex) => button.classList.toggle("is-active", buttonIndex === index));
}
function startSlider() {
  clearInterval(slideTimer);
  if (slides.length <= 1) return;
  startSlider.startedAt = Date.now();
  slideTimer = setInterval(() => showSlide((currentSlide + 1) % slides.length), slideDuration);
}

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
siteNav?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    setCategoryOpen(false);
  }
});
function setCategoryOpen(isOpen) {
  categoryPanel?.classList.toggle("is-open", isOpen);
  categoryToggle?.setAttribute("aria-expanded", String(isOpen));
  categoryMobileToggle?.setAttribute("aria-expanded", String(isOpen));
}
function toggleCategoryPanel() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const isOpen = !categoryPanel?.classList.contains("is-open");
  setCategoryOpen(isOpen);
  siteNav?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
}
categoryToggle?.addEventListener("click", toggleCategoryPanel);
categoryMobileToggle?.addEventListener("click", toggleCategoryPanel);
categoryPanel?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setCategoryOpen(false);
});
quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const contact = readData(STORAGE.contact, defaultContact);
  const data = new FormData(quoteForm);
  const summary = [`品項：${data.get("product")}`, `件數：${data.get("quantity")}`, `加工方式：${data.get("method")}`, `聯絡方式：${data.get("contact")}`, `補充需求：${data.get("message") || "尚未填寫"}`].join("\n");
  formResult.textContent = `已整理好詢價內容：\n${summary}\n\n請把這段內容傳到 LINE：${contact.line}（${lineUrl(contact.line)}），或寄到 ${contact.email}。`;
});
function getProductScrollAmount() {
  const card = productCarousel?.querySelector("article");
  if (!card || !productCarousel) return 0;
  const gap = Number.parseFloat(getComputedStyle(productCarousel).columnGap) || 18;
  return card.getBoundingClientRect().width + gap;
}
function updateProductArrows() {
  if (!productCarousel || !productPrev || !productNext) return;
  const maxScroll = productCarousel.scrollWidth - productCarousel.clientWidth - 2;
  productPrev.disabled = productCarousel.scrollLeft <= 2;
  productNext.disabled = productCarousel.scrollLeft >= maxScroll;
}
productPrev?.addEventListener("click", () => productCarousel?.scrollBy({ left: -getProductScrollAmount(), behavior: "smooth" }));
productNext?.addEventListener("click", () => productCarousel?.scrollBy({ left: getProductScrollAmount(), behavior: "smooth" }));
productCarousel?.addEventListener("scroll", updateProductArrows);
window.addEventListener("resize", updateProductArrows);
window.addEventListener("storage", (event) => {
  if ([STORAGE.products, STORAGE.banners, STORAGE.contact, STORAGE.contactCards, STORAGE.flow, STORAGE.smile, STORAGE.promos, STORAGE.categories].includes(event.key)) location.reload();
});

renderContactInfo();
renderBanners();
renderFlow();
renderContactCards();
renderProducts();
renderCategories();
renderSmileEntry();
renderPromoFloat();
startSlider();














