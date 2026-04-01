import type { Metadata } from "next";
import { redirect } from "next/navigation";
import PageHero from "@/components/ui/page/PageHero";
import AuthMethodsPanel from "@/components/account/AuthMethodsPanel";
import { getAuthenticatedAccountUser } from "@/server/account/auth";

export const metadata: Metadata = {
  title: "Авторизация | UNOUN",
  description:
    "Страница авторизации UNOUN с входом через Яндекс и доступом к личному кабинету, заказам и бонусам.",
};

export default async function AccountAuthPage() {
  const user = await getAuthenticatedAccountUser();

  if (user) {
    redirect("/account");
  }

  return (
    <>
      <PageHero
        eyebrow="Авторизация"
        badge="Безопасный вход"
        title="Войдите в личный кабинет UNOUN"
        description="Вход через Яндекс открывает доступ к заказам, бонусному балансу, сохранённым получателям и сервисной информации."
        className="bg-zinc-50"
      />

      <section className="bg-zinc-50 pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AuthMethodsPanel />
        </div>
      </section>
    </>
  );
}
