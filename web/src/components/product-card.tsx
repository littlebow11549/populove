import Image from "next/image";

import { cn } from "@/lib/utils/cn";
import type { Product } from "@/lib/data/types";

const TAG_STYLES: Record<string, string> = {
  "1": "bg-brand text-[#15110d]",
  "2": "bg-amber text-[#15110d]",
  "3": "bg-brand-deep text-white",
};

export function ProductCard({ product }: { product: Product }) {
  const tagLevel = product.tagLevel || "1";
  return (
    <article className="border-border bg-panel overflow-hidden rounded-2xl border">
      <div className="bg-surface relative aspect-square">
        {product.tagText && (
          <span
            className={cn(
              "absolute top-3 left-3 z-10 rounded-full px-2.5 py-1 text-xs font-black",
              TAG_STYLES[tagLevel] ?? TAG_STYLES["1"],
            )}
          >
            {product.tagText}
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="space-y-1 p-4">
        <h3 className="font-bold">{product.name}</h3>
        {product.price && (
          <p className="text-amber text-sm font-black">{product.price}</p>
        )}
      </div>
    </article>
  );
}
