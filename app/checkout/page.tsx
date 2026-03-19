import type { Metadata } from "next";
import CheckoutFlow from "@/components/checkout/CheckoutFlow";
import PageHero from "@/components/ui/page/PageHero";

export const metadata: Metadata = {
  title: "Checkout | UNOUN",
  description:
    "Checkout UNOUN: гость или авторизация, бонусы, СДЭК ПВЗ и переход к онлайн-оплате.",
};

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        eyebrow="Checkout"
        badge="Новый сценарий оформления"
        title="Оформление заказа вынесено в отдельный flow"
        description="Это уже не заглушка, а первый живой checkout-сценарий под новую архитектуру сайта. Сейчас здесь собраны контакты, выбор ПВЗ СДЭК в UI-режиме, оплата полностью или частями и блок авторизации ради welcome-бонуса."
      />

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CheckoutFlow />
        </div>
      </section>
    </>
  );
}
