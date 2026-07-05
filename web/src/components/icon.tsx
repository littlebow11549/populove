import { cn } from "@/lib/utils/cn";

/**
 * 線條圖示。透過 <use> 引用 IconSprite 中的 symbol。
 * 預設大小跟著字級（1.1em），顏色跟著 currentColor。
 */
export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      className={cn(
        "h-[1.1em] w-[1.1em] flex-none fill-none stroke-current [stroke-width:2] [stroke-linecap:round] [stroke-linejoin:round]",
        className,
      )}
    >
      <use href={`#${name}`} />
    </svg>
  );
}
