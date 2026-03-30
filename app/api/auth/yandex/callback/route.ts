import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site";
import {
  setAccountSessionCookie,
  verifyAccountOAuthState,
} from "@/server/account/auth";
import { authenticateWithYandexCode } from "@/server/account/yandex";

function buildAbsoluteUrl(pathname: string) {
  return new URL(pathname, getSiteUrl());
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code) {
    return NextResponse.redirect(buildAbsoluteUrl("/account/auth?error=missing-code"));
  }

  const validState = await verifyAccountOAuthState(state);

  if (!validState) {
    return NextResponse.redirect(buildAbsoluteUrl("/account/auth?error=invalid-state"));
  }

  try {
    const user = await authenticateWithYandexCode(code);
    await setAccountSessionCookie(user.id);

    return NextResponse.redirect(buildAbsoluteUrl("/account"));
  } catch (error) {
    console.error("Yandex OAuth callback error", error);

    return NextResponse.redirect(buildAbsoluteUrl("/account/auth?error=oauth-failed"));
  }
}
