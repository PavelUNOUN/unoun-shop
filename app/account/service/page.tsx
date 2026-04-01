import type { Metadata } from "next";
import Link from "next/link";
import AccountShell from "@/components/account/AccountShell";
import InfoCard from "@/components/ui/page/InfoCard";
import { SERVICE_TOUCHPOINTS } from "@/lib/account";
import { requireAuthenticatedAccountUser } from "@/server/account/auth";
import { getAccountDashboardData } from "@/server/account/profile";

export const metadata: Metadata = {
  title: "Сервис и поддержка | UNOUN",
  description:
    "Сервисный раздел личного кабинета UNOUN: инструкция, гарантия 24 месяца и поддержка.",
};

export default async function AccountServicePage() {
  const user = await requireAuthenticatedAccountUser();
  const account = await getAccountDashboardData(user);

  return (
    <AccountShell
      user={account.user}
      eyebrow="Сервис"
      title="Сервис и поддержка"
      description="Здесь собраны инструкция, гарантия, возврат и основные каналы поддержки после покупки."
      currentPath="/account/service"
    >
      <section className="grid gap-5 lg:grid-cols-3">
        {SERVICE_TOUCHPOINTS.map((item) => (
          <InfoCard
            key={item.title}
            eyebrow="Поддержка"
            title={item.title}
            description={item.description}
          >
            <Link
              href={item.href}
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 px-5 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
            >
              {item.linkLabel}
            </Link>
          </InfoCard>
        ))}
      </section>

      <InfoCard
        eyebrow="Почему это важно"
        title="Вся сервисная информация под рукой"
        description={
          account.orders.length > 0
            ? "Если заказ уже оформлен, отсюда проще быстро перейти от покупки к инструкции, гарантии и поддержке."
            : "Даже до первой покупки здесь уже доступны инструкция, гарантия и основные контакты поддержки."
        }
      />
    </AccountShell>
  );
}
