import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck, Undo2, Wrench } from "lucide-react";
import PageHero from "@/components/ui/page/PageHero";
import InfoCard from "@/components/ui/page/InfoCard";
import { LEGAL_CONTACT_CHANNELS, SELLER_DETAILS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Гарантия, возврат и сервис | UNOUN",
  description:
    "Гарантия, возврат и сервис UNOUN: порядок обращения, условия гарантии, возврата и обмена, а также клиентская логика сопровождения покупки.",
};

const SERVICE_STEPS = [
  "Не ремонтируйте устройство самостоятельно и не вскрывайте корпус до консультации со службой поддержки.",
  "Подготовьте номер заказа, модель устройства и краткое описание проблемы. При необходимости сделайте фото или видео.",
  "Свяжитесь с продавцом удобным способом и дождитесь первичной диагностики и дальнейших инструкций.",
  "При подтвержденном гарантийном случае согласовывается диагностика, ремонт, замена товара или возврат денежных средств.",
] as const;

const WARRANTY_RULES = [
  "На товар действует официальная гарантия 24 месяца с момента передачи покупателю, если иное не будет отдельно указано в карточке товара или сопроводительных документах.",
  "Для гарантийного обслуживания рекомендуется сохранить кассовый или товарный чек, а также комплектность устройства и аксессуаров.",
  "Ремонт по гарантии производится в сроки, предусмотренные законодательством РФ, а если ремонт невозможен или нецелесообразен, вопрос решается через обмен или возврат денежных средств.",
] as const;

const WARRANTY_EXCLUSIONS = [
  "Механические повреждения, появившиеся после передачи товара покупателю: сколы, трещины, вмятины и иные следы небрежной эксплуатации.",
  "Неисправности, возникшие из-за нарушения инструкции, использования неподходящих жидкостей, самостоятельного вскрытия или ремонта.",
  "Естественный износ расходных элементов и комплектующих, если дефект не связан с производственным браком.",
] as const;

const RETURN_RULES = [
  "Товар надлежащего качества, приобретенный дистанционно, можно вернуть в течение 7 дней с момента получения при сохранении товарного вида, потребительских свойств и комплектности.",
  "Если товар не подошел, обратная пересылка товара надлежащего качества обычно оплачивается покупателем.",
  "Если выявлен производственный недостаток или подтвержден гарантийный случай, расходы по обратной доставке несет продавец.",
  "При браке покупатель вправе требовать ремонт, замену, соразмерное уменьшение цены или полный возврат денежных средств в порядке, предусмотренном законодательством РФ.",
] as const;

export default function ServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Гарантия, возврат и сервис"
        badge="Trust-страница по логике референса Luxhomme"
        title="Понятный сервисный сценарий до и после покупки"
        description="Мы адаптировали эту страницу под логику premium e-commerce: клиент заранее понимает, как работает гарантия, возврат и сервисное сопровождение, не сталкиваясь с хаотичными формулировками уже после получения товара."
      />

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <InfoCard
            title="Гарантия 24 месяца"
            description="Срок гарантии вынесен в отдельный trust-блок, потому что для техники это одно из ключевых возражений перед покупкой."
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700">
              <ShieldCheck size={20} />
            </div>
          </InfoCard>

          <InfoCard
            title="Возврат и обмен"
            description="Условия возврата и обмена описаны отдельно, чтобы клиент сразу понимал, какие сценарии действуют при браке и при возврате качественного товара."
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700">
              <Undo2 size={20} />
            </div>
          </InfoCard>

          <InfoCard
            title="Сервисная логика"
            description="Пошаговый порядок обращения помогает снизить тревогу и показывает, что сайт и продавец подготовлены к сопровождению клиента после продажи."
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700">
              <Wrench size={20} />
            </div>
          </InfoCard>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-[32px] border border-zinc-200 bg-zinc-950 p-6 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
                Порядок обращения
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Как воспользоваться гарантией и сервисной поддержкой
              </h2>

              <div className="mt-8 space-y-4">
                {SERVICE_STEPS.map((step, index) => (
                  <div
                    key={step}
                    className="rounded-[24px] border border-white/10 bg-white/5 p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/40">
                      Шаг {index + 1}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
                Гарантийные обязательства
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                Что покрывает гарантия
              </h2>

              <ul className="mt-8 space-y-4">
                {WARRANTY_RULES.map((item) => (
                  <li
                    key={item}
                    className="rounded-[24px] border border-zinc-200 bg-white p-5 text-sm leading-relaxed text-zinc-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
                Что не покрывается гарантией
              </p>
              <ul className="mt-6 space-y-4">
                {WARRANTY_EXCLUSIONS.map((item) => (
                  <li
                    key={item}
                    className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5 text-sm leading-relaxed text-zinc-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
                Возврат и обмен
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                Как устроен возврат товара
              </h2>

              <ul className="mt-8 space-y-4">
                {RETURN_RULES.map((item) => (
                  <li
                    key={item}
                    className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5 text-sm leading-relaxed text-zinc-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/delivery"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 px-5 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
                >
                  Доставка и оплата
                </Link>
                <a
                  href="/manuals/instrukcia.pdf"
                  download
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#E5FF00] px-5 text-sm font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
                >
                  Скачать инструкцию
                  <FileText size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-[32px] border border-zinc-200 bg-zinc-950 p-6 text-white sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Контакты и адрес для сервисных обращений
              </h2>
              <div className="mt-6 space-y-4">
                {LEGAL_CONTACT_CHANNELS.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-white/10 bg-white/5 p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {item.value}
                    </p>
                  </div>
                ))}
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
                    Рекомендуемый состав обращения
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Укажите номер заказа, ФИО, телефон, email, описание вопроса и,
                    если речь идет о недостатке товара, приложите фото или видео.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
                Возврат товара
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                Куда направлять товар и документы
              </h2>
              <div className="mt-6 space-y-4">
                <div className="rounded-[24px] border border-zinc-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                    Адрес для возврата
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                    {SELLER_DETAILS.returnAddress}
                  </p>
                </div>
                <div className="rounded-[24px] border border-zinc-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                    Важно
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                    Перед отправкой возврата рекомендуется согласовать комплект
                    документов, адресата и способ отправки с продавцом, чтобы избежать
                    задержек в приемке и проверке товара.
                  </p>
                </div>
              </div>

              <Link
                href="/account/auth"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-black"
              >
                Перейти ко входу
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
