"use client";

declare global {
  interface Window {
    ym?: (
      counterId: number,
      method: "reachGoal",
      target: string,
      params?: Record<string, string | number | boolean>
    ) => void;
  }
}

function getMetrikaCounterId() {
  const value = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim();

  if (!value) {
    return null;
  }

  const parsed = Number(value);

  return Number.isNaN(parsed) ? null : parsed;
}

export function reachMetrikaGoal(
  goal: string,
  params?: Record<string, string | number | boolean>
) {
  const counterId = getMetrikaCounterId();

  if (!counterId || typeof window === "undefined" || typeof window.ym !== "function") {
    return;
  }

  window.ym(counterId, "reachGoal", goal, params);
}
