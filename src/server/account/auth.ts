import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPrismaClient } from "@/lib/prisma";

const ACCOUNT_SESSION_COOKIE = "unoun_account_session";
const ACCOUNT_OAUTH_STATE_COOKIE = "unoun_account_oauth_state";
const ACCOUNT_SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const ACCOUNT_OAUTH_STATE_TTL_MS = 10 * 60 * 1000;

function getAccountSessionSecret() {
  const explicitSecret = process.env.ACCOUNT_SESSION_SECRET?.trim();

  if (explicitSecret) {
    return explicitSecret;
  }

  const fallback = process.env.YANDEX_OAUTH_CLIENT_SECRET?.trim();
  return fallback || null;
}

function signValue(payload: string) {
  const secret = getAccountSessionSecret();

  if (!secret) {
    return null;
  }

  return createHmac("sha256", secret).update(payload).digest("hex");
}

function buildSignedValue(payload: string) {
  const signature = signValue(payload);

  if (!signature) {
    throw new Error("Account session secret is not configured.");
  }

  return `${payload}.${signature}`;
}

function verifySignedValue(value: string | undefined) {
  if (!value) {
    return null;
  }

  const parts = value.split(".");

  if (parts.length < 3) {
    return null;
  }

  const signature = parts.pop();
  const payload = parts.join(".");

  if (!signature) {
    return null;
  }

  const expectedSignature = signValue(payload);

  if (!expectedSignature) {
    return null;
  }

  const provided = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (provided.length !== expected.length) {
    return null;
  }

  if (!timingSafeEqual(provided, expected)) {
    return null;
  }

  return payload;
}

export async function setAccountSessionCookie(userId: string) {
  const cookieStore = await cookies();
  const expiresAt = Date.now() + ACCOUNT_SESSION_TTL_MS;

  cookieStore.set(ACCOUNT_SESSION_COOKIE, buildSignedValue(`${userId}.${expiresAt}`), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: ACCOUNT_SESSION_TTL_MS / 1000,
  });
}

export async function clearAccountSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCOUNT_SESSION_COOKIE);
}

export async function createAccountOAuthState() {
  const cookieStore = await cookies();
  const state = randomUUID();
  const expiresAt = Date.now() + ACCOUNT_OAUTH_STATE_TTL_MS;

  cookieStore.set(
    ACCOUNT_OAUTH_STATE_COOKIE,
    buildSignedValue(`${state}.${expiresAt}`),
    {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: ACCOUNT_OAUTH_STATE_TTL_MS / 1000,
    }
  );

  return state;
}

export async function verifyAccountOAuthState(state: string | null) {
  const cookieStore = await cookies();
  const rawValue = cookieStore.get(ACCOUNT_OAUTH_STATE_COOKIE)?.value;
  cookieStore.delete(ACCOUNT_OAUTH_STATE_COOKIE);

  if (!state) {
    return false;
  }

  const payload = verifySignedValue(rawValue);

  if (!payload) {
    return false;
  }

  const [expectedState, expiresAtRaw] = payload.split(".");
  const expiresAt = Number(expiresAtRaw);

  if (!expectedState || !Number.isFinite(expiresAt) || Date.now() > expiresAt) {
    return false;
  }

  return state === expectedState;
}

export async function getAuthenticatedAccountUser() {
  const cookieStore = await cookies();
  const rawValue = cookieStore.get(ACCOUNT_SESSION_COOKIE)?.value;
  const payload = verifySignedValue(rawValue);

  if (!payload) {
    return null;
  }

  const [userId, expiresAtRaw] = payload.split(".");
  const expiresAt = Number(expiresAtRaw);

  if (!userId || !Number.isFinite(expiresAt) || Date.now() > expiresAt) {
    return null;
  }

  const prisma = getPrismaClient();

  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      provider: true,
    },
  });
}

export async function requireAuthenticatedAccountUser() {
  const user = await getAuthenticatedAccountUser();

  if (!user) {
    redirect("/account/auth");
  }

  return user;
}
