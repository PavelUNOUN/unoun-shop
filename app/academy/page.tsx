import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/page/PageHero";
import InfoCard from "@/components/ui/page/InfoCard";
import { ACADEMY_ARTICLES } from "@/lib/academy";

export const metadata: Metadata = {
  title: "UNOUN Academy",
  description:
    "UNOUN Academy: полезные статьи о выборе паровой швабры, сценариях уборки, уходе за техникой и сервисе.",
};

export default function AcademyPage() {
  return (
    <>
      <PageHero
        eyebrow="UNOUN Academy"
        badge="SEO-каркас статейного раздела"
        title="Полезные материалы, которые усиливают доверие до и после покупки"
        description="Это базовый каркас контент-раздела под будущую SEO-стратегию: статьи о выборе техники, сценариях применения, уходе за устройством и сервисной поддержке."
        className="bg-zinc-50"
      />

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {ACADEMY_ARTICLES.map((article) => (
            <InfoCard
              key={article.slug}
              eyebrow={`${article.category} · ${article.readTime}`}
              title={article.title}
              description={article.excerpt}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                  {article.publishedAt}
                </p>
                <Link
                  href={`/academy/${article.slug}`}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-black"
                >
                  Читать статью
                </Link>
              </div>
            </InfoCard>
          ))}
        </div>
      </section>
    </>
  );
}
