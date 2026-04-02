"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type StepId = 1 | 2 | 3;
type DeliveryMethod = "yandex" | "";

type ContactData = {
  name: string;
  surname: string;
  phone: string;
  email: string;
};

type DeliveryData = {
  method: DeliveryMethod;
  address: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const STEP_LABELS: Record<StepId, string> = {
  1: "Контакты",
  2: "Доставка",
  3: "Подтверждение",
};

const DELIVERY_OPTIONS = [
  {
    id: "yandex" as const,
    label: "Яндекс Доставка",
    sublabel: "ПВЗ -> ПВЗ · самый выгодный сценарий",
    price: "расчет при подключении API",
  },
];

// ─── Validation ───────────────────────────────────────────────────────────────

function isContactValid(d: ContactData): boolean {
  return (
    d.name.trim().length > 1 &&
    d.surname.trim().length > 1 &&
    d.phone.replace(/\D/g, "").length >= 10 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)
  );
}

function isDeliveryValid(d: DeliveryData): boolean {
  return d.method !== "" && d.address.trim().length > 3;
}

// ─── FormField helper ─────────────────────────────────────────────────────────

function FormField({
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-zinc-700">
        {label}{" "}
        <span className="font-normal text-zinc-300">*</span>
      </label>
      <input
        {...props}
        className={cn(
          "h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4",
          "text-sm text-zinc-900 placeholder:text-zinc-400",
          "outline-none transition-colors duration-150",
          "focus:border-zinc-900 focus:bg-white",
          className
        )}
      />
    </div>
  );
}

// ─── StepBlock (accordion item) ───────────────────────────────────────────────

