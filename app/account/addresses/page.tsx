import type { Metadata } from "next";
import AccountShell from "@/components/account/AccountShell";
import InfoCard from "@/components/ui/page/InfoCard";
import { SAVED_ADDRESSES } from "@/lib/account";

export const metadata: Metadata = {
  title: "Получатели и адреса | UNOUN",
  description:
    "Сохраненные получатели и предпочтения по доставке в личном кабинете UNOUN.",
};

export default function AccountAddressesPage() {
  return (
    <AccountShell
      eyebrow="Получатели"
      title="Сохраненные контакты и ПВЗ готовы под быстрый повторный заказ"
      description="Для MVP я заложил раздел не под классические адреса курьерской доставки, а именно под те сценарии, которые вы выбрали: контакты покупателя и предпочтительные пункты выдачи СДЭК."
      currentPath="/account/addresses"
    >
      <InfoCard
        eyebrow="Профиль получателя"
        title="Что здесь появится после авторизации"
        description="Имя, телефон, email, город и предпочитаемый ПВЗ можно будет подставлять в checkout автоматически, чтобы повторная покупка занимала минимум действий."
      />

      <section className="grid gap-5 lg:grid-cols-2">
        {SAVED_ADDRESSES.map((address) => (
          <InfoCard
            key={address.id}
            eyebrow={address.city}
            title={address.title}
            description={address.note}
          >
            <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm font-medium leading-relaxed text-zinc-700">
                {address.address}
              </p>
            </div>
          </InfoCard>
        ))}
      </section>
    </AccountShell>
  );
}
