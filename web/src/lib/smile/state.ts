/**
 * 笑一下頁的用戶端執行狀態：Populove 幣、反應、迷因清單。
 *
 * 這些是頁面執行期狀態（非後台內容），自成一組儲存鍵。
 * 內容設定（反應顯示、類別、P coin 初始值、自創圖）仍從內容 store 讀取。
 */
import { load } from "@/lib/store/index";
import { readValue, writeValue } from "@/lib/store/storage";

const COINS_KEY = "populoveSmileCoins";
const REACTIONS_KEY = "populoveSmileReactions";
const DAILY_KEY = "populoveSmileDailyEarn";
const DAILY_LIMIT = 20;

export const REACTIONS = [
  "加油",
  "還行",
  "好~~~",
  "太強了",
  "Populove!!!",
] as const;
export const REACTION_FACES: Record<string, string> = {
  加油: "ㄒ_ㄒ",
  還行: "= =?!",
  "好~~~": "-_-*",
  太強了: ">v<",
  "Populove!!!": "^O^",
};
const POSITIVE = new Set(["好~~~", "太強了", "Populove!!!"]);

export interface Meme {
  id: string;
  tag: string;
  title: string;
  src: string;
}

export interface MemeReaction {
  counts: Record<string, number>;
  picked: string;
}

const FALLBACK_MEMES: Meme[] = [
  {
    id: "funny-default-1",
    tag: "funny",
    title: "今天也要 Populove 一下",
    src: "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif",
  },
  {
    id: "funny-default-2",
    tag: "funny",
    title: "先笑一下，再處理人生",
    src: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  },
  {
    id: "funny-1",
    tag: "funny",
    title: "腦袋正在載入",
    src: "https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif",
  },
  {
    id: "funny-2",
    tag: "funny",
    title: "當客戶說再小改一下",
    src: "https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif",
  },
];

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function initialCoins(): number {
  return Number(load("coinSettings").initialCoins) || 100;
}

/** 純讀取：尚無紀錄時回傳後台設定的初始幣值（不在此寫入）。 */
export function getCoins(): number {
  const stored = readValue<number | null>(COINS_KEY, null);
  return stored ?? initialCoins();
}

function setCoins(value: number): number {
  const next = Math.max(0, value);
  writeValue(COINS_KEY, next);
  return next;
}

function tryEarnCoin(): boolean {
  const today = todayKey();
  const daily = readValue<{ date: string; count: number }>(DAILY_KEY, {
    date: today,
    count: 0,
  });
  const current = daily.date === today ? daily : { date: today, count: 0 };
  if (current.count >= DAILY_LIMIT) {
    writeValue(DAILY_KEY, current);
    return false;
  }
  writeValue(DAILY_KEY, { date: today, count: current.count + 1 });
  setCoins(getCoins() + 1);
  return true;
}

export function getReactions(): Record<string, MemeReaction> {
  return readValue<Record<string, MemeReaction>>(REACTIONS_KEY, {});
}

/** 對一張迷因表達反應；每張只能選一次，並嘗試賺一枚幣（每日上限）。 */
export function reactToMeme(
  memeId: string,
  reaction: string,
): { reactions: Record<string, MemeReaction>; coins: number } {
  const reactions = getReactions();
  const entry = reactions[memeId] ?? { counts: {}, picked: "" };
  if (entry.picked) {
    return { reactions, coins: getCoins() };
  }
  const next: Record<string, MemeReaction> = {
    ...reactions,
    [memeId]: {
      counts: {
        ...entry.counts,
        [reaction]: (entry.counts[reaction] ?? 0) + 1,
      },
      picked: reaction,
    },
  };
  writeValue(REACTIONS_KEY, next);
  tryEarnCoin();
  return { reactions: next, coins: getCoins() };
}

function reactionScore(
  memeId: string,
  reactions: Record<string, MemeReaction>,
): number {
  const counts = reactions[memeId]?.counts ?? {};
  let score = 0;
  for (const reaction of POSITIVE) score += counts[reaction] ?? 0;
  return score;
}

/** 顯示用的類別清單（固定三類 + 後台自訂類別）。 */
export function getTags(): { id: string; label: string }[] {
  const display = load("smileDisplay");
  const fixed = [
    { id: "hot", label: "熱門" },
    { id: "funny", label: "搞笑" },
    { id: "custom", label: "自創" },
  ].filter((tag) => tag.id !== "hot" || display.showHotTag !== false);
  const custom = load("smileTags").map((tag) => ({
    id: tag.id,
    label: tag.label,
  }));
  return [...fixed, ...custom];
}

/** 目前可見的反應（依後台設定）。 */
export function visibleReactions(): string[] {
  const visible = load("reactionSettings").visible;
  const display = load("smileDisplay");
  return REACTIONS.filter(
    (reaction) =>
      visible[reaction] !== false &&
      (reaction !== "Populove!!!" || display.showPopuloveReaction !== false),
  );
}

/** 依類別取得迷因（P5.0 使用內建 + 自創圖；線上 Giphy 於 P5.1 接入）。 */
export function getMemes(
  tag: string,
  reactions: Record<string, MemeReaction>,
): Meme[] {
  const custom = load("customMemes").map((meme) => ({
    id: meme.id,
    tag: "custom",
    title: meme.title,
    src: meme.src,
  }));
  const all = [...FALLBACK_MEMES, ...custom];
  if (tag === "custom") return all.filter((meme) => meme.tag === "custom");
  if (tag === "hot") {
    const hot = all
      .map((meme) => ({ meme, score: reactionScore(meme.id, reactions) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.meme);
    return hot.length ? hot : all.filter((meme) => meme.tag === "funny");
  }
  return all.filter((meme) => meme.tag === tag);
}
