"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Icon } from "@/components/icon";
import { normalizeFloatButtons } from "@/lib/data/normalize";
import type { CustomMeme } from "@/lib/data/types";
import { useIsClient } from "@/lib/hooks/use-is-client";
import {
  fetchGiphyMemes,
  readGiphyCache,
  writeGiphyCache,
} from "@/lib/smile/giphy";
import {
  addCoins,
  getCoins,
  getMemes,
  getReactions,
  getTags,
  reactToMeme,
  visibleReactions,
  REACTION_FACES,
  type Meme,
  type MemeReaction,
} from "@/lib/smile/state";
import { hydrateFromCloud } from "@/lib/store/cloud-client";
import { load, save } from "@/lib/store/index";
import { resizeImageToDataUrl } from "@/lib/utils/image";
import { cn } from "@/lib/utils/cn";

const ghostButton =
  "inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-bold text-text hover:text-ink";
const navButton =
  "flex h-12 w-12 flex-none items-center justify-center rounded-full border border-border bg-surface text-2xl text-text hover:text-ink";

export function SmileApp() {
  const isClient = useIsClient();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    hydrateFromCloud().finally(() => setHydrated(true));
  }, []);

  if (!isClient || !hydrated) {
    return (
      <p className="text-muted mx-auto max-w-3xl px-6 py-20 text-center">
        載入中…
      </p>
    );
  }
  return <SmileInner />;
}

