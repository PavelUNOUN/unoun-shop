"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sparkles, ChevronLeft, ChevronRight, ChevronRightIcon } from "lucide-react";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import AddToCartButton from "@/components/ui/AddToCartButton";
import { useFlagshipProduct } from "@/hooks/useFlagshipProduct";
import { formatPrice } from "@/lib/catalog";
import { reachMetrikaGoal } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
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
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const product = useFlagshipProduct();
  const addItem = useCartStore((state) => state.addItem);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const splitPlan = useMemo(() => {
    const installments = 4;
    const base = Math.floor(product.price / installments);
    const remainder = product.price % installments;
    const today = new Date();

    return Array.from({ length: installments }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index * 14);

      return {
        label:
          index === 0
            ? "сегодня"
            : new Intl.DateTimeFormat("ru-RU", {
                day: "numeric",
                month: "short",
              }).format(date),
        amount: base + (index < remainder ? 1 : 0),
      };
    });
  }, [product.price]);

  const handleQuickCheckout = (payment: "full_online" | "split") => {
    if (!product.isActive || product.stock <= 0) {
      return;
    }

    addItem(product);
    reachMetrikaGoal("hero_quick_checkout", {
      payment_method: payment,
      price: product.price,
      product: product.slug,
    });
    router.push(`/checkout?payment=${payment}`);
  };

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

            {/* Цена */}
            <div className="grid gap-3 sm:grid-cols-[220px_minmax(0,1fr)]">
              <div className="rounded-[28px] bg-[#F1EEEA] px-6 py-5">
                <p className="text-base text-zinc-400 line-through">
                  {formatPrice(product.originalPrice)} ₽
                </p>
                <p className="mt-2 text-5xl font-semibold tracking-tight text-zinc-800">
                  {formatPrice(product.price)} ₽
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <AddToCartButton
                  label="В корзину"
                  redirectTo="/cart"
                  className="flex h-16 items-center justify-center rounded-full bg-[#8FB3F3] px-6 text-2xl font-medium text-white transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
                />
                <button
                  type="button"
                  onClick={() => handleQuickCheckout("full_online")}
                  disabled={!product.isActive || product.stock <= 0}
                  className="flex h-16 items-center justify-center rounded-full border-2 border-[#8FB3F3] bg-white px-6 text-2xl font-medium text-[#8FB3F3] transition-all duration-150 hover:bg-[#F4F8FF] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Купить в 1 клик
                </button>
              </div>
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

            <div className="grid gap-4 rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.18)]">
              <button
                type="button"
                onClick={() => handleQuickCheckout("full_online")}
                disabled={!product.isActive || product.stock <= 0}
                className="flex items-center justify-between gap-4 rounded-[24px] border border-zinc-200 bg-zinc-50 px-5 py-4 text-left transition-colors duration-150 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#FF5D8F_0%,#8B49FF_100%)] text-lg font-bold text-white">
                    +
                  </div>
                  <div>
                    <p className="text-sm text-zinc-700">
                      Яндекс Пэй — оплата с кешбэком
                    </p>
                    <p className="text-xl font-semibold text-zinc-900">
                      Быстрый переход к оплате
                    </p>
                  </div>
                </div>
                <ChevronRightIcon className="shrink-0 text-zinc-400" size={22} />
              </button>

              <button
                type="button"
                onClick={() => handleQuickCheckout("split")}
                disabled={!product.isActive || product.stock <= 0}
                className="rounded-[24px] border border-zinc-200 bg-zinc-50 px-5 py-5 text-left transition-colors duration-150 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#88F59A_0%,#3FDB66_48%,#2FC06D_100%)] text-lg font-bold text-white">
                      ◔
                    </div>
                    <div>
                      <p className="text-sm text-zinc-700">
                        Яндекс Сплит — оплата частями
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <p className="text-3xl font-semibold tracking-tight text-zinc-900">
                          {formatPrice(splitPlan[0]?.amount ?? 0)} ₽ × 4
                        </p>
                        <span className="rounded-full bg-[#55D67A] px-3 py-1 text-sm font-semibold text-white">
                          без переплат
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRightIcon className="shrink-0 text-zinc-400" size={22} />
                </div>

                <div className="mt-5">
                  <div className="grid grid-cols-4 gap-2">
                    {splitPlan.map((step, index) => (
                      <div key={step.label} className="space-y-2">
                        <div
                          className={cn(
                            "h-1.5 rounded-full",
                            index === 0 ? "bg-[#55D67A]" : "bg-[#E7ECF2]"
                          )}
                        />
                        <p className="text-sm text-zinc-500">{step.label}</p>
                        <p className="text-xl font-semibold text-zinc-900">
                          {formatPrice(step.amount)} ₽
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </button>

              <div className="rounded-[24px] border border-[#E5FF00] bg-[#F9FFC8] px-5 py-4">
                <p className="text-sm font-medium text-zinc-900">
                  После входа через Яндекс в checkout автоматически подтянутся ваши контакты, ПВЗ и бонусы.
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-600">
                  За авторизацию пользователь получает 500 бонусов и может применить их прямо при оформлении.
                </p>
              </div>
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
