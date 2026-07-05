import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { COOKIE_NAME, verifySession } from "@/features/admin/session";
import { upsertSiteData } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!verifySession(cookieStore.get(COOKIE_NAME)?.value)) {
    return NextResponse.json({ ok: false, error: "未授權" }, { status: 401 });
  }

  let key = "";
  let value: unknown;
  try {
    const body = (await request.json()) as { key?: string; value?: unknown };
    key = String(body.key ?? "");
    value = body.value;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!key) return NextResponse.json({ ok: false }, { status: 400 });

  const ok = await upsertSiteData(key, value);
  return NextResponse.json({ ok }, { status: ok ? 200 : 500 });
}