function SmileInner() {
  const tags = getTags();
  const [activeTag, setActiveTag] = useState(tags[0]?.id ?? "funny");
  const [reactions, setReactions] = useState<Record<string, MemeReaction>>(() =>
    getReactions(),
  );
  const [coins, setCoins] = useState(() => getCoins());
  const [giphyMemes, setGiphyMemes] = useState<Meme[]>(
    () => readGiphyCache() ?? [],
  );
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState("");
  const [showPromos, setShowPromos] = useState(false);

  // 後台有填 Giphy Key 且無有效快取時，向 Giphy 抓一批迷因。
  useEffect(() => {
    const key = load("smileEntry").giphyKey?.trim();
    if (!key || readGiphyCache()) return;
    let active = true;
    const extra = load("smileTags")
      .filter((tag) => Boolean(tag.query))
      .map((tag) => ({ tag: tag.id, q: tag.query ?? "" }));
    fetchGiphyMemes(key, extra)
      .then((fetched) => {
        if (active && fetched.length) {
          writeGiphyCache(fetched);
          setGiphyMemes(fetched);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const showCoin = load("smileDisplay").showCoinBadge !== false;
  const promos = normalizeFloatButtons(load("floatButtons")).filter(
    (button) => !button.hidden && button.enabled && button.text && button.href,
  );
  const memes = getMemes(activeTag, reactions, giphyMemes);
  const meme = memes[index] ?? memes[0];
  const reactionList = visibleReactions();
  const picked = meme ? (reactions[meme.id]?.picked ?? "") : "";
  const tagLabel = tags.find((tag) => tag.id === meme?.tag)?.label ?? "迷因";

  function selectTag(tagId: string) {
    setActiveTag(tagId);
    setIndex(0);
  }
  function move(delta: number) {
    if (!memes.length) return;
    setIndex((current) => (current + delta + memes.length) % memes.length);
  }
  function react(reaction: string) {
    if (!meme) return;
    const result = reactToMeme(meme.id, reaction);
    setReactions(result.reactions);
    setCoins(result.coins);
  }
  async function handleUpload(file: File) {
    const dataUrl = await resizeImageToDataUrl(file, 720);
    const meme: CustomMeme = {
      id: `custom-${Date.now()}`,
      tag: "custom",
      title: "我的 Populove 圖",
      src: dataUrl,
      createdAt: Date.now(),
    };
    save("customMemes", [meme, ...load("customMemes")].slice(0, 60));
    setCoins(addCoins(1));
    setActiveTag("custom");
    setIndex(0);
    setStatus("已加入你的自創圖，Populove 幣 +1。");
  }
  function deleteCustom(memeId: string) {
    save(
      "customMemes",
      load("customMemes").filter((item) => item.id !== memeId),
    );
    setIndex(0);
    setStatus("已刪除這張自創圖。");
  }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("已複製連結！");
    } catch {
      setStatus("複製失敗，請手動複製網址。");
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-8 px-6 py-10">
      <header className="flex items-center justify-between">
        <Link href="/" aria-label="POPULOVE 首頁">
          <Image
            src="/brand/populove-logo.svg"
            alt="POPULOVE"
            width={120}
            height={26}
          />
        </Link>
        <Link href="/" className={ghostButton}>
          <Icon name="i-home" />
          回團體服首頁
        </Link>
      </header>

      <section className="text-center">
        <h1 className="text-3xl font-black sm:text-4xl">
          你今天 <span className="text-brand">Populove</span> 了沒?
        </h1>
        <p className="text-muted mt-2">
          意思是：你今天微笑了嗎？滑一張迷因圖，給自己一點可愛的能量。
        </p>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="flex flex-wrap gap-2" aria-label="迷因分類">
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => selectTag(tag.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-bold",
                activeTag === tag.id
                  ? "bg-brand text-[#15110d]"
                  : "border-border bg-surface text-text hover:text-ink border",
              )}
            >
              {tag.label}
            </button>
          ))}
        </nav>
        {showCoin && (
          <div className="border-border bg-surface flex items-center gap-2 rounded-full border px-4 py-2">
            <Icon name="i-spark" className="text-amber" />
            <strong className="text-amber">{coins}</strong>
            <span className="text-muted text-sm">Populove 幣</span>
          </div>
        )}
      </div>

      <section className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => move(-1)}
          className={navButton}
          aria-label="上一張"
        >
          ‹
        </button>
        <article className="border-border bg-panel flex-1 overflow-hidden rounded-2xl border">
          {meme ? (
            <>
              <div className="bg-surface relative aspect-video">
                {/* eslint-disable-next-line @next/next/no-img-element -- 迷因為外部 GIF 或自創 data URL，不走 next/image 最佳化 */}
                <img
                  src={meme.src}
                  alt={meme.title}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted text-sm">
                    {tagLabel} · {index + 1}/{memes.length}
                  </span>
                  {meme.tag === "custom" && (
                    <button
                      type="button"
                      onClick={() => deleteCustom(meme.id)}
                      className="text-muted hover:text-ink text-sm font-bold"
                    >
                      刪除這張
                    </button>
                  )}
                </div>
                <h2 className="text-lg font-bold">
                  {meme.tag === "custom" ? "我的 Populove 圖" : meme.title}
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {reactionList.map((reaction) => {
                    const count = reactions[meme.id]?.counts[reaction] ?? 0;
                    const isPicked = picked === reaction;
                    const disabled = picked !== "" && !isPicked;
                    return (
                      <button
                        key={reaction}
                        type="button"
                        onClick={() => react(reaction)}
                        disabled={disabled}
                        className={cn(
                          "flex flex-col items-center gap-0.5 rounded-xl border px-2 py-2 text-xs font-bold",
                          isPicked
                            ? "border-brand bg-brand/15 text-ink"
                            : "border-border bg-surface text-text",
                          disabled && "opacity-40",
                        )}
                      >
                        <i className="text-base not-italic">
                          {REACTION_FACES[reaction]}
                        </i>
                        <span>{reaction}</span>
                        <b className="text-amber">{count}</b>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="text-muted p-12 text-center">
              目前沒有這個分類的圖片。
            </div>
          )}
        </article>
        <button
          type="button"
          onClick={() => move(1)}
          className={navButton}
          aria-label="下一張"
        >
          ›
        </button>
      </section>

      <p className="text-muted text-center text-sm">
        看一張迷因圖，替自己補一點微笑能量。給張正面反應還能賺 Populove 幣。
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <label className={cn(ghostButton, "cursor-pointer")}>
          <Icon name="i-upload" />
          上傳自己的圖
          <input
            type="file"
            accept="image/*,.gif"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleUpload(file);
              event.target.value = "";
            }}
          />
        </label>
        <button type="button" onClick={copyLink} className={ghostButton}>
          <Icon name="i-copy" />
          複製連結
        </button>
        {promos.length > 0 && (
          <button
            type="button"
            onClick={() => setShowPromos((value) => !value)}
            className={ghostButton}
          >
            <Icon name="i-link" />
            推薦連結
          </button>
        )}
        {status && (
          <span className="text-amber text-sm font-bold">{status}</span>
        )}
      </div>

      {showPromos && promos.length > 0 && (
        <div className="mx-auto grid w-full max-w-md gap-2">
          {promos.map((promo) => (
            <a
              key={promo.id}
              href={promo.href}
              target="_blank"
              rel="noopener"
              className="border-border bg-surface hover:border-brand rounded-full border px-4 py-3 text-center font-bold"
            >
              {promo.text}
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
