import type { Metadata } from "next";
import AccountShell from "@/components/account/AccountShell";
import InfoCard from "@/components/ui/page/InfoCard";
import { requireAuthenticatedAccountUser } from "@/server/account/auth";
import { getAccountDashboardData } from "@/server/account/profile";

export const metadata: Metadata = {
  title: "Получатели и адреса | UNOUN",
  description:
    "Сохраненные получатели и предпочтения по доставке в личном кабинете UNOUN.",
};

export default async function AccountAddressesPage() {
  const user = await requireAuthenticatedAccountUser();
  const account = await getAccountDashboardData(user);

  return (
    <AccountShell
      user={account.user}
      eyebrow="Получатели"
      title="Сохранённые получатели и пункты выдачи"
      description="Контакты и выбранные пункты выдачи сохраняются после заказов и помогают быстрее оформить следующую покупку."
      currentPath="/account/addresses"
    >
      <InfoCard
        eyebrow="Профиль получателя"
        title="Что можно использовать повторно"
        description="Имя, телефон, email, город и предпочитаемый ПВЗ уже сохранены и могут использоваться в следующих заказах."
      />

      {account.addresses.length === 0 ? (
        <InfoCard
          eyebrow="Сохранённые данные"
          title="Пока нет сохранённых получателей"
          description="После первого заказа здесь автоматически появится ваш ПВЗ и контактные данные для быстрого повторного оформления."
        />
      ) : null}

      <section className="grid gap-5 lg:grid-cols-2">
        {account.addresses.map((address) => (
          <InfoCard
            key={address.id}
            eyebrow={address.city}
            title={address.title}
            description={address.note}
          >
            <div className="space-y-3">
              <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-sm font-medium leading-relaxed text-zinc-700">
                  {address.address}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Получатель
                  </p>
                  <p className="mt-2 text-sm font-semibold text-zinc-900">
                    {address.recipientName || "Не указан"}
                  </p>
                </div>
                <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Телефон
                  </p>
                  <p className="mt-2 text-sm font-semibold text-zinc-900">
                    {address.recipientPhone || "Не указан"}
                  </p>
                </div>
              </div>
              {address.preferred ? (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Основной получатель
                </p>
              ) : null}
            </div>
          </InfoCard>
        ))}
      </section>
    </AccountShell>
  );
}
