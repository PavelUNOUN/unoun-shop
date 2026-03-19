import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/page/PageHero";
import InfoCard from "@/components/ui/page/InfoCard";
import { SELLER_DETAILS_LIST } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | UNOUN",
  description:
    "Политика конфиденциальности UNOUN: какие данные собираются, для чего используются и как связаны с заказом, доставкой, оплатой и личным кабинетом.",
};

const POLICY_BLOCKS = [
  {
    title: "Какие данные мы можем получать",
    description:
      "Имя, телефон, email, город, адрес или выбранный пункт выдачи, сведения о заказе, а также технические данные, необходимые для стабильной работы сайта, оформления покупки и клиентского сервиса.",
  },
  {
    title: "Зачем мы это делаем",
    description:
      "Для оформления и исполнения заказа, доставки, связи с покупателем, сервисного сопровождения, учета бонусов, работы личного кабинета, а также для улучшения пользовательского сценария на сайте.",
  },
  {
    title: "Как данные используются",
    description:
      "Только в пределах задач интернет-магазина UNOUN: checkout, подтверждение заказа, доставка через ПВЗ, сервисные обращения, гарантийная поддержка и подготовка истории заказов в аккаунте.",
  },
  {
    title: "Что не является целью",
    description:
      "Мы не закладываем агрессивный маркетинговый сценарий. Если позже появятся рассылки или отдельные рекламные коммуникации, они должны быть оформлены через понятное и отдельное согласие.",
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Политика конфиденциальности"
        badge="Юридическая trust-страница"
        title="Прозрачная работа с данными покупателя до и после оформления заказа"
        description="Эта страница объясняет, какие данные может получать сайт UNOUN, зачем они нужны и как связаны с заказом, оплатой, доставкой, бонусами и будущим личным кабинетом."
        className="bg-zinc-50"
      />

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {POLICY_BLOCKS.map((block) => (
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
              Что важно понимать
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              Политика конфиденциальности и обработка персональных данных связаны, но
              не заменяют друг друга
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
              Для сайта UNOUN мы разделяем понятную для клиента страницу
              конфиденциальности и отдельную страницу, посвященную порядку обработки
              персональных данных. Это позволяет не смешивать пользовательские
              объяснения и юридически важные формулировки.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/consent"
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-100"
              >
                Согласие на обработку данных
              </Link>
              <Link
                href="/personal-data"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/10"
              >
                Обработка персональных данных
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
              Реквизиты продавца
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
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700 sm:text-base">
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
