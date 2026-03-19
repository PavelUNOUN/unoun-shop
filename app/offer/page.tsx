import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/page/PageHero";
import InfoCard from "@/components/ui/page/InfoCard";
import { SELLER_DETAILS_LIST } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Публичная оферта | UNOUN",
  description:
    "Публичная оферта UNOUN: оформление заказа, оплата, доставка, возврат и реквизиты продавца.",
};

const OFFER_BLOCKS = [
  {
    title: "Предмет договора",
    description:
      "Продавец обязуется передать покупателю товар, представленный на сайте UNOUN, а покупатель обязуется оформить заказ и оплатить его на условиях, действующих в момент оформления.",
  },
  {
    title: "Оформление заказа",
    description:
      "Заказ оформляется через корзину и checkout сайта. Покупка может быть совершена как без авторизации, так и после входа в аккаунт. Авторизация дает дополнительные пользовательские преимущества, но не является обязательной для оформления заказа.",
  },
  {
    title: "Оплата",
    description:
      "В действующей модели магазина применяется только онлайн-оплата: полная оплата или оплата частями после подключения соответствующего платежного сценария. Оплата при получении не является базовым способом покупки в новой архитектуре проекта.",
  },
  {
    title: "Доставка",
    description:
      "На первом этапе магазин использует доставку через СДЭК до пункта выдачи. Покупатель выбирает ПВЗ в checkout, а сведения о выбранной точке фиксируются в заказе.",
  },
  {
    title: "Возврат и гарантия",
    description:
      "Условия возврата, обмена и гарантийного обслуживания регулируются отдельной trust-страницей сайта и действующим законодательством РФ. При противоречии приоритет имеют нормы законодательства.",
  },
  {
    title: "Персональные данные",
    description:
      "Оформляя заказ, покупатель подтверждает согласие с политикой конфиденциальности, порядком обработки персональных данных и иными связанными документами сайта UNOUN.",
  },
] as const;

export default function OfferPage() {
  return (
    <>
      <PageHero
        eyebrow="Публичная оферта"
        badge="Базовый юридический документ магазина"
        title="Условия покупки на сайте UNOUN уже собраны в единую структуру"
        description="Эта страница фиксирует базовую модель договора дистанционной купли-продажи для интернет-магазина UNOUN: оформление заказа, оплату, доставку, возврат и связь с другими юридическими документами сайта."
        className="bg-zinc-50"
      />

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {OFFER_BLOCKS.map((block) => (
            <InfoCard
              key={block.title}
              title={block.title}
              description={block.description}
            />
          ))}
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/consent"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 px-6 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
            >
              Согласие на обработку данных
            </Link>
            <Link
              href="/privacy"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 px-6 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
            >
              Политика конфиденциальности
            </Link>
          </div>

          <div className="rounded-[32px] border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Реквизиты продавца
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {SELLER_DETAILS_LIST.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-zinc-200 bg-white p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
