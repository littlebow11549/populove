import type { Metadata } from "next";

import { AdminApp } from "@/features/admin/admin-app";

export const metadata: Metadata = {
  title: "POPULOVE 後台",
};

export default function AdminPage() {
  return <AdminApp />;
}
