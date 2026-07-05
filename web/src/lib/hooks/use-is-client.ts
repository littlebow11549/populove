import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * 是否在用戶端（瀏覽器）。
 * 用 useSyncExternalStore 取代「mount 後 setState」，避免水合不一致與多餘渲染。
 * 伺服器端回傳 false、用戶端回傳 true。
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
