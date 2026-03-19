import type { Metadata } from "next";
import PageHero from "@/components/ui/page/PageHero";
import AuthMethodsPanel from "@/components/account/AuthMethodsPanel";

export const metadata: Metadata = {
  title: "Авторизация | UNOUN",
  description:
    "Страница авторизации UNOUN с главным сценарием входа через Яндекс и подготовкой альтернатив под телефон и VK ID.",
};

export default function AccountAuthPage() {
  return (
    <>
      <PageHero
        eyebrow="Авторизация"
        badge="UI-этап перед подключением OAuth"
        title="Точка входа в будущий личный кабинет UNOUN"
        description="По вашему сценарию основным способом входа станет Яндекс. На этом этапе мы подготавливаем UX-страницу, визуальную иерархию методов входа и связку с программой лояльности, не подключая пока реальную backend-авторизацию."
        className="bg-zinc-50"
      />

      <section className="bg-zinc-50 pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AuthMethodsPanel />
        </div>
      </section>
    </>
  );
}
