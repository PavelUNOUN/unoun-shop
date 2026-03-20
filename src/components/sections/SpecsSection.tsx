"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Данные ───────────────────────────────────────────────────────────────────

const PREVIEW_ROWS = [
  { label: "Цвет", value: "Белый / Серебристый" },
  { label: "Модель", value: "SC-100 Max" },
  { label: "Гарантийный срок", value: "2 года" },
  { label: "Мощность устройства", value: "1500 Вт" },
];

const EXTENDED_GROUPS = [
  {
    title: "Питание",
    rows: [
      { label: "Питание", value: "От сети" },
      { label: "Напряжение", value: "220 В - 240 В" },
      { label: "Мощность устройства", value: "1500 Вт" },
      { label: "Время непрерывной работы", value: "25 мин" },
    ],
  },
  {
    title: "Насадки",
    rows: [
      { label: "Количество насадок в комплекте", value: "12 насадок" },
    ],
  },
  {
    title: "Пар",
    rows: [
      { label: "Постоянная подача пара", value: "32 г/мин" },
      { label: "Максимальное давление пара", value: "4.5 бар" },
      { label: "Температура пара", value: "до 130°C" },
    ],
  },
  {
    title: "Дополнительная информация",
    rows: [
      { label: "Объём резервуара", value: "400 мл" },
      { label: "Время нагрева", value: "25 сек" },
      { label: "Длина шнура", value: "500 см" },
      { label: "Доп. опции прибора", value: "Регулировка пара, датчик уровня воды, защита от перегрева" },
      { label: "Комплектация", value: "12 насадок, швабра, 3 тряпки из микрофибры" },
      { label: "Страна производства", value: "Китай" },
      { label: "Тип насадок", value: "Нержавеющая сталь, нейлон, текстиль, скребок, швабра" },
    ],
  },
  {
    title: "Габариты",
    rows: [
      { label: "Высота предмета", value: "114 см" },
      { label: "Ширина предмета", value: "25 см" },
      { label: "Глубина предмета", value: "18 см" },
      { label: "Вес без упаковки", value: "2.1 кг" },
      { label: "Вес с упаковкой", value: "3.7 кг" },
      { label: "Длина упаковки", value: "58 см" },
      { label: "Высота упаковки", value: "27 см" },
      { label: "Ширина упаковки", value: "14 см" },
    ],
  },
];

// ─── Row компонент ────────────────────────────────────────────────────────────

function SpecRow({
  label,
  value,
  striped,
}: {
  label: string;
  value: string;
  striped: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 px-4 py-3 text-sm",
        striped ? "bg-white" : "bg-transparent"
      )}
    >
      <span className="text-zinc-500 shrink-0 w-[45%]">{label}</span>
      <span className="text-zinc-900 font-medium text-right">{value}</span>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function SpecsSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="features" className="w-full bg-zinc-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Заголовок */}
        <div className="mb-10 md:mb-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Технические данные
          </p>
          <h2 className="font-heading font-bold text-zinc-900 text-3xl tracking-tight sm:text-4xl md:text-5xl">
            Характеристики
          </h2>
        </div>

        {/* 2 колонки: фото слева, таблица справа */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">

          {/* Фото — пока любое, позже заменим на чертёж */}
          <div className="relative w-full overflow-hidden rounded-3xl bg-white aspect-[3/4]">
            <Image
              src="/images/specs-blueprint.png"
              alt="Паровая швабра UNOUN — чертёж с габаритами"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-8"
            />
          </div>

          {/* Таблица характеристик */}
          <div className="flex flex-col">

        {/* Превью-строки (всегда видны) */}
        <div className="overflow-hidden rounded-2xl border border-zinc-100">
          {PREVIEW_ROWS.map((row, i) => (
            <SpecRow key={row.label} label={row.label} value={row.value} striped={i % 2 === 0} />
          ))}
        </div>

        {/* Раскрывающаяся часть */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="extended"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 flex flex-col gap-6">
                {EXTENDED_GROUPS.map((group) => (
                  <div key={group.title}>
                    <h3 className="mb-2 px-1 text-sm font-bold text-zinc-900">
                      {group.title}
                    </h3>
                    <div className="overflow-hidden rounded-2xl border border-zinc-100">
                      {group.rows.map((row, i) => (
                        <SpecRow
                          key={row.label}
                          label={row.label}
                          value={row.value}
                          striped={i % 2 === 0}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Кнопка раскрытия / скрытия */}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-5 flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors duration-200 hover:text-zinc-900"
        >
          {expanded ? (
            <>
              <Minus size={14} strokeWidth={2} />
              Скрыть
            </>
          ) : (
            <>
              <Plus size={14} strokeWidth={2} />
              Больше характеристик
            </>
          )}
        </button>

          </div>{/* конец колонки с таблицей */}
        </div>{/* конец grid */}

      </div>
    </section>
  );
}
