import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/page/PageHero";
import InfoCard from "@/components/ui/page/InfoCard";
import {
  LEGAL_CONTACT_CHANNELS,
  LEGAL_LAST_UPDATED,
  PERSONAL_DATA_CATEGORIES,
  PERSONAL_DATA_PURPOSES,
  PERSONAL_DATA_RIGHTS,
  PERSONAL_DATA_THIRD_PARTIES,
  SELLER_DETAILS_LIST,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | UNOUN",
  description:
    "Политика конфиденциальности UNOUN: состав данных, цели, cookie, аналитика, права пользователя и контакты оператора.",
};

const PRIVACY_BLOCKS = [
  {
    title: "Что регулирует этот документ",
    description:
      "Политика конфиденциальности объясняет, какие данные сайт UNOUN может получать от пользователя, зачем они нужны, кому могут передаваться и как пользователь может реализовать свои права.",
  },
  {
    title: "Кого касается политика",
    description:
      "Документ распространяется на посетителей сайта, покупателей, зарегистрированных пользователей, лиц, направляющих обращения через формы сайта или по контактным каналам продавца.",
  },
  {
    title: "Когда документ применяется",
    description:
      "Политика действует при использовании сайта UNOUN, оформлении заказа, авторизации, обращении в поддержку, получении сервисных уведомлений и взаимодействии с любыми формами на сайте.",
  },
  {
    title: "Что политика не заменяет",
    description:
      "Политика конфиденциальности не заменяет согласие на обработку персональных данных, публичную оферту и отдельный порядок обработки персональных данных. Эти документы применяются совместно.",
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Политика конфиденциальности"
        badge={`Редакция от ${LEGAL_LAST_UPDATED}`}
        title="Как UNOUN работает с данными пользователя"
        description="Мы собрали эту страницу как понятный пользовательский документ: без лишней расплывчатости, но с полным набором базовых правил для интернет-магазина, оформления заказов и дальнейшего сервиса."
        className="bg-zinc-50"
      />

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {PRIVACY_BLOCKS.map((block) => (
            <InfoCard
              key={block.title}
              title={block.title}
              description={block.description}
            />
          ))}
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoCard
            eyebrow="Состав данных"
            title="Какие данные могут собираться"
            description="Мы исходим из принципа минимально необходимого объема данных: берем только то, что нужно для работы сайта, оформления и исполнения заказа, поддержки и соблюдения закона."
          >
            <ul className="space-y-3">
              {PERSONAL_DATA_CATEGORIES.map((item) => (
                <li
                  key={item}
                  className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard
            eyebrow="Цели использования"
            title="Зачем эти данные нужны"
            description="Данные используются не для абстрактного маркетинга, а для конкретных и проверяемых задач интернет-магазина."
          >
            <ul className="space-y-3">
              {PERSONAL_DATA_PURPOSES.map((item) => (
                <li
                  key={item}
                  className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </InfoCard>
        </div>
      </section>

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="rounded-[32px] border border-zinc-200 bg-zinc-950 p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
              Cookie и аналитика
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              На сайте используются технические cookie и инструменты аналитики
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/70 sm:text-base">
              <p>
                Сайт UNOUN использует cookie, local storage и похожие технологии,
                чтобы сохранять корзину, поддерживать сессию пользователя, улучшать
                стабильность сайта и понимать, какие сценарии оформления заказа
                работают корректно.
              </p>
              <p>
                При подключении аналитики на сайте используется Яндекс Метрика.
                Такие инструменты могут получать технические сведения о визите:
                IP-адрес, cookie, тип устройства, браузер, источник перехода,
                глубину просмотра и действия на страницах.
              </p>
              <p>
                Пользователь может ограничить использование cookie в настройках
                браузера. Однако это может повлиять на корректную работу корзины,
                авторизации и других функций сайта.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
                Порядок обработки данных
              </Link>
            </div>
          </div>

          <InfoCard
            eyebrow="Передача и права"
            title="Кому данные могут передаваться и что может требовать пользователь"
            description="Передача возможна только в пределах цели обработки, а пользователь сохраняет предусмотренные законом права на доступ, уточнение и отзыв согласия."
          >
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  Передача третьим лицам
                </p>
                <ul className="mt-3 space-y-3">
                  {PERSONAL_DATA_THIRD_PARTIES.map((item) => (
                    <li
                      key={item}
                      className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  Права пользователя
                </p>
                <ul className="mt-3 space-y-3">
                  {PERSONAL_DATA_RIGHTS.map((item) => (
                    <li
                      key={item}
                      className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </InfoCard>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <InfoCard
            eyebrow="Хранение и обновления"
            title="Как долго хранятся данные и как меняется политика"
            description="Данные хранятся не дольше, чем это требуется для заявленных целей, исполнения обязательств перед покупателем и соблюдения требований законодательства РФ."
          >
            <div className="space-y-3 text-sm leading-relaxed text-zinc-700">
              <p className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
                Когда цель обработки достигнута, а дальнейшее хранение не требуется
                по закону или для защиты законных интересов продавца, данные
                подлежат удалению, обезличиванию или уничтожению.
              </p>
              <p className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
                Новая редакция политики публикуется на этой странице. Если изменения
                затрагивают существенные условия, пользователь может ознакомиться с
                актуальной версией перед дальнейшим использованием сайта.
              </p>
            </div>
          </InfoCard>

          <div className="rounded-[32px] border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Оператор и контакты
            </p>

            <div className="mt-6 space-y-4">
              {LEGAL_CONTACT_CHANNELS.map((item) => (
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

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {SELLER_DETAILS_LIST.slice(0, 4).map((item) => (
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
