"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils/cn";

/**
 * 內容進場動畫：元素捲進視窗時淡入上移（只觸發一次）。
 * 包在區塊外層即可，預設 display:contents 不影響版面。
 */
export function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("reveal", shown && "reveal-in")}>
      {children}
    </div>
  );
}
