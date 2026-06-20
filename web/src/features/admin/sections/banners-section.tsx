"use client";

import type { Banner } from "@/lib/data/types";
import { saveContent } from "@/lib/store/content";
import { load } from "@/lib/store/index";
import { id } from "@/lib/utils/id";

import { ListEditor, type FieldDef } from "../list-editor";

const FIELDS: ReadonlyArray<FieldDef<Banner>> = [
  { name: "image", label: "Banner 圖", type: "image" },
  { name: "label", label: "小標", required: true },
  { name: "title", label: "主標（第一行）", required: true },
  { name: "title2", label: "主標第二行（可留空）" },
  { name: "text", label: "說明", type: "textarea", required: true },
  {
    name: "titleSize",
    label: "主標字級 (px)",
    type: "number",
    placeholder: "留空＝自動",
  },
  {
    name: "textSize",
    label: "副標字級 (px)",
    type: "number",
    placeholder: "留空＝自動",
  },
];

export function BannersSection() {
  return (
    <ListEditor<Banner>
      initial={load("banners")}
      fields={FIELDS}
      primaryField="title"
      emptyItem={() => ({
        id: id("b"),
        image: "/placeholders/banner.svg",
        label: "",
        title: "",
        title2: "",
        text: "",
        titleSize: "",
        textSize: "",
      })}
      summarize={(item) => item.label}
      onSave={(items) => saveContent("banners", items)}
      addLabel="新增 Banner"
      thumbnail={(item) => item.image}
    />
  );
}
