import type { Metadata } from "next";
import Link from "next/link";
import AccountShell from "@/components/account/AccountShell";
import InfoCard from "@/components/ui/page/InfoCard";
import { formatPrice } from "@/lib/catalog";
import { requireAuthenticatedAccountUser } from "@/server/account/auth";
import { getAccountDashboardData } from "@/server/account/profile";

export const metadata: Metadata = {
  title: "Личный кабинет | UNOUN",
  description:
    "Личный кабинет UNOUN: заказы, бонусы, получатели и сервисная информация.",
};

export default async function AccountPage() {
  const user = await requireAuthenticatedAccountUser();
  const account = await getAccountDashboardData(user);
  const latestOrder = account.latestOrder;

  return (
    <AccountShell
      user={account.user}
      eyebrow="Личный кабинет"
      title={`Здравствуйте, ${account.user.fullName || "покупатель UNOUN"}`}
      description="Здесь собраны ваши заказы, бонусный баланс, сохранённые получатели и быстрые действия после покупки."
      currentPath="/account"
    >
      <section className="grid gap-5 md:grid-cols-3">
        {account.stats.map((item) => (
          <InfoCard
            key={item.label}
            eyebrow={item.label}
            title={item.value}
            description={item.hint}
          />
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        {latestOrder ? (
          <InfoCard
            eyebrow="Последний заказ"
            title={latestOrder.orderNumber}
            description="Здесь можно быстро проверить статус, оплату и выбранный пункт выдачи по последнему заказу."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Статус заказа
                </p>
                <p className="mt-2 text-sm font-semibold text-zinc-900">
                  {latestOrder.statusLabel}
                </p>
              </div>
              <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Доставка
                </p>
                <p className="mt-2 text-sm font-semibold text-zinc-900">
                  {latestOrder.deliveryLabel}
                </p>
              </div>
              <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Оплата
                </p>
                <p className="mt-2 text-sm font-semibold text-zinc-900">
                  {latestOrder.paymentLabel} · {latestOrder.paymentStatusLabel}
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
        ) : (
          <InfoCard
            eyebrow="Первые заказы"
            title="Заказов пока нет"
            description="Контакты, бонусы и выбранный пункт выдачи будут подставляться автоматически, как только появится первый заказ."
          >
            <Link
              href="/checkout"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#E5FF00] px-5 text-sm font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
            >
              Перейти к оформлению
            </Link>
          </InfoCard>
        )}

        <InfoCard
          eyebrow="Бонусы"
          title={`${formatPrice(account.loyalty.balance)} ₽ на счёте`}
          description={
            account.loyalty.welcomeIssued
              ? "Приветственный бонус уже начислен и доступен при следующем оформлении заказа."
              : "Бонусный баланс уже создан и готов к начислению."
          }
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
        title="Покупки, бонусы и поддержка под рукой"
        description="Отсюда можно перейти к корзине, открыть историю заказов и быстро перейти к полезным разделам сайта."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/cart"
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 px-5 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
          >
            Перейти в корзину
          </Link>
          <Link
            href="/account/orders"
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 px-5 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
          >
            Открыть историю заказов
          </Link>
          <Link
            href="/academy"
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 px-5 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
          >
            Перейти в статьи
          </Link>
        </div>
      </InfoCard>
    </AccountShell>
  );
}
