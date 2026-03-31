import type { Metadata } from "next";
import PageHero from "@/components/ui/page/PageHero";
import { FAQ_ITEMS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ | UNOUN",
  description:
    "Частые вопросы о паровой швабре UNOUN: поверхности, вода, гарантия, доставка и уход.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        badge="Ответы на частые вопросы"
        title="Частые вопросы перед покупкой и после получения"
        description="Здесь собраны ответы на вопросы о поверхностях, уходе, комплекте, доставке, оплате и гарантии."
        className="bg-zinc-50"
      />

      <section className="bg-zinc-50 pb-16 md:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <article
                key={item.question}
                className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)] sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
                  Вопрос {index + 1}
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
                  {item.question}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
