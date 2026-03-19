import { Marquee } from "@/components/ui/marquee";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Star,
  Package,
  Zap,
  type LucideIcon,
} from "lucide-react";

// RSC — Marquee является server-компонентом, иконки статические
type TrustItem = {
  icon: LucideIcon;
  text: string;
};

const TRUST_ITEMS: TrustItem[] = [
  { icon: ShieldCheck, text: "Гарантия 2 года" },
  { icon: Truck, text: "CDEK по всей России" },
  { icon: Package, text: "Оплата при получении" },
  { icon: Star, text: "4.9 / 5 — 2 400+ отзывов" },
  { icon: CreditCard, text: "Visa · Mastercard · Мир" },
  { icon: Zap, text: "Немецкие технологии" },
  { icon: ShieldCheck, text: "14 дней на возврат" },
  { icon: Truck, text: "Яндекс Доставка" },
];

export default function TrustMarquee() {
  return (
    <section className="w-full border-y border-zinc-100 bg-zinc-50 py-4 overflow-hidden">
      <Marquee pauseOnHover repeat={3} className="[--gap:3rem] [--duration:30s]">
        {TRUST_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.text}
              className="flex items-center gap-2 text-sm font-medium text-zinc-500 select-none"
            >
              <Icon
                size={15}
                strokeWidth={1.75}
                className="shrink-0 text-zinc-400"
              />
              <span>{item.text}</span>
              {/* Разделитель между элементами */}
              <span className="ml-3 text-zinc-200">·</span>
            </div>
          );
        })}
      </Marquee>
    </section>
  );
}
