"use client";

import type { ContactCard } from "@/lib/data/types";
import { load, save } from "@/lib/store/index";
import { id } from "@/lib/utils/id";

import { ListEditor, type FieldDef } from "../list-editor";

const FIELDS: ReadonlyArray<FieldDef<ContactCard>> = [
  { name: "title", label: "卡片標題", required: true },
  { name: "text", label: "卡片內容", type: "textarea", required: true },
  { name: "href", label: "連結", placeholder: "https://、tel:、mailto:" },
  { name: "icon", label: "卡片圖示", type: "icon" },
];

export function CardsSection() {
  return (
    <ListEditor<ContactCard>
      initial={load("contactCards")}
      fields={FIELDS}
      primaryField="title"
      emptyItem={() => ({
        id: id("c"),
        icon: "i-message",
        title: "",
        text: "",
        href: "",
      })}
      summarize={(item) => item.text}
      onSave={(items) => save("contactCards", items)}
      addLabel="新增卡片"
    />
  );
}
