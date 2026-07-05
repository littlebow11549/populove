import type { Metadata } from "next";

import { AdminApp } from "@/features/admin/admin-app";

export const metadata: Metadata = {
  title: "POPULOVE 後台",
  // 後台不需要被搜尋引擎收錄。
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminApp />;
}
