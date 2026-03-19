import type { Metadata } from "next";
import AccountShell from "@/components/account/AccountShell";
import InfoCard from "@/components/ui/page/InfoCard";
import { ACCOUNT_RECENT_ORDERS } from "@/lib/account";
import { formatPrice } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Заказы | UNOUN",
  description:
    "История заказов в личном кабинете UNOUN: статусы, способ оплаты, доставка и сумма заказа.",
};

export default function AccountOrdersPage() {
  return (
    <AccountShell
      eyebrow="Заказы"
      title="История заказов подготовлена под реальный order-tracking"
      description="Сейчас это UI-сценарий с демонстрационными данными, но сама структура уже подходит под будущую интеграцию с базой, оплатой и статусами доставки СДЭК."
      currentPath="/account/orders"
    >
      {ACCOUNT_RECENT_ORDERS.map((order) => (
        <InfoCard
          key={order.id}
          eyebrow={order.date}
          title={order.id}
          description="Каждая карточка может стать детальной страницей заказа с товарами, трекингом доставки, чеком и сервисными действиями."
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Статус
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-900">
                {order.status}
              </p>
            </div>
            <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Товаров
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-900">
                {order.itemsCount} шт.
              </p>
            </div>
            <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Оплата
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-900">
                {order.paymentLabel}
              </p>
            </div>
            <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Итого
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-900">
                {formatPrice(order.total)} ₽
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-[20px] border border-zinc-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Доставка и бонусы
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-700">
              {order.delivery}. Списано бонусов: {formatPrice(order.bonusUsed)} ₽.
            </p>
          </div>
        </InfoCard>
      ))}
    </AccountShell>
  );
}
