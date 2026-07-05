import { NextResponse } from "next/server";

import { pingCloud, serverSupabaseReady } from "@/lib/supabase/server";

/**
 * 健康檢查端點：回報正式站伺服器端是否連得上雲端內容庫。
 * 部署後驗證用：`curl -s https://populove.org/api/health` 應回 {"ok":true,...}。
 * 後台的雲端狀態指示燈也讀這裡。
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const cloudReachable = await pingCloud();
  return NextResponse.json({
    ok: cloudReachable,
    secretConfigured: serverSupabaseReady,
    cloudReachable,
  });
}
