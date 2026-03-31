"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    image: "/images/1s.png",
    title: "Универсальная система для дома",
    description:
      "Один прибор объединяет паровую уборку пола, локальную очистку поверхностей и деликатное отпаривание текстиля.",
    facts: ["Один прибор", "Для разных сценариев"],
  },
  {
    image: "/images/2s.png",
    title: "Быстрый старт",
    description:
      "Швабра быстро включается в повседневную уборку, когда важны аккуратность, темп и ощущение лёгкости в использовании.",
    facts: ["Быстро готова", "Для ежедневного ритма"],
  },
  {
    image: "/images/3s.png",
    title: "Чистота без лишней химии",
    description:
      "Горячий пар помогает поддерживать свежесть и порядок в доме без ощущения тяжёлой и перегруженной уборки.",
    facts: ["Свежесть каждый день", "Бережный подход"],
  },
  {
    image: "/images/4s.png",
    title: "Для кухни, ванной и пола",
    description:
      "Подходит для плитки, бытовых поверхностей, зоны у плиты и ежедневной уборки пола там, где важны точность и удобство.",
    facts: ["Кухня и ванная", "Пол и поверхности"],
  },
  {
    image: "/images/5s.png",
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

  const handlePointerDown = (event: React.PointerEvent) => {
    pointerStartX.current = event.clientX;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    if (pointerStartX.current === null) return;

    const diff = pointerStartX.current - event.clientX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    pointerStartX.current = null;
  };

  const slide = SLIDES[active];

  return (
    <section id="description" className="w-full bg-zinc-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl md:mb-14">
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

        <div className="mx-auto max-w-[1180px]">
          <div
            className="relative overflow-hidden rounded-[36px] border border-zinc-200 bg-white shadow-[0_30px_100px_-52px_rgba(24,24,27,0.22)] sm:rounded-[40px]"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            <div className="relative aspect-[16/10] min-h-[300px] sm:min-h-[380px] lg:min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.image}
                  initial={{ opacity: 0, scale: 1.015 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 92vw"
                    className="object-cover object-center bg-[#ddd2c5]"
                    priority={active === 0}
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/32 via-black/4 to-transparent" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute left-5 top-5 rounded-full bg-white/92 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-[0_10px_30px_-20px_rgba(24,24,27,0.35)] backdrop-blur-sm sm:left-6 sm:top-6">
                {String(active + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
              </div>

              <div className="absolute inset-x-0 bottom-5 z-10 px-5 sm:bottom-6 sm:px-6">
                <div className="flex flex-wrap gap-2">
                  {slide.facts.map((fact) => (
                    <span
                      key={fact}
                      className="rounded-full border border-white/20 bg-white/18 px-4 py-2 text-xs font-medium text-white shadow-[0_4px_24px_-18px_rgba(0,0,0,0.4)] backdrop-blur-md sm:text-sm"
                    >
                      {fact}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={goPrev}
                aria-label="Предыдущий слайд"
                className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white/88 backdrop-blur-sm transition-all duration-200 hover:bg-white/18 lg:flex"
              >
                <ChevronLeft size={18} strokeWidth={1.75} />
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Следующий слайд"
                className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white/88 backdrop-blur-sm transition-all duration-200 hover:bg-white/18 lg:flex"
              >
                <ChevronRight size={18} strokeWidth={1.75} />
              </button>
            </div>
          </div>

          <div className="mx-auto mt-7 max-w-[980px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="rounded-[30px] border border-zinc-200 bg-white px-6 py-6 text-center shadow-[0_24px_80px_-48px_rgba(24,24,27,0.18)] sm:px-8 sm:py-7"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                  Сценарий {String(active + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-heading text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                  {slide.title}
                </h3>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
                  {slide.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 flex items-center justify-center gap-2">
              {SLIDES.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Слайд ${index + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-200",
                    index === active
                      ? "w-8 bg-zinc-900"
                      : "w-2 bg-zinc-300 hover:bg-zinc-400"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
