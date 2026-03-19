import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gift, ShieldCheck, Star } from "lucide-react";
import PageHero from "@/components/ui/page/PageHero";
import InfoCard from "@/components/ui/page/InfoCard";

export const metadata: Metadata = {
  title: "Программа лояльности | UNOUN",
  description:
    "Программа лояльности UNOUN: уровни, преимущества, кэшбек и сценарий будущего запуска вместе с личным кабинетом.",
};

const LOYALTY_LEVELS = [
  {
    name: "Дорогой гость",
    threshold: "от 0 ₽",
    cashback: "1%",
    bonus: "Базовый доступ к клубу и персональным предложениям",
  },
  {
    name: "Новый друг",
    threshold: "от 15 000 ₽",
    cashback: "3%",
    bonus: "Повышенный кэшбек и ранний доступ к новым предложениям",
  },
  {
    name: "Лучший друг",
    threshold: "от 25 000 ₽",
    cashback: "5%",
    bonus: "Персональные бонусы и приоритетные акции для повторных покупок",
  },
  {
    name: "Близкий круг",
    threshold: "от 45 000 ₽",
    cashback: "7%",
    bonus: "Расширенные преимущества и специальные предложения на аксессуары",
  },
  {
    name: "Семья",
    threshold: "от 100 000 ₽",
    cashback: "10%",
    bonus: "Максимальный статус клуба, персональные подборки и особые офферы",
  },
] as const;

const BENEFITS = [
  {
    title: "Накопительная система",
    description:
      "Пользователь видит, что следующий заказ делает отношения с брендом еще выгоднее, а не начинается каждый раз с нуля.",
    icon: Star,
  },
  {
    title: "Привязка к аккаунту",
    description:
      "После запуска авторизации клуб будет работать через личный кабинет и хранить бонусный статус вместе с историей заказов.",
    icon: ShieldCheck,
  },
  {
    title: "Подарки и спецусловия",
    description:
      "Программа лояльности дает хороший маркетинговый повод возвращать клиента не только скидкой, но и ощущением особого статуса.",
    icon: Gift,
  },
] as const;

const HOW_IT_WORKS = [
  "Клиент оформляет заказ и получает стартовый уровень клуба.",
  "Сумма покупок влияет на рост статуса и размер кэшбека.",
  "Следующие уровни открывают дополнительные предложения и персональные бонусы.",
  "Личный кабинет показывает текущий уровень и накопленный баланс после запуска авторизации.",
] as const;

export default function LoyaltyPage() {
  return (
    <>
      <PageHero
        eyebrow="Клуб лояльности"
        badge="Страница-усилитель доверия и повторных продаж"
        title="Программа лояльности, которую видят уже на главной"
        description="По примеру Luxhomme логика loyalty вынесена в отдельную страницу и поддержана блоком на лендинге. Для UNOUN это работает как мягкий premium-маркер: бренд не только продает устройство, но и строит долгие отношения с клиентом."
      />

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 xl:grid-cols-3 lg:px-8">
          {BENEFITS.map((item) => {
            const Icon = item.icon;

            return (
              <InfoCard
                key={item.title}
                title={item.title}
                description={item.description}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700">
                  <Icon size={20} />
                </div>
              </InfoCard>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Уровни программы
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Статусы клуба по мотивам структуры Luxhomme
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {LOYALTY_LEVELS.map((level, index) => (
              <div
                key={level.name}
                className="rounded-[28px] border border-zinc-200 bg-zinc-50 p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
                  Уровень {index + 1}
                </p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-zinc-900">
                  {level.name}
                </h3>
                <p className="mt-2 text-sm text-zinc-500">{level.threshold}</p>

                <div className="mt-5 inline-flex rounded-full bg-[#E5FF00] px-3 py-1 text-xs font-semibold text-zinc-900">
                  Кэшбек {level.cashback}
                </div>

                <p className="mt-5 text-sm leading-relaxed text-zinc-600">
                  {level.bonus}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[32px] border border-zinc-200 bg-zinc-950 p-6 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
                Как это будет работать
              </p>
              <div className="mt-8 space-y-4">
                {HOW_IT_WORKS.map((step, index) => (
                  <div
                    key={step}
                    className="rounded-[24px] border border-white/10 bg-white/5 p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/40">
                      Этап {index + 1}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <InfoCard
                eyebrow="Почему это важно"
                title="Loyalty-блок должен жить и на главной, и на отдельной странице"
                description="На главной он работает как быстрый trust-сигнал, а отдельная страница позволяет раскрыть уровни, механику и будущий личный кабинет без перегруза лендинга."
              />

              <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)] sm:p-8">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                  Следующий шаг
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
                  Чтобы программа заработала по-настоящему, следующим этапом нужно
                  подключить вход через Яндекс, а затем добавить бонусный баланс,
                  статусы и историю заказов в личный кабинет.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/account/auth"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#E5FF00] px-6 text-sm font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
                  >
                    Войти в аккаунт
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 px-6 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
                  >
                    Вернуться на главную
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
