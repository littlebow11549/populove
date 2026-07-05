"use client";

import { useState } from "react";

import { Icon } from "@/components/icon";
import type { ReactionSettings } from "@/lib/data/types";
import { REACTION_FACES, REACTIONS } from "@/lib/smile/state";
import { saveContent } from "@/lib/store/content";
import { load } from "@/lib/store/index";

import { Toggle } from "../toggle";
import { adminPrimaryButton } from "../ui";

/**
 * 笑一下「反應」顯示開關：可隱藏個別反應（關閉的不會出現在反應區）。
 */
export function ReactionsSection() {
  const [visible, setVisible] = useState<Record<string, boolean>>(() => ({
    ...load("reactionSettings").visible,
  }));
  const [saved, setSaved] = useState(false);

  function toggle(reaction: string, value: boolean) {
    setVisible((current) => ({ ...current, [reaction]: value }));
    setSaved(false);
  }

  function save() {
    saveContent("reactionSettings", { visible } satisfies ReactionSettings);
    setSaved(true);
  }

  return (
    <div className="flex max-w-xl flex-col gap-4">
      <h3 className="text-lg font-black">笑一下反應</h3>
      <p className="text-muted text-sm">
        關閉的反應不會出現在迷因卡下方的反應區。
      </p>
      <div className="flex flex-col gap-3">
        {REACTIONS.map((reaction) => (
          <div
            key={reaction}
            className="border-border bg-surface flex items-center justify-between gap-4 rounded-xl border px-4 py-3"
          >
            <span className="flex items-center gap-3 font-bold">
              <i className="text-ink text-lg leading-none not-italic">
                {REACTION_FACES[reaction]}
              </i>
              {reaction}
            </span>
            <Toggle
              checked={visible[reaction] !== false}
              onChange={(value) => toggle(reaction, value)}
              label="顯示"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={save} className={adminPrimaryButton}>
          <Icon name="i-clipboard" />
          儲存反應設定
        </button>
        {saved && (
          <span className="text-amber text-sm font-bold">已儲存 ✓</span>
        )}
      </div>
    </div>
  );
}
