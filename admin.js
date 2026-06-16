const STORAGE = {
  products: "populoveProducts",
  banners: "populoveBanners",
  contact: "populoveContactInfo",
  contactCards: "populoveContactCards",
  flow: "populoveOrderFlow",
  smile: "populoveSmileEntry",
  promos: "populovePromoLinks",
  customMemes: "populoveCustomMemes",
  coinSettings: "populoveCoinSettings",
  reactionSettings: "populoveSmileReactionSettings",
  smileTags: "populoveSmileTags",
  smileDisplay: "populoveSmileDisplaySettings",
  categories: "populoveProductCategories",
  versionSettings: "populoveVersionSettings",
  versionHistory: "populoveVersionHistory"
};
const PUBLISHED_VERSION_KEY = "populovePublishedVersionAdmin";
const ADMIN_SESSION_KEY = "populoveAdminSession";
const ADMIN_MENU_ORDER = ["products", "categories", "banners", "contact", "cards", "flow", "smile", "versions"];
const CONFIGURABLE_REACTIONS = ["加油", "還行", "好~~~", "太強了"];
const VERSION_STORAGE_NAMES = new Set(["versionSettings", "versionHistory"]);
const INITIAL_VERSION_ID = "populove-initial-unset-products";
const INITIAL_VERSION_LABEL = "商品未設定版";
const PRODUCT_LISTED_VERSION_ID = "populove-product-listed-001";
const PRODUCT_LISTED_VERSION_LABEL = "商品上架版001";
const LEGACY_LOCKED_VERSION_ID = "populove-default-v1";
const ADMIN_EMAIL_HASH = "48644a4a6bd69a8d0562fb1ecead56b9542142aa51ece9a384421d8553cf0448";
const ADMIN_PASSWORD_HASH = "246dc3cede600d1f53ac8c9ec791092824b64674d56056397adc87594609b6a5";
const defaultImage = "assets/product-blank-white-tshirt.png";
const defaults = {
  products: [
    { id: "p1", name: "頂級柔棉成人 T 恤", image: defaultImage }, { id: "p2", name: "寬版落肩 T 恤", image: defaultImage }, { id: "p3", name: "重磅口袋 T 恤", image: defaultImage }, { id: "p4", name: "抗 UV 機能 T 恤", image: defaultImage }, { id: "p5", name: "精梳棉短袖 POLO 衫", image: defaultImage }, { id: "p6", name: "刷毛帽 T", image: defaultImage }, { id: "p7", name: "連帽拉鍊外套", image: defaultImage }, { id: "p8", name: "掛脖帆布工作圍裙", image: defaultImage }, { id: "p9", name: "棉質老帽", image: defaultImage }, { id: "p10", name: "帆布托特包", image: defaultImage }
  ],
  categories: [
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
  ],
  banners: [
    { id: "b1", image: "assets/hero-teamwear.png", label: "客製化團體服專門店", title: "把團隊的樣子，做成每個人都想穿的衣服。", text: "企業制服、班服、活動服、品牌周邊，一對一整理款式與報價。" },
    { id: "b2", image: "assets/banner-populove-fashion.png", label: "Fashion Teamwear", title: "多色團體服，讓每個團隊都有自己的色號。", text: "T 恤、POLO、帽 T、外套與周邊品項，依照用途挑選最適合的款式。" },
    { id: "b3", image: "assets/banner-corporate-uniform.png", label: "Corporate Uniform", title: "專業制服生產，讓品牌形象更一致。", text: "企業 POLO、門市制服、展場工作服，印刷、刺繡與配色一次整理。" },
    { id: "b4", image: "assets/banner-event-teamwear.png", label: "Event & Class Shirts", title: "一件也能開始，少量客製更簡單。", text: "來圖訂製、少量印刷、活動快閃商品，協助你把想法做成可穿的成品。" }
  ],
  contact: { line: "derrick00", phone: "02-8953-0680", email: "derrick.populove@gmail.com", hours: "週一至週五 10:00-18:00" },
  contactCards: [
    { id: "c1", icon: "i-message", title: "LINE 線上諮詢", text: "derrick00", href: "https://line.me/ti/p/~derrick00" },
    { id: "c2", icon: "i-phone", title: "專人專線", text: "02-8953-0680\n週一至週五 10:00-18:00", href: "tel:0289530680" },
    { id: "c3", icon: "i-mail", title: "客服信箱", text: "derrick.populove@gmail.com\n週一至週五 10:00-18:00", href: "mailto:derrick.populove@gmail.com" }
  ],
  smile: { label: "進來\n笑一下", href: "smile.html", image: "assets/populove-bear-icon.svg", giphyKey: "" },
  promos: [{ title: "奇幻角色生成器", href: "https://character-prompt-generator.netlify.app/", enabled: true }, { title: "翊軒酒莊", href: "https://godenwine.com/", enabled: true }, { title: "", href: "", enabled: false }],
  customMemes: [],
  coinSettings: { initialCoins: 100 },
  reactionSettings: { visible: { "加油": true, "還行": true, "好~~~": true, "太強了": true, "Populove!!!": true } },
  smileTags: [],
  smileDisplay: { showHotTag: true, showPopuloveReaction: true, showCoinBadge: true },
  versionSettings: { maxVersions: 5 },
  versionHistory: [],
  flow: [
    { id: "f1", icon: "i-search", title: "挑選產品", text: "確認款式、尺寸、顏色、布料與穿著情境。", href: "#products", link: "商品一覽" },
    { id: "f2", icon: "i-message", title: "討論細節", text: "整理印刷位置、圖稿尺寸、加工方式與交期。", href: "#process-detail", link: "加工說明" },
    { id: "f3", icon: "i-clipboard", title: "確認訂單", text: "提供示意圖與明細，確認後安排製作。", href: "#estimate", link: "填寫需求" },
    { id: "f4", icon: "i-card", title: "支付款項", text: "確認訂金或尾款方式，保留生產排程。", href: "#estimate", link: "費用估算" },
    { id: "f5", icon: "i-truck", title: "製作出貨", text: "完成品檢後寄出，也可依需求預約取件。", href: "#contact", link: "訂單查詢" }
  ]
};
const $ = (selector) => document.querySelector(selector);
const loginView = $("#loginView");
const adminView = $("#adminView");
const loginForm = $("#loginForm");
const loginMessage = $("#loginMessage");
const logoutButton = $("#logoutAdmin");
const resetAll = $("#resetAll");
const exportSiteData = $("#exportSiteData");
const passwordToggle = $("#passwordToggle");
let productImage = defaultImage;
let bannerImage = "assets/hero-teamwear.png";
let smileEntryImage = defaults.smile.image;
const ADMIN_IDLE_LIMIT = 3 * 60 * 1000;
let adminIdleTimer;
function refreshAdminIdle(){
  if (sessionStorage.getItem(ADMIN_SESSION_KEY) !== "active") return;
  clearTimeout(adminIdleTimer);
  adminIdleTimer = setTimeout(()=>{sessionStorage.removeItem(ADMIN_SESSION_KEY); setVisible(false); if(loginMessage) loginMessage.textContent="已閒置 3 分鐘，自動登出。";}, ADMIN_IDLE_LIMIT);
}
["click","keydown","input","mousemove","touchstart"].forEach((eventName)=>document.addEventListener(eventName,refreshAdminIdle,{passive:true}));
const cropState = { image: null, zoom: 1, x: 50, y: 50 };
const ICON_CHOICES = new Set(["i-home","i-grid","i-calculator","i-wrench","i-info","i-message","i-phone","i-mail","i-clock","i-shirt","i-polo","i-hoodie","i-jacket","i-sweatshirt","i-apron","i-collar","i-pants","i-cap","i-vest","i-kids","i-bag","i-cup","i-search","i-clipboard","i-settings","i-card","i-truck","i-layers","i-spark","i-flame","i-needle","i-hash","i-user","i-note","i-arrow"]);

