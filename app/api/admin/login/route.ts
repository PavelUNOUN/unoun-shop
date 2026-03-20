import { NextResponse } from "next/server";
import {
  isAdminConfigured,
  setAdminSessionCookie,
  validateAdminCredentials,
} from "@/server/admin/auth";
import { getSiteUrl } from "@/lib/site";

function buildAbsoluteUrl(pathname: string) {
  return new URL(pathname, getSiteUrl());
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const login = String(formData.get("login") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!isAdminConfigured()) {
    return NextResponse.redirect(buildAbsoluteUrl("/admin/login?reason=not-configured"));
  }

  if (!validateAdminCredentials(login, password)) {
    return NextResponse.redirect(buildAbsoluteUrl("/admin/login?error=invalid"));
  }

  await setAdminSessionCookie(login);

  return NextResponse.redirect(buildAbsoluteUrl("/admin/orders"));
}
