/**
 * 後台版本快照／回復。
 *
 * 版本＝某個時間點「所有內容區塊」的快照。屬於後台內部機制，
 * 自成一組儲存鍵，不混進內容資料層（DataSchema）。
 */
import { STORAGE_KEYS, type DataKey } from "@/lib/data/keys";
import { load, save } from "@/lib/store/index";
import { readValue, writeValue } from "@/lib/store/storage";
import { id } from "@/lib/utils/id";

const HISTORY_KEY = "populoveVersionHistory";
const SETTINGS_KEY = "populoveVersionSettings";
const CONTENT_KEYS = Object.keys(STORAGE_KEYS) as DataKey[];

export interface Snapshot {
  id: string;
  label: string;
  createdAt: number;
  payload: Record<string, unknown>;
}

export function readVersions(): Snapshot[] {
  return readValue<Snapshot[]>(HISTORY_KEY, []);
}

function writeVersions(items: Snapshot[]): void {
  writeValue(HISTORY_KEY, items);
}

export function readMaxVersions(): number {
  const value = readValue<{ maxVersions: number }>(SETTINGS_KEY, {
    maxVersions: 5,
  });
  return Math.min(5, Math.max(2, Number(value.maxVersions) || 5));
}

export function writeMaxVersions(maxVersions: number): void {
  writeValue(SETTINGS_KEY, {
    maxVersions: Math.min(5, Math.max(2, maxVersions || 5)),
  });
}

/** 擷取目前所有內容為一個版本快照（保留數量上限）。 */
export function captureSnapshot(label: string): void {
  const payload: Record<string, unknown> = {};
  for (const key of CONTENT_KEYS) payload[key] = load(key);
  const snapshot: Snapshot = {
    id: id("ver"),
    label: label || "未命名版本",
    createdAt: Date.now(),
    payload,
  };
  writeVersions([snapshot, ...readVersions()].slice(0, readMaxVersions()));
}

/** 回復一個版本：把快照內容寫回各資料區塊。 */
export function restoreSnapshot(snapshot: Snapshot): void {
  for (const key of CONTENT_KEYS) {
    if (key in snapshot.payload) {
      // 泛型回寫，型別正確性由快照產生時保證。
      save(key, snapshot.payload[key] as never);
    }
  }
}

export function deleteSnapshot(snapshotId: string): void {
  writeVersions(readVersions().filter((item) => item.id !== snapshotId));
}
