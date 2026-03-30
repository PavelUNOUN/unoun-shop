import type { Metadata } from "next";
import AccountShell from "@/components/account/AccountShell";
import InfoCard from "@/components/ui/page/InfoCard";
import { formatPrice } from "@/lib/catalog";
import { requireAuthenticatedAccountUser } from "@/server/account/auth";
import { getAccountDashboardData } from "@/server/account/profile";

export const metadata: Metadata = {
  title: "Бонусы | UNOUN",
  description:
    "Бонусный раздел личного кабинета UNOUN: баланс, welcome-скидка и история начислений.",
};

export default async function AccountLoyaltyPage() {
  const user = await requireAuthenticatedAccountUser();
  const account = await getAccountDashboardData(user);

  return (
    <AccountShell
      user={account.user}
      eyebrow="Бонусы"
      title="Бонусный счёт"
      description="Здесь отображается ваш реальный бонусный баланс и история начислений по аккаунту."
      currentPath="/account/loyalty"
    >
      <section className="grid gap-5 md:grid-cols-3">
        <InfoCard
          eyebrow="Баланс"
          title={`${formatPrice(account.loyalty.balance)} ₽`}
          description="Текущий бонусный баланс уже подтягивается из базы и закреплён за вашим аккаунтом."
        />
        <InfoCard
          eyebrow="Первый заказ"
          title={`${formatPrice(account.loyalty.firstOrderDiscount)} ₽ скидка`}
          description="Welcome-бонус фиксирован и начисляется один раз при активации аккаунта."
        />
        <InfoCard
          eyebrow="Статус"
          title={account.loyalty.welcomeIssued ? "Активирован" : "Ожидает"}
          description={
            account.loyalty.welcomeIssued
              ? "Приветственный бонус уже выдан и закреплён за вашим профилем."
              : "Бонусный счёт готов, а начисление появится сразу после первой подходящей операции."
          }
        />
      </section>

      <InfoCard
        eyebrow="История операций"
        title="Начисления и списания по бонусному счёту"
        description="Здесь уже отображаются реальные операции по бонусному счёту, связанные с вашим аккаунтом."
      >
        {account.loyalty.transactions.length === 0 ? (
          <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5 text-sm leading-relaxed text-zinc-600">
            Операций по бонусному счёту пока нет. Как только появятся начисления или списания, они появятся здесь.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {account.loyalty.transactions.map((event) => (
              <div
                key={event.id}
                className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      {event.title}
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                      {event.createdAtLabel}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {event.amount > 0 ? "+" : ""}
                    {formatPrice(event.amount)} ₽
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {event.description}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Баланс после операции: {formatPrice(event.balanceAfter)} ₽
                </p>
              </div>
            ))}
          </div>
        )}
      </InfoCard>
    </AccountShell>
  );
}
