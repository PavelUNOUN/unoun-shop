import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/page/PageHero";
import InfoCard from "@/components/ui/page/InfoCard";
import { SELLER_DETAILS_LIST } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Обработка персональных данных | UNOUN",
  description:
    "Порядок обработки персональных данных на сайте UNOUN: цели, состав данных, правовые основания, хранение и реквизиты оператора.",
};

const PROCESSING_BLOCKS = [
  {
    title: "Оператор персональных данных",
    description:
      "Оператором персональных данных в рамках сайта UNOUN выступает продавец, реквизиты которого указаны на этой странице и в связанных юридических документах сайта.",
  },
  {
    title: "Категории данных",
    description:
      "ФИО, номер телефона, email, город, сведения о доставке, выбранный пункт выдачи, история заказов, бонусный баланс, а также технические данные, необходимые для корректной работы сайта.",
  },
  {
    title: "Цели обработки",
    description:
      "Оформление и исполнение заказа, доставка, обратная связь с клиентом, сервис и гарантийное сопровождение, ведение личного кабинета, учет бонусов и выполнение требований законодательства РФ.",
  },
  {
    title: "Правовые основания",
    description:
      "Согласие пользователя, необходимость исполнения договора купли-продажи и совершения действий, прямо связанных с покупкой, доставкой, возвратом, сервисом и клиентской поддержкой.",
  },
  {
    title: "Срок и способ хранения",
    description:
      "Данные хранятся в объеме и сроке, необходимом для исполнения обязательств по заказу, сервису, возврату и требованиям законодательства. Архитектура проекта ориентирована на хранение данных в инфраструктуре РФ.",
  },
  {
    title: "Передача третьим лицам",
    description:
      "Передача допускается только в пределах, необходимых для оплаты, доставки, сервисной поддержки, бухгалтерского и юридического сопровождения интернет-магазина.",
  },
] as const;

export default function PersonalDataPage() {
  return (
    <>
      <PageHero
        eyebrow="Персональные данные"
        badge="Отдельная юридическая страница"
        title="Порядок обработки персональных данных на сайте UNOUN"
        description="Эта страница фиксирует базовую структуру обработки персональных данных: кто является оператором, какие категории данных используются, для чего это делается и на каком основании."
        className="bg-zinc-50"
      />

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {PROCESSING_BLOCKS.map((block) => (
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
              Реквизиты оператора
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