function syncAdminMenuOrder(){
  const tabs = document.querySelector(".admin-tabs");
  if(tabs) ADMIN_MENU_ORDER.forEach((name)=>{const tab=tabs.querySelector(`[data-tab="${name}"]`); if(tab) tabs.appendChild(tab);});
  ADMIN_MENU_ORDER.forEach((name)=>{const panel=document.querySelector(`[data-panel="${name}"]`); if(panel) adminView.appendChild(panel);});
}

function sha256(value) {
  const rotateRight = (value, bits) => (value >>> bits) | (value << (32 - bits));
  const k = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
  let h0=0x6a09e667,h1=0xbb67ae85,h2=0x3c6ef372,h3=0xa54ff53a,h4=0x510e527f,h5=0x9b05688c,h6=0x1f83d9ab,h7=0x5be0cd19;
  const bytes = Array.from(new TextEncoder().encode(value));
  const bitLength = bytes.length * 8;
  bytes.push(0x80);
  while ((bytes.length % 64) !== 56) bytes.push(0);
  for (let i = 7; i >= 0; i -= 1) bytes.push((bitLength / Math.pow(2, i * 8)) & 0xff);
  for (let chunk=0; chunk<bytes.length; chunk+=64) {
    const w = new Array(64).fill(0);
    for (let i=0;i<16;i+=1){const o=chunk+i*4; w[i]=((bytes[o]<<24)|(bytes[o+1]<<16)|(bytes[o+2]<<8)|bytes[o+3])>>>0;}
    for (let i=16;i<64;i+=1){const s0=rotateRight(w[i-15],7)^rotateRight(w[i-15],18)^(w[i-15]>>>3); const s1=rotateRight(w[i-2],17)^rotateRight(w[i-2],19)^(w[i-2]>>>10); w[i]=(w[i-16]+s0+w[i-7]+s1)>>>0;}
    let a=h0,b=h1,c=h2,d=h3,e=h4,f=h5,g=h6,h=h7;
    for (let i=0;i<64;i+=1){const s1=rotateRight(e,6)^rotateRight(e,11)^rotateRight(e,25); const ch=(e&f)^(~e&g); const t1=(h+s1+ch+k[i]+w[i])>>>0; const s0=rotateRight(a,2)^rotateRight(a,13)^rotateRight(a,22); const maj=(a&b)^(a&c)^(b&c); const t2=(s0+maj)>>>0; h=g; g=f; f=e; e=(d+t1)>>>0; d=c; c=b; b=a; a=(t1+t2)>>>0;}
    h0=(h0+a)>>>0; h1=(h1+b)>>>0; h2=(h2+c)>>>0; h3=(h3+d)>>>0; h4=(h4+e)>>>0; h5=(h5+f)>>>0; h6=(h6+g)>>>0; h7=(h7+h)>>>0;
  }
  return [h0,h1,h2,h3,h4,h5,h6,h7].map((hash)=>hash.toString(16).padStart(8,"0")).join("");
}
function id(prefix){return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;}
function publishedTime(key){return Number(window.POPULOVE_SITE_DATA?.__meta?.[key]?.updatedAt||0);}
function localTime(key){return Number(localStorage.getItem(`${key}UpdatedAt`)||0);}
function publishedSiteVersion(){const meta=window.POPULOVE_SITE_DATA?.__meta||{}; const times=Object.values(meta).map((item)=>Number(item?.updatedAt||0)).filter(Boolean); return Number(meta.siteVersion||Math.max(0,...times));}
function versionStorageKeys(){return new Set([STORAGE.versionSettings, STORAGE.versionHistory]);}
function syncPublishedSettings(){const version=publishedSiteVersion(); if(!version||Number(localStorage.getItem(PUBLISHED_VERSION_KEY)||0)>=version)return; Object.values(STORAGE).forEach((key)=>{if(Object.prototype.hasOwnProperty.call(window.POPULOVE_SITE_DATA||{},key)){localStorage.setItem(key,JSON.stringify(window.POPULOVE_SITE_DATA[key]));localStorage.setItem(`${key}UpdatedAt`,String(publishedTime(key)||version));}}); localStorage.setItem(PUBLISHED_VERSION_KEY,String(version));}
function read(key, fallback){let data=null;try{data=JSON.parse(localStorage.getItem(key)||"null");}catch{} const published=window.POPULOVE_SITE_DATA?.[key]; const usePublished=publishedTime(key)>localTime(key); if(usePublished&&published){try{localStorage.setItem(key,JSON.stringify(published));localStorage.setItem(`${key}UpdatedAt`,String(publishedTime(key)));}catch{} return Array.isArray(fallback)?published:{...fallback,...published};} if(Array.isArray(fallback)&&Array.isArray(data))return data; if(!Array.isArray(fallback)&&data&&typeof data==="object")return data; if(Array.isArray(fallback))return Array.isArray(published)&&published.length?published:[...fallback]; return published&&typeof published==="object"?published:{...fallback};}
let versionSnapshotTimer;
let suppressVersionSnapshot = false;
function save(key, data){localStorage.setItem(key, JSON.stringify(data)); localStorage.setItem(`${key}UpdatedAt`, String(Date.now())); if(!suppressVersionSnapshot&&!versionStorageKeys().has(key))scheduleVersionSnapshot();}
function escapeHtml(value){return String(value||"").replace(/[&<>"]/g,(char)=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[char]));}
function fileData(file){return new Promise((resolve,reject)=>{const reader=new FileReader(); reader.onload=()=>resolve(String(reader.result)); reader.onerror=()=>reject(reader.error); reader.readAsDataURL(file);});}
function status(selector, text){const el=$(selector); if(!el)return; el.textContent=text; clearTimeout(status.t); status.t=setTimeout(()=>el.textContent="",2600);}
function normalizeIcon(value,fallback="i-message"){const icon=String(value||"").trim(); return ICON_CHOICES.has(icon)?icon:fallback;}
function versionLimit(){const settings=read(STORAGE.versionSettings,defaults.versionSettings); const max=Math.floor(Number(settings.maxVersions)||5); return Math.min(5,Math.max(2,max));}
function snapshotKeys(){return Object.entries(STORAGE).filter(([name])=>!VERSION_STORAGE_NAMES.has(name));}
function currentSnapshotPayload(){const payload={}; snapshotKeys().forEach(([name,key])=>{payload[key]=read(key,defaults[name]||[]); payload[`${key}UpdatedAt`]=Number(localStorage.getItem(`${key}UpdatedAt`)||publishedTime(key)||Date.now());}); return payload;}
function builtInInitialValue(name,key){return Object.prototype.hasOwnProperty.call(window.POPULOVE_SITE_DATA||{},key)?window.POPULOVE_SITE_DATA[key]:(defaults[name]||[]);}
function builtInSnapshotPayload(overrides={}){const payload={}; snapshotKeys().forEach(([name,key])=>{payload[key]=Object.prototype.hasOwnProperty.call(overrides,key)?overrides[key]:builtInInitialValue(name,key); payload[`${key}UpdatedAt`]=publishedTime(key)||Date.now();}); return payload;}
function initialUnsetProductPayload(){return builtInSnapshotPayload({[STORAGE.products]:[]});}
function isProtectedVersion(item){return item?.locked===true||item?.id===INITIAL_VERSION_ID||item?.id===PRODUCT_LISTED_VERSION_ID||item?.id===LEGACY_LOCKED_VERSION_ID;}
function protectedVersion(id,label,item,payloadFactory){const payload=item?.payload||payloadFactory(); return {id,label,createdAt:item?.createdAt||Date.now(),signature:JSON.stringify(payload),payload,locked:true};}
function normalizeVersionHistory(items){const list=Array.isArray(items)?items:[]; const initial=list.find((item)=>item.id===INITIAL_VERSION_ID); const listed=list.find((item)=>item.id===PRODUCT_LISTED_VERSION_ID)||list.find((item)=>item.id===LEGACY_LOCKED_VERSION_ID)||list.find((item)=>item.locked===true); const rest=list.filter((item)=>!isProtectedVersion(item)); return [protectedVersion(INITIAL_VERSION_ID,INITIAL_VERSION_LABEL,initial,initialUnsetProductPayload),protectedVersion(PRODUCT_LISTED_VERSION_ID,PRODUCT_LISTED_VERSION_LABEL,listed,currentSnapshotPayload),...rest].slice(0,versionLimit());}
function readVersionHistory(){return normalizeVersionHistory(read(STORAGE.versionHistory,defaults.versionHistory));}
function saveVersionHistory(items){localStorage.setItem(STORAGE.versionHistory,JSON.stringify(normalizeVersionHistory(items))); localStorage.setItem(`${STORAGE.versionHistory}UpdatedAt`,String(Date.now()));}
function ensureLockedDefaultVersion(){saveVersionHistory(readVersionHistory());}
function recordVersionSnapshot(label="自動儲存快照",force=false){const payload=currentSnapshotPayload(); const signature=JSON.stringify(payload); const history=readVersionHistory(); const latest=history.find((entry)=>!isProtectedVersion(entry))||history[0]; if(!force&&latest?.signature===signature)return; const insertAt=history.findIndex((entry)=>!isProtectedVersion(entry)); history.splice(insertAt<0?history.length:insertAt,0,{id:id("ver"),label,createdAt:Date.now(),signature,payload}); saveVersionHistory(history); renderVersions?.();}
function scheduleVersionSnapshot(){clearTimeout(versionSnapshotTimer); versionSnapshotTimer=setTimeout(()=>recordVersionSnapshot(),80);}
function restoreVersion(versionId){const item=readVersionHistory().find((entry)=>entry.id===versionId); if(!item)return; suppressVersionSnapshot=true; Object.entries(item.payload||{}).forEach(([key,value])=>{if(key.endsWith("UpdatedAt"))return; localStorage.setItem(key,JSON.stringify(value)); localStorage.setItem(`${key}UpdatedAt`,String(item.payload[`${key}UpdatedAt`]||Date.now()));}); suppressVersionSnapshot=false; renderAll(); status("#versionStatus","已回復選定版本，請確認後同步/下載最新資料。");}
function deleteVersion(versionId){const history=readVersionHistory(); const item=history.find((entry)=>entry.id===versionId); if(isProtectedVersion(item)){status("#versionStatus","內建版本無法刪除。"); renderVersions(); return;} const next=history.filter((entry)=>entry.id!==versionId); saveVersionHistory(next); renderVersions(); status("#versionStatus","已刪除版本。");}
function categoryIcon(category){const label=String(category.label||""); const explicit=String(category.icon||"").trim(); const rules=[[/POLO/i,"i-polo"],[/連帽|帽 T|帽T/i,"i-hoodie"],[/外套/i,"i-jacket"],[/大學T|大學 T/i,"i-sweatshirt"],[/圍裙/i,"i-apron"],[/襯衫/i,"i-collar"],[/褲/i,"i-pants"],[/帽/i,"i-cap"],[/背心/i,"i-vest"],[/兒童|童/i,"i-kids"],[/袋|包/i,"i-bag"],[/杯/i,"i-cup"],[/T恤|T 恤|tee/i,"i-shirt"]]; if(explicit&&explicit!=="i-shirt")return explicit; return rules.find(([pattern])=>pattern.test(label))?.[1]||explicit||"i-shirt";}
function updateIconPreview(select){const preview=select.closest("label")?.querySelector(".admin-icon-preview"); if(!preview)return; const icon=normalizeIcon(select.value,"i-shirt"); const text=select.options[select.selectedIndex]?.textContent||icon; preview.innerHTML=`<svg class="icon" aria-hidden="true"><use href="#${escapeHtml(icon)}"></use></svg><span>${escapeHtml(text)}</span>`;}
function bindIconPreviews(){document.querySelectorAll('select[name="icon"]').forEach((select)=>{const label=select.closest("label"); if(!label||label.querySelector(".admin-icon-preview"))return; select.insertAdjacentHTML("afterend",'<span class="admin-icon-preview" aria-live="polite"></span>'); select.addEventListener("change",()=>updateIconPreview(select)); updateIconPreview(select);});}
function bindVersionSwipeHint(){const head=$("#versionHistoryList")?.closest(".admin-list-wrap")?.querySelector(".admin-list-head"); if(!head||head.querySelector(".version-swipe-hint"))return; head.insertAdjacentHTML("beforeend",'<em class="version-swipe-hint"><span aria-hidden="true">←</span> 左滑刪除版本</em>');}
function normalizeSaveButtonText(){document.querySelectorAll('form button[type="submit"]').forEach((button)=>{if(button.textContent.trim().startsWith("儲存"))button.textContent="儲存設定";});}
function setVisible(show){loginView.hidden=show; adminView.hidden=!show; logoutButton.hidden=!show; if(show){syncAdminMenuOrder(); renderAll();}}

passwordToggle?.addEventListener("click", () => {
  const input = loginForm.elements.password;
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  passwordToggle.setAttribute("aria-label", isHidden ? "隱藏密碼" : "顯示密碼");
  passwordToggle.classList.toggle("is-visible", isHidden);
});
loginForm.addEventListener("submit", (event)=>{event.preventDefault(); const data=new FormData(loginForm); const ok=sha256(String(data.get("email")||"").trim().toLowerCase())===ADMIN_EMAIL_HASH && sha256(String(data.get("password")||""))===ADMIN_PASSWORD_HASH; if(ok){sessionStorage.setItem(ADMIN_SESSION_KEY,"active"); loginForm.reset(); loginMessage.textContent=""; setVisible(true); refreshAdminIdle();} else loginMessage.textContent="帳號或密碼錯誤，請再確認一次。";});
logoutButton.addEventListener("click",()=>{sessionStorage.removeItem(ADMIN_SESSION_KEY); setVisible(false);});
function restoreInitialVersion(){recordVersionSnapshot("還原初始版本前",true); suppressVersionSnapshot=true; const restoredAt=Date.now(); const payload=initialUnsetProductPayload(); Object.entries(payload).forEach(([key,value])=>{if(key.endsWith("UpdatedAt"))return; localStorage.setItem(key,JSON.stringify(value)); localStorage.setItem(`${key}UpdatedAt`,String(restoredAt));}); localStorage.setItem(PUBLISHED_VERSION_KEY,String(publishedSiteVersion()||restoredAt)); suppressVersionSnapshot=false; renderAll(); status("#versionStatus","已還原商品未設定版，既有可回復版本已保留。");}
resetAll?.addEventListener("click",restoreInitialVersion);
function exportPublishedData(){
  recordVersionSnapshot("發布前快照", true);
  const siteVersion = Date.now();
  const payload = { __meta: { siteVersion, exportedAt: new Date(siteVersion).toISOString() } };
  Object.entries(STORAGE).forEach(([name, key]) => {
    payload[key] = read(key, defaults[name] || []);
    payload.__meta[key] = { updatedAt: siteVersion };
  });
  const content = `window.POPULOVE_SITE_DATA = ${JSON.stringify(payload, null, 2)};\n`;
  const blob = new Blob([content], { type: "text/javascript;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "site-data.js";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
  status("#productStatus", "已下載最新 site-data.js。請上傳覆蓋正式機根目錄，手機會以最新版本同步。")
}
exportSiteData?.addEventListener("click", exportPublishedData);
document.querySelector("#syncProductsData")?.addEventListener("click", exportPublishedData);
document.querySelectorAll("[data-tab]").forEach((button)=>button.addEventListener("click",()=>{document.querySelectorAll("[data-tab]").forEach((b)=>b.classList.toggle("is-active",b===button)); document.querySelectorAll("[data-panel]").forEach((panel)=>panel.classList.toggle("is-active",panel.dataset.panel===button.dataset.tab));}));

function renderProducts(){const items=read(STORAGE.products,defaults.products); $("#productCount").textContent=`${items.length} 件商品`; $("#productList").innerHTML=items.map((p,i)=>row(p.id,p.name,`排序 ${i+1}${p.price?" / "+p.price:""}${p.href?" / 已設連結":""}${p.tagText?" / "+p.tagText:""}`,p.image,"product")).join("");}
function renderCategories(){const items=read(STORAGE.categories,defaults.categories); $("#categoryCount").textContent=`${items.length} 個分類`; $("#categoryList").innerHTML=items.map((c,i)=>row(c.id,c.label,`排序 ${i+1}${c.href?" / "+c.href:""}${c.description?" / "+c.description:""}`,categoryIcon(c),"category")).join("");}
function renderBanners(){const items=read(STORAGE.banners,defaults.banners); $("#bannerList").innerHTML=items.map((b,i)=>row(b.id,b.title,`${i+1}. ${b.label}`,b.image,"banner")).join("");}
function renderCards(){const items=read(STORAGE.contactCards,defaults.contactCards); $("#cardList").innerHTML=items.map((c,i)=>row(c.id,c.title,c.text,normalizeIcon(c.icon,"i-message"),"card")).join("");}
function renderFlow(){const items=read(STORAGE.flow,defaults.flow); $("#flowList").innerHTML=items.map((f,i)=>row(f.id,f.title,`${String(i+1).padStart(2,"0")} ${f.text}`,normalizeIcon(f.icon,"i-search"),"flow")).join("");}
function renderContact(){const data=read(STORAGE.contact,defaults.contact); const form=$("#contactForm"); Object.keys(data).forEach((key)=>form.elements[key].value=data[key]||"");}
function renderVersions(){const form=$("#versionSettingsForm"); const settings=read(STORAGE.versionSettings,defaults.versionSettings); const history=readVersionHistory().slice(0,versionLimit()); if(form)form.elements.maxVersions.value=versionLimit(); const count=$("#versionCount"); if(count)count.textContent=`保留 ${history.length}/${Math.min(5,Math.max(2,Number(settings.maxVersions)||5))} 個版本`; const list=$("#versionHistoryList"); if(!list)return; list.innerHTML=history.length?history.map((item)=>{const locked=isProtectedVersion(item); const deleteButton=locked?"":`<button class="version-delete" type="button" data-delete-version="${escapeHtml(item.id)}">刪除</button>`; const badge=item.id===INITIAL_VERSION_ID?"初始":item.id===PRODUCT_LISTED_VERSION_ID?"內建":"預設"; const inlineDelete=locked?`<span class="version-lock-badge">${badge}</span>`:`<button class="version-delete-inline" type="button" data-delete-version="${escapeHtml(item.id)}">刪除</button>`; return `<article class="version-swipe${locked?" is-locked":""}" data-version-row="${escapeHtml(item.id)}" data-locked="${locked?"true":"false"}">${deleteButton}<div class="admin-product version-row"><div class="admin-icon-pill"><svg class="icon" aria-hidden="true"><use href="#i-clock"></use></svg><span>版本</span></div><div><strong>${escapeHtml(item.label||"設定快照")}</strong><span>${new Date(item.createdAt||Date.now()).toLocaleString("zh-TW")} / ${Object.keys(item.payload||{}).filter((key)=>!key.endsWith("UpdatedAt")).length} 組設定</span></div><div class="admin-row-actions"><button type="button" data-restore-version="${escapeHtml(item.id)}">回復</button>${inlineDelete}</div></div></article>`;}).join(""):`<p class="admin-note">尚未建立可回復版本。</p>`;}
function row(idValue,title,meta,media,type){const mediaText=String(media||""); const img=mediaText.startsWith("data:")||mediaText.includes("assets/")?`<img src="${escapeHtml(media)}" alt="${escapeHtml(title)}">`:`<div class="admin-icon-pill"><svg class="icon" aria-hidden="true"><use href="#${escapeHtml(normalizeIcon(mediaText,"i-shirt"))}"></use></svg><span>${escapeHtml(mediaText||"icon")}</span></div>`; const drag=type==="product"?` draggable="true" data-product-id="${escapeHtml(idValue)}"`:""; const handle=type==="product"?`<button class="drag-handle" type="button" aria-label="拖曳調整商品順序" title="拖曳調整順序">☰</button>`:""; const sortableClass=type==="product"?" is-sortable":""; return `<article class="admin-product${sortableClass}"${drag}>${handle}${img}<div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(meta).replace(/\n/g," / ")}</span></div><div class="admin-row-actions"><button type="button" data-edit-${type}="${escapeHtml(idValue)}">編輯</button><button type="button" data-remove-${type}="${escapeHtml(idValue)}">刪除</button></div></article>`;}
function normalizeSmileEntryAdmin(data){
  const image = !data.image || data.image.includes("media.giphy.com/media/111ebonMs90YLu") ? defaults.smile.image : data.image;
  const label = !data.label || ["笑一下", "你今天\\nPopulove\\n了沒?", "你今天\nPopulove\n了沒?"].includes(data.label) ? defaults.smile.label : data.label;
  return {...data, label, image};
}
function normalizePromos(items){const list=Array.isArray(items)?items:[]; return defaults.promos.map((fallback,index)=>{const item=list[index]||{}; const hasItem=!!list[index]; return {title:item.title??fallback.title,href:item.href??fallback.href,enabled:hasItem&&item.enabled===undefined?true:item.enabled??fallback.enabled};});}
function syncPromoFields(form=$("#smileEntryForm")){if(!form)return; [1,2,3].forEach((n)=>{const enabled=!!form.elements[`promoEnabled${n}`]?.checked; const fields=form.querySelector(`[data-promo-fields="${n}"]`); if(fields)fields.hidden=!enabled; [`promoTitle${n}`,`promoHref${n}`].forEach((name)=>{const field=form.elements[name]; if(!field)return; field.disabled=!enabled; field.required=enabled;});});}
function normalizeSmileTags(items){return (Array.isArray(items)?items:[]).filter((item)=>item&&item.label).map((item,index)=>({id:item.id||id("smile-tag"),label:String(item.label).trim(),query:String(item.query||"").trim(),sort:index}));}
function normalizeSmileDisplay(data){return {...defaults.smileDisplay,...(data||{})};}
function renderSmileTags(){const list=$("#smileTagList"); if(!list)return; const tags=normalizeSmileTags(read(STORAGE.smileTags,defaults.smileTags)); list.innerHTML=`<div class="admin-smile-tag locked"><strong>熱門</strong><span>固定 / 當天好評前 30 名</span></div><div class="admin-smile-tag locked"><strong>搞笑</strong><span>固定 / API 預設分類</span></div><div class="admin-smile-tag locked"><strong>自創</strong><span>固定 / 使用者上傳</span></div>${tags.map((tag)=>`<div class="admin-smile-tag"><strong>${escapeHtml(tag.label)}</strong><span>${escapeHtml(tag.query||"未設定搜尋字")}</span><button type="button" data-remove-smile-tag="${escapeHtml(tag.id)}">刪除</button></div>`).join("")}`;}
function normalizeReactionSettings(data){
  const visible = {...defaults.reactionSettings.visible, ...(data?.visible || {})};
  visible["Populove!!!"] = true;
  return {visible};
}
function renderSmileEntry(){const data=normalizeSmileEntryAdmin(read(STORAGE.smile,defaults.smile)); const promos=normalizePromos(read(STORAGE.promos,defaults.promos)); const coinSettings=read(STORAGE.coinSettings,defaults.coinSettings); const displaySettings=normalizeSmileDisplay(read(STORAGE.smileDisplay,defaults.smileDisplay)); const reactionSettings=normalizeReactionSettings(read(STORAGE.reactionSettings,defaults.reactionSettings)); const f=$("#smileEntryForm"); if(!f)return; f.elements.label.value=data.label||defaults.smile.label; f.elements.href.value=data.href||"smile.html"; if(f.elements.giphyKey) f.elements.giphyKey.value=data.giphyKey||""; if(f.elements.initialCoins) f.elements.initialCoins.value=Number.isFinite(Number(coinSettings.initialCoins))?Number(coinSettings.initialCoins):defaults.coinSettings.initialCoins; if(f.elements.showHotTag)f.elements.showHotTag.checked=displaySettings.showHotTag!==false; if(f.elements.showPopuloveReaction)f.elements.showPopuloveReaction.checked=displaySettings.showPopuloveReaction!==false; if(f.elements.showCoinBadge)f.elements.showCoinBadge.checked=displaySettings.showCoinBadge!==false; CONFIGURABLE_REACTIONS.forEach((reaction,index)=>{const field=f.elements[`reactionEnabled${index+1}`]; if(field)field.checked=reactionSettings.visible[reaction]!==false;}); [1,2,3].forEach((n)=>{if(f.elements[`promoEnabled${n}`]) f.elements[`promoEnabled${n}`].checked=promos[n-1]?.enabled!==false; if(f.elements[`promoTitle${n}`]) f.elements[`promoTitle${n}`].value=promos[n-1]?.title||""; if(f.elements[`promoHref${n}`]) f.elements[`promoHref${n}`].value=promos[n-1]?.href||"";}); renderSmileTags(); syncPromoFields(f); smileEntryImage=data.image||defaults.smile.image; $("#smileEntryPreview img").src=smileEntryImage;}
function renderAll(){renderProducts();renderCategories();renderBanners();renderContact();renderCards();renderFlow();renderSmileEntry();renderVersions();bindIconPreviews();bindVersionSwipeHint();normalizeSaveButtonText();}
function bindFile(formSelector, previewSelector, setter){$(formSelector).elements.image?.addEventListener("change",async(event)=>{const [file]=event.target.files; if(!file)return; const data=await fileData(file); setter(data); const img=document.querySelector(`${previewSelector} img`); if(img) img.src=data;});}
function loadImage(data){return new Promise((resolve,reject)=>{const img=new Image(); img.onload=()=>resolve(img); img.onerror=reject; img.src=data;});}
function drawCropPreview(targetCanvas, size){
  if(!targetCanvas || !cropState.image) return;
  const canvasSize = size || targetCanvas.width;
  const ctx = targetCanvas.getContext("2d");
  const img = cropState.image;
  const scale = Math.max(canvasSize / img.width, canvasSize / img.height) * cropState.zoom;
  const drawWidth = img.width * scale;
  const drawHeight = img.height * scale;
  const offsetX = -Math.max(0, drawWidth - canvasSize) * (cropState.x / 100);
  const offsetY = -Math.max(0, drawHeight - canvasSize) * (cropState.y / 100);
  ctx.fillStyle = "#f5f1ea";
  ctx.fillRect(0,0,canvasSize,canvasSize);
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}
function renderProductCrop(){drawCropPreview($("#productCropCanvas"));}
function closeProductCropper(){const cropper=$("#productCropper"); if(cropper) cropper.hidden=true; cropState.image=null;}
function bindProductCropper(){
  const form = $("#productForm");
  const input = form?.elements.image;
  const cropper = $("#productCropper");
  const zoom = $("#cropZoom");
  const cropX = $("#cropX");
  const cropY = $("#cropY");
  if(!input || !cropper) return;
  input.addEventListener("change", async (event)=>{
    const [file] = event.target.files;
    if(!file) return;
    try{
      const data = await fileData(file);
      cropState.image = await loadImage(data);
      cropState.zoom = 1;
      cropState.x = 50;
      cropState.y = 50;
      zoom.value = "1";
      cropX.value = "50";
      cropY.value = "50";
      cropper.hidden = false;
      renderProductCrop();
      status("#productStatus","請調整圖片範圍，確認後按套用裁切。");
    }catch{
      status("#productStatus","圖片讀取失敗，請換一張再試。");
    }
  });
  [zoom,cropX,cropY].forEach((control)=>control?.addEventListener("input",()=>{
    cropState.zoom = Number(zoom.value) || 1;
    cropState.x = Number(cropX.value) || 50;
    cropState.y = Number(cropY.value) || 50;
    renderProductCrop();
  }));
  $("#applyProductCrop")?.addEventListener("click",()=>{
    if(!cropState.image) return;
    const output = document.createElement("canvas");
    output.width = 900;
    output.height = 900;
    drawCropPreview(output, 900);
    productImage = output.toDataURL("image/jpeg", 0.9);
    const preview = $("#imagePreview img");
    if(preview) preview.src = productImage;
    closeProductCropper();
    input.value = "";
    status("#productStatus","已套用正方形裁切，可以儲存商品。");
  });
  $("#cancelProductCrop")?.addEventListener("click",()=>{closeProductCropper(); input.value=""; status("#productStatus","已取消裁切。");});
}
bindProductCropper();
bindProductSorting();
bindFile("#bannerForm","#bannerPreview",(data)=>bannerImage=data); bindFile("#smileEntryForm","#smileEntryPreview",(data)=>smileEntryImage=data);

function bindList(listSelector, key, fallback, formSelector, statusSelector, type, fill, clear){$(listSelector).addEventListener("click",(event)=>{const edit=event.target.closest(`[data-edit-${type}]`); const remove=event.target.closest(`[data-remove-${type}]`); let items=read(key,fallback); if(edit){const item=items.find((x)=>x.id===edit.dataset[`edit${type[0].toUpperCase()+type.slice(1)}`]); if(item) fill(item);} if(remove){items=items.filter((x)=>x.id!==remove.dataset[`remove${type[0].toUpperCase()+type.slice(1)}`]); save(key,items); renderAll(); status(statusSelector,"已刪除。")}});}
function upsert(key,fallback,item){const items=read(key,fallback); const idx=items.findIndex((x)=>x.id===item.id); if(idx>=0)items[idx]=item; else items.push(item); save(key,items); renderAll();}
function bindProductSorting(){
  const list = $("#productList");
  if(!list) return;
  let draggedId = "";
  list.addEventListener("dragstart", (event)=>{
    const card = event.target.closest("[data-product-id]");
    if(!card) return;
    draggedId = card.dataset.productId;
    card.classList.add("is-dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", draggedId);
  });
  list.addEventListener("dragend", ()=>{
    list.querySelectorAll(".admin-product").forEach((card)=>card.classList.remove("is-dragging","is-drop-target"));
    draggedId = "";
  });
  list.addEventListener("dragover", (event)=>{
    if(!draggedId) return;
    const card = event.target.closest("[data-product-id]");
    if(!card || card.dataset.productId === draggedId) return;
    event.preventDefault();
    list.querySelectorAll(".is-drop-target").forEach((item)=>item.classList.remove("is-drop-target"));
    card.classList.add("is-drop-target");
  });
  list.addEventListener("drop", (event)=>{
    const target = event.target.closest("[data-product-id]");
    if(!draggedId || !target || target.dataset.productId === draggedId) return;
    event.preventDefault();
    const items = read(STORAGE.products, defaults.products);
    const from = items.findIndex((item)=>item.id === draggedId);
    const to = items.findIndex((item)=>item.id === target.dataset.productId);
    if(from < 0 || to < 0) return;
    const [moved] = items.splice(from, 1);
    items.splice(to, 0, moved);
    save(STORAGE.products, items);
    renderProducts();
    status("#productStatus", "商品順序已更新。");
  });
}

$("#productForm").addEventListener("submit",(e)=>{e.preventDefault(); const f=e.currentTarget; upsert(STORAGE.products,defaults.products,{id:f.elements.id.value||id("p"),name:f.elements.name.value.trim(),price:f.elements.price.value.trim(),href:f.elements.href.value.trim(),tagLevel:f.elements.tagLevel.value,tagText:f.elements.tagText.value.trim(),image:productImage}); f.reset(); productImage=defaultImage; $("#imagePreview img").src=defaultImage; status("#productStatus","商品已儲存。");});
$("#categoryForm").addEventListener("submit",(e)=>{e.preventDefault(); const f=e.currentTarget; upsert(STORAGE.categories,defaults.categories,{id:f.elements.id.value||id("cat"),label:f.elements.label.value.trim(),href:f.elements.href.value.trim(),icon:f.elements.icon.value.trim()||"i-shirt",description:f.elements.description.value.trim()}); f.reset(); status("#categoryStatus","產品分類已儲存。");});
$("#bannerForm").addEventListener("submit",(e)=>{e.preventDefault(); const f=e.currentTarget; upsert(STORAGE.banners,defaults.banners,{id:f.elements.id.value||id("b"),label:f.elements.label.value.trim(),title:f.elements.title.value.trim(),text:f.elements.text.value.trim(),image:bannerImage}); f.reset(); bannerImage="assets/hero-teamwear.png"; $("#bannerPreview img").src=bannerImage; status("#bannerStatus","Banner 已儲存。");});
$("#contactForm").addEventListener("submit",(e)=>{e.preventDefault(); const f=e.currentTarget; save(STORAGE.contact,{line:f.elements.line.value.trim(),phone:f.elements.phone.value.trim(),email:f.elements.email.value.trim(),hours:f.elements.hours.value.trim()}); status("#contactStatus","聯繫資訊已儲存。");});
$("#smileEntryForm").addEventListener("submit",(e)=>{e.preventDefault(); const f=e.currentTarget; const initialCoins=Math.max(0,Math.floor(Number(f.elements.initialCoins?.value||defaults.coinSettings.initialCoins)||0)); const promos=[1,2,3].map((n)=>({title:f.elements[`promoTitle${n}`]?.value.trim()||"",href:f.elements[`promoHref${n}`]?.value.trim()||"",enabled:!!f.elements[`promoEnabled${n}`]?.checked})); const reactionSettings={visible:{"Populove!!!":true}}; CONFIGURABLE_REACTIONS.forEach((reaction,index)=>{reactionSettings.visible[reaction]=!!f.elements[`reactionEnabled${index+1}`]?.checked;}); save(STORAGE.smile,{label:f.elements.label.value.trim(),href:f.elements.href.value.trim(),image:smileEntryImage,giphyKey:f.elements.giphyKey?.value.trim()||""}); save(STORAGE.coinSettings,{initialCoins}); save(STORAGE.promos,promos); save(STORAGE.reactionSettings,reactionSettings); save(STORAGE.smileDisplay,{showHotTag:!!f.elements.showHotTag?.checked,showPopuloveReaction:!!f.elements.showPopuloveReaction?.checked,showCoinBadge:!!f.elements.showCoinBadge?.checked}); localStorage.removeItem("populoveGiphyMemeCache"); status("#smileEntryStatus","趣味入口、P coin、推廣網站、類別與反應顯示已儲存。");});
$("#smileEntryForm").addEventListener("change",(e)=>{if(e.target.matches('[name^="promoEnabled"]'))syncPromoFields(e.currentTarget);});
$("#addSmileTag")?.addEventListener("click",()=>{const f=$("#smileEntryForm"); const label=f.elements.newSmileTagLabel?.value.trim(); const query=f.elements.newSmileTagQuery?.value.trim(); if(!label){status("#smileEntryStatus","請輸入類別名稱。"); return;} const fixed=["熱門","搞笑","自創"]; if(fixed.includes(label)){status("#smileEntryStatus","預設三種類別不能重複新增。"); return;} const tags=normalizeSmileTags(read(STORAGE.smileTags,defaults.smileTags)); tags.push({id:id("smile-tag"),label,query}); save(STORAGE.smileTags,tags); f.elements.newSmileTagLabel.value=""; f.elements.newSmileTagQuery.value=""; localStorage.removeItem("populoveGiphyMemeCache"); renderSmileTags(); status("#smileEntryStatus","已新增笑一下類別。");});
$("#smileTagList")?.addEventListener("click",(event)=>{const button=event.target.closest("[data-remove-smile-tag]"); if(!button)return; const tags=normalizeSmileTags(read(STORAGE.smileTags,defaults.smileTags)).filter((tag)=>tag.id!==button.dataset.removeSmileTag); save(STORAGE.smileTags,tags); localStorage.removeItem("populoveGiphyMemeCache"); renderSmileTags(); status("#smileEntryStatus","已刪除笑一下類別。");});
$("#versionSettingsForm").addEventListener("submit",(e)=>{e.preventDefault(); const f=e.currentTarget; const maxVersions=Math.min(5,Math.max(2,Math.floor(Number(f.elements.maxVersions.value)||5))); save(STORAGE.versionSettings,{maxVersions}); saveVersionHistory(readVersionHistory()); renderVersions(); status("#versionStatus","版本設定已儲存。");});
$("#captureVersion")?.addEventListener("click",()=>{const form=$("#versionSettingsForm"); const name=form?.elements.versionName?.value.trim()||"手動建立版本"; recordVersionSnapshot(name,true); if(form?.elements.versionName)form.elements.versionName.value=""; status("#versionStatus",`已建立「${name}」。`);});
$("#versionHistoryList")?.addEventListener("click",(event)=>{const del=event.target.closest("[data-delete-version]"); if(del){deleteVersion(del.dataset.deleteVersion);return;} const button=event.target.closest("[data-restore-version]"); if(!button){document.querySelectorAll(".version-swipe.is-open").forEach((row)=>row.classList.remove("is-open"));return;} restoreVersion(button.dataset.restoreVersion);});
$("#versionHistoryList")?.addEventListener("touchstart",(event)=>{const row=event.target.closest(".version-swipe"); if(!row)return; row.dataset.touchStartX=String(event.changedTouches[0].clientX); row.dataset.touchStartY=String(event.changedTouches[0].clientY);},{passive:true});
$("#versionHistoryList")?.addEventListener("touchend",(event)=>{const row=event.target.closest(".version-swipe"); if(!row)return; const startX=Number(row.dataset.touchStartX||0), startY=Number(row.dataset.touchStartY||0), dx=event.changedTouches[0].clientX-startX, dy=event.changedTouches[0].clientY-startY; if(Math.abs(dx)<36||Math.abs(dx)<Math.abs(dy))return; document.querySelectorAll(".version-swipe.is-open").forEach((item)=>{if(item!==row)item.classList.remove("is-open");}); if(row.dataset.locked==="true")return; row.classList.toggle("is-open",dx<0);},{passive:true});
$("#cardForm").addEventListener("submit",(e)=>{e.preventDefault(); const f=e.currentTarget; upsert(STORAGE.contactCards,defaults.contactCards,{id:f.elements.id.value||id("c"),title:f.elements.title.value.trim(),text:f.elements.text.value.trim(),href:f.elements.href.value.trim(),icon:normalizeIcon(f.elements.icon.value,"i-message")}); f.reset(); status("#cardStatus","諮詢卡片已儲存。");});
$("#flowForm").addEventListener("submit",(e)=>{e.preventDefault(); const f=e.currentTarget; upsert(STORAGE.flow,defaults.flow,{id:f.elements.id.value||id("f"),title:f.elements.title.value.trim(),text:f.elements.text.value.trim(),link:f.elements.link.value.trim(),href:f.elements.href.value.trim(),icon:normalizeIcon(f.elements.icon.value,"i-search")}); f.reset(); status("#flowStatus","訂購流程已儲存。");});

$("#clearProduct").addEventListener("click",()=>{$("#productForm").reset(); closeProductCropper(); productImage=defaultImage; $("#imagePreview img").src=defaultImage;});
$("#clearCategory").addEventListener("click",()=>$("#categoryForm").reset());
$("#clearBanner").addEventListener("click",()=>{$("#bannerForm").reset(); bannerImage="assets/hero-teamwear.png"; $("#bannerPreview img").src=bannerImage;});
$("#clearCard").addEventListener("click",()=>$("#cardForm").reset()); $("#clearFlow").addEventListener("click",()=>$("#flowForm").reset());
$("#addProduct").addEventListener("click",()=>$("#productForm").elements.name.focus()); $("#addCategory").addEventListener("click",()=>$("#categoryForm").elements.label.focus()); $("#addBanner").addEventListener("click",()=>$("#bannerForm").elements.label.focus()); $("#addCard").addEventListener("click",()=>$("#cardForm").elements.title.focus()); $("#addFlow").addEventListener("click",()=>$("#flowForm").elements.title.focus());

bindList("#productList",STORAGE.products,defaults.products,"#productForm","#productStatus","product",(p)=>{const f=$("#productForm"); f.elements.id.value=p.id; f.elements.name.value=p.name; f.elements.price.value=p.price||""; f.elements.href.value=p.href||""; f.elements.tagLevel.value=p.tagLevel||""; f.elements.tagText.value=p.tagText||""; productImage=p.image; $("#imagePreview img").src=p.image;},()=>{});
bindList("#categoryList",STORAGE.categories,defaults.categories,"#categoryForm","#categoryStatus","category",(c)=>{const f=$("#categoryForm"); f.elements.id.value=c.id; f.elements.label.value=c.label; f.elements.href.value=c.href||"#products"; f.elements.icon.value=categoryIcon(c); f.elements.description.value=c.description||"";},()=>{});
bindList("#bannerList",STORAGE.banners,defaults.banners,"#bannerForm","#bannerStatus","banner",(b)=>{const f=$("#bannerForm"); f.elements.id.value=b.id; f.elements.label.value=b.label; f.elements.title.value=b.title; f.elements.text.value=b.text; bannerImage=b.image; $("#bannerPreview img").src=b.image;},()=>{});
bindList("#cardList",STORAGE.contactCards,defaults.contactCards,"#cardForm","#cardStatus","card",(c)=>{const f=$("#cardForm"); f.elements.id.value=c.id; f.elements.title.value=c.title; f.elements.text.value=c.text; f.elements.href.value=c.href; f.elements.icon.value=normalizeIcon(c.icon,"i-message");},()=>{});
bindList("#flowList",STORAGE.flow,defaults.flow,"#flowForm","#flowStatus","flow",(x)=>{const f=$("#flowForm"); f.elements.id.value=x.id; f.elements.title.value=x.title; f.elements.text.value=x.text; f.elements.link.value=x.link; f.elements.href.value=x.href; f.elements.icon.value=normalizeIcon(x.icon,"i-search");},()=>{});
syncPublishedSettings();
ensureLockedDefaultVersion();
setVisible(sessionStorage.getItem(ADMIN_SESSION_KEY)==="active"); refreshAdminIdle();
















