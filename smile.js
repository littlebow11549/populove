const reactions = ["加油", "還行", "好~~~", "太強了", "Populove!!!"];
const configurableReactions = ["加油", "還行", "好~~~", "太強了"];
const reactionFaces = { "加油": "ㄒ_ㄒ", "還行": "= =?!", "好~~~": "-_-*", "太強了": ">v<", "Populove!!!": "^O^" };
const positiveReactions = new Set(["好~~~", "太強了", "Populove!!!"]);
const storageKey = "populoveSmileReactions";
const choiceKey = "populoveSmileReactionChoices";
const coinKey = "populoveSmileCoins";
const coinSettingAppliedKey = "populoveSmileCoinSettingApplied";
const dailyEarnKey = "populoveSmileDailyEarn";
const giphyCacheKey = "populoveGiphyMemeCache";
const customMemeKey = "populoveCustomMemes";
const smileEntryKey = "populoveSmileEntry";
const coinSettingsKey = "populoveCoinSettings";
const reactionSettingsKey = "populoveSmileReactionSettings";
const smileTagsKey = "populoveSmileTags";
const smileDisplayKey = "populoveSmileDisplaySettings";
const memberKey = "populoveSmileMember";
const batchQuotaKey = "populoveSmileBatchQuota";
const floatButtonsKey = "populoveFloatButtons";
const publishedVersionKey = "populovePublishedVersionSmile";
const publishedSettingKeys = [smileEntryKey, coinSettingsKey, reactionSettingsKey, floatButtonsKey, smileTagsKey, smileDisplayKey];
const cacheDuration = 60 * 60 * 1000;
const batchWindow = 6 * 60 * 60 * 1000;
const fallbackMemeImage = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><rect width="800" height="800" rx="90" fill="#16161b"/><circle cx="400" cy="350" r="190" fill="#ff8a1f"/><text x="400" y="640" text-anchor="middle" fill="#fffaf2" font-family="Arial" font-size="56" font-weight="900">今天也要 Populove!</text></svg>`)}`;
const fallbackMemes = [
  { id: "funny-default-1", tag: "funny", title: "今天也要 Populove 一下", src: "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif" },
  { id: "funny-default-2", tag: "funny", title: "先笑一下，再處理人生", src: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" },
  { id: "funny-1", tag: "funny", title: "腦袋正在載入", src: "https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif" },
  { id: "funny-2", tag: "funny", title: "當客戶說再小改一下", src: "https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif" }
];
const defaultSmileTags = [{ id: "hot", label: "熱門", locked: true }, { id: "funny", label: "搞笑", locked: true }, { id: "custom", label: "自創", locked: true }];
const defaultApiQueries = [{ tag: "funny", q: "popular funny reaction meme" }, { tag: "funny", q: "funny meme reaction" }];
const removedTags = new Set(["pet"]);
let memes = [...fallbackMemes], activeTag = "hot", index = 0, touchStartX = 0;
let cropState = { image: null, fileName: "", zoom: 1, x: 50, y: 50 };
const card = document.querySelector("#memeCard"), uploadMeme = document.querySelector("#uploadMeme"), shareSmile = document.querySelector("#shareSmile"), copySmileLink = document.querySelector("#copySmileLink"), smileToolStatus = document.querySelector("#smileToolStatus"), coinCount = document.querySelector("#coinCount"), wallet = document.querySelector(".smile-wallet"), memberModal = document.querySelector("#memberModal"), memberForm = document.querySelector("#memberForm"), cropper = document.querySelector("#uploadCropper"), promoPanel = document.querySelector("#promoPanel"), openPromosButton = document.querySelector("#openPromos"), memeTags = document.querySelector(".meme-tags");
function publishedTime(key){return Number(window.POPULOVE_SITE_DATA?.__meta?.[key]?.updatedAt||0);}
function publishedSiteVersion(){const meta=window.POPULOVE_SITE_DATA?.__meta||{}; const times=Object.values(meta).map((item)=>Number(item?.updatedAt||0)).filter(Boolean); return Number(meta.siteVersion||Math.max(0,...times));}
function syncPublishedSettings(){const version=publishedSiteVersion(); if(!version||Number(localStorage.getItem(publishedVersionKey)||0)>=version)return; publishedSettingKeys.forEach((key)=>{if(Object.prototype.hasOwnProperty.call(window.POPULOVE_SITE_DATA||{},key)){localStorage.setItem(key,JSON.stringify(window.POPULOVE_SITE_DATA[key]));localStorage.setItem(`${key}UpdatedAt`,String(publishedTime(key)||version));}}); localStorage.setItem(publishedVersionKey,String(version));}
function readJson(key, fallback){try{const local=JSON.parse(localStorage.getItem(key)||"null"); if(local) return local;}catch{} const published=window.POPULOVE_SITE_DATA?.[key]; return published || fallback;}
function writeJson(key,value){localStorage.setItem(key,JSON.stringify(value));}
function tryWriteJson(key,value){try{writeJson(key,value);return true;}catch(error){console.warn(error);return false;}}
function displaySettings(){return {showHotTag:true,showPopuloveReaction:true,showCoinBadge:true,...readJson(smileDisplayKey,{})};}
function reactionSettings(){const fallback={visible:Object.fromEntries(reactions.map((reaction)=>[reaction,true]))}; const data=readJson(reactionSettingsKey,fallback); return {...fallback.visible,...(data?.visible||{})};}
function visibleReactions(){const visible=reactionSettings(),display=displaySettings(); return reactions.filter((reaction)=>visible[reaction]!==false&&(reaction!=="Populove!!!"||display.showPopuloveReaction!==false));}
function smileTags(){const extra=readJson(smileTagsKey,[]),display=displaySettings(); return [...defaultSmileTags,...(Array.isArray(extra)?extra:[]).filter((tag)=>tag&&tag.label).map((tag)=>({id:tag.id,label:tag.label,query:tag.query||""}))].filter((tag)=>tag.id!=="hot"||display.showHotTag!==false);}
function readFileAsDataUrl(file){return new Promise((resolve,reject)=>{const reader=new FileReader(); reader.onload=()=>resolve(String(reader.result)); reader.onerror=()=>reject(reader.error); reader.readAsDataURL(file);});}
function loadImage(data){return new Promise((resolve,reject)=>{const img=new Image(); img.onload=()=>resolve(img); img.onerror=reject; img.src=data;});}
function setToolStatus(message){if(!smileToolStatus)return; smileToolStatus.textContent=message; clearTimeout(setToolStatus.timer); setToolStatus.timer=setTimeout(()=>{smileToolStatus.textContent="";},2800);}
function getGiphyKey(){return String(readJson(smileEntryKey,{}).giphyKey||"").trim();}
function shuffle(items){for(let i=items.length-1;i>0;i-=1){const j=Math.floor(Math.random()*(i+1));[items[i],items[j]]=[items[j],items[i]];}return items;}
function dedupe(items){const seen=new Set(); return items.filter((item)=>{if(seen.has(item.id))return false; seen.add(item.id); return true;});}
function getMember(){return readJson(memberKey,null);}
function currentMemberId(){const member=getMember(); return member?.id || member?.phone || "guest";}
function allMemes(){return [...readJson(customMemeKey,[]),...memes].filter((meme)=>!removedTags.has(meme.tag));}
function todayKey(){return new Date().toISOString().slice(0,10);}
function reactionScore(meme){const current=readJson(storageKey,{})[meme.id]||{},daily=current._dates?.[todayKey()]||current; return positiveReactions.size?[...positiveReactions].reduce((sum,reaction)=>sum+Number(daily[reaction]||0),0):0;}
function filteredMemes(){const list=allMemes(); if(activeTag==="hot")return list.map((meme)=>({...meme,_score:reactionScore(meme)})).filter((meme)=>meme._score>0).sort((a,b)=>b._score-a._score).slice(0,30); return list.filter((meme)=>meme.tag===activeTag);}
function initialCoinValue(){const settings=readJson(coinSettingsKey,{initialCoins:100}); const value=Math.floor(Number(settings.initialCoins)); return Number.isFinite(value)&&value>=0?value:100;}
function initCoins(){const initial=initialCoinValue(),applied=localStorage.getItem(coinSettingAppliedKey); if(localStorage.getItem(coinKey)===null||applied!==String(initial)){localStorage.setItem(coinKey,String(initial));localStorage.setItem(coinSettingAppliedKey,String(initial));}}
function coinValue(){initCoins(); return Number(localStorage.getItem(coinKey)||0);}
function setCoins(value){localStorage.setItem(coinKey,String(Math.max(0,value))); updateCoins();}
function updateCoins(){coinCount.textContent=String(coinValue()); if(wallet)wallet.hidden=displaySettings().showCoinBadge===false;}
function addCoins(amount){setCoins(coinValue()+amount);}
function dailyEarn(amount){const today=new Date().toISOString().slice(0,10); let data=readJson(dailyEarnKey,{date:today,count:0}); if(data.date!==today)data={date:today,count:0}; if(data.count>=20)return false; data.count=Math.min(20,data.count+amount); writeJson(dailyEarnKey,data); addCoins(amount); return true;}
function tagName(tag){return smileTags().find((item)=>item.id===tag)?.label||"熱門";}
function normalizeGif(item, tag){const image=item.images?.fixed_height?.url||item.images?.downsized_medium?.url||item.images?.original?.url; return image?{id:`${tag}-${item.id}`,tag,title:item.title||"今天也 Populove 一下",src:image}:null;}
function apiQueries(){const extra=smileTags().filter((tag)=>!tag.locked&&tag.query).map((tag)=>({tag:tag.id,q:tag.query})); return [...defaultApiQueries,...extra];}
async function fetchGiphyBatch(apiKey){const queries=apiQueries(); const batches=await Promise.all(queries.map(async(query)=>{const offset=Math.floor(Math.random()*450); const params=new URLSearchParams({api_key:apiKey,q:query.q,limit:"50",offset:String(offset),rating:"pg",lang:"zh-TW"}); const res=await fetch(`https://api.giphy.com/v1/gifs/search?${params}`); if(!res.ok)throw new Error("Giphy request failed"); const json=await res.json(); return (json.data||[]).map((item)=>normalizeGif(item,query.tag)).filter(Boolean);})); return shuffle(dedupe(batches.flat())).slice(0,140);}
async function loadMemes(force=false){const cached=readJson(giphyCacheKey,null); if(!force&&cached?.items?.length&&Date.now()-cached.updatedAt<cacheDuration){memes=cached.items; render(); return;} const apiKey=getGiphyKey(); if(!apiKey){memes=shuffle([...fallbackMemes]); render(); return;} try{const fresh=await fetchGiphyBatch(apiKey); if(fresh.length){memes=fresh; writeJson(giphyCacheKey,{updatedAt:Date.now(),items:fresh}); index=0; render(); return;}}catch(e){console.warn(e);} memes=cached?.items?.length?cached.items:shuffle([...fallbackMemes]); render();}
function userVoteKey(memeId){return `${currentMemberId()}:${memeId}`;}
function pickedFor(memeId,current,choices){return current?._votes?.[currentMemberId()]||choices[userVoteKey(memeId)]||choices[memeId]||"";}
function render(){renderTagButtons(); updateCoins(); const list=filteredMemes(); if(!list.length){card.innerHTML=`<div class="meme-empty">目前沒有這個分類的圖片。</div>`; return;} if(index>=list.length)index=0; const meme=list[index]; const displayTitle=meme.tag==="custom"?"我的 Populove 圖":meme.title; const data=readJson(storageKey,{}), current=data[meme.id]||{}, choices=readJson(choiceKey,{}), picked=pickedFor(meme.id,current,choices), visible=visibleReactions(), primaryCount=visible.filter((reaction)=>reaction!=="Populove!!!").length; const remove=meme.tag==="custom"?`<button class="delete-custom-meme" type="button" data-delete-custom="${meme.id}">刪除這張</button>`:""; const progress=Math.round(((index+1)/list.length)*100); card.innerHTML=`<div class="meme-status"><i style="width:${progress}%"></i></div><div class="meme-media"><img src="${meme.src}" alt="${displayTitle}" loading="lazy"></div><div class="meme-copy"><span>${tagName(meme.tag)} · ${index+1}/${list.length}</span><h2>${displayTitle}</h2>${remove}</div><div class="reaction-grid" style="--reaction-count:${Math.max(1,primaryCount)}">${visible.map((r)=>`<button type="button" data-reaction="${r}" aria-label="${r} ${reactionFaces[r]}" title="${r} ${reactionFaces[r]}" class="${picked===r?"is-picked":""}" ${picked&&picked!==r?"disabled":""}><i aria-hidden="true">${reactionFaces[r]}</i><span>${r}</span><b>${current[r]||0}</b></button>`).join("")}</div>`; card.querySelector(".meme-media img").addEventListener("error",(e)=>{e.currentTarget.src=fallbackMemeImage;},{once:true});}
function renderTagButtons(){if(!memeTags)return; const tags=smileTags(); if(!tags.some((tag)=>tag.id===activeTag))activeTag=tags[0]?.id||"funny"; memeTags.innerHTML=tags.map((tag)=>`<button class="${tag.id===activeTag?"is-active":""}" type="button" data-tag="${tag.id}">${tag.label}</button>`).join("");}
function move(delta){const list=filteredMemes(); index=(index+delta+list.length)%list.length; render();}
function drawCrop(canvas,size){if(!canvas||!cropState.image)return; const s=size||canvas.width,ctx=canvas.getContext("2d"),img=cropState.image,scale=Math.max(s/img.width,s/img.height)*cropState.zoom,w=img.width*scale,h=img.height*scale,x=-Math.max(0,w-s)*(cropState.x/100),y=-Math.max(0,h-s)*(cropState.y/100); ctx.fillStyle="#101014"; ctx.fillRect(0,0,s,s); ctx.drawImage(img,x,y,w,h);}
function renderCrop(){drawCrop(document.querySelector("#uploadCropCanvas"));}
function closeCrop(){cropper.hidden=true; cropState={image:null,fileName:"",zoom:1,x:50,y:50};}
function addCustomMeme(src,message){const items=readJson(customMemeKey,[]); items.unshift({id:`custom-${Date.now()}`,tag:"custom",title:"我的 Populove 圖",src,ownerId:currentMemberId(),createdAt:Date.now()}); if(!tryWriteJson(customMemeKey,items.slice(0,60))){setToolStatus("圖片容量太大，請縮小圖片後再試一次。");return false;} addCoins(1); activeTag="custom"; index=0; document.querySelectorAll("[data-tag]").forEach((item)=>item.classList.toggle("is-active",item.dataset.tag==="custom")); setToolStatus(message||"已加入你的自創圖，Populove 幣 +1。正式共享需匯出最新資料檔上傳。"); render(); return true;}
function hasMember(){return !!getMember();}
function openMember(){memberModal.hidden=false;}
function activePromos(){return readJson(floatButtonsKey,[{text:"奇幻角色生成器",href:"https://character-prompt-generator.netlify.app/",color:"#ff8a1f",hidden:false,enabled:true},{text:"翊軒酒莊",href:"https://godenwine.com/",color:"#7a5cff",hidden:false,enabled:true}]).slice(0,2).filter((b)=>b&&!b.hidden&&b.enabled!==false&&b.text&&b.href).map((b)=>({title:b.text,href:b.href}));}
function promoLinkIcon(){return `<svg class="promo-link-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/></svg>`;}
function renderPromos(){const promos=activePromos(); if(openPromosButton)openPromosButton.hidden=!promos.length; if(!promos.length){promoPanel.hidden=true; promoPanel.innerHTML=""; return;} promoPanel.innerHTML=promos.map((p)=>`<a href="${p.href}" target="_blank" rel="noopener">${promoLinkIcon()}<span>${p.title}</span></a>`).join("");}
memeTags?.addEventListener("click",(event)=>{const button=event.target.closest("[data-tag]"); if(!button)return; activeTag=button.dataset.tag; index=0; render();});
document.querySelector("#prevMeme").addEventListener("click",()=>move(-1)); document.querySelector("#nextMeme").addEventListener("click",()=>move(1));
uploadMeme?.addEventListener("click",(event)=>{if(!hasMember()){event.preventDefault(); openMember();}});
uploadMeme?.addEventListener("change",async()=>{const [file]=uploadMeme.files; if(!file)return; const data=await readFileAsDataUrl(file); const isGif=file.type==="image/gif"||/\.gif$/i.test(file.name); if(isGif){addCustomMeme(data,"已加入 GIF 動圖，Populove 幣 +1。正式共享需匯出最新資料檔上傳。"); uploadMeme.value=""; return;} cropState.image=await loadImage(data); cropState.fileName=file.name; cropState.zoom=1; cropState.x=50; cropState.y=50; ["uploadCropZoom","uploadCropX","uploadCropY"].forEach((id)=>document.querySelector(`#${id}`).value=id==="uploadCropZoom"?"1":"50"); cropper.hidden=false; renderCrop(); uploadMeme.value="";});
["uploadCropZoom","uploadCropX","uploadCropY"].forEach((id)=>document.querySelector(`#${id}`)?.addEventListener("input",()=>{cropState.zoom=Number(document.querySelector("#uploadCropZoom").value)||1; cropState.x=Number(document.querySelector("#uploadCropX").value)||50; cropState.y=Number(document.querySelector("#uploadCropY").value)||50; renderCrop();}));
document.querySelector("#applyUploadCrop")?.addEventListener("click",(event)=>{if(!cropState.image){setToolStatus("圖片尚未載入完成，請稍等一下。");return;} const button=event.currentTarget; button.disabled=true; try{const attempts=[[720,.82],[560,.76],[420,.68]]; for(const [size,quality] of attempts){const output=document.createElement("canvas"); output.width=size; output.height=size; drawCrop(output,size); if(addCustomMeme(output.toDataURL("image/jpeg",quality))){closeCrop();return;}} setToolStatus("圖片容量太大，請換一張較小的圖片再試一次。");}catch(error){console.warn(error);setToolStatus("套用上傳失敗，請再試一次。");}finally{button.disabled=false;}});
document.querySelector("#cancelUploadCrop")?.addEventListener("click",closeCrop);
memberForm?.addEventListener("submit",(event)=>{event.preventDefault(); const f=event.currentTarget; writeJson(memberKey,{id:`u-${Date.now()}-${Math.random().toString(16).slice(2)}`,phone:f.elements.phone.value.trim(),password:f.elements.password.value,job:f.elements.job.value.trim(),gender:f.elements.gender.value,createdAt:Date.now()}); memberModal.hidden=true; setToolStatus("會員註冊完成，可以上傳圖片。"); uploadMeme?.click();});
document.querySelector("#closeMemberModal")?.addEventListener("click",()=>memberModal.hidden=true);
async function shareCurrentPage(){const url=location.href,title="你今天 Populove 了沒？",text="進來笑一下，挑一張圖 Populove 一下！"; if(navigator.share){await navigator.share({title,text,url});return;} await navigator.clipboard.writeText(url); setToolStatus("已複製連結，可以貼給朋友。");}
shareSmile?.addEventListener("click",()=>shareCurrentPage().catch(()=>setToolStatus("分享失敗，請再試一次。")));
copySmileLink?.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(location.href);setToolStatus("已複製連結，可以貼給朋友。");}catch{setToolStatus("複製失敗，請手動複製網址。")}});
openPromosButton?.addEventListener("click",()=>{renderPromos(); if(openPromosButton.hidden)return; promoPanel.hidden=!promoPanel.hidden;});
document.querySelector("#refreshBatch")?.addEventListener("click",async()=>{let quota=readJson(batchQuotaKey,{start:Date.now(),count:0}); if(Date.now()-quota.start>batchWindow)quota={start:Date.now(),count:0}; if(quota.count>=5){setToolStatus("6 小時內最多換 5 批，晚點再回來笑。"); return;} quota.count+=1; writeJson(batchQuotaKey,quota); localStorage.removeItem(giphyCacheKey); setToolStatus(`正在換一批，本輪剩 ${5-quota.count} 次。`); await loadMemes(true);});
card.addEventListener("click",(event)=>{const del=event.target.closest("[data-delete-custom]"); if(del){let items=readJson(customMemeKey,[]).filter((item)=>item.id!==del.dataset.deleteCustom); writeJson(customMemeKey,items); index=0; setToolStatus("已刪除這張自創圖。"); render(); return;} const button=event.target.closest("[data-reaction]"); if(!button)return; const reaction=button.dataset.reaction; if(!visibleReactions().includes(reaction))return; const meme=filteredMemes()[index],choices=readJson(choiceKey,{}),data=readJson(storageKey,{}),memberId=currentMemberId(); data[meme.id]||={}; data[meme.id]._votes||={}; data[meme.id]._dates||={}; const picked=pickedFor(meme.id,data[meme.id],choices); if(picked){setToolStatus("同一張圖一人只能投一種反應，投了就不能收回。"); return;} if(coinValue()<=0){setToolStatus("Populove 幣不足，先上傳圖片或明天再來補能量。"); return;} data[meme.id][reaction]=(data[meme.id][reaction]||0)+1; data[meme.id]._votes[memberId]=reaction; data[meme.id]._dates[todayKey()]||={}; data[meme.id]._dates[todayKey()][reaction]=(data[meme.id]._dates[todayKey()][reaction]||0)+1; choices[userVoteKey(meme.id)]=reaction; writeJson(storageKey,data); writeJson(choiceKey,choices); setCoins(coinValue()-1); if(meme.tag==="custom"&&meme.ownerId&&meme.ownerId!==memberId&&positiveReactions.has(reaction)){dailyEarn(1);} render();});
card.addEventListener("touchstart",(event)=>{touchStartX=event.changedTouches[0].clientX;},{passive:true}); card.addEventListener("touchend",(event)=>{const delta=event.changedTouches[0].clientX-touchStartX; if(Math.abs(delta)>56)move(delta>0?-1:1);},{passive:true});
syncPublishedSettings(); renderTagButtons(); initCoins(); updateCoins(); renderPromos(); loadMemes();
