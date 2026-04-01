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
  SELLER_DETAILS,
  SELLER_DETAILS_LIST,
} from "@/lib/legal";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | UNOUN",
  description:
    "Политика конфиденциальности UNOUN: обработка персональных данных, cookie, аналитика и контакты оператора.",
};

const POLICY_OVERVIEW = [
  {
    title: "Оператор персональных данных",
    description:
      `${SELLER_DETAILS.sellerName} самостоятельно определяет цели и состав обработки персональных данных пользователей сайта UNOUN и организует их защиту в пределах требований законодательства РФ.`,
  },
  {
    title: "Где действует документ",
    description:
      `Политика применяется ко всему сайту ${getSiteUrl()}, включая корзину, оформление заказа, авторизацию, обращения в поддержку, cookie-согласие и иные формы взаимодействия с пользователем.`,
  },
  {
    title: "Кого касается политика",
    description:
      "Документ распространяется на посетителей сайта, покупателей, зарегистрированных пользователей, лиц, направляющих обращения через формы сайта, а также пользователей, авторизующихся через внешние сервисы.",
  },
  {
    title: "Как читать эту страницу",
    description:
      "Страница оформлена как публичная политика оператора в отношении обработки персональных данных. Она действует вместе с согласием на обработку данных, публичной офертой и иными обязательными документами сайта.",
  },
] as const;

const LEGAL_BASES = [
  "согласие субъекта персональных данных;",
  "необходимость заключения, исполнения и сопровождения договора дистанционной купли-продажи;",
  "исполнение обязанностей продавца по законодательству РФ, включая потребительское, налоговое и бухгалтерское регулирование;",
  "законные интересы оператора, если они не нарушают права и свободы субъекта персональных данных.",
] as const;

const PROCESSING_TERMS = [
  "обработка осуществляется автоматизированным, неавтоматизированным и смешанным способом;",
  "оператор совершает с данными сбор, запись, систематизацию, накопление, хранение, уточнение, использование, передачу в пределах цели обработки, обезличивание, блокирование, удаление и уничтожение;",
  "данные хранятся не дольше, чем этого требуют цели обработки, исполнение обязательств перед покупателем и применимое законодательство РФ;",
  "при достижении целей обработки либо при отзыве согласия данные подлежат удалению, обезличиванию или уничтожению, если более длительное хранение не требуется по закону.",
] as const;

const SERVICE_DISCLOSURES = [
  "технические cookie, local storage и аналогичные технологии используются для работы корзины, авторизации, сохранения пользовательской сессии и стабильного функционирования сайта;",
  "аналитические инструменты и Яндекс Метрика подключаются только после отдельного согласия пользователя на аналитические cookie;",
  "при выборе оплаты или рассрочки данные, необходимые для проведения платежа, могут передаваться сервисам Яндекс Pay и Яндекс Split;",
  "при выборе доставки в пункт выдачи данные заказа и получателя могут передаваться сервисам Яндекс Delivery в объеме, необходимом для доставки;",
  "при авторизации через Яндекс оператор получает от соответствующего сервиса только тот набор данных, который необходим для входа в аккаунт и сопровождения учетной записи.",
] as const;

const SUBJECT_CATEGORIES = [
  "посетители сайта;",
  "покупатели и получатели заказов;",
  "зарегистрированные пользователи личного кабинета;",
  "лица, направляющие обращения в поддержку, по возврату, гарантии или претензиям.",
] as const;

