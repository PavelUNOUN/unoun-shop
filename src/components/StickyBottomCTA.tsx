"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/catalog";

// Порог скролла в пикселях, после которого панель появляется
const SCROLL_THRESHOLD = 400;

export default function StickyBottomCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
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
          className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
            {/* Цена */}
            <div className="flex flex-col">
              <span className="text-xs text-zinc-400 leading-none mb-0.5">
                Цена
              </span>
              <span className="text-2xl font-bold text-zinc-900 leading-none">
                {formatPrice(7990)} ₽
              </span>
            </div>

            {/* Кнопка покупки */}
            <Link
              href="/cart"
              aria-label="Купить паровую швабру UNOUN"
              className="flex-shrink-0 h-12 px-8 rounded-full bg-[#E5FF00] text-zinc-900 font-semibold text-base hover:brightness-95 active:scale-95 transition-all duration-150"
            >
              Купить
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
