"use client";

import { useEffect, useState } from "react";

import { useIsClient } from "@/lib/hooks/use-is-client";
import { hydrateFromCloud } from "@/lib/store/cloud-client";

import { getSession, setSession } from "./auth";
import { Dashboard } from "./dashboard";
import { Login } from "./login";

export function AdminApp() {
  const isClient = useIsClient();
  const [loggedIn, setLoggedIn] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // 進後台先把雲端最新內容拉進本機，確保看到的是最新狀態。
  useEffect(() => {
    hydrateFromCloud().finally(() => setHydrated(true));
  }, []);

  if (!isClient || !hydrated) {
    return <p className="text-muted p-10 text-center">載入中…</p>;
  }

  const authed = loggedIn || getSession();
  if (!authed) return <Login onSuccess={() => setLoggedIn(true)} />;

  return (
    <Dashboard
      onLogout={() => {
        void fetch("/api/admin/logout", { method: "POST" });
        setSession(false);
        setLoggedIn(false);
      }}
    />
  );
}
