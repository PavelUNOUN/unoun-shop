import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site";
import { clearAccountSessionCookie } from "@/server/account/auth";

export async function POST() {
  await clearAccountSessionCookie();
  return NextResponse.redirect(new URL("/account/auth", getSiteUrl()));
}
