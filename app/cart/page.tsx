import type { Metadata } from "next";
import CartSummary from "@/components/cart/CartSummary";
import PageHero from "@/components/ui/page/PageHero";

export const metadata: Metadata = {
  title: "Корзина | UNOUN",
  description:
    "Корзина UNOUN: проверьте состав заказа, количество товаров и перейдите к оформлению.",
};

export default function CartPage() {
  return (
    <>
      <PageHero
        eyebrow="Корзина"
        badge="Проверьте заказ перед оформлением"
        title="Корзина UNOUN"
        description="Проверьте состав заказа, количество товаров и итоговую сумму перед оформлением."
        className="bg-zinc-50"
      />

      <section className="bg-zinc-50 pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CartSummary />
        </div>
      </section>
    </>
  );
}
