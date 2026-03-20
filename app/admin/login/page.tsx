import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; reason?: string }>;
}) {
  const params = await searchParams;
  const error = params.error === "invalid";
  const notConfigured = params.reason === "not-configured";

  return (
    <section className="bg-[#f6f4ef] pb-12 pt-10 md:pb-16 md:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-[32px] border border-black/5 bg-white p-7 shadow-[0_30px_80px_-50px_rgba(24,24,27,0.35)] md:p-9">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5">
            <LockKeyhole size={14} className="text-zinc-500" />
            <span className="text-xs font-semibold text-zinc-600">
              Закрытая зона магазина
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-zinc-950">
            Вход в админку UNOUN
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            Здесь будут заказы, статусы и управление товаром. На первом этапе
            вход защищён простым логином и паролем.
          </p>

          {error ? (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Логин или пароль не подошли.
            </div>
          ) : null}

          {notConfigured ? (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Для входа в админку нужно сначала заполнить `ADMIN_LOGIN` и
              `ADMIN_PASSWORD` в серверном `.env`.
            </div>
          ) : null}

          <form action="/api/admin/login" method="POST" className="mt-7 space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700">Логин</label>
              <input
                name="login"
                type="text"
                autoComplete="username"
                className="h-12 rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-900 outline-none transition-colors duration-150 focus:border-zinc-900 focus:bg-white"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700">Пароль</label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                className="h-12 rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-900 outline-none transition-colors duration-150 focus:border-zinc-900 focus:bg-white"
                required
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-black"
            >
              Войти в админку
            </button>
          </form>

          <Link
            href="/"
            className="mt-5 inline-flex text-sm font-medium text-zinc-500 transition-colors duration-150 hover:text-zinc-900"
          >
            Вернуться на сайт
          </Link>
        </div>
      </div>
    </section>
  );
}
