"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/faq";
import { cn } from "@/lib/utils";

export default function FaqSection() {
  // Хранит индекс открытого вопроса; null — все закрыты
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="mx-auto mb-10 max-w-3xl md:mb-14">
          <div className="mb-4 inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Все, что важно знать перед покупкой
            </span>
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            FAQ
          </p>
          <h2 className="font-heading font-bold text-zinc-900 text-3xl tracking-tight sm:text-4xl md:text-5xl">
            Частые вопросы
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            Мы собрали ответы на вопросы, которые чаще всего влияют на решение о
            покупке: поверхности, уход, вода, гарантия и условия заказа.
          </p>
        </div>

        {/* Аккордеон — чистая editorial-подача без визуального шума */}
        <div className="mx-auto max-w-3xl overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-[0_24px_80px_-48px_rgba(24,24,27,0.3)]">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className={cn(
                  "border-b border-zinc-100 last:border-b-0",
                  isOpen && "bg-zinc-50/55"
                )}
              >
                {/* Кнопка вопроса */}
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7 sm:py-6",
                    "transition-colors duration-200",
                    isOpen
                      ? "text-zinc-900"
                      : "text-zinc-700 hover:bg-zinc-50/80 hover:text-zinc-900"
                  )}
                >
                  <span className="pr-2 text-base font-semibold leading-snug sm:text-[17px]">
                    {item.question}
                  </span>
                  {/* Иконка +/- плавно меняется */}
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
                      isOpen
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-600"
                    )}
                  >
                    {isOpen ? (
                      <Minus size={14} strokeWidth={2} />
                    ) : (
                      <Plus size={14} strokeWidth={2} />
                    )}
                  </span>
                </button>

                {/* Ответ — плавно раскрывается */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-600 sm:px-7 sm:pb-6 sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-5 max-w-3xl rounded-[24px] border border-zinc-200 bg-zinc-50 px-5 py-4 sm:px-6">
          <p className="text-sm leading-relaxed text-zinc-600">
            Если нужен полный сценарий использования, в блоке{" "}
            <a
              href="#instruction"
              className="font-medium text-zinc-900 transition-colors duration-200 hover:text-zinc-700"
            >
              инструкции
            </a>{" "}
            доступно руководство в PDF. Для покупки можно сразу перейти к{" "}
            <a
              href="/checkout"
              className="font-medium text-zinc-900 transition-colors duration-200 hover:text-zinc-700"
            >
              оформлению заказа
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
