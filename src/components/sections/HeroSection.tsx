"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import AddToCartButton from "@/components/ui/AddToCartButton";
import { useFlagshipProduct } from "@/hooks/useFlagshipProduct";
import { formatPrice } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";

const GALLERY_IMAGES = [
  "/images/card-1.png",
  "/images/card-2.png",
  "/images/card-3.jpg",
  "/images/card-4.jpg",
];

const NAV_TABS = [
  { label: "Описание", href: "#description" },
  { label: "Способы применения", href: "#use-cases" },
  { label: "Характеристики", href: "#features" },
  { label: "Аксессуары", href: "#nozzles" },
  { label: "Инструкция", href: "#instruction" },
];

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const product = useFlagshipProduct();

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Синхронизируем активную точку с текущим слайдом
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-0 md:pt-16">

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">

          {/* ── ЛЕВАЯ КОЛОНКА: ГАЛЕРЕЯ ── */}
          <div className="relative w-full">

            {/* Embla viewport — свайп работает здесь */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {GALLERY_IMAGES.map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] w-full shrink-0 md:aspect-square"
                  >
                    <Image
                      src={src}
                      alt={`Паровая швабра UNOUN — фото ${i + 1}`}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain select-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Стрелка влево */}
            <button
              onClick={scrollPrev}
              aria-label="Предыдущее фото"
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-md"
            >
              <ChevronLeft size={18} strokeWidth={1.75} className="text-zinc-700" />
            </button>

            {/* Стрелка вправо */}
            <button
              onClick={scrollNext}
              aria-label="Следующее фото"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-md"
            >
              <ChevronRight size={18} strokeWidth={1.75} className="text-zinc-700" />
            </button>

            {/* Точки-индикаторы */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {GALLERY_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Фото ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-200",
                    activeIndex === i
                      ? "w-4 bg-zinc-900"
                      : "w-1.5 bg-zinc-300 hover:bg-zinc-500"
                  )}
                />
              ))}
            </div>
          </div>

          {/* ── ПРАВАЯ КОЛОНКА: КОНТЕНТ ── */}
          <div className="flex flex-col gap-5">

            {/* Shiny-бейдж */}
            <div className="flex items-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5">
                <Sparkles size={13} strokeWidth={2} className="text-zinc-500" />
                <AnimatedShinyText
                  shimmerWidth={120}
                  className="text-xs font-semibold text-zinc-600"
                >
                  Паровая система нового поколения
                </AnimatedShinyText>
              </div>
            </div>

            {/* Заголовок */}
            <h1 className="font-heading font-bold text-zinc-900 text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Паровая швабра UNOUN.
            </h1>

            {/* Подзаголовок */}
            <p className="text-xl font-medium text-zinc-700 sm:text-2xl">
              Идеальная чистота без усилий.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700">
                Яндекс Pay уже в checkout
              </span>
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700">
                Можно оплатить в Split
              </span>
              <span className="rounded-full border border-[#E5FF00] bg-[#F7FFB8] px-3 py-1 text-xs font-semibold text-zinc-900">
                +500 бонусов за вход через Яндекс
              </span>
            </div>

            {/* Цена */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-zinc-900">
                {formatPrice(product.price)} ₽
              </span>
              <span className="text-lg text-zinc-400 line-through">
                {formatPrice(product.originalPrice)} ₽
              </span>
              <span className="rounded-full bg-[#E5FF00] px-2.5 py-0.5 text-xs font-semibold text-zinc-900">
                {product.originalPrice > product.price
                  ? `−${Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}%`
                  : "Цена online"}
              </span>
            </div>

            {!product.isActive || product.stock <= 0 ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
                Сейчас товар временно недоступен для заказа.
              </div>
            ) : (
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
                В наличии: <span className="font-semibold text-zinc-900">{product.stock} шт.</span>
              </div>
            )}

            {/* Кнопки покупки */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <AddToCartButton
                label="В корзину"
                redirectTo="/cart"
                className="flex h-14 flex-1 items-center justify-center rounded-full bg-[#E5FF00] px-6 text-base font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
              />
              <AddToCartButton
                label="Купить в 1 клик"
                redirectTo="/checkout"
                className="flex h-14 flex-1 items-center justify-center rounded-full border border-zinc-200 bg-white px-6 text-base font-semibold text-zinc-900 transition-all duration-150 hover:border-zinc-900 hover:bg-zinc-50 active:scale-[0.98]"
              />
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <p className="text-sm font-medium text-zinc-800">
                Оплата уже доступна через Яндекс Pay, а Split можно выбрать прямо в оформлении.
              </p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                После входа через Яндекс checkout подставит данные аккаунта и позволит использовать приветственные бонусы без повторного заполнения формы.
              </p>
            </div>

          </div>
        </div>

        {/* ── НАВИГАЦИОННЫЕ ТАБЫ ── */}
        <div className="mt-10 flex justify-center gap-1 overflow-x-auto border-b border-zinc-100">
          {NAV_TABS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="shrink-0 border-b-2 border-transparent px-4 pb-3 pt-1 text-sm font-medium text-zinc-400 transition-all duration-200 hover:border-zinc-300 hover:text-zinc-700"
            >
              {label}
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
