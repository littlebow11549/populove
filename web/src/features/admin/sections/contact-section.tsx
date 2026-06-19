"use client";

import { useState, type FormEvent } from "react";

import { Icon } from "@/components/icon";
import type { ContactInfo } from "@/lib/data/types";
import { load, save } from "@/lib/store/index";

import { adminField, adminLabel, adminPrimaryButton } from "../ui";

const FIELDS: ReadonlyArray<{ key: keyof ContactInfo; label: string }> = [
  { key: "line", label: "LINE ID" },
  { key: "phone", label: "專線" },
  { key: "email", label: "客服 Email" },
  { key: "hours", label: "服務時間" },
];

export function ContactSection() {
  const [data, setData] = useState<ContactInfo>(() => load("contact"));
  const [savedAt, setSavedAt] = useState(0);

  function update(key: keyof ContactInfo, value: string) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    save("contact", data);
    setSavedAt(Date.now());
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-4">
      {FIELDS.map((field) => (
        <label key={field.key} className={adminLabel}>
          {field.label}
          <input
            type="text"
            value={data[field.key]}
            onChange={(event) => update(field.key, event.target.value)}
            required
            className={adminField}
          />
        </label>
      ))}
      <div className="flex items-center gap-3">
        <button type="submit" className={adminPrimaryButton}>
          <Icon name="i-clipboard" />
          儲存聯繫資訊
        </button>
        {savedAt > 0 && (
          <span className="text-amber text-sm font-bold">已儲存 ✓</span>
        )}
      </div>
    </form>
  );
}
