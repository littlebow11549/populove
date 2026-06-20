"use client";

import type { SmileTag } from "@/lib/data/types";
import { saveContent } from "@/lib/store/content";
import { load } from "@/lib/store/index";
import { id } from "@/lib/utils/id";

import { ListEditor, type FieldDef } from "../list-editor";

const FIELDS: ReadonlyArray<FieldDef<SmileTag>> = [
  {
    name: "label",
    label: "頁籤名稱",
    required: true,
    placeholder: "例如：貓咪、迷因狗",
  },
  {
    name: "query",
    label: "Giphy 搜尋關鍵字（建議用英文較準）",
    placeholder: "例如：cute cat / funny dog",
  },
];

/**
 * 笑一下頁的自訂頁籤（分類）管理：新增／編輯／刪除／排序。
 * 內建「熱門／搞笑／自創」三個頁籤固定存在，這裡是額外自訂的頁籤。
 * 每個頁籤可填 Giphy 搜尋字，前台按「換一批」時會依此抓對應的圖。
 */
export function SmileTagsSection() {
  return (
    <ListEditor<SmileTag>
      initial={load("smileTags")}
      fields={FIELDS}
      primaryField="label"
      emptyItem={() => ({ id: id("tag"), label: "", query: "" })}
      summarize={(item) =>
        item.query ? `搜尋：${item.query}` : "（未設搜尋字，需搭配 Giphy Key）"
      }
      onSave={(items) => saveContent("smileTags", items)}
      addLabel="新增頁籤"
    />
  );
}
