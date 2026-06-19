import { Icon } from "@/components/icon";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/data/types";

export function Products({ products }: { products: Product[] }) {
  if (!products.length) return null;

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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
