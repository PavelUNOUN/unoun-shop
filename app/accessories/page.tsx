import type { Metadata } from "next";
import AccessoryCard from "@/components/store/AccessoryCard";
import { ACCESSORY_PRODUCTS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Аксессуары UNOUN",
  description:
    "Набор тряпок и набор насадок для паровой швабры UNOUN. Первая компактная линейка аксессуаров, подготовленная к расширению.",
};

export default function AccessoriesPage() {
  return (
    <main className="bg-white pt-28 md:pt-36">
      <section className="border-b border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-600">
              Компактная линейка
            </div>
            <h1 className="mt-5 font-heading text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
              Аксессуары UNOUN
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-zinc-600 sm:text-base">
              Здесь собраны первые товары, которые логично дополняют покупку
              устройства: сменные тряпки для повседневного ухода и набор насадок для
              более глубоких сценариев очистки. Эта ветка сайта уже подготовлена к
              тому, чтобы позже спокойно расширяться новыми позициями.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {ACCESSORY_PRODUCTS.map((product) => (
            <AccessoryCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
