"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  "/images/card-2.png",
  "/images/use-kitchen.png",
  "/images/use-bathroom.png",
  "/images/use-floor.png",
  "/images/use-textile.png",
  "/images/card-3.jpg",
  "/images/card-4.jpg",
];

const NAV_TABS = [
  { label: "Описание", href: "#description" },
  { label: "Способы применения", href: "#use-cases" },
  { label: "Аксессуары", href: "#nozzles" },
  { label: "Характеристики", href: "#features" },
  { label: "Инструкция", href: "#instruction" },
];

export default function HeroSection() {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<(typeof NAV_TABS)[number]["href"]>(
    NAV_TABS[0].href
  );
  const [isNavPinned, setIsNavPinned] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const product = useFlagshipProduct();
  const addItem = useCartStore((state) => state.addItem);
  const navRef = useRef<HTMLDivElement | null>(null);
  const navAnchorRef = useRef<HTMLDivElement | null>(null);

  const headerOffset = 80;

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

  useEffect(() => {
    const updateNavMetrics = () => {
      setNavHeight(navRef.current?.offsetHeight ?? 0);
    };

    updateNavMetrics();
    window.addEventListener("resize", updateNavMetrics);

    return () => window.removeEventListener("resize", updateNavMetrics);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const anchorTop = navAnchorRef.current?.getBoundingClientRect().top ?? 0;
      setIsNavPinned(anchorTop <= headerOffset);

      const checkpoint = window.scrollY + headerOffset + (navHeight || 56) + 12;
      let currentTab = NAV_TABS[0].href;

      for (let index = 0; index < NAV_TABS.length; index += 1) {
        const currentSection = document.querySelector(NAV_TABS[index].href);
        if (!currentSection) continue;

        const currentTop =
          currentSection.getBoundingClientRect().top + window.scrollY;
        const nextSection =
          index < NAV_TABS.length - 1
            ? document.querySelector(NAV_TABS[index + 1].href)
            : null;
        const nextTop = nextSection
          ? nextSection.getBoundingClientRect().top + window.scrollY
          : Number.POSITIVE_INFINITY;

        if (checkpoint >= currentTop && checkpoint < nextTop) {
          currentTab = NAV_TABS[index].href;
          break;
        }
      }

      setActiveTab(currentTab);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navHeight]);

  const handleTabClick = (href: string) => {
    const section = document.querySelector(href);
    if (!section) return;

    const top =
      section.getBoundingClientRect().top +
      window.scrollY -
      headerOffset -
      (navRef.current?.offsetHeight ?? 56) -
      16;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-0 sm:px-6 md:pt-12 lg:px-8 lg:pt-16">

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-10 lg:gap-14 xl:grid-cols-[1.08fr_0.92fr]">

          {/* ── ЛЕВАЯ КОЛОНКА: ГАЛЕРЕЯ ── */}
          <div className="relative -mx-4 w-[calc(100%+2rem)] sm:mx-0 sm:w-full">

            {/* Embla viewport — свайп работает здесь */}
            <div
              className="overflow-hidden rounded-none sm:rounded-[32px]"
              ref={emblaRef}
            >
              <div className="flex">
                {GALLERY_IMAGES.map((src, i) => (
                  <div
                    key={i}
                    className="relative h-[62svh] min-h-[480px] w-full shrink-0 sm:h-[68svh] md:h-[44rem] md:min-h-0 lg:h-[48rem] xl:h-[52rem]"
                  >
                    <Image
                      src={src}
                      alt={`Паровая швабра UNOUN — фото ${i + 1}`}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 52vw, 58vw"
                      className="object-cover object-center select-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Стрелка влево */}
            <button
              onClick={scrollPrev}
              aria-label="Предыдущее фото"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-md sm:left-4"
            >
              <ChevronLeft size={18} strokeWidth={1.75} className="text-zinc-700" />
            </button>

            {/* Стрелка вправо */}
            <button
              onClick={scrollNext}
              aria-label="Следующее фото"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-md sm:right-4"
            >
              <ChevronRight size={18} strokeWidth={1.75} className="text-zinc-700" />
            </button>

            {/* Точки-индикаторы */}
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 sm:bottom-5">
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
          <div className="flex flex-col gap-5 px-0 md:pt-4">

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
            ) : null}

            {/* Кнопки покупки */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <AddToCartButton
                label="В корзину"
                redirectTo="/cart"
                className="flex h-15 w-full items-center justify-center rounded-full bg-[#E5FF00] px-7 text-base font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98] sm:h-14 sm:flex-1 sm:px-6"
              />
              <button
                type="button"
                onClick={() => handleQuickCheckout("full_online")}
                disabled={!product.isActive || product.stock <= 0}
                className="flex h-15 w-full items-center justify-center rounded-full border border-zinc-200 bg-white px-7 text-base font-semibold text-zinc-900 transition-all duration-150 hover:border-zinc-900 hover:bg-zinc-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:flex-1 sm:px-6"
              >
                Купить в 1 клик
              </button>
            </div>

            <div className="grid gap-3 rounded-[28px] border border-zinc-200 bg-white p-4 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.18)] sm:gap-4 sm:rounded-[32px] sm:p-6">
              <button
                type="button"
                onClick={() => handleQuickCheckout("split")}
                disabled={!product.isActive || product.stock <= 0}
                className="rounded-[22px] border border-zinc-200 bg-zinc-50 px-4 py-4 text-left transition-colors duration-150 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-[24px] sm:px-5 sm:py-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#88F59A_0%,#3FDB66_48%,#2FC06D_100%)] text-base font-bold text-white sm:mt-1 sm:h-11 sm:w-11 sm:text-lg">
                      ◔
                    </div>
                    <div>
                      <p className="text-xs text-zinc-700 sm:text-sm">
                        Яндекс Сплит — оплата частями
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <p className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                          {formatPrice(splitPlan[0]?.amount ?? 0)} ₽ × 4
                        </p>
                        <span className="rounded-full bg-[#55D67A] px-2.5 py-1 text-xs font-semibold text-white sm:px-3 sm:text-sm">
                          без переплат
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRightIcon className="shrink-0 text-zinc-400" size={20} />
                </div>

                <div className="mt-4 sm:mt-5">
                  <div className="grid grid-cols-4 gap-2">
                    {splitPlan.map((step, index) => (
                      <div key={step.label} className="space-y-2">
                        <div
                          className={cn(
                            "h-1.5 rounded-full",
                            index === 0 ? "bg-[#55D67A]" : "bg-[#E7ECF2]"
                          )}
                        />
                        <p className="text-xs text-zinc-500 sm:text-sm">{step.label}</p>
                        <p className="text-base font-semibold text-zinc-900 sm:text-xl">
                          {formatPrice(step.amount)} ₽
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </button>

              <div className="rounded-[22px] border border-[#E5FF00] bg-[#F9FFC8] px-4 py-3 sm:rounded-[24px] sm:px-5 sm:py-4">
                <p className="text-sm font-medium text-zinc-900">
                  За авторизацию получите 500 бонусов и сможете применить их к заказу.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ── НАВИГАЦИОННЫЕ ТАБЫ ── */}
        <div ref={navAnchorRef} className="mt-10">
          <div style={{ height: isNavPinned ? navHeight : 0 }} />
          <div
            ref={navRef}
            className={cn(
              "z-30 border-b border-zinc-100 bg-white/95 backdrop-blur-md transition-all duration-200",
              isNavPinned
                ? "fixed left-0 right-0 top-16 shadow-[0_14px_40px_-30px_rgba(24,24,27,0.28)] lg:top-20"
                : "relative"
            )}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center gap-1 overflow-x-auto">
                {NAV_TABS.map(({ label, href }) => {
                  const isActive = activeTab === href;

                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => handleTabClick(href)}
                      className={cn(
                        "shrink-0 rounded-t-[18px] px-4 pb-3 pt-3 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-zinc-100 text-zinc-900"
                          : "text-zinc-400 hover:bg-zinc-50 hover:text-zinc-700"
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
