"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ComponentType } from "react";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils/cn";

import { BannersSection } from "./sections/banners-section";
import { CardsSection } from "./sections/cards-section";
import { CategoriesSection } from "./sections/categories-section";
import { ContactSection } from "./sections/contact-section";
import { FlowSection } from "./sections/flow-section";
import { ProductsSection } from "./sections/products-section";
import { SmileSection } from "./sections/smile-section";
import { VersionsSection } from "./sections/versions-section";
import { adminGhostButton } from "./ui";

const TABS = [
  { id: "products", label: "商品" },
  { id: "categories", label: "產品分類" },
  { id: "banners", label: "Banner" },
  { id: "contact", label: "聯繫資訊" },
  { id: "cards", label: "諮詢卡片" },
  { id: "flow", label: "訂購流程" },
  { id: "smile", label: "快捷按鈕設定" },
  { id: "versions", label: "版本回復" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const SECTIONS: Partial<Record<TabId, ComponentType>> = {
  products: ProductsSection,
  categories: CategoriesSection,
  banners: BannersSection,
  contact: ContactSection,
  cards: CardsSection,
  flow: FlowSection,
  smile: SmileSection,
  versions: VersionsSection,
};

export function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<TabId>("contact");
  const current = TABS.find((item) => item.id === tab);
  const ActiveSection = SECTIONS[tab];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Logo：點擊回前台首頁 */}
          <Link
            href="/"
            aria-label="回到前台首頁"
            className="hover:opacity-80"
            title="回到前台首頁"
          >
            <Image
              src="/brand/populove-logo.svg"
              alt="POPULOVE"
              width={120}
              height={26}
            />
          </Link>
          <div className="border-border hidden border-l pl-3 sm:block">
            <p className="text-amber text-sm font-bold tracking-widest">
              Site Settings
            </p>
            <h1 className="text-xl font-black">網站設定後台</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className={adminGhostButton}>
            <Icon name="i-home" />
            回前台
          </Link>
          <button type="button" onClick={onLogout} className={adminGhostButton}>
            登出
          </button>
        </div>
      </header>

      <nav className="mb-8 flex flex-wrap gap-2" aria-label="設定分類">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-bold",
              tab === item.id
                ? "bg-brand text-[#15110d]"
                : "border-border bg-surface text-text hover:text-ink border",
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <section className="border-border bg-panel rounded-2xl border p-4 sm:p-6">
        {ActiveSection ? (
          <ActiveSection />
        ) : (
          <div className="text-muted flex flex-col items-center gap-2 py-12 text-center">
            <Icon name="i-wrench" className="text-amber h-8 w-8" />
            <p className="text-ink font-bold">{current?.label}</p>
            <p className="text-sm">此分頁施工中，將於後續子階段補上。</p>
          </div>
        )}
      </section>
    </main>
  );
}
