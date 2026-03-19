import { Zap, Thermometer, Shield, Layers, type LucideIcon } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";

// RSC — NumberTicker и BorderBeam являются client-компонентами, но RSC может их импортировать
type Feature = {
  icon: LucideIcon;
  value: number;
  unit: string;
  label: string;
  description: string;
  beamDelay?: number;
};

const FEATURES: Feature[] = [
  {
    icon: Zap,
    value: 1500,
    unit: " Вт",
    label: "мощности",
    description: "Мгновенный нагрев до рабочей температуры за 25 секунд",
    beamDelay: 0,
  },
  {
    icon: Thermometer,
    value: 120,
    unit: "°C",
    label: "температура пара",
    description: "Уничтожает 99.9% бактерий и клещей без химии",
    beamDelay: 1.5,
  },
  {
    icon: Shield,
    value: 6,
    unit: "",
    label: "уровней защиты",
    description: "Автоотключение и защита от перегрева",
    beamDelay: 3,
  },
  {
    icon: Layers,
    value: 12,
    unit: "",
    label: "насадок в комплекте",
    description: "Чистит полы, стёкла, плитку, одежду и труднодоступные места",
    beamDelay: 4.5,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="w-full bg-zinc-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Заголовок секции */}
        <div className="mb-10 md:mb-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Преимущества
          </p>
          <h2 className="font-heading font-bold text-zinc-900 text-3xl tracking-tight sm:text-4xl md:text-5xl">
            Технологии, которые работают
          </h2>
        </div>

        {/* Сетка карточек: 1 колонка на мобайле, 4 на десктопе */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.label}
                className="relative flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm border border-zinc-100 overflow-hidden"
              >
                {/* BorderBeam — бегущий световой луч по периметру карточки */}
                <BorderBeam
                  size={80}
                  duration={8}
                  delay={feature.beamDelay}
                  colorFrom="#E5FF00"
                  colorTo="#a3e63500"
                  borderWidth={1.5}
                />

                {/* Иконка в жёлтом круге */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E5FF00]">
                  <Icon size={22} strokeWidth={1.75} className="text-zinc-900" />
                </div>

                {/* Число с анимацией счётчика */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-0.5">
                    <NumberTicker
                      value={feature.value}
                      delay={0.3}
                      className="text-4xl font-bold text-zinc-900 font-heading"
                    />
                    <span className="text-xl font-semibold text-zinc-900">
                      {feature.unit}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-zinc-500">
                    {feature.label}
                  </p>
                </div>

                {/* Описание */}
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
