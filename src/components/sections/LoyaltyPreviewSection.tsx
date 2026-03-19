import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const LOYALTY_LEVELS = [
  { name: "Гость", threshold: "от 0 ₽", cashback: "1%" },
  { name: "Друг бренда", threshold: "от 15 000 ₽", cashback: "3%" },
  { name: "Близкий круг", threshold: "от 45 000 ₽", cashback: "7%" },
] as const;

export default function LoyaltyPreviewSection() {
  return (
    <section className="w-full bg-zinc-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[36px] border border-zinc-200 bg-white shadow-[0_30px_100px_-60px_rgba(24,24,27,0.4)]">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="border-b border-zinc-100 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5">
                <Sparkles size={14} className="text-zinc-500" />
                <span className="text-xs font-semibold text-zinc-600">
                  Программа лояльности
                </span>
              </div>

              <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Клуб UNOUN для тех, кто выбирает комфорт регулярно
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
                Отдельный блок лояльности усиливает доверие еще до покупки: клиент
                видит, что бренд думает не только о первом заказе, но и о долгих
                отношениях, сервисе и выгоде для постоянных покупателей.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/loyalty"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#E5FF00] px-6 text-sm font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
                >
                  Узнать подробнее
                </Link>

                <Link
                  href="/account/auth"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 px-6 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
                >
                  Войти в клуб
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="bg-zinc-950 p-6 text-white sm:p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
                Уровни
              </p>

              <div className="mt-6 space-y-4">
                {LOYALTY_LEVELS.map((level) => (
                  <div
                    key={level.name}
                    className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {level.name}
                        </h3>
                        <p className="mt-1 text-sm text-white/55">{level.threshold}</p>
                      </div>

                      <span className="rounded-full bg-[#E5FF00] px-3 py-1 text-xs font-semibold text-zinc-900">
                        Кэшбек {level.cashback}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm leading-relaxed text-white/60">
                Полные правила начисления бонусов откроем вместе с запуском
                личного кабинета, но сам сценарий уже можно встроить в маркетинг и
                навигацию сайта.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
