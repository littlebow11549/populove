"use client";

import { useState } from "react";

import { useIsClient } from "@/lib/hooks/use-is-client";

import { getSession, setSession } from "./auth";
import { Dashboard } from "./dashboard";
import { Login } from "./login";

export function AdminApp() {
  // 後台只在用戶端運作（讀寫 localStorage）；伺服器端先不渲染，避免水合不一致。
  const isClient = useIsClient();
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isClient) return null;

  const authed = loggedIn || getSession();
  if (!authed) return <Login onSuccess={() => setLoggedIn(true)} />;

  return (
    <Dashboard
      onLogout={() => {
        setSession(false);
        setLoggedIn(false);
      }}
    />
  );
}
