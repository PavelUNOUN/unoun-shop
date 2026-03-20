import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Gift, ShieldCheck } from "lucide-react";
import CheckoutSuccessClearCart from "@/components/checkout/CheckoutSuccessClearCart";
import PageHero from "@/components/ui/page/PageHero";

export const metadata: Metadata = {
  title: "Заказ подтвержден | UNOUN",
  description:
    "UNOUN: заказ подтвержден, следующий шаг — оплата, личный кабинет и welcome-бонус после авторизации.",
};

type CheckoutSuccessPageProps = {
  searchParams: Promise<{
    orderNumber?: string;
    mode?: string;
  }>;
};

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const params = await searchParams;
  const orderNumber = params.orderNumber ?? "UNOUN-DEMO";
  const storageModeLabel =
    params.mode === "database" ? "MySQL / Prisma" : "mock-режим до подключения БД";

  return (
    <>
      <CheckoutSuccessClearCart />

      <PageHero
        eyebrow="Order Success"
        badge="Первый success-flow"
        title="Заказ подтвержден и передан в следующий этап обработки"
        description="Success-экран уже получает ответ от server-side checkout. После подключения боевой базы, оплаты и СДЭК сюда придут реальные статусы заказа, платежа и доставки."
        className="bg-zinc-50"
      />

      <section className="bg-zinc-50 pb-16 md:pb-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)] sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E5FF00] text-zinc-900">
              <CheckCircle2 size={28} />
            </div>

            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              Мы сохранили новый путь покупки и закрыли текущий этап
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
              Checkout уже отдает номер заказа с backend-слоя. Пока база данных не
              подключена в production, мы можем работать через безопасный mock-режим,
              не ломая пользовательский сценарий.
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
                  Режим хранения
                </p>
                <p className="mt-2 text-sm font-semibold text-zinc-900">
                  {storageModeLabel}
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
                Войти в аккаунт
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
                Следующий шаг
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Подключить реальные статусы заказа, оплату и связку success-экрана с
                backend-ответом.
              </p>
            </article>

            <article className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700">
                <Gift size={20} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-zinc-900">
                Welcome-бонус
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                После авторизации пользователь получит 500 бонусов и увидит их в
                checkout и в личном кабинете.
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
                Дальше именно кабинет станет местом для истории заказов, бонусов,
                сервисной информации и повторных покупок.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
