import Link from "next/link";
import { SELLER_DETAILS } from "@/lib/legal";

const CUSTOMER_LINKS = [
  { label: "Доставка и оплата", href: "/delivery" },
  { label: "Гарантия и сервис", href: "/service" },
  { label: "Частые вопросы", href: "/faq" },
  { label: "Статьи", href: "/academy" },
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

            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
                Продавец
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-200">
                {SELLER_DETAILS.sellerName}
              </p>

              <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-400">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Реквизиты
                  </p>
                  <p className="mt-1">
                    ИНН {SELLER_DETAILS.inn}
                    <br />
                    ОГРНИП {SELLER_DETAILS.ogrnip}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Адрес
                  </p>
                  <p className="mt-1">{SELLER_DETAILS.businessAddress}</p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Контакты
                  </p>
                  <p className="mt-1 text-zinc-300">{SELLER_DETAILS.supportPhone}</p>
                  <p className="mt-1 text-zinc-300">{SELLER_DETAILS.supportEmail}</p>
                  <p className="mt-1">{SELLER_DETAILS.supportHours}</p>
                </div>
              </div>
            </div>
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
                Аккаунт
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">
                В аккаунте собраны заказы, бонусы и получатели
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Войдите через Яндекс, чтобы быстрее оформлять новые покупки,
                видеть историю заказов и использовать бонусы.
              </p>
              <Link
                href="/account"
                className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[#E5FF00] px-5 text-sm font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
              >
                Открыть аккаунт
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-xs text-zinc-600 md:flex-row md:items-center md:justify-between">
          <p>© 2026 UNOUN. Все права защищены.</p>
          <p>Публичная оферта · Политика конфиденциальности · Персональные данные · Сервисная поддержка</p>
        </div>
      </div>
    </footer>
  );
}
