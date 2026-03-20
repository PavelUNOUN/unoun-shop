import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/server/admin/auth";

export async function POST(request: Request) {
  await clearAdminSessionCookie();

  return NextResponse.redirect(new URL("/admin/login", request.url));
}
