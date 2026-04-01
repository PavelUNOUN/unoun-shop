import Link from "next/link";
import {
  ArrowRight,
  Gift,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import { isYandexOAuthConfigured } from "@/server/account/yandex";

const INFO_CARDS = [
  {
    title: "Заказы и статусы",
    description:
      "После входа в аккаунте доступны история заказов, статусы оплаты и выбранные пункты выдачи.",
    icon: PackageCheck,
  },
  {
    title: "Бонусы и сохранённые данные",
    description:
      "В аккаунте сохраняются бонусы, контакты получателя и данные для следующих покупок.",
    icon: ShieldCheck,
  },
] as const;

const BENEFITS = [
  "Быстрый повторный заказ и сохраненные данные получателя",
  "Отслеживание бонусов и истории заказов",
  "Доступ к сервисной информации, инструкции и истории заказов",
] as const;

export default function AuthMethodsPanel() {
  const isConfigured = isYandexOAuthConfigured();

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-52px_rgba(24,24,27,0.35)] sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5">
          <LockKeyhole size={14} className="text-zinc-500" />
          <span className="text-xs font-semibold text-zinc-600">
            Основной способ входа
          </span>
        </div>

        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          Войти через Яндекс
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 sm:text-base">
          Это основной способ входа в кабинет UNOUN. После авторизации аккаунт
          связывается с вашими заказами, бонусным счётом и сохранёнными
          получателями.
        </p>

        <Link
          href="/api/auth/yandex"
          className="mt-8 flex h-14 w-full items-center justify-between rounded-[20px] bg-zinc-950 px-5 text-left text-white transition-colors duration-150 hover:bg-black"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FC3F1D] text-sm font-bold text-white">
              Я
            </span>
            <span className="text-base font-semibold">
              {isConfigured ? "Войти через Яндекс" : "Подключить вход через Яндекс"}
            </span>
          </span>
          <ArrowRight size={18} />
        </Link>

        <p className="mt-4 text-xs leading-relaxed text-zinc-400">
          {isConfigured
            ? "После входа через Яндекс аккаунт автоматически связывается с вашими заказами и бонусами."
            : "Вход через Яндекс станет доступен после настройки авторизации."}
        </p>

        <div className="mt-8 rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
            Что откроется после входа
          </p>

          <ul className="mt-4 space-y-3">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#E5FF00]" />
                <span className="text-sm leading-relaxed text-zinc-600">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {INFO_CARDS.map((method) => {
          const Icon = method.icon;

          return (
            <div
              key={method.title}
              className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700">
                <Icon size={20} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-zinc-900">
                {method.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {method.description}
              </p>
            </div>
          );
        })}

        <div className="rounded-[28px] border border-zinc-200 bg-zinc-950 p-6 text-white shadow-[0_24px_80px_-56px_rgba(24,24,27,0.45)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
            После входа
          </p>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight">
            Бонусы и личный кабинет
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-white/65">
            После входа вы получаете доступ к истории заказов, приветственному
            бонусу и сохранённым данным для повторной покупки.
          </p>

          <div className="mt-6 rounded-[22px] border border-white/10 bg-white/5 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                <Gift size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  500 бонусов после входа
                </p>
                <p className="mt-1 text-sm leading-relaxed text-white/65">
                  Бонусы закрепляются за аккаунтом и доступны при следующих покупках.
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/account/auth"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-100"
          >
            Открыть вход через Яндекс
          </Link>
        </div>
      </div>
    </div>
  );
}
