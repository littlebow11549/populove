import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/icon";
import { pickTextColor } from "@/lib/data/normalize";
import type { FloatButton, SmileEntry } from "@/lib/data/types";

interface FloatButtonsProps {
  smileEntry: SmileEntry;
  buttons: FloatButton[];
}

/** 右下角懸浮按鈕：笑一下入口 + 自訂按鈕（最多 2）+ LINE。 */
export function FloatButtons({ smileEntry, buttons }: FloatButtonsProps) {
  const visible = buttons.filter(
    (button) => !button.hidden && (button.text || button.href),
  );

  return (
    // 容器本身不吃點擊（pointer-events-none），只有按鈕可點，避免擋住底下的「設定」等連結。
    <div className="pointer-events-none fixed right-3 bottom-4 z-50 flex flex-col items-end gap-2 sm:right-4 sm:bottom-5 sm:gap-3">
      {smileEntry.enabled && (
        <Link
          href={smileEntry.href}
          aria-label="進來笑一下"
          className="to-brand pointer-events-auto flex h-14 w-14 -rotate-3 flex-col items-center justify-center gap-0.5 rounded-[18px_18px_18px_6px] border-2 border-white/60 bg-gradient-to-br from-[#ffdf70] text-[10px] font-black text-[#15110d] shadow-lg transition-transform hover:scale-105 active:scale-95 sm:h-16 sm:w-16 sm:rounded-[22px_22px_22px_8px] sm:text-[11px]"
        >
          <Image
            src={smileEntry.image}
            alt="進來笑一下"
            width={26}
            height={26}
          />
          <span>進來笑一下</span>
        </Link>
      )}

      {visible.map((button) => {
        const style = {
          background: button.color,
          color: pickTextColor(button.color),
        };
        const content = (
          <>
            <Icon name="i-arrow" className="h-4 w-4 -rotate-[35deg]" />
            <span className="truncate">{button.text || button.href}</span>
          </>
        );
        const classes =
          "pointer-events-auto flex max-w-[150px] items-center gap-1.5 rounded-full border border-white/40 px-3 py-2 text-xs font-black shadow-lg transition-transform hover:scale-105 active:scale-95 sm:max-w-[220px] sm:gap-2 sm:px-4 sm:py-3 sm:text-sm";

        if (button.enabled && button.href) {
          return (
            <a
              key={button.id}
              href={button.href}
              target={/^https?:/i.test(button.href) ? "_blank" : undefined}
              rel="noopener"
              style={style}
              className={classes}
            >
              {content}
            </a>
          );
        }
        return (
          <span
            key={button.id}
            style={style}
            className={`${classes} opacity-60`}
          >
            {content}
          </span>
        );
      })}

      <a
        href="https://line.me/ti/p/~derrick00"
        target="_blank"
        rel="noopener"
        aria-label="加入 LINE 好友"
        className="pointer-events-auto flex h-12 w-12 flex-col items-center justify-center gap-0.5 rounded-full bg-[#06c755] text-[10px] font-black text-white shadow-lg transition-transform hover:scale-105 active:scale-95 sm:h-14 sm:w-14 sm:text-[11px]"
      >
        <Icon name="i-message" className="h-4 w-4 sm:h-5 sm:w-5" />
        <span>LINE</span>
      </a>
    </div>
  );
}
