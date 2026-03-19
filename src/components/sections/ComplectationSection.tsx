import Image from "next/image";
import { Check } from "lucide-react";
import AddToCartButton from "@/components/ui/AddToCartButton";

// Серверный компонент — статический контент
const ITEMS = [
  "Паровая швабра UNOUN",
  "11 насадок для любых поверхностей",
  "3 тряпки из микрофибры (+2 в подарок)",
  "Тряпка для отпаривания",
  "Мерный стакан",
  "Инструкция на русском языке",
  "Гарантийный талон (2 года)",
];

export default function ComplectationSection() {
  return (
    <section id="complectation" className="w-full bg-zinc-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/*
          Мобайл: 1 колонка (фото сверху, список снизу)
          Десктоп: 2 колонки (фото слева, список справа)
        */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">

          {/* Фото комплекта */}
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-white">
            <Image
              src="/images/8.jpg"
              alt="Полный комплект UNOUN"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-6"
            />
          </div>

          {/* Текстовая часть */}
          <div className="flex flex-col gap-7">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Комплектация
              </p>
              <h2 className="font-heading font-bold text-zinc-900 text-3xl tracking-tight sm:text-4xl md:text-5xl">
                Что входит в комплект
              </h2>
            </div>

            {/* Список позиций комплекта */}
            <ul className="flex flex-col gap-3">
              {ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  {/* Галочка в жёлтом круге */}
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E5FF00]">
                    <Check size={12} strokeWidth={2.5} className="text-zinc-900" />
                  </span>
                  <span className="text-sm text-zinc-700 leading-snug sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <AddToCartButton
              label="Купить за 7 990 ₽"
              redirectTo="/cart"
              className="inline-flex items-center justify-center h-14 rounded-full bg-[#E5FF00] px-8 text-base font-semibold text-zinc-900 hover:brightness-95 active:scale-[0.98] transition-all duration-150 self-start w-full sm:w-auto"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
