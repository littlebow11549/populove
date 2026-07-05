import { NextResponse } from "next/server";

import { fetchSiteValue, upsertSiteData } from "@/lib/supabase/server";

// 可接受的反應（與前台一致），避免任意字串污染計數。
const REACTIONS = ["加油", "還行", "好~~~", "太強了", "Populove!!!"];

type CountsMap = Record<string, Record<string, number>>;

/**
 * 公開的「迷因反應計數」端點：把某張圖的某個反應 +1，回傳該圖最新計數。
 * 僅允許遞增已知反應、限制 memeId 長度，避免濫用。
 */
export async function POST(request: Request) {
  let body: { memeId?: unknown; reaction?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const memeId =
    typeof body.memeId === "string" ? body.memeId.slice(0, 200) : "";
  const reaction = typeof body.reaction === "string" ? body.reaction : "";
  if (!memeId || !REACTIONS.includes(reaction)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const counts = (await fetchSiteValue<CountsMap>("memeReactions")) ?? {};
  const memeCounts = { ...(counts[memeId] ?? {}) };
  memeCounts[reaction] = (memeCounts[reaction] ?? 0) + 1;
  counts[memeId] = memeCounts;
  await upsertSiteData("memeReactions", counts);

  return NextResponse.json({ counts: memeCounts });
}
