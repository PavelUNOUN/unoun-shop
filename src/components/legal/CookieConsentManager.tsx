"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import YandexMetrika from "@/components/analytics/YandexMetrika";

type CookieConsentMode = "essential" | "all";
type CookieConsentState = CookieConsentMode | "pending" | "unknown";

const CONSENT_STORAGE_KEY = "unoun_cookie_consent";
const CONSENT_COOKIE_NAME = "unoun_cookie_consent";
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

function readConsentFromCookie(): CookieConsentMode | null {
  if (typeof document === "undefined") {
    return null;
  }

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${CONSENT_COOKIE_NAME}=`));

  const value = cookie?.split("=")[1];

  if (value === "essential" || value === "all") {
    return value;
  }

  return null;
}

function readStoredConsent(): CookieConsentMode | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storageValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);

  if (storageValue === "essential" || storageValue === "all") {
    return storageValue;
  }

  return readConsentFromCookie();
}

function persistConsent(value: CookieConsentMode) {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("unoun-cookie-consent-change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("unoun-cookie-consent-change", callback);
  };
}

function getClientSnapshot(): CookieConsentState {
  return readStoredConsent() ?? "unknown";
}

function getServerSnapshot(): CookieConsentState {
  return "pending";
}

export default function CookieConsentManager() {
  const consent = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const handleConsent = (value: CookieConsentMode) => {
    persistConsent(value);
    window.dispatchEvent(new Event("unoun-cookie-consent-change"));
  };

  return (
    <>
      {consent === "all" ? <YandexMetrika /> : null}

      {consent === "unknown" ? (
        <div className="fixed inset-x-0 bottom-0 z-[70] p-3 sm:p-4">
          <div className="mx-auto max-w-5xl rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_24px_80px_-32px_rgba(24,24,27,0.35)] sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
                  Cookie и аналитика
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
                  Сайт использует технические cookie, а аналитику подключает только
                  с вашего согласия
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
                  Технические cookie и local storage нужны для корзины, сессии и
                  стабильной работы сайта. Отдельно можно разрешить аналитические
                  cookie и Яндекс Метрику. Подробнее это описано в{" "}
                  <Link href="/privacy" className="font-semibold text-zinc-900 underline">
                    политике конфиденциальности
                  </Link>
                  .
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleConsent("essential")}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 px-6 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
                >
                  Только необходимые
                </button>
                <button
                  type="button"
                  onClick={() => handleConsent("all")}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#E5FF00] px-6 text-sm font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
                >
                  Принять аналитику
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
