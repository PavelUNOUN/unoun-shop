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
        badge="Новый этап commerce-flow"
        title="Спокойное подтверждение заказа перед checkout"
        description="Главная страница больше не перегружает пользователя финальной формой. Здесь мы подтверждаем выбор, показываем итог и переводим клиента к оформлению в отдельном сценарии."
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
