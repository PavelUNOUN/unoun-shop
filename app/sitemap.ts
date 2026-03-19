import type { MetadataRoute } from "next";
import { ACADEMY_ARTICLES } from "@/lib/academy";
import { getSiteUrl } from "@/lib/site";

const STATIC_ROUTES = [
  "",
  "/cart",
  "/checkout",
  "/delivery",
  "/faq",
  "/loyalty",
  "/academy",
  "/account",
  "/account/auth",
  "/account/orders",
  "/account/loyalty",
  "/account/addresses",
  "/account/service",
  "/privacy",
  "/personal-data",
  "/consent",
  "/offer",
  "/service",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const academyEntries: MetadataRoute.Sitemap = ACADEMY_ARTICLES.map((article) => ({
    url: `${siteUrl}/academy/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...academyEntries];
}