function StepBlock({
  step,
  isActive,
  isCompleted,
  isPending,
  summary,
  onHeaderClick,
  children,
}: {
  step: StepId;
  isActive: boolean;
  isCompleted: boolean;
  isPending: boolean;
  summary: string;
  onHeaderClick: () => void;
  children: React.ReactNode;
}) {
  const isClickable = isCompleted;

  return (
    <div
      className={cn(
        "rounded-2xl border transition-colors duration-300",
        isActive
          ? "border-zinc-200 bg-white shadow-sm"
          : isCompleted
          ? "border-zinc-100 bg-zinc-50"
          : "border-zinc-100 bg-zinc-50 opacity-40 pointer-events-none"
      )}
    >
      {/* ── Header ── */}
      <button
        type="button"
        onClick={onHeaderClick}
        disabled={isPending || isActive}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-2xl px-5 py-4 text-left",
          isClickable && !isActive && "cursor-pointer hover:bg-zinc-100/60 transition-colors"
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Circle badge */}
          <div
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300",
              isCompleted
                ? "bg-[#E5FF00] text-zinc-900"
                : isActive
                ? "bg-zinc-900 text-white"
                : "bg-zinc-200 text-zinc-400"
            )}
          >
            {isCompleted ? (
              <Check size={13} strokeWidth={2.5} />
            ) : (
              step
            )}
          </div>

          <div className="flex flex-col gap-0.5 min-w-0">
            <span
              className={cn(
                "text-sm font-semibold leading-none",
                isActive ? "text-zinc-900" : isCompleted ? "text-zinc-600" : "text-zinc-400"
              )}
            >
              {STEP_LABELS[step]}
            </span>

            {/* Collapsed summary */}
            {isCompleted && !isActive && summary && (
              <span className="text-xs text-zinc-400 truncate">{summary}</span>
            )}
          </div>
        </div>

        {isCompleted && !isActive && (
          <span className="shrink-0 text-xs font-medium text-zinc-400 hover:text-zinc-600 transition-colors">
            Изменить
          </span>
        )}
      </button>

      {/* ── Animated content ── */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-zinc-100 px-5 pb-5 pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Step 1: Contacts ─────────────────────────────────────────────────────────

function Step1Content({
  contact,
  onChange,
  onNext,
  isValid,
}: {
  contact: ContactData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  isValid: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          label="Имя"
          name="name"
          type="text"
          required
          autoComplete="given-name"
          placeholder="Иван"
          value={contact.name}
          onChange={onChange}
        />
        <FormField
          label="Фамилия"
          name="surname"
          type="text"
          required
          autoComplete="family-name"
          placeholder="Иванов"
          value={contact.surname}
          onChange={onChange}
        />
      </div>

      <FormField
        label="Телефон"
        name="phone"
        type="tel"
        required
        autoComplete="tel"
        placeholder="+7 (___) ___-__-__"
        value={contact.phone}
        onChange={onChange}
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="example@mail.ru"
        value={contact.email}
        onChange={onChange}
      />

      <button
        type="button"
        onClick={onNext}
        disabled={!isValid}
        className={cn(
          "mt-1 h-12 w-full rounded-full text-sm font-semibold transition-all duration-150",
          isValid
            ? "bg-[#E5FF00] text-zinc-900 hover:brightness-95 active:scale-[0.98]"
            : "cursor-not-allowed bg-zinc-100 text-zinc-400"
        )}
      >
        Далее →
      </button>
    </div>
  );
}

// ─── Step 2: Delivery ─────────────────────────────────────────────────────────

function Step2Content({
  delivery,
  onMethodChange,
  onAddressChange,
  onNext,
  onBack,
  isValid,
}: {
  delivery: DeliveryData;
  onMethodChange: (method: "yandex") => void;
  onAddressChange: (address: string) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Delivery options */}
      <div className="flex flex-col gap-2">
        {DELIVERY_OPTIONS.map((option) => {
          const isSelected = delivery.method === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onMethodChange(option.id)}
              className={cn(
                "flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-150",
                isSelected
                  ? "border-zinc-900 bg-white shadow-sm"
                  : "border-zinc-200 bg-zinc-50 hover:border-zinc-300"
              )}
            >
              <div className="flex items-center gap-3">
                {/* Custom radio */}
                <div
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-150",
                    isSelected ? "border-zinc-900" : "border-zinc-300"
                  )}
                >
                  {isSelected && (
                    <div className="h-2.5 w-2.5 rounded-full bg-zinc-900" />
                  )}
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-zinc-900">
                    {option.label}
                  </span>
                  <span className="text-xs text-zinc-400">{option.sublabel}</span>
                </div>
              </div>

              <span
                className={cn(
                  "shrink-0 text-sm font-semibold",
                  isSelected ? "text-zinc-900" : "text-zinc-400"
                )}
              >
                {option.price}
              </span>
            </button>
          );
        })}
      </div>

      {/* Address */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700">
          Адрес <span className="font-normal text-zinc-300">*</span>
        </label>
        <input
          type="text"
          placeholder="Город и выбранный ПВЗ"
          value={delivery.address}
          onChange={(e) => onAddressChange(e.target.value)}
          autoComplete="street-address"
          className={cn(
            "h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4",
            "text-sm text-zinc-900 placeholder:text-zinc-400",
            "outline-none transition-colors duration-150",
            "focus:border-zinc-900 focus:bg-white"
          )}
        />
      </div>

      <div className="mt-1 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="h-12 flex-1 rounded-full border border-zinc-200 text-sm font-semibold text-zinc-600 transition-colors duration-150 hover:bg-zinc-50"
        >
          ← Назад
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!isValid}
          className={cn(
            "h-12 flex-[2] rounded-full text-sm font-semibold transition-all duration-150",
            isValid
              ? "bg-[#E5FF00] text-zinc-900 hover:brightness-95 active:scale-[0.98]"
              : "cursor-not-allowed bg-zinc-100 text-zinc-400"
          )}
        >
          Далее →
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Confirmation ─────────────────────────────────────────────────────

