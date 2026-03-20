import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site";
import { clearAdminSessionCookie } from "@/server/admin/auth";

export async function POST() {
  await clearAdminSessionCookie();

  return NextResponse.redirect(new URL("/admin/login", getSiteUrl()));
}
