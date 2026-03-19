"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ShoppingCart, Menu, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

// Пункты дропдауна "Устройства"
const DEVICES_MENU = [
  { label: "Купить UNOUN 12-в-1", href: "/cart" },
  { label: "Способы применения", href: "/#use-cases" },
  { label: "Комплектация", href: "/#nozzles" },
  { label: "Инструкция", href: "/#instruction" },
];

// Пункты дропдауна "Покупателям"
const BUYERS_MENU = [
  { label: "Доставка и оплата", href: "/delivery" },
  { label: "Гарантия и сервис", href: "/service" },
  { label: "Частые вопросы", href: "/faq" },
];

export default function Header() {
  // true — пользователь прокрутил вниз → хедер непрозрачный белый
  const [scrolled, setScrolled] = useState(false);
  // Какое десктопное меню открыто: "devices" | "buyers" | null
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // Открыто ли мобильное меню
  const [mobileOpen, setMobileOpen] = useState(false);
  // Открытый аккордеон в мобильном меню
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);

  // Следим за позицией скролла
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Закрываем десктопный дропдаун при клике вне хедера
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDesktopMenu = (name: string) => {
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  const toggleMobileAccordion = (name: string) => {
    setMobileAccordion((prev) => (prev === name ? null : name));
  };
  const totalItems = useCartStore((state) => state.totalItems());

  // Классы текста — белый на прозрачном фоне, тёмный на белом
  const textClass = cn(
    "text-base font-medium transition-colors duration-300",
    scrolled ? "text-zinc-800 hover:text-zinc-950" : "text-white/90 hover:text-white"
  );

  const iconClass = cn(
    "transition-colors duration-300",
    scrolled ? "text-zinc-800 hover:text-zinc-950" : "text-white/90 hover:text-white"
  );

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-zinc-100"
          : "bg-black/30 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── ЛОГОТИП СЛЕВА ── */}
          <Link href="/" className="flex-shrink-0 z-10">
            <Image
              src={
                scrolled
                  ? "/images/логотип unoun черный без фона.png"
                  : "/images/логотип unoun белый без фона.png"
              }
              alt="UNOUN"
              width={108}
              height={34}
              className="object-contain transition-opacity duration-300"
              priority
            />
          </Link>

          {/* ── НАВИГАЦИЯ ПО ЦЕНТРУ (десктоп) ── */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">

            {/* Устройства */}
            <div className="relative">
              <button
                onClick={() => toggleDesktopMenu("devices")}
                className={cn(textClass, "flex items-center gap-1")}
              >
                Устройства
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={cn(
                    "transition-transform duration-200",
                    openMenu === "devices" && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {openMenu === "devices" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white rounded-2xl shadow-xl border border-zinc-100 overflow-hidden"
                  >
                    {DEVICES_MENU.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpenMenu(null)}
                        className="block px-5 py-3.5 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 transition-colors duration-150 border-b border-zinc-50 last:border-none"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* О бренде */}
            <Link href="/#description" className={textClass}>
              О бренде
            </Link>

            <Link href="/academy" className={textClass}>
              UNOUN Academy
            </Link>

            {/* Покупателям */}
            <div className="relative">
              <button
                onClick={() => toggleDesktopMenu("buyers")}
                className={cn(textClass, "flex items-center gap-1")}
              >
                Покупателям
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={cn(
                    "transition-transform duration-200",
                    openMenu === "buyers" && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {openMenu === "buyers" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-52 bg-white rounded-2xl shadow-xl border border-zinc-100 overflow-hidden"
                  >
                    {BUYERS_MENU.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpenMenu(null)}
                        className="block px-5 py-3.5 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 transition-colors duration-150 border-b border-zinc-50 last:border-none"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* ── ПРАВАЯ ЗОНА: корзина + бургер (мобайл) ── */}
          <div className="flex items-center gap-2">
            <Link
              href="/account"
              aria-label="Открыть личный кабинет"
              className={cn(
                "hidden h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium transition-colors duration-200 lg:inline-flex",
                scrolled
                  ? "border border-zinc-200 text-zinc-800 hover:bg-zinc-100"
                  : "border border-white/15 text-white/90 hover:bg-white/10 hover:text-white"
              )}
            >
              <User size={16} strokeWidth={1.8} />
              Кабинет
            </Link>

            <Link
              href="/account"
              aria-label="Открыть личный кабинет"
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 lg:hidden",
                scrolled ? "hover:bg-zinc-100" : "hover:bg-white/10",
                iconClass
              )}
            >
              <User size={18} strokeWidth={1.7} />
            </Link>

            {/* Корзина — всегда видна */}
            <Link
              href="/cart"
              aria-label="Корзина"
              className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200",
                scrolled ? "hover:bg-zinc-100" : "hover:bg-white/10",
                iconClass
              )}
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#E5FF00] px-1 text-[10px] font-bold text-zinc-900">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Бургер — только на мобайле */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Меню"
              aria-expanded={mobileOpen}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 lg:hidden",
                scrolled ? "hover:bg-zinc-100" : "hover:bg-white/10",
                iconClass
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={20} strokeWidth={1.75} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={20} strokeWidth={1.75} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* ── МОБИЛЬНОЕ МЕНЮ ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={cn(
              "overflow-hidden lg:hidden border-t",
              scrolled
                ? "bg-white border-zinc-100"
                : "bg-zinc-950/95 backdrop-blur-md border-white/10"
            )}
          >
            <nav className="flex flex-col px-4 py-2">

              {/* Устройства — аккордеон */}
              <div>
                <button
                  onClick={() => toggleMobileAccordion("devices")}
                  className={cn(
                    "flex items-center justify-between w-full py-4 text-base font-medium border-b transition-colors duration-150",
                    scrolled
                      ? "text-zinc-800 border-zinc-100"
                      : "text-white/90 border-white/10"
                  )}
                >
                  Устройства
                  <ChevronDown
                    size={16}
                    className={cn(
                      "transition-transform duration-200",
                      mobileAccordion === "devices" && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {mobileAccordion === "devices" && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {DEVICES_MENU.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => { setMobileOpen(false); setMobileAccordion(null); }}
                          className={cn(
                            "block py-3 pl-4 text-sm border-b transition-colors duration-150",
                            scrolled
                              ? "text-zinc-600 border-zinc-50 hover:text-zinc-900"
                              : "text-white/70 border-white/5 hover:text-white"
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* О бренде */}
              <Link
                href="/#description"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "py-4 text-base font-medium border-b transition-colors duration-150",
                  scrolled
                    ? "text-zinc-800 border-zinc-100 hover:text-zinc-950"
                    : "text-white/90 border-white/10 hover:text-white"
                )}
              >
                О бренде
              </Link>

              <Link
                href="/academy"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "py-4 text-base font-medium border-b transition-colors duration-150",
                  scrolled
                    ? "text-zinc-800 border-zinc-100 hover:text-zinc-950"
                    : "text-white/90 border-white/10 hover:text-white"
                )}
              >
                UNOUN Academy
              </Link>

              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "py-4 text-base font-medium border-b transition-colors duration-150",
                  scrolled
                    ? "text-zinc-800 border-zinc-100 hover:text-zinc-950"
                    : "text-white/90 border-white/10 hover:text-white"
                )}
              >
                Личный кабинет
              </Link>

              {/* Покупателям — аккордеон */}
              <div>
                <button
                  onClick={() => toggleMobileAccordion("buyers")}
                  className={cn(
                    "flex items-center justify-between w-full py-4 text-base font-medium border-b transition-colors duration-150",
                    scrolled
                      ? "text-zinc-800 border-zinc-100"
                      : "text-white/90 border-white/10"
                  )}
                >
                  Покупателям
                  <ChevronDown
                    size={16}
                    className={cn(
                      "transition-transform duration-200",
                      mobileAccordion === "buyers" && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {mobileAccordion === "buyers" && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {BUYERS_MENU.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => { setMobileOpen(false); setMobileAccordion(null); }}
                          className={cn(
                            "block py-3 pl-4 text-sm border-b transition-colors duration-150",
                            scrolled
                              ? "text-zinc-600 border-zinc-50 hover:text-zinc-900"
                              : "text-white/70 border-white/5 hover:text-white"
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
