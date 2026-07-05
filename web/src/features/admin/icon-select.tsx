"use client";

import { Icon } from "@/components/icon";
import { ICON_CHOICES } from "@/lib/utils/icons";

import { adminField } from "./ui";

const ICONS = Array.from(ICON_CHOICES);

export function IconSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="border-border bg-panel text-amber flex h-11 w-11 flex-none items-center justify-center rounded-xl border">
        <Icon name={value || "i-shirt"} className="h-5 w-5" />
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={adminField}
      >
        {ICONS.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
