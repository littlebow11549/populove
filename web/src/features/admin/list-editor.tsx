"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

import { resizeImageToDataUrl } from "@/lib/utils/image";

import { IconSelect } from "./icon-select";
import {
  adminField,
  adminGhostButton,
  adminLabel,
  adminPrimaryButton,
} from "./ui";

export interface FieldDef<T> {
  name: Extract<keyof T, string>;
  label: string;
  type?: "text" | "textarea" | "icon" | "image" | "select" | "number";
  placeholder?: string;
  required?: boolean;
  options?: ReadonlyArray<{ value: string; label: string }>;
}

interface ListEditorProps<T extends { id: string }> {
  initial: T[];
  fields: ReadonlyArray<FieldDef<T>>;
  primaryField: Extract<keyof T, string>;
  emptyItem: () => T;
  summarize: (item: T) => string;
  onSave: (items: T[]) => void;
  addLabel?: string;
  thumbnail?: (item: T) => string | undefined;
}

/**
 * 共用清單編輯器：新增／編輯／刪除／上下移，並在每次變更後自動儲存。
 * 支援文字、多行、圖示、圖片上傳、下拉與數字欄位，商品與 Banner 皆沿用。
 */
export function ListEditor<T extends { id: string }>({
  initial,
  fields,
  primaryField,
  emptyItem,
  summarize,
  onSave,
  addLabel = "新增",
  thumbnail,
}: ListEditorProps<T>) {
  const [items, setItems] = useState<T[]>(initial);
  const [draft, setDraft] = useState<T>(emptyItem);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function commit(next: T[]) {
    setItems(next);
    onSave(next);
    setSaved(true);
  }

  function setField(name: Extract<keyof T, string>, value: string | number) {
    setDraft((current) => ({ ...current, [name]: value }) as T);
  }

  async function handleImage(name: Extract<keyof T, string>, file: File) {
    const dataUrl = await resizeImageToDataUrl(file);
    setField(name, dataUrl);
  }

  function resetForm() {
    setDraft(emptyItem());
    setEditingId(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = editingId
      ? items.map((item) => (item.id === editingId ? draft : item))
      : [...items, draft];
    commit(next);
    resetForm();
  }

  function editItem(item: T) {
    setDraft({ ...item } as T);
    setEditingId(item.id);
  }

  function removeItem(removeId: string) {
    commit(items.filter((item) => item.id !== removeId));
    if (editingId === removeId) resetForm();
  }

  function move(moveId: string, direction: -1 | 1) {
    const index = items.findIndex((item) => item.id === moveId);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    commit(next);
  }

  function renderField(field: FieldDef<T>) {
    const value = String(draft[field.name] ?? "");
    switch (field.type) {
      case "icon":
        return (
          <IconSelect
            value={value}
            onChange={(next) => setField(field.name, next)}
          />
        );
      case "image":
        return (
          <div className="flex items-center gap-3">
            <span className="border-border bg-surface flex h-20 w-20 flex-none items-center justify-center overflow-hidden rounded-xl border">
              {value ? (
                <Image
                  src={value}
                  alt="預覽"
                  width={80}
                  height={80}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-muted text-xs">無圖</span>
              )}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void handleImage(field.name, file);
              }}
              className="text-text text-sm"
            />
          </div>
        );
      case "select":
        return (
          <select
            value={value}
            onChange={(event) => setField(field.name, event.target.value)}
            className={adminField}
          >
            {(field.options ?? []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "number":
        return (
          <input
            type="number"
            value={value}
            onChange={(event) =>
              setField(
                field.name,
                event.target.value === "" ? "" : Number(event.target.value),
              )
            }
            placeholder={field.placeholder}
            className={adminField}
          />
        );
      case "textarea":
        return (
          <textarea
            rows={3}
            value={value}
            onChange={(event) => setField(field.name, event.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={adminField}
          />
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(event) => setField(field.name, event.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={adminField}
          />
        );
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="text-amber text-sm font-bold">
          {editingId ? "編輯項目" : addLabel}
        </p>
        {fields.map((field) => (
          <label key={field.name} className={adminLabel}>
            {field.label}
            {renderField(field)}
          </label>
        ))}
        <div className="flex gap-2">
          <button type="submit" className={adminPrimaryButton}>
            {editingId ? "更新項目" : addLabel}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className={adminGhostButton}
            >
              取消
            </button>
          )}
        </div>
      </form>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-muted text-sm font-bold">
            共 {items.length} 筆
          </span>
          {saved && (
            <span className="text-amber text-sm font-bold">已自動儲存 ✓</span>
          )}
        </div>
        <ul className="flex flex-col gap-2">
          {items.map((item, index) => {
            const thumb = thumbnail?.(item);
            return (
              <li
                key={item.id}
                className="border-border bg-surface flex items-center gap-3 rounded-xl border px-4 py-3"
              >
                {thumbnail && (
                  <span className="border-border bg-panel flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-lg border">
                    {thumb && (
                      <Image
                        src={thumb}
                        alt=""
                        width={48}
                        height={48}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    )}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <strong className="block truncate">
                    {String(item[primaryField]) || "未命名"}
                  </strong>
                  <span className="text-muted block truncate text-sm">
                    {summarize(item)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="上移"
                    disabled={index === 0}
                    onClick={() => move(item.id, -1)}
                    className="text-text hover:text-ink rounded-lg px-2 py-1 disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    aria-label="下移"
                    disabled={index === items.length - 1}
                    onClick={() => move(item.id, 1)}
                    className="text-text hover:text-ink rounded-lg px-2 py-1 disabled:opacity-30"
                  >
                    ▼
                  </button>
                  <button
                    type="button"
                    onClick={() => editItem(item)}
                    className={adminGhostButton}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="border-border text-text hover:border-brand hover:text-ink rounded-full border px-3 py-2 text-sm font-bold"
                  >
                    刪除
                  </button>
                </div>
              </li>
            );
          })}
          {items.length === 0 && (
            <li className="border-border bg-surface text-muted rounded-xl border px-4 py-6 text-center text-sm">
              尚無項目，請用左側表單新增。
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