const siteUrl = getSiteUrl();

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Политика конфиденциальности"
        badge={`Редакция от ${LEGAL_LAST_UPDATED}`}
        title="Политика оператора в отношении обработки персональных данных"
        description={`Настоящая политика определяет порядок обработки и защиты персональных данных пользователей сайта ${siteUrl}, а также условия использования cookie, аналитики и внешних сервисов при оформлении заказа и использовании сайта UNOUN.`}
        className="bg-zinc-50"
      />

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {POLICY_OVERVIEW.map((block) => (
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
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <InfoCard
              eyebrow="1. Общие положения"
              title="Кто является оператором и когда применяется политика"
              description={`Оператором персональных данных на сайте ${siteUrl} является ${SELLER_DETAILS.sellerName}. Политика применяется при посещении сайта, оформлении заказа, авторизации, оплате, выборе доставки, направлении обращений и любом ином использовании сервисов сайта.`}
            >
              <div className="space-y-3 text-sm leading-relaxed text-zinc-700">
                <p className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
                  Политика опубликована в свободном доступе и действует в отношении
                  всей информации, которую оператор может получить о пользователе
                  при использовании сайта UNOUN.
                </p>
                <p className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
                  Оператор не контролирует сайты третьих лиц, на которые
                  пользователь может перейти по внешним ссылкам. Для таких сайтов
                  применяются их собственные документы и правила обработки данных.
                </p>
              </div>
            </InfoCard>

            <InfoCard
              eyebrow="2. Категории субъектов и данных"
              title="Какие лица и какие сведения подпадают под обработку"
              description="Оператор исходит из принципа минимально необходимого объема данных и связывает каждый набор сведений с конкретной целью обработки."
            >
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    Категории субъектов персональных данных
                  </p>
                  <ul className="mt-3 space-y-3">
                    {SUBJECT_CATEGORIES.map((item) => (
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
                    Категории обрабатываемых данных
                  </p>
                  <ul className="mt-3 space-y-3">
                    {PERSONAL_DATA_CATEGORIES.map((item) => (
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
        </div>
      </section>

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
          <InfoCard
            eyebrow="3. Цели обработки"
            title="Для чего оператор получает и использует данные"
            description="Обработка персональных данных ограничивается заранее определенными и законными целями интернет-магазина."
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

          <InfoCard
            eyebrow="4. Правовые основания"
            title="На чем основана обработка персональных данных"
            description="Оператор обрабатывает данные только при наличии правового основания, предусмотренного законодательством РФ."
          >
            <ul className="space-y-3">
              {LEGAL_BASES.map((item) => (
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
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <InfoCard
            eyebrow="5. Порядок и условия обработки"
            title="Какие действия совершаются с данными и как долго они хранятся"
            description="Оператор ограничивает способы обработки и сроки хранения целями заказа, сервисного сопровождения и обязательными требованиями законодательства РФ."
          >
            <ul className="space-y-3">
              {PROCESSING_TERMS.map((item) => (
                <li
                  key={item}
                  className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700"
                >
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-5 rounded-[20px] border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700">
              Оператор не хранит реквизиты банковских карт пользователя. Оплата
              осуществляется через внешнего платежного провайдера, который
              обрабатывает платежные данные в соответствии со своими правилами и
              применимыми требованиями безопасности.
            </p>
          </InfoCard>

          <InfoCard
            eyebrow="6. Cookie, аналитика и внешние сервисы"
            title="Какие технологии и сторонние сервисы используются на сайте"
            description="В политике отражены только те сервисы, которые связаны с текущей функциональностью сайта и пользовательскими сценариями."
          >
            <ul className="space-y-3">
              {SERVICE_DISCLOSURES.map((item) => (
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
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <InfoCard
            eyebrow="7. Передача и права субъекта"
            title="Кому могут передаваться данные и какие права есть у пользователя"
            description="Передача третьим лицам возможна только в пределах заявленных целей обработки, а субъект персональных данных сохраняет права, предусмотренные законодательством РФ."
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
                      className="rounded-[20px] border border-zinc-200 bg-white p-4 text-sm leading-relaxed text-zinc-700"
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
                      className="rounded-[20px] border border-zinc-200 bg-white p-4 text-sm leading-relaxed text-zinc-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </InfoCard>

          <div className="rounded-[32px] border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
              8. Контакты оператора
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

            <div className="mt-6 rounded-[24px] border border-zinc-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                9. Обновление политики
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                Новая редакция политики вступает в силу с момента публикации на
                этой странице, если иное прямо не указано в тексте обновленной
                редакции. Пользователю рекомендуется проверять актуальную версию
                документа перед дальнейшим использованием сайта.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/consent"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#E5FF00] px-6 text-sm font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
              >
                Согласие на обработку данных
              </Link>
              <Link
                href="/personal-data"
                className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 px-6 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-100"
              >
                Порядок обработки данных
              </Link>
              <Link
                href="/offer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 px-6 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-100"
              >
                Публичная оферта
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
