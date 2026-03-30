import type { Metadata } from "next";
import AccountShell from "@/components/account/AccountShell";
import InfoCard from "@/components/ui/page/InfoCard";
import { formatPrice } from "@/lib/catalog";
import { requireAuthenticatedAccountUser } from "@/server/account/auth";
import { getAccountDashboardData } from "@/server/account/profile";

export const metadata: Metadata = {
  title: "Заказы | UNOUN",
  description:
    "История заказов в личном кабинете UNOUN: реальные статусы, способ оплаты, доставка и сумма заказа.",
};

export default async function AccountOrdersPage() {
  const user = await requireAuthenticatedAccountUser();
  const account = await getAccountDashboardData(user);

  return (
    <AccountShell
      user={account.user}
      eyebrow="Заказы"
      title="История заказов"
      description="Здесь отображаются ваши реальные заказы из базы: статус оплаты, пункт выдачи, состав и итоговая сумма."
      currentPath="/account/orders"
    >
      {account.orders.length === 0 ? (
        <InfoCard
          eyebrow="История покупок"
          title="Пока нет оформленных заказов"
          description="После первой покупки сюда автоматически попадут номер заказа, статус оплаты, состав и выбранный пункт выдачи."
        />
      ) : null}

      {account.orders.map((order) => (
        <InfoCard
          key={order.id}
          eyebrow={order.dateLabel}
          title={order.orderNumber}
          description="Карточка заказа уже показывает реальные данные и готова к следующему этапу с детальной страницей и доставкой."
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Статус
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-900">
                {order.statusLabel}
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
                {order.paymentLabel} · {order.paymentStatusLabel}
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
              {order.deliveryLabel}. Списано бонусов: {formatPrice(order.bonusUsed)} ₽.
            </p>
          </div>

          <div className="mt-4 rounded-[20px] border border-zinc-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Состав
            </p>
            <div className="mt-3 space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 text-sm text-zinc-700"
                >
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span className="font-semibold text-zinc-900">
                    {formatPrice(item.lineTotal)} ₽
                  </span>
                </div>
              ))}
            </div>
          </div>
        </InfoCard>
      ))}
    </AccountShell>
  );
}
