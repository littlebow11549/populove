"use client";

import type { Category } from "@/lib/data/types";
import { load, save } from "@/lib/store/index";
import { id } from "@/lib/utils/id";

import { ListEditor, type FieldDef } from "../list-editor";

const FIELDS: ReadonlyArray<FieldDef<Category>> = [
  {
    name: "label",
    label: "分類名稱",
    required: true,
    placeholder: "例如：T恤",
  },
  { name: "href", label: "分類連結", placeholder: "#products 或 https://" },
  { name: "icon", label: "分類圖示", type: "icon" },
  { name: "description", label: "詳細資訊", type: "textarea" },
];

export function CategoriesSection() {
  return (
    <ListEditor<Category>
      initial={load("categories")}
      fields={FIELDS}
      primaryField="label"
      emptyItem={() => ({
        id: id("cat"),
        label: "",
        href: "#products",
        icon: "i-shirt",
        description: "",
      })}
      summarize={(item) =>
        [item.href, item.description].filter(Boolean).join(" / ")
      }
      onSave={(items) => save("categories", items)}
      addLabel="新增分類"
    />
  );
}
