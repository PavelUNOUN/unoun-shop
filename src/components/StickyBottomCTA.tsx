"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AddToCartButton from "@/components/ui/AddToCartButton";
import { useFlagshipProduct } from "@/hooks/useFlagshipProduct";
import { formatPrice } from "@/lib/catalog";
import { cn } from "@/lib/utils";

// Порог скролла в пикселях, после которого панель появляется
const SCROLL_THRESHOLD = 400;
const BONUS_PANEL_START_ID = "nozzles-carousel";
const BONUS_PANEL_END_ID = "accessories-preview";

export default function StickyBottomCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const product = useFlagshipProduct();
  const isAccountRoute = pathname.startsWith("/account");
  const isCommerceRoute =
    pathname.startsWith("/cart") || pathname.startsWith("/checkout");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > SCROLL_THRESHOLD);

      if (pathname !== "/") {
        setIsExpanded(false);
        return;
      }

      const startSection = document.getElementById(BONUS_PANEL_START_ID);
      const endSection = document.getElementById(BONUS_PANEL_END_ID);

      if (!startSection || !endSection) {
        setIsExpanded(false);
        return;
      }

      const startRect = startSection.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const carouselCenter = startRect.top + startRect.height / 2;
      const endRect = endSection.getBoundingClientRect();
      const accessoriesCenter = endRect.top + endRect.height / 2;

      setIsExpanded(
        carouselCenter <= viewportCenter && accessoriesCenter > viewportCenter
      );
    };

    // Проверяем сразу при монтировании (вдруг страница уже проскроллена)
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  if (isAccountRoute || isCommerceRoute) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="sticky-cta"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          layout
          // z-40 — под FloatingConsultant (z-50), но поверх контента
          className="fixed bottom-3 left-3 right-3 z-40 md:bottom-auto md:left-auto md:right-6 md:top-24 lg:right-8 lg:top-28"
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className={cn(
              "mx-auto overflow-hidden border text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] backdrop-blur-xl md:mx-0",
              isExpanded
                ? "rounded-[30px] border-white/16 bg-[rgba(75,66,61,0.62)] p-3 md:w-[552px] md:rounded-[34px] md:p-3.5"
                : "flex max-w-6xl items-center gap-2 rounded-[28px] border-white/20 bg-[rgba(92,80,74,0.48)] p-2.5 md:w-[432px] md:gap-3 md:rounded-full md:border-[rgba(255,255,255,0.10)] md:bg-[rgba(75,66,61,0.5)] md:px-3 md:py-3"
            )}
          >
            {isExpanded ? (
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="relative h-[120px] w-full overflow-hidden rounded-[22px] md:h-[116px] md:w-[172px] md:shrink-0">
                  <Image
                    src="/images/main-2.png"
                    alt="Паровая швабра UNOUN в интерьере"
                    fill
                    sizes="(max-width: 767px) calc(100vw - 48px), 172px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,7,0.02)_0%,rgba(10,8,7,0.22)_100%)]" />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-3 px-1 md:pr-2">
                  <div>
                    <p className="truncate text-[14px] font-medium leading-[1.1] text-white/82 md:text-[15px]">
                      {product.shortTitle}
                    </p>
                    <p className="mt-1 text-[13px] leading-none text-white/62 md:text-[14px]">
                      {formatPrice(product.price)} ₽
                    </p>
                  </div>

                  <div>
                    <p className="text-[16px] font-semibold leading-[1.08] text-white md:text-[19px]">
                      500 бонусов после входа
                    </p>
                    <p className="mt-1 max-w-[26rem] text-[12px] leading-snug text-white/72 md:text-[13px]">
                      Авторизуйтесь перед покупкой и используйте бонусы в первом заказе.
                    </p>
                  </div>
                </div>

                <AddToCartButton
                  label="Купить"
                  redirectTo="/cart"
                  className="flex h-11 shrink-0 items-center justify-center rounded-full border border-[#E5FF00] bg-transparent px-5 text-xs font-semibold uppercase tracking-[0.06em] text-[#F5F7D5] transition-all duration-150 hover:bg-[#E5FF00]/10 active:scale-[0.98] md:min-w-[132px] md:px-6 md:text-sm"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 md:gap-3">
                <div className="min-w-0 flex-1 pl-4 md:max-w-[240px] md:pl-6">
                  <p className="truncate text-[14px] font-medium leading-[1.1] text-white sm:text-[15px]">
                    {product.shortTitle}
                  </p>
                  <p className="mt-1 text-[13px] leading-none text-white/66 md:text-[14px]">
                    {formatPrice(product.price)} ₽
                  </p>
                </div>

                <AddToCartButton
                  label="Купить"
                  redirectTo="/cart"
                  className="flex h-10 shrink-0 items-center justify-center rounded-full border border-[#E5FF00] bg-transparent px-3 text-xs font-semibold uppercase tracking-[0.06em] text-[#F5F7D5] transition-all duration-150 hover:bg-[#E5FF00]/10 active:scale-[0.98] md:h-10 md:min-w-[126px] md:px-5 md:text-sm"
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
