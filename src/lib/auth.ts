import "server-only";

import type { DecodedIdToken } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminAuth } from "./firebase-admin";

export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 5;

export function isAdminToken(token: DecodedIdToken): boolean {
  return token.admin === true;
}

export async function getAdminSession(): Promise<DecodedIdToken | null> {
  const adminAuth = getAdminAuth();
  if (!adminAuth) return null;

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  try {
    const token = await adminAuth.verifySessionCookie(sessionCookie, true);
    return isAdminToken(token) ? token : null;
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<DecodedIdToken> {
  const session = await getAdminSession();
  if (!session) redirect("/login");
  return session;
}
