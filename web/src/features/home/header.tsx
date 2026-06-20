"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/icon";
import type { Category, ContactInfo } from "@/lib/data/types";
import { categoryIcon } from "@/lib/utils/icons";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS: ReadonlyArray<{ href: string; icon: string; label: string }> =
  [
    { href: "#top", icon: "i-home", label: "首頁" },
    { href: "#estimate", icon: "i-calculator", label: "費用估算" },
    { href: "#process", icon: "i-wrench", label: "加工說明" },
    { href: "#contact", icon: "i-info", label: "關於我們" },
    { href: "#products", icon: "i-bag", label: "商品一覽" },
  ];

export function Header({
  contact,
  categories,
}: {
  contact: ContactInfo;
  categories: Category[];
}) {
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const phoneDigits = contact.phone.replace(/[^0-9]/g, "");
  const hasCategories = categories.length > 0;

  // 分類列的左右捲動箭頭狀態。
  const stripRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function updateArrows() {
    const el = stripRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth - 2;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max);
  }

  // 開啟分類列或視窗縮放時，重新計算箭頭可用狀態。
  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [catOpen, categories.length]);

  function scrollStrip(direction: 1 | -1) {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * Math.max(240, el.clientWidth * 0.7),
      behavior: "smooth",
    });
  }

  // 「產品分類」收合鈕：包含一個會隨開合翻轉的箭頭。
  const caret = (
    <i
      aria-hidden
      className={cn(
        "h-2 w-2 rotate-45 border-r-2 border-b-2 border-current transition-transform",
        catOpen ? "-mt-0.5 -rotate-[135deg]" : "-mt-1",
      )}
    />
  );

  const stripArrow =
    "flex h-9 w-9 flex-none items-center justify-center rounded-full border border-border bg-panel text-xl text-text hover:text-ink disabled:opacity-30";

  return (
    // 用 fragment 當根，讓 sticky 列的容器是整個頁面（body），捲動時才能持續置頂。
    <>
      {/* 上方聯絡資訊列（小螢幕隱藏） */}
      <div className="border-border bg-surface/60 text-muted hidden border-b text-xs sm:block">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-1 px-6 py-2">
          <a
            className="hover:text-ink inline-flex items-center gap-1.5"
            href={`https://line.me/ti/p/~${contact.line}`}
            target="_blank"
            rel="noopener"
          >
            <Icon name="i-message" />
            LINE：{contact.line}
          </a>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="i-clock" />
            {contact.hours}
          </span>
          <a
            className="hover:text-ink inline-flex items-center gap-1.5"
            href={`tel:${phoneDigits}`}
          >
            <Icon name="i-phone" />
            {contact.phone}
          </a>
          <a
            className="hover:text-ink inline-flex items-center gap-1.5"
            href={`mailto:${contact.email}`}
          >
            <Icon name="i-mail" />
            {contact.email}
          </a>
        </div>
      </div>

      {/* 導覽列 + 分類列一起固定在畫面頂端，捲動時跟隨。 */}
      <div className="sticky top-0 z-40">
        <nav className="border-border bg-base/90 border-b backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
            <Link href="#top" aria-label="POPULOVE 首頁">
              <Image
                src="/brand/populove-logo.svg"
                alt="POPULOVE"
                width={132}
                height={28}
                priority
              />
            </Link>

            <button
              type="button"
              className="text-ink transition-transform active:scale-90 sm:hidden"
              aria-label="開啟選單"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <Icon name="i-menu" className="h-6 w-6" />
            </button>

            <div className="hidden items-center gap-5 text-sm font-bold sm:flex">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-text hover:text-ink inline-flex items-center gap-1.5"
                >
                  <Icon name={item.icon} />
                  {item.label}
                </a>
              ))}
              {hasCategories && (
                <button
                  type="button"
                  aria-expanded={catOpen}
                  aria-controls="category-panel"
                  onClick={() => setCatOpen((value) => !value)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 transition-transform active:scale-95",
                    catOpen
                      ? "border-brand text-amber"
                      : "border-border text-text hover:text-ink",
                  )}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="i-grid" />
                    產品分類
                  </span>
                  {caret}
                </button>
              )}
            </div>
          </div>

          {open && (
            <div className="animate-menu-in border-border bg-surface border-t px-6 py-3 sm:hidden">
              <div className="flex flex-col gap-3 text-sm font-bold">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-text hover:text-ink inline-flex items-center gap-2"
                  >
                    <Icon name={item.icon} />
                    {item.label}
                  </a>
                ))}
                {hasCategories && (
                  <button
                    type="button"
                    aria-expanded={catOpen}
                    aria-controls="category-panel"
                    onClick={() => {
                      setCatOpen((value) => !value);
                      setOpen(false);
                    }}
                    className="text-text hover:text-ink inline-flex items-center gap-2"
                  >
                    <Icon name="i-grid" />
                    產品分類
                    {caret}
                  </button>
                )}
              </div>
            </div>
          )}
        </nav>

        {/* 產品分類收合面板：預設收合，點「產品分類」展開；左右箭頭可捲動，所有分類都點得到。 */}
        {hasCategories && (
          <div
            id="category-panel"
            className={cn(
              "border-border bg-base/90 grid backdrop-blur transition-all duration-200",
              catOpen
                ? "grid-rows-[1fr] border-b"
                : "grid-rows-[0fr] border-b-0",
            )}
          >
            <div className="overflow-hidden">
              <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-3 sm:px-6">
                <button
                  type="button"
                  aria-label="分類往左"
                  onClick={() => scrollStrip(-1)}
                  disabled={atStart}
                  className={stripArrow}
                >
                  ‹
                </button>
                <div
                  ref={stripRef}
                  onScroll={updateArrows}
                  className="flex flex-1 [scrollbar-width:none] gap-2.5 overflow-x-auto [&::-webkit-scrollbar]:hidden"
                >
                  {categories.map((category) => (
                    <a
                      key={category.id}
                      href={category.href || "#products"}
                      title={category.description}
                      onClick={() => setCatOpen(false)}
                      className="border-border bg-panel text-text hover:border-brand hover:text-ink inline-flex flex-none items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-bold whitespace-nowrap"
                    >
                      <Icon
                        name={categoryIcon(category)}
                        className="text-amber h-4 w-4"
                      />
                      {category.label}
                    </a>
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="分類往右"
                  onClick={() => scrollStrip(1)}
                  disabled={atEnd}
                  className={stripArrow}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
