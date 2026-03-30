import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site";
import {
  createAccountOAuthState,
  clearAccountSessionCookie,
} from "@/server/account/auth";
import {
  buildYandexOAuthUrl,
  isYandexOAuthConfigured,
} from "@/server/account/yandex";

function buildAbsoluteUrl(pathname: string) {
  return new URL(pathname, getSiteUrl());
}

export async function GET() {
  if (!isYandexOAuthConfigured()) {
    return NextResponse.redirect(
      buildAbsoluteUrl("/account/auth?error=yandex-not-configured")
    );
  }

  await clearAccountSessionCookie();
  const state = await createAccountOAuthState();

  return NextResponse.redirect(buildYandexOAuthUrl(state));
}
