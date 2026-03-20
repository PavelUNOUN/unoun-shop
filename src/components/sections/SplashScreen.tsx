"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  "/images/main-0.png",
  "/images/main-1.png",
  "/images/main-2.png",
  "/images/main-3.png",
  "/images/main-4.png",
];

const SUBTITLE = "Уборка, которая занимает минуты, а не часы.";
const TITLE = "Чистота без компромиссов.";

// Варианты для контейнера — управляет stagger-задержкой дочерних слов
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
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
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
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

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
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
    <section className="relative h-screen w-full overflow-hidden">
      {/* ── ФОНОВЫЕ СЛАЙДЫ ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[current]}
            alt="UNOUN — паровая швабра"
            fill
            priority={current === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── ГРАДИЕНТНОЕ ЗАТЕМНЕНИЕ ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none" />

      {/* ── ТЕКСТОВЫЙ БЛОК — появляется заново при каждой смене слайда ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute bottom-20 left-6 right-6 z-10 md:left-14 md:max-w-3xl"
        >
          <AnimatedText
            text={SUBTITLE}
            className="text-white/65 text-sm font-medium tracking-widest uppercase mb-4 md:text-base"
          />
          <AnimatedText
            text={TITLE}
            className="text-white text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          />
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
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => handleManual(() => setCurrent(i))}
            aria-label={`Слайд ${i + 1}`}
            className={`rounded-full transition-all duration-400 ${
              i === current
                ? "w-7 h-[6px] bg-white"
                : "w-[6px] h-[6px] bg-white/40 hover:bg-white/65"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
