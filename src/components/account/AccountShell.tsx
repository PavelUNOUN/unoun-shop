import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ACCOUNT_NAV_ITEMS } from "@/lib/account";
import { cn } from "@/lib/utils";

type AccountShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  currentPath: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
};

export default function AccountShell({
  eyebrow,
  title,
  description,
  currentPath,
  children,
  aside,
}: AccountShellProps) {
  return (
    <section className="bg-zinc-50 pb-16 pt-28 md:pb-20 md:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3.5 py-1.5">
            <span className="text-xs font-semibold text-zinc-600">
              UI-каркас кабинета до подключения backend
            </span>
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
            {description}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-5">
            <div className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                Разделы кабинета
              </p>

              <nav className="mt-4 space-y-2">
                {ACCOUNT_NAV_ITEMS.map((item) => {
                  const isActive = item.href === currentPath;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block rounded-[20px] border px-4 py-3 transition-colors duration-150",
                        isActive
                          ? "border-zinc-900 bg-zinc-950 text-white"
                          : "border-zinc-200 bg-zinc-50 text-zinc-800 hover:border-zinc-300 hover:bg-white"
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold">{item.label}</span>
                        <ChevronRight size={16} className="shrink-0" />
                      </div>
                      <p
                        className={cn(
                          "mt-1 text-xs leading-relaxed",
                          isActive ? "text-white/65" : "text-zinc-500"
                        )}
                      >
                        {item.description}
                      </p>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="rounded-[28px] border border-zinc-200 bg-zinc-950 p-5 text-white shadow-[0_24px_80px_-56px_rgba(24,24,27,0.45)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                Следующий backend-этап
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Сюда без переделки интерфейса подключатся OAuth через Яндекс, история
                заказов из базы, статусы СДЭК и реальный бонусный баланс.
              </p>
            </div>

            {aside}
          </aside>

          <div className="space-y-5">{children}</div>
        </div>
      </div>
    </section>
  );
}
