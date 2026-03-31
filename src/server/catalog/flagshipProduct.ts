import { getPrismaClient } from "@/lib/prisma";
import { FLAGSHIP_PRODUCT } from "@/lib/catalog";

const LEGACY_FLAGSHIP_SHORT_TITLES = new Set(["UNOUN 12 в 1"]);

export async function getOrCreateFlagshipProduct() {
  const prisma = getPrismaClient();

  return prisma.product.upsert({
    where: {
      slug: FLAGSHIP_PRODUCT.slug,
    },
    update: {},
    create: {
      slug: FLAGSHIP_PRODUCT.slug,
      title: FLAGSHIP_PRODUCT.title,
      shortTitle: FLAGSHIP_PRODUCT.shortTitle,
      price: FLAGSHIP_PRODUCT.price,
      originalPrice: FLAGSHIP_PRODUCT.originalPrice,
      image: FLAGSHIP_PRODUCT.image,
      isActive: true,
      stock: 20,
    },
  });
}

export async function getStorefrontFlagshipProduct() {
  const product = await getOrCreateFlagshipProduct();
  const normalizedShortTitle =
    !product.shortTitle || LEGACY_FLAGSHIP_SHORT_TITLES.has(product.shortTitle)
      ? FLAGSHIP_PRODUCT.shortTitle
      : product.shortTitle;

  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    shortTitle: normalizedShortTitle,
    price: product.price,
    originalPrice: product.originalPrice ?? product.price,
    image: product.image,
    kind: FLAGSHIP_PRODUCT.kind,
    summary: FLAGSHIP_PRODUCT.summary,
    highlights: FLAGSHIP_PRODUCT.highlights,
    isActive: product.isActive,
    stock: product.stock ?? 0,
  };
}
