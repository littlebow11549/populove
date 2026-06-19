import { Icon } from "@/components/icon";
import type { Category } from "@/lib/data/types";
import { categoryIcon } from "@/lib/utils/icons";

export function CategoryStrip({ categories }: { categories: Category[] }) {
  if (!categories.length) return null;

  return (
    <section
      aria-label="產品分類"
      className="border-border bg-surface/40 border-b"
    >
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-4">
        {categories.map((category) => (
          <a
            key={category.id}
            href={category.href || "#products"}
            title={category.description}
            className="border-border bg-panel text-text hover:border-brand hover:text-ink flex min-w-[84px] flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-bold"
          >
            <Icon
              name={categoryIcon(category)}
              className="text-amber h-5 w-5"
            />
            {category.label}
          </a>
        ))}
      </div>
    </section>
  );
}
