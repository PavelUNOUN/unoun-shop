"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";

const USE_CASES = [
  {
    title: "Для кухни",
    description:
      "Помогает поддерживать чистоту в зоне плиты, фартука и рабочих поверхностей без лишней рутины.",
    caption: "Пар для ежедневной чистоты рядом с плитой",
    image: "/images/use-kitchen.png",
    tag: "Кухня",
    href: "/academy/parovaya-shvabra-dlya-kuhni",
  },
  {
    title: "Для ванной",
    description:
      "Подходит для плитки, стыков, смесителей и других зон, где особенно важны аккуратность и свежесть.",
    caption: "Комфортный уход за плиткой и сантехникой",
    image: "/images/use-bathroom.png",
    tag: "Ванная",
    href: "/academy/parovaya-shvabra-dlya-vannoy",
  },
  {
    title: "Для пола",
    description:
      "Лёгкая насадка и манёвренная форма делают ежедневную уборку спокойной и удобной, в том числе вдоль плинтусов и у мебели.",
    caption: "Бережная уборка пола и сложных зон",
    image: "/images/use-floor.png",
    tag: "Пол и углы",
    href: "/academy/parovaya-shvabra-dlya-pola",
  },
  {
    title: "Для текстиля",
    description:
      "С текстильной насадкой устройство подходит для деликатного отпаривания штор, одежды и домашнего текстиля.",
    caption: "Отпаривает вещи и шторы без громоздкой техники",
    image: "/images/use-textile.png",
    tag: "Текстиль",
    href: "/academy/parovaya-shvabra-dlya-tekstilya",
  },
] as const;

export default function UseCasesSection() {
  return (
    <section id="use-cases" className="w-full bg-zinc-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 shadow-sm">
            <Sparkles size={13} className="text-zinc-500" />
            <span className="text-xs font-semibold text-zinc-600">
              Сценарии применения
            </span>
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
            Для разных задач
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            Всё самое важное: где и как устройство работает в доме.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {USE_CASES.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_24px_80px_-40px_rgba(24,24,27,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_-42px_rgba(24,24,27,0.4)]"
            >
              <Link href={item.href} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-white/88 px-3 py-1 text-xs font-semibold text-zinc-900 backdrop-blur-sm">
                      {item.tag}
                    </span>
                  </div>
                  <p className="absolute bottom-4 left-4 right-4 text-sm font-medium leading-snug text-white/95">
                    {item.caption}
                  </p>
                </div>

                <div className="flex flex-col gap-3 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-heading text-2xl font-bold tracking-tight text-zinc-900">
                      {item.title}
                    </h3>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors duration-200 group-hover:border-zinc-900 group-hover:text-zinc-900">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
                    {item.description}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
