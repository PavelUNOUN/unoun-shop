import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import InfoCard from "@/components/ui/page/InfoCard";
import {
  ACADEMY_ARTICLES,
  getAcademyArticleBySlug,
} from "@/lib/academy";
import { getSiteUrl } from "@/lib/site";

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
    keywords: article.tags,
    alternates: {
      canonical: `/academy/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.seoDescription,
      url: `/academy/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAtIso,
      images: [
        {
          url: article.image,
          alt: article.imageAlt,
        },
      ],
    },
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
  const siteUrl = getSiteUrl();
  const articleUrl = `${siteUrl}/academy/${article.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription,
    image: [`${siteUrl}${article.image}`],
    datePublished: article.publishedAtIso,
    dateModified: article.publishedAtIso,
    mainEntityOfPage: articleUrl,
    keywords: article.tags.join(", "),
    author: {
      "@type": "Organization",
      name: "UNOUN",
    },
    publisher: {
      "@type": "Organization",
      name: "UNOUN",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <section className="border-b border-zinc-100 bg-zinc-50 pt-28 md:pt-36">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 sm:px-6 md:pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(420px,560px)] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-zinc-200 bg-white px-3.5 py-1.5">
              <span className="text-xs font-semibold text-zinc-600">
                {article.readTime} · {article.publishedAt}
              </span>
            </div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
              {article.category}
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
              {article.heroDescription}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <article className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_24px_80px_-52px_rgba(24,24,27,0.35)]">
            <div className="relative aspect-[16/10] bg-[linear-gradient(180deg,#fafaf9_0%,#eef2f7_100%)]">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-contain p-4 sm:p-6"
              />
            </div>
          </article>
        </div>
      </section>

      <section className="bg-zinc-50 py-10 md:py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
          <div className="space-y-5">
            <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-52px_rgba(24,24,27,0.35)] sm:p-8">
              <p className="text-lg leading-relaxed text-zinc-700 sm:text-xl">
                {article.excerpt}
              </p>
            </div>

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
              title="Следующие статьи"
              description="Похожие материалы по сценариям применения и уходу за устройством."
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
