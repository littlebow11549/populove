"use client";

import { useState } from "react";

import { Icon } from "@/components/icon";

import {
  adminField,
  adminGhostButton,
  adminLabel,
  adminPrimaryButton,
} from "../ui";
import {
  captureSnapshot,
  deleteSnapshot,
  readMaxVersions,
  readVersions,
  restoreSnapshot,
  writeMaxVersions,
  type Snapshot,
} from "../versions";

export function VersionsSection() {
  const [versions, setVersions] = useState<Snapshot[]>(() => readVersions());
  const [maxVersions, setMaxVersions] = useState<number>(() =>
    readMaxVersions(),
  );
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  function handleCapture() {
    captureSnapshot(name.trim() || "手動建立版本");
    setName("");
    setVersions(readVersions());
    setStatus("已建立目前版本。");
  }

  function handleRestore(snapshot: Snapshot) {
    if (
      !window.confirm(`確定要回復「${snapshot.label}」嗎？目前內容會被覆蓋。`)
    ) {
      return;
    }
    restoreSnapshot(snapshot);
    setStatus("已回復選定版本；重新整理頁面即可看到內容。");
  }

  function handleDelete(snapshotId: string) {
    if (!window.confirm("確定要刪除這個版本嗎？")) return;
    deleteSnapshot(snapshotId);
    setVersions(readVersions());
  }

  function handleMax(value: number) {
    const next = Math.min(5, Math.max(2, value || 5));
    setMaxVersions(next);
    writeMaxVersions(next);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid max-w-xl gap-4">
        <label className={adminLabel}>
          可回復版本數量（2–5）
          <input
            type="number"
            min={2}
            max={5}
            value={maxVersions}
            onChange={(event) => handleMax(Number(event.target.value))}
            className={adminField}
          />
        </label>
        <label className={adminLabel}>
          版本名稱
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="例如：上架春季商品前"
            className={adminField}
          />
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCapture}
            className={adminPrimaryButton}
          >
            <Icon name="i-clock" />
            建立目前版本
          </button>
          {status && (
            <span className="text-amber text-sm font-bold">{status}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-muted text-sm font-bold">
          可回復版本（{versions.length}/{maxVersions}）
        </span>
        <ul className="flex flex-col gap-2">
          {versions.length === 0 && (
            <li className="border-border bg-surface text-muted rounded-xl border px-4 py-6 text-center text-sm">
              尚未建立可回復版本。
            </li>
          )}
          {versions.map((snapshot) => (
            <li
              key={snapshot.id}
              className="border-border bg-surface flex items-center gap-3 rounded-xl border px-4 py-3"
            >
              <span className="border-border bg-panel text-amber flex h-10 w-10 flex-none items-center justify-center rounded-lg border">
                <Icon name="i-clock" className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <strong className="block truncate">{snapshot.label}</strong>
                <span className="text-muted block truncate text-sm">
                  {new Date(snapshot.createdAt).toLocaleString("zh-TW")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleRestore(snapshot)}
                  className={adminGhostButton}
                >
                  回復
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(snapshot.id)}
                  className="border-border text-text hover:border-brand hover:text-ink rounded-full border px-3 py-2 text-sm font-bold"
                >
                  刪除
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
