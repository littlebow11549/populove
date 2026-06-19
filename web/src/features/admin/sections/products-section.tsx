"use client";

import type { Product } from "@/lib/data/types";
import { load, save } from "@/lib/store/index";
import { id } from "@/lib/utils/id";

import { ListEditor, type FieldDef } from "../list-editor";

const FIELDS: ReadonlyArray<FieldDef<Product>> = [
  { name: "image", label: "商品圖片", type: "image" },
  { name: "name", label: "商品名稱", required: true },
  { name: "price", label: "商品價格", placeholder: "例如：NT$ 390 起" },
  {
    name: "href",
    label: "商品連結",
    placeholder: "https:// 或 #estimate，可留空",
  },
  {
    name: "tagLevel",
    label: "標籤等級",
    type: "select",
    options: [
      { value: "", label: "無標籤" },
      { value: "1", label: "等級 1" },
      { value: "2", label: "等級 2" },
      { value: "3", label: "等級 3" },
    ],
  },
  { name: "tagText", label: "標籤內容", placeholder: "例如：熱銷 / 新品" },
];

export function ProductsSection() {
  return (
    <ListEditor<Product>
      initial={load("products")}
      fields={FIELDS}
      primaryField="name"
      emptyItem={() => ({
        id: id("p"),
        name: "",
        image: "/placeholders/product.svg",
      })}
      summarize={(item) =>
        [item.price, item.tagText].filter(Boolean).join(" / ")
      }
      onSave={(items) => save("products", items)}
      addLabel="新增商品"
      thumbnail={(item) => item.image}
    />
  );
}
