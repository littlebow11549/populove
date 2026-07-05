"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import type { Banner } from "@/lib/data/types";
import { cn } from "@/lib/utils/cn";

const INTERVAL = 5200;

export function Hero({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % banners.length),
      INTERVAL,
    );
    return () => clearInterval(timer);
  }, [banners.length]);

  // 手機可用手指左右滑動換 banner。
  function onTouchStart(event: React.TouchEvent) {
    startX.current = event.touches[0]?.clientX ?? null;
  }
  function onTouchEnd(event: React.TouchEvent) {
    if (startX.current === null || banners.length <= 1) return;
    const dx =
      (event.changedTouches[0]?.clientX ?? startX.current) - startX.current;
    startX.current = null;
    if (Math.abs(dx) < 40) return;
    setIndex(
      (current) =>
        (current + (dx < 0 ? 1 : -1) + banners.length) % banners.length,
    );
  }

  if (!banners.length) return null;
  const active = banners[index];

  return (
    <section aria-label="主視覺" className="relative isolate overflow-hidden">
      <div
        className="relative h-[clamp(440px,72vh,640px)] w-full touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {banners.map((banner, i) => (
          <Image
            key={banner.id}
            src={banner.image}
            alt={banner.title}
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn(
              "object-cover transition-opacity duration-700",
              i === index ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        <div className="from-base/95 via-base/70 absolute inset-0 bg-gradient-to-r to-transparent" />

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-center gap-4 px-6">
            <p className="text-amber text-sm font-bold tracking-widest">
              {active.label}
            </p>
            <h1
              className="max-w-xl text-3xl leading-tight font-black sm:text-5xl"
              style={
                typeof active.titleSize === "number"
                  ? { fontSize: active.titleSize }
                  : undefined
              }
            >
              {active.title}
              {active.title2 && (
                <>
                  <br />
                  {active.title2}
                </>
              )}
            </h1>
            <p
              className="text-text max-w-lg"
              style={
                typeof active.textSize === "number"
                  ? { fontSize: active.textSize }
                  : undefined
              }
            >
              {active.text}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button href="#estimate" variant="primary">
                <Icon name="i-calculator" />
                費用估算
              </Button>
              <Button href="https://line.me/ti/p/~derrick00" variant="light">
                <Icon name="i-message" />
                LINE 詢價
              </Button>
            </div>
          </div>
        </div>

        {banners.length > 1 && (
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {banners.map((banner, i) => (
              <button
                key={banner.id}
                type="button"
                aria-label={`切換到第 ${i + 1} 張`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === index ? "bg-brand w-6" : "w-2 bg-white/40",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
