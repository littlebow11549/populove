import { NextResponse } from "next/server";

import {
  COOKIE_NAME,
  SESSION_TTL_SECONDS,
  signSession,
  verifyCredentials,
} from "@/features/admin/session";

export async function POST(request: Request) {
  let email = "";
  let password = "";
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };
    email = String(body.email ?? "");
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!(await verifyCredentials(email, password))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, signSession(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return response;
}
