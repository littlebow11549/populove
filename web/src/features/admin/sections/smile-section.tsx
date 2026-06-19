"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

import { Icon } from "@/components/icon";
import { normalizeFloatButtons } from "@/lib/data/normalize";
import type { FloatButton, SmileEntry } from "@/lib/data/types";
import { load, save } from "@/lib/store/index";
import { id } from "@/lib/utils/id";
import { resizeImageToDataUrl } from "@/lib/utils/image";
import { cn } from "@/lib/utils/cn";

import { Toggle } from "../toggle";
import {
  adminField,
  adminGhostButton,
  adminLabel,
  adminPrimaryButton,
} from "../ui";

type EntryTextKey = "label" | "href" | "giphyKey" | "image";

export function SmileSection() {
  const [entry, setEntry] = useState<SmileEntry>(() => load("smileEntry"));
  const [buttons, setButtons] = useState<FloatButton[]>(() =>
    normalizeFloatButtons(load("floatButtons")),
  );
  const [entrySaved, setEntrySaved] = useState(false);
  const [buttonsSaved, setButtonsSaved] = useState(false);

  function setEntryText(key: EntryTextKey, value: string) {
    setEntry((current) => ({ ...current, [key]: value }));
  }

  async function handleEntryImage(file: File) {
    const dataUrl = await resizeImageToDataUrl(file, 320);
    setEntryText("image", dataUrl);
  }

  function saveEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    save("smileEntry", entry);
    setEntrySaved(true);
  }

  function setButton(buttonId: string, patch: Partial<FloatButton>) {
    setButtons((current) =>
      current.map((item) =>
        item.id === buttonId ? { ...item, ...patch } : item,
      ),
    );
  }

  function addButton() {
    if (buttons.length >= 2) return;
    setButtons((current) => [
      ...current,
      {
        id: id("fb"),
        text: "",
        href: "",
        color: "#ff8a1f",
        hidden: false,
        enabled: true,
      },
    ]);
  }

  function removeButton(buttonId: string) {
    setButtons((current) => current.filter((item) => item.id !== buttonId));
  }

  function saveButtons() {
    const next = normalizeFloatButtons(buttons);
    setButtons(next);
    save("floatButtons", next);
    setButtonsSaved(true);
  }

  return (
    <div className="flex flex-col gap-10">
      {/* 笑一下入口 */}
      <form onSubmit={saveEntry} className="flex max-w-xl flex-col gap-4">
        <h3 className="text-lg font-black">笑一下入口</h3>
        <Toggle
          checked={entry.enabled}
          onChange={(value) =>
            setEntry((current) => ({ ...current, enabled: value }))
          }
          label="啟用笑一下入口（關閉時首頁不顯示）"
        />
        <label className={adminLabel}>
          按鈕文字
          <input
            className={adminField}
            value={entry.label}
            onChange={(event) => setEntryText("label", event.target.value)}
          />
        </label>
        <label className={adminLabel}>
          連結
          <input
            className={adminField}
            value={entry.href}
            onChange={(event) => setEntryText("href", event.target.value)}
          />
        </label>
        <label className={adminLabel}>
          圖示
          <div className="flex items-center gap-3">
            <span className="border-border bg-surface flex h-16 w-16 flex-none items-center justify-center overflow-hidden rounded-xl border">
              {entry.image && (
                <Image
                  src={entry.image}
                  alt="預覽"
                  width={64}
                  height={64}
                  unoptimized
                  className="h-full w-full object-contain"
                />
              )}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void handleEntryImage(file);
              }}
              className="text-text text-sm"
            />
          </div>
        </label>
        <label className={adminLabel}>
          Giphy API Key
          <input
            className={adminField}
            value={entry.giphyKey}
            onChange={(event) => setEntryText("giphyKey", event.target.value)}
            placeholder="填入後每小時抓圖（可留空）"
          />
        </label>
        <div className="flex items-center gap-3">
          <button type="submit" className={adminPrimaryButton}>
            <Icon name="i-clipboard" />
            儲存笑一下入口
          </button>
          {entrySaved && (
            <span className="text-amber text-sm font-bold">已儲存 ✓</span>
          )}
        </div>
      </form>

      {/* 懸浮按鈕 */}
      <div className="border-border border-t pt-8">
        <div className="mb-2 flex items-center justify-between gap-4">
          <h3 className="text-lg font-black">懸浮按鈕（最多 2 個）</h3>
          <button
            type="button"
            onClick={addButton}
            disabled={buttons.length >= 2}
            className={cn(
              adminGhostButton,
              buttons.length >= 2 && "opacity-40",
            )}
          >
            ＋ 新增懸浮按鈕
          </button>
        </div>
        <p className="text-muted mb-4 text-sm">
          顯示在首頁右下角，樣式參考推廣。可設定超連結、連結資訊、顏色，並控制是否隱藏與是否作用。
        </p>

        <div className="flex flex-col gap-4">
          {buttons.length === 0 && (
            <p className="border-border bg-surface text-muted rounded-xl border px-4 py-6 text-center text-sm">
              尚未新增懸浮按鈕，點上方「新增懸浮按鈕」加入。
            </p>
          )}
          {buttons.map((button, index) => (
            <div
              key={button.id}
              className="border-border bg-surface rounded-2xl border p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <strong className="text-amber">懸浮按鈕 {index + 1}</strong>
                <button
                  type="button"
                  onClick={() => removeButton(button.id)}
                  className="border-border text-text hover:border-brand hover:text-ink rounded-full border px-3 py-1.5 text-sm font-bold"
                >
                  移除
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={adminLabel}>
                  連結資訊（顯示文字）
                  <input
                    className={adminField}
                    value={button.text}
                    onChange={(event) =>
                      setButton(button.id, { text: event.target.value })
                    }
                    placeholder="例如：奇幻角色生成器"
                  />
                </label>
                <label className={adminLabel}>
                  超連結
                  <input
                    className={adminField}
                    value={button.href}
                    onChange={(event) =>
                      setButton(button.id, { href: event.target.value })
                    }
                    placeholder="https://"
                  />
                </label>
                <label className={adminLabel}>
                  顏色
                  <input
                    type="color"
                    value={button.color}
                    onChange={(event) =>
                      setButton(button.id, { color: event.target.value })
                    }
                    className="border-border bg-surface h-11 w-full rounded-xl border"
                  />
                </label>
                <div className="flex items-end gap-6">
                  <Toggle
                    checked={button.enabled}
                    onChange={(value) =>
                      setButton(button.id, { enabled: value })
                    }
                    label="是否作用"
                  />
                  <Toggle
                    checked={button.hidden}
                    onChange={(value) =>
                      setButton(button.id, { hidden: value })
                    }
                    label="是否隱藏"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={saveButtons}
            className={adminPrimaryButton}
          >
            <Icon name="i-clipboard" />
            儲存懸浮按鈕
          </button>
          {buttonsSaved && (
            <span className="text-amber text-sm font-bold">已儲存 ✓</span>
          )}
        </div>
      </div>
    </div>
  );
}
