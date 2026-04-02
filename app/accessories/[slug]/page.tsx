import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/ui/AddToCartButton";
import {
  ACCESSORY_PRODUCTS,
  FLAGSHIP_PRODUCT,
  formatPrice,
  getAccessoryProductBySlug,
  getRelatedAccessoryProducts,
} from "@/lib/catalog";

type AccessoryDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return ACCESSORY_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: AccessoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getAccessoryProductBySlug(slug);

  if (!product) {
    return {
      title: "Аксессуар не найден | UNOUN",
    };
  }

  return {
    title: `${product.shortTitle} | Аксессуары UNOUN`,
    description: product.summary,
    alternates: {
      canonical: `/accessories/${product.slug}`,
    },
  };
}

export default async function AccessoryDetailPage({
  params,
}: AccessoryDetailPageProps) {
  const { slug } = await params;
  const product = getAccessoryProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedAccessoryProducts(product.slug);

  return (
    <main className="bg-white pt-28 md:pt-36">
      <section className="border-b border-zinc-100 bg-zinc-50 pb-14 md:pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-8">
          <div className="overflow-hidden rounded-[36px] border border-zinc-200 bg-white p-5 shadow-[0_30px_100px_-60px_rgba(24,24,27,0.32)] sm:p-8">
            <div className="relative flex min-h-[380px] items-center justify-center rounded-[28px] bg-zinc-50 p-6 sm:min-h-[460px] sm:p-8">
              <Image
                src={product.image}
                alt={product.title}
                width={560}
                height={560}
                className="max-h-[360px] w-auto object-contain sm:max-h-[440px]"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-600">
              Аксессуары UNOUN
            </div>
            <h1 className="mt-5 font-heading text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              {product.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
              {product.summary}
            </p>

            <div className="mt-7">
              <p className="text-4xl font-semibold tracking-tight text-zinc-900">
                {formatPrice(product.price)} ₽
              </p>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {product.highlights?.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-[22px] border border-zinc-200 bg-white p-4 text-sm leading-relaxed text-zinc-700"
                >
                  {highlight}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AddToCartButton
                label="Добавить в корзину"
                redirectTo="/cart"
                product={product}
                className="inline-flex h-14 items-center justify-center rounded-full bg-[#E5FF00] px-8 text-base font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
              />
              <AddToCartButton
                label="Купить в 1 клик"
                redirectTo="/checkout"
                product={product}
                className="inline-flex h-14 items-center justify-center rounded-full border border-zinc-200 bg-white px-8 text-base font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-100"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Дополнить покупку
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Что ещё можно добавить к заказу
            </h2>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Link
              href="/"
              className="rounded-[32px] border border-zinc-200 bg-zinc-50 p-6 transition-colors duration-150 hover:bg-white"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Устройство
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900">
                {FLAGSHIP_PRODUCT.shortTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                Основное устройство UNOUN для ежедневной уборки дома и быстрой
                покупки вместе с аксессуарами.
              </p>
              <p className="mt-5 text-xl font-semibold text-zinc-900">
                {formatPrice(FLAGSHIP_PRODUCT.price)} ₽
              </p>
            </Link>

            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                href={`/accessories/${related.slug}`}
                className="rounded-[32px] border border-zinc-200 bg-zinc-50 p-6 transition-colors duration-150 hover:bg-white"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Аксессуар
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900">
                  {related.shortTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {related.summary}
                </p>
                <p className="mt-5 text-xl font-semibold text-zinc-900">
                  {formatPrice(related.price)} ₽
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
