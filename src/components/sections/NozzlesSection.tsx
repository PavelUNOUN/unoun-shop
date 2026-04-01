"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NOZZLES = [
  {
    name: "Насадка из нержавеющей стали",
    description: "Для удаления стойких загрязнений на плите и плитке",
    image: "/images/nozzle-steel.png",
  },
  {
    name: "Нейлоновая щётка",
    description: "Для углов, кухни, гостиной",
    image: "/images/nozzle-nylon.png",
  },
  {
    name: "Скребок для стёкол",
    description: "Для окон и гладких поверхностей",
    image: "/images/nozzle-glass-scraper.png",
  },
  {
    name: "Головка для текстиля",
    description: "Для глажки одежды и штор",
    image: "/images/nozzle-textile-head.png",
  },
  {
    name: "Круглая щётка",
    description: "Для кафеля и мраморных поверхностей",
    image: "/images/nozzle-round-brush.png",
  },
  {
    name: "Насадка-швабра",
    description: "Для паркета, ламината, плитки",
    image: "/images/nozzle-mop.png",
  },
  {
    name: "Скребок для жира",
    description: "Для нагара с кухонной плиты",
    image: "/images/nozzle-scraper.png",
  },
  {
    name: "Насадка-уголок",
    description: "Для углов и щелей",
    image: "/images/nozzle-angle.png",
  },
  {
    name: "Щётка для стыков и швов",
    description: "Для межплиточных швов",
    image: "/images/nozzle-joints-brush.png",
  },
  {
    name: "Удлинённый переходник",
    description: "Для труднодоступных мест",
    image: "/images/nozzle-extension-adapter.png",
  },
  {
    name: "Переходник-шланг",
    description: "Для высоких мест и узких углов",
    image: "/images/nozzle-hose-adapter.png",
  },
  {
    name: "Тряпка тканевая",
    description: "В комплекте 3 штуки",
    image: "/images/nozzle-mop-cloth.png",
  },
] as const;

const BTN_CLASSES =
  "flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-md transition-all duration-200 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white";

export default function NozzlesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    loop: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="nozzles" className="w-full overflow-x-clip bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Заголовок */}
        <div className="mb-10 md:mb-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Комплектация
          </p>
          <h2 className="font-heading font-bold text-zinc-900 text-3xl tracking-tight sm:text-4xl md:text-5xl">
            Насадки для кухни, пола и текстиля
          </h2>
        </div>

        {/* Обёртка с кнопками по бокам */}
        <div className="relative overflow-x-clip">

          {/* Кнопка влево */}
          <button
            onClick={scrollPrev}
            aria-label="Предыдущие насадки"
            className={`${BTN_CLASSES} absolute left-2 top-1/2 z-10 -translate-y-1/2 sm:-left-6`}
          >
            <ChevronLeft size={18} strokeWidth={1.75} />
          </button>

          {/* Карусель */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 sm:gap-5">
              {NOZZLES.map((nozzle, index) => (
                <div
                  key={index}
                  className="group flex min-w-0 shrink-0 grow-0 basis-[calc(50%-8px)] flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white transition-shadow duration-200 hover:shadow-md sm:basis-[calc(33.333%-12px)] md:basis-[calc(25%-12px)] lg:basis-[calc(20%-13px)]"
                >
                  {/* Фото насадки */}
                  <div className="relative aspect-square w-full bg-zinc-50">
                    <Image
                      src={nozzle.image}
                      alt={nozzle.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Порядковый номер */}
                    <span className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white">
                      {index + 1}
                    </span>
                  </div>

                  {/* Текст */}
                  <div className="flex flex-col gap-1 p-3 sm:p-4">
                    <p className="text-sm font-semibold leading-snug text-zinc-900">
                      {nozzle.name}
                    </p>
                    <p className="text-xs leading-snug text-zinc-400">
                      {nozzle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Кнопка вправо */}
          <button
            onClick={scrollNext}
            aria-label="Следующие насадки"
            className={`${BTN_CLASSES} absolute right-2 top-1/2 z-10 -translate-y-1/2 sm:-right-6`}
          >
            <ChevronRight size={18} strokeWidth={1.75} />
          </button>

        </div>
      </div>
    </section>
  );
}
