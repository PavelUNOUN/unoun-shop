import type { Metadata } from "next";
import CheckoutFlow from "@/components/checkout/CheckoutFlow";
import PageHero from "@/components/ui/page/PageHero";
import { getAuthenticatedAccountUser } from "@/server/account/auth";
import { getCheckoutAccountProfile } from "@/server/account/profile";

export const metadata: Metadata = {
  title: "Оформление заказа | UNOUN",
  description:
    "Оформление заказа UNOUN: контакты получателя, пункт выдачи Яндекс Доставки, бонусы и онлайн-оплата.",
};

export default async function CheckoutPage() {
  const user = await getAuthenticatedAccountUser();
  const accountProfile = await getCheckoutAccountProfile(user);

  return (
    <>
      <PageHero
        eyebrow="Оформление заказа"
        badge={accountProfile ? "Оформление из аккаунта" : "Быстрое оформление"}
        title="Оформление заказа UNOUN"
        description={
          accountProfile
            ? "Вы уже вошли в аккаунт: контакты, сохранённый пункт выдачи и бонусный баланс можно использовать без повторного заполнения формы."
            : "Укажите контакты, выберите пункт выдачи Яндекс Доставки и удобный способ оплаты. Войти в аккаунт можно в любой момент, чтобы использовать бонусы."
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
