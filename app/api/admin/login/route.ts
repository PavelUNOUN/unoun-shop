import { NextResponse } from "next/server";
import {
  isAdminConfigured,
  setAdminSessionCookie,
  validateAdminCredentials,
} from "@/server/admin/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const login = String(formData.get("login") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!isAdminConfigured()) {
    return NextResponse.redirect(new URL("/admin/login?reason=not-configured", request.url));
  }

  if (!validateAdminCredentials(login, password)) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url));
  }

  await setAdminSessionCookie(login);

  return NextResponse.redirect(new URL("/admin/orders", request.url));
}
