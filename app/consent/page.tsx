import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/page/PageHero";
import InfoCard from "@/components/ui/page/InfoCard";
import { SELLER_DETAILS_LIST } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных | UNOUN",
  description:
    "Отдельное согласие на обработку персональных данных для сайта UNOUN: состав данных, цели, действия и связь с checkout.",
};

const CONSENT_BLOCKS = [
  {
    title: "На что дается согласие",
    description:
      "На обработку персональных данных, которые пользователь вводит на сайте UNOUN при оформлении заказа, обращении в поддержку, авторизации и использовании связанных сервисных сценариев.",
  },
  {
    title: "Какие данные могут обрабатываться",
    description:
      "Имя, телефон, email, город, сведения о заказе, данные о выбранном пункте выдачи, бонусном статусе и иные сведения, необходимые для покупки, доставки, сервиса и работы личного кабинета.",
  },
  {
    title: "Для каких целей",
    description:
      "Для оформления и исполнения заказа, доставки, обратной связи, сервисного сопровождения, гарантийных обязательств, ведения истории заказов и реализации программы лояльности.",
  },
  {
    title: "Какие действия допускаются",
    description:
      "Сбор, запись, систематизация, хранение, уточнение, использование, передача в пределах исполнения заказа, обезличивание, блокирование и удаление в случаях, предусмотренных законодательством РФ.",
  },
  {
    title: "Как отозвать согласие",
    description:
      "Пользователь вправе отозвать согласие через каналы связи, опубликованные на сайте, если это не препятствует исполнению уже принятых обязательств по заказу, сервису или требованиям закона.",
  },
  {
    title: "С чем согласие связано",
    description:
      "Это согласие применяется вместе с политикой конфиденциальности, порядком обработки персональных данных и публичной офертой, а не заменяет эти документы.",
  },
] as const;

export default function ConsentPage() {
  return (
    <>
      <PageHero
        eyebrow="Согласие на обработку данных"
        badge="Отдельный обязательный документ"
        title="Юридический текст для явного согласия пользователя в checkout и других формах"
        description="Эта страница закрывает важный практический пробел: теперь на сайте есть отдельный документ, на который можно ссылаться при оформлении заказа и в будущих формах авторизации или поддержки."
        className="bg-zinc-50"
      />

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {CONSENT_BLOCKS.map((block) => (
            <InfoCard
              key={block.title}
              title={block.title}
              description={block.description}
            />
          ))}
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div className="rounded-[32px] border border-zinc-200 bg-zinc-950 p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
              Связанные документы
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              Согласие теперь можно указывать прямо в checkout
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
              Для пользователя это выглядит прозрачно: он видит чекбокс, понимает,
              на что именно соглашается, и при необходимости может открыть полный
              комплект юридических страниц без поиска по сайту.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/privacy"
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-100"
              >
                Политика конфиденциальности
              </Link>
              <Link
                href="/personal-data"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/10"
              >
                Обработка данных
              </Link>
              <Link
                href="/offer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/10"
              >
                Публичная оферта
              </Link>
            </div>
          </div>

          <div className="rounded-[32px] border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Оператор
            </p>

            <div className="mt-6 space-y-4">
              {SELLER_DETAILS_LIST.slice(0, 3).map((item) => (
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
