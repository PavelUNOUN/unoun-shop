import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ACADEMY_ARTICLES } from "@/lib/academy";

const PRIORITY_ARTICLE_SLUGS = [
  "parovaya-shvabra-dlya-kuhni",
  "parovaya-shvabra-dlya-vannoy",
  "parovaya-shvabra-dlya-pola",
  "parovaya-shvabra-dlya-tekstilya",
] as const;

export const metadata: Metadata = {
  title: "Статьи о паровой швабре",
  description:
    "Полезные статьи о паровой швабре для кухни, ванной, пола и текстиля, а также материалы о выборе устройства и уходе за техникой.",
};

export default function AcademyPage() {
  const sortedArticles = [...ACADEMY_ARTICLES].sort((left, right) => {
    const leftPriority = PRIORITY_ARTICLE_SLUGS.indexOf(
      left.slug as (typeof PRIORITY_ARTICLE_SLUGS)[number]
    );
    const rightPriority = PRIORITY_ARTICLE_SLUGS.indexOf(
      right.slug as (typeof PRIORITY_ARTICLE_SLUGS)[number]
    );

    if (leftPriority === -1 && rightPriority === -1) {
      return 0;
    }

    if (leftPriority === -1) {
      return 1;
    }

    if (rightPriority === -1) {
      return -1;
    }

    return leftPriority - rightPriority;
  });

  return (
    <>
      <section className="border-b border-zinc-100 bg-zinc-50 pt-28 md:pt-36">
        <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Статьи
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
              Где паровая швабра особенно полезна дома
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-600 sm:text-base">
              В разделе собраны статьи про кухню, ванную, пол и текстиль, а
              также практические материалы о выборе устройства, сценариях
              применения и уходе за техникой.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {sortedArticles.map((article) => (
            <article
              key={article.slug}
              className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_24px_80px_-52px_rgba(24,24,27,0.35)]"
            >
              <div className="relative aspect-[16/10] bg-[linear-gradient(180deg,#fafaf9_0%,#f1f5f9_100%)]">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-contain p-4 sm:p-5"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                  {article.category} · {article.readTime}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900">
                  {article.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
                  {article.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between gap-4">
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
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
