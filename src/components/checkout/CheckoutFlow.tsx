"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Circle,
  Gift,
  LockKeyhole,
  MapPin,
  PackageCheck,
  WalletCards,
} from "lucide-react";
import { formatPrice } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

type PaymentMethod = "full_online" | "split" | "";

type ContactData = {
  name: string;
  phone: string;
  email: string;
  city: string;
};

type PickupPoint = {
  id: string;
  title: string;
  address: string;
  eta: string;
};

const PICKUP_POINTS: PickupPoint[] = [
  {
    id: "nn-rodionova-165a",
    title: "СДЭК ПВЗ на Родионова",
    address: "Нижний Новгород, ул. Родионова, 165А",
    eta: "3-5 рабочих дней",
  },
  {
    id: "nn-gorkogo-152",
    title: "СДЭК ПВЗ на Горького",
    address: "Нижний Новгород, ул. Максима Горького, 152",
    eta: "3-5 рабочих дней",
  },
  {
    id: "nn-belinskogo-63",
    title: "СДЭК ПВЗ на Белинского",
    address: "Нижний Новгород, ул. Белинского, 63",
    eta: "4-6 рабочих дней",
  },
] as const;

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

export default function CheckoutFlow() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());

  const [contact, setContact] = useState<ContactData>({
    name: "",
    phone: "",
    email: "",
    city: "Нижний Новгород",
  });
  const [selectedPickupPointId, setSelectedPickupPointId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("full_online");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPickupPoint = useMemo(
    () => PICKUP_POINTS.find((item) => item.id === selectedPickupPointId) ?? null,
    [selectedPickupPointId]
  );

  const isContactValid =
    contact.name.trim().length > 1 &&
    contact.phone.replace(/\D/g, "").length >= 10 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) &&
    contact.city.trim().length > 1;

  const isCheckoutReady =
    items.length > 0 &&
    isContactValid &&
    selectedPickupPoint !== null &&
    paymentMethod !== "" &&
    consentAccepted;

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!isCheckoutReady) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    router.push("/checkout/success");
  };

  if (items.length === 0) {
    return (
      <div className="rounded-[32px] border border-zinc-200 bg-white p-8 text-center shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)]">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
          В checkout пока нечего оформлять
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 sm:text-base">
          Добавьте товар в корзину, и мы переведем вас в полноценный сценарий
          оформления заказа с контактами, ПВЗ СДЭК и выбором оплаты.
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
              Авторизация в приоритете, но не обязательна
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                Продолжить как гость или войти ради бонусов
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
                После входа пользователь сможет применить приветственные 500 бонусов
                уже в первом заказе. Гостевой сценарий мы тоже сохраняем, чтобы не
                терять конверсию.
              </p>
            </div>

            <Link
              href="/account/auth"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#E5FF00] px-6 text-sm font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
            >
              Войти и получить 500 бонусов
              <ArrowRight size={16} />
            </Link>
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
                Выбор пункта выдачи СДЭК
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
                Пока это UI-этап без реальной интеграции API. На следующем этапе
                здесь появится боевой выбор ПВЗ по городу пользователя.
              </p>
            </div>
            <div className="inline-flex h-11 items-center rounded-full border border-zinc-200 bg-zinc-50 px-4 text-sm font-semibold text-zinc-700">
              СДЭК ПВЗ
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {PICKUP_POINTS.map((point) => {
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
                    </div>
                  </div>

                  <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    {point.eta}
                  </span>
                </button>
              );
            })}
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
                  Базовый сценарий покупки через онлайн-оплату после подключения
                  платежного провайдера.
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
                  Подготовлено под будущую интеграцию `Яндекс Pay / Split` без оплаты
                  при получении.
                </p>
              </div>
              <PackageCheck size={18} className="shrink-0 text-zinc-500" />
            </button>
          </div>
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
              <div key={item.id} className="flex gap-3 rounded-[24px] border border-white/10 bg-white/5 p-4">
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
            <div className="flex items-center justify-between gap-4 text-white/70">
              <span>Доставка</span>
              <span>СДЭК ПВЗ</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-white/70">
              <span>Оплата</span>
              <span>
                {paymentMethod === "split" ? "Частями" : "Полностью"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-3 text-base font-semibold text-white">
              <span>Итого</span>
              <span>{formatPrice(subtotal)} ₽</span>
            </div>
          </div>

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
            {isSubmitting ? "Оформляем..." : "Подтвердить заказ"}
          </button>
        </section>

        <section className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)] sm:p-8">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700">
              <Gift size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                Welcome-бонус пока заблокирован
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                По вашей стратегии 500 бонусов доступны только после авторизации.
                Когда подключим реальный вход, здесь появится активный переключатель
                списания и новый итог заказа.
              </p>
            </div>
          </div>

          <Link
            href="/account/auth"
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-zinc-200 px-6 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
          >
            Перейти ко входу
            <ArrowRight size={16} />
          </Link>
        </section>
      </aside>
    </div>
  );
}
