"use client";

import { useState, type FormEvent } from "react";

import { Icon } from "@/components/icon";

import { setSession, verifyCredentials } from "./auth";
import { adminField, adminLabel, adminPrimaryButton } from "./ui";

export function Login({ onSuccess }: { onSuccess: () => void }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const data = new FormData(event.currentTarget);
    const ok = await verifyCredentials(
      String(data.get("email") ?? ""),
      String(data.get("password") ?? ""),
    );
    setBusy(false);
    if (ok) {
      setSession(true);
      onSuccess();
    } else {
      setError("帳號或密碼錯誤，請再確認一次。");
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-6">
      <section className="border-border bg-panel rounded-2xl border p-8">
        <p className="text-amber text-sm font-bold tracking-widest">
          Admin Login
        </p>
        <h1 className="mt-1 mb-6 text-2xl font-black">後台登入</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className={adminLabel}>
            管理員帳號
            <input
              name="email"
              type="text"
              autoComplete="username"
              required
              className={adminField}
            />
          </label>
          <label className={adminLabel}>
            管理員密碼
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={adminField}
            />
          </label>
          <button type="submit" disabled={busy} className={adminPrimaryButton}>
            <Icon name="i-user" />
            {busy ? "驗證中…" : "登入後台"}
          </button>
          {error && <p className="text-brand text-sm font-bold">{error}</p>}
        </form>
      </section>
    </main>
  );
}
