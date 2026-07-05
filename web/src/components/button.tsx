import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "light";

interface ButtonProps {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-lg shadow-brand/30 hover:brightness-105 [&_*]:text-white",
  light: "border border-border bg-surface text-ink hover:bg-panel",
};

/** 連結型按鈕；外部網址自動開新分頁。 */
export function Button({
  href,
  variant = "primary",
  className,
  children,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black transition",
    VARIANTS[variant],
    className,
  );
  if (/^https?:/i.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
