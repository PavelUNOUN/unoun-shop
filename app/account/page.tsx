import type { Metadata } from "next";
import Link from "next/link";
import AccountShell from "@/components/account/AccountShell";
import InfoCard from "@/components/ui/page/InfoCard";
import {
  ACCOUNT_DASHBOARD_STATS,
  ACCOUNT_RECENT_ORDERS,
  LOYALTY_SUMMARY,
} from "@/lib/account";
import { formatPrice } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Личный кабинет | UNOUN",
  description:
    "Каркас личного кабинета UNOUN: обзор заказов, бонусов, получателей и сервисных сценариев перед подключением реальной авторизации.",
};

export default function AccountPage() {
  const latestOrder = ACCOUNT_RECENT_ORDERS[0];

  return (
    <AccountShell
      eyebrow="Личный кабинет"
      title="Структура кабинета уже готова под заказы, бонусы и сервис"
      description="На этом этапе мы собираем правильную архитектуру интерфейса: обзор, заказы, бонусы, сохраненные получатели и сервисный контур. После подключения backend сюда подставятся реальные данные пользователя."
      currentPath="/account"
    >
      <section className="grid gap-5 md:grid-cols-3">
        {ACCOUNT_DASHBOARD_STATS.map((item) => (
          <InfoCard
            key={item.label}
            eyebrow={item.label}
            title={item.value}
            description={item.hint}
          />
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <InfoCard
          eyebrow="Последний заказ"
          title={latestOrder.id}
          description="Ключевой сценарий кабинета: быстро увидеть текущий заказ, способ оплаты и точку выдачи, не открывая checkout заново."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Статус
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-900">
                {latestOrder.status}
              </p>
            </div>
            <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Доставка
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-900">
                {latestOrder.delivery}
              </p>
            </div>
            <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Оплата
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-900">
                {latestOrder.paymentLabel}
              </p>
            </div>
            <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Сумма
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-900">
                {formatPrice(latestOrder.total)} ₽
              </p>
            </div>
          </div>
        </InfoCard>

        <InfoCard
          eyebrow="Бонусы"
          title={`${LOYALTY_SUMMARY.balance} ₽ доступны после входа`}
          description="Такой блок поможет сразу объяснить ценность авторизации и не терять пользователя между checkout, лояльностью и повторным заказом."
        >
          <Link
            href="/account/loyalty"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#E5FF00] px-5 text-sm font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
          >
            Открыть бонусный раздел
          </Link>
        </InfoCard>
      </section>

      <InfoCard
        eyebrow="Быстрые действия"
        title="Кабинет уже связан с commerce-flow сайта"
        description="Я сохранил логику так, чтобы маршруты аккаунта работали в связке с покупкой, документами и Academy, а не существовали отдельно от реального пользовательского пути."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/cart"
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 px-5 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
          >
            Перейти в корзину
          </Link>
          <Link
            href="/account/auth"
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 px-5 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
          >
            Открыть вход через Яндекс
          </Link>
          <Link
            href="/academy"
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 px-5 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
          >
            Перейти в UNOUN Academy
          </Link>
        </div>
      </InfoCard>
    </AccountShell>
  );
}
