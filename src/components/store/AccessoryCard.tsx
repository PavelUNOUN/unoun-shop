import Image from "next/image";
import AddToCartButton from "@/components/ui/AddToCartButton";
import { formatPrice, type StorefrontProduct } from "@/lib/catalog";

type AccessoryCardProps = {
  product: StorefrontProduct;
  compact?: boolean;
};

export default function AccessoryCard({
  product,
  compact = false,
}: AccessoryCardProps) {
  return (
    <article className="overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-[0_24px_80px_-56px_rgba(24,24,27,0.28)]">
      <div className="relative flex min-h-[250px] items-center justify-center bg-zinc-50 p-4 sm:min-h-[320px] sm:p-6">
        <Image
          src={product.image}
          alt={product.title}
          width={440}
          height={440}
          className="max-h-[260px] w-auto object-contain sm:max-h-[320px]"
        />
      </div>

      <div className="p-5 sm:p-6">
        <div className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Аксессуары
        </div>

        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900">
          {product.shortTitle}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
          {product.summary}
        </p>

        <div className="mt-5 flex items-end gap-3">
          <p className="text-3xl font-semibold tracking-tight text-zinc-900">
            {formatPrice(product.price)} ₽
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {product.highlights?.slice(0, compact ? 2 : 3).map((highlight) => (
            <span
              key={highlight}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600"
            >
              {highlight}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <AddToCartButton
            label="Добавить в корзину"
            redirectTo="/cart"
            product={product}
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#E5FF00] px-6 text-sm font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
          />

          <AddToCartButton
            label="Купить в 1 клик"
            redirectTo="/checkout"
            product={product}
            className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50"
          />
        </div>
      </div>
    </article>
  );
}
