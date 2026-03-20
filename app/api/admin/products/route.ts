import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/prisma";
import { FLAGSHIP_PRODUCT } from "@/lib/catalog";
import { getSiteUrl } from "@/lib/site";
import { isAdminAuthenticated } from "@/server/admin/auth";

function buildAbsoluteUrl(pathname: string) {
  return new URL(pathname, getSiteUrl());
}

export async function POST(request: Request) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return NextResponse.redirect(buildAbsoluteUrl("/admin/login"));
  }

  const formData = await request.formData();

  const title = String(formData.get("title") ?? "").trim();
  const shortTitle = String(formData.get("shortTitle") ?? "").trim();
  const price = Number(formData.get("price") ?? 0);
  const originalPrice = Number(formData.get("originalPrice") ?? 0);
  const stock = Number(formData.get("stock") ?? 0);
  const isActive = formData.get("isActive") === "on";

  if (!title || !shortTitle || !Number.isFinite(price) || price < 0) {
    return NextResponse.redirect(buildAbsoluteUrl("/admin/products?error=invalid"));
  }

  const prisma = getPrismaClient();

  await prisma.product.upsert({
    where: {
      slug: FLAGSHIP_PRODUCT.slug,
    },
    update: {
      title,
      shortTitle,
      price,
      originalPrice: Number.isFinite(originalPrice) ? originalPrice : price,
      stock: Number.isFinite(stock) ? stock : 0,
      isActive,
      image: FLAGSHIP_PRODUCT.image,
    },
    create: {
      slug: FLAGSHIP_PRODUCT.slug,
      title,
      shortTitle,
      price,
      originalPrice: Number.isFinite(originalPrice) ? originalPrice : price,
      stock: Number.isFinite(stock) ? stock : 0,
      isActive,
      image: FLAGSHIP_PRODUCT.image,
    },
  });

  return NextResponse.redirect(buildAbsoluteUrl("/admin/products?saved=1"));
}
