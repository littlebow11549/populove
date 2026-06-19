"use client";

import { useState, type FormEvent } from "react";

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
  type?: "text" | "textarea" | "icon";
  placeholder?: string;
  required?: boolean;
}

interface ListEditorProps<T extends { id: string }> {
  initial: T[];
  fields: ReadonlyArray<FieldDef<T>>;
  primaryField: Extract<keyof T, string>;
  emptyItem: () => T;
  summarize: (item: T) => string;
  onSave: (items: T[]) => void;
  addLabel?: string;
}

/**
 * 共用清單編輯器：新增／編輯／刪除／上下移，並在每次變更後自動儲存。
 * 商品、Banner 等清單型區塊都能沿用此元件。
 */
export function ListEditor<T extends { id: string }>({
  initial,
  fields,
  primaryField,
  emptyItem,
  summarize,
  onSave,
  addLabel = "新增",
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

  function setField(name: Extract<keyof T, string>, value: string) {
    setDraft((current) => ({ ...current, [name]: value }) as T);
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

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="text-amber text-sm font-bold">
          {editingId ? "編輯項目" : addLabel}
        </p>
        {fields.map((field) => (
          <label key={field.name} className={adminLabel}>
            {field.label}
            {field.type === "icon" ? (
              <IconSelect
                value={String(draft[field.name] ?? "")}
                onChange={(value) => setField(field.name, value)}
              />
            ) : field.type === "textarea" ? (
              <textarea
                rows={3}
                value={String(draft[field.name] ?? "")}
                onChange={(event) => setField(field.name, event.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                className={adminField}
              />
            ) : (
              <input
                type="text"
                value={String(draft[field.name] ?? "")}
                onChange={(event) => setField(field.name, event.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                className={adminField}
              />
            )}
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
          {items.map((item, index) => (
            <li
              key={item.id}
              className="border-border bg-surface flex items-center gap-3 rounded-xl border px-4 py-3"
            >
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
          ))}
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
