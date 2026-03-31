import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CreditCard, MapPinned, Truck } from "lucide-react";
import PageHero from "@/components/ui/page/PageHero";
import InfoCard from "@/components/ui/page/InfoCard";

export const metadata: Metadata = {
  title: "Доставка и оплата | UNOUN",
  description:
    "Условия доставки и оплаты UNOUN: сроки, способы получения, варианты оплаты и порядок подтверждения заказа.",
};

const DELIVERY_METHODS = [
  {
    eyebrow: "По России",
    title: "Яндекс Доставка: ПВЗ -> ПВЗ",
    description:
      "Сейчас заказы UNOUN доставляются через Яндекс Доставку между пунктами выдачи. Это удобный и понятный способ получения без ожидания курьера.",
    meta: ["по России", "пункт выдачи", "удобное получение"],
  },
] as const;

const PAYMENT_METHODS = [
  {
    title: "Полная онлайн-оплата",
    description:
      "Оплатить заказ можно сразу при оформлении, чтобы быстрее перейти к подтверждению покупки.",
  },
  {
    title: "Yandex Pay / Split",
    description:
      "Поддерживается полная оплата и покупка частями через Яндекс Pay.",
  },
  {
    title: "Оформление заказа",
    description:
      "После корзины вы переходите к отдельной странице оформления, где выбираете пункт выдачи и способ оплаты.",
  },
] as const;

const ORDER_FLOW = [
  "Вы добавляете товар в корзину и переходите к оформлению заказа.",
  "Заполняете контакты как гость или входите в аккаунт ради бонусов и быстрого оформления.",
  "Выбираете пункт выдачи Яндекс Доставки и подтверждаете удобный способ оплаты.",
  "После оплаты заказ переходит в обработку, а далее клиент получает статусы доставки.",
] as const;

export default function DeliveryPage() {
  return (
    <>
      <PageHero
        eyebrow="Доставка и оплата"
        badge="Понятные условия до покупки"
        title="Доставка и оплата без лишней неопределённости"
        description="Здесь собраны актуальные условия получения заказа, варианты оплаты и порядок подтверждения покупки."
      />

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {DELIVERY_METHODS.map((method) => (
            <InfoCard
              key={method.title}
              eyebrow={method.eyebrow}
              title={method.title}
              description={method.description}
            >
              <div className="flex flex-wrap gap-2">
                {method.meta.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </InfoCard>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Как это работает
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Что происходит после оформления
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {ORDER_FLOW.map((step, index) => (
              <div
                key={step}
                className="rounded-[28px] border border-zinc-200 bg-zinc-50 p-6"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
                  Шаг {index + 1}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[32px] border border-zinc-200 bg-zinc-950 p-6 text-white sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <Truck size={20} />
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <MapPinned size={20} />
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <CreditCard size={20} />
                </div>
              </div>

              <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
                Всё важное собрано на одной странице
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
                Так проще заранее понять, как будет проходить получение заказа и
                на каких условиях оформляется покупка.
              </p>

              <Link
                href="/service"
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-100"
              >
                Перейти к сервису
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {PAYMENT_METHODS.map((item) => (
                <InfoCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
