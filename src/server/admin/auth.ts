import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const ADMIN_SESSION_COOKIE = "unoun_admin_session";
const ADMIN_SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function getAdminCredentials() {
  const login = process.env.ADMIN_LOGIN?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();

  if (!login || !password) {
    return null;
  }

  return { login, password };
}

function getAdminSecret() {
  const explicitSecret = process.env.ADMIN_SESSION_SECRET?.trim();

  if (explicitSecret) {
    return explicitSecret;
  }

  const credentials = getAdminCredentials();

  if (!credentials) {
    return null;
  }

  return `${credentials.login}:${credentials.password}`;
}

function signSession(payload: string) {
  const secret = getAdminSecret();

  if (!secret) {
    return null;
  }

  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function isAdminConfigured() {
  return Boolean(getAdminCredentials());
}

export function validateAdminCredentials(login: string, password: string) {
  const credentials = getAdminCredentials();

  if (!credentials) {
    return false;
  }

  return login === credentials.login && password === credentials.password;
}

export function createAdminSession(login: string) {
  const expiresAt = Date.now() + ADMIN_SESSION_TTL_MS;
  const payload = `${login}.${expiresAt}`;
  const signature = signSession(payload);

  if (!signature) {
    throw new Error("Admin session secret is not configured.");
  }

  return `${payload}.${signature}`;
}

export function verifyAdminSession(value: string | undefined) {
  if (!value) {
    return false;
  }

  const credentials = getAdminCredentials();

  if (!credentials) {
    return false;
  }

  const [login, expiresAtRaw, signature] = value.split(".");

  if (!login || !expiresAtRaw || !signature) {
    return false;
  }

  const expiresAt = Number(expiresAtRaw);

  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
    return false;
  }

  if (login !== credentials.login) {
    return false;
  }

  const expectedSignature = signSession(`${login}.${expiresAt}`);

  if (!expectedSignature) {
    return false;
  }

  const provided = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (provided.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(provided, expected);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();

  return verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function setAdminSessionCookie(login: string) {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_SESSION_COOKIE, createAdminSession(login), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_TTL_MS / 1000,
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();

  cookieStore.delete(ADMIN_SESSION_COOKIE);
}
