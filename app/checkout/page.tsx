import type { Metadata } from "next";
import CheckoutFlow from "@/components/checkout/CheckoutFlow";
import PageHero from "@/components/ui/page/PageHero";
import { getAuthenticatedAccountUser } from "@/server/account/auth";
import { getCheckoutAccountProfile } from "@/server/account/profile";

export const metadata: Metadata = {
  title: "Checkout | UNOUN",
  description:
    "Checkout UNOUN: гость или авторизация, бонусы, ПВЗ Яндекс Доставки и переход к онлайн-оплате.",
};

export default async function CheckoutPage() {
  const user = await getAuthenticatedAccountUser();
  const accountProfile = await getCheckoutAccountProfile(user);

  return (
    <>
      <PageHero
        eyebrow="Checkout"
        badge={accountProfile ? "Оформление из аккаунта" : "Новый сценарий оформления"}
        title="Оформление заказа UNOUN"
        description={
          accountProfile
            ? "Вы уже вошли в аккаунт: контакты, сохранённый ПВЗ и бонусный баланс можно использовать без повторного заполнения формы."
            : "Это уже живой checkout-сценарий: контакты, выбор ПВЗ Яндекс Доставки, оплата полностью или частями и быстрый вход ради бонусов."
        }
      />

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CheckoutFlow accountProfile={accountProfile} />
        </div>
      </section>
    </>
  );
}
