"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

  return (
    <header>
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

      {/* 主導覽列 */}
      <nav className="border-border bg-base/85 sticky top-0 z-40 border-b backdrop-blur">
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
            className="text-ink sm:hidden"
            aria-label="開啟選單"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name="i-grid" className="h-6 w-6" />
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
                  "inline-flex items-center gap-2 rounded-lg border px-3 py-1.5",
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
          <div className="border-border bg-surface border-t px-6 py-3 sm:hidden">
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

      {/* 產品分類收合面板：預設收合，點「產品分類」展開。 */}
      {hasCategories && (
        <div
          id="category-panel"
          className={cn(
            "border-border bg-surface/40 grid transition-all duration-200",
            catOpen ? "grid-rows-[1fr] border-b" : "grid-rows-[0fr] border-b-0",
          )}
        >
          <div className="overflow-hidden">
            <div className="mx-auto flex max-w-6xl [scrollbar-width:none] flex-nowrap justify-end gap-2.5 overflow-x-auto px-6 py-3.5 [&::-webkit-scrollbar]:hidden">
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
          </div>
        </div>
      )}
    </header>
  );
}
