import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/page/PageHero";
import InfoCard from "@/components/ui/page/InfoCard";
import {
  LEGAL_CONTACT_CHANNELS,
  LEGAL_LAST_UPDATED,
  PERSONAL_DATA_CATEGORIES,
  PERSONAL_DATA_PURPOSES,
  SELLER_DETAILS,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных | UNOUN",
  description:
    "Согласие на обработку персональных данных для сайта UNOUN: состав данных, цели, действия, срок действия и порядок отзыва.",
};

const CONSENT_TERMS = [
  "Согласие дается на обработку персональных данных, которые пользователь предоставляет самостоятельно при оформлении заказа, авторизации, обращении в поддержку и использовании других форм сайта.",
  "Согласие распространяется на автоматизированную, смешанную и без использования средств автоматизации обработку персональных данных.",
  "Согласие включает право оператора совершать с данными сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу в пределах исполнения заказа, обезличивание, блокирование, удаление и уничтожение.",
  "Согласие действует до достижения целей обработки либо до момента его отзыва субъектом персональных данных, если иное не требуется законодательством РФ или исполнением уже заключенного договора.",
  "Отзыв согласия не имеет обратной силы и не затрагивает обработку, которая была правомерно осуществлена до момента получения оператором соответствующего обращения.",
] as const;

export default function ConsentPage() {
  return (
    <>
      <PageHero
        eyebrow="Согласие на обработку данных"
        badge={`Редакция от ${LEGAL_LAST_UPDATED}`}
        title="Документ для явного согласия пользователя в checkout и других формах"
        description="Эта страница предназначена для прямой ссылки из checkbox и иных форм сайта. Документ описывает, на что именно соглашается пользователь, какой объем данных может обрабатываться и как можно отозвать согласие."
        className="bg-zinc-50"
      />

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="rounded-[32px] border border-zinc-200 bg-zinc-950 p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
              Формулировка согласия
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              Текст, на который ссылается checkout
            </h2>
            <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-white/75 sm:text-base">
              Я, действуя свободно, своей волей и в своем интересе, даю согласие{" "}
              <span className="font-semibold text-white">
                {SELLER_DETAILS.sellerName}
              </span>{" "}
              на обработку моих персональных данных, указанных мной на сайте UNOUN,
              в том числе при оформлении заказа, авторизации, обращении в поддержку
              и использовании иных сервисов сайта, для целей регистрации и
              сопровождения аккаунта, оформления и исполнения заказа, приема оплаты,
              доставки, возврата, сервисного и гарантийного обслуживания, обратной
              связи, выполнения требований законодательства РФ, а также аналитики и
              обеспечения корректной работы сайта. Согласие действует до достижения
              целей обработки либо до момента его отзыва.
            </div>

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
                Порядок обработки данных
              </Link>
              <Link
                href="/offer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/10"
              >
                Публичная оферта
              </Link>
            </div>
          </div>

          <InfoCard
            eyebrow="На что распространяется"
            title="Какие данные и цели покрывает согласие"
            description="Согласие не должно быть абстрактным. Пользователь должен понимать, какие данные обрабатываются и зачем."
          >
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  Данные, которые может обрабатывать оператор
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
            </div>
          </InfoCard>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoCard
            eyebrow="Условия согласия"
            title="Как действует согласие"
            description="Ниже собраны ключевые юридические условия, которые имеют значение и для пользователя, и для оператора."
          >
            <ul className="space-y-3">
              {CONSENT_TERMS.map((item) => (
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
            eyebrow="Отзыв согласия"
            title="Как пользователь может отозвать согласие"
            description="Отзыв направляется оператору в письменной или электронной форме по контактам, размещенным на сайте. Для корректной идентификации обращения в письме желательно указать имя, телефон, email и суть требования."
          >
            <div className="space-y-3">
              {LEGAL_CONTACT_CHANNELS.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </InfoCard>
        </div>
      </section>
    </>
  );
}
