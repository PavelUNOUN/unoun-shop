import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import AddToCartButton from "@/components/ui/AddToCartButton";

const BENEFITS = [
  "Покупка как гость без обязательной регистрации",
  "Авторизация дает 500 бонусов, которые можно списать уже в первом заказе",
  "Оформление и оплата переходят в отдельный checkout без лишнего шума на главной",
] as const;

export default function LandingCtaSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[36px] border border-zinc-200 bg-zinc-50 shadow-[0_30px_100px_-60px_rgba(24,24,27,0.38)]">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="border-b border-zinc-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5">
                <Sparkles size={14} className="text-zinc-500" />
                <span className="text-xs font-semibold text-zinc-600">
                  Новый сценарий покупки
                </span>
              </div>

              <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Перейдите к оформлению так, как удобно именно вам
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
                Теперь главная страница продает продукт, а не перегружает вас полями
                формы. В корзине и checkout можно продолжить как гость или войти в
                аккаунт, чтобы сразу использовать приветственные бонусы.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <AddToCartButton
                  label="Купить сейчас"
                  redirectTo="/cart"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-[#E5FF00] px-8 text-base font-semibold text-zinc-900 transition-all duration-150 hover:brightness-95 active:scale-[0.98]"
                />

                <Link
                  href="/account/auth"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-8 text-base font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-100"
                >
                  Войти и получить 500 бонусов
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="bg-zinc-950 p-6 text-white sm:p-8 lg:p-10">
              <div className="flex items-center gap-2 text-white/60">
                <ShieldCheck size={16} />
                <span className="text-xs font-semibold uppercase tracking-[0.24em]">
                  Что меняется
                </span>
              </div>

              <div className="mt-7 space-y-4">
                {BENEFITS.map((benefit, index) => (
                  <div
                    key={benefit}
                    className="rounded-[24px] border border-white/10 bg-white/5 p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/35">
                      Пункт {index + 1}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm leading-relaxed text-white/55">
                На следующем шаге мы подключим здесь полноценную корзину, checkout с
                оплатой сразу или частями и выбор ПВЗ СДЭК.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
