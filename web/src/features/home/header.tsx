"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Icon } from "@/components/icon";
import type { ContactInfo } from "@/lib/data/types";

const NAV_ITEMS: ReadonlyArray<{ href: string; icon: string; label: string }> =
  [
    { href: "#top", icon: "i-home", label: "首頁" },
    { href: "#estimate", icon: "i-calculator", label: "費用估算" },
    { href: "#process", icon: "i-wrench", label: "加工說明" },
    { href: "#contact", icon: "i-info", label: "關於我們" },
    { href: "#products", icon: "i-bag", label: "商品一覽" },
  ];

export function Header({ contact }: { contact: ContactInfo }) {
  const [open, setOpen] = useState(false);
  const phoneDigits = contact.phone.replace(/[^0-9]/g, "");

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
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
