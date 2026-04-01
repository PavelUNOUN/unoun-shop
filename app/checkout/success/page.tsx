import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Gift, ShieldCheck } from "lucide-react";
import CheckoutSuccessClearCart from "@/components/checkout/CheckoutSuccessClearCart";
import PageHero from "@/components/ui/page/PageHero";

export const metadata: Metadata = {
  title: "Заказ подтвержден | UNOUN",
  description:
    "UNOUN: заказ оформлен, статус оплаты и дальнейшие шаги после покупки.",
};

type CheckoutSuccessPageProps = {
  searchParams: Promise<{
    orderNumber?: string;
    mode?: string;
    provider?: string;
    payment?: string;
  }>;
};

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const params = await searchParams;
  const orderNumber = params.orderNumber ?? "UNOUN";
  const isYandexPayFlow = params.provider === "yandex_pay";
  const hasPaymentError = params.payment === "error";
  const title = hasPaymentError
    ? "Заказ сохранён, но оплата не завершена"
    : isYandexPayFlow
      ? "Заказ оформлен, ждём подтверждение оплаты"
      : "Заказ оформлен";
  const description = hasPaymentError
      ? "Мы сохранили ваш заказ. Попробуйте снова перейти к оплате позже или свяжитесь с поддержкой, если нужна помощь."
    : isYandexPayFlow
      ? "Заказ уже создан. Как только оплата подтвердится, обновления появятся в личном кабинете."
      : "Спасибо за покупку. Детали заказа доступны на этой странице и в личном кабинете.";
  const paymentLabel = hasPaymentError
    ? "Не завершена"
    : isYandexPayFlow
      ? "Ожидаем подтверждение"
      : "Статус обновится автоматически";

  return (
    <>
      <CheckoutSuccessClearCart />

      <PageHero
        eyebrow="Заказ UNOUN"
        badge="Подтверждение заказа"
        title={title}
        description={description}
        className="bg-zinc-50"
      />

      <section className="bg-zinc-50 pb-16 md:pb-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)] sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E5FF00] text-zinc-900">
              <CheckCircle2 size={28} />
            </div>

            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              {hasPaymentError
                ? "Заказ сохранён, но оплата пока не завершена"
                : isYandexPayFlow
                  ? "Заказ принят, статус оплаты уточняется"
                  : "Спасибо, ваш заказ принят"}
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
              {hasPaymentError
                ? "Заказ уже сохранён. Вы можете вернуться к оплате позже или связаться с поддержкой, если нужна помощь с завершением покупки."
                : isYandexPayFlow
                  ? "Мы получили данные по заказу и ждём подтверждение оплаты. После этого заказ перейдёт в дальнейшую обработку."
                  : "Мы отправим информацию по заказу в обработку и покажем дальнейшие обновления в личном кабинете."}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Номер заказа
                </p>
                <p className="mt-2 text-sm font-semibold text-zinc-900">
                  {orderNumber}
                </p>
              </div>
              <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Оплата
                </p>
                <p className="mt-2 text-sm font-semibold text-zinc-900">
                  {paymentLabel}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#E5FF00] px-6 text-sm font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
              >
                Вернуться на главную
              </Link>

              <Link
                href="/account/auth"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 px-6 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
              >
                Открыть аккаунт
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700">
                <ShieldCheck size={20} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-zinc-900">
                Что дальше
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                После подтверждения оплаты заказ перейдёт в обработку, а затем в доставку.
              </p>
            </article>

            <article className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700">
                <Gift size={20} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-zinc-900">
                Бонусы и аккаунт
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                В аккаунте доступны бонусы, история заказов и сохранённые данные
                для следующих покупок.
              </p>
            </article>

            <article className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700">
                <ArrowRight size={20} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-zinc-900">
                Личный кабинет
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                В личном кабинете удобно следить за заказами, бонусами и
                сервисной информацией после покупки.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
