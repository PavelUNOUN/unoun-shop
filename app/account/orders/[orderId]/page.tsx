import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AccountShell from "@/components/account/AccountShell";
import InfoCard from "@/components/ui/page/InfoCard";
import { formatPrice } from "@/lib/catalog";
import { requireAuthenticatedAccountUser } from "@/server/account/auth";
import {
  getAccountDashboardData,
  getAccountOrderDetail,
} from "@/server/account/profile";

export const metadata: Metadata = {
  title: "Заказ | UNOUN",
  description:
    "Детальная карточка заказа в личном кабинете UNOUN: статус, оплата, состав и пункт выдачи.",
};

type AccountOrderDetailPageProps = {
  params: Promise<{
    orderId: string;
  }>;
};

export default async function AccountOrderDetailPage({
  params,
}: AccountOrderDetailPageProps) {
  const user = await requireAuthenticatedAccountUser();
  const account = await getAccountDashboardData(user);
  const { orderId } = await params;
  const order = await getAccountOrderDetail(user.id, orderId);

  if (!order) {
    notFound();
  }

  return (
    <AccountShell
      user={account.user}
      eyebrow="Детали заказа"
      title={order.orderNumber}
      description="Откройте одну покупку отдельно, чтобы быстро проверить текущий статус, оплату, состав и пункт выдачи."
      currentPath="/account/orders"
    >
      <InfoCard
        eyebrow={order.dateLabel}
        title="Текущий статус заказа"
        description="Здесь собрана основная информация по заказу: статус, оплата, состав и выбранный пункт выдачи."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Статус заказа
            </p>
            <p className="mt-2 text-sm font-semibold text-zinc-900">
              {order.statusLabel}
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
              Товаров
            </p>
            <p className="mt-2 text-sm font-semibold text-zinc-900">
              {order.itemsCount} шт.
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
      </InfoCard>

      <InfoCard
        eyebrow="Пункт выдачи"
        title="Доставка по этому заказу"
        description={order.deliveryLabel}
      />

      <InfoCard
        eyebrow="Состав заказа"
        title="Что входит в покупку"
        description="Каждая позиция показывается отдельно, чтобы можно было быстро сверить состав и сумму."
      >
        <div className="space-y-2">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-[20px] border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700"
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
      </InfoCard>

      <InfoCard
        eyebrow="Быстрые действия"
        title="Что можно сделать дальше"
        description="Можно вернуться к истории покупок или сразу перейти к новому заказу с уже сохранёнными данными."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/account/orders"
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 px-5 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
          >
            Ко всем заказам
          </Link>
          <Link
            href="/checkout"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#E5FF00] px-5 text-sm font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
          >
            Оформить ещё один заказ
          </Link>
        </div>
      </InfoCard>
    </AccountShell>
  );
}
