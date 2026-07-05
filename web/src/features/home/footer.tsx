import Link from "next/link";

import { Icon } from "@/components/icon";

export function Footer() {
  return (
    <footer className="border-border bg-surface border-t">
      <div className="text-muted mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm sm:flex-row">
        <span>© {new Date().getFullYear()} POPULOVE Studio</span>
        <Link
          href="/admin"
          className="hover:text-ink inline-flex items-center gap-1.5"
        >
          <Icon name="i-settings" />
          設定
        </Link>
      </div>
    </footer>
  );
}
