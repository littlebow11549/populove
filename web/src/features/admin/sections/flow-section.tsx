"use client";

import type { FlowStep } from "@/lib/data/types";
import { load, save } from "@/lib/store/index";
import { id } from "@/lib/utils/id";

import { ListEditor, type FieldDef } from "../list-editor";

const FIELDS: ReadonlyArray<FieldDef<FlowStep>> = [
  { name: "title", label: "流程標題", required: true },
  { name: "text", label: "流程說明", type: "textarea", required: true },
  { name: "link", label: "按鈕文字" },
  { name: "href", label: "按鈕連結" },
  { name: "icon", label: "流程圖示", type: "icon" },
];

export function FlowSection() {
  return (
    <ListEditor<FlowStep>
      initial={load("flow")}
      fields={FIELDS}
      primaryField="title"
      emptyItem={() => ({
        id: id("f"),
        icon: "i-search",
        title: "",
        text: "",
        href: "",
        link: "",
      })}
      summarize={(item) => item.text}
      onSave={(items) => save("flow", items)}
      addLabel="新增流程"
    />
  );
}
