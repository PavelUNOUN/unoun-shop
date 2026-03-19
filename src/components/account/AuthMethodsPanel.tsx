import Link from "next/link";
import { ArrowRight, LockKeyhole, Phone, ShieldCheck } from "lucide-react";

const SECONDARY_METHODS = [
  {
    title: "Вход по номеру телефона",
    description:
      "Подготовим как альтернативный сценарий для клиентов, которым удобнее SMS-подтверждение.",
    icon: Phone,
  },
  {
    title: "VK ID",
    description:
      "Добавим как дополнительный способ входа после подключения основной авторизации.",
    icon: ShieldCheck,
  },
] as const;

const BENEFITS = [
  "Быстрый повторный заказ и сохраненные данные получателя",
  "Отслеживание бонусов и статуса программы лояльности",
  "Доступ к сервисной информации, инструкции и истории заказов",
] as const;

export default function AuthMethodsPanel() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-52px_rgba(24,24,27,0.35)] sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5">
          <LockKeyhole size={14} className="text-zinc-500" />
          <span className="text-xs font-semibold text-zinc-600">
            Основной сценарий входа
          </span>
        </div>

        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          Войти через Яндекс
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 sm:text-base">
          Это основной способ входа, который будем подключать следующим этапом.
          Сейчас страница уже готовит UX и визуальную точку входа для будущего
          кабинета пользователя.
        </p>

        <button
          type="button"
          className="mt-8 flex h-14 w-full items-center justify-between rounded-[20px] bg-zinc-950 px-5 text-left text-white transition-colors duration-150 hover:bg-black"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FC3F1D] text-sm font-bold text-white">
              Я
            </span>
            <span className="text-base font-semibold">Войти через Яндекс</span>
          </span>
          <ArrowRight size={18} />
        </button>

        <p className="mt-4 text-xs leading-relaxed text-zinc-400">
          Кнопка пока работает как UI-элемент без реального OAuth-подключения.
          После следующего этапа она будет вести в полноценный flow авторизации.
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
        {SECONDARY_METHODS.map((method) => {
          const Icon = method.icon;

          return (
            <div
              key={method.title}
              className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700">
                  <Icon size={20} />
                </div>
                <span className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-500">
                  Скоро
                </span>
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
            Лояльность и аккаунт
          </p>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight">
            Клуб UNOUN запустим вместе с кабинетом
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-white/65">
            До подключения реальной авторизации можно уже подготовить страницу
            входа, блок лояльности на главной и структуру маршрутов, чтобы
            следующий этап прошел без переделки интерфейса.
          </p>

          <Link
            href="/loyalty"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-100"
          >
            Посмотреть программу
          </Link>
        </div>
      </div>
    </div>
  );
}
