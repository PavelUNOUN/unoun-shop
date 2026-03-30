"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Circle,
  LockKeyhole,
  MapPin,
  PackageCheck,
  WalletCards,
} from "lucide-react";
import { formatPrice } from "@/lib/catalog";
import type {
  CheckoutAccountProfile,
  CheckoutContactData,
  CheckoutPickupPoint,
  CheckoutPickupPointsResponse,
  CheckoutPaymentMethod,
  CreateCheckoutOrderPayload,
  CreateCheckoutOrderResponse,
} from "@/lib/checkout";
import { reachMetrikaGoal } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

type CheckoutFlowProps = {
  accountProfile?: CheckoutAccountProfile | null;
};

function FormField({
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-zinc-700">
        {label} <span className="font-normal text-zinc-300">*</span>
      </label>
      <input
        {...props}
        className={cn(
          "h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4",
          "text-sm text-zinc-900 placeholder:text-zinc-400",
          "outline-none transition-colors duration-150 focus:border-zinc-900 focus:bg-white",
          className
        )}
      />
    </div>
  );
}

export default function CheckoutFlow({
  accountProfile = null,
}: CheckoutFlowProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());
  const isAuthenticated = Boolean(accountProfile?.isAuthenticated);
  const preferredPickupPoint = accountProfile?.preferredPickupPoint ?? null;
  const bonusBalance = accountProfile?.bonusBalance ?? 0;

  const [contact, setContact] = useState<CheckoutContactData>({
    name: accountProfile?.fullName ?? "",
    phone: accountProfile?.phone ?? "",
    email: accountProfile?.email ?? "",
    city: accountProfile?.city ?? "Нижний Новгород",
  });
  const [pickupPoints, setPickupPoints] = useState<CheckoutPickupPoint[]>(
    preferredPickupPoint ? [preferredPickupPoint] : []
  );
  const [pickupPointsSource, setPickupPointsSource] = useState<"mock" | "live">(
    "mock"
  );
  const [selectedPickupPointId, setSelectedPickupPointId] = useState(
    preferredPickupPoint?.id ?? ""
  );
  const [isPickupPointsLoading, setIsPickupPointsLoading] = useState(false);
  const [pickupPointsError, setPickupPointsError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] =
    useState<CheckoutPaymentMethod>("full_online");
  const [applyAvailableBonuses, setApplyAvailableBonuses] = useState(
    Boolean(isAuthenticated && bonusBalance > 0)
  );
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const appliedBonus = applyAvailableBonuses ? Math.min(bonusBalance, subtotal) : 0;
  const totalAfterBonus = Math.max(subtotal - appliedBonus, 0);

  useEffect(() => {
    const payment = searchParams.get("payment");

    if (payment === "split" || payment === "full_online") {
      setPaymentMethod(payment);
    }
  }, [searchParams]);

  const selectedPickupPoint = useMemo(
    () => pickupPoints.find((item) => item.id === selectedPickupPointId) ?? null,
    [pickupPoints, selectedPickupPointId]
  );

  useEffect(() => {
    const city = contact.city.trim();

    if (city.length < 2) {
      setPickupPoints([]);
      setSelectedPickupPointId("");
      setPickupPointsError(null);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsPickupPointsLoading(true);
      setPickupPointsError(null);

      try {
        const response = await fetch(
          `/api/delivery/pickup-points?city=${encodeURIComponent(city)}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("pickup_points_request_failed");
        }

        const result = (await response.json()) as CheckoutPickupPointsResponse;
        const shouldInjectPreferredPoint =
          preferredPickupPoint &&
          accountProfile?.city.trim().toLowerCase() === city.trim().toLowerCase() &&
          !result.points.some((point) => point.id === preferredPickupPoint.id);
        const mergedPoints = shouldInjectPreferredPoint
          ? [preferredPickupPoint, ...result.points]
          : result.points;

        setPickupPoints(mergedPoints);
        setPickupPointsSource(result.source);
        setSelectedPickupPointId((current) => {
          if (mergedPoints.some((point) => point.id === current)) {
            return current;
          }

          if (
            shouldInjectPreferredPoint &&
            preferredPickupPoint &&
            mergedPoints.some((point) => point.id === preferredPickupPoint.id)
          ) {
            return preferredPickupPoint.id;
          }

          return mergedPoints[0]?.id ?? "";
        });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Pickup points fetch error", error);
        setPickupPoints([]);
        setSelectedPickupPointId("");
        setPickupPointsError(
          "Не удалось загрузить ПВЗ Яндекс Доставки. Попробуйте изменить город или обновить страницу."
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsPickupPointsLoading(false);
        }
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [accountProfile?.city, contact.city, preferredPickupPoint]);

  const isContactValid =
    contact.name.trim().length > 1 &&
    contact.phone.replace(/\D/g, "").length >= 10 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) &&
    contact.city.trim().length > 1;

  const isCheckoutReady =
    items.length > 0 &&
    isContactValid &&
    selectedPickupPoint !== null &&
    consentAccepted;

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!isCheckoutReady || !selectedPickupPoint) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload: CreateCheckoutOrderPayload = {
        contact,
        deliveryMethod: "yandex_pickup",
        pickupPoint: selectedPickupPoint,
        paymentMethod,
        applyAvailableBonuses,
        consentAccepted,
        items,
      };

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("checkout_request_failed");
      }

      const result =
        (await response.json()) as CreateCheckoutOrderResponse;

      reachMetrikaGoal("checkout_success", {
        delivery_method: "yandex_pickup",
        payment_method: paymentMethod,
        order_number: result.orderNumber,
        storage_mode: result.storageMode,
        total: totalAfterBonus,
      });

      if (result.paymentUrl) {
        reachMetrikaGoal("checkout_payment_redirect", {
          delivery_method: "yandex_pickup",
          payment_method: paymentMethod,
          payment_provider: result.paymentProvider ?? "yandex_pay",
          order_number: result.orderNumber,
        });
        window.location.assign(result.paymentUrl);
        return;
      }

      router.push(
        `/checkout/success?orderNumber=${encodeURIComponent(
          result.orderNumber
        )}&mode=${encodeURIComponent(result.storageMode)}`
      );
    } catch {
      setSubmitError(
        "Не удалось отправить заказ на сервер. Попробуйте еще раз через несколько секунд."
      );
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="rounded-[32px] border border-zinc-200 bg-white p-8 text-center shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)]">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
          В checkout пока нечего оформлять
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 sm:text-base">
          Добавьте товар в корзину, и мы переведем вас в полноценный сценарий
          оформления заказа с контактами, ПВЗ Яндекс Доставки, бонусами и выбором оплаты.
        </p>
        <Link
          href="/cart"
          className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#E5FF00] px-6 text-sm font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
        >
          Перейти в корзину
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-5">
        <section className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)] sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5">
            <LockKeyhole size={14} className="text-zinc-500" />
            <span className="text-xs font-semibold text-zinc-600">
              {isAuthenticated
                ? "Аккаунт уже подключён к оформлению"
                : "Авторизация в приоритете, но не обязательна"}
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                {isAuthenticated
                  ? "Оформление уже подстроено под ваш аккаунт"
                  : "Продолжить как гость или войти ради бонусов"}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
                {isAuthenticated
                  ? "Контакты, email, сохранённый ПВЗ и бонусный баланс уже подтянуты в checkout. Вам не нужно заново заполнять всё с нуля."
                  : "После входа пользователь сможет применить приветственные 500 бонусов уже в первом заказе. Гостевой сценарий мы тоже сохраняем, чтобы не терять конверсию."}
              </p>
            </div>

            {isAuthenticated ? (
              <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm text-zinc-700">
                Бонусный баланс:{" "}
                <span className="font-semibold text-zinc-900">
                  {formatPrice(bonusBalance)} ₽
                </span>
              </div>
            ) : (
              <Link
                href="/account/auth"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#E5FF00] px-6 text-sm font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
              >
                Войти и получить 500 бонусов
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </section>

        <section className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
            Шаг 1
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900">
            Контакты получателя
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <FormField
              label="Имя"
              name="name"
              autoComplete="given-name"
              placeholder="Павел"
              value={contact.name}
              onChange={handleContactChange}
            />
            <FormField
              label="Телефон"
              name="phone"
              autoComplete="tel"
              placeholder="+7 (999) 123-45-67"
              value={contact.phone}
              onChange={handleContactChange}
            />
            <FormField
              label="Email"
              name="email"
              autoComplete="email"
              placeholder="mail@example.ru"
              value={contact.email}
              onChange={handleContactChange}
            />
            <FormField
              label="Город"
              name="city"
              autoComplete="address-level2"
              placeholder="Нижний Новгород"
              value={contact.city}
              onChange={handleContactChange}
            />
          </div>
        </section>

        <section className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
            Шаг 2
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
                Выбор ПВЗ Яндекс Доставки
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
                Список ПВЗ подгружается по введенному городу. Если в аккаунте уже
                есть сохранённый пункт выдачи, он автоматически становится первым
                вариантом для повторного заказа.
              </p>
            </div>
            <div className="inline-flex h-11 items-center rounded-full border border-zinc-200 bg-zinc-50 px-4 text-sm font-semibold text-zinc-700">
              {pickupPointsSource === "live"
                ? "Яндекс API подключен"
                : "Локальный список ПВЗ"}
            </div>
          </div>

          <div className="mt-6">
            {isPickupPointsLoading ? (
              <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5 text-sm text-zinc-600">
                Загружаем доступные ПВЗ Яндекс Доставки для города {contact.city}...
              </div>
            ) : pickupPointsError ? (
              <div className="rounded-[24px] border border-red-200 bg-red-50 p-5 text-sm leading-relaxed text-red-700">
                {pickupPointsError}
              </div>
            ) : pickupPoints.length === 0 ? (
              <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5 text-sm text-zinc-600">
                Введите корректный город, чтобы получить список доступных ПВЗ.
              </div>
            ) : (
              <div className="space-y-3">
                {pickupPoints.map((point) => {
                  const isSelected = selectedPickupPointId === point.id;

                  return (
                    <button
                      key={point.id}
                      type="button"
                      onClick={() => setSelectedPickupPointId(point.id)}
                      className={cn(
                        "flex w-full items-start justify-between gap-4 rounded-[24px] border px-5 py-4 text-left transition-all duration-150",
                        isSelected
                          ? "border-zinc-900 bg-white shadow-sm"
                          : "border-zinc-200 bg-zinc-50 hover:border-zinc-300"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={cn(
                            "mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2",
                            isSelected ? "border-zinc-900" : "border-zinc-300"
                          )}
                        >
                          {isSelected ? (
                            <span className="h-2.5 w-2.5 rounded-full bg-zinc-900" />
                          ) : (
                            <Circle size={10} className="text-transparent" />
                          )}
                        </span>

                        <div>
                          <p className="text-sm font-semibold text-zinc-900">
                            {point.title}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                            {point.address}
                          </p>
                          {point.note ? (
                            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                              {point.note}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                        {point.eta ?? "Расчет после подключения API"}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {selectedPickupPoint ? (
            <div className="mt-5 rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-zinc-700">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    Выбранный пункт выдачи
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {selectedPickupPoint.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                    {selectedPickupPoint.address}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
            Шаг 3
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900">
            Оплата
          </h2>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => setPaymentMethod("full_online")}
              className={cn(
                "flex w-full items-start justify-between gap-4 rounded-[24px] border px-5 py-4 text-left transition-all duration-150",
                paymentMethod === "full_online"
                  ? "border-zinc-900 bg-white shadow-sm"
                  : "border-zinc-200 bg-zinc-50 hover:border-zinc-300"
              )}
            >
              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  Оплатить полностью
                </p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                  Если тестовый Яндекс Pay подключен, после оформления заказа мы
                  отправим покупателя на платежную форму.
                </p>
              </div>
              <WalletCards size={18} className="shrink-0 text-zinc-500" />
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("split")}
              className={cn(
                "flex w-full items-start justify-between gap-4 rounded-[24px] border px-5 py-4 text-left transition-all duration-150",
                paymentMethod === "split"
                  ? "border-zinc-900 bg-white shadow-sm"
                  : "border-zinc-200 bg-zinc-50 hover:border-zinc-300"
              )}
            >
              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  Оплатить частями
                </p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                  Если тестовый Split активирован, отправим покупателя на форму
                  оплаты частями в Яндекс Pay.
                </p>
              </div>
              <PackageCheck size={18} className="shrink-0 text-zinc-500" />
            </button>
          </div>

          {isAuthenticated ? (
            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
              <input
                type="checkbox"
                checked={applyAvailableBonuses}
                onChange={(event) => setApplyAvailableBonuses(event.target.checked)}
                disabled={bonusBalance <= 0}
                className="mt-1 h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
              />
              <span className="text-sm leading-relaxed text-zinc-700">
                Применить доступные бонусы к этому заказу.
                <span className="ml-1 font-semibold text-zinc-900">
                  Сейчас доступно {formatPrice(bonusBalance)} ₽
                </span>
                {appliedBonus > 0 ? (
                  <span className="block pt-1 text-zinc-500">
                    В этом оформлении будет списано {formatPrice(appliedBonus)} ₽.
                  </span>
                ) : null}
              </span>
            </label>
          ) : null}
        </section>

        <section className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
            Шаг 4
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900">
            Согласие и юридические документы
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
            Для checkout я добавил явное подтверждение обработки персональных данных.
            Это важный юридический минимум перед боевой интеграцией оформления заказа.
          </p>

          <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
            <input
              type="checkbox"
              checked={consentAccepted}
              onChange={(event) => setConsentAccepted(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
            />
            <span className="text-sm leading-relaxed text-zinc-700">
              Я согласен на обработку персональных данных и подтверждаю ознакомление
              с{" "}
              <Link href="/consent" className="font-semibold text-zinc-900 underline">
                согласием
              </Link>
              ,{" "}
              <Link href="/privacy" className="font-semibold text-zinc-900 underline">
                политикой конфиденциальности
              </Link>
              ,{" "}
              <Link
                href="/personal-data"
                className="font-semibold text-zinc-900 underline"
              >
                порядком обработки данных
              </Link>{" "}
              и{" "}
              <Link href="/offer" className="font-semibold text-zinc-900 underline">
                публичной офертой
              </Link>
              .
            </span>
          </label>
        </section>
      </div>

      <aside className="space-y-5">
        <section className="rounded-[32px] border border-zinc-200 bg-zinc-950 p-6 text-white shadow-[0_24px_80px_-56px_rgba(24,24,27,0.45)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/40">
            Сводка заказа
          </p>

          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 rounded-[24px] border border-white/10 bg-white/5 p-4"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-white/5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="64px"
                    className="object-contain p-2"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-white/55">
                    {item.quantity} шт. × {formatPrice(item.price)} ₽
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
            <div className="flex items-center justify-between gap-4 text-white/70">
              <span>Товары</span>
              <span>{formatPrice(subtotal)} ₽</span>
            </div>
            {appliedBonus > 0 ? (
              <div className="flex items-center justify-between gap-4 text-white/70">
                <span>Бонусы</span>
                <span>-{formatPrice(appliedBonus)} ₽</span>
              </div>
            ) : null}
            <div className="flex items-center justify-between gap-4 text-white/70">
              <span>Доставка</span>
              <span>
                {selectedPickupPoint
                  ? selectedPickupPoint.title
                  : "ПВЗ Яндекс Доставки"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 text-white/70">
              <span>Оплата</span>
              <span>
                {paymentMethod === "split" ? "Частями" : "Полностью"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-3 text-base font-semibold text-white">
              <span>Итого</span>
              <span>{formatPrice(totalAfterBonus)} ₽</span>
            </div>
          </div>

          {submitError ? (
            <div className="mt-6 rounded-[24px] border border-red-500/20 bg-red-500/10 p-4 text-sm leading-relaxed text-red-100">
              {submitError}
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isCheckoutReady || isSubmitting}
            className={cn(
              "mt-8 inline-flex h-14 w-full items-center justify-center rounded-full text-base font-semibold transition-all duration-150",
              isCheckoutReady
                ? "bg-[#E5FF00] text-zinc-900 hover:brightness-95 active:scale-[0.98]"
                : "cursor-not-allowed bg-white/10 text-white/35"
            )}
          >
            {isSubmitting ? "Оформляем заказ..." : "Перейти к оплате"}
          </button>

          <p className="mt-4 text-sm leading-relaxed text-white/55">
            На этом шаге мы сохраняем контакты, выбранный ПВЗ, способ оплаты и
            списание бонусов, чтобы пользователь мог быстро повторять покупку из
            личного кабинета без повторного ввода данных.
          </p>
        </section>
      </aside>
    </div>
  );
}
