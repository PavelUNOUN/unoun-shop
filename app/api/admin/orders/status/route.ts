import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";
import { getSiteUrl } from "@/lib/site";
import { isAdminAuthenticated } from "@/server/admin/auth";
import { updateAdminOrderStatus } from "@/server/admin/orders";

function buildAbsoluteUrl(pathname: string) {
  return new URL(pathname, getSiteUrl());
}

export async function POST(request: Request) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return NextResponse.redirect(buildAbsoluteUrl("/admin/login"));
  }

  const formData = await request.formData();
  const orderId = String(formData.get("orderId") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();

  if (!orderId || !Object.values(OrderStatus).includes(status as OrderStatus)) {
    return NextResponse.redirect(buildAbsoluteUrl("/admin/orders"));
  }

  await updateAdminOrderStatus(orderId, status as OrderStatus);

  return NextResponse.redirect(buildAbsoluteUrl("/admin/orders"));
}
