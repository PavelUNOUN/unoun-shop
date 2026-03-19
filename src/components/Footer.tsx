import Link from "next/link";

const CUSTOMER_LINKS = [
  { label: "Доставка и оплата", href: "/delivery" },
  { label: "Гарантия и сервис", href: "/service" },
  { label: "Частые вопросы", href: "/faq" },
  { label: "Программа лояльности", href: "/loyalty" },
  { label: "UNOUN Academy", href: "/academy" },
  { label: "Личный кабинет", href: "/account" },
] as const;

const DOCUMENT_LINKS = [
  { label: "Политика конфиденциальности", href: "/privacy" },
  { label: "Персональные данные", href: "/personal-data" },
  { label: "Согласие на обработку данных", href: "/consent" },
  { label: "Публичная оферта", href: "/offer" },
  { label: "Инструкция PDF", href: "/manuals/instrukcia.pdf" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-white/8 pb-10 md:grid-cols-4 md:gap-8">
          <div className="md:col-span-1">
            <span className="font-heading text-2xl font-bold tracking-[0.24em] text-white">
              UNOUN
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              Премиальная паровая швабра для сценариев, где важны стерильность,
              визуальная лёгкость и уверенность в сервисе.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Покупателям
            </h3>
            <ul className="mt-4 space-y-3">
              {CUSTOMER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Документы
            </h3>
            <ul className="mt-4 space-y-3">
              {DOCUMENT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
                Оплата
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                Yandex Pay · Split · онлайн-оплата
              </p>
            </div>
          </div>

          <div>
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
                Личный кабинет
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">
                Кабинет, бонусы и сервис уже собраны в отдельный контур
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Теперь в проекте есть обзор кабинета, раздел бонусов, сервисный блок
                и структура под реальную авторизацию через Яндекс.
              </p>
              <Link
                href="/account"
                className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[#E5FF00] px-5 text-sm font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
              >
                Открыть кабинет
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-xs text-zinc-600 md:flex-row md:items-center md:justify-between">
          <p>© 2026 UNOUN. Все права защищены.</p>
          <p>СДЭК ПВЗ · Yandex Pay / Split · Программа лояльности · Сервисная поддержка</p>
        </div>
      </div>
    </footer>
  );
}
