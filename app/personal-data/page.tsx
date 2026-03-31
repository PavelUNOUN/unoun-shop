import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/page/PageHero";
import InfoCard from "@/components/ui/page/InfoCard";
import {
  DATA_SECURITY_MEASURES,
  LEGAL_CONTACT_CHANNELS,
  LEGAL_LAST_UPDATED,
  PERSONAL_DATA_CATEGORIES,
  PERSONAL_DATA_PURPOSES,
  PERSONAL_DATA_RIGHTS,
  PERSONAL_DATA_THIRD_PARTIES,
  SELLER_DETAILS,
  SELLER_DETAILS_LIST,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Порядок обработки персональных данных | UNOUN",
  description:
    "Порядок обработки персональных данных на сайте UNOUN: оператор, цели, основания, категории данных, сроки хранения, безопасность и права субъектов.",
};

const POLICY_PRINCIPLES = [
  "законность и справедливая основа обработки;",
  "ограничение обработки достижением конкретных, заранее определенных и законных целей;",
  "недопущение обработки данных, избыточных по отношению к заявленным целям;",
  "обеспечение точности, достаточности и актуальности персональных данных;",
  "хранение данных не дольше, чем этого требуют цели обработки и закон.",
] as const;

const LEGAL_BASES = [
  "согласие субъекта персональных данных;",
  "необходимость исполнения договора дистанционной купли-продажи и действий, непосредственно связанных с ним;",
  "исполнение обязанностей, установленных законодательством РФ, включая бухгалтерский, налоговый и потребительский учет;",
  "осуществление законных интересов продавца при условии, что это не нарушает права и свободы субъекта персональных данных.",
] as const;

const PROCESSING_ACTIONS = [
  "сбор, запись, систематизация и накопление;",
  "хранение, уточнение (обновление, изменение) и извлечение;",
  "использование, передача (предоставление, доступ) в пределах цели обработки;",
  "обезличивание, блокирование, удаление и уничтожение персональных данных.",
] as const;

export default function PersonalDataPage() {
  return (
    <>
      <PageHero
        eyebrow="Порядок обработки персональных данных"
        badge={`Редакция от ${LEGAL_LAST_UPDATED}`}
        title="Политика оператора в отношении обработки персональных данных"
        description="Это основной юридический документ оператора персональных данных для сайта UNOUN. Он фиксирует состав данных, цели и основания обработки, порядок передачи, меры защиты и права субъектов персональных данных."
        className="bg-zinc-50"
      />

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <InfoCard
            eyebrow="Оператор"
            title="Кто обрабатывает персональные данные"
            description="Оператором персональных данных в рамках сайта UNOUN выступает продавец товара, который самостоятельно определяет цели обработки, состав данных и перечень действий с ними."
          >
            <div className="space-y-3">
              <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700">
                <span className="font-semibold text-zinc-900">Оператор:</span>{" "}
                {SELLER_DETAILS.sellerName}
              </div>
              <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700">
                <span className="font-semibold text-zinc-900">ИНН:</span>{" "}
                {SELLER_DETAILS.inn}
              </div>
              <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700">
                <span className="font-semibold text-zinc-900">ОГРНИП:</span>{" "}
                {SELLER_DETAILS.ogrnip}
              </div>
            </div>
          </InfoCard>

          <InfoCard
            eyebrow="Принципы"
            title="На каких принципах строится обработка"
            description="При формировании политики мы ориентируемся на стандартные требования законодательства РФ к оператору персональных данных."
          >
            <ul className="space-y-3">
              {POLICY_PRINCIPLES.map((item) => (
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

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoCard
            eyebrow="Категории данных"
            title="Какие персональные данные могут обрабатываться"
            description="Состав данных зависит от того, использует ли пользователь сайт как посетитель, покупатель, зарегистрированный пользователь или лицо, направляющее обращение."
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
            eyebrow="Цели и основания"
            title="Для чего обрабатываются данные и на чем это основано"
            description="Оператор не обрабатывает данные без цели. Каждая категория данных должна быть привязана к конкретному пользовательскому или законному сценарию."
          >
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-zinc-900">Цели обработки</p>
                <ul className="mt-3 space-y-3">
                  {PERSONAL_DATA_PURPOSES.map((item) => (
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
                  Правовые основания
                </p>
                <ul className="mt-3 space-y-3">
                  {LEGAL_BASES.map((item) => (
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

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <InfoCard
            eyebrow="Операции и передача"
            title="Какие действия совершаются с данными"
            description="Перечень операций и передача третьим лицам ограничены реальными бизнес-процессами интернет-магазина."
          >
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  Действия с персональными данными
                </p>
                <ul className="mt-3 space-y-3">
                  {PROCESSING_ACTIONS.map((item) => (
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
            </div>
          </InfoCard>

          <InfoCard
            eyebrow="Безопасность и сроки"
            title="Как обеспечивается защита и когда данные удаляются"
            description="Оператор принимает организационные и технические меры защиты, соразмерные характеру сайта, категориям данных и рискам их обработки."
          >
            <div className="space-y-4">
              <ul className="space-y-3">
                {DATA_SECURITY_MEASURES.map((item) => (
                  <li
                    key={item}
                    className="rounded-[20px] border border-zinc-200 bg-white p-4 text-sm leading-relaxed text-zinc-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="rounded-[20px] border border-zinc-200 bg-white p-4 text-sm leading-relaxed text-zinc-700">
                Хранение персональных данных осуществляется в течение срока,
                необходимого для достижения цели обработки, исполнения договора,
                возврата товара, гарантийного и сервисного сопровождения, а также в
                течение сроков, которые требуют применимые нормы права.
              </p>
            </div>
          </InfoCard>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <InfoCard
            eyebrow="Права субъекта"
            title="Какие права есть у пользователя"
            description="Субъект персональных данных может обращаться к оператору по вопросам обработки своих данных и использовать иные права, предусмотренные законодательством РФ."
          >
            <ul className="space-y-3">
              {PERSONAL_DATA_RIGHTS.map((item) => (
                <li
                  key={item}
                  className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/consent"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#E5FF00] px-6 text-sm font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
              >
                Открыть согласие
              </Link>
              <Link
                href="/privacy"
                className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 px-6 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
              >
                Политика конфиденциальности
              </Link>
            </div>
          </InfoCard>

          <div className="rounded-[32px] border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Контакты и реквизиты
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
          </div>
        </div>
      </section>
    </>
  );
}
