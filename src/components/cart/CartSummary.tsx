"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/catalog";
import { useCartStore } from "@/store/cartStore";

export default function CartSummary() {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  if (items.length === 0) {
    return (
      <div className="rounded-[32px] border border-zinc-200 bg-white p-8 text-center shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-zinc-500">
          <ShoppingBag size={24} />
        </div>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-900">
          Корзина пока пустая
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-zinc-600 sm:text-base">
          Добавьте товар с главной страницы или из раздела аксессуаров, чтобы
          перейти к оформлению заказа.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#E5FF00] px-6 text-sm font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
        >
          Вернуться на главную
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-[32px] border border-zinc-200 bg-white p-5 shadow-[0_24px_80px_-56px_rgba(24,24,27,0.35)] sm:p-6"
          >
            <div className="flex gap-4">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-zinc-50">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="112px"
                  className="object-contain p-3"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-400 line-through">
                      {formatPrice(item.originalPrice)} ₽
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors duration-150 hover:bg-zinc-50 hover:text-zinc-900"
                    aria-label="Удалить товар"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">
                  <div className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-700 transition-colors duration-150 hover:bg-white"
                      aria-label="Уменьшить количество"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="min-w-10 text-center text-sm font-semibold text-zinc-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.id, item.quantity + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-700 transition-colors duration-150 hover:bg-white"
                      aria-label="Увеличить количество"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  <p className="text-xl font-semibold tracking-tight text-zinc-900">
                    {formatPrice(item.price * item.quantity)} ₽
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className="rounded-[32px] border border-zinc-200 bg-zinc-950 p-6 text-white shadow-[0_24px_80px_-56px_rgba(24,24,27,0.45)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/40">
          Сводка заказа
        </p>

        <div className="mt-7 space-y-4">
          <div className="flex items-center justify-between gap-4 text-sm text-white/70">
            <span>Товары</span>
            <span>{formatPrice(subtotal)} ₽</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-white/70">
            <span>Доставка</span>
            <span>Пункт выдачи</span>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-base font-semibold text-white">
            <span>Итого</span>
            <span>{formatPrice(subtotal)} ₽</span>
          </div>
        </div>

        <Link
          href="/checkout"
          className="mt-8 inline-flex h-14 w-full items-center justify-center rounded-full bg-[#E5FF00] px-6 text-base font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
        >
          Перейти к оформлению
        </Link>

        <p className="mt-4 text-sm leading-relaxed text-white/55">
          На следующем шаге можно продолжить как гость или войти в аккаунт, чтобы
          использовать бонусы и сохранить данные получателя.
        </p>
      </aside>
    </div>
  );
}
