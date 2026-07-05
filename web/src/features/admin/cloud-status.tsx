"use client";

import { useEffect, useState } from "react";

import {
  CLOUD_SAVE_EVENT,
  type CloudSaveDetail,
} from "@/lib/store/content";
import { cn } from "@/lib/utils/cn";

type Health = "checking" | "ok" | "error";

/**
 * 雲端同步狀態指示燈＋儲存失敗警示。
 * - 進後台先打 /api/health 確認伺服器端連得上雲端內容庫。
 * - 監聽每次存檔的雲端推送結果；一旦失敗就跳出醒目紅色橫幅，
 *   確保「存進雲端失敗」永遠不會無聲無息（2026-07-05 事故教訓）。
 */
export function CloudStatus() {
  const [health, setHealth] = useState<Health>("checking");
  const [saveFailed, setSaveFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/health", { cache: "no-store" })
      .then((res) => res.json() as Promise<{ ok: boolean }>)
      .then((data) => {
        if (alive) setHealth(data.ok ? "ok" : "error");
      })
      .catch(() => {
        if (alive) setHealth("error");
      });

    const onSave = (event: Event) => {
      const { ok } = (event as CustomEvent<CloudSaveDetail>).detail;
      setSaveFailed(!ok);
      setHealth(ok ? "ok" : "error");
    };
    window.addEventListener(CLOUD_SAVE_EVENT, onSave);
    return () => {
      alive = false;
      window.removeEventListener(CLOUD_SAVE_EVENT, onSave);
    };
  }, []);

  const label =
    health === "checking"
      ? "☁️ 檢查雲端連線…"
      : health === "ok"
        ? "☁️ 雲端同步正常"
        : "⚠️ 雲端連線異常";

  return (
    <>
      <span
        title="正式站伺服器與雲端內容庫的連線狀態"
        className={cn(
          "rounded-full border px-3 py-1.5 text-xs font-bold",
          health === "ok" && "border-emerald-700 text-emerald-400",
          health === "error" && "border-red-700 bg-red-950/40 text-red-300",
          health === "checking" && "border-border text-text",
        )}
      >
        {label}
      </span>
      {(saveFailed || health === "error") && health !== "checking" && (
        <div
          role="alert"
          className="fixed inset-x-0 top-2 z-50 mx-auto w-fit max-w-[90vw] rounded-xl border border-red-700 bg-red-950 px-4 py-3 text-sm font-bold text-red-100 shadow-lg"
        >
          {saveFailed
            ? "⚠️ 雲端儲存失敗：剛才的變更只存在這台瀏覽器，尚未同步到正式站！請重新整理後再存一次；若持續失敗請檢查 /api/health。"
            : "⚠️ 正式站目前連不上雲端內容庫（金鑰缺失或服務異常），存檔將不會同步。請檢查 Netlify 環境變數與 Supabase 狀態。"}
        </div>
      )}
    </>
  );
}
