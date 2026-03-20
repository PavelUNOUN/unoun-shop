import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";
import { isAdminAuthenticated } from "@/server/admin/auth";
import { updateAdminOrderStatus } from "@/server/admin/orders";

export async function POST(request: Request) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const formData = await request.formData();
  const orderId = String(formData.get("orderId") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();

  if (!orderId || !Object.values(OrderStatus).includes(status as OrderStatus)) {
    return NextResponse.redirect(new URL("/admin/orders", request.url));
  }

  await updateAdminOrderStatus(orderId, status as OrderStatus);

  return NextResponse.redirect(new URL("/admin/orders", request.url));
}
