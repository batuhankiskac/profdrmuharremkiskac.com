import { NextRequest, NextResponse } from "next/server";
import {
  isAdminToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth";
import { getAdminAuth } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  const adminAuth = getAdminAuth();
  if (!adminAuth) {
    return NextResponse.json(
      { error: "Sunucu kimlik doğrulama yapılandırması eksik." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as { idToken?: unknown };
    if (typeof body.idToken !== "string" || !body.idToken) {
      return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
    }

    const decoded = await adminAuth.verifyIdToken(body.idToken, true);
    if (!isAdminToken(decoded)) {
      return NextResponse.json({ error: "Yetkisiz kullanıcı." }, { status: 403 });
    }

    const expiresIn = SESSION_MAX_AGE_SECONDS * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(body.idToken, {
      expiresIn,
    });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: SESSION_MAX_AGE_SECONDS,
      path: "/",
    });
    return response;
  } catch {
    return NextResponse.json(
      { error: "Oturum oluşturulamadı." },
      { status: 401 },
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
  return response;
}
