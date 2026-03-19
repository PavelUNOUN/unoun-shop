import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/page/PageHero";
import InfoCard from "@/components/ui/page/InfoCard";
import {
  ACADEMY_ARTICLES,
  getAcademyArticleBySlug,
} from "@/lib/academy";

type AcademyArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return ACADEMY_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: AcademyArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getAcademyArticleBySlug(slug);

  if (!article) {
    return {
      title: "Статья не найдена | UNOUN Academy",
    };
  }

  return {
    title: `${article.title} | UNOUN Academy`,
    description: article.seoDescription,
  };
}

export default async function AcademyArticlePage({
  params,
}: AcademyArticlePageProps) {
  const { slug } = await params;
  const article = getAcademyArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = ACADEMY_ARTICLES.filter(
    (item) => item.slug !== article.slug
  ).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={article.category}
        badge={`${article.readTime} · ${article.publishedAt}`}
        title={article.title}
        description={article.heroDescription}
        className="bg-zinc-50"
      />

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
          <div className="space-y-5">
            {article.sections.map((section) => (
              <InfoCard
                key={section.heading}
                title={section.heading}
                description={section.content}
              />
            ))}

            <InfoCard
              eyebrow="Итог"
              title="Короткий вывод"
              description={article.takeaway}
            >
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </InfoCard>
          </div>

          <aside className="space-y-5">
            <InfoCard
              eyebrow="UNOUN Academy"
              title="Следующие материалы"
              description="Такой сайдбар помогает удерживать пользователя в контент-контуре и работает на SEO-глубину просмотра."
            >
              <div className="space-y-3">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.slug}
                    href={`/academy/${relatedArticle.slug}`}
                    className="block rounded-[20px] border border-zinc-200 bg-zinc-50 p-4 transition-colors duration-150 hover:bg-white"
                  >
                    <p className="text-sm font-semibold text-zinc-900">
                      {relatedArticle.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                      {relatedArticle.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </InfoCard>
          </aside>
        </div>
      </section>
    </>
  );
}
