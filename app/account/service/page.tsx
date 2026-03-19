import type { Metadata } from "next";
import Link from "next/link";
import AccountShell from "@/components/account/AccountShell";
import InfoCard from "@/components/ui/page/InfoCard";
import { SERVICE_TOUCHPOINTS } from "@/lib/account";

export const metadata: Metadata = {
  title: "Сервис и поддержка | UNOUN",
  description:
    "Сервисный раздел личного кабинета UNOUN: инструкция, гарантия 24 месяца и будущие обращения в поддержку.",
};

export default function AccountServicePage() {
  return (
    <AccountShell
      eyebrow="Сервис"
      title="Сервисный контур кабинета уже связан с гарантией и инструкцией"
      description="Этот раздел нужен, чтобы после покупки пользователь быстро находил нужные документы, условия гарантии и будущие сервисные действия в одном месте, без поиска по всему сайту."
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
        title="Хороший кабинет уменьшает нагрузку на поддержку"
        description="Если пользователь быстро видит заказ, инструкцию, гарантийные правила и свой бонусный статус, доверие к бренду выше, а количество типовых вопросов заметно снижается."
      />
    </AccountShell>
  );
}
