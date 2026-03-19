import type { Metadata } from "next";
import AccountShell from "@/components/account/AccountShell";
import InfoCard from "@/components/ui/page/InfoCard";
import { LOYALTY_EVENTS, LOYALTY_SUMMARY } from "@/lib/account";
import { formatPrice } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Бонусы | UNOUN",
  description:
    "Бонусный раздел личного кабинета UNOUN: welcome-скидка 500 рублей, логика начисления и будущие сценарии лояльности.",
};

export default function AccountLoyaltyPage() {
  return (
    <AccountShell
      eyebrow="Бонусы"
      title="Программа лояльности уже разложена по понятным сценариям"
      description="Я сохранил ваш базовый принцип: welcome-механика должна усиливать авторизацию, но не усложнять покупку. Поэтому бонусный раздел сразу объясняет ценность входа и фиксированную скидку в 500 рублей."
      currentPath="/account/loyalty"
    >
      <section className="grid gap-5 md:grid-cols-3">
        <InfoCard
          eyebrow="Баланс"
          title={`${formatPrice(LOYALTY_SUMMARY.balance)} ₽`}
          description="Именно этот баланс нужно будет подставлять из backend после успешного входа пользователя."
        />
        <InfoCard
          eyebrow="Первый заказ"
          title={`${formatPrice(LOYALTY_SUMMARY.firstOrderDiscount)} ₽ скидка`}
          description="Welcome-бонус применяется один раз как понятный фиксированный дисконт без сложной математики."
        />
        <InfoCard
          eyebrow="Следующий этап"
          title="Начисления и история"
          description={LOYALTY_SUMMARY.nextLevelHint}
        />
      </section>

      <InfoCard
        eyebrow="Логика механики"
        title="Как работает бонусный сценарий"
        description="Такой UX помогает объяснить программу без перегруза и сразу связывает лояльность с реальным checkout-flow."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {LOYALTY_EVENTS.map((event) => (
            <div
              key={event.title}
              className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5"
            >
              <p className="text-sm font-semibold text-zinc-900">{event.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </InfoCard>
    </AccountShell>
  );
}
