import Link from "next/link";
import AccessoryCard from "@/components/store/AccessoryCard";
import { ACCESSORY_PRODUCTS } from "@/lib/catalog";

export default function AccessoriesPreviewSection() {
  return (
    <section className="w-full bg-zinc-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-600">
            Аксессуары UNOUN
          </div>
          <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
            Дополните основную покупку расходниками и насадками
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
            Мы не раздуваем сайт до большого каталога. Вместо этого добавляем первую
            компактную линейку аксессуаров, которую потом будет легко расширять
            новыми позициями и синхронизировать с Ozon.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {ACCESSORY_PRODUCTS.map((product) => (
            <AccessoryCard key={product.id} product={product} compact />
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/accessories"
            className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-100"
          >
            Открыть все аксессуары
          </Link>
        </div>
      </div>
    </section>
  );
}
