const DEFAULT_SITE_URL = "https://uknown.ru";

function normalizeUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getSiteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!value) {
    return DEFAULT_SITE_URL;
  }

  return normalizeUrl(value);
}

export function getMetadataBase(): URL {
  return new URL(getSiteUrl());
}

export const SITE_NAME = "UNOUN";
