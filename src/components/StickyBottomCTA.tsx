"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AddToCartButton from "@/components/ui/AddToCartButton";
import { useFlagshipProduct } from "@/hooks/useFlagshipProduct";
import { formatPrice } from "@/lib/catalog";

// Порог скролла в пикселях, после которого панель появляется
const SCROLL_THRESHOLD = 400;

export default function StickyBottomCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const product = useFlagshipProduct();
  const isAccountRoute = pathname.startsWith("/account");
  const isCommerceRoute =
    pathname.startsWith("/cart") || pathname.startsWith("/checkout");

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    // Проверяем сразу при монтировании (вдруг страница уже проскроллена)
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          // z-40 — под FloatingConsultant (z-50), но поверх контента
          className="fixed bottom-3 left-3 right-3 z-40 md:bottom-auto md:left-auto md:right-6 md:top-24 lg:right-8 lg:top-28"
        >
          <div className="mx-auto flex max-w-6xl items-center gap-2 rounded-[28px] border border-white/20 bg-[rgba(92,80,74,0.48)] p-2.5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] backdrop-blur-xl md:mx-0 md:w-[432px] md:gap-3 md:rounded-full md:border-[rgba(255,255,255,0.10)] md:bg-[rgba(75,66,61,0.5)] md:px-3 md:py-3">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
