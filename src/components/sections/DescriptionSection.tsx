"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    image: "/images/main-0.png",
    title: "Универсальная система для дома",
    description:
      "Один прибор объединяет паровую уборку пола, локальную очистку поверхностей и деликатное отпаривание текстиля.",
    facts: ["Один прибор", "Для разных сценариев"],
  },
  {
    image: "/images/main-1.png",
    title: "Быстрый старт",
    description:
      "Швабра быстро включается в повседневную уборку, когда важны аккуратность, темп и ощущение лёгкости в использовании.",
    facts: ["Быстро готова", "Для ежедневного ритма"],
  },
  {
    image: "/images/main-2.png",
    title: "Чистота без лишней химии",
    description:
      "Горячий пар помогает поддерживать свежесть и порядок в доме без ощущения тяжёлой и перегруженной уборки.",
    facts: ["Свежесть каждый день", "Бережный подход"],
  },
  {
    image: "/images/main-3.png",
    title: "Для кухни, ванной и пола",
    description:
      "Подходит для плитки, бытовых поверхностей, зоны у плиты и ежедневной уборки пола там, где важны точность и удобство.",
    facts: ["Кухня и ванная", "Пол и поверхности"],
  },
  {
    image: "/images/main-4.png",
    title: "Отпаривание текстиля",
    description:
      "С текстильной насадкой устройство удобно использовать для штор, одежды и домашнего текстиля, когда хочется быстро освежить вещи.",
    facts: ["Шторы и одежда", "Деликатный уход"],
  },
] as const;

const COUNT = SLIDES.length;

export default function DescriptionSection() {
  const [active, setActive] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const goPrev = useCallback(() => {
    setActive((prev) => (prev - 1 + COUNT) % COUNT);
  }, []);

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % COUNT);
  }, []);

  const goTo = useCallback((index: number) => {
    setActive(index);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(goNext, 6500);
    return () => clearInterval(intervalId);
  }, [active, goNext]);

  const handleManualNav = (fn: () => void) => {
    fn();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
    isDragging.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    if (Math.abs(e.clientX - pointerStartX.current) > 5) {
      isDragging.current = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;

    const diff = pointerStartX.current - e.clientX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleManualNav(goNext);
      } else {
        handleManualNav(goPrev);
      }
    }

    pointerStartX.current = null;
    isDragging.current = false;
  };

  const getOffset = (i: number) => {
    let offset = i - active;
    if (offset > COUNT / 2) offset -= COUNT;
    if (offset < -COUNT / 2) offset += COUNT;
    return offset;
  };

  const slide = SLIDES[active];

  return (
    <section
      id="description"
      className="w-full overflow-x-clip bg-zinc-50 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            О продукте
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
            Описание
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            Пять ключевых сценариев, которые раскрывают устройство как полноценную
            систему для повседневной чистоты, сложных зон и ухода за текстилем.
          </p>
        </div>

        <div className="mx-auto max-w-[1360px] overflow-x-clip">
        <div className="relative overflow-x-clip">
          <div
            className="relative flex items-center justify-center overflow-hidden px-2 pb-2 pt-2 sm:px-10 md:overflow-visible lg:px-16"
            style={{ height: "clamp(240px, 38vw, 460px)" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {SLIDES.map((item, i) => {
              const offset = getOffset(i);
              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 1;

              return (
                <div
                  key={item.title}
                  onClick={() =>
                    !isActive && !isDragging.current && handleManualNav(() => goTo(i))
                  }
                  className={cn(
                    "absolute overflow-hidden rounded-[32px] border border-white/80 bg-white transition-all duration-500",
                    isActive
                      ? "z-10 cursor-default shadow-[0_35px_100px_-45px_rgba(24,24,27,0.45)]"
                      : "z-0 cursor-pointer shadow-[0_20px_60px_-45px_rgba(24,24,27,0.4)]",
                    !isVisible && "pointer-events-none",
                    !isActive && "hidden md:block"
                  )}
                  style={{
                    width: isActive
                      ? "min(820px, calc(100vw - 1.5rem))"
                      : "clamp(280px, 30vw, 420px)",
                    aspectRatio: "16 / 10",
                    opacity: isActive ? 1 : Math.abs(offset) === 1 ? 0.3 : 0,
                    transform: isActive
                      ? "translateX(0) scale(1)"
                      : `translateX(calc(${offset} * (clamp(320px, 58vw, 820px) * 0.88))) scale(0.8)`,
                  }}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 88vw, 68vw"
                      className={cn(
                        "select-none transition-transform duration-700",
                        isActive
                          ? "scale-[1.01] object-cover bg-zinc-100"
                          : "scale-[0.9] object-contain bg-zinc-50 p-4 blur-[0.2px] sm:p-5"
                      )}
                      draggable={false}
                    />
                    <div
                      className={cn(
                        "absolute inset-0 transition-opacity duration-500",
                        isActive
                          ? "bg-gradient-to-t from-black/50 via-black/8 to-transparent"
                          : "bg-gradient-to-t from-black/20 via-black/5 to-transparent"
                      )}
                    />

                    <div className="absolute left-4 top-4 rounded-full bg-white/88 px-3 py-1 text-xs font-semibold text-zinc-900 backdrop-blur-sm sm:left-6 sm:top-6">
                      {String(i + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
                    </div>

                    <div className="absolute inset-x-0 bottom-8 z-10 px-4 sm:bottom-9 sm:px-5">
                      <div className="flex flex-wrap gap-2">
                        {item.facts.map((fact) => (
                          <span
                            key={fact}
                            className="rounded-full border border-white/18 bg-white/18 px-3 py-1 text-[11px] font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:text-xs"
                          >
                            {fact}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>

        <div className="mx-auto mt-9 max-w-[820px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="rounded-[28px] border border-zinc-200 bg-white px-6 py-5 text-center shadow-[0_24px_80px_-45px_rgba(24,24,27,0.35)] sm:px-8 sm:py-6"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-400">
                {String(active + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                {slide.title}
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