function Step3Content({
  contact,
  delivery,
  deliveryLabel,
  onSubmit,
  onBack,
  isLoading,
}: {
  contact: ContactData;
  delivery: DeliveryData;
  deliveryLabel: string;
  onSubmit: () => void;
  onBack: () => void;
  isLoading: boolean;
}) {
  const rows = [
    { label: "Получатель", value: `${contact.name} ${contact.surname}` },
    { label: "Телефон", value: contact.phone },
    { label: "Email", value: contact.email },
    {
      label: "Доставка",
      value: `${deliveryLabel} · ${delivery.address}`,
    },
    { label: "Оплата", value: "Онлайн-оплата" },
    { label: "Итого", value: "7 990 ₽", highlight: true },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Summary table */}
      <div className="overflow-hidden rounded-xl border border-zinc-100">
        {rows.map((row, idx) => (
          <div
            key={row.label}
            className={cn(
              "flex items-start justify-between gap-4 px-4 py-3 text-sm",
              idx < rows.length - 1 && "border-b border-zinc-100",
              row.highlight ? "bg-zinc-50" : "bg-white"
            )}
          >
            <span className="shrink-0 text-zinc-400">{row.label}</span>
            <span
              className={cn(
                "text-right font-medium text-zinc-700",
                row.highlight && "text-base font-bold text-zinc-900"
              )}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-1 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="h-14 flex-1 rounded-full border border-zinc-200 text-sm font-semibold text-zinc-600 transition-colors duration-150 hover:bg-zinc-50 disabled:opacity-50"
        >
          ← Назад
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className={cn(
            "h-14 flex-[2] rounded-full bg-[#E5FF00] text-base font-semibold text-zinc-900",
            "transition-all duration-150 hover:brightness-95 active:scale-[0.98]",
            isLoading && "cursor-not-allowed opacity-70"
          )}
        >
          {isLoading ? "Оформляем..." : "Оформить заказ за 7 990 ₽"}
        </button>
      </div>

      <p className="text-center text-xs text-zinc-400">
        Нажимая кнопку, вы соглашаетесь с{" "}
        <a
          href="/privacy"
          className="underline underline-offset-2 transition-colors hover:text-zinc-600"
        >
          политикой конфиденциальности
        </a>
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OrderSection() {
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<StepId>>(new Set());
  const [contact, setContact] = useState<ContactData>({
    name: "",
    surname: "",
    phone: "",
    email: "",
  });
  const [delivery, setDelivery] = useState<DeliveryData>({
    method: "",
    address: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ── Handlers ──

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const completeStep1 = () => {
    if (!isContactValid(contact)) return;
    setCompletedSteps((prev) => new Set([...prev, 1 as StepId]));
    setCurrentStep(2);
  };

  const completeStep2 = () => {
    if (!isDeliveryValid(delivery)) return;
    setCompletedSteps((prev) => new Set([...prev, 2 as StepId]));
    setCurrentStep(3);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const openStep = (step: StepId) => {
    // Step 1 is always editable; other steps only if completed
    if (step === 1 || completedSteps.has(step)) {
      setCurrentStep(step);
    }
  };

  // ── Derived state ──

  const isStepCompleted = (s: StepId) => completedSteps.has(s);
  const isStepActive = (s: StepId) => currentStep === s;
  const isStepPending = (s: StepId) => !completedSteps.has(s) && currentStep !== s;

  const contactSummary = contact.name
    ? `${contact.name} ${contact.surname} · ${contact.phone}`
    : "";
  const deliveryOption = DELIVERY_OPTIONS.find((o) => o.id === delivery.method);
  const deliverySummary = deliveryOption
    ? `${deliveryOption.label} · ${delivery.address}`
    : "";

  const STEPS: StepId[] = [1, 2, 3];

  return (
    <section id="order" className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="mb-10 md:mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Заказ
          </p>
          <h2 className="font-heading font-bold text-zinc-900 text-3xl tracking-tight sm:text-4xl md:text-5xl">
            Оформить заказ
          </h2>
          <p className="mt-3 text-base text-zinc-500">
            Доставка по всей России через Яндекс ПВЗ
          </p>
        </div>

        {/* Form container */}
        <div className="mx-auto max-w-[600px]">
          <AnimatePresence mode="wait">

            {/* ── Success Screen ── */}
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center gap-5 rounded-3xl bg-zinc-50 px-8 py-14 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E5FF00]">
                  <CheckCircle size={32} strokeWidth={1.75} className="text-zinc-900" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading font-bold text-2xl text-zinc-900">
                    Заказ оформлен!
                  </h3>
                  <p className="text-base text-zinc-500 leading-relaxed max-w-xs">
                    Спасибо,{" "}
                    <span className="font-semibold text-zinc-900">{contact.name}</span>!
                    Мы свяжемся с вами в течение{" "}
                    <span className="font-semibold text-zinc-900">15 минут</span>.
                  </p>
                </div>
              </motion.div>

            ) : (

              /* ── Multi-step form ── */
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col gap-3"
              >

                {/* ── Progress indicator ── */}
                <div className="relative mb-5">

                  {/* Connecting line — absolute, от центра 1-й до центра 3-й колонки */}
                  <div className="absolute top-4 left-[calc(100%/6)] right-[calc(100%/6)] h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-zinc-100">
                    <motion.div
                      className="h-full rounded-full bg-[#E5FF00]"
                      animate={{
                        width: isStepCompleted(2)
                          ? "100%"
                          : isStepCompleted(1)
                          ? "50%"
                          : "0%",
                      }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    />
                  </div>

                  {/* 3 равные колонки — кружок + подпись центрированы вместе */}
                  <div className="relative grid grid-cols-3">
                    {STEPS.map((step) => (
                      <div key={step} className="flex flex-col items-center gap-2">
                        {/* Circle */}
                        <button
                          type="button"
                          onClick={() => openStep(step)}
                          disabled={step !== 1 && !isStepCompleted(step)}
                          className={cn(
                            "relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300",
                            isStepCompleted(step)
                              ? "cursor-pointer bg-[#E5FF00] text-zinc-900 hover:brightness-95"
                              : isStepActive(step)
                              ? "cursor-default bg-zinc-900 text-white"
                              : "cursor-default bg-zinc-100 text-zinc-400"
                          )}
                        >
                          {isStepCompleted(step) ? (
                            <Check size={14} strokeWidth={2.5} />
                          ) : (
                            step
                          )}
                        </button>

                        {/* Label */}
                        <span
                          className={cn(
                            "text-[11px] font-medium transition-colors duration-200",
                            isStepActive(step) || isStepCompleted(step)
                              ? "text-zinc-700"
                              : "text-zinc-400"
                          )}
                        >
                          {STEP_LABELS[step]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Step blocks ── */}

                {/* Step 1 */}
                <StepBlock
                  step={1}
                  isActive={isStepActive(1)}
                  isCompleted={isStepCompleted(1)}
                  isPending={isStepPending(1)}
                  summary={contactSummary}
                  onHeaderClick={() => openStep(1)}
                >
                  <Step1Content
                    contact={contact}
                    onChange={handleContactChange}
                    onNext={completeStep1}
                    isValid={isContactValid(contact)}
                  />
                </StepBlock>

                {/* Step 2 */}
                <StepBlock
                  step={2}
                  isActive={isStepActive(2)}
                  isCompleted={isStepCompleted(2)}
                  isPending={isStepPending(2)}
                  summary={deliverySummary}
                  onHeaderClick={() => openStep(2)}
                >
                  <Step2Content
                    delivery={delivery}
                    onMethodChange={(method) =>
                      setDelivery((prev) => ({ ...prev, method }))
                    }
                    onAddressChange={(address) =>
                      setDelivery((prev) => ({ ...prev, address }))
                    }
                    onNext={completeStep2}
                    onBack={() => setCurrentStep(1)}
                    isValid={isDeliveryValid(delivery)}
                  />
                </StepBlock>

                {/* Step 3 */}
                <StepBlock
                  step={3}
                  isActive={isStepActive(3)}
                  isCompleted={isStepCompleted(3)}
                  isPending={isStepPending(3)}
                  summary=""
                  onHeaderClick={() => openStep(3)}
                >
                  <Step3Content
                    contact={contact}
                    delivery={delivery}
                    deliveryLabel={deliveryOption?.label ?? ""}
                    onSubmit={handleSubmit}
                    onBack={() => setCurrentStep(2)}
                    isLoading={isLoading}
                  />
                </StepBlock>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
