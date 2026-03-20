import Link from "next/link";
import { LogOut, Package, ShoppingBag } from "lucide-react";
import { SITE_NAME } from "@/lib/site";

type AdminShellProps = {
  currentPath: "/admin/orders" | "/admin/products";
  children: React.ReactNode;
};

const NAV_ITEMS = [
  {
    href: "/admin/orders" as const,
    label: "Заказы",
    icon: ShoppingBag,
  },
  {
    href: "/admin/products" as const,
    label: "Товары",
    icon: Package,
  },
];

export default function AdminShell({
  currentPath,
  children,
}: AdminShellProps) {
  return (
    <section className="bg-[#f6f4ef] pb-12 pt-8 md:pb-16 md:pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-black/5 bg-white p-5 shadow-[0_30px_80px_-50px_rgba(24,24,27,0.35)] md:p-7">
          <div className="flex flex-col gap-5 border-b border-zinc-100 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
                {SITE_NAME} Admin
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
                Операционный кабинет магазина
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">
                Здесь ты видишь новые заказы, меняешь статусы и дальше сможешь
                управлять товаром без захода в код.
              </p>
            </div>

            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-zinc-200 px-5 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
              >
                <LogOut size={16} />
                Выйти
              </button>
            </form>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === currentPath;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors duration-150 ${
                    isActive
                      ? "bg-zinc-950 text-white"
                      : "border border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
