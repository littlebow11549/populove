"use client";

import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/icon";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/lib/data/types";

export function Products({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // 依目前捲動位置更新左右箭頭是否可用。
  function updateArrows() {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth - 2;
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft >= max);
  }

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [products.length]);

  // 一次捲動一張卡片的寬度（含間距）。
  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("article");
    const gap = 16;
    const amount = card ? card.getBoundingClientRect().width + gap : 280;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  if (!products.length) return null;

  const arrowClass =
    "border-border bg-surface text-text hover:text-ink flex h-11 w-11 flex-none items-center justify-center rounded-full border text-2xl shadow-sm transition disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <section id="products" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-amber text-sm font-bold tracking-widest">
            Popular Items
          </p>
          <h2 className="text-2xl font-black sm:text-3xl">人氣商品</h2>
        </div>
        <a
          href="#estimate"
          className="text-text hover:text-ink inline-flex items-center gap-1.5 text-sm font-bold"
        >
          索取完整報價
          <Icon name="i-arrow" />
        </a>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label="上一組商品"
          className={cn(arrowClass, "hidden sm:flex")}
        >
          ‹
        </button>
        <div
          ref={trackRef}
          onScroll={updateArrows}
          className="flex flex-1 snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[calc(50%-0.5rem)] flex-none snap-start sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label="下一組商品"
          className={cn(arrowClass, "hidden sm:flex")}
        >
          ›
        </button>
      </div>
    </section>
  );
}
