import { getSiteUrl } from "@/lib/site";
import { getPrismaClient } from "@/lib/prisma";

const YANDEX_AUTHORIZE_URL = "https://oauth.yandex.ru/authorize";
const YANDEX_TOKEN_URL = "https://oauth.yandex.ru/token";
const YANDEX_USERINFO_URL = "https://login.yandex.ru/info";

type YandexTokenResponse = {
  access_token?: string;
};

type YandexProfile = {
  id: string;
  default_email?: string;
  real_name?: string;
  display_name?: string;
  login?: string;
};

export function isYandexOAuthConfigured() {
  return Boolean(
    process.env.YANDEX_OAUTH_CLIENT_ID?.trim() &&
      process.env.YANDEX_OAUTH_CLIENT_SECRET?.trim()
  );
}

export function getYandexOAuthCallbackUrl() {
  return `${getSiteUrl()}/api/auth/yandex/callback`;
}

export function buildYandexOAuthUrl(state: string) {
  const clientId = process.env.YANDEX_OAUTH_CLIENT_ID?.trim();

  if (!clientId) {
    throw new Error("YANDEX_OAUTH_CLIENT_ID is not configured.");
  }

  const url = new URL(YANDEX_AUTHORIZE_URL);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", getYandexOAuthCallbackUrl());
  url.searchParams.set("state", state);

  return url.toString();
}

async function requestYandexAccessToken(code: string) {
  const clientId = process.env.YANDEX_OAUTH_CLIENT_ID?.trim();
  const clientSecret = process.env.YANDEX_OAUTH_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    throw new Error("Yandex OAuth credentials are not configured.");
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch(YANDEX_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Yandex OAuth token request failed: ${response.status} ${errorBody}`);
  }

  const result = (await response.json()) as YandexTokenResponse;

  if (!result.access_token) {
    throw new Error("Yandex OAuth token response does not contain access_token.");
  }

  return result.access_token;
}

async function requestYandexProfile(accessToken: string) {
  const url = new URL(YANDEX_USERINFO_URL);
  url.searchParams.set("format", "json");

  const response = await fetch(url, {
    headers: {
      Authorization: `OAuth ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Yandex OAuth profile request failed: ${response.status} ${errorBody}`);
  }

  return (await response.json()) as YandexProfile;
}

export async function authenticateWithYandexCode(code: string) {
  const accessToken = await requestYandexAccessToken(code);
  const profile = await requestYandexProfile(accessToken);

  if (!profile.id) {
    throw new Error("Yandex OAuth profile does not contain user id.");
  }

  const prisma = getPrismaClient();
  const fullName =
    profile.real_name?.trim() ||
    profile.display_name?.trim() ||
    profile.login?.trim() ||
    "Пользователь UNOUN";
  const email = profile.default_email?.trim().toLowerCase() || null;

  const existingByProvider = await prisma.user.findUnique({
    where: {
      providerUserId: profile.id,
    },
  });

  if (existingByProvider) {
    return prisma.user.update({
      where: {
        id: existingByProvider.id,
      },
      data: {
        provider: "YANDEX",
        email: email ?? existingByProvider.email,
        fullName,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });
  }

  if (email) {
    const existingByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingByEmail) {
      return prisma.user.update({
        where: {
          id: existingByEmail.id,
        },
        data: {
          provider: "YANDEX",
          providerUserId: profile.id,
          fullName,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      });
    }
  }

  return prisma.user.create({
    data: {
      provider: "YANDEX",
      providerUserId: profile.id,
      email,
      fullName,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
    },
  });
}
