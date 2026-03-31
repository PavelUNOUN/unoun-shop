"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DESKTOP_SLIDES = [
  "/images/main-0.png",
  "/images/main-1.png",
  "/images/main-2.png",
  "/images/main-3.png",
  "/images/main-4.png",
];

const MOBILE_SLIDES = [
  "/images/r1.png",
  "/images/r2.png",
  "/images/r3.png",
  "/images/r4.png",
];

const SUBTITLE = "Уборка, которая занимает минуты, а не часы.";
const TITLE = "Чистота без компромиссов.";
const AMBIENT_TITLE = "Чистота в доме.";
const HANDWRITTEN_NOTE = "без тяжёлой уборки";
const SCROLL_HINT = "Листайте ниже — дальше кухня, ванная, пол и текстиль.";

// Варианты для контейнера — управляет stagger-задержкой дочерних слов
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

// Варианты для каждого слова — вылетает снизу вверх
const wordVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.77, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function AnimatedText({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  const words = text.split(" ");
  return (
    <motion.p className={`flex flex-wrap gap-x-[0.35em] ${className}`}>
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants}>
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function SplashScreen() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const slides = isMobile ? MOBILE_SLIDES : DESKTOP_SLIDES;
  const activeIndex = current % slides.length;

  const next = useCallback(() => {
    setCurrent((prev) => ((prev % slides.length) + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => ((prev % slides.length) - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const syncViewport = () => {
      setIsMobile(mediaQuery.matches);
    };

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  // Авто-смена каждые 5 секунд, пауза при ручном переключении
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const handleManual = (fn: () => void) => {
    setIsPaused(true);
    fn();
    // Возобновляем авто-смену через 8 секунд после ручного переключения
    setTimeout(() => setIsPaused(false), 8000);
  };

  return (
    <section className="relative h-[80svh] min-h-[620px] w-full overflow-hidden rounded-b-[28px] md:h-[83vh] md:min-h-[700px] md:rounded-b-none lg:h-[86vh]">
      {/* ── ФОНОВЫЕ СЛАЙДЫ ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`${isMobile ? "mobile" : "desktop"}-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[activeIndex]}
            alt="UNOUN — паровая швабра"
            fill
            priority={activeIndex === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── ГРАДИЕНТНОЕ ЗАТЕМНЕНИЕ ── */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(16,12,10,0.28)_0%,rgba(16,12,10,0.12)_28%,rgba(16,12,10,0.16)_56%,rgba(16,12,10,0.64)_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(10,8,7,0.34)_0%,rgba(10,8,7,0.12)_28%,rgba(10,8,7,0)_54%)]" />

      {/* ── ЛЕВЫЙ ТЕКСТОВЫЙ БЛОК ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute bottom-18 left-6 right-6 z-10 md:bottom-22 md:left-14 md:max-w-3xl"
        >
          <AnimatedText
            text={SUBTITLE}
            className="text-white/65 text-sm font-medium tracking-widest uppercase mb-4 md:text-base"
          />
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            exit={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            transition={{ duration: 1.61, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-visible pr-1 pb-3 pt-3"
          >
            <p
              className="text-white text-[3rem] font-medium leading-[1.06] tracking-[0.01em] sm:text-[4rem] md:text-[5.1rem] lg:text-[6rem]"
              style={{ fontFamily: "var(--font-script)" }}
            >
              {TITLE}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ── ПРАВЫЙ АКЦЕНТНЫЙ БЛОК ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`accent-${activeIndex}`}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 18 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-10 top-24 z-10 hidden max-w-[34rem] text-right lg:block xl:right-14 xl:top-26"
        >
          <p className="text-[4rem] leading-[0.92] font-light tracking-[-0.05em] text-white/22 xl:text-[5.15rem]">
            {AMBIENT_TITLE}
          </p>

          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            exit={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            transition={{ duration: 1.15, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 overflow-visible pr-1 pb-3 pt-3"
          >
            <p
              className="text-[3.1rem] leading-[1.18] font-medium tracking-[0.01em] text-white/74 xl:text-[3.95rem]"
              style={{ fontFamily: "var(--font-script)" }}
            >
              {HANDWRITTEN_NOTE}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.75, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="ml-auto mt-6 max-w-sm"
          >
            <p className="text-sm leading-relaxed text-white/74">
              {SCROLL_HINT}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ── СТРЕЛКИ НАВИГАЦИИ ── */}
      <button
        onClick={() => handleManual(prev)}
        aria-label="Предыдущий слайд"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25 transition-all duration-200"
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>
      <button
        onClick={() => handleManual(next)}
        aria-label="Следующий слайд"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25 transition-all duration-200"
      >
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>

      {/* ── ТОЧКИ-ИНДИКАТОРЫ ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleManual(() => setCurrent(i))}
            aria-label={`Слайд ${i + 1}`}
            className={`rounded-full transition-all duration-400 ${
              i === activeIndex
                ? "w-7 h-[6px] bg-white"
                : "w-[6px] h-[6px] bg-white/40 hover:bg-white/65"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
