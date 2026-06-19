import Image from "next/image";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import type { Banner } from "@/lib/data/types";

/**
 * 主視覺。P1.0 先呈現單張主 Banner；輪播動畫於後續子階段補上。
 */
export function Hero({ banners }: { banners: Banner[] }) {
  const banner = banners.find((item) => item.primary) ?? banners[0];
  if (!banner) return null;

  return (
    <section aria-label="主視覺" className="relative isolate overflow-hidden">
      <div className="relative h-[clamp(440px,72vh,640px)] w-full">
        <Image
          src={banner.image}
          alt={banner.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="from-base/95 via-base/70 absolute inset-0 bg-gradient-to-r to-transparent" />
      </div>

      <div className="absolute inset-0">
        <div className="mx-auto flex h-full max-w-6xl flex-col justify-center gap-4 px-6">
          <p className="text-amber text-sm font-bold tracking-widest">
            {banner.label}
          </p>
          <h1 className="max-w-xl text-3xl leading-tight font-black sm:text-5xl">
            {banner.title}
          </h1>
          <p className="text-text max-w-lg">{banner.text}</p>
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
    </section>
  );
}
